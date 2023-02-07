"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl = require("ytdl-core");
const HttpsProxyAgent = require("https-proxy-agent");
class Youtube {
    constructor(option) {
        if (option.agent) {
            this.agent = HttpsProxyAgent(option.agent);
        }
    }
    detail(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const options = {
                    quality: "highest",
                    requestOptions: { agent: this.agent },
                };
                ytdl.getInfo(postId, options).then((info) => __awaiter(this, void 0, void 0, function* () {
                    resolve(this.parseMeta(info));
                }));
            }));
        });
    }
    parseMeta(data) {
        const { videoDetails: detail, formats } = data;
        const cover = detail.thumbnails.sort((a, b) => b.width - a.width)[0];
        const video = formats
            .filter((a) => a.hasVideo && a.hasAudio)
            .sort((a, b) => b.bitrate - a.bitrate)[0];
        const avatar = detail.author.thumbnails.sort((a, b) => b.width - a.width)[0];
        const meta = {
            id: detail.videoId,
            url: detail.video_url,
            title: detail.title,
            description: detail.description,
            category: detail.category,
            tags: [],
            created_at: detail.uploadDate,
            video: {
                quality: video.qualityLabel,
                width: video.width,
                height: video.height,
                duration: Number(detail.lengthSeconds),
                cover_url: cover.url,
                video_url: video.url,
            },
            stats: {
                view: detail.viewCount,
                likes: Number(detail.likes),
                comment: 0,
                favourite: 0,
                share: 0,
            },
            author: {
                id: detail.author.id,
                name: detail.author.name,
                avatar_url: avatar,
                channel_url: detail.author.channel_url,
                subscriber_count: detail.author.subscriber_count,
            },
        };
        return meta;
    }
}
exports.default = Youtube;
//# sourceMappingURL=youtube.js.map