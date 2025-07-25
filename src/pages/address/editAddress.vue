<template>
    <view class="edit-bg">
        <view class="edit-card">
            <view class="row">
                <text class="label">收货人：</text>
                <input class="input" v-model="form.name" placeholder="请输入收货人姓名" />
            </view>
            <view class="row">
                <text class="label">联系电话：</text>
                <input class="input" v-model="form.phone" placeholder="请输入手机号" />
            </view>
            <view class="row row-arrow" @click="showRegionPicker">
                <text class="label">地址：</text>
                <text class="value">{{ form.region || '请选择省市区' }}</text>
                <text class="icon-arrow">&#8250;</text>
            </view>
            <view class="row row-arrow">
                <text class="label">详细地址：</text>
                <input class="input" v-model="form.detail" placeholder="请输入详细地址" />
            </view>
            <view class="row default-row" @click="form.default = !form.default">
                <view class="radio" :class="{ checked: form.default }">
                    <text v-if="form.default" class="icon-checked">✔</text>
                </view>
                <text class="default-text">设为默认地址</text>
            </view>
        </view>
        <view class="delete-btn" @click="handleDelete" v-if="!addressStore.editAddressData">
            <uni-icons type="trash" size="24" color="#8080a1"></uni-icons>
            <text style="margin-left: 8rpx">删除地址</text>
        </view>
        <button class="save-btn" @click="saveAddress">确认并使用</button>

        <!-- 省市区选择器弹窗 -->
        <uni-popup ref="popup" type="bottom">
            <view class="region-picker">
                <view class="picker-header">
                    <text class="cancel" @click="closeRegionPicker">取消</text>
                    <text class="title">选择地区</text>
                    <text class="confirm" @click="confirmRegion">确定</text>
                </view>
                <view class="picker-content">
                    <scroll-view class="region-scroll" :scroll-y="true">
                        <view
                            v-for="(province, index) in area"
                            :key="index"
                            class="region-item"
                            :class="{ active: selectedRegion.province === province.name }"
                            @click="selectProvince(province)">
                            {{ province.name }}
                        </view>
                    </scroll-view>
                    <scroll-view class="region-scroll" :scroll-y="true" v-if="selectedRegion.province">
                        <view
                            v-for="(city, index) in currentCities"
                            :key="index"
                            class="region-item"
                            :class="{ active: selectedRegion.city === city.name }"
                            @click="selectCity(city)">
                            {{ city.name }}
                        </view>
                    </scroll-view>
                    <scroll-view class="region-scroll" :scroll-y="true" v-if="selectedRegion.city">
                        <view
                            v-for="(district, index) in currentDistricts"
                            :key="index"
                            class="region-item"
                            :class="{ active: selectedRegion.district === district.name }"
                            @click="selectDistrict(district)">
                            {{ district.name }}
                        </view>
                    </scroll-view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useAddressStore } from '@/stores/modules/address';
import area from '@/static/json/area.json';

const addressStore = useAddressStore();
const popup = ref();

interface Region {
    name: string;
    children?: Region[];
}

const form = ref({
    name: '',
    phone: '',
    region: '',
    detail: '',
    default: false,
});

const selectedRegion = ref({
    province: '',
    city: '',
    district: '',
});

const currentCities = computed(() => {
    if (!selectedRegion.value.province) return [];
    const province = area.find((p) => p.name === selectedRegion.value.province);
    return province ? province.children || [] : [];
});

const currentDistricts = computed(() => {
    if (!selectedRegion.value.city) return [];
    const province = area.find((p) => p.name === selectedRegion.value.province);
    if (!province) return [];
    const city = province.children?.find((c) => c.name === selectedRegion.value.city);
    return city ? city.children || [] : [];
});

onMounted(() => {
    if (addressStore.editAddressData) {
        console.log('addressStore.editAddressData', addressStore.editAddressData);
        const editData = addressStore.editAddressData;
        // 从完整地址中提取省市区和详细地址
        const addressParts = editData.detail.split(' ');
        const region = addressParts.slice(0, 3).join(' ');
        const detail = addressParts.slice(3).join(' ');

        form.value = {
            name: editData.name,
            phone: editData.phone,
            region: region,
            detail: detail,
            default: editData.default,
        };

        // 设置已选择的地区
        if (region) {
            const regions = region.split(' ');
            if (regions.length === 3) {
                selectedRegion.value = {
                    province: regions[0] || '',
                    city: regions[1] || '',
                    district: regions[2] || '',
                };
            }
        }
    }
});

const showRegionPicker = () => {
    popup.value.open();
};

const closeRegionPicker = () => {
    popup.value.close();
};

const selectProvince = (province: Region) => {
    selectedRegion.value = {
        province: province.name,
        city: '',
        district: '',
    };
};

const selectCity = (city: Region) => {
    selectedRegion.value.city = city.name;
    selectedRegion.value.district = '';
};

const selectDistrict = (district: Region) => {
    selectedRegion.value.district = district.name;
};

const confirmRegion = () => {
    if (selectedRegion.value.province && selectedRegion.value.city && selectedRegion.value.district) {
        form.value.region = `${selectedRegion.value.province} ${selectedRegion.value.city} ${selectedRegion.value.district}`;
        closeRegionPicker();
    }
};

const saveAddress = () => {
    if (!form.value.region) {
        uni.showToast({
            title: '请选择省市区',
            icon: 'none',
        });
        return;
    }
    uni.navigateBack();
};

const handleDelete = () => {
    uni.showModal({
        title: '提示',
        content: '确定要清空数据并返回吗？',
        success: (res) => {
            if (res.confirm) {
                form.value = {
                    name: '',
                    phone: '',
                    region: '',
                    detail: '',
                    default: false,
                };
                selectedRegion.value = {
                    province: '',
                    city: '',
                    district: '',
                };
                uni.navigateBack();
            }
        },
    });
};
</script>

<style scoped lang="scss">
.edit-bg {
    min-height: 100vh;
    background: #fafbfc;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.delete-btn {
    width: 80vw;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40rpx;
    background: #fff;
    color: #8080a1;
    border-radius: 40rpx;
    font-size: 32rpx;
    border: 2rpx solid #8080a1;
}
.edit-card {
    width: 92vw;
    background: #fff;
    border-radius: 24rpx;
    margin-top: 48rpx;
    padding: 0 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
}
.row {
    display: flex;
    align-items: center;
    min-height: 114rpx;
    font-size: 28rpx;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
}
.row:last-child {
    border-bottom: none;
}
.label {
    width: 160rpx;
    color: #333;
    flex-shrink: 0;
}
.input,
.value {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 28rpx;
    color: #8080a1;
    text-align: right;
}
.row-arrow {
    cursor: pointer;
}
.icon-arrow {
    font-size: 32rpx;
    color: #bbb;
    margin-left: 8rpx;
}

.default-row {
    border-bottom: none;
    margin-top: 8rpx;
    padding-bottom: 24rpx;
}
.radio {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    border: 2rpx solid #233cfe;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12rpx;
    background: #fff;
}
.radio.checked {
    background: #233cfe;
    border-color: #233cfe;
}
.icon-checked {
    color: #fff;
    font-size: 24rpx;
}
.default-text {
    color: #233cfe;
    font-size: 28rpx;
}
.save-btn {
    width: 80vw;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #233cfe;
    color: #fff;
    border-radius: 40rpx;
    font-size: 32rpx;
    margin: 40rpx 0 0 0;
}

.region-picker {
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    padding-bottom: env(safe-area-inset-bottom);
}

.picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-bottom: 1px solid #f0f0f0;
}

.cancel,
.confirm {
    font-size: 28rpx;
    padding: 10rpx 20rpx;
}

.cancel {
    color: #666;
}

.confirm {
    color: #233cfe;
}

.title {
    font-size: 32rpx;
    font-weight: 500;
}

.picker-content {
    display: flex;
    height: 600rpx;
}

.region-scroll {
    flex: 1;
    height: 100%;
}

.region-item {
    padding: 24rpx;
    font-size: 28rpx;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
}

.region-item.active {
    color: #233cfe;
    background: #f5f7ff;
}
</style>
