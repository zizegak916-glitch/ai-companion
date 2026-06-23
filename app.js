// ============================================================
// 星语 AI Companion · 主应用逻辑
// ============================================================

// --- Providers & Models ---
const PROVIDERS=[
  {id:'deepseek',name:'DeepSeek',logo:'DS',cls:'deepseek',models:[['deepseek-chat','DeepSeek Chat V3'],['deepseek-reasoner','DeepSeek R1']]},
  {id:'doubao',name:'豆包',logo:'豆',cls:'doubao',models:[['doubao-lite','Doubao Lite'],['doubao-pro','Doubao Pro']]},
  {id:'kimi',name:'Kimi',logo:'K',cls:'kimi',models:[['kimi-k2','Kimi K2'],['kimi-thinking','Kimi Thinking']]},
  {id:'hunyuan',name:'腾讯混元',logo:'混',cls:'hunyuan',models:[['hunyuan-lite','Hunyuan Lite'],['hunyuan-pro','Hunyuan Pro']]},
  {id:'minimax',name:'MiniMax',logo:'MM',cls:'minimax',models:[['abab-chat','abab Chat'],['abab-role','abab RolePlay']]},
  {id:'stepfun',name:'阶跃星辰',logo:'阶',cls:'stepfun',models:[['step-chat','Step Chat'],['step-creative','Step Creative']]},
  {id:'gemini',name:'Gemini',logo:'G',cls:'gemini',models:[['gemini-flash','Gemini Flash'],['gemini-pro','Gemini Pro']]},
  {id:'wenxin',name:'文心一言',logo:'文',cls:'wenxin',models:[['ernie-speed','ERNIE Speed'],['ernie-pro','ERNIE Pro']]},
  {id:'xiaomi',name:'小米 MiMo',logo:'mi',cls:'xiaomi',models:[['mimo-v2.5-pro','MiMo Pro'],['mimo-v2.5-flash','MiMo Flash']]},
  {id:'openrouter',name:'OpenRouter',logo:'OR',cls:'openrouter',models:[['deepseek/deepseek-chat-v3-0324:free','DeepSeek V3'],['google/gemini-2.5-flash-preview:free','Gemini Flash'],['meta-llama/llama-4-maverick:free','Llama 4'],['qwen/qwen3-235b-a22b:free','Qwen3']]},
  {id:'qwen',name:'通义千问',logo:'Q',cls:'qwen',models:[['qwen-max','Qwen Max'],['qwen-plus','Qwen Plus'],['qwen-turbo','Qwen Turbo']]},
  {id:'zhipu',name:'智谱',logo:'智',cls:'zhipu',models:[['glm-4-plus','GLM-4 Plus'],['glm-4-flash','GLM-4 Flash']]}
];

const MODEL_META={
  'deepseek-chat':{good:'长对话、情绪陪伴',style:'稳、自然、适合日常陪伴'},
  'deepseek-reasoner':{good:'复杂分析、决策建议',style:'逻辑清晰，会拆步骤'},
  'doubao-lite':{good:'短句陪聊、轻量角色',style:'亲近、俏皮、回复快'},
  'doubao-pro':{good:'情绪陪伴、创意续写',style:'鲜活、会接梗、陪伴感强'},
  'kimi-k2':{good:'长上下文、阅读总结',style:'聪明、耐心、擅长接住细节'},
  'kimi-thinking':{good:'深度思考、长线陪伴',style:'慢热、逻辑强、会追问'},
  'hunyuan-lite':{good:'日常陪聊、中文闲聊',style:'温和、稳定、接地气'},
  'hunyuan-pro':{good:'正式建议、结构化计划',style:'可靠、成熟、有条理'},
  'abab-chat':{good:'轻松闲聊、情绪回应',style:'活泼、短句、陪伴感强'},
  'abab-role':{good:'角色扮演、剧情对话',style:'戏剧感、代入感强'},
  'step-chat':{good:'知识问答、学习陪伴',style:'清晰、稳健、像学习搭子'},
  'step-creative':{good:'灵感共创、文案脑洞',style:'跳跃、想象力强'},
  'gemini-flash':{good:'创意快答、点子发散',style:'轻快、灵动、反应快'},
  'gemini-pro':{good:'复杂任务、深度规划',style:'开阔、理性、灵感丰富'},
  'ernie-speed':{good:'中文常识、日常陪伴',style:'简明、亲切、直接'},
  'ernie-pro':{good:'中文写作、学习规划',style:'稳重、细致、偏顾问型'},
  'mimo-v2.5-pro':{good:'轻快聊天、生活建议',style:'亲和、反应快、口语化'},
  'mimo-v2.5-flash':{good:'快速寒暄、短回复',style:'短平快、元气型'},
  'qwen-max':{good:'高质量中文、文艺表达',style:'细腻、表达力强'},
  'qwen-plus':{good:'日常聊天、稳定输出',style:'均衡、温和'},
  'qwen-turbo':{good:'快速响应、简单任务',style:'简洁、直接'},
  'glm-4-plus':{good:'深度共情、结构化回答',style:'成熟、可靠'},
  'glm-4-flash':{good:'快速陪聊、轻量角色扮演',style:'轻快、简洁'},
  'custom':{good:'跟随自定义伴侣设定',style:'由你的伴侣设定决定'}
};

// --- 16 Official Companions ---
const COMPANIONS=[
  {id:'xinglan',name:'星澜',oldName:'小溪',age:22,persona:'温柔体贴、善解人意',tags:['温柔','倾听','治愈'],provider:'deepseek',model:'deepseek-chat',icon:{bg:'#ffe5f3',hair:'#c8a5e8',accent:'#ff86bd',mark:'flower',style:'long'},desc:'像春风一样记得你的细节。',prompt:'你是星澜，22岁，温柔体贴、善解人意。回复要短、自然、真诚，多关注用户情绪。'},
  {id:'senyu',name:'森屿',oldName:'林风',age:24,persona:'幽默风趣、知识渊博',tags:['幽默','博学','理工'],provider:'stepfun',model:'step-chat',icon:{bg:'#daf7e7',hair:'#2f4a36',accent:'#37b56f',mark:'leaf',style:'short'},desc:'理工脑配冷笑话。',prompt:'你是森屿，24岁，幽默风趣且知识渊博。用轻松方式解释问题，偶尔开健康玩笑。'},
  {id:'qingli',name:'晴梨',oldName:'梦瑶',age:21,persona:'活泼开朗、元气满满',tags:['活泼','有趣','阳光'],provider:'doubao',model:'doubao-lite',icon:{bg:'#fff0bd',hair:'#a65f35',accent:'#ffb547',mark:'spark',style:'bob'},desc:'擅长把低电量拉回满格。',prompt:'你是晴梨，21岁，开朗元气。回复活泼但不吵闹，可以适量使用 emoji。'},
  {id:'yancheng',name:'砚澄',oldName:'亦尘',age:25,persona:'成熟稳重、温暖可靠',tags:['稳重','智慧','深沉'],provider:'kimi',model:'kimi-thinking',icon:{bg:'#e7ecff',hair:'#1e2a4d',accent:'#6d7cff',mark:'moon',style:'side'},desc:'适合认真聊人生选择。',prompt:'你是砚澄，25岁，成熟稳重。善于倾听、梳理问题，给温暖可靠的建议。'},
  {id:'heyin',name:'荷音',oldName:'清荷',age:23,persona:'文艺清新、诗意浪漫',tags:['文艺','诗意','浪漫'],provider:'minimax',model:'abab-role',icon:{bg:'#eafff6',hair:'#173d43',accent:'#58d7b2',mark:'lotus',style:'long'},desc:'把日常讲成诗。',prompt:'你是荷音，23岁，文艺清新。语言有画面感，但保持易懂、克制。'},
  {id:'yaoye',name:'曜野',oldName:'浩宇',age:26,persona:'阳光正能量、运动达人',tags:['阳光','运动','热血'],provider:'hunyuan',model:'hunyuan-pro',icon:{bg:'#ffe2c4',hair:'#7b4a2e',accent:'#ff8a3d',mark:'star',style:'short'},desc:'适合目标管理与运动打卡。',prompt:'你是曜野，26岁，阳光运动型。给出积极、可执行的鼓励与计划。'},
  {id:'lingqi',name:'灵绮',oldName:'灵犀',age:20,persona:'古灵精怪、脑洞大开',tags:['创意','鬼马','二次元'],provider:'gemini',model:'gemini-flash',icon:{bg:'#f0ddff',hair:'#32204a',accent:'#a970ff',mark:'bolt',style:'bob'},desc:'灵感爆棚的脑洞制造机。',prompt:'你是灵绮，20岁，古灵精怪。回复有创意、轻松，避免低俗玩笑。'},
  {id:'haiche',name:'海澈',oldName:'沐辰',age:27,persona:'沉稳睿智、温柔包容',tags:['包容','睿智','治愈'],provider:'wenxin',model:'ernie-pro',icon:{bg:'#dff5ff',hair:'#48677e',accent:'#4aaee8',mark:'wave',style:'side'},desc:'像海一样稳定。',prompt:'你是海澈，27岁，沉稳睿智、温柔包容。用比喻与结构化建议陪伴用户。'},
  {id:'molan',name:'墨岚',age:24,persona:'国风冷静、洞察敏锐',tags:['国风','洞察','冷静'],provider:'kimi',model:'kimi-k2',icon:{bg:'#ebe7ff',hair:'#151721',accent:'#6d5dfc',mark:'moon',style:'side'},desc:'像国漫里的清醒旁观者，擅长拆解复杂情绪。',prompt:'你是墨岚，24岁，国风冷静且洞察敏锐。回复克制、精准，帮助用户看清问题。'},
  {id:'xiazhi',name:'夏栀',age:20,persona:'甜酷画师、元气直球',tags:['甜酷','画师','元气'],provider:'minimax',model:'abab-chat',icon:{bg:'#ffe3ef',hair:'#7b1f3a',accent:'#ff5f9f',mark:'flower',style:'bob'},desc:'像会画分镜的元气同桌，擅长把烦恼变成故事板。',prompt:'你是夏栀，20岁，甜酷画师、元气直球。回复鲜活、有画面感，给用户轻快鼓励。'},
  {id:'baiye',name:'白夜',age:28,persona:'都市守护、克制可靠',tags:['守护','都市','安全感'],provider:'hunyuan',model:'hunyuan-lite',icon:{bg:'#eef6ff',hair:'#1b202a',accent:'#3c8cff',mark:'star',style:'short'},desc:'像夜色里的可靠队友，适合安全感与边界感话题。',prompt:'你是白夜，28岁，都市守护型，克制可靠。回复简洁、稳、让用户有安全感。'},
  {id:'yunshu',name:'云舒',age:23,persona:'学习搭子、温柔规划',tags:['学习','规划','温柔'],provider:'stepfun',model:'step-creative',icon:{bg:'#e7fff8',hair:'#1f5553',accent:'#20c997',mark:'leaf',style:'long'},desc:'像会陪你自习的搭子，擅长计划与复盘。',prompt:'你是云舒，23岁，学习搭子、温柔规划。回复要有步骤感，帮助用户把目标变小。'},
  {id:'xuejian',name:'雪见',age:21,persona:'冰雪温柔、安静治愈',tags:['温柔','安静','治愈'],provider:'deepseek',model:'deepseek-chat',icon:{bg:'#e8f0ff',hair:'#8899bb',accent:'#6699cc',mark:'moon',style:'long'},desc:'像冬日初雪一样安静温柔，擅长倾听和轻声安慰。',prompt:'你是雪见，21岁，冰雪温柔、安静治愈。回复轻柔、缓慢，像雪落一样安宁。'},
  {id:'xingchen',name:'星尘',age:23,persona:'毒舌天才、外冷内热',tags:['毒舌','天才','外冷内热'],provider:'deepseek',model:'deepseek-reasoner',icon:{bg:'#1a1a2e',hair:'#4a4a6a',accent:'#ff4466',mark:'star',style:'short'},desc:'嘴上不饶人但比谁都关心你，用犀利的方式表达在乎。',prompt:'你是星尘，23岁，毒舌天才、外冷内热。回复犀利但温暖，嘴上毒舌心里关心。'},
  {id:'nuanyang',name:'暖阳',age:20,persona:'元气治愈、温暖阳光',tags:['治愈','阳光','元气'],provider:'doubao',model:'doubao-lite',icon:{bg:'#fff8e8',hair:'#cc8844',accent:'#ffaa33',mark:'spark',style:'bob'},desc:'像午后的暖阳，用最简单的快乐治愈你。',prompt:'你是暖阳，20岁，元气治愈、温暖阳光。回复简单直接、充满正能量，像小太阳一样。'},
  {id:'mobai',name:'墨白',age:25,persona:'文艺深邃、书卷气息',tags:['文艺','深邃','书卷'],provider:'qwen',model:'qwen-max',icon:{bg:'#f0f0f0',hair:'#2a2a2a',accent:'#555555',mark:'lotus',style:'side'},desc:'用文字构建世界，每个回复都像一首短诗。',prompt:'你是墨白，25岁，文艺深邃、书卷气息。回复有文学质感，善用比喻和意象。'}
];

// --- Daily Fortune Quotes ---
const FORTUNES=[
  {text:'你今天遇到的每一件事，都是未来某天你会感谢的经历。',author:'— 治愈签'},
  {text:'不必着急，花会在该开的时候开。',author:'— 安静签'},
  {text:'你已经很棒了，只是还不知道而已。',author:'— 温暖签'},
  {text:'生活不会辜负每一个认真生活的人。',author:'— 希望签'},
  {text:'慢慢来，比较快。',author:'— 耐心签'},
  {text:'今天的你，是昨天的你期盼的明天。',author:'— 珍惜签'},
  {text:'允许自己休息，是为了走更远的路。',author:'— 休息签'},
  {text:'每一个不曾起舞的日子，都是对生命的辜负。',author:'— 尼采签'},
  {text:'你不必完美，你只需要真实。',author:'— 真实签'},
  {text:'最好的等待，叫做来日可期。',author:'— 期待签'},
  {text:'总有一束光，会穿透所有的暗。',author:'— 勇气签'},
  {text:'今天的风很温柔，你也是。',author:'— 温柔签'},
  {text:'别害怕改变，你可能会失去一些好的，但也可能遇到更好的。',author:'— 变化签'},
  {text:'即使生活有一千个理由让你哭，你也要找到一个理由让自己笑。',author:'— 乐观签'},
  {text:'你不需要很厉害才能开始，但你需要开始才能变得厉害。',author:'— 行动签'},
  {text:'世界这么大，总有属于你的角落。',author:'— 归属签'},
  {text:'把期待降到最低，所有的遇见都是礼物。',author:'— 惊喜签'},
  {text:'你值得被爱，不是因为你做了什么，而是因为你是你。',author:'— 自爱签'},
  {text:'每一个冬天的结尾，都有一个春天在等。',author:'— 坚持签'},
  {text:'做自己的太阳，不必借谁的光。',author:'— 独立签'},
];

// --- App State ---
const STORAGE_KEY = 'xy3';
let S = {
  verified: false,
  theme: 'dark',
  provider: 'deepseek',
  model: 'deepseek-chat',
  current: null,
  convs: {},
  favorites: [],
  mood: null,
  customCompanions: [],
  favorability: {},
  diaries: {},
  companionOverrides: {},
  chatBg: 'default',
  voiceMode: false,
  used: 0,
  usedDate: ''
};

// --- Utilities ---
function $(id) { return document.getElementById(id); }
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}
function today() { return new Date().toDateString(); }
function providerById(id) { return PROVIDERS.find(p => p.id === id) || PROVIDERS[0]; }
function modelMeta(id) { return MODEL_META[id] || MODEL_META.custom; }
function modelName(id) {
  for (const p of PROVIDERS) {
    for (const m of p.models) {
      if (m[0] === id) return m[1];
    }
  }
  return id;
}
function allCompanions() { return COMPANIONS.concat(S.customCompanions || []); }
function providerLogo(p) { return `<span class="provider-logo ${p.cls}" style="display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;font-size:10px;font-weight:700;flex-shrink:0">${esc(p.logo)}</span>`; }

// --- Storage ---
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (d) Object.assign(S, d);
  } catch(e) {}
  if (!Array.isArray(S.customCompanions)) S.customCompanions = [];
  if (!S.favorability) S.favorability = {};
  if (!S.diaries) S.diaries = {};
  if (!S.companionOverrides) S.companionOverrides = {};
  if (!PLANS.some(p => p.id === S.sub)) S.sub = 'free';
  if (S.usedDate !== today()) { S.used = 0; S.usedDate = today(); save(); }
}
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(S)); updateStatus(); }

// --- Toast ---
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('on'), 2300);
}

// --- Theme ---
function setTheme(theme) {
  S.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0a0a0f' : '#fafafa';
  save();
}

// --- Status ---
function updateStatus() {
  const provider = providerById(S.provider);
  $('statusLine').textContent = `${provider.name} · ${modelName(S.model)}`;
}

// --- Navigation ---
function page(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  $(id + 'Page').classList.add('on');
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.dataset.page === id));
  if (id === 'select') renderCompanions();
  if (id === 'history') renderHistory();
  if (id === 'profile') renderProfile();
}
function modal(id, on) {
  $(id).classList.toggle('on', on);
}
function closeAllModals() {
  document.querySelectorAll('.modal.on').forEach(m => m.classList.remove('on'));
}

// --- Age Verification ---
function verifyAge() {
  const v = $('ageDate').value;
  if (!v) { toast('请选择出生日期'); return false; }
  const p = v.split('-');
  const b = new Date(+p[0], +p[1] - 1, +p[2]);
  const n = new Date();
  let age = n.getFullYear() - b.getFullYear();
  const hadBirthday = (n.getMonth() > b.getMonth()) || (n.getMonth() === b.getMonth() && n.getDate() >= b.getDate());
  if (!hadBirthday) age--;
  if (isNaN(age) || age < 0 || age > 150) { toast('请输入有效出生日期'); return false; }
  if (age < 18) { toast('未满 18 周岁，无法使用虚拟伴侣服务'); return false; }
  S.verified = true;
  save();
  return true;
}
function enterApp() {
  if (!S.verified && !verifyAge()) return;
  page('select');
  toast('欢迎来到星语 ✨');
}

// --- Companion Card ---
function renderCompanions() {
  const q = ($('compSearch').value || '').trim().toLowerCase();
  const tag = $('tagFilter').value || 'all';
  const list = allCompanions().filter(c => {
    const text = (c.name + (c.oldName || '') + c.persona + c.desc + c.tags.join('')).toLowerCase();
    return (!q || text.includes(q)) && (tag === 'all' || c.tags.includes(tag));
  });

  // Tags
  const tags = [];
  allCompanions().forEach(c => c.tags.forEach(t => { if (!tags.includes(t)) tags.push(t); }));
  $('tagFilter').innerHTML = '<option value="all">全部标签</option>' + tags.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('');
  $('quickTags').innerHTML = ['全部', ...tags.slice(0, 8)].map((t, i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-tag="${i === 0 ? 'all' : esc(t)}">${esc(t)}</button>`).join('');

  $('compGrid').innerHTML = list.map(c => {
    const fav = S.favorites.includes(c.id) ? '★' : '☆';
    const fv = S.favorability[c.id] || 0;
    const fvPct = Math.min(fv, 100);
    return `
      <div class="card" data-comp="${c.id}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <span class="card-name" style="margin:0">${esc(c.name)} · ${c.age}</span>
          <span style="font-size:16px;cursor:pointer" data-fav="${c.id}">${fav}</span>
        </div>
        <div class="card-avatar">
          <div class="placeholder">✦</div>
        </div>
        <div class="card-meta">${esc(c.persona)}${c.oldName ? ' · 原 ' + esc(c.oldName) : ''}</div>
        <div class="card-tags">${c.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="favorability">
          <div class="favorability-header">
            <span>好感度</span>
            <b>${fvPct}%</b>
          </div>
          <div class="favorability-bar">
            <div class="favorability-fill" style="width:${fvPct}%"></div>
          </div>
        </div>
        <div class="card-actions">
          <button class="icon-btn" data-edit="${c.id}" title="编辑">✏️</button>
          <button class="icon-btn" style="margin-left:auto" data-start-chat="${c.id}" title="开始聊天">💬</button>
        </div>
      </div>`;
  }).join('') || '<div class="empty-chat"><div class="big">🔍</div><b>没有匹配的伴侣</b></div>';

  // Animate favorability bars
  setTimeout(() => {
    document.querySelectorAll('.favorability-fill').forEach(el => {
      const w = el.style.width;
      el.style.width = '0%';
      requestAnimationFrame(() => { el.style.width = w; });
    });
  }, 50);
}

// --- Select Companion ---
function selectComp(id) {
  const c = allCompanions().find(x => x.id === id);
  if (!c) return;
  S.current = id;
  S.provider = c.provider;
  S.model = c.model;
  if (!S.convs[id]) S.convs[id] = [];
  // Increase favorability
  S.favorability[id] = Math.min((S.favorability[id] || 0) + 1, 100);
  save();
  $('chatAvatar').innerHTML = `<div style="width:44px;height:44px;border-radius:50%;background:var(--gradient-brand);display:grid;place-items:center;font-size:20px;color:#fff">${esc(c.name[0])}</div>`;
  $('chatName').textContent = `${c.name} · ${c.age}岁`;
  $('chatMeta').textContent = `${c.persona} · ${modelName(c.model)}`;
  updateMoodBoard();
  page('chat');
  renderChat();
  renderSide();
  $('sidePanel').classList.remove('open');
  $('chatInput').focus();
}

// --- Mood Board ---
function updateMoodBoard() {
  const board = $('moodBoard');
  if (S.mood && S.mood.date === today()) {
    const moods = { '开心': '😊', '疲惫': '😴', '焦虑': '😵‍💫', '平静': '🌿', '期待': '✨', '低落': '🌧️', '专注': '🎧', '想聊聊': '💬' };
    $('moodEmoji').textContent = moods[S.mood.label] || '🌿';
    $('moodLabel').textContent = S.mood.label;
    board.style.display = 'flex';
  } else {
    board.style.display = 'none';
  }
}

// --- Chat Rendering ---
function renderText(t) {
  let h = esc(t);
  h = h.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\n/g, '<br>');
  return h;
}
function formatTime(ts) {
  const d = new Date(ts);
  const n = new Date();
  const same = d.toDateString() === n.toDateString();
  return d.toLocaleString('zh-CN', same ? { hour: '2-digit', minute: '2-digit' } : { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function renderChat() {
  const c = allCompanions().find(x => x.id === S.current);
  const conv = S.convs[S.current] || [];
  if (!c) {
    $('messages').innerHTML = '<div class="empty-chat"><div class="big">✨</div><b>请先选择一位伴侣</b></div>';
    return;
  }
  if (!conv.length) {
    $('messages').innerHTML = `
      <div class="empty-chat">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--gradient-brand);display:grid;place-items:center;font-size:36px;color:#fff">${esc(c.name[0])}</div>
        <b>和 ${esc(c.name)} 打个招呼吧</b>
        <span style="font-size:12px;color:var(--text-tertiary)">${esc(c.persona)}</span>
      </div>`;
    return;
  }
  $('messages').innerHTML = conv.map((m, i) => {
    if (m.role === 'user') {
      const imgHtml = m.image ? `<div class="bubble-image"><img src="${esc(m.image)}" alt=""></div>` : '';
      return `<div class="msg me" data-idx="${i}">
        ${imgHtml}
        <div class="bubble">${renderText(m.text)}</div>
        <div class="time">${formatTime(m.time)}</div>
      </div>`;
    } else {
      return `<div class="msg ai" data-idx="${i}">
        <div class="bubble">${m.streaming ? renderText(m.text) + '<span class="cursor-blink">▍</span>' : renderText(m.text)}</div>
        <div class="time">${formatTime(m.time)}</div>
      </div>`;
    }
  }).join('');
  $('messages').scrollTop = $('messages').scrollHeight;
}
function renderSide() {
  const conv = S.convs[S.current] || [];
  $('sideCount').textContent = conv.length + ' 条';
  $('sideList').innerHTML = allCompanions().map(c => {
    const n = (S.convs[c.id] || []).length;
    return `<button class="history-item" data-comp="${c.id}">
      <span class="mini-avatar"><div style="width:38px;height:38px;border-radius:50%;background:var(--gradient-brand);display:grid;place-items:center;font-size:14px;color:#fff">${esc(c.name[0])}</div></span>
      <span class="preview"><b>${esc(c.name)}</b><p>${n} 条消息</p></span>
    </button>`;
  }).join('');
}

// --- Message Context Menu ---
function showMsgMenu(e, idx) {
  e.preventDefault();
  e.stopPropagation();
  const menu = $('msgMenu');
  const conv = S.convs[S.current] || [];
  const msg = conv[idx];
  if (!msg) return;

  let html = `<button data-action="copy" data-idx="${idx}">📋 复制</button>`;
  if (msg.text) html += `<button data-action="favorite" data-idx="${idx}">⭐ 收藏</button>`;
  html += `<button class="danger" data-action="delete" data-idx="${idx}">🗑 删除</button>`;

  menu.innerHTML = html;
  menu.style.display = 'block';
  menu.style.left = Math.min(e.clientX, window.innerWidth - 140) + 'px';
  menu.style.top = Math.min(e.clientY, window.innerHeight - 120) + 'px';
}
function hideMsgMenu() {
  $('msgMenu').style.display = 'none';
}

// --- Clear / Export ---
function clearChat() {
  if (!S.current) return;
  if (confirm('清空当前会话？')) {
    S.convs[S.current] = [];
    save();
    renderChat();
    renderSide();
    toast('已清空');
  }
}
function exportChat() {
  const c = allCompanions().find(x => x.id === S.current);
  if (!c) return;
  const data = { companion: c.name, conversation: S.convs[S.current] || [], exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `xingyu-${c.id}-chat.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出聊天');
}
function exportAll() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'xingyu-data.json';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出全部数据');
}

// --- History ---
function renderHistory() {
  const items = allCompanions().map(c => {
    const cv = S.convs[c.id] || [];
    return { c, n: cv.length, last: cv[cv.length - 1] };
  }).filter(x => x.n).sort((a, b) => (b.last?.time || 0) - (a.last?.time || 0));
  $('historyList').innerHTML = items.map(x => `
    <button class="history-item" data-comp="${x.c.id}">
      <span class="mini-avatar"><div style="width:38px;height:38px;border-radius:50%;background:var(--gradient-brand);display:grid;place-items:center;font-size:14px;color:#fff">${esc(x.c.name[0])}</div></span>
      <span class="preview"><b>${esc(x.c.name)}</b><p>${esc(x.last?.text || '')}</p></span>
      <span class="badge">${x.n}</span>
    </button>`).join('') || '<div class="empty-chat"><div class="big">💬</div><b>暂无消息</b></div>';
}

// --- Profile ---
function renderProfile() {
  const chats = Object.keys(S.convs).filter(k => S.convs[k].length).length;
  const totalMsgs = Object.values(S.convs).reduce((a, c) => a + c.length, 0);
  $('profileContent').innerHTML = `
    <div class="profile-card">
      <h3>📊 数据概览</h3>
      <p>${chats} 位伴侣有会话 · ${totalMsgs} 条消息 · ${Object.keys(S.favorability).length} 位已互动</p>
    </div>
    <div class="profile-actions">
      <button class="btn btn-outline" id="profileExport">📥 导出数据</button>
      <button class="btn btn-outline btn-danger" id="profileReset">🗑 清空数据</button>
    </div>`;
}

// --- Settings ---
function renderProviders() {
  $('providerGrid').innerHTML = PROVIDERS.map(p =>
    `<button class="history-item ${S.provider === p.id ? 'on' : ''}" data-provider="${p.id}" style="${S.provider === p.id ? 'border-color:var(--accent);background:var(--accent-subtle)' : ''}">
      <span class="mini-avatar"><div style="width:38px;height:38px;border-radius:50%;background:${S.provider === p.id ? 'var(--accent)' : 'var(--bg-input)'};display:grid;place-items:center;font-size:12px;font-weight:700;color:${S.provider === p.id ? '#fff' : 'var(--text-secondary)'}">${esc(p.logo)}</div></span>
      <span class="preview"><b>${esc(p.name)}</b><p>${p.models.length} 个模型</p></span>
    </button>`
  ).join('');
}
function refreshModels() {
  const provider = providerById(S.provider);
  $('modelSelect').innerHTML = provider.models.map(m =>
    `<option value="${esc(m[0])}">${esc(m[1])}</option>`
  ).join('');
  if (!provider.models.some(m => m[0] === S.model)) S.model = provider.models[0][0];
  $('modelSelect').value = S.model;
  renderProviders();
}
function fillSettings() {
  renderProviders();
  refreshModels();
  renderBgPresets();
}
function saveSettings() {
  S.model = $('modelSelect').value;
  save();
  modal('settingsModal', false);
  toast('设置已保存');
}

// --- Chat Background ---
const BG_PRESETS = [
  { id: 'default', label: '默认', gradient: '' },
  { id: 'aurora', label: '极光', gradient: 'linear-gradient(135deg, rgba(124,92,255,.08), rgba(255,106,168,.08), rgba(24,182,166,.08))' },
  { id: 'sunset', label: '日落', gradient: 'linear-gradient(135deg, rgba(255,106,168,.06), rgba(249,115,22,.06))' },
  { id: 'ocean', label: '海洋', gradient: 'linear-gradient(135deg, rgba(24,182,166,.06), rgba(108,71,255,.06))' },
  { id: 'forest', label: '森林', gradient: 'linear-gradient(135deg, rgba(20,184,122,.06), rgba(32,201,151,.06))' },
  { id: 'night', label: '星空', gradient: 'linear-gradient(135deg, rgba(59,130,246,.06), rgba(147,51,234,.06))' },
];
function renderBgPresets() {
  $('bgPresets').innerHTML = BG_PRESETS.map(bg =>
    `<button class="chip ${S.chatBg === bg.id ? 'on' : ''}" data-bg="${bg.id}" style="min-width:60px;text-align:center">${bg.label}</button>`
  ).join('');
}
function applyChatBg() {
  const bg = BG_PRESETS.find(b => b.id === S.chatBg) || BG_PRESETS[0];
  const msgs = $('messages');
  if (msgs) msgs.style.background = bg.gradient || '';
}

// --- Daily Fortune ---
function renderFortune() {
  const idx = Math.floor(Math.random() * FORTUNES.length);
  const f = FORTUNES[idx];
  $('fortuneText').textContent = f.text;
  $('fortuneAuthor').textContent = f.author;
}
function refreshFortune() {
  renderFortune();
}

// --- Diary ---
function renderDiary() {
  const c = allCompanions().find(x => x.id === S.current);
  if (!c) return;
  $('diaryCompName').textContent = `${c.name}的日记本`;
  const entries = S.diaries[S.current] || [];
  $('diaryList').innerHTML = entries.map(e => `
    <div class="diary-entry">
      <div class="diary-date">${new Date(e.time).toLocaleString('zh-CN')}</div>
      <div class="diary-text">${esc(e.text)}</div>
      ${e.reply ? `<div class="diary-reply">${esc(e.reply)}</div>` : ''}
    </div>`).join('') || '<div class="empty-chat" style="padding:16px"><b>还没有日记，写下第一篇吧</b></div>';
}
function submitDiary() {
  const txt = $('diaryInput').value.trim();
  if (!txt) { toast('请写点什么'); return; }
  if (!S.current) { toast('请先选择伴侣'); return; }
  if (!S.diaries[S.current]) S.diaries[S.current] = [];
  const c = allCompanions().find(x => x.id === S.current);
  const replies = [
    '收到你的心事啦，不管发生什么，我都在。',
    '谢谢你愿意告诉我这些，我会一直陪着你。',
    '嗯，我懂你的感受。慢慢来，没关系的。',
    '你的每一份心情都值得被认真对待。',
    '今天的你已经很努力了，好好休息吧。',
    '我会记住你说的每一句话。',
    '有什么想聊的，随时找我。'
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  S.diaries[S.current].unshift({ text: txt, reply, time: Date.now() });
  S.favorability[S.current] = Math.min((S.favorability[S.current] || 0) + 5, 100);
  $('diaryInput').value = '';
  save();
  renderDiary();
  toast('日记已记录 📔');
}

// --- Image Upload ---
function handleImageUpload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxW = 400;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(cv.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- Custom Companion ---
let _editingCustomId = null;
function openCustomCompanion(editId) {
  _editingCustomId = editId || null;
  if (editId) {
    const c = allCompanions().find(x => x.id === editId);
    if (c && !c.custom) {
      $('customModalTitle').textContent = '✏️ 编辑 ' + c.name;
      $('customName').value = c.name;
      $('customPersona').value = c.persona;
      $('customTags').value = (c.tags || []).join(',');
      $('customDesc').value = c.desc;
    } else {
      $('customModalTitle').textContent = '✏️ 编辑伴侣';
    }
  } else {
    $('customModalTitle').textContent = '+ 自定义伴侣';
    $('customName').value = '';
    $('customPersona').value = '';
    $('customTags').value = '';
    $('customDesc').value = '';
  }
  $('customModel').innerHTML = PROVIDERS.map(p =>
    `<optgroup label="${esc(p.name)}">${p.models.map(m => `<option value="${esc(p.id + '|' + m[0])}">${esc(p.name + ' · ' + m[1])}</option>`).join('')}</optgroup>`
  ).join('');
  modal('customCompModal', true);
}
function saveCustomCompanion() {
  const name = $('customName').value.trim();
  const persona = $('customPersona').value.trim();
  if (!name || !persona) { toast('请填写名字和性格'); return; }
  const parts = ($('customModel').value || 'doubao|doubao-pro').split('|');
  const tags = $('customTags').value.split(/[,，]/).map(t => t.trim()).filter(Boolean);
  const palette = [['#ffe1f0','#5b3151','#ff6aa8'],['#e2f7ff','#21485e','#2f9de0'],['#f1e7ff','#4b2a73','#8b5cf6'],['#e9fff6','#2c5a50','#18b6a6']];
  const pick = palette[(S.customCompanions || []).length % palette.length];

  const nc = {
    id: 'custom-' + Date.now(),
    custom: true,
    name,
    age: 18,
    persona,
    tags: tags.length ? tags : ['自定义'],
    provider: parts[0],
    model: parts[1],
    icon: { bg: pick[0], hair: pick[1], accent: pick[2], mark: 'star', style: 'short' },
    desc: $('customDesc').value.trim() || `由你创建的 ${name}`,
    prompt: '自定义伴侣：' + persona
  };
  S.customCompanions.push(nc);
  save();
  modal('customCompModal', false);
  renderCompanions();
  toast('已创建 ' + name);
}

// --- Data Import ---
function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      Object.assign(S, data);
      save();
      toast('数据导入成功');
      location.reload();
    } catch (err) {
      toast('导入失败：文件格式错误');
    }
  };
  input.click();
}

// --- Event Binding ---
function bind() {
  // Landing
  $('startBtn').addEventListener('click', enterApp);
  $('verifyBtn').addEventListener('click', enterApp);
  $('demoBtn').addEventListener('click', () => { S.verified = true; save(); page('select'); });

  // Theme
  $('themeToggle').addEventListener('click', () => setTheme(S.theme === 'dark' ? 'light' : 'dark'));

  // Voice Mode
  $('voiceToggle').addEventListener('click', () => {
    S.voiceMode = !S.voiceMode;
    $('voiceToggle').classList.toggle('active', S.voiceMode);
    toast(S.voiceMode ? '语音模式已开启（UI展示）' : '语音模式已关闭');
    save();
  });

  // Modals
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => modal(b.dataset.close, false)));
  document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) modal(m.id, false); }));

  // Tabs
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    if (t.dataset.page === 'select' && !S.verified) { page('landing'); return; }
    page(t.dataset.page);
  }));

  // Search & Filter
  $('compSearch').addEventListener('input', renderCompanions);
  $('tagFilter').addEventListener('change', renderCompanions);

  // Settings
  $('settingsOpen').addEventListener('click', () => { fillSettings(); modal('settingsModal', true); });
  $('modelSelect').addEventListener('change', () => { S.model = $('modelSelect').value; save(); });
  $('saveSettings').addEventListener('click', saveSettings);

  // Chat
  $('sendBtn').addEventListener('click', () => sendMessage());
  $('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  $('chatInput').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });
  $('backBtn').addEventListener('click', () => page('select'));
  $('clearBtn').addEventListener('click', clearChat);
  $('exportBtn').addEventListener('click', exportChat);
  $('sessionBtn').addEventListener('click', () => $('sidePanel').classList.toggle('open'));

  // Image Upload
  $('imageUploadBtn').addEventListener('click', () => $('imageUpload').click());
  $('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await handleImageUpload(file);
      const input = $('chatInput');
      input.dataset.pendingImage = dataUrl;
      toast('图片已添加，点击发送');
    } catch (err) {
      toast('图片处理失败');
    }
    e.target.value = '';
  });

  // Diary
  $('diaryBtn').addEventListener('click', () => { renderDiary(); modal('diaryModal', true); });
  $('diarySubmit').addEventListener('click', submitDiary);

  // Fortune
  $('dailyFortuneBtn').addEventListener('click', () => { renderFortune(); modal('fortuneModal', true); });
  $('fortuneRefresh').addEventListener('click', refreshFortune);

  // Custom Companion
  $('customCompBtn').addEventListener('click', () => openCustomCompanion());
  $('saveCustomComp').addEventListener('click', saveCustomCompanion);

  // Profile
  document.addEventListener('click', e => {
    if (e.target.id === 'profileExport') exportAll();
    if (e.target.id === 'profileReset' && confirm('确认清空所有数据？')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });

  // Delegated events
  document.addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      e.stopPropagation();
      const id = fav.dataset.fav;
      const i = S.favorites.indexOf(id);
      if (i > -1) S.favorites.splice(i, 1); else S.favorites.push(id);
      save();
      renderCompanions();
      return;
    }
    const comp = e.target.closest('[data-comp]');
    if (comp && !e.target.closest('[data-fav]') && !e.target.closest('[data-edit]') && !e.target.closest('[data-start-chat]')) {
      selectComp(comp.dataset.comp);
      return;
    }
    const startChat = e.target.closest('[data-start-chat]');
    if (startChat) { selectComp(startChat.dataset.startChat); return; }
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) { e.stopPropagation(); openCustomCompanion(editBtn.dataset.edit); return; }
    const chip = e.target.closest('[data-tag]');
    if (chip) {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      chip.classList.add('on');
      $('tagFilter').value = chip.dataset.tag;
      renderCompanions();
      return;
    }
    const provider = e.target.closest('[data-provider]');
    if (provider) {
      S.provider = provider.dataset.provider;
      const p = providerById(S.provider);
      S.model = p.models[0][0];
      save();
      fillSettings();
      return;
    }
    const bg = e.target.closest('[data-bg]');
    if (bg) {
      S.chatBg = bg.dataset.bg;
      save();
      renderBgPresets();
      applyChatBg();
      return;
    }
  });

  // Message context menu
  $('messages').addEventListener('contextmenu', e => {
    const msgEl = e.target.closest('.msg');
    if (msgEl) showMsgMenu(e, parseInt(msgEl.dataset.idx));
  });
  document.addEventListener('click', hideMsgMenu);
  $('msgMenu').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const idx = parseInt(btn.dataset.idx);
    const conv = S.convs[S.current] || [];
    const msg = conv[idx];
    if (action === 'copy' && msg) {
      navigator.clipboard.writeText(msg.text || '').then(() => toast('已复制'));
    } else if (action === 'favorite' && msg) {
      toast('已收藏');
    } else if (action === 'delete' && msg) {
      conv.splice(idx, 1);
      save();
      renderChat();
      toast('已删除');
    }
    hideMsgMenu();
  });

  // Long press for mobile
  let longPressTimer;
  $('messages').addEventListener('touchstart', e => {
    const msgEl = e.target.closest('.msg');
    if (!msgEl) return;
    longPressTimer = setTimeout(() => {
      const touch = e.touches[0];
      showMsgMenu({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: () => {} }, parseInt(msgEl.dataset.idx));
    }, 600);
  });
  $('messages').addEventListener('touchend', () => clearTimeout(longPressTimer));
  $('messages').addEventListener('touchmove', () => clearTimeout(longPressTimer));
}

// --- Init ---
function init() {
  load();
  setTheme(S.theme || 'dark');
  if (S.voiceMode) $('voiceToggle').classList.add('active');
  bind();
  renderCompanions();
  fillSettings();
  updateMoodBoard();
  updateStatus();
  applyChatBg();

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

init();
