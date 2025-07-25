<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'uni-mini-router';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { getClassifyList, getOrgSubjectList, getPopularityList, getVideoList } from '@/services/api/organization';

type VideoListType = Omit<Awaited<ReturnType<typeof getVideoList>>, 'code' | 'msg'>;
type BannerListType = Omit<Awaited<ReturnType<typeof getPopularityList>>, 'code' | 'msg' | 'requestId'>;
type ClassifyListType = Omit<Awaited<ReturnType<typeof getClassifyList>>, 'code' | 'msg' | 'requestId'>;
type SubjectListType = Omit<Awaited<ReturnType<typeof getOrgSubjectList>>, 'code' | 'msg'>;

const router = useRouter();

const init = ref(true);
const menuActive = ref(false);
const classifyActive = ref<number>(0);
const sortActive = ref<1 | 2>(1);
const sortTime = ref(true);
const sortRead = ref(true);
const videoPageNum = ref(1);
const subjectPageNum = ref(1);

const videoList = reactive<VideoListType>({
    rows: [],
    total: 0,
});

const bannerList = reactive<BannerListType>({
    data: [],
});

const classifyList = reactive<ClassifyListType>({
    data: [],
});

const subjectList = reactive<SubjectListType>({
    rows: [],
    total: 0,
});

const sortText = computed(() => {
    return sortActive.value == 1 ? (sortTime.value ? 'ASC' : 'DESC') : sortRead.value ? 'ASC' : 'DESC';
});

onLoad(() => {
    getVideoList({ pageNum: videoPageNum.value, pageSize: 15 }).then((res) => {
        videoList.rows = res.rows ?? [];
        videoList.total = res.total ?? 0;
    });
    getPopularityList().then((res) => {
        bannerList.data = res.data ?? [];
    });
    getClassifyList().then((res) => {
        classifyList.data = res.data ?? [];
        if (res.data && res.data.length > 0) {
            classifyActive.value = res.data[0]!.id;
            getOrgSubjectList({
                pageNum: subjectPageNum.value,
                pageSize: 15,
                type: sortActive.value,
                sort: sortText.value,
                unionInfoId: classifyActive.value,
            }).then((res) => {
                subjectList.rows = res.rows ?? [];
                subjectList.total = res.total ?? 0;
            });
        }
    });
});

onReachBottom(() => {
    if (menuActive.value) {
        if (videoList.rows && videoList.total) {
            if (videoList.rows.length < videoList.total) {
                videoPageNum.value++;
                getVideoList({ pageNum: videoPageNum.value, pageSize: 15 }).then((res) => {
                    if (res.rows && videoList.rows) {
                        videoList.rows = [...videoList.rows, ...res.rows];
                        videoList.total = res.total ?? 0;
                    }
                });
            }
        }
    } else {
        if (subjectList.rows && subjectList.total) {
            if (subjectList.rows.length < subjectList.total) {
                subjectPageNum.value++;
                getOrgSubjectList({
                    pageNum: subjectPageNum.value,
                    pageSize: 15,
                    type: sortActive.value,
                    sort: sortText.value,
                    unionInfoId: classifyActive.value,
                }).then((res) => {
                    if (res.rows && subjectList.rows) {
                        subjectList.rows = [...subjectList.rows, ...res.rows];
                        subjectList.total = res.total ?? 0;
                    }
                });
            }
        }
    }
});

watch(
    [sortActive, sortText, classifyActive],
    () => {
        if (!init.value) {
            subjectPageNum.value = 1;
            subjectList.rows = [];
            getOrgSubjectList({
                pageNum: subjectPageNum.value,
                pageSize: 3,
                type: sortActive.value,
                sort: sortText.value,
                unionInfoId: classifyActive.value,
            }).then((res) => {
                subjectList.rows = res.rows ?? [];
                subjectList.total = res.total ?? 0;
            });
        }
        init.value = false;
    },
    {
        immediate: false,
    },
);

const getClassifyText = (id: number) => {
    if (classifyList.data && classifyList.data.length > 0) {
        return classifyList.data.find((item) => item.id === id)?.unionName ?? '';
    } else {
        return '';
    }
};

const goVideoDetail = (id: number, orgId: number) => {
    router.push({ path: '/pages/video/index', query: { id: id.toString(), orgId: orgId.toString() } });
};
</script>

<template>
    <!-- 搜索H5下展示 小程序中设计存在缺钱没考虑小程序胶囊问题   -->
    <uni-icons
        class="fixed top-[15rpx] right-[15rpx] z-[999]"
        color="#fff"
        type="search"
        size="25"
        @click="router.push('/pages/organizationSearch/index')"></uni-icons>
    <view class="flex h-[88rpx] w-full items-center justify-around bg-[#E5EDFB]">
        <view
            class="flex h-[64rpx] w-[324rpx] items-center justify-center text-[28rpx] text-[#999]"
            :class="{ 'rounded-[32rpx] bg-white font-bold text-[#333]!': !menuActive }"
            @click="menuActive = false">
            专题列表
        </view>
        <view
            class="flex h-[64rpx] w-[324rpx] items-center justify-center text-[28rpx] text-[#999]"
            :class="{ 'rounded-[32rpx] bg-white font-bold text-[#333]!': menuActive }"
            @click="menuActive = true">
            最新视频
        </view>
    </view>
    <view class="pb-[30rpx]" v-show="!menuActive">
        <view class="pt-[36rpx] pb-[36rpx] text-center font-['Alimama_ShuHeiTi'] text-[36rpx] font-bold text-[#233CFE]">人气专题</view>
        <swiper class="h-[367rpx]" :circular="true" :autoplay="true" previous-margin="50rpx" next-margin="50rpx">
            <swiper-item v-for="item of bannerList.data" :key="item.id">
                <view class="flex h-[367rpx] w-[576rpx] flex-col justify-between rounded-[32rpx] border-2 border-solid border-white bg-[#F5FCFF] p-[20rpx]">
                    <view class="line-clamp-1 text-[28rpx] font-bold text-[#233CFE]">{{ item.title }}</view>
                    <view class="line-clamp-1 text-[20rpx] font-medium text-[#333333]">{{ item.description }}</view>
                    <image class="h-[240rpx] w-[520rpx] rounded-[32rpx]" :src="`https://picsum.photos/200/300?id=${item.id}`" />
                </view>
            </swiper-item>
        </swiper>
        <view class="flex p-[30rpx] text-[24rpx] font-bold text-[#333333]">
            <view class="mr-[25rpx]" :class="{ 'text-[#233CFE]': sortActive == 1 }" @click="sortActive = 1">
                <text class="pr-1.5">按时间</text>
                <uni-icons v-show="sortTime" type="up" @click="sortTime = !sortTime" :color="sortActive == 1 ? '#233CFE' : '#666'" size="15"></uni-icons>
                <uni-icons v-show="!sortTime" type="down" @click="sortTime = !sortTime" :color="sortActive == 1 ? '#233CFE' : '#666'" size="15"></uni-icons>
            </view>
            <view :class="{ 'text-[#233CFE]': sortActive == 2 }" @click="sortActive = 2">
                <text class="pr-1.5">按阅读量</text>
                <uni-icons v-show="sortRead" type="up" @click="sortRead = !sortRead" :color="sortActive == 2 ? '#233CFE' : '#666'" size="15"></uni-icons>
                <uni-icons v-show="!sortRead" type="down" @click="sortRead = !sortRead" :color="sortActive == 2 ? '#233CFE' : '#666'" size="15"></uni-icons>
            </view>
        </view>
        <scroll-view :scroll-x="true" :show-scrollbar="false" style="white-space: nowrap">
            <view
                class="mr-[15rpx] ml-[15rpx] inline-block w-fit rounded-[10rpx] bg-white p-[20rpx]"
                :class="{ 'bg-[#233CFE]! text-white': classifyActive == item.id }"
                @click="classifyActive = item.id"
                v-for="item of classifyList.data"
                :key="item.id">
                {{ item.unionName }}
            </view>
        </scroll-view>

        <view
            class="m-[25rpx_auto] flex h-[535rpx] w-[686rpx] flex-col justify-between rounded-[32rpx] border-4 border-solid border-white bg-[#F5FCFF] p-[25rpx]"
            v-for="item of subjectList.rows"
            :key="item.id">
            <view class="flex items-center justify-between pb-[25rpx]">
                <view class="flex items-center">
                    <view class="h-[56rpx] w-[56rpx] rounded-[50%] bg-[#323FA5]"></view>
                    <view class="pl-[15rpx] text-[28rpx] font-bold text-[#233CFE]">{{ getClassifyText(item.union_info_id) }}</view>
                </view>
                <view class="text-[20rpx] font-bold text-[#333333]">{{ item.create_time }}</view>
            </view>
            <image class="m-[0_auto] block h-[240rpx] w-[630rpx] rounded-[32rpx]" :src="`https://picsum.photos/200/300?id=${item.id}`" />
            <view class="line-clamp-1 text-[32rpx] font-bold text-[#333333]">{{ item.title }}</view>
            <view class="line-clamp-1 text-[24rpx] font-normal text-[#333333]">{{ item.description }}</view>
            <view class="flex items-center">
                <uni-icons type="eye" size="20"></uni-icons>
                <text class="pr-[15rpx] pl-[15rpx] text-[24rpx] font-medium text-[#333333]">{{ item.read_count }}</text>
                <uni-icons type="chat" size="20"></uni-icons>
                <text class="pr-[15rpx] pl-[15rpx] text-[24rpx] font-medium text-[#333333]">{{ item.comment_count }}</text>
                <uni-icons type="heart" size="20"></uni-icons>
                <text class="pr-[15rpx] pl-[15rpx] text-[24rpx] font-medium text-[#333333]">{{ item.upvote_count }}</text>
            </view>
        </view>
    </view>
    <view v-show="menuActive">
        <view class="grid grid-cols-2 gap-[32rpx] p-[32rpx]">
            <view class="relative h-[416rpx] overflow-hidden rounded-tl-[32rpx] rounded-tr-[32rpx] bg-white" v-for="item of videoList.rows" :key="item.id">
                <video class="block h-[328rpx] w-full" :src="item.file_path" :initial-time="1" :controls="false" />
                <view class="p-[10rpx]">
                    <text class="line-clamp-2 text-[24rpx] font-bold text-[#333]">{{ item.title }}</text>
                </view>
                <view class="absolute inset-0 z-50" @click.stop="goVideoDetail(item.id, item.org_info_id)"></view>
            </view>
        </view>
    </view>
</template>
