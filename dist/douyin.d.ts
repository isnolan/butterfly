import { ButterflyDetail } from "./";
export declare class Douyin {
    private userAgent;
    constructor();
    detail(postId: string): Promise<ButterflyDetail>;
    private parseMeta;
}
