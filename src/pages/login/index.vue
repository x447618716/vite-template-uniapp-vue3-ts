<script setup lang="ts">
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';
import { useAuthStore } from '@/state/modules/auth';
import { Toast } from '@/utils/uniapi/prompt';
import { judgeUserIsLeader, login } from '@/services/api/auth';
import { useRouter } from 'uni-mini-router';
import loginLogo from '@/static/images/login-logo.png';
import backgroundImageUrl from '@/static/images/login-background.png';

const authStore = useAuthStore();
const router = useRouter();
const { accountInfo, accessToken, refreshToken, permission } = storeToRefs(authStore);

const showPwd = ref(false);
const remember = ref(false);

const form = reactive<Parameters<typeof login>[0]>({
    loginAccount: '',
    loginMethod: 1,
    loginPwd: '',
});

onLoad(() => {
    //检查记住密码状态
    if (accountInfo.value.remembered) {
        remember.value = true;
        form.loginAccount = accountInfo.value.loginAccount;
        form.loginPwd = accountInfo.value.loginPwd;
    }
});

//记住密码
const handleRemember = (e: any) => {
    remember.value = e.detail.value;
};

//忘记密码
const handleForgot = () => {
    Toast('请联系管理员找回密码');
};

// 登录方法
const handleSubmit = async () => {
    if (form.loginAccount === '') {
        Toast('请输入账号！');
        return;
    }
    if (form.loginPwd === '') {
        Toast('请输入密码！');
        return;
    }
    login(form).then((res) => {
        accountInfo.value.loginAccount = form.loginAccount;
        accountInfo.value.loginPwd = form.loginPwd ?? '';
        accountInfo.value.remembered = remember.value;
        accessToken.value = res.data?.accessToken ?? '';
        refreshToken.value = res.data?.refreshToken ?? '';
        judgeUserIsLeader().then((res) => {
            permission.value.isFunctionary = res.data ?? false;
        });
        router.pushTab('/pages/index/index');
    });
};
</script>

<template>
    <view class="relative flex size-full flex-col">
        <image class="absolute inset-0 size-full" :src="backgroundImageUrl" mode="aspectFit"></image>
        <view class="flex h-[415rpx] w-full items-center justify-center">
            <image class="h-[140rpx] w-[140rpx] rounded-[32rpx] shadow-[0_8rpx_32rpx_rgba(0,0,0,0.1)]" :src="loginLogo" mode="aspectFit" />
        </view>
        <view
            class="relative w-full flex-1 rounded-[50rpx_50rpx_0_0] border-[2px] border-solid border-white p-[56rpx_36rpx] shadow-[0_12rpx_40rpx_rgba(0,0,0,0.1)]">
            <view class="relative mb-[36rpx] flex items-center border-b-[1rpx] border-solid border-[#ececec]">
                <text class="font-600 w-[90rpx] text-[30rpx] text-[#222]">账号</text>
                <input
                    class="min-h-[88rpx] w-full flex-1 border-none bg-transparent p-[28rpx_0] text-[28rpx] text-[#333]"
                    type="text"
                    v-model="form.loginAccount"
                    placeholder="请输入您的账号/手机号"
                    placeholder-class="text-[#d0d0d0] text-[26rpx]"
                    confirm-type="next" />
                <uni-icons type="scan" size="20" class="absolute right-0 ml-[8rpx] p-[20rpx] text-[#bbb]" />
            </view>
            <view class="relative mb-[36rpx] flex items-center border-b-[1rpx] border-solid border-[#ececec]">
                <text class="font-600 w-[90rpx] text-[30rpx] text-[#222]">密码</text>
                <input
                    class="min-h-[88rpx] w-full flex-1 border-none bg-transparent p-[28rpx_0] text-[28rpx] text-[#333]"
                    type="text"
                    v-model="form.loginPwd"
                    :password="!showPwd"
                    placeholder="请输入您的密码"
                    placeholder-class="text-[#d0d0d0] text-[26rpx]"
                    confirm-type="done" />
                <uni-icons
                    :type="showPwd ? 'eye-slash' : 'eye'"
                    size="20"
                    class="absolute right-0 ml-[8rpx] p-[20rpx] text-[#bbb]"
                    @click="showPwd = !showPwd" />
            </view>
            <view class="mb-[40rpx] flex items-center justify-between">
                <label class="flex items-center text-[26rpx] text-[#888]">
                    <switch :checked="remember" style="transform: scale(0.7)" color="#388bff" @change="handleRemember" />
                    记住密码
                </label>
                <text class="text-[26rpx] text-[#6a8cff]" @click="handleForgot">找回密码</text>
            </view>
            <button
                class="mt-[196rpx] flex h-[82rpx] w-[480rpx] items-center justify-center rounded-[48rpx] bg-linear-[90deg,#388bff_0%,#4fbcff_100%] text-[32rpx] leading-[82rpx] tracking-[2rpx] text-white shadow-[0_4rpx_16rpx_rgba(72,144,255,0.12)]"
                @click="handleSubmit">
                登录
            </button>
        </view>
    </view>
</template>

<style lang="css">
page {
    width: 100%;
    height: 100%;
}
</style>
