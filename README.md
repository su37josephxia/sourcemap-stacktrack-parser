# 从0到1开发一个开源项目(TS + ESlint + Jest + TravisCI)

[toc]

## 搭建项目框架

### 创建文件夹

```bash
# 创建项目文件件
mkdir sourcemap-stacktrack-parser
# 创建README.md文件
echo "# sourcemap-stacktrack-parser" >> README.md
```



### 初始化git仓库

```bash
git init
# 添加README文件
git add README.md
# 提交代码
git commit -m "first commit"
# 设置远程仓库地址
git remote add origin git@github.com:su37josephxia/sourcemap-stacktrack-parser.git
# 推送代码
git push -u origin master

```



### 初始化npm

```bash
npm init -y
```

### 初始化tsc

#### 安装typescript包

```bash
npm i typescript ts-node-dev @types/node -d
```

#### 创建tsconfig.json文件

```json
{
    "compilerOptions": {
        "outDir": "./lib",
        "target": "es2017",
        "module": "commonjs",//组织代码方式
        "sourceMap": true,
        "moduleResolution": "node", // 模块解决策略
        "experimentalDecorators": true, // 开启装饰器定义
        "allowSyntheticDefaultImports": true, // 允许es6方式import
        "lib": ["es2015"],
        "typeRoots": ["./node_modules/@types"],
    },
    "include": ["src/**/*"]
}
```

#### 创建index.js文件

```js
mkdir src
echo 'console.log("helloworld")' >> src/index.ts
```

#### 添加npm脚本

在package.json文件中添加

```
"scripts": {
    "start": "ts-node-dev ./src/index.ts -P tsconfig.json --no-cache",
    "build": "tsc -P tsconfig.json",
}
```

#### git忽略lib文件

```bash
echo '/lib' >> .gitignore
```



#### 验证

```bash
npm start
```

![image-20200210163007258](assets/image-20200210163007258.png)



### 初始化Jest测试

#### 安装jest库

```bash
npm install jest ts-jest @types/jest -d
```

#### 创建jestconfig.json文件

```json
{
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}
```

####  package.json里的 scripts 下的 test 

```json
{
  "scripts": {
    "test": "jest --config jestconfig.json --watch",
  }
}
```



#### 源码中导出一个函数

```js
export const add = (a: number, b: number) => a + b
```

#### 创建测试用例

在src/\___tests\___文件夹中创建index.spec.ts

```js
import { add } from "../index";
test("Index add fun", () => {
    const ret = add(1, 2)
    console.log(ret)
    expect(ret).toBe(3);
});
```

#### 启动测试用例

```bash
npm run test
```



### 初始化Eslint



安装eslint包

```
npm install prettier tslint tslint-config-prettier -d
```
配置tslint.json
```json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rules": {
    "no-console": false, // 忽略console.log
    "object-literal-sort-keys": false,
    "member-access": false,
    "ordered-imports": false
  },
  "linterOptions": {
    "exclude": ["**/*.json", "node_modules"]
  }
}
```

#### 配置 .prettierrc

Prettier 是格式化代码工具。用来保持团队的项目风格统一。

```json
{
  "trailingComma": "all",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true,
  "endOfLine": "lf",
  "printWidth": 120,
  "overrides": [
    {
      "files": ["*.md", "*.json", "*.yml", "*.yaml"],
      "options": {
        "tabWidth": 2
      }
    }
  ]
}
```

####  配置.editorconfig

“EditorConfig帮助开发人员在不同的编辑器和IDE之间定义和维护一致的编码样式。EditorConfig项目由用于定义编码样式**的文件格式**和一组**文本编辑器插件组成**，这些**插件**使编辑器能够读取文件格式并遵循定义的样式。EditorConfig文件易于阅读，并且与版本控制系统配合使用。

对于VS Core，对应的插件名是[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

````bash
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 4

[{*.json,*.md,*.yml,*.*rc}]
indent_style = space
indent_size = 2
````

添加script脚本

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.ts\" \"src/**/*.js\"",
    "lint": "tslint -p tsconfig.json"
  }
}
```



### 设置 git 提交的校验钩子

安装husky、conventional库

```js
npm install husky @commitlint/config-conventional @commitlint/cli commitizen cz-conventional-changelog -d
```

新建.huskyrc

```js
{
    "hooks": {
        "pre-commit": "npm run format && npm run lint && npm test"
    }
}
```



### TDD方式编写功能





## 编写文档

### 编写README.md

参考https://github.com/jehna/readme-best-practices/blob/master/README-default.md

### 编写package.json描述信息





## 提交与发布代码

### 提交git仓库

### 发布npm仓库