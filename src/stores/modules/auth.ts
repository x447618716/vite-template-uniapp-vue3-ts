import dayjs from 'dayjs';
import { defineStore } from 'pinia';

import { ResultEnum } from '@/enums/httpEnum';
import { logout, refreshAccessToken } from '@/services/api/auth';

interface AccountInfo {
    account: string;
    password: string;
    remembered: boolean;
}

interface AuthState {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    accountInfo: AccountInfo;
}

export const useAuthStore = defineStore('authStore', {
    state: (): AuthState => ({
        accessToken: '',
        refreshToken: '',
        expiresAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        accountInfo: {
            account: '',
            password: '',
            remembered: true
        }
    }),
    getters: {
        isLogin: (state): boolean => dayjs().isBefore(dayjs(state.expiresAt)),
        getAuthorization: state => {
            return state.accessToken ? { Authorization: state.accessToken } : {};
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
                this.accessToken = data.accessToken;
                this.refreshToken = data.refreshToken;
                this.expiresAt = data.expiresAt;
                return true;
            } else {
                return false;
            }
        }
    },
    persist: true
});
