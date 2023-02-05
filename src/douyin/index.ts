import fs from "fs";

export class Douyin {
  private userAgent =
    "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";

  constructor() {}

  async detail(postId: string) {
    const url = `https://www.iesdouyin.com/aweme/v1/web/aweme/detail/?aweme_id=${postId}&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`;
    return await fetch(url, {
      headers: { "user-agent": this.userAgent },
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
      return this.parseMeta(data.aweme_detail);
    });
  }

  private formatDate(timestamp: number) {
    const a = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
    function format(m: any) {
      return new Intl.DateTimeFormat("en", m).format(timestamp);
    }
    return a.map(format).join("-");
  }

  private parseMeta(data: any) {
    let meta = {
      id: data.aweme_id,
      title: data.desc,
      created_at: this.formatDate(data.create_time * 1000),
      stats: data.statistics,
      video: {
        video: data.video.play_addr.url_list[0],
        cover: data.video.cover.url_list[0],
        dynamic_cover: data.video.dynamic_cover.url_list[0],
        origin_cover: data.video.origin_cover.url_list[0],
        width: data.video.width,
        height: data.video.height,
        duration: Math.floor(data.video.duration / 1000),
        ratio: data.video.ratio,
      },
      music: data.music
        ? {
            id: data.music.id,
            title: data.music.title,
            author: data.music.author,
            cover_hd: data.music.cover_hd
              ? data.music.cover_hd.url_list[0]
              : null,
            cover_large: data.music.cover_large.url_list[0],
            cover_medium: data.music.cover_medium.url_list[0],
            cover_thumb: data.music.cover_thumb.url_list[0],
            duration: data.music.duration,
            play_url: data.music.play_url.url_list[0],
          }
        : {},
      author: data.author
        ? {
            id: data.author.uid,
            name: data.author.nickname,
            gender: data.author.gender,
            birthday: data.author.birthday,
            unique_id: data.author.unique_id,
            signature: data.author.signature,
            avatar: data.author.avatar_thumb.url_list[0],
            avatar_thumb: data.author.avatar_thumb.url_list[0],
          }
        : {},
    };
    return meta;
  }
}
