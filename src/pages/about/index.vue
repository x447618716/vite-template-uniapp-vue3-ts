<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useAuthStore } from '@/state/modules/auth';
import { useRouter } from 'uni-mini-router';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

const authStore = useAuthStore();
const isLogin = ref(false);
const router = useRouter();
const popup = ref();

// 用户信息
const userInfo = reactive({
    nickname: 'FHCdm',
    subtitle: '孤独的惯导三',
});

// 编辑表单
const editForm = reactive({
    subtitle: '',
});

// 显示编辑弹窗
const showEditPopup = () => {
    editForm.subtitle = userInfo.subtitle;
    popup.value.open();
};

// 关闭弹窗
const closePopup = () => {
    popup.value.close();
};

// 保存修改
const handleSave = () => {
    userInfo.subtitle = editForm.subtitle;
    closePopup();
    // TODO: 这里可以添加保存到后端的逻辑
    uni.showToast({
        title: '保存成功',
        icon: 'success',
    });
};

onShow(() => {
    isLogin.value = authStore.isLogin;
});

const handleJump = (url: string) => {
    router.push(url);
};
</script>
<template>
    <view class="container">
        <!-- 头部用户信息 -->
        <view class="user-header">
            <view class="avatar-container">
                <image class="avatar" src="/static/images/avatar.png" mode="aspectFill" />
            </view>
            <view class="user-info">
                <text class="nickname">{{ userInfo.nickname }}</text>
                <text class="subtitle">{{ userInfo.subtitle }}</text>
            </view>
            <view class="header-icons">
                <view class="icon-wrapper" @click="showEditPopup">
                    <svg-icon name="Bianji" :size="15" />
                </view>
                <view class="icon-wrapper">
                    <svg-icon name="Shezhi" :size="15" />
                </view>
            </view>
        </view>

        <!-- 编辑弹窗 -->
        <uni-popup ref="popup" type="center">
            <view class="popup-content">
                <view class="popup-title">编辑简介</view>
                <view class="form-item">
                    <input type="text" v-model="editForm.subtitle" class="input" placeholder="请输入简介" />
                </view>
                <view class="popup-buttons">
                    <button class="btn cancel" @click="closePopup">取消</button>
                    <button class="btn save" @click="handleSave">保存</button>
                </view>
            </view>
        </uni-popup>

        <!-- 订单状态 -->
        <view class="order-tabs">
            <view class="tab-item" @click="handleJump('/pages/order/list?status=all')">
                <view class="icon-container">
                    <svg-icon name="DINGdan" :size="20" />
                </view>
                <text class="tab-text">全部订单</text>
            </view>
            <view class="tab-item" @click="handleJump('/pages/order/list?status=pending')">
                <view class="icon-container">
                    <svg-icon name="Daiqueren" :size="20" />
                </view>
                <text class="tab-text">待确认</text>
            </view>
            <view class="tab-item" @click="handleJump('/pages/order/list?status=completed')">
                <view class="icon-container">
                    <svg-icon name="Yiwancheng" :size="20" />
                </view>
                <text class="tab-text">已完成</text>
            </view>
            <view class="tab-item" @click="handleJump('/pages/order/list?status=cancelled')">
                <view class="icon-container">
                    <svg-icon name="Yiquxiao" :size="20" />
                </view>
                <text class="tab-text">已取消</text>
            </view>
        </view>

        <!-- 功能列表 -->
        <view class="function-list">
            <view class="function-item" @click="handleJump('/pages/address/myAddress')">
                <view class="item-left">
                    <view class="icon-container">
                        <svg-icon name="Dizhi" :size="20" />
                    </view>
                    <text class="function-text">我的地址</text>
                </view>
            </view>
            <view class="function-item" @click="handleJump('/pages/collection/list')">
                <view class="item-left">
                    <view class="icon-container">
                        <svg-icon name="Shoucang" :size="20" />
                    </view>
                    <text class="function-text">我的收藏</text>
                </view>
            </view>
            <view class="function-item" @click="handleJump('/pages/browse/history')">
                <view class="item-left">
                    <view class="icon-container">
                        <svg-icon name="Liulan" :size="20" />
                    </view>
                    <text class="function-text">浏览记录</text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.container {
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: relative;
    // 头部用户信息
    .user-header {
        display: flex;
        align-items: center;
        padding: 48rpx 30rpx 20rpx 30rpx;

        .avatar-container {
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20rpx;

            .avatar {
                width: 100%;
                height: 100%;
            }
        }

        .user-info {
            flex: 1;
            display: flex;
            flex-direction: column;

            .nickname {
                font-size: 36rpx;
                font-weight: 500;
                color: #333;
                line-height: 1.2;
            }

            .subtitle {
                font-size: 24rpx;
                color: #999;
                line-height: 1.2;
                margin-top: 4rpx;
            }
        }

        .header-icons {
            display: flex;
            align-items: center;
            gap: 30rpx;

            .icon-wrapper {
                width: 40rpx;
                height: 40rpx;
                display: flex;
                align-items: center;
                justify-content: center;

                &:active {
                    transform: scale(0.9);
                    opacity: 0.8;
                }
            }
        }
    }

    // 订单状态标签
    .order-tabs {
        display: flex;
        justify-content: space-around;
        padding: 40rpx 0 20rpx 0;
        background: linear-gradient(to bottom, #e6f5ff, #ffffff);
        margin: 30rpx;
        border-radius: 16rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
        border: none;

        .tab-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            &:active {
                transform: scale(0.95);
                opacity: 0.8;
            }

            .icon-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10rpx;
                box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
            }

            .tab-text {
                margin-top: 5rpx;
                font-size: 24rpx;
                color: #333333;
                line-height: 52rpx;
            }
        }
    }

    // 功能列表
    .function-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20rpx;
        margin: 26rpx 30rpx;
        background-color: #fff;
        border-radius: 16rpx;
        padding: 30rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

        .function-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;

            &:active {
                transform: scale(0.95);
                opacity: 0.8;
            }

            .item-left {
                display: flex;
                flex-direction: column;
                align-items: center;

                .icon-container {
                    width: 80rpx;
                    height: 80rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .function-text {
                    font-size: 26rpx;
                    color: #333;
                    text-align: center;
                }
            }
        }
    }
}

// 弹窗样式
.popup-content {
    background-color: #fff;
    border-radius: 16rpx;
    width: 600rpx;
    padding: 40rpx;

    .popup-title {
        font-size: 32rpx;
        font-weight: 500;
        text-align: center;
        margin-bottom: 40rpx;
    }

    .form-item {
        margin-bottom: 30rpx;

        .label {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 16rpx;
            display: block;
        }

        .input {
            width: 100%;
            height: 80rpx;
            border: 2rpx solid #eee;
            border-radius: 8rpx;
            padding: 0 20rpx;
            font-size: 28rpx;
            box-sizing: border-box;
        }
    }

    .popup-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        gap: 20rpx;

        .btn {
            flex: 1;
            height: 80rpx;
            border-radius: 8rpx;
            font-size: 28rpx;
            display: flex;
            align-items: center;
            justify-content: center;

            &.cancel {
                background-color: #f5f5f5;
                color: #666;
            }

            &.save {
                background-color: #007aff;
                color: #fff;
            }

            &:active {
                opacity: 0.8;
            }
        }
    }
}
</style>
