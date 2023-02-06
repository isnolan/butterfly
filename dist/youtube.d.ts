export declare class Youtube {
    private agent;
    constructor(option: any);
    /**
     * 获取视频详情
     * @param postId
     */
    detail(postId: string): Promise<unknown>;
    private parseMeta;
}
