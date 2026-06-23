// ============================================================
// 星语 AI Companion · 聊天核心模块
// 后端走代理，OpenAI 兼容格式，SSE 流式
// ============================================================

const API_CONFIG = {
  baseURL: "https://your-proxy.example.com",
  path: "/v1/chat/completions",
  defaultModel: "deepseek-chat",
  timeout: 60000,
  systemPrefix:
    "你是星语AI伴侣中的一个角色。请用自然、亲切的中文回复，回复长度适中，像真人对话一样。禁止提及自己是AI或语言模型。\n\n角色设定：",
};

const MAX_HISTORY_TURNS = 12;

function buildMessages(companion, history) {
  const rolePrompt = companion && companion.prompt ? companion.prompt : "温柔、真诚、善于倾听的虚拟伴侣。";
  const recent = history.slice(-MAX_HISTORY_TURNS * 2);
  const messages = [
    { role: "system", content: API_CONFIG.systemPrefix + rolePrompt },
    ...recent.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text || "",
    })),
  ];

  if (typeof S !== "undefined" && S.mood && S.mood.date === today()) {
    messages[0].content +=
      `\n\n用户今天的心情是「${S.mood.label}」` +
      (S.mood.note ? `，他/她说："${S.mood.note}"` : "") +
      "。请在对话中自然地体现对这份心情的关注，但不要每句都提。";
  }

  return messages;
}

function resolveApiModel(companion) {
  return (companion && (companion.apiModel || companion.model)) || (typeof S !== "undefined" && S.model) || API_CONFIG.defaultModel;
}

function isProxyConfigured() {
  return API_CONFIG.baseURL && !API_CONFIG.baseURL.includes("your-proxy.example.com");
}

async function streamChat(companion, history, onChunk, onDone, onError) {
  if (!isProxyConfigured()) {
    onError("请先在 chat-module.js 里配置 API_CONFIG.baseURL 代理地址");
    return;
  }

  const model = resolveApiModel(companion);
  const messages = buildMessages(companion, history);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const res = await fetch(API_CONFIG.baseURL + API_CONFIG.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.85,
        max_tokens: 512,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    if (!res.body) {
      throw new Error("代理没有返回可读取的 SSE 流");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === "data: [DONE]") continue;
        if (!trimmed.startsWith("data: ")) continue;

        try {
          const json = JSON.parse(trimmed.slice(6));
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            onChunk(delta, fullText);
          }
        } catch (_) {}
      }
    }

    onDone(fullText);
  } catch (err) {
    clearTimeout(timer);
    onError(err && err.name === "AbortError" ? "请求超时，请检查网络或稍后再试" : err.message || "请求失败");
  }
}

async function sendMessage() {
  const input = $("chatInput");
  const txt = input.value.trim();
  const pendingImage = input.dataset.pendingImage || null;
  if ((!txt && !pendingImage) || !S.current) return;

  const c = allCompanions().find((x) => x.id === S.current);
  if (!c) return;

  const conv = S.convs[S.current] || (S.convs[S.current] = []);
  const userMsg = { role: "user", text: txt || "(发送了图片)", time: Date.now() };
  if (pendingImage) {
    userMsg.image = pendingImage;
    delete input.dataset.pendingImage;
  }
  conv.push(userMsg);
  S.used++;
  input.value = "";
  input.style.height = "auto";
  save();
  renderChat();
  renderSide();

  const typingEl = $("typing");
  typingEl.classList.add("on");

  const aiMsg = { role: "assistant", text: "", time: Date.now(), streaming: true };
  conv.push(aiMsg);
  renderChat();

  function getLastBubble() {
    const bubbles = $("messages").querySelectorAll(".msg.ai .bubble");
    return bubbles[bubbles.length - 1] || null;
  }

  await streamChat(
    c,
    conv.slice(0, -1),
    (_delta, fullText) => {
      typingEl.classList.remove("on");
      aiMsg.text = fullText;
      aiMsg.streaming = true;

      const bubble = getLastBubble();
      if (bubble) {
        bubble.innerHTML = renderText(fullText) + '<span class="cursor-blink">▍</span>';
        const msgs = $("messages");
        msgs.scrollTop = msgs.scrollHeight;
      }
    },
    (fullText) => {
      aiMsg.text = fullText || "（本次回复为空，请稍后再试。）";
      delete aiMsg.streaming;
      typingEl.classList.remove("on");

      // Increase favorability on chat
      S.favorability[S.current] = Math.min((S.favorability[S.current] || 0) + 1, 100);

      save();
      renderChat();
      renderSide();
    },
    (errMsg) => {
      conv.pop();
      typingEl.classList.remove("on");
      save();
      renderChat();
      renderSide();
      toast("发送失败：" + errMsg);
    }
  );
}

window.API_CONFIG = API_CONFIG;
window.buildMessages = buildMessages;
window.streamChat = streamChat;
window.sendMessage = sendMessage;
