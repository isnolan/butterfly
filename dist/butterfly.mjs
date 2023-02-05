const c = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
function s(i) {
  return new Promise(async (e, o) => {
    if (/www.tiktok.com\/(.*)\/(\d+)\?/.test(i)) {
      const t = i.match(/www.tiktok.com\/(.*)\/(\d+)\?/);
      e({ type: "tiktok", url: i, id: t && t[2] });
      return;
    }
    if (/www.douyin.com\/video\/(\d+)/.test(i)) {
      const t = i.match(/www.douyin.com\/video\/(\d+)/);
      e({ type: "douyin", url: i, id: t && t[1] });
      return;
    }
    if (/v.douyin.com\/([0-9a-zA-Z]{6,})\//.test(i)) {
      let t;
      try {
        t = await fetch(i, {
          redirect: "manual",
          headers: { "user-agent": c }
        }).then(async (r) => {
          const u = (await r.text()).match(/www.iesdouyin.com\/share\/video\/(\d+)/);
          return u && u[1];
        }), i = `https://www.douyin.com/video/${t}`, e({ type: "douyin", url: i, id: t });
      } catch (r) {
        o(r);
      }
      return;
    }
    if (/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/.test(i)) {
      const t = i.match(/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/);
      e({ type: "youtube", url: i, id: t && t[1] });
      return;
    }
    if (/youtu.be\/([0-9a-zA-Z]{11,})/.test(i)) {
      const t = i.match(/youtu.be\/([0-9a-zA-Z]{11,})/);
      i = i.replace(/youtu.be\//, "www.youtube.com/watch?v="), e({ type: "youtube", url: i, id: t && t[1] });
      return;
    }
    if (/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/.test(i)) {
      const t = i.match(
        /www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/
      );
      e({ type: "kuaishou", url: i, id: t && t[1] });
      return;
    }
    if (/www.kuaishou.com\/f\/([-0-9a-zA-Z]{10,})/.test(i)) {
      try {
        const t = await fetch(i, {
          redirect: "manual",
          headers: { "user-agent": c }
        }).then(async (r) => {
          const n = r.headers.get("location"), u = n == null ? void 0 : n.match(/short-video\/([-0-9a-zA-Z]{10,})\?/);
          return u && u[1];
        });
        i = `https://www.kuaishou.com/short-video/${t}`, e({ type: "kuaishou", url: i, id: t });
      } catch (t) {
        o(t);
      }
      return;
    }
  });
}
class a {
  constructor() {
    this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";
  }
  async detail(e) {
    const o = `https://api2.musical.ly/aweme/v1/feed/?aweme_id=${e}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9&region=US&carrier_region=US`;
    return await fetch(o, {
      headers: { "user-agent": this.userAgent }
    }).then(async (t) => {
      const n = (await t.json()).aweme_list.find((u) => u.aweme_id == e);
      return this.parseMeta(n);
    });
  }
  formatDate(e) {
    const o = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
    function t(r) {
      return new Intl.DateTimeFormat("en", r).format(e);
    }
    return o.map(t).join("-");
  }
  parseMeta(e) {
    return {
      id: e.aweme_id,
      title: e.desc,
      created_at: this.formatDate(e.create_time * 1e3),
      stats: e.statistics,
      video: {
        video: e.video.play_addr.url_list[0],
        cover: e.video.cover.url_list[0],
        dynamic_cover: e.video.dynamic_cover.url_list[0],
        origin_cover: e.video.origin_cover.url_list[0],
        width: e.video.width,
        height: e.video.height,
        duration: Math.floor(e.video.duration / 1e3),
        ratio: e.video.ratio
      },
      music: e.music ? {
        id: e.music.id,
        title: e.music.title,
        author: e.music.author,
        cover_hd: e.music.cover_hd ? e.music.cover_hd.url_list[0] : null,
        cover_large: e.music.cover_large.url_list[0],
        cover_medium: e.music.cover_medium.url_list[0],
        cover_thumb: e.music.cover_thumb.url_list[0],
        duration: e.music.duration,
        play_url: e.music.play_url.url_list[0]
      } : {},
      author: e.author ? {
        id: e.author.uid,
        name: e.author.nickname,
        gender: e.author.gender,
        birthday: e.author.birthday,
        unique_id: e.author.unique_id,
        signature: e.author.signature,
        avatar: e.author.avatar_medium.url_list[0],
        avatar_thumb: e.author.avatar_thumb.url_list[0]
      } : {}
    };
  }
}
class m {
  constructor() {
    this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";
  }
  async detail(e) {
    const o = `https://www.iesdouyin.com/aweme/v1/web/aweme/detail/?aweme_id=${e}&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`;
    return await fetch(o, {
      headers: { "user-agent": this.userAgent }
    }).then(async (t) => {
      const r = await t.json();
      return console.log(r), this.parseMeta(r.aweme_detail);
    });
  }
  formatDate(e) {
    const o = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
    function t(r) {
      return new Intl.DateTimeFormat("en", r).format(e);
    }
    return o.map(t).join("-");
  }
  parseMeta(e) {
    return {
      id: e.aweme_id,
      title: e.desc,
      created_at: this.formatDate(e.create_time * 1e3),
      stats: e.statistics,
      video: {
        video: e.video.play_addr.url_list[0],
        cover: e.video.cover.url_list[0],
        dynamic_cover: e.video.dynamic_cover.url_list[0],
        origin_cover: e.video.origin_cover.url_list[0],
        width: e.video.width,
        height: e.video.height,
        duration: Math.floor(e.video.duration / 1e3),
        ratio: e.video.ratio
      },
      music: e.music ? {
        id: e.music.id,
        title: e.music.title,
        author: e.music.author,
        cover_hd: e.music.cover_hd ? e.music.cover_hd.url_list[0] : null,
        cover_large: e.music.cover_large.url_list[0],
        cover_medium: e.music.cover_medium.url_list[0],
        cover_thumb: e.music.cover_thumb.url_list[0],
        duration: e.music.duration,
        play_url: e.music.play_url.url_list[0]
      } : {},
      author: e.author ? {
        id: e.author.uid,
        name: e.author.nickname,
        gender: e.author.gender,
        birthday: e.author.birthday,
        unique_id: e.author.unique_id,
        signature: e.author.signature,
        avatar: e.author.avatar_thumb.url_list[0],
        avatar_thumb: e.author.avatar_thumb.url_list[0]
      } : {}
    };
  }
}
class h {
  constructor(e) {
    if (e == "tiktok") {
      this.client = new a();
      return;
    }
    if (e == "douyin") {
      this.client = new m();
      return;
    }
    throw new Error(`unsupport the video type: ${e}`);
  }
  /**
   * 视频地址解析
   * @param url
   * @returns
   */
  static async detect(e) {
    return s(e);
  }
  /**
   * 获取视频详情
   */
  detail(e) {
    return this.client.detail(e);
  }
  // 获取数据
  stats(e) {
  }
}
export {
  h as Butterfly
};
