export type VideoType = {
    type: "tiktok" | "douyin" | "youtube" | "kuaishou";
    url: string;
    id: string;
};
export declare class Butterfly {
    private client;
    constructor(type: string, options?: any);
    /**
     * 视频地址解析
     * @param url
     * @returns
     */
    static detect(url: string): Promise<VideoType>;
    /**
     * 获取视频详情
     */
    detail(postId: string): Promise<any>;
    statistics(postId: string): void;
}
