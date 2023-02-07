import { detect } from "./util";
import { Tiktok } from "./tiktok";
import { Douyin } from "./douyin";
import { Youtube } from "./youtube";
import { Kuaishou } from "./kuaishou";

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

export class Butterfly {
  private client: any;

  constructor(type: string, options?: any) {
    if (type == "tiktok") {
      this.client = new Tiktok(options);
      return;
    }

    if (type == "douyin") {
      this.client = new Douyin();
      return;
    }

    if (type == "youtube") {
      this.client = new Youtube(options);
      return;
    }

    if (type == "kuaishou") {
      this.client = new Kuaishou();
      return;
    }

    throw new Error(`unsupport the video type: ${type}`);
  }

  /**
   * 视频地址解析
   * @param url
   * @returns
   */
  static async detect(url: string): Promise<DetectType> {
    return detect(url);
  }

  /**
   * 获取视频详情
   */
  detail(postId: string): Promise<ButterflyDetail> {
    return this.client.detail(postId);
  }

  // 获取数据
  statistics(postId: string) {}
}

export default {
  Butterfly,
};
