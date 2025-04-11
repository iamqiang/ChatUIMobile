# ChatUI - 一个基于ChatUI 3.0的大模型（使用DeepSeek API演示）对话式交互项目。

## 项目维护者

**QIANG**  | 架构师

![WeChat QR Code](https://github.com/iamqiang/ChatUIMobile/blob/main/public/qrcode.jpg?raw=true)  
（扫码添加微信，备注「ChatUI交流」）

## 示例图片

![示例图片1](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/1.png?raw=true)  
![示例图片2](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/2.png?raw=true)  
![示例图片3](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/3.png?raw=true)  
![示例图片4](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/4.png?raw=true)  

## 环境准备

### 安装 Node.js
- 要求 Node.js 18 或更高版本
- 验证 Node.js 版本：
  ```bash
  node -v
  # 示例输出: v20.18.0
  ```

## 快速开始

### 1. 安装依赖
```bash
npm install
# 依赖将安装到 node_modules 目录
# 安装完成后可执行 `npm fund` 查看包资助信息
```

### 2. 启动开发服务器
```bash
npm start
# 浏览器将自动打开地址： http://localhost:3000/
```

## 项目构建

### 生成生产版本
```bash
npm run build
# 构建产物将输出到 build 目录，直接将目录下的所有文件部署到网站的根目录即可
```

### 子目录部署配置
当需要部署到非根路径时（如 `http://localhost:3000/chatui/`），需要使用如下命令构建：

**Windows 系统：**
```cmd
set PUBLIC_URL=/chatui && npm run build
```

**Linux/macOS 系统：**
```bash
PUBLIC_URL=/chatui npm run build
```

## 注意事项
- 非根目录部署时，子目录名称需与 `PUBLIC_URL` 变量值严格匹配

## ChatUI框架介绍

ChatUI 是阿里达摩院推出的一款专为构建专业级即时通讯应用设计的开源UI组件库，提供高度可定制的聊天界面解决方案。

### 核心特性

**开箱即用的组件库**
- 消息气泡组件
- 会话列表模板
- 输入工具栏
- 文件传输预览
- 表情符号选择器

**深度定制能力**
- 支持主题样式覆盖
- 多语言国际化(i18n)支持
- 响应式布局适配
- 无障碍访问(WCAG)支持

**跨平台支持**
- Web 端 (React/Vue)
- 移动端 (React Native)
- 桌面端 (Electron)

**开发友好**
- TypeScript 类型支持
- 模块化架构设计
- 完善的单元测试覆盖
- 详细的开发文档

### 适用场景

- 企业即时通讯（IM）系统
- 在线客服平台
- 社交应用聊天模块
- 直播互动消息系统
- 物联网设备控制终端

### 官方资源

官网地址：  
[https://chatui.io/](https://chatui.io/)

npm 仓库：  
`npm install @chatui/core`

开发文档：  
[https://docs.chatui.io/](https://docs.chatui.io/)

技术支持：  
[社区论坛](https://forum.chatui.io/) 
