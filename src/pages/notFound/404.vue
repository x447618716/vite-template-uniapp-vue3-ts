<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import BasicButton from '@/components/BasicButton/index.vue';
import { useRouter } from 'uni-mini-router';

const go = ref<string>('');
const router = useRouter();
const redirect = ref<string>('');
onLoad((query) => {
    go.value = query?.go || '';
    redirect.value = query?.redirect || '';
});

/**
 * 返回首页
 */
const backHome = () => {
    router.pushTab(redirect.value);
};
</script>

<template>
    <view class="pt-320rpx flex w-screen flex-col items-center">
        <image class="w-360rpx" mode="widthFix" src="/static/svg/weep.svg" />
        <view class="mb-40rpx">
            <text>{{ go }} 页面找不到了~</text>
        </view>
        <BasicButton @click="backHome">返回首页</BasicButton>
    </view>
</template>

<style lang="scss" scoped></style>
