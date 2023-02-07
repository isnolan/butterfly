import fetch from "node-fetch";
import { formatDate } from "../util";
import { ButterflyDetail } from "../dto";

export default class Douyin {
  private userAgent =
    "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";

  constructor() {}

  async detail(postId: string) {
    const url = `https://www.iesdouyin.com/aweme/v1/web/aweme/detail/?aweme_id=${postId}&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`;
    return await fetch(url, { headers: { "user-agent": this.userAgent } }).then(
      async (res) => {
        const data = await res.json();
        // console.log(data);
        return this.parseMeta(data.aweme_detail);
      }
    );
  }

  private parseMeta(detail: any) {
    const { video, statistics, author } = detail;
    const meta: ButterflyDetail = {
      id: detail.aweme_id, // ID
      url: `https://www.douyin.com/video/${detail.aweme_id}`, // 访问地址
      title: detail.preview_title, // 标题
      description: detail.desc, // 描述
      tags: detail.text_extra.map((tag: any) => tag.hashtag_name), // 标签
      category: "", // 分类
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
        avatar_url: author.avatar_thumb.url_list[0], // 频道头像，有时效
        channel_url: `https://www.douyin.com/user/${author.sec_uid}`, // 频道访问地址
        subscriber_count: author.favoriting_count, // 订阅人数
      },
    };
    return meta;
  }
}
