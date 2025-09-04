/**
 * 交互反馈
 * https://uniapp.dcloud.io/api/ui/prompt.html
 */

/**
 * 显示消息提示框
 */
export function Toast(
    title: string,
    options?: Omit<Partial<UniApp.ShowToastOptions>, 'success' | 'fail' | 'complete' | 'mask' | 'icon' | 'duration' | 'title'>
) {
    void uni.showToast({
        title,
        duration: 1500,
        icon: 'none',
        mask: true,
        ...options
    });
}

/**
 * 隐藏消息提示框
 */
export function HideToast() {
    uni.hideToast();
}

/**
 * 显示 loading 提示框
 */
export function Loading(title: string) {
    void uni.showLoading({
        title,
        mask: true
    });
}

/**
 * 隐藏 loading 提示框
 */
export function HideLoading() {
    uni.hideLoading();
}

/**
 * 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮
 */
export function Modal(options: Omit<UniApp.ShowModalOptions, 'fail' | 'complete' | 'success'>) {
    return new Promise((resolve, reject) => {
        uni.showModal({
            ...options,
            success: res => {
                resolve(res);
            },
            fail: res => {
                reject(res);
            }
        });
    });
}

/**
 * 从底部向上弹出操作菜单
 */
export function ActionSheet(options: Omit<UniApp.ShowActionSheetOptions, 'success' | 'fail' | 'complete'>) {
    return new Promise((resolve, reject) => {
        uni.showActionSheet({
            ...options,
            success: res => {
                resolve(res);
            },
            fail: res => {
                reject(res);
            }
        });
    });
}
