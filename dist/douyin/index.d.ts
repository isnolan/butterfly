export declare class Douyin {
    private userAgent;
    constructor();
    detail(postId: string): Promise<{
        id: any;
        title: any;
        created_at: string;
        stats: any;
        video: {
            video: any;
            cover: any;
            dynamic_cover: any;
            origin_cover: any;
            width: any;
            height: any;
            duration: number;
            ratio: any;
        };
        music: {
            id: any;
            title: any;
            author: any;
            cover_hd: any;
            cover_large: any;
            cover_medium: any;
            cover_thumb: any;
            duration: any;
            play_url: any;
        } | {
            id?: undefined;
            title?: undefined;
            author?: undefined;
            cover_hd?: undefined;
            cover_large?: undefined;
            cover_medium?: undefined;
            cover_thumb?: undefined;
            duration?: undefined;
            play_url?: undefined;
        };
        author: {
            id: any;
            name: any;
            gender: any;
            birthday: any;
            unique_id: any;
            signature: any;
            avatar: any;
            avatar_thumb: any;
        } | {
            id?: undefined;
            name?: undefined;
            gender?: undefined;
            birthday?: undefined;
            unique_id?: undefined;
            signature?: undefined;
            avatar?: undefined;
            avatar_thumb?: undefined;
        };
    }>;
    private formatDate;
    private parseMeta;
}
