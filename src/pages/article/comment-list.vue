<template>
    <view class="comment-list-page">
        <!-- 评论列表 -->
        <scroll-view class="comment-list" scroll-y @scrolltolower="loadMore">
            <view v-if="comments.length === 0" class="empty-tips">
                <image src="/static/images/empty-comment.png" mode="aspectFit" class="empty-icon"></image>
                <text class="empty-text">还没有评论</text>
                <text class="empty-subtext">快来抢沙发吧~</text>
            </view>
            <view v-else class="comment-items">
                <view v-for="(comment, index) in comments" :key="index" class="comment-item">
                    <view class="comment-header">
                        <view class="user-info">
                            <image class="avatar" :src="comment.avatar" mode="aspectFill"></image>
                            <text class="username">{{ comment.username }}</text>
                        </view>
                        <view class="like-btn" @tap="toggleLike(index)">
                            <uni-icons :type="comment.isLiked ? 'heart-filled' : 'heart'" size="16" :color="comment.isLiked ? '#ff4444' : '#999'"></uni-icons>
                            <text :class="{ active: comment.isLiked }">{{ comment.likes }}</text>
                        </view>
                    </view>
                    <view class="comment-content">
                        <text>{{ comment.content }}</text>
                    </view>
                    <view class="comment-footer">
                        <text class="time">{{ comment.time }}</text>
                        <text v-if="comment.replyCount > 0" class="reply-count" @click="showReplyPopup(comment)">{{ comment.replyCount }}回复</text>
                    </view>
                </view>
            </view>
            <!-- 加载更多 -->
            <view v-if="loading" class="loading">
                <view class="loading-dots">
                    <view class="dot"></view>
                    <view class="dot"></view>
                    <view class="dot"></view>
                </view>
            </view>
            <view v-if="noMore" class="no-more">
                <view class="line"></view>
                <text>我是有底线的</text>
                <view class="line"></view>
            </view>
            <!-- 使用封装的评论回复组件 -->
            <comment-reply ref="replyPopup" :comment="currentComment" @close="handleReplyClose" @submit="handleReplySubmit" />
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CommentReply from '@/components/comment-reply/comment-reply.vue';

// 响应式状态
const comments = ref([]); // 评论列表
const loading = ref(false);
const noMore = ref(false);
const page = ref(1);

// 定义响应式变量
const replyPopup = ref(null);
const currentComment = ref(null);

// 加载评论列表
const loadComments = async () => {
    if (loading.value || noMore.value) return;

    loading.value = true;
    // 模拟加载数据
    setTimeout(() => {
        const newComments = Array(10)
            .fill(null)
            .map((_, index) => ({
                id: comments.value.length + index,
                username: '用户名称',
                avatar: 'https://dummyimage.com/80x80/e0e0e0/333333&text=avatar',
                content:
                    '与其在朋友圈咨询看，不如写篇文章，泡茶，清雪，赏水墨，近在咫尺兔乐毛，但这天寒地冻，就用手绘暖暖和雪地都温暖自己吧，半辈子过去了看着的日子，怎么就过了一个冬天。',
                time: '15分钟前',
                likes: 11,
                isLiked: false,
                replyCount: 15, // 添加回复数
            }));

        comments.value.push(...newComments);
        loading.value = false;

        if (comments.value.length >= 30) {
            noMore.value = true;
        }
    }, 1000);
};

const toggleLike = (index) => {
    const comment = comments.value[index];
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
};

const loadMore = () => {
    page.value++;
    loadComments();
};

// 显示回复弹窗
const showReplyPopup = (comment) => {
    currentComment.value = comment;
    replyPopup.value.open();
};

// 处理回复关闭
const handleReplyClose = () => {
    currentComment.value = null;
};

// 处理回复提交
const handleReplySubmit = (data) => {
    console.log('回复内容：', data);
    // 这里实现回复提交逻辑
    // 可以调用API发送回复
    uni.showToast({
        title: '回复成功',
        icon: 'success',
    });

    // 更新评论数据
    if (currentComment.value) {
        currentComment.value.replyCount += 1;
    }
};

// 生命周期钩子
onMounted(() => {
    loadComments();
});
</script>

<style lang="scss">
.comment-list-page {
    min-height: 100vh;
    background-color: #fff;

    .comment-list {
        height: 100vh;

        .comment-items {
            .comment-item {
                padding: 30rpx;
                border-bottom: 1rpx solid #eee;

                .comment-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20rpx;

                    .user-info {
                        display: flex;
                        align-items: center;

                        .avatar {
                            width: 64rpx;
                            height: 64rpx;
                            border-radius: 50%;
                            margin-right: 20rpx;
                        }

                        .username {
                            font-size: 28rpx;
                            color: #333;
                        }
                    }

                    .like-btn {
                        display: flex;
                        align-items: center;
                        gap: 6rpx;

                        text {
                            font-size: 24rpx;
                            color: #999;

                            &.active {
                                color: #ff4444;
                            }
                        }
                    }
                }

                .comment-content {
                    font-size: 28rpx;
                    color: #333;
                    line-height: 1.6;
                    margin-bottom: 20rpx;
                }

                .comment-footer {
                    display: flex;
                    align-items: center;
                    gap: 30rpx;

                    .time {
                        font-size: 24rpx;
                        color: #999;
                    }

                    .reply-count {
                        font-size: 24rpx;
                        color: #999;
                    }
                }
            }
        }
    }
}

.loading {
    padding: 30rpx 0;
    text-align: center;

    .loading-dots {
        display: inline-flex;
        align-items: center;
        gap: 8rpx;

        .dot {
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            background-color: #ddd;
            animation: loading 1s infinite;

            &:nth-child(2) {
                animation-delay: 0.2s;
            }

            &:nth-child(3) {
                animation-delay: 0.4s;
            }
        }
    }
}

.no-more {
    padding: 40rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20rpx;

    .line {
        flex: 1;
        height: 1px;
        background: #eee;
        max-width: 200rpx;
    }

    text {
        color: #999;
        font-size: 24rpx;
    }
}

@keyframes loading {
    0%,
    100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
}

.empty-tips {
    padding: 120rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .empty-icon {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 30rpx;
    }

    .empty-text {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 16rpx;
    }

    .empty-subtext {
        font-size: 28rpx;
        color: #999;
    }
}
</style>
