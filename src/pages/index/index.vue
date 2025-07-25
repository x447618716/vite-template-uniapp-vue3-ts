<template>
    <!-- 搜索框 -->
    <view class="flex items-center justify-between p-[25rpx]">
        <view class="flex h-[53rpx] w-[620rpx] items-center rounded-[27rpx] border-2 border-[#333] pl-[15rpx]">
            <uni-icons type="search" size="18" color="#333"></uni-icons>
            <input class="w-full text-[20rpx] text-[#333]" type="text" placeholder="搜索全站" :disabled="true" />
        </view>
        <uni-icons type="notification" size="24" color="#333" @click="route.push('/pages/message/index')"></uni-icons>
    </view>

    <!-- 轮播图 -->
    <view class="mt-[20rpx] pr-[30rpx] pl-[30rpx]">
        <swiper class="overflow-hidden rounded-[16rpx] shadow-[0_4px_9px_3px_rgba(0,0,0,0.05)]" :indicator-dots="true" :autoplay="true" :circular="true">
            <swiper-item class="h-[300rpx]" v-for="(item, index) in bannerImages" :key="index">
                <image :src="item" class="block size-full"></image>
            </swiper-item>
        </swiper>
    </view>

    <!-- 功能导航 -->
    <view class="mt-[20rpx] flex justify-around p-[30rpx_20rpx]">
        <view class="flex flex-col items-center" @click="route.push('/pages/unionServices/index')">
            <image src="/static/icon/service.png" class="block h-[104rpx] w-[104rpx]"></image>
            <text class="text-[24rpx] text-[#333]">工会服务</text>
        </view>
        <view class="flex flex-col items-center" @click="route.push('/pages/unionServices/index')">
            <image src="/static/icon/benefit.png" class="block h-[104rpx] w-[104rpx]"></image>
            <text class="text-[24rpx] text-[#333]">工会福利</text>
        </view>
        <view class="flex flex-col items-center" @click="route.push('/pages/unionServices/index')">
            <image src="/static/icon/activity.png" class="block h-[104rpx] w-[104rpx]"></image>
            <text class="text-[24rpx] text-[#333]">工会活动</text>
        </view>
    </view>

    <!-- 热门专题 -->
    <view class="flex items-center justify-between p-[30rpx]">
        <view class="border-b-2 border-[#233CFE] text-[27rpx] font-bold text-[#333]">热门专题</view>
        <view class="flex items-center text-[20rpx] font-normal text-[#333]">
            <text>查看更多</text>
            <uni-icons type="right" size="14"></uni-icons>
        </view>
    </view>

    <!-- 服务卡片 -->
    <swiper class="h-[375rpx]" :interval="6000" :circular="true" :autoplay="true" previous-margin="50rpx" next-margin="50rpx">
        <swiper-item v-for="(item, index) of currentServiceCards" :key="index">
            <view
                class="shadow-[0_8rpx_18rpx_6rpx_rgba(0,0,0,0.05);] flex h-[375rpx] w-[576rpx] flex-col justify-between rounded-[32rpx] border-white bg-white p-[20rpx]">
                <view class="line-clamp-1 text-center text-[28rpx] font-bold text-[#233CFE]">{{ item.title }}</view>
                <view class="line-clamp-1 text-center text-[20rpx] font-medium text-[#333333]">{{ item.desc }}</view>
                <image class="h-[240rpx] w-[520rpx] rounded-[32rpx]" :src="item.image" />
            </view>
        </swiper-item>
    </swiper>
</template>

<script setup>
import { useRouter } from 'uni-mini-router';
// import { onLoad } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';

const route = useRouter();

// 响应式状态
const currentTopicTab = ref(0);
const serviceCardsByTab = ref([
    // 全部
    [
        { title: '综合服务', desc: '福海创，一个温暖的工会！', image: 'https://picsum.photos/650/300?id=10' },
        { title: '会员服务', desc: '专属会员权益', image: 'https://picsum.photos/650/300?id=11' },
        { title: '工会动态', desc: '最新工会资讯', image: 'https://picsum.photos/650/300?id=12' },
    ],
    // 活动专区
    [
        { title: '文体活动', desc: '丰富多彩的工会活动', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '团建活动', desc: '增强团队凝聚力', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '节日庆典', desc: '欢度传统佳节', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
    ],
    // 福利政策
    [
        { title: '福利申请', desc: '各类补贴、慰问金申请', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '福利政策', desc: '最新福利政策解读', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '福利领取', desc: '福利发放与领取', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
    ],
    // 职工培训
    [
        { title: '技能培训', desc: '提升职业技能', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '素质提升', desc: '职业素养培训', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '学习资料', desc: '在线学习资源', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
    ],
    // 工会资讯
    [
        { title: '工会新闻', desc: '工会最新动态', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '政策解读', desc: '工会政策详解', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '通知公告', desc: '重要通知与公告', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
    ],
    // 法律援助
    [
        { title: '法律咨询', desc: '专业法律咨询服务', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '权益保障', desc: '职工权益维护', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '法律知识', desc: '实用法律知识', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
    ],
    // 心理健康咨询
    [
        { title: '心理咨询', desc: '专业心理疏导', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '压力管理', desc: '职场压力缓解', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
        { title: '心理测评', desc: '心理健康评估', image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat' },
    ],
]);

const bannerImages = ref([
    'https://picsum.photos/650/300?id=1',
    'https://picsum.photos/650/300?id=2',
    'https://picsum.photos/650/300?id=3',
    'https://picsum.photos/650/300?id=4',
]);

// 计算属性
const currentServiceCards = computed(() => {
    return serviceCardsByTab.value[currentTopicTab.value] || [];
});
</script>
