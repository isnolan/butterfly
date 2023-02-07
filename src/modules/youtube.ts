import * as ytdl from "ytdl-core";
import * as HttpsProxyAgent from "https-proxy-agent";

import { ButterflyDetail } from "../dto";

export default class Youtube {
  private agent: any;

  constructor(option: any) {
    // options
    if (option.agent) {
      this.agent = HttpsProxyAgent(option.agent);
    }
  }

  /**
   * 获取视频详情
   * @param postId
   */
  async detail(postId: string) {
    return new Promise(async (resolve, reject) => {
      const options = {
        quality: "highest",
        requestOptions: { agent: this.agent as any },
      };
      ytdl.getInfo(postId, options).then(async (info) => {
        // const detail = await fs.readFileSync("./youtube.json");
        // const info = JSON.parse(`${detail}`);

        resolve(this.parseMeta(info));
      });
    });
  }

  private parseMeta(data: any) {
    const { videoDetails: detail, formats } = data;
    // 获取封面
    const cover = detail.thumbnails.sort(
      (a: any, b: any) => b.width - a.width
    )[0];

    // 获取视频地址
    const video = formats
      .filter((a: any) => a.hasVideo && a.hasAudio)
      .sort((a: any, b: any) => b.bitrate - a.bitrate)[0];

    // 获取头像
    const avatar = detail.author.thumbnails.sort(
      (a: any, b: any) => b.width - a.width
    )[0];

    const meta: ButterflyDetail = {
      id: detail.videoId, // ID
      url: detail.video_url, // 访问地址
      title: detail.title, // 标题
      description: detail.description, // 描述
      category: detail.category, // 分类
      tags: [], // 标签
      created_at: detail.uploadDate, // 发布日期

      video: {
        quality: video.qualityLabel, //质量标签
        width: video.width, // 宽度
        height: video.height, // 高度
        duration: Number(detail.lengthSeconds), // 秒长
        cover_url: cover.url, // 封面地址，有时效
        video_url: video.url, // 视频地址，有时效
      },

      stats: {
        view: detail.viewCount, // 播放
        likes: Number(detail.likes), // 喜欢
        comment: 0, // 评论
        favourite: 0, // 收藏
        share: 0, // 分享
      },

      author: {
        id: detail.author.id, // 频道ID
        name: detail.author.name, // 频道名称
        avatar_url: avatar, // 频道头像，有时效
        channel_url: detail.author.channel_url, // 频道访问地址
        subscriber_count: detail.author.subscriber_count, // 订阅人数
      },
    };
    return meta;
  }
}
