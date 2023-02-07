import { ButterflyDetail } from "./";
export declare class Tiktok {
    private agent;
    private userAgent;
    constructor(option: any);
    detail(postId: string): Promise<ButterflyDetail>;
    private parseMeta;
}
