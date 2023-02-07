import * as fs from "fs";
import { Butterfly } from "../src/";

/**
 * Dummy test
 */
describe("Butterfly test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy();
  });

  it("Butterfly is instantiable", () => {
    expect(new Butterfly("tiktok")).toBeInstanceOf(Butterfly);
  });
});

describe("Butterfly.detect", () => {
  it("detect tiktok", async () => {
    const url =
      "https://www.tiktok.com/@yasincengiz38/video/7195895698066246918?is_from_webapp=1&sender_device=pc";
    const platform = await Butterfly.detect(url);
    // console.log(`tiktok:`, platform);
    expect(platform.type).toMatch("tiktok");
  });
  //
  it("detect douyin", async () => {
    const url = "https://www.douyin.com/video/7194082819558214968";
    const platform = await Butterfly.detect(url);
    // console.log(`douyin:`, platform);
    expect(platform.type).toMatch("douyin");
  });
  //
  it("detect douyin short", async () => {
    const url = "https://v.douyin.com/BBtjUhW/";
    const platform = await Butterfly.detect(url);
    // console.log(`douyin short:`, platform);
    expect(platform.type).toMatch("douyin");
  });
  //
  it("detect youtube", async () => {
    const url = "https://www.youtube.com/watch?v=ymCX2k6RYcs";
    const platform = await Butterfly.detect(url);
    // console.log(`youtube:`, platform);
    expect(platform.type).toMatch("youtube");
  });
  //
  it("detect youtube short url", async () => {
    const url = "https://youtu.be/ymCX2k6RYcs";
    const platform = await Butterfly.detect(url);
    // console.log(`youtube short:`, platform);
    expect(platform.type).toMatch("youtube");
  });
  //
  it("detect kuaishou  url", async () => {
    const url = "https://www.kuaishou.com/short-video/3xcmu8jye2vus66";
    const platform = await Butterfly.detect(url);
    // console.log(`kuaishou:`, platform);
    expect(platform.type).toMatch("kuaishou");
  });
});

describe("Butterfly detail", () => {
  it("detail tiktok", async () => {
    const butterfly = new Butterfly("tiktok", {
      agent: "http://192.168.2.6:7890",
    });
    const detail = await butterfly.detail("7192977531073613062");
    // console.log(`tiktok:`, detail);
    expect(detail.id).toMatch("7192977531073613062");
  });
  //
  it("detail douyin", async () => {
    const butterfly = new Butterfly("douyin");
    const detail = await butterfly.detail("7194082819558214968");
    // console.log(`douyin:`, detail);
    expect(detail.id).toMatch("7194082819558214968");
  });
  //
  it("detail youtube", async () => {
    const butterfly = new Butterfly("youtube", {
      agent: "http://192.168.2.6:7890",
    });
    const detail = await butterfly.detail("ymCX2k6RYcs");
    // fs.writeFileSync("./youtube.json", JSON.stringify(detail));
    // console.log(`youtube:`, detail);
    expect(detail.id).toMatch("ymCX2k6RYcs");
  });
  //
  it("detail kuaishou", async () => {
    const butterfly = new Butterfly("kuaishou");
    const detail = await butterfly.detail("3xcmu8jye2vus66");
    // fs.writeFileSync("./youtube.json", JSON.stringify(detail));
    // console.log(`kuaishou:`, detail);
    expect(detail.id).toMatch("3xcmu8jye2vus66");
  });
});
