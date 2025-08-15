import CryptoJS from 'crypto-es';
import { createPinia } from 'pinia';
import type { StateTree } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 加密密钥，可根据实际情况修改
const encryptionKey = 'UNION-APP-@#@##@###@';

// 自定义序列化函数
const serialize = (state: StateTree) => {
    const jsonState = JSON.stringify(state);
    return CryptoJS.AES.encrypt(jsonState, encryptionKey).toString();
};

// 自定义反序列化函数
const deserialize = (encrypted: string) => {
    const bytes = CryptoJS.AES.decrypt(encrypted, encryptionKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText) as object;
};

const pinia = createPinia();
pinia.use(
    createPersistedState({
        storage: {
            setItem: (key, value) => uni.setStorageSync(key, value),
            getItem: key => uni.getStorageSync(key)
        },
        serializer: {
            deserialize: process.env.NODE_ENV !== 'development' ? deserialize : state => JSON.parse(state) as object,
            serialize: process.env.NODE_ENV !== 'development' ? serialize : state => JSON.stringify(state)
        }
    })
);

export default pinia;
