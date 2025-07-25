import { request } from '@/utils/http';
import { LoginDto, RefreshDto } from '@/services/dto/auth';
import { LoginVo } from '@/services/vo/auth';
import { BaseResponse } from '@/services/vo/conmmon';

/**
 * 刷新token
 */
export const refreshAccessToken = (data: RefreshDto) =>
    request.Post<BaseResponse<LoginVo>>(`/union-member/api/member/refresh-token?refreshToken=${data.refreshToken}`);

/**
 * 登录
 * */
export const login = (data: LoginDto) => request.Post<BaseResponse<LoginVo>>('/union-member/api/member/doLogin', data);

/**
 * 退出
 * */
export const logout = () => request.Post<BaseResponse<boolean>>('/union-member/api/user/logout');

/**
 * 是否登录
 * */
export const isLogin = () => request.Get<BaseResponse<boolean>>('/union-member/api/member/isLogin');

/**
 * 判断当前会员是否为干部
 * */
export const judgeUserIsLeader = () => request.Get<BaseResponse<boolean>>('/union-serve/app/unionOrgInfo/judgeUserIsLeader');

export const test = () => request.Get<BaseResponse<any>>('/union-member/api/member/tokenInfo');
