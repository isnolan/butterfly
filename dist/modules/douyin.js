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
const node_fetch_1 = require("node-fetch");
const util_1 = require("../util");
class Douyin {
    constructor() {
        this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";
    }
    detail(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://www.iesdouyin.com/aweme/v1/web/aweme/detail/?aweme_id=${postId}&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`;
            return yield (0, node_fetch_1.default)(url, { headers: { "user-agent": this.userAgent } }).then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                return this.parseMeta(data.aweme_detail);
            }));
        });
    }
    parseMeta(detail) {
        const { video, statistics, author } = detail;
        const meta = {
            id: detail.aweme_id,
            url: `https://www.douyin.com/video/${detail.aweme_id}`,
            title: detail.preview_title,
            description: detail.desc,
            tags: detail.text_extra.map((tag) => tag.hashtag_name),
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
                avatar_url: author.avatar_thumb.url_list[0],
                channel_url: `https://www.douyin.com/user/${author.sec_uid}`,
                subscriber_count: author.favoriting_count,
            },
        };
        return meta;
    }
}
exports.default = Douyin;
//# sourceMappingURL=douyin.js.map