import { detect } from "./utils";
import { Tiktok } from "./tiktok";
import { Douyin } from "./douyin";
import { Youtube } from "./youtube";
import { Kuaishou } from "./kuaishou";

export type VideoType = {
  type: "tiktok" | "douyin" | "youtube" | "kuaishou";
  url: string;
  id: string;
};

export class Butterfly {
  private client: any;

  constructor(type: string, options?: any) {
    if (type == "tiktok") {
      this.client = new Tiktok();
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
  static async detect(url: string): Promise<VideoType> {
    return detect(url);
  }

  /**
   * 获取视频详情
   */
  detail(postId: string): Promise<any> {
    return this.client.detail(postId);
  }

  // 获取数据
  statistics(postId: string) {}
}
