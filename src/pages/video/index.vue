<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'uni-mini-router';
import { onLoad } from '@dcloudio/uni-app';
import { getVideoDetail, getVideoRandom } from '@/services/api/organization';

type VideoInfoType = Omit<Awaited<ReturnType<typeof getVideoDetail>>, 'code' | 'msg' | 'requestId'>;
type RandomVideoType = Omit<Awaited<ReturnType<typeof getVideoRandom>>, 'code' | 'msg' | 'requestId'>;

const router = useRouter();

const videoInfo = reactive<VideoInfoType>({});
const randomVideo = reactive<RandomVideoType>({
    data: [],
});

onLoad((option) => {
    if (option && option.id && option.orgId) {
        getVideoDetail({ contentId: option.orgId, orgInfoFileId: option.id }).then((res) => {
            if (res.data) {
                videoInfo.data = res.data;
            }
        });
        getVideoRandom().then((res) => {
            if (res.data) {
                randomVideo.data = res.data;
            }
        });
    }
});

const goVideoDetail = (id: number, orgId: number) => {
    router.push({ path: '/pages/video/index', query: { id: id.toString(), orgId: orgId.toString() } });
};
</script>

<template>
    <video class="block h-[372rpx] w-full" :src="videoInfo.data?.file_path" />
    <view class="p-[15rpx_35rpx] text-[32rpx] font-bold text-[#333333]">{{ videoInfo.data?.title }}</view>
    <view class="p-[30rpx] text-center font-['Alimama_ShuHeiTi'] text-[36rpx] font-bold text-[#333333]">相关视频</view>
    <view class="grid grid-cols-2 gap-[32rpx] p-[32rpx]">
        <view class="relative h-[416rpx] overflow-hidden rounded-tl-[32rpx] rounded-tr-[32rpx] bg-white" v-for="item of randomVideo.data" :key="item.id">
            <video class="block h-[328rpx] w-full" :src="item.file_path" :initial-time="1" :controls="false" />
            <view class="p-[10rpx]">
                <text class="line-clamp-2 text-[24rpx] font-bold text-[#333]">{{ item.title }}</text>
            </view>
            <view class="absolute inset-0 z-50" @click.stop="goVideoDetail(item.id, item.org_info_id)"></view>
        </view>
    </view>
</template>
