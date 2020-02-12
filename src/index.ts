const ErrorStackParser = require("error-stack-parser");
const { SourceMapConsumer } = require("source-map");
const path = require("path");
const fs = require("fs");
export default class StackParser {
  private sourceMapDir: string;
  private consumers: Object;
  constructor(sourceMapDir) {
    this.sourceMapDir = sourceMapDir;
    this.consumers = {};
  }
  /**
   * 转换错误对象
   * @param stack 堆栈字符串
   * @param message 错误信息
   */
  static parseStackTrack(stack: string, message?: string) {
    const error = new Error(message);
    error.stack = stack;
    const stackFrame = ErrorStackParser.parse(error);
    return stackFrame;
  }

  /**
   * 转换错误对象
   * @param stack 堆栈字符串
   * @param message 错误信息
   */
  parseOriginStackTrack(stack: string, message?: string) {
    const frame = StackParser.parseStackTrack(stack, message);
    return this.getOriginalErrorStack(frame);
  }

  /**
   * 转换源代码运行栈
   * @param stackFrame 堆栈片段
   */
  async getOriginalErrorStack(stackFrame: Array<Object>) {
    const origin = [];
    for (let v of stackFrame) {
      origin.push(await this.getOriginPosition(v));
    }
    return origin;
  }

  /**
   * 转换源代码运行栈
   * @param stackFrame 堆栈片段
   */
  async getOriginPosition(stackFrame) {
    let { columnNumber, lineNumber, fileName } = stackFrame;
    fileName = path.basename(fileName);
    // 判断consumer是否存在
    let consumer = this.consumers[fileName];
    if (consumer === undefined) {
      // 读取sourcemap
      const sourceMapPath = path.resolve(this.sourceMapDir, fileName + ".map");
      // 判断文件是否存在
      if (!fs.existsSync(sourceMapPath)) {
        return stackFrame;
      }
      const content = fs.readFileSync(sourceMapPath, "utf-8");
      // console.log('content',content)
      consumer = await new SourceMapConsumer(content, null);
      this.consumers[fileName] = consumer;
    }
    const parseData = consumer.originalPositionFor({
      line: lineNumber,
      column: columnNumber
    });

    return parseData;
  }
}
