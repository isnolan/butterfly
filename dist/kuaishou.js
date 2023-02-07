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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kuaishou = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var util_1 = require("./util");
var Kuaishou = /** @class */ (function () {
    function Kuaishou() {
        this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
    }
    Kuaishou.prototype.detail = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1.default)("https://www.kuaishou.com/graphql", {
                            method: "post",
                            headers: {
                                "content-type": "application/json",
                                "user-agent": this.userAgent,
                                Cookie: "kpf=PC_WEB; clientid=3; didv=1672015855539; did=web_9663dffb9dd73e09dfdda14434e5202b; clientid=3; kpn=KUAISHOU_VISION",
                            },
                            body: JSON.stringify({
                                operationName: "visionVideoDetail",
                                variables: {
                                    photoId: "".concat(postId),
                                    page: "detail",
                                },
                                query: "query visionVideoDetail($photoId: String, $type: String, $page: String, $webPageArea: String) {\n  visionVideoDetail(photoId: $photoId, type: $type, page: $page, webPageArea: $webPageArea) {\n    status\n    type\n    author {\n      id\n      name\n      following\n      headerUrl\n      __typename\n    }\n    photo {\n      id\n      duration\n      caption\n      likeCount\n      realLikeCount\n      coverUrl\n      photoUrl\n      liked\n      timestamp\n      expTag\n      llsid\n      viewCount\n      videoRatio\n      stereoType\n      croppedPhotoUrl\n      manifest {\n        mediaType\n        businessType\n        version\n        adaptationSet {\n          id\n          duration\n          representation {\n            id\n            defaultSelect\n            backupUrl\n            codecs\n            url\n            height\n            width\n            avgBitrate\n            maxBitrate\n            m3u8Slice\n            qualityType\n            qualityLabel\n            frameRate\n            featureP2sp\n            hidden\n            disableAdaptive\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    tags {\n      type\n      name\n      __typename\n    }\n    commentLimit {\n      canAddComment\n      __typename\n    }\n    llsid\n    danmakuSwitch\n    __typename\n  }\n}\n",
                            }),
                        }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var detail;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, res.json()];
                                    case 1:
                                        detail = _a.sent();
                                        return [2 /*return*/, this.parseMeta(detail.data.visionVideoDetail)];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Kuaishou.prototype.formatCount = function (str) {
        str = str.toString();
        var count = Number(str.replace(/(万)/, ""));
        if (str.indexOf("万") > -1) {
            count = count * 10000;
        }
        return count;
    };
    Kuaishou.prototype.parseMeta = function (detail) {
        var photo = detail.photo, tags = detail.tags, author = detail.author;
        var video = photo.manifest.adaptationSet[0].representation[0];
        var meta = {
            id: photo.id,
            url: "https://www.kuaishou.com/short-video/".concat(photo.id),
            title: photo.caption,
            description: "",
            tags: tags.map(function (tag) { return tag.name; }),
            category: "",
            created_at: (0, util_1.formatDate)(photo.timestamp / 1000),
            video: {
                quality: video.qualityType,
                width: video.width,
                height: video.height,
                duration: Math.floor(photo.duration / 1000),
                cover_url: photo.coverUrl,
                video_url: photo.photoUrl, // 无水印视频地址，有时效
            },
            stats: {
                view: this.formatCount(photo.viewCount),
                likes: this.formatCount(photo.realLikeCount),
                comment: 0,
                favourite: 0,
                share: 0, // 转发
            },
            author: {
                id: author.id,
                name: author.name,
                avatar_url: author.headerUrl,
                channel_url: "https://www.kuaishou.com/profile/".concat(author.id),
                subscriber_count: 0, // 订阅人数
            },
        };
        return meta;
    };
    return Kuaishou;
}());
exports.Kuaishou = Kuaishou;
