export declare class Kuaishou {
    private userAgent;
    constructor();
    detail(postId: string): Promise<{
        id: any;
        url: string;
        title: any;
        description: string;
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
            view: number;
            likes: number;
            comment: number;
            favourite: number;
            share: number;
        };
        author: {
            id: any;
            name: any;
            avatar_url: any;
            channel_url: string;
            subscriber_count: number;
        };
    }>;
    private formatCount;
    private parseMeta;
}
