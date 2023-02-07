import fetch from "node-fetch";

export const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";

/**
 * 格式化日期
 * @param timestamp
 * @returns
 */
export function formatDate(timestamp: number) {
  const a = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
  function format(m: any) {
    return new Intl.DateTimeFormat("en", m).format(timestamp * 1000);
  }
  return a.map(format).join("-");
}

/**
 * 视频地址解析
 * @param url
 * @returns
 */
export function detect(url: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    // Tiktok
    if (/www.tiktok.com\/(.*)\/(\d+)\?/.test(url)) {
      const regex = url.match(/www.tiktok.com\/(.*)\/(\d+)\?/);
      resolve({ type: "tiktok", url, id: regex && regex[2] });
      return;
    }

    // Douyin
    if (/www.douyin.com\/video\/(\d+)/.test(url)) {
      const regex = url.match(/www.douyin.com\/video\/(\d+)/);
      resolve({ type: "douyin", url, id: regex && regex[1] });
      return;
    }
    if (/v.douyin.com\/([0-9a-zA-Z]{6,})\//.test(url)) {
      let postId: string | null;
      try {
        postId = await fetch(url, {
          redirect: "manual",
          headers: { "user-agent": userAgent },
        }).then(async (r) => {
          const text = await r.text();
          const reg = text.match(/www.iesdouyin.com\/share\/video\/(\d+)/);
          return reg && reg[1];
        });
        url = `https://www.douyin.com/video/${postId}`;

        resolve({ type: "douyin", url, id: postId });
      } catch (err) {
        reject(err);
      }
      return;
    }

    // Youtube
    if (/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/.test(url)) {
      const regex = url.match(/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/);
      resolve({ type: "youtube", url, id: regex && regex[1] });
      return;
    }
    if (/youtu.be\/([0-9a-zA-Z]{11,})/.test(url)) {
      const regex = url.match(/youtu.be\/([0-9a-zA-Z]{11,})/);
      url = url.replace(/youtu.be\//, "www.youtube.com/watch?v=");
      resolve({ type: "youtube", url, id: regex && regex[1] });
      return;
    }

    // Kuaishou
    if (/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/.test(url)) {
      const regex = url.match(
        /www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/
      );
      resolve({ type: "kuaishou", url, id: regex && regex[1] });
      return;
    }
    if (/www.kuaishou.com\/f\/([-0-9a-zA-Z]{10,})/.test(url)) {
      try {
        const postId = await fetch(url, {
          redirect: "manual",
          headers: { "user-agent": userAgent },
        }).then(async (r) => {
          const location = r.headers.get("location");
          const regex = location?.match(/short-video\/([-0-9a-zA-Z]{10,})\?/);
          return regex && regex[1];
        });
        url = `https://www.kuaishou.com/short-video/${postId}`;

        resolve({ type: "kuaishou", url, id: postId });
      } catch (err) {
        reject(err);
      }
      return;
    }
  });
}
