<template>
    <view class="article-container">
        <!-- 文章标题区域 -->
        <view class="article-header">
            <text class="article-title">{{ article.title }}</text>
            <view class="article-meta">
                <text class="publish-time">发布时间：{{ article.publishTime }}</text>
            </view>
        </view>

        <!-- 文章内容区域 -->
        <view class="article-content">
            <!-- 顶部大图 -->
            <image class="article-banner" :src="article.banner" mode="widthFix"></image>

            <!-- 文章内容 -->
            <view class="content-wrapper">
                <template v-for="(section, index) in article.sections" :key="index">
                    <text v-if="section.type === 'text'" class="content-text">
                        {{ section.content }}
                    </text>
                    <image v-if="section.type === 'image'" class="content-image" :src="section.content" mode="widthFix"></image>
                </template>
            </view>
        </view>

        <!-- 底部固定评论输入栏 -->
        <view class="comment-bar">
            <view class="input-wrapper">
                <input
                    type="text"
                    v-model="commentText"
                    class="comment-input"
                    placeholder="说点什么..."
                    confirm-type="send"
                    cursor-spacing="10"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                    @confirm="submitComment" />
                <view class="send-btn" :class="{ active: commentText.trim() }" @tap="submitComment">发送</view>
            </view>
            <view class="action-buttons">
                <view class="action-btn" @tap="toggleLike">
                    <uni-icons :type="article.isLiked ? 'heart-filled' : 'heart'" size="24" :color="article.isLiked ? '#ff4444' : '#666'"></uni-icons>
                </view>
                <view class="action-btn" @tap="toggleFavorite">
                    <uni-icons :type="article.isFavorited ? 'star-filled' : 'star'" size="24" :color="article.isFavorited ? '#ffd700' : '#666'"></uni-icons>
                </view>
                <view class="action-btn comment-count" @tap="goToCommentList">
                    <uni-icons type="chat" size="24" color="#666"></uni-icons>
                    <text class="count">99</text>
                </view>
            </view>
        </view>

        <!-- 评论弹出层 -->
        <view class="comment-popup" v-if="showComment">
            <view class="popup-mask" @tap="hideCommentInput"></view>
            <view class="popup-content">
                <view class="input-area">
                    <input type="text" v-model="commentText" placeholder="说点什么..." class="comment-input" auto-focus @confirm="submitComment" />
                    <view class="submit-btn" :class="{ active: commentText.trim() }" @tap="submitComment">发送</view>
                </view>
            </view>
        </view>

        <!-- 评论列表弹出层 -->
        <view class="comment-list-popup" v-if="showCommentListPopup">
            <view class="popup-mask" @tap="hideCommentList"></view>
            <view class="popup-content">
                <view class="popup-header">
                    <text class="title">评论 {{ article.comments }}</text>
                    <text class="close-btn" @tap="hideCommentList">×</text>
                </view>
                <scroll-view class="comments-container" :scroll-y="true">
                    <view v-if="commentList.length === 0" class="empty-tips">暂无评论，快来抢沙发吧~</view>
                    <view v-else class="comment-list">
                        <view v-for="(comment, index) in commentList" :key="index" class="comment-item">
                            <image class="avatar" :src="comment.avatar" mode="aspectFill"></image>
                            <view class="comment-content">
                                <text class="username">{{ comment.username }}</text>
                                <text class="content">{{ comment.content }}</text>
                                <view class="meta">
                                    <text class="time">{{ comment.time }}</text>
                                    <view class="like">
                                        <text class="iconfont icon-heart"></text>
                                        <text>{{ comment.likes }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 文章数据
const article = reactive({
    title: '我就是一块有温度的"顽石"',
    publishTime: '2018-10-17 11:05',
    banner: 'https://dummyimage.com/343x146/e0e0e0/333333&text=banner1',
    sections: [
        {
            type: 'text',
            content:
                '看到你用户，为了给您带来更好的体验，您的某区域账号将于2017年4月26日22：00-2017年4月27日09:00期间进行升级。升级期间部分关于某某入口将暂时下线，升级后将正常充值的显示充值完成，请各充值玩家，请各位玩家的用户提前充值或者等系统升级后再充值。',
        },
        {
            type: 'image',
            content: 'https://dummyimage.com/343x146/e0e0e0/333333&text=content1',
        },
        {
            type: 'text',
            content: '在这个快速发展的数字时代，技术创新不断推动着社会进步。作为一名技术从业者，我们不仅要保持专业性，更要保持人文关怀。',
        },
        {
            type: 'image',
            content: 'https://dummyimage.com/343x146/e0e0e0/333333&text=content2',
        },
        {
            type: 'text',
            content: '您的带来的不便，敬请谅解，感谢您一如既往的支持。',
        },
    ],
    isLiked: false,
    likes: 0,
    comments: 0,
    isFavorited: false,
});

const showComment = ref(false);
const commentText = ref('');
const showCommentListPopup = ref(false);
const isKeyboardShow = ref(false);

const commentList = ref([
    {
        username: '用户1',
        avatar: 'https://dummyimage.com/80x80/e0e0e0/333333&text=avatar',
        content: '这是一条示例评论内容',
        time: '2024-03-20 14:30',
        likes: 12,
    },
    {
        username: '用户2',
        avatar: 'https://dummyimage.com/80x80/e0e0e0/333333&text=avatar',
        content: '文章写得很好，收获很多！',
        time: '2024-03-20 15:00',
        likes: 8,
    },
]);

// 页面加载
const onLoad = (options) => {
    if (options.params) {
        try {
            const articleData = JSON.parse(decodeURIComponent(options.params));
            Object.assign(article, articleData);
        } catch (e) {
            uni.showToast({
                title: e,
                icon: 'none',
            });
        }
    }
};

// 方法定义
const goToCommentList = () => {
    uni.navigateTo({
        url: '/pages/article/comment-list',
    });
};

const toggleLike = () => {
    article.isLiked = !article.isLiked;
    article.likes += article.isLiked ? 1 : -1;
    uni.showToast({
        title: article.isLiked ? '已点赞' : '已取消点赞',
        icon: 'none',
        duration: 1500,
    });
};

const toggleFavorite = () => {
    article.isFavorited = !article.isFavorited;
    uni.showToast({
        title: article.isFavorited ? '已收藏' : '已取消收藏',
        icon: 'none',
        duration: 1500,
    });
};

const hideCommentInput = () => {
    showComment.value = false;
};

const handleInputFocus = () => {
    isKeyboardShow.value = true;
};

const handleInputBlur = () => {
    isKeyboardShow.value = false;
};

const submitComment = () => {
    if (!commentText.value.trim()) {
        uni.showToast({
            title: '请输入评论内容',
            icon: 'none',
        });
        return;
    }

    const newComment = {
        username: '用户',
        avatar: 'https://dummyimage.com/80x80/e0e0e0/333333&text=avatar',
        content: commentText.value.trim(),
        time: new Date().toLocaleString(),
        likes: 0,
    };

    commentList.value.unshift(newComment);
    article.comments++;

    commentText.value = '';
    uni.hideKeyboard();

    setTimeout(() => {
        uni.showToast({
            title: '评论发布成功',
            icon: 'success',
            duration: 2000,
        });
    }, 100);
};

// const checkLogin = () => {
//     const isLoggedIn = false;
//     if (!isLoggedIn) {
//         uni.navigateTo({
//             url: '/pages/login/index',
//         });
//         return false;
//     }
//     return true;
// };

// const showCommentList = () => {
//     if (!checkLogin()) return;
//     showCommentListPopup.value = true;
// };

const hideCommentList = () => {
    showCommentListPopup.value = false;
};

// 导出页面生命周期钩子
defineExpose({
    onLoad,
});
</script>

<style lang="scss">
.article-container {
    background: #fff;
    min-height: 100vh;
    // 为底部固定栏留出空间
    padding: 30rpx 30rpx 120rpx;

    .article-header {
        margin-bottom: 40rpx;

        .article-title {
            font-size: 40rpx;
            font-weight: bold;
            color: #333;
            line-height: 1.4;
        }

        .article-meta {
            margin-top: 20rpx;

            .publish-time {
                font-size: 24rpx;
                color: #999;
            }
        }
    }

    .article-content {
        // 文章大图样式
        .article-banner {
            width: 100%;
            border-radius: 16rpx;
            margin-bottom: 30rpx;
        }

        .content-wrapper {
            .content-text {
                font-size: 30rpx;
                color: #333;
                line-height: 1.8;
                margin-bottom: 30rpx;
                display: block;
            }

            .content-image {
                width: 100%;
                border-radius: 12rpx;
                margin: 20rpx 0 30rpx;
            }
        }
    }
}

// 底部固定评论栏
.comment-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    border-top: 1rpx solid #eee;

    .input-wrapper {
        flex: 1;
        height: 72rpx;
        background-color: #f5f5f5;
        border-radius: 36rpx;
        padding: 0 20rpx;
        display: flex;
        align-items: center;

        .comment-input {
            flex: 1;
            height: 100%;
            font-size: 28rpx;
            background: transparent;
        }

        .send-btn {
            padding: 0 20rpx;
            font-size: 28rpx;
            color: #999;

            &.active {
                color: #3366ff;
            }
        }
    }

    .action-buttons {
        display: flex;
        gap: 30rpx;

        .action-btn {
            padding: 10rpx;
            display: flex;
            align-items: center;
            justify-content: center;

            // 添加点击效果
            &:active {
                opacity: 0.8;
            }
        }
    }
}

// 评论弹出层
.comment-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;

    .popup-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .popup-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        padding: 20rpx;

        .input-area {
            display: flex;
            align-items: center;
            gap: 20rpx;
            padding: 20rpx;

            .comment-input {
                flex: 1;
                height: 80rpx;
                background-color: #f5f5f5;
                border-radius: 40rpx;
                padding: 0 30rpx;
                font-size: 28rpx;
            }

            .submit-btn {
                padding: 16rpx 30rpx;
                border-radius: 32rpx;
                background-color: #eee;
                color: #999;
                font-size: 28rpx;

                &.active {
                    background-color: #3366ff;
                    color: #fff;
                }
            }
        }
    }
}

// 评论列表弹出层样式
.comment-list-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;

    .popup-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .popup-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        border-radius: 24rpx 24rpx 0 0;
        max-height: 80vh;
        display: flex;
        flex-direction: column;

        .popup-header {
            padding: 30rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1rpx solid #eee;

            .title {
                font-size: 32rpx;
                font-weight: bold;
                color: #333;
            }

            .close-btn {
                font-size: 48rpx;
                color: #999;
                padding: 0 20rpx;
            }
        }

        .comments-container {
            flex: 1;
            height: 60vh;

            .empty-tips {
                padding: 60rpx 0;
                text-align: center;
                color: #999;
                font-size: 28rpx;
            }

            .comment-list {
                padding: 20rpx 30rpx;

                .comment-item {
                    display: flex;
                    padding: 20rpx 0;
                    border-bottom: 1rpx solid #f5f5f5;

                    .avatar {
                        width: 80rpx;
                        height: 80rpx;
                        border-radius: 50%;
                        margin-right: 20rpx;
                    }

                    .comment-content {
                        flex: 1;

                        .username {
                            font-size: 28rpx;
                            color: #333;
                            font-weight: bold;
                        }

                        .content {
                            font-size: 28rpx;
                            color: #333;
                            margin: 10rpx 0;
                            line-height: 1.6;
                        }

                        .meta {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 10rpx;

                            .time {
                                font-size: 24rpx;
                                color: #999;
                            }

                            .like {
                                display: flex;
                                align-items: center;
                                gap: 6rpx;
                                font-size: 24rpx;
                                color: #999;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
