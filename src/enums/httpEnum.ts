/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
    SUCCESS = 200, // 成功
    ERROR = 1, // 错误
    TIMEOUT = 401, // 超时
    TYPE = 'success', // 类型
    ENDURING_EFFECT = 402,
    ACCESS_TOKEN_EXPIRED = 10001, // AccessToken 过期
    REFRESH_TOKEN_EXPIRED = 10002, // RefreshToken 过期
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
