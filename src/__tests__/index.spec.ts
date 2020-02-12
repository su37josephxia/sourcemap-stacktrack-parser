import StackParser from "../index";
const { resolve } = require("path");
const error = {
  stack:
    "ReferenceError: xxx is not defined\n" +
    "    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392\n" +
    "    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392",
  message: "Uncaught ReferenceError: xxx is not defined",
  filename: "http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js"
};
describe("parseStackTrack Method:", () => {
  it("测试Stack转换为StackFrame对象", () => {
    expect(
      StackParser.parseStackTrack(error.stack, error.message)
    ).toContainEqual({
      columnNumber: 1392,
      lineNumber: 1,
      fileName: "http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js",
      source:
        "    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392"
    });
  });
});

describe("parseOriginStackTrack Method:", () => {
  it("正常测试", async () => {
    const parser = new StackParser(resolve(__dirname, "./data"));
    const originStack = await parser.parseOriginStackTrack(
      error.stack,
      error.message
    );
    // 断言
    expect(originStack[0]).toMatchObject({
      source: "webpack:///src/index.js",
      line: 24,
      column: 4,
      name: "xxx"
    });
  });

  it("sourcemap文件不存在", async () => {
    const parser = new StackParser(resolve(__dirname, "./xxx"));
    const originStack = await parser.parseOriginStackTrack(
      error.stack,
      error.message
    );
    // 断言
    expect(originStack[0]).toMatchObject({
      columnNumber: 1392,
      lineNumber: 1,
      fileName: "http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js",
      source:
        "    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392"
    });
  });
});
