<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getSearchList } from '@/services/api/organization';
import { onReachBottom } from '@dcloudio/uni-app';
import { debounce } from 'lodash-es';

type SubjectListType = Omit<Awaited<ReturnType<typeof getSearchList>>, 'code' | 'msg'>;

const subjectPageNum = ref(1);
const subjectList = reactive<SubjectListType>({
    rows: [],
    total: 0,
});

const searchValue = ref('');

onReachBottom(() => {
    if (subjectList.rows && subjectList.total) {
        if (subjectList.rows.length < subjectList.total) {
            subjectPageNum.value++;
            getSearchList({
                pageNum: subjectPageNum.value,
                pageSize: 15,
                keyword: searchValue.value,
            }).then((res) => {
                if (res.rows && subjectList.rows) {
                    subjectList.rows = [...subjectList.rows, ...res.rows];
                    subjectList.total = res.total ?? 0;
                }
            });
        }
    }
});

const handleSearch = debounce(() => {
    subjectPageNum.value = 1;
    subjectList.rows = [];
    getSearchList({
        pageNum: subjectPageNum.value,
        pageSize: 15,
        keyword: searchValue.value,
    }).then((res) => {
        if (res.rows && subjectList.rows) {
            subjectList.rows = res.rows;
            subjectList.total = res.total ?? 0;
        }
    });
}, 300);
</script>

<template>
    <uni-search-bar
        class="sticky! top-[44px] z-50 bg-white"
        :radius="20"
        @confirm="handleSearch"
        :focus="true"
        v-model="searchValue"
        @input="handleSearch"></uni-search-bar>

    <view class="pb-[30rpx]">
        <view class="border-b-2 border-b-gray-400 p-[30rpx]" v-for="item in subjectList.rows" :key="item.id">
            <view class="line-clamp-1 text-[32rpx] font-bold text-[#333]">{{ item.title }}</view>
            <view class="flex pt-[20rpx]">
                <image
                    class="block h-[140rpx] w-[280rpx] overflow-hidden rounded-[32rpx]"
                    :src="`https://picsum.photos/500/230?id=${item.id}`"
                    mode="aspectFit" />
                <view class="flex flex-1/2 flex-col justify-between pl-[20rpx]">
                    <view class="line-clamp-3 text-[24rpx] font-normal text-[#333]">
                        {{ item.description }}
                    </view>
                    <view class="flex items-center">
                        <uni-icons type="eye" size="20"></uni-icons>
                        <text class="pr-[15rpx] pl-[15rpx] text-[24rpx] font-medium text-[#333333]">{{ item.read_count }}</text>
                        <uni-icons type="chat" size="20"></uni-icons>
                        <text class="pr-[15rpx] pl-[15rpx] text-[24rpx] font-medium text-[#333333]">{{ item.comment_count }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
