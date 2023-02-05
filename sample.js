const { Butterfly } = require("./dist/butterfly.umd.js");

(async () => {
  const url =
    // "https://www.tiktok.com/@yasincengiz38/video/7195895698066246918?is_from_webapp=1&sender_device=pc";
    "https://v.douyin.com/BBtjUhW/";

  const post = await Butterfly.detect(url);
  console.log(`->detect:`, post);

  const tiktok = new Butterfly(post.type);
  const detail = await tiktok.detail(post.id);
  console.log(`->detail:`, detail);
})();
