import { defineStore } from 'pinia';

import { logout, refreshAccessToken } from '@/services/api/auth';
import { ResultEnum } from '@/enums/httpEnum';

interface AccountInfo {
    loginAccount: string;
    loginMethod: number;
    loginPwd: string;
    remembered: boolean;
}

interface AuthState {
    accessToken: string;
    refreshToken: string;
    accountInfo: AccountInfo;
    permission: Record<string, boolean>;
}

export const useAuthStore = defineStore('authStore', {
    state: (): AuthState => ({
        accessToken: '',
        refreshToken: '',
        accountInfo: {
            loginAccount: '',
            loginMethod: 1,
            loginPwd: '',
            remembered: false
        },
        permission: {
            isFunctionary: true
        }
    }),
    getters: {
        isLogin: (state): boolean => !!state.accessToken,
        getAuthorization: state => {
            return state.accessToken ? { satoken: state.accessToken } : {};
        }
    },
    actions: {
        clear() {
            this.accessToken = '';
            this.refreshToken = '';
        },
        async loginOut() {
            await logout();
            this.clear();
        },
        async refresh() {
            const { code, data } = await refreshAccessToken({
                refreshToken: this.refreshToken
            });
            if (code == ResultEnum.SUCCESS) {
                this.accessToken = data?.accessToken || '';
                this.refreshToken = data?.refreshToken || '';
                return true;
            } else {
                return false;
            }
        }
    },
    persist: true
});
