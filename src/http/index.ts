import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import { assign } from 'lodash-es';

import { checkStatus } from '@/http/checkStatus';

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
        const authStore = useAuthStore();
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
                    authStore.$reset();
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
        }
    }
});

export default alovaInstance;
