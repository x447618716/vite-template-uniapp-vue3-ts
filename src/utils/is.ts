const { toString } = Object.prototype;

export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
    return !isDef(val);
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object');
}

export function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }

    return false;
}

export function isDate(val: unknown): val is Date {
    return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
    return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
    return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
    return is(val, 'String');
}

/**
 * 检测函数（支持泛型签名）
 * @param val 待检测的未知类型值
 * @returns 是否为函数，并通过类型谓词收窄类型
 */
export function isFunction<T extends (...args: any[]) => any>(val: unknown): val is T {
    return typeof val === 'function';
}

/**
 * 检测异步函数（含 async 或返回 Promise）
 * @param val 待检测的未知类型值
 * @returns 是否为异步函数，并通过类型谓词收窄类型
 */
export function isAsyncFunction(val: unknown): val is (...args: any[]) => Promise<any> {
    return isFunction(val) && val.constructor.name === 'AsyncFunction';
}

/**
 * 检测 Class 构造函数（非普通函数）
 * @param val 待检测的未知类型值
 * @returns 是否为构造函数，并通过类型谓词收窄类型
 */
export function isConstructor(val: unknown): val is new (...args: any[]) => any {
    return isFunction(val) && !!val.prototype?.constructor;
}

export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
    return is(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isUrl(path: string): boolean {
    // @ts-ignore
    const reg =
        /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;
    return reg.test(path);
}
