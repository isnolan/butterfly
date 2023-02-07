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
exports.Kuaishou = void 0;
const node_fetch_1 = require("node-fetch");
const util_1 = require("./util");
class Kuaishou {
    constructor() {
        this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
    }
    detail(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, node_fetch_1.default)(`https://www.kuaishou.com/graphql`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "user-agent": this.userAgent,
                    Cookie: "kpf=PC_WEB; clientid=3; didv=1672015855539; did=web_9663dffb9dd73e09dfdda14434e5202b; clientid=3; kpn=KUAISHOU_VISION",
                },
                body: JSON.stringify({
                    operationName: "visionVideoDetail",
                    variables: {
                        photoId: `${postId}`,
                        page: "detail",
                    },
                    query: "query visionVideoDetail($photoId: String, $type: String, $page: String, $webPageArea: String) {\n  visionVideoDetail(photoId: $photoId, type: $type, page: $page, webPageArea: $webPageArea) {\n    status\n    type\n    author {\n      id\n      name\n      following\n      headerUrl\n      __typename\n    }\n    photo {\n      id\n      duration\n      caption\n      likeCount\n      realLikeCount\n      coverUrl\n      photoUrl\n      liked\n      timestamp\n      expTag\n      llsid\n      viewCount\n      videoRatio\n      stereoType\n      croppedPhotoUrl\n      manifest {\n        mediaType\n        businessType\n        version\n        adaptationSet {\n          id\n          duration\n          representation {\n            id\n            defaultSelect\n            backupUrl\n            codecs\n            url\n            height\n            width\n            avgBitrate\n            maxBitrate\n            m3u8Slice\n            qualityType\n            qualityLabel\n            frameRate\n            featureP2sp\n            hidden\n            disableAdaptive\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    tags {\n      type\n      name\n      __typename\n    }\n    commentLimit {\n      canAddComment\n      __typename\n    }\n    llsid\n    danmakuSwitch\n    __typename\n  }\n}\n",
                }),
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                const detail = yield res.json();
                return this.parseMeta(detail.data.visionVideoDetail);
            }));
        });
    }
    formatCount(str) {
        str = str.toString();
        let count = Number(str.replace(/(万)/, ""));
        if (str.indexOf("万") > -1) {
            count = count * 10000;
        }
        return count;
    }
    parseMeta(detail) {
        const { photo, tags, author } = detail;
        const video = photo.manifest.adaptationSet[0].representation[0];
        const meta = {
            id: photo.id,
            url: `https://www.kuaishou.com/short-video/${photo.id}`,
            title: photo.caption,
            description: "",
            tags: tags.map((tag) => tag.name),
            category: "",
            created_at: (0, util_1.formatDate)(photo.timestamp / 1000),
            video: {
                quality: video.qualityType,
                width: video.width,
                height: video.height,
                duration: Math.floor(photo.duration / 1000),
                cover_url: photo.coverUrl,
                video_url: photo.photoUrl,
            },
            stats: {
                view: this.formatCount(photo.viewCount),
                likes: this.formatCount(photo.realLikeCount),
                comment: 0,
                favourite: 0,
                share: 0,
            },
            author: {
                id: author.id,
                name: author.name,
                avatar_url: author.headerUrl,
                channel_url: `https://www.kuaishou.com/profile/${author.id}`,
                subscriber_count: 0,
            },
        };
        return meta;
    }
}
exports.Kuaishou = Kuaishou;
//# sourceMappingURL=kuaishou.js.map