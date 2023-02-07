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
exports.Tiktok = void 0;
const HttpsProxyAgent = require("https-proxy-agent");
const node_fetch_1 = require("node-fetch");
const util_1 = require("./util");
class Tiktok {
    constructor(option) {
        this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";
        if (option && option.agent) {
            this.agent = HttpsProxyAgent(option.agent);
        }
    }
    detail(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api2.musical.ly/aweme/v1/feed/?aweme_id=${postId}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9&region=US&carrier_region=US`;
            return yield (0, node_fetch_1.default)(url, {
                timeout: 10000,
                headers: { "user-agent": this.userAgent },
                agent: this.agent,
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                const detail = data.aweme_list.find((row) => row.aweme_id == postId);
                return this.parseMeta(detail);
            }));
        });
    }
    parseMeta(detail) {
        const { video, statistics, author } = detail;
        const meta = {
            id: detail.aweme_id,
            url: `https://www.tiktok.com/@${author.unique_id}/video/${detail.aweme_id}`,
            title: detail.preview_title || "",
            description: detail.desc,
            tags: detail.text_extra.map((tag) => tag.hashtag_name),
            category: "",
            created_at: (0, util_1.formatDate)(detail.create_time),
            video: {
                quality: video.ratio,
                width: video.width,
                height: video.height,
                duration: Math.floor(video.duration / 1000),
                cover_url: video.cover.url_list[0],
                video_url: video.play_addr.url_list[0],
            },
            stats: {
                view: statistics.play_count,
                likes: statistics.digg_count,
                comment: statistics.comment_count,
                favourite: statistics.collect_count,
                share: statistics.share_count,
            },
            author: {
                id: author.uid,
                name: author.nickname,
                avatar_url: author.avatar_medium.url_list[0],
                channel_url: `https://www.tiktok.com/@${author.unique_id}`,
                subscriber_count: author.favoriting_count,
            },
        };
        return meta;
    }
}
exports.Tiktok = Tiktok;
//# sourceMappingURL=tiktok.js.map