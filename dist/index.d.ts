export type VideoType = {
    platform: string;
    url: string;
    id: string;
};
export declare class Butterfly {
    private client;
    constructor(type: string);
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
    stats(postId: string): void;
}
