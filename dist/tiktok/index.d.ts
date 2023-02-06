export declare class Tiktok {
    private agent;
    private userAgent;
    constructor(option: any);
    detail(postId: string): Promise<{
        id: any;
        url: string;
        title: any;
        description: any;
        tags: any;
        category: string;
        created_at: string;
        video: {
            quality: any;
            width: any;
            height: any;
            duration: number;
            cover_url: any;
            video_url: any;
        };
        stats: {
            view: any;
            likes: any;
            comment: any;
            favourite: any;
            share: any;
        };
        author: {
            id: any;
            name: any;
            avatar_url: any;
            channel_url: string;
            subscriber_count: any;
        };
    }>;
    private parseMeta;
}
