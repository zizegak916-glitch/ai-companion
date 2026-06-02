# ✨ 星语 · AI伴侣

沉浸式虚拟伴侣单页应用。当前版本继续“大改”：前端仍不收集、不保存 API Key，但聊天核心已切换为「后端代理 + OpenAI 兼容 SSE 流式」；同时保留 12 位官方伴侣、自定义伴侣、展示型支持方案、移动端会话抽屉和日系 galgame / visual novel sprite 风立绘提示词。

## 功能亮点

- **前端不放 Key**：页面不提供 API Key 输入框；真实密钥应放在你的代理服务端，浏览器只请求代理地址。
- **SSE 流式聊天**：`chat-module.js` 会构建 OpenAI 兼容 `messages`，调用代理的 `/v1/chat/completions`，并把 SSE 片段实时写入最后一条 AI 气泡。
- **模型/角色上下文**：每位伴侣的 `prompt` 会拼入 system prompt；当天心情签到也会自然注入上下文。
- **内置模型选择**：DeepSeek、豆包、Kimi、腾讯混元、MiniMax、阶跃星辰、Gemini、文心一言、小米 MiMo、OpenRouter 风格、通义千问、智谱均作为模型系列与伴侣推荐模型展示。
- **选择界面优化**：伴侣选择页提供 AI 引擎胶囊筛选、标签筛选、搜索、推荐模型说明和 galgame 生图提示词入口。
- **功能全开放**：12 位官方伴侣、全部模型风格和自定义伴侣入口默认开放；订阅页只保留“支持方案”展示，不限制角色入口。
- **自定义伴侣**：可在页面中创建自己的伴侣，设置名字、性格、标签、简介和推荐模型；数据只保存在 `localStorage`。
- **移动端可用性**：聊天页在窄屏下提供会话抽屉按钮，侧边会话列表会以底部抽屉形式滑出。
- **Galgame 生图提示词与立绘承载**：不再提交二进制图片文件：12 位官方伴侣会在浏览器运行时用 Canvas 生成更接近参考图的日系动漫 PNG data URL（细线条、长发发丝、柔光背景、半身/膝上构图），并通过 `<img>` 渲染为卡片立绘/头像；自定义伴侣仍保留 SVG 降级图，也可外接 `avatar` / `standee` 图片地址。

## API 代理配置

聊天核心在 `chat-module.js` 顶部配置：

```js
const API_CONFIG = {
  baseURL: "https://your-proxy.example.com",
  path: "/v1/chat/completions",
  defaultModel: "deepseek-chat",
  timeout: 60000,
  systemPrefix: "你是星语AI伴侣中的一个角色...",
};
```

你的代理需要满足：

| 要求 | 说明 |
| --- | --- |
| 路径 | `POST /v1/chat/completions` |
| 请求体 | 标准 OpenAI 兼容格式 |
| 响应 | `stream: true` 时返回 SSE 流 |
| CORS | 允许当前站点跨域访问 |
| Key | 在代理服务端注入，不暴露给前端 |

如果代理需要鉴权，请在 `chat-module.js` 的 `headers` 中添加自定义 header；不要在 `index.html` 暴露真实上游密钥。

## 官方伴侣、推荐模型与生图提示词

| 官方伴侣 | 原名 | 定位 | 推荐模型 |
| --- | --- | --- | --- |
| 星澜 | 小溪 | 温柔治愈 | DeepSeek Chat V3 |
| 森屿 | 林风 | 幽默博学 | Step Chat |
| 晴梨 | 梦瑶 | 元气陪伴 | Doubao Lite |
| 砚澄 | 亦尘 | 成熟建议 | Kimi Thinking |
| 荷音 | 清荷 | 文艺浪漫 | abab RolePlay |
| 曜野 | 浩宇 | 运动打卡 | Hunyuan Pro |
| 灵绮 | 灵犀 | 创意脑洞 | Gemini Flash |
| 海澈 | 沐辰 | 深度复盘 | ERNIE Pro |
| 墨岚 | 新官方 | 国风洞察 | Kimi K2 |
| 夏栀 | 新官方 | 甜酷画师 | abab Chat |
| 白夜 | 新官方 | 都市守护 | Hunyuan Lite |
| 云舒 | 新官方 | 学习规划 | Step Creative |

提示词入口：在伴侣选择卡片点击「🎨 生图词」，可查看该角色的正向提示词、通用基底和通用负面提示词。

## 内置模型系列

| 系列 | 页面标识 | 代表模型 | 说明 |
| --- | --- | --- | --- |
| DeepSeek 内置 | DS | DeepSeek Chat V3 / R1 | 稳定长对话、复盘和中文陪伴 |
| 豆包内置 | 豆 | Doubao Lite / Pro | 轻快、接梗、陪伴感强 |
| Kimi 内置 | K | Kimi K2 / Thinking | 长上下文、阅读总结、关系梳理 |
| 腾讯混元内置 | 混 | Hunyuan Lite / Pro | 日常陪聊、职场计划、成熟建议 |
| MiniMax 内置 | MM | abab Chat / RolePlay | 情绪回应、角色扮演、二次元剧情 |
| 阶跃星辰内置 | 阶 | Step Chat / Creative | 学习陪伴、知识问答、灵感共创 |
| Gemini 风格 | G | Gemini Flash / Pro | 多视角思考、点子发散、复杂规划 |
| 文心一言内置 | 文 | ERNIE Speed / Pro | 中文写作、学习规划、正式表达 |
| 小米 MiMo 内置 | mi | MiMo Pro / Flash | 生活建议、短回复和打卡提醒 |
| OpenRouter 风格 | OR | Gemini / Llama / Qwen 风格 | 创意、探索、开放式闲聊 |
| 通义千问内置 | Q | Qwen Max / Plus / Turbo | 中文知识、文艺表达和学习陪伴 |
| 智谱内置 | 智 | GLM-4 Plus / Flash | 深度共情和结构化建议 |

## 支持方案逻辑

- 当前版本不接入真实支付，也不设置真实付费墙；所有伴侣、模型和自定义入口默认开放。
- 订阅页保留体验版、Pro、∞ 三档，只用于展示项目支持方案和产品文案。
- 聊天条数仍会本地统计；`chat-module.js` 会在达到当前展示方案的本地额度时跳转到订阅页提示。
- 如果要真实控制额度，应在代理层做用户鉴权、限流和计费；前端 `localStorage` 只能用于演示。

## 立绘图片替换建议

`COMPANIONS` 中每个伴侣都可以继续使用内置 SVG，也可以增加图片字段：

```js
{
  id: 'xinglan',
  avatar: 'https://example.com/xinglan-avatar.png',
  standee: 'https://example.com/xinglan-standee.png'
}
```

官方伴侣默认不写入二进制路径，而是由 `companionRaster()` 在浏览器里即时生成接近搜索参考图的日系动漫 PNG data URL；如果你后续有外部图床或 CDN 图片，也可以手动填写 `avatar` / `standee` 覆盖运行时生成图。

## 使用方式

1. 配置并部署自己的后端代理，确保它支持 OpenAI 兼容 `/v1/chat/completions` 和 SSE。
2. 打开 `chat-module.js`，把 `API_CONFIG.baseURL` 改成你的代理地址。
3. 直接打开 `index.html`，或用任意静态服务器托管。
4. 填写出生日期完成本地年龄验证。
5. 选择官方伴侣或创建自定义伴侣开始聊天；前端无需配置密钥。
6. 在移动端聊天页点击「☰」可打开会话抽屉；进入「订阅」只会切换本地展示方案，不会锁住角色入口。

示例本地服务：

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:4173`。

## 数据说明

应用使用以下 localStorage 键：

- `xy2`：主应用状态、会话、展示方案、收藏、心情、自定义伴侣和本地支持方案记录。
- `xyUsers`：演示账号密码，仅用于本地交互原型。

如需重置，可在「我的」页面点击清空本地数据，或手动清理浏览器 localStorage。

## License

MIT
