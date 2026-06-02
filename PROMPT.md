你是一个前端开发专家。我有一个纯前端单页应用项目 `index.html`（511行，零后端依赖），请帮我继续优化。

## 项目概述

**星语 · AI伴侣** — 沉浸式虚拟伴侣对话平台，部署在 GitHub Pages，纯前端 SPA。

文件：`index.html`（CSS + HTML + JS 全在一个文件内）
存储：localStorage（键名 `xy2`）
部署：GitHub Pages 静态站

## 当前功能

- 12 位官方伴侣（星澜/森屿/晴梨/砚澄/荷音/曜野/灵绮/海澈/墨岚/夏栀/白夜/云舒）
- 12+ 内置 AI 引擎风格（DeepSeek/豆包/Kimi/混元/MiniMax/阶跃/Gemini/文心/MiMo/OpenRouter/通义/智谱）
- 自定义伴侣创建（名字/性格/标签/提示词/配色/发型/装饰）
- 付费墙订阅系统（体验版/Pro/∞，含支付模拟）
- 国漫二次元风 SVG 全身立绘
- 本地 Demo 回复引擎（无需外部 API）
- 心情签到、聊天记录、数据导出

## 技术细节

- CSS 变量主题（玻璃拟态浅色）
- 响应式布局（移动端优先，920px/560px 断点）
- 伴侣 SVG 立绘用 `hairShape()` + `markShape()` + `companionIcon()` 绘制
- 状态对象 `S` 保存在 localStorage，包含：verified, logged, user, provider, model, sub, used, convs, favorites, mood, customCompanions, paidUntil, receipts, pendingPlan, engineFilter
- `PROVIDERS` 数组定义 AI 引擎（每个有 id, name, logo, cls, models）
- `COMPANIONS` 数组定义伴侣（每个有 id, name, age, persona, tags, icon, desc, prompt, provider, model）
- `PLANS` 数组定义订阅方案（free/pro/inf）

## 请帮我做以下优化

（在此写你想让 Claude 做的事情，比如：）
- 优化移动端体验
- 增加新伴侣
- 改进 SVG 立绘细节
- 增加新功能
- 修复 bug
- 等等

## 注意事项

- 所有代码在单个 `index.html` 文件内，不要拆分
- 不要引入外部依赖（CDN 除外）
- 保持中文 UI
- 移动端优先
- localStorage 存储，不要后端
