# ChatUI - A Conversational Interaction Project Based on ChatUI 3.0 with Large Language Model (DeepSeek API Demo)

## Maintainers

**QIANG** | Architect

![WeChat QR Code](https://github.com/iamqiang/ChatUIMobile/blob/main/public/qrcode.jpg?raw=true)  
(Scan to add WeChat, remark "ChatUI Communication")

- 中文 ： https://github.com/iamqiang/ChatUIMobile/blob/main/README-ZH.md
- English ： https://github.com/iamqiang/ChatUIMobile/blob/main/README.md

## Demo Screenshots

![Demo 1](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/1.png?raw=true)  
![Demo 2](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/2.png?raw=true)  
![Demo 3](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/3.png?raw=true)  
![Demo 4](https://github.com/iamqiang/ChatUIMobile/blob/main/demo/4.png?raw=true)  

## Environment Setup

### Install Node.js
- Requires Node.js 18 or higher
- Verify Node.js version:
  ```bash
  node -v
  # Sample output: v20.18.0
  ```

## Quick Start

### 1. Install Dependencies
```bash
npm install
# Dependencies will be installed to node_modules directory
# Execute `npm fund` after installation to view package funding info
```

### 2. Start Development Server
```bash
npm start
# Browser will automatically open: http://localhost:3000/
```

## Build Project

### Generate Production Build
```bash
npm run build
# Build artifacts will be output to build directory. Deploy all files under this directory to website root.
```

### Subdirectory Deployment Configuration
When deploying to non-root paths (e.g. `http://localhost:3000/chatui/`), use following commands:

**Windows:**
```cmd
set PUBLIC_URL=/chatui && npm run build
```

**Linux/macOS:**
```bash
PUBLIC_URL=/chatui npm run build
```

## Notes
- Subdirectory name must exactly match `PUBLIC_URL` value for non-root deployments

## ChatUI Framework Introduction

ChatUI is an open-source UI component library developed by Alibaba DAMO Academy, specifically designed for building professional instant messaging applications with highly customizable chat interface solutions.

### Core Features

**Out-of-the-Box Components**
- Message bubble components
- Conversation list templates
- Input toolbar
- File transfer preview
- Emoji picker

**Deep Customization**
- Theme style overrides
- Multi-language i18n support
- Responsive layout adaptation
- WCAG accessibility compliance

**Cross-Platform Support**
- Web (React/Vue)
- Mobile (React Native)
- Desktop (Electron)

**Developer Friendly**
- TypeScript type definitions
- Modular architecture
- Comprehensive unit test coverage
- Detailed documentation

### Use Cases

- Enterprise IM systems
- Online customer service platforms
- Social app chat modules
- Live streaming interaction systems
- IoT device control terminals

### Official Resources

Official Website:  
[https://chatui.io/](https://chatui.io/)

npm Package:  
`npm install @chatui/core`

Documentation:  
[https://docs.chatui.io/](https://docs.chatui.io/)

