<template>
    <view class="cart-page">
        <view class="cart-content">
            <scroll-view :scroll-y="true" class="cart-list" @scrolltolower="loadMore">
                <view v-for="(item, index) in cartList" :key="item.id" class="cart-item-wrapper">
                    <view class="item-checkbox">
                        <checkbox :checked="item.checked" @click="toggleItem(index)" color="#246bfb" class="round-checkbox" />
                    </view>
                    <view class="swipe-action-container">
                        <u-swipe-action>
                            <u-swipe-action-item :options="swipeOptions" @click="handleSwipe($event, index)">
                                <view class="cart-item">
                                    <image :src="item.img" class="cart-img" mode="aspectFill" />
                                    <view class="cart-info">
                                        <view class="cart-title">{{ item.title }}</view>
                                        <view class="cart-bottom">
                                            <view class="cart-price">￥{{ item.price }}</view>
                                            <view class="cart-qty">
                                                <button class="qty-btn" @click.stop="changeQty(index, -1)" :disabled="item.qty <= 1">-</button>
                                                <text class="qty-num">{{ item.qty }}</text>
                                                <button class="qty-btn" @click.stop="changeQty(index, 1)">+</button>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </u-swipe-action-item>
                        </u-swipe-action>
                    </view>
                </view>
                <view v-if="loading" class="loading">加载中...</view>
                <view v-if="noMore" class="no-more">没有更多了</view>
            </scroll-view>
        </view>
        <view class="cart-footer">
            <label class="checkbox-wrap">
                <checkbox :checked="allChecked" @click="toggleAll" color="#246bfb" class="round-checkbox" />
                <text class="checkbox-text">全选</text>
            </label>
            <view class="price-info">
                <view class="total-line">
                    <text>现价总计：</text>
                    <text class="footer-price">￥{{ totalPrice }}</text>
                </view>
                <view class="discount-line">
                    <text>活动优惠</text>
                    <text class="discount-price">￥299</text>
                </view>
            </view>
            <button class="checkout-btn" @click="goToOrderConfirmation">下单领取</button>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';

const allGoods = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    img: 'https://dummyimage.com/343x146/f5f5f5/333333&text=reserve%20a%20seat',
    title: `灵耀3 Zenbook 3U-轻薄笔记本i5-7200 U 18GB/512GB SSD/ofice 2016（灰鎏金）${i + 1}`,
    price: 6399,
    qty: 1,
    checked: false,
}));

const cartList = ref(allGoods.slice(0, 5));
const page = ref(1);
const pageSize = 5;
const loading = ref(false);
const noMore = ref(false);

const swipeOptions = [
    {
        text: '收藏',
        style: {
            backgroundColor: '#FFB400',
            color: '#FFFFFF',
            width: '100rpx',
            fontSize: '28rpx',
            fontWeight: '500',
        },
    },
    {
        text: '删除',
        style: {
            backgroundColor: '#E60012',
            color: '#FFFFFF',
            width: '100rpx',
            fontSize: '28rpx',
            fontWeight: '500',
        },
    },
];

interface SwipeEvent {
    index?: number;
}

const goToOrderConfirmation = () => {
    // 去orderConfirmation页面
    uni.navigateTo({
        url: '/pages/shoppingCart/orderConfirmation',
    });
};
const handleSwipe = (event: SwipeEvent, itemIndex: number) => {
    const index = event?.index ?? -1;

    if (index === 0) {
        // 收藏操作
        uni.showToast({
            title: '已收藏',
            icon: 'success',
        });
    } else if (index === 1) {
        // 删除操作
        uni.showModal({
            title: '提示',
            content: '确定要删除这个商品吗？',
            success: function (res) {
                if (res.confirm) {
                    cartList.value.splice(itemIndex, 1);
                    uni.showToast({
                        title: '删除成功',
                        icon: 'success',
                    });
                }
            },
        });
    }
};

const loadMore = () => {
    if (loading.value || noMore.value) return;
    loading.value = true;
    setTimeout(() => {
        const next = allGoods.slice(page.value * pageSize, (page.value + 1) * pageSize);
        if (next.length) {
            cartList.value = cartList.value.concat(next);
            page.value++;
        } else {
            noMore.value = true;
        }
        loading.value = false;
    }, 800);
};

const changeQty = (index: number, delta: number) => {
    const item = cartList.value[index];
    if (item && item.qty + delta >= 1) {
        item.qty += delta;
    }
};

const toggleItem = (index: number) => {
    const item = cartList.value[index];
    if (item) {
        item.checked = !item.checked;
    }
};

const totalPrice = computed(() => cartList.value.filter((item) => item.checked).reduce((sum, item) => sum + item.price * item.qty, 0));

const allChecked = computed(() => cartList.value.every((item) => item.checked));
function toggleAll() {
    const checked = !allChecked.value;
    cartList.value.forEach((item) => (item.checked = checked));
}

onLoad((query) => {
    console.log('log onLoad', query);
});
</script>

<style lang="scss" scoped>
.cart-page {
    display: flex;
    flex-direction: column;
    background: #f7f8fa;
}
.cart-content {
    height: calc(100vh - 90rpx - var(--tab-bar-height, 0));
    display: flex;
    flex-direction: column;
}
.cart-list {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24rpx 0 0 0;
}
.cart-item-wrapper {
    display: flex;
    align-items: center;
    margin: 24rpx 30rpx 0 30rpx;
}
.item-checkbox {
    margin-right: 20rpx;
    display: flex;
    align-items: center;
    height: 236rpx;

    :deep(.uni-checkbox-input) {
        border-radius: 100% !important;
        width: 36rpx !important;
        height: 36rpx !important;
    }
}
.swipe-action-container {
    flex: 1;
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 24rpx 0 rgba(36, 107, 251, 0.06);
    background: #fff;
    position: relative;
}
.cart-item {
    display: flex;
    align-items: flex-start;
    background: #fff;
    padding: 30rpx;
    box-sizing: border-box;
    width: 100%;
}
.cart-img {
    width: 176rpx;
    height: 176rpx;
    border-radius: 16rpx;
    margin-right: 20rpx;
    background: #f5f5f5;
    object-fit: cover;
}
.cart-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 176rpx;
}
.cart-title {
    font-size: 26rpx;
    color: #222;
    font-weight: 500;
    margin-bottom: 8rpx;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
.cart-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.cart-price {
    color: #e60012;
    font-size: 30rpx;
    font-weight: bold;
}
.cart-qty {
    display: flex;
    align-items: center;
}
.qty-btn {
    background: none;
    border: none;
    color: #222;
    font-size: 32rpx;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    margin: 0 10rpx;
    padding: 0;
}
.qty-btn:disabled {
    color: #ccc;
}
.qty-num {
    font-size: 26rpx;
    width: 36rpx;
    text-align: center;
    color: #222;
}
.cart-footer {
    position: fixed;
    left: 0;
    bottom: var(--tab-bar-height, 0);
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    height: 100rpx;
    box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.03);
    z-index: 999;
}
.checkbox-wrap {
    display: flex;
    align-items: center;
    margin-right: 40rpx;

    :deep(.round-checkbox) {
        .uni-checkbox-input {
            border-radius: 100% !important;
            width: 36rpx !important;
            height: 36rpx !important;
        }
    }
}
.checkbox-text {
    font-size: 28rpx;
    color: #333;
    margin-left: 12rpx;
}
.price-info {
    flex: 1;
    margin-right: 30rpx;
    display: flex;
    flex-direction: column;
}
.total-line {
    font-size: 28rpx;
    color: #333;
    display: flex;
    align-items: center;
}
.footer-price {
    color: #e60012;
    font-size: 32rpx;
    font-weight: bold;
}
.discount-line {
    font-size: 24rpx;
    color: #999;
    margin-top: 4rpx;
    display: flex;
    align-items: center;
}
.discount-price {
    color: #999;
    margin-left: 8rpx;
}
.checkout-btn {
    background: #233cfe;
    color: #fff;
    border-radius: 44rpx;
    padding: 0 50rpx;
    height: 72rpx;
    line-height: 72rpx;
    font-size: 28rpx;
    font-weight: 500;
    box-shadow: 0 8rpx 16rpx rgba(36, 107, 251, 0.15);
}
.loading,
.no-more {
    text-align: center;
    color: #999;
    padding: 20rpx 0;
}
:deep(.u-swipe-action-item) {
    background: #fff !important;
}

:deep(.u-swipe-action-item__content) {
    background: #fff;
    position: relative;
    z-index: 10;
}

:deep(.u-swipe-action-item__right) {
    height: 100%;
    display: flex;
    align-items: stretch;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
}

:deep(.u-swipe-action-item__right__button) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 100%;
    margin: 0;
    border-top: 8rpx solid #fff;
    border-bottom: 8rpx solid #fff;

    &:last-child {
        border-right: 8rpx solid #fff;
        border-top-right-radius: 24rpx;
        border-bottom-right-radius: 24rpx;
    }
}
</style>
