import { defineStore } from 'pinia';

export interface AddressData {
    name: string;
    phone: string;
    detail: string;
    default: boolean;
    region?: string;
}

export const useAddressStore = defineStore('address', {
    state: () => ({
        editAddressData: null as AddressData | null
    }),
    actions: {
        setEditAddressData(data: AddressData | null) {
            this.editAddressData = data;
        },
        clearEditAddressData() {
            this.editAddressData = null;
        }
    }
});
