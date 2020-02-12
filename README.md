# Sourcemap-Stacktrack-Parser

[![Codecov Coverage](https://img.shields.io/codecov/c/github/su37josephxia/sourcemap-stacktrack-parser/master.svg?style=flat-square)](https://codecov.io/gh/su37josephxia/sourcemap-stacktrack-parser)[![Build Status](https://www.travis-ci.org/su37josephxia/sourcemap-stacktrack-parser.svg?branch=master)](https://www.travis-ci.org/su37josephxia/sourcemap-stacktrack-parser)![GitHub All Releases](https://img.shields.io/github/downloads/su37josephxia/sourcemap-stacktrack-parser/total)![NPM](https://img.shields.io/npm/l/sourcemap-stacktrack-parser)




> 解析Stacktrack中的源码位置

根据sourcemap将解析stacktrack

## Installing / Getting started

```shell
npm i sourcemap-stacktrack-parser
```

```js
// ======== Input Data =======
const error = {
  stack:
    "ReferenceError: xxx is not defined\n" +
    "    at http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js:1:1392\n",
  message: "Uncaught ReferenceError: xxx is not defined",
  filename: "http://localhost:7001/public/bundle.e7877aa7bc4f04f5c33b.js"
};
// ====== Run ==========
const parser = new StackParser(resolve(__dirname, "./data"));
const originStack = await parser.parseOriginStackTrack(
      error.stack,
      error.message
    );
// ====== Result =========
[{
      source: "webpack:///src/index.js",
      line: 24,
      column: 4,
      name: "xxx"
}]
```