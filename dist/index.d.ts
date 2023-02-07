export type DetectType = {
    type: "tiktok" | "douyin" | "youtube" | "kuaishou";
    url: string;
    id: string;
};
export type ButterflyDetail = {
    id: string;
    url: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    created_at: string;
    video: {
        quality: string;
        width: number;
        height: number;
        duration: number;
        cover_url: string;
        video_url: string;
    };
    stats: {
        view: number;
        likes: number;
        comment: number;
        favourite: number;
        share: number;
    };
    author: {
        id: string;
        name: string;
        avatar_url: string;
        channel_url: string;
        subscriber_count: number;
    };
};
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
