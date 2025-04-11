# Project Title

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
# 浏览器将自动访问 http://localhost:3000/
```

## 项目构建

### 生成生产版本
```bash
npm run build
# 构建产物将输出到 build 目录
```

### 子目录部署配置
当需要部署到非根路径时（如 `http://example.com/chatui/`）：

**Windows 系统：**
```cmd
set PUBLIC_URL=/chatui && npm run build
```

**Linux/macOS 系统：**
```bash
PUBLIC_URL=/chatui npm run build
```

## 注意事项
- 生产环境部署时需确保服务器正确配置路由重定向
- 子目录名称需与 `PUBLIC_URL` 变量值严格匹配
- 建议将环境变量配置加入 CI/CD 流程实现自动化构建
