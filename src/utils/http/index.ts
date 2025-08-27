import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import dayjs from 'dayjs';
import { assign } from 'lodash-es';

import { ResultEnum } from '@/enums/httpEnum';
import { NumberEnum } from '@/enums/numberEnum';
import type { BaseResponse } from '@/services/vo/conmmon';
import { useAuthStore } from '@/stores/modules/auth';
import { checkStatus } from '@/utils/http/checkStatus';
import { Toast } from '@/utils/uniapi/prompt';

type TimerType = ReturnType<typeof setTimeout>;

/**
 * 请求内置操作
 * */
interface RequestOperate {
    /**
     * 定时器对象
     * */
    timer?: TimerType;
    /**
     * 请求地址集
     * key:请求地址
     * value:请求时间戳
     * */
    requestMap: Map<string, number>;
}

const requestOperate: RequestOperate = {
    requestMap: new Map<string, number>()
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
    baseURL: import.meta.env.VITE_BASE_URL,
    ...AdapterUniapp(),
    timeout: 10000,
    cacheFor: null, // 完全禁用缓存
    beforeRequest: async method => {
        await autoRefresh();
        const authStore = useAuthStore();
        //判断定时回收器是否存在不存在启动它
        if (!requestOperate.timer) {
            timerRecycling();
        }
        //判断当前请求是否已在请求列表中
        if (requestOperate.requestMap.has(method.url)) {
            method.abort();
        } else {
            //判断是否加入请求集-> 默认为加入
            if (method.meta?.debounce ?? true) {
                requestOperate.requestMap.set(method.url, new Date().getTime());
            }
        }
        method.config.headers = assign(authStore.getAuthorization, { apifoxToken: 'zC_7kbY3_WeqXhxSog7ry' }, method.config.headers);
    },
    responded: {
        onSuccess: async (response, method) => {
            if (method.config.requestType === 'download') {
                return response;
            } else if (method.config.requestType === 'upload') {
                return response;
            } else {
                const { data, statusCode } = response as UniNamespace.RequestSuccessCallbackResult;
                if (statusCode !== ResultEnum.SUCCESS) {
                    checkStatus(statusCode, '服务不可用,请稍后重试！');
                    return Promise.reject(response);
                }
                const { code, message } = data as BaseResponse<null>;
                const authStore = useAuthStore();
                if (code === ResultEnum.ACCESS_TOKEN_EXPIRED) {
                    const isSuccess = await authStore.refresh();
                    if (isSuccess) {
                        method.config.headers = assign(method.config.headers, authStore.getAuthorization);
                        await method.send();
                    } else {
                        await uni.reLaunch({ url: '/pages/login/index' });
                    }
                    return;
                }
                if (code === ResultEnum.REFRESH_TOKEN_EXPIRED) {
                    authStore.clear();
                    await uni.reLaunch({ url: '/pages/login/index' });
                    return;
                }
                if (code !== ResultEnum.SUCCESS) {
                    checkStatus(code, message);
                    return Promise.reject(response);
                } else {
                    return Promise.resolve(data);
                }
            }
        },
        onError: (err: object, method) => {
            Toast(err.toString());
            return Promise.reject({ err, method });
        },
        onComplete: methods => {
            //删除指定项
            requestOperate.requestMap.delete(methods.url);
        }
    }
});

//定时回收
const timerRecycling = () => {
    //清除冗余数据
    requestOperate.requestMap.forEach((value, key, map) => {
        //请求列中项存在时间超1分钟将其清除
        if (new Date().getTime() - value > NumberEnum.TIME_OUT) {
            map.delete(key);
        }
    });

    requestOperate.timer = setTimeout(() => {
        if (requestOperate.requestMap.size) {
            timerRecycling();
        } else {
            //清除定时器
            if (requestOperate.timer) {
                clearTimeout(requestOperate.timer);
            }
        }
    }, NumberEnum.TIME_OUT);
};

//自动刷新token
const autoRefresh = async () => {
    const authStore = useAuthStore();
    if (authStore.isLogin) {
        if (dayjs().isAfter(dayjs(authStore.expiresAt).subtract(NumberEnum.TIME, 'm'))) {
            await authStore.refresh();
        }
        setTimeout(async () => {
            await autoRefresh();
        }, NumberEnum.TIME_OUT);
    }
};

export const request = alovaInstance;
