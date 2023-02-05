import HttpsProxyAgent from "https-proxy-agent";
import { detect } from "./utils";
import { Tiktok } from "./tiktok";
import { Douyin } from "./douyin";

export type VideoType = {
  type: "tiktok" | "douyin" | "youtube" | "kuaishou";
  url: string;
  id: string;
};

export class Butterfly {
  private client: any;
  private agent: any;

  constructor(type: string, options: any) {
    if (type == "tiktok") {
      this.client = new Tiktok();
      return;
    }

    if (type == "douyin") {
      this.client = new Douyin();
      return;
    }

    // options
    if (options.agent) {
      this.agent = HttpsProxyAgent(options.agent);
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
