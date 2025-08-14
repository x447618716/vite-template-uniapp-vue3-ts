import { createAlova } from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';
import { assign } from 'lodash-es';

import { getBaseUrl } from '@/utils/env';
import { useAuthStore } from '@/stores/modules/auth';
import { checkStatus } from '@/utils/http/checkStatus';
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { Toast } from '@/utils/uniapi/prompt';
import type { BaseResponse, BaseResponsePage } from '@/services/vo/conmmon';

const BASE_URL = getBaseUrl();

const HEADER = {
    'Content-Type': ContentTypeEnum.JSON,
    Accept: 'application/json, text/plain, */*'
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
    baseURL: process.env.UNI_PLATFORM === 'h5' ? BASE_URL : 'http://192.168.1.10:8000',
    ...AdapterUniapp(),
    timeout: 10000,
    cacheFor: null, // 完全禁用缓存
    beforeRequest: method => {
        const authStore = useAuthStore();
        method.config.headers = assign(method.config.headers, HEADER, authStore.getAuthorization);
    },
    responded: {
        onSuccess: async (response, method) => {
            const { data, statusCode } = response as UniNamespace.RequestSuccessCallbackResult;
            if (statusCode !== ResultEnum.SUCCESS) {
                checkStatus(statusCode, '服务不可用,请稍后重试！');
                return Promise.reject(response);
            }
            const { code, msg } = data as BaseResponse<null> | BaseResponsePage<null>;
            const authStore = useAuthStore();
            if (code === ResultEnum.ACCESS_TOKEN_EXPIRED) {
                const isSuccess = await authStore.refresh();
                if (isSuccess) {
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
                checkStatus(code, msg);
                return Promise.reject(response);
            } else {
                return Promise.resolve(data);
            }
        },
        onError: (err: object, method) => {
            Toast(err.toString());
            return Promise.reject({ err, method });
        }
    }
});

export const request = alovaInstance;
