import * as HttpsProxyAgent from "https-proxy-agent";
import fetch from "node-fetch";
// import * as HttpsProxyAgent from "https-proxy-agent";
import { formatDate } from "../util";
import { ButterflyDetail } from "../dto";

export default class Tiktok {
  private agent: any;
  private userAgent =
    "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";

  constructor(option: any) {
    // options
    if (option && option.agent) {
      this.agent = HttpsProxyAgent(option.agent);
    }
  }

  async detail(postId: string) {
    const url = `https://api2.musical.ly/aweme/v1/feed/?aweme_id=${postId}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9&region=US&carrier_region=US`;
    return await fetch(url, {
      timeout: 10000,
      headers: { "user-agent": this.userAgent },
      agent: this.agent,
    }).then(async (res) => {
      const data = await res.json();
      const detail = data.aweme_list.find((row: any) => row.aweme_id == postId);
      return this.parseMeta(detail);
    });
  }

  private parseMeta(detail: any) {
    const { video, statistics, author } = detail;
    const meta: ButterflyDetail = {
      id: detail.aweme_id, // ID
      url: `https://www.tiktok.com/@${author.unique_id}/video/${detail.aweme_id}`, // 访问地址
      title: detail.preview_title || "", // 标题
      description: detail.desc, // 描述
      tags: detail.text_extra.map((tag: any) => tag.hashtag_name), // 标签
      created_at: formatDate(detail.create_time), // 发布日期

      video: {
        quality: video.ratio, //质量标签
        width: video.width, // 宽度
        height: video.height, // 高度
        duration: Math.floor(video.duration / 1000), // 秒长
        cover_url: video.cover.url_list[0], // 封面地址，有时效
        video_url: video.play_addr.url_list[0], // 无水印视频地址，有时效
      },

      stats: {
        view: statistics.play_count, // 播放
        likes: statistics.digg_count, // 喜欢
        comment: statistics.comment_count, // 评论
        favourite: statistics.collect_count, // 收藏
        share: statistics.share_count, // 转发
      },

      author: {
        id: author.uid, // 频道ID
        name: author.nickname, // 频道名称
        avatar_url: author.avatar_medium.url_list[0], // 频道头像，有时效
        channel_url: `https://www.tiktok.com/@${author.unique_id}`, // 频道访问地址
        subscriber_count: author.favoriting_count, // 订阅人数
      },
    };
    return meta;
  }
}
