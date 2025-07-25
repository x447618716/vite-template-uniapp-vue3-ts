<template>
    <view>
        <view class="container">
            <view v-for="(item, idx) in addressList" :key="idx" class="address-card">
                <view class="address-header">
                    <text class="name">收货人：{{ item.name }}</text>
                    <text class="phone">{{ item.phone }}</text>
                </view>
                <view class="address-detail">{{ item.detail }}</view>
                <view class="divider"></view>
                <view class="address-footer">
                    <view class="radio-container">
                        <radio :checked="item.default" @click="setDefault(idx)" color="#246BFB" />
                        <text class="default-text" :class="{ active: item.default }">默认地址</text>
                    </view>
                    <view class="actions">
                        <view class="icon-btn" @click="edit(idx)">
                            <uni-icons type="compose" size="22" color="#888" />
                            <text>编辑</text>
                        </view>
                        <view class="icon-btn" @click="remove(idx)">
                            <uni-icons type="trash" size="22" color="#888" />
                            <text>删除</text>
                        </view>
                    </view>
                </view>
            </view>
            <button class="add-btn" @click="add">新增收货地址</button>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAddressStore } from '@/state/modules/address';

const addressStore = useAddressStore();

const addressList = ref([
    {
        name: 'ABC',
        phone: '17289200212',
        detail: '四川省 成都市 武侯区 置信南街61号 兰园5栋2单元5楼 这是俩排的地址',
        default: true,
    },
    {
        name: 'ABC',
        phone: '17289200212',
        detail: '四川省 成都市 武侯区 置信南街61号 兰园5栋2单元5楼 这是俩排的地址',
        default: false,
    },
]);

const setDefault = (idx: number) => {
    addressList.value.forEach((item, i) => (item.default = i === idx));
};

const edit = (idx: number) => {
    const item = addressList.value[idx];
    if (item) {
        addressStore.setEditAddressData(item);
        uni.navigateTo({ url: '/pages/address/editAddress' });
    }
};

const add = () => {
    addressStore.clearEditAddressData();
    uni.navigateTo({ url: '/pages/address/editAddress' });
};

const remove = (idx: number) => {
    addressList.value.splice(idx, 1);
};
</script>

<style lang="scss" scoped>
.container {
    padding: 32rpx 0;
    min-height: 100vh;
    background: #fafbfc;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.address-card {
    width: 90vw;
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 32rpx;
    padding: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
}
.address-header {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
}
.address-detail {
    color: #888;
    margin: 16rpx 0;
    font-size: 22rpx;
}
.divider {
    width: 100%;
    height: 1px;
    background: #eee;
    margin: 16rpx 0;
}
.address-footer {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    justify-content: space-between;
}
.default-text {
    margin-left: 8rpx;
    color: #888;
    &.active {
        color: #246bfb;
    }
}
.actions {
    display: flex;
    align-items: center;
}
.icon-btn {
    display: flex;
    align-items: center;
    margin-left: 32rpx;
    color: #888;
    text {
        margin-left: 4rpx;
    }
}
.add-btn {
    width: 80vw;
    height: 80rpx;
    background: #233cfe;
    color: #fff;
    border-radius: 40rpx;
    font-size: 32rpx;
    margin-top: 64rpx;
}
</style>
