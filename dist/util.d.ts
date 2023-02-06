export declare const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
/**
 * 格式化日期
 * @param timestamp
 * @returns
 */
export declare function formatDate(timestamp: number): string;
/**
 * 视频地址解析
 * @param url
 * @returns
 */
export declare function detect(url: string): Promise<any>;
