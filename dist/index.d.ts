import { DetectType, ButterflyDetail } from "./dto";
export declare class Butterfly {
    private client;
    constructor(type: string, options?: any);
    static detect(url: string): Promise<DetectType>;
    detail(postId: string): Promise<ButterflyDetail>;
    statistics(postId: string): void;
}
declare const _default: {
    Butterfly: typeof Butterfly;
};
export default _default;
