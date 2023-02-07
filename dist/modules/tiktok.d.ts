import { ButterflyDetail } from "../dto";
export default class Tiktok {
    private agent;
    private userAgent;
    constructor(option: any);
    detail(postId: string): Promise<ButterflyDetail>;
    private parseMeta;
}
