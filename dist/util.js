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
exports.detect = exports.formatDate = exports.userAgent = void 0;
const node_fetch_1 = require("node-fetch");
exports.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
function formatDate(timestamp) {
    const a = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
    function format(m) {
        return new Intl.DateTimeFormat("en", m).format(timestamp * 1000);
    }
    return a.map(format).join("-");
}
exports.formatDate = formatDate;
function detect(url) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (/www.tiktok.com\/(.*)\/(\d+)\?/.test(url)) {
            const regex = url.match(/www.tiktok.com\/(.*)\/(\d+)\?/);
            resolve({ type: "tiktok", url, id: regex && regex[2] });
            return;
        }
        if (/www.douyin.com\/video\/(\d+)/.test(url)) {
            const regex = url.match(/www.douyin.com\/video\/(\d+)/);
            resolve({ type: "douyin", url, id: regex && regex[1] });
            return;
        }
        if (/v.douyin.com\/([0-9a-zA-Z]{6,})\//.test(url)) {
            let postId;
            try {
                postId = yield (0, node_fetch_1.default)(url, {
                    redirect: "manual",
                    headers: { "user-agent": exports.userAgent },
                }).then((r) => __awaiter(this, void 0, void 0, function* () {
                    const text = yield r.text();
                    const reg = text.match(/www.iesdouyin.com\/share\/video\/(\d+)/);
                    return reg && reg[1];
                }));
                url = `https://www.douyin.com/video/${postId}`;
                resolve({ type: "douyin", url, id: postId });
            }
            catch (err) {
                reject(err);
            }
            return;
        }
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
        if (/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/.test(url)) {
            const regex = url.match(/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/);
            resolve({ type: "kuaishou", url, id: regex && regex[1] });
            return;
        }
        if (/www.kuaishou.com\/f\/([-0-9a-zA-Z]{10,})/.test(url)) {
            try {
                const postId = yield (0, node_fetch_1.default)(url, {
                    redirect: "manual",
                    headers: { "user-agent": exports.userAgent },
                }).then((r) => __awaiter(this, void 0, void 0, function* () {
                    const location = r.headers.get("location");
                    const regex = location === null || location === void 0 ? void 0 : location.match(/short-video\/([-0-9a-zA-Z]{10,})\?/);
                    return regex && regex[1];
                }));
                url = `https://www.kuaishou.com/short-video/${postId}`;
                resolve({ type: "kuaishou", url, id: postId });
            }
            catch (err) {
                reject(err);
            }
            return;
        }
    }));
}
exports.detect = detect;
//# sourceMappingURL=util.js.map