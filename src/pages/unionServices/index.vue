<script setup lang="ts">
import { useRouter } from 'uni-mini-router';
import one from '@/static/images/union/1@2x.png';
import two from '@/static/images/union/2@2x.png';
import three from '@/static/images/union/3@2x.png';
import four from '@/static/images/union/4@2x.png';
import five from '@/static/images/union/5@2x.png';
import six from '@/static/images/union/6@2x.png';
import seven from '@/static/images/union/7@2x.png';
import eight from '@/static/images/union/8@2x.png';
import nine from '@/static/images/union/9@2x.png';

interface MenuType {
    title: string;
    icon: string;
    path?: string;
}

const router = useRouter();

const menu: MenuType[] = [
    {
        title: '组织管理',
        icon: nine,
        path: '/pages/organization/index',
    },
    {
        title: '用户管理',
        icon: seven,
    },
    {
        title: '工会概括',
        icon: three,
    },
    {
        title: '数据公开',
        icon: five,
    },
    {
        title: '招聘信息',
        icon: eight,
    },
    {
        title: '心理健康',
        icon: six,
    },
    {
        title: '讲座信息',
        icon: four,
    },
    {
        title: '网上职代会',
        icon: two,
    },
    {
        title: '创新工作室',
        icon: one,
    },
];

const handleGoMenu = (index: number) => {
    const path = menu[index]?.path;
    if (path) {
        router.push(path);
    }
};
</script>

<template>
    <view class="grid grid-cols-3 gap-[32rpx] p-[32rpx]">
        <view class="pt-[50rpx] pb-[50rpx]" v-for="(item, index) in menu" :key="index" @click="handleGoMenu(index)">
            <view class="flex flex-col items-center justify-center">
                <image class="h-[50rpx] w-[50rpx]" :src="item.icon" mode="aspectFit" />
                <text class="pt-[15rpx] text-[24rpx] font-bold text-[#333333]">{{ item.title }}</text>
            </view>
        </view>
    </view>
</template>
