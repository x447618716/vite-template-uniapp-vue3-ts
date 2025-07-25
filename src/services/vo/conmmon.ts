/**
 * 响应体Vo
 */
export interface BaseResponse<T> {
    code: number;
    data?: T;
    msg?: string;
    requestId?: string;
}

/**
 * 分页响应体Vo
 */
export interface BaseResponsePage<T> {
    code: number;
    rows?: T;
    msg?: string;
    total?: number;
}
