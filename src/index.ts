import { detect } from "./util";
import { Tiktok, Douyin, Youtube, Kuaishou } from "./modules/index";
import { DetectType, ButterflyDetail } from "./dto";

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
