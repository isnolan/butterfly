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
exports.Butterfly = void 0;
const util_1 = require("./util");
const tiktok_1 = require("./tiktok");
const douyin_1 = require("./douyin");
const youtube_1 = require("./youtube");
const kuaishou_1 = require("./kuaishou");
class Butterfly {
    constructor(type, options) {
        if (type == "tiktok") {
            this.client = new tiktok_1.Tiktok(options);
            return;
        }
        if (type == "douyin") {
            this.client = new douyin_1.Douyin();
            return;
        }
        if (type == "youtube") {
            this.client = new youtube_1.Youtube(options);
            return;
        }
        if (type == "kuaishou") {
            this.client = new kuaishou_1.Kuaishou();
            return;
        }
        throw new Error(`unsupport the video type: ${type}`);
    }
    static detect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, util_1.detect)(url);
        });
    }
    detail(postId) {
        return this.client.detail(postId);
    }
    statistics(postId) { }
}
exports.Butterfly = Butterfly;
exports.default = {
    Butterfly,
};
//# sourceMappingURL=index.js.map