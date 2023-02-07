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
exports.Douyin = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var util_1 = require("./util");
var Douyin = /** @class */ (function () {
    function Douyin() {
        this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";
    }
    Douyin.prototype.detail = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://www.iesdouyin.com/aweme/v1/web/aweme/detail/?aweme_id=".concat(postId, "&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333");
                        return [4 /*yield*/, (0, node_fetch_1.default)(url, { headers: { "user-agent": this.userAgent } }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.json()];
                                        case 1:
                                            data = _a.sent();
                                            // console.log(data);
                                            return [2 /*return*/, this.parseMeta(data.aweme_detail)];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Douyin.prototype.parseMeta = function (detail) {
        var video = detail.video, statistics = detail.statistics, author = detail.author;
        var meta = {
            id: detail.aweme_id,
            url: "https://www.douyin.com/video/".concat(detail.aweme_id),
            title: detail.preview_title,
            description: detail.desc,
            tags: detail.text_extra.map(function (tag) { return tag.hashtag_name; }),
            category: "",
            created_at: (0, util_1.formatDate)(detail.create_time),
            video: {
                quality: video.ratio,
                width: video.width,
                height: video.height,
                duration: Math.floor(video.duration / 1000),
                cover_url: video.cover.url_list[0],
                video_url: video.play_addr.url_list[0], // 无水印视频地址，有时效
            },
            stats: {
                view: statistics.play_count,
                likes: statistics.digg_count,
                comment: statistics.comment_count,
                favourite: statistics.collect_count,
                share: statistics.share_count, // 转发
            },
            author: {
                id: author.uid,
                name: author.nickname,
                avatar_url: author.avatar_thumb.url_list[0],
                channel_url: "https://www.douyin.com/user/".concat(author.sec_uid),
                subscriber_count: author.favoriting_count, // 订阅人数
            },
        };
        return meta;
    };
    return Douyin;
}());
exports.Douyin = Douyin;
