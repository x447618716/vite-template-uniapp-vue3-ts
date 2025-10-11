<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const { accountInfo, accessToken, refreshToken, expiresAt } = storeToRefs(authStore);

const form = reactive<LoginDto>({
    account: '',
    password: ''
});

onLoad(() => {
    //检查记住密码状态
    if (accountInfo.value.remembered) {
        form.account = accountInfo.value.account;
        form.password = accountInfo.value.password;
    }
});

// 登录方法
const handleSubmit = () => {
    if (form.account === '') {
        Toast('请输入账号！');
        return;
    }
    if (form.password === '') {
        Toast('请输入密码！');
        return;
    }
    void login(form).then(res => {
        accountInfo.value.account = form.account;
        accountInfo.value.password = form.password;
        accessToken.value = res.data.accessToken;
        refreshToken.value = res.data.refreshToken;
        expiresAt.value = res.data.expiresAt;
        router.pushTab('/pages/home/home');
    });
};
</script>

<template>
    <view class="relative flex size-full flex-col items-center justify-center pr-[60rpx] pl-[60rpx]">
        <view>
            <input
                v-model="form.account"
                class="h-[110rpx] w-full border-b-2 border-[#F0F0F0] text-[30rpx] font-normal text-[#262424]"
                type="text"
                placeholder="请输入手机号码"
                placeholder-class="text-[30rpx] font-normal text-[#CCC8C8]"
                confirm-type="next" />
            <input
                v-model="form.password"
                class="h-[110rpx] w-full border-b-2 border-[#F0F0F0] text-[30rpx] font-normal text-[#262424]"
                type="password"
                placeholder="请输入密码"
                placeholder-class="text-[30rpx] font-normal text-[#CCC8C8]"
                confirm-type="done" />
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
