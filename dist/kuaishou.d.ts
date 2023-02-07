import { ButterflyDetail } from "./";
export declare class Kuaishou {
    private userAgent;
    constructor();
    detail(postId: string): Promise<ButterflyDetail>;
    private formatCount;
    private parseMeta;
}
