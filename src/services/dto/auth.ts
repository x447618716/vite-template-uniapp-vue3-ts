/**
 * 登录Dto
 */
export interface LoginDto {
    /**
     * 登录账号
     */
    loginAccount: string;
    /**
     * 登录方式:{1:账号密码,2:手机短信验证码,3:}
     */
    loginMethod: number;
    /**
     * 登录密码(loginType=1时不能为空)
     */
    loginPwd?: string;
    /**
     * 验证码(loginType=2时不能为空)
     */
    verificationCode?: string;
}

/**
 * 刷新Dto
 * */
export interface RefreshDto {
    refreshToken: string;
}
