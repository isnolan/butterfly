# Butterfly

## Introduction

Butterfly is a tool that wraps the APIs of multiple social media platforms to help you quickly access the video you need.

## Usage

Please follow these steps to install Butterfly:

1. Using npm:

```shell
npm install @yhostc/butterfly
```

2. import the library using import or require approach:

```ts
import { Butterfly } from "@yhostc/butterfly";
```

3. Detect text input, analyze attribution platform and direct video address

```ts
// doiyin
const input = `3.58 yTl:/ 流水的女团，铁打的泫雅！# 女团 # 现场演唱  https://v.douyin.com/BUWkmo6/ 复制此链接，打开Dou音搜索，直接观看视频！`;
// https://www.youtube.com/watch?v=dsqLW0J5M5A&themeRefresh=1
// https://www.tiktok.com/@mustsharenews/video/7196888454951652610?is_from_webapp=1&sender_device=pc

const { type, url, id } = await Butterfly.detect(input);

// {
//   type: 'douyin',
//   url: 'https://www.douyin.com/video/7196168216836607287',
//   id: '7196168216836607287'
// }
```

4.Get video detail data

```ts
const butterfly = new Butterfly("douyin");
const detail = await butterfly.detail("7196168216836607287");

// {
//   id: '7196168216836607287',
//   url: 'https://www.douyin.com/video/7196168216836607287',
//   title: '流水的女团，铁打的泫雅！#女团 #现场演唱',
//   description: '流水的女团，铁打的泫雅！#女团 #现场演唱',
//   tags: [ '女团', '现场演唱' ],
//   created_at: '2023-02-04',
//   video: {
//     quality: '540p',
//     width: 1280,
//     height: 720,
//     duration: 193,
//     cover_url: 'https://p26-sign.douyinpic.com/tos-cn-p-0015/o0FnEEUwbnAi6fadQeecB7HBPBgA2C1uI1bKdD~c5_300x400.webp?x-expires=1676980800&x-signature=MVvVPAkc3%2BUif6tBt6dWC646f3s%3D&from=3213915784_large&s=PackSourceEnum_AWEME_DETAIL&se=false&sc=cover&l=202302072046119ABCEBD5D1BDEB11E454',
//     video_url: 'https://v99-coldx.douyinvod.com/e0360e6de0a16d34800908a1484fa206/63e256e5/video/tos/cn/tos-cn-ve-15c001-alinc2/oQIBobe7BAt7nAxohr5DAbCE3Bu8QfkfHsnhlm/?a=1128&ch=26&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=2403&bt=2403&cs=0&ds=6&ft=KQ9BF3UUmf.ud~D02D1YBa_3pt2GuNrAZ88cx4k.7GcDNvjThb&mime_type=video_mp4&qs=0&rc=Zjk5M2lpODk1NjU1O2Q2NkBpM3BwOmg6ZnB4aTMzNGkzM0BgMTU2YzJiXl8xLjEuLzU2YSNeLnJgcjRvZ2JgLS1kLS9zcw%3D%3D&l=202302072046119ABCEBD5D1BDEB11E454&btag=a8000'
//   },
//   stats: { view: 0, likes: 8976, comment: 198, favourite: 2117, share: 1338 },
//   author: {
//     id: '2207424566275214',
//     name: '抖影音乐',
//     avatar_url: 'https://p26.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_dff06ddb060eeba9bac3ee473fae2f5b.webp?from=116350172',
//     channel_url: 'https://www.douyin.com/user/MS4wLjABAAAA05suhaYmQCcvl6BZezs_1s8o6KIo6MRfa_ywMDGPZ0UxJy8R2SJxQ3VtmS0m3Lx_',
//     subscriber_count: 1102
//   }
// }
```

## Supported Social Media

Currently, Butterfly supports the following social media:

Youtube
TikTok
DouYin
KuaiShow

If you need support for additional social media, please submit a request on GitHub.

## Disclaimer

Please note that the technology behind Video Grabber is sourced from various GitHub repositories and is intended for research and educational purposes only. The developer is not responsible for any consequences that may result from its use.
