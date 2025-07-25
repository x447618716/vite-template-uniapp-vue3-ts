<template>
    <view class="order-confirmation">
        <!-- 商品列表大卡片 -->
        <view class="goods-list-card">
            <view class="goods-item" v-for="(item, idx) in orderItems" :key="item.id">
                <image :src="item.image" class="goods-img" mode="aspectFill" />
                <view class="goods-info">
                    <view class="goods-name">{{ item.name }}</view>
                    <view class="price-qty">
                        <text class="price">¥{{ item.price }}</text>
                        <text class="qty">x{{ item.quantity }}</text>
                    </view>
                </view>
                <view v-if="idx !== orderItems.length - 1" class="item-divider"></view>
            </view>
        </view>

        <!-- 订单信息区 -->
        <view class="order-info">
            <view class="info-item">
                <text>商品原价</text>
                <text>¥{{ originalPrice }}</text>
            </view>
            <view class="info-item">
                <text>商品现价</text>
                <text>¥{{ totalPrice }}</text>
            </view>
            <view class="info-item">
                <text>优惠</text>
                <text class="discount">- ¥{{ discount }}</text>
            </view>
        </view>

        <!-- 底部栏 -->
        <view class="bottom-bar">
            <view class="goods-count">共计{{ totalCount }}件商品</view>
            <button class="submit-btn" @click="submitOrder">确认订单</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 类型定义
interface OrderItem {
    id: number;
    image: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
}

// 响应式状态
const orderItems = ref<OrderItem[]>([
    {
        id: 1,
        image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat',
        name: '灵耀3 Zenbook 3U-轻薄笔记本i5-7200 U18GB/512GB SSD/ofce 2016（灰瑾金）',
        sku: '',
        price: 6399,
        quantity: 1,
    },
    {
        id: 2,
        image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat',
        name: '灵耀3 Zenbook 3U-轻薄笔记本i5-7200 U18GB/512GB SSD/ofce 2016（灰瑾金）',
        sku: '',
        price: 6399,
        quantity: 1,
    },
    {
        id: 3,
        image: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat',
        name: '灵耀3 Zenbook 3U-轻薄笔记本i5-7200 U18GB/512GB SSD/ofce 2016（灰瑾金）',
        sku: '',
        price: 6399,
        quantity: 1,
    },
]);

// 计算属性
const totalPrice = computed(() => {
    return orderItems.value.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
});
const originalPrice = ref(43999); // 示例原价
const discount = computed(() => originalPrice.value - totalPrice.value);
const totalCount = computed(() => orderItems.value.reduce((sum, item) => sum + item.quantity, 0));

const submitOrder = () => {
    // 提交订单逻辑
    uni.showToast({
        title: '订单已提交',
        icon: 'success',
    });
};
</script>

<style lang="scss" scoped>
.order-confirmation {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 120rpx;
}

.goods-list-card {
    margin: 32rpx 24rpx 0 24rpx;
    background: #fff;
    border-radius: 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
    padding: 0;
    overflow: hidden;
}
.goods-item {
    display: flex;
    align-items: center;
    height: 236rpx; /* 118px */
    position: relative;
    padding: 0 32rpx;
    background: #fff;
}
.goods-img {
    width: 176rpx; /* 88px */
    height: 176rpx;
    border-radius: 16rpx;
    object-fit: cover;
    background: #f5f5f5;
    flex-shrink: 0;
}
.goods-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 24rpx;
    min-width: 0;
    .goods-name {
        font-size: 28rpx;
        color: #222;
        font-weight: 500;
        line-height: 1.3;
        margin-bottom: 12rpx;
        word-break: break-all;
        max-height: 72rpx;
        overflow: hidden;
    }
    .price-qty {
        display: flex;
        align-items: center;
        gap: 16rpx;
        .price {
            color: #e60012;
            font-size: 28rpx;
            font-weight: bold;
        }
        .qty {
            color: #e60012;
            font-size: 22rpx;
        }
    }
}
.item-divider {
    position: absolute;
    left: 32rpx;
    right: 32rpx;
    bottom: 0;
    height: 1px;
    background: #ededed;
    content: '';
    z-index: 1;
}

.order-info {
    margin: 32rpx 24rpx 0 24rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 24rpx 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.04);
    .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        color: #333;
        padding: 0 32rpx;
        height: 72rpx;
        border-bottom: 1rpx solid #f0f0f0;
        &:last-child {
            border-bottom: none;
        }
        .discount {
            color: #1677ff;
            font-weight: 500;
        }
    }
}

.bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
    z-index: 10;
    .goods-count {
        font-size: 26rpx;
        color: #888;
    }
    .submit-btn {
        width: 220rpx;
        height: 72rpx;
        background: #1677ff;
        color: #fff;
        border-radius: 36rpx;
        font-size: 30rpx;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        box-shadow: 0 4rpx 16rpx rgba(22, 119, 255, 0.12);
        transition: background 0.2s;
    }
    .submit-btn:active {
        background: #1456b8;
    }
}
</style>
