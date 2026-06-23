# ✦ 星语 AI Companion

> 你的智能 AI 伴侣，温暖治愈每一天。

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.0-7c5cff?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/HTML5-16_Companions-ff6aa8?style=flat-square" alt="Companions">
  <img src="https://img.shields.io/badge/No%20Backend-Required-18b6a6?style=flat-square" alt="No Backend">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Dark%20Theme-Enabled-0a0a0f?style=for-the-badge" alt="Dark Theme">
  <img src="https://img.shields.io/badge/Mobile%20First-Responsive-7c5cff?style=for-the-badge" alt="Mobile First">
  <img src="https://img.shields.io/badge/Offline%20Ready-PWA-18b6a6?style=for-the-badge" alt="Offline Ready">
</p>

---

## ✨ 项目介绍

星语 AI Companion 是一款现代化的 AI 伴侣聊天应用，采用深色主题设计，提供 16 位风格各异的 AI 伴侣。所有数据本地存储，无需后端服务，注重用户隐私。

### 截图说明

```
┌─────────────────────────────────────────┐
│  ✦ 星语 AI Companion          ☀️  ⚙️   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │  星澜    │  │  森屿    │  │  晴梨    │ │
│  │  温柔    │  │  幽默    │  │  活泼    │ │
│  │  ████░░  │  │  ██░░░░  │  │  █████░  │ │
│  │ 好感60%  │  │ 好感20%  │  │ 好感80%  │ │
│  │  💬     │  │  💬     │  │  💬     │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│  ✨ 伴侣  💬 消息  👤 我的              │
└─────────────────────────────────────────┘
```

---

## 🚀 功能列表

### 核心功能
- 🤖 **16 位 AI 伴侣** — 温柔、幽默、活泼、文艺、毒舌等多种风格
- 💬 **AI 聊天** — 流式输出，打字机效果，支持 Markdown 渲染
- 🌙 **深色/浅色主题** — 一键切换，护眼舒适
- 📱 **移动端优先** — 完美适配手机、平板、桌面

### 特色功能
- 🔮 **每日一签** — 随机治愈语录，每日心灵鸡汤
- 📔 **伴侣日记** — 写下心事，伴侣会温柔回复
- 🖼️ **图片分享** — 支持发送图片，base64 预览
- 🎙️ **语音模式** — UI 展示语音交互界面
- ❤️ **好感度系统** — 聊天、写日记都会提升好感度
- 🎨 **卡片翻转** — 正面立绘，背面详情

### 聊天体验
- ⌨️ **打字机效果** — 消息逐字显示
- 📋 **长按菜单** — 复制、收藏、删除消息
- 🌈 **自定义背景** — 多种渐变主题可选
- 💾 **聊天导出** — JSON 格式导出聊天记录

### 技术特性
- 🔌 **Service Worker** — 支持离线访问
- 💾 **localStorage** — 数据完全本地存储
- 📦 **数据导入/导出** — 一键备份恢复
- 🎯 **CSS 变量系统** — 主题一键切换
- ✨ **毛玻璃效果** — 现代 UI 质感

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化标签，PWA 支持 |
| CSS3 | CSS 变量、毛玻璃、动画 |
| Vanilla JS | 零依赖，极致轻量 |
| Service Worker | 离线缓存支持 |
| Canvas API | 伴侣头像生成 |

**无框架依赖**，纯原生实现，极致轻量。

---

## 📦 安装和使用

### 方式一：直接使用

1. 克隆仓库
   ```bash
   git clone https://github.com/your-username/ai-companion.git
   cd ai-companion
   ```

2. 启动本地服务
   ```bash
   # 使用 Python
   python3 -m http.server 8080

   # 或使用 Node.js
   npx serve .

   # 或使用 PHP
   php -S localhost:8080
   ```

3. 打开浏览器访问 `http://localhost:8080`

### 方式二：部署到 GitHub Pages

1. Fork 本仓库
2. 进入 Settings → Pages
3. 选择 Source 为 `main` 分支
4. 访问 `https://your-username.github.io/ai-companion/`

### 配置 AI 模型（可选）

如需使用真实 AI 模型，编辑 `chat-module.js`：

```javascript
const API_CONFIG = {
  baseURL: "https://your-proxy.example.com",  // 替换为你的代理地址
  path: "/v1/chat/completions",
  // ...
};
```

> 💡 不配置也能使用内置回复功能。

---

## 📁 项目结构

```
ai-companion/
├── index.html          # 主页面
├── app.js              # 主应用逻辑
├── chat-module.js      # 聊天核心模块
├── sw.js               # Service Worker
├── manifest.json       # PWA 配置
├── README.md           # 项目文档
└── LICENSE             # MIT 协议
```

---

## 🤝 贡献指南

欢迎贡献代码、报告 Bug 或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 使用 2 空格缩进
- 使用语义化变量名
- 遵循现有代码风格
- 测试新功能后再提交

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

```
MIT License

Copyright (c) 2024 星语 AI Companion

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  用 ❤️ 打造 · 星语 AI Companion
</p>
