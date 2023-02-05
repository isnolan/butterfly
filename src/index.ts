import { detect } from "./utils";
import { Tiktok } from "./tiktok";
import { Douyin } from "./douyin";

export type VideoType = {
  platform: string;
  url: string;
  id: string;
};

export class Butterfly {
  private client: any;

  constructor(type: string) {
    if (type == "tiktok") {
      this.client = new Tiktok();
      return;
    }

    if (type == "douyin") {
      this.client = new Douyin();
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
  stats(postId: string) {}
}
