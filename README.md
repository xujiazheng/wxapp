# 小程序原生架构

特性：
* 采用less和es6语法开发
* 制定强eslint校验
* 提供单元测试
* 一键创建新页面

+ [安装](#安装)
+ [启动](#启动)
+ [工程目录](#工程目录)
    + [source](#source)
        + [pages](#pages)
        + [components](#components)
        + [utils](#utils)
        + [common](#common)
            + [js](#js)
            + [less](#less)
    + [dist](#dist)
    + [bin](#bin)
    + [test](#test)
+ [关于eslint](#关于eslint)
+ [关于pre-commit](#关于pre-commit)
+ [关于scripts](#关于scripts)
    + [dev](#dev)
    + [build](#build)
    + [eslint](#eslint)
    + [test](#test)
    + [test:coverage](#test:coverage)
    + [create](#create)
+ [注意事项](#注意事项)

## 安装

```bash
# 克隆代码
git clone https://github.com/xujiazheng/wxapp.git
# 删除当前远端
git remote remove origin
# 添加你自己的git仓库远端
git remote add origin '你的git仓库地址'
```

## 启动

```bash
- cd wxapp
- npm i
- npm run dev
```

## 工程目录

介绍工程中每一个目录的职能

### source

源代码目录，包括所有小程序开发代码。

#### pages

放置所有小程序页面，一个页面包括4个文件：.wxml、.js、.less、.json

#### components

放置所有小程序业务通用组件

#### utils

放置所有基础工具方法

#### common

放置所有公用的业务基础文件

##### js

公用的业务基础逻辑

##### less

公用的业务基础less文件

### dist

编译后的代码，小程序发布上传的代码为此目录下的代码

### bin

存放一些需要的脚本

### test

存放测试用例，建议每一个功能性工具函数都写测试用例，例如utils目录下的函数

## 关于eslint

代码是我们共同维护的，因此格式校验是必要的，此工程集成了`较强的`eslint规范的规则，可以在`.eslintrc.js`文件中修改。

## 关于pre-commit

提交的代码应该是符合规范的，所以本工程添加本地`git钩子`校验提交代码eslint是否通过，不通过则禁止commit。如果不需要请删除`package.json`中的`pre-commit`字段

## 关于scripts

### dev

开发命令，时时编译
```bash
npm run dev
```

### build

打包代码

```bash
npm run build
```

### eslint

检测代码的eslint规范

```bash
npm run eslint
```

### test

启动测试，跑所有测试用例

```bash

npm run test
```

### test:coverage

验证测试覆盖率

```bash

npm run test:coverage
```

### create

生成页面或组件，按提示生成。

```bash
npm run create
```

### 注意事项

* source为开发目录，所有小程序代码都放置于source目录中
* dist为编译后的目录，代码转义后输出到dist文件，git仓库不保留此文件夹
* 新增文件需要监听需要重新`npm run dev`
* 新增页面或组件，使用`npm run create`