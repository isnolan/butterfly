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
exports.detect = exports.formatDate = exports.userAgent = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
exports.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
/**
 * 格式化日期
 * @param timestamp
 * @returns
 */
function formatDate(timestamp) {
    var a = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
    function format(m) {
        return new Intl.DateTimeFormat("en", m).format(timestamp * 1000);
    }
    return a.map(format).join("-");
}
exports.formatDate = formatDate;
/**
 * 视频地址解析
 * @param url
 * @returns
 */
function detect(url) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var regex, regex, postId, err_1, regex, regex, regex, postId, err_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Tiktok
                    if (/www.tiktok.com\/(.*)\/(\d+)\?/.test(url)) {
                        regex = url.match(/www.tiktok.com\/(.*)\/(\d+)\?/);
                        resolve({ type: "tiktok", url: url, id: regex && regex[2] });
                        return [2 /*return*/];
                    }
                    // Douyin
                    if (/www.douyin.com\/video\/(\d+)/.test(url)) {
                        regex = url.match(/www.douyin.com\/video\/(\d+)/);
                        resolve({ type: "douyin", url: url, id: regex && regex[1] });
                        return [2 /*return*/];
                    }
                    if (!/v.douyin.com\/([0-9a-zA-Z]{6,})\//.test(url)) return [3 /*break*/, 5];
                    postId = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1.default)(url, {
                            redirect: "manual",
                            headers: { "user-agent": exports.userAgent },
                        }).then(function (r) { return __awaiter(_this, void 0, void 0, function () {
                            var text, reg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, r.text()];
                                    case 1:
                                        text = _a.sent();
                                        reg = text.match(/www.iesdouyin.com\/share\/video\/(\d+)/);
                                        return [2 /*return*/, reg && reg[1]];
                                }
                            });
                        }); })];
                case 2:
                    postId = _a.sent();
                    url = "https://www.douyin.com/video/".concat(postId);
                    resolve({ type: "douyin", url: url, id: postId });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    reject(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
                case 5:
                    // Youtube
                    if (/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/.test(url)) {
                        regex = url.match(/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/);
                        resolve({ type: "youtube", url: url, id: regex && regex[1] });
                        return [2 /*return*/];
                    }
                    if (/youtu.be\/([0-9a-zA-Z]{11,})/.test(url)) {
                        regex = url.match(/youtu.be\/([0-9a-zA-Z]{11,})/);
                        url = url.replace(/youtu.be\//, "www.youtube.com/watch?v=");
                        resolve({ type: "youtube", url: url, id: regex && regex[1] });
                        return [2 /*return*/];
                    }
                    // Kuaishou
                    if (/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/.test(url)) {
                        regex = url.match(/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/);
                        resolve({ type: "kuaishou", url: url, id: regex && regex[1] });
                        return [2 /*return*/];
                    }
                    if (!/www.kuaishou.com\/f\/([-0-9a-zA-Z]{10,})/.test(url)) return [3 /*break*/, 10];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, (0, node_fetch_1.default)(url, {
                            redirect: "manual",
                            headers: { "user-agent": exports.userAgent },
                        }).then(function (r) { return __awaiter(_this, void 0, void 0, function () {
                            var location, regex;
                            return __generator(this, function (_a) {
                                location = r.headers.get("location");
                                regex = location === null || location === void 0 ? void 0 : location.match(/short-video\/([-0-9a-zA-Z]{10,})\?/);
                                return [2 /*return*/, regex && regex[1]];
                            });
                        }); })];
                case 7:
                    postId = _a.sent();
                    url = "https://www.kuaishou.com/short-video/".concat(postId);
                    resolve({ type: "kuaishou", url: url, id: postId });
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    reject(err_2);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
exports.detect = detect;
