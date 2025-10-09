import type { LoginDto, RefreshDto } from '@/services/dto/auth';
import type { LoginVo } from '@/services/vo/auth';
import type { BaseResponse } from '@/services/vo/conmmon';
import request from '@/utils/http';

/**
 * 刷新token
 */
export const refreshAccessToken = (data: RefreshDto) => request.Post<BaseResponse<LoginVo>>('/customers/refresh/token', data);

/**
 * 登录
 * */
export const login = (data: LoginDto) => request.Post<BaseResponse<LoginVo>>('/customers/login', data);

/**
 * 退出
 * */
export const logout = () => request.Post<BaseResponse<boolean>>('/customers/logout');
