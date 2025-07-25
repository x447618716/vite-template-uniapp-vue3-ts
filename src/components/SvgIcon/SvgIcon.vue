<template>
    <image :src="'/static/svg/' + name + '.svg'" :style="iconStyle" :class="['svg-icon', className]" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [Number, String],
        default: 20,
    },
    className: {
        type: String,
        default: '',
    },
});

// 计算 rpx 尺寸（1px = 2rpx）
const iconStyle = computed(() => {
    const rpxSize = Number(props.size) * 2;
    return {
        width: rpxSize + 'rpx',
        height: rpxSize + 'rpx',
    };
});
</script>

<style>
.svg-icon {
    vertical-align: middle;
}
</style>
