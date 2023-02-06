# Vue2 Admin

## Project setup

```sh
pnpm install
```

### Compiles and hot-reloads for development

```sh
pnpm serve
```

### Compiles and minifies for production

```sh
pnpm build
```

### Lints and fixes files

```sh
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### pnpm

pnpm - 速度快、节省磁盘空间的软件包管理器

- 快速：pnpm 是同类工具速度的将近 2 倍
- 高效：node_modules 中的所有文件均克隆或硬链接自单一存储位置
- 支持单体仓库：pnpm 内置了对单个源码仓库中包含多个软件包的支持
- 权限严格：pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问

## branch

- master 主分支：开发一些常用的组件和其他所学的东西。

- starter 开发模版分支：一个基础架构的管理系统的模版，开箱即用。

## 系统菜单、tabs 用 store 的设计

![flow](./public/flow.png)

[掘金文章](https://juejin.cn/post/7132304086937894920)
