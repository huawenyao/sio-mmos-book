// ====== SIO-MMOS Reader ======

// 章节映射数据
const chapterMapping = {
  1: [
    { id: 'ch1-2', file: '../SSIO-BOOK/02正文 第一卷 第1-2章 系统存在论与生成论.md', title: '系统存在论与生成论', chapters: ['第1章', '第2章'] },
    { id: 'ch1-5', file: '../SSIO-BOOK/02正文 第一卷 第1-5章 复杂系统哲学原理完整版.md', title: '复杂系统哲学原理完整版', chapters: ['第1-5章'] },
    { id: 'ch3', file: '../SSIO-BOOK/02正文 第一卷 第3章 认知结构——从表征到具身.md', title: '认知结构——从表征到具身', chapters: ['第3章'] },
    { id: 'ch4', file: '../SSIO-BOOK/02正文 第一卷 第4章 时间性与过程——从静态存在到动态生成.md', title: '时间性与过程', chapters: ['第4章'] },
    { id: 'ch5', file: '../SSIO-BOOK/02正文 第一卷 第5章 价值与规范——复杂系统的伦理维度.md', title: '价值与规范', chapters: ['第5章'] }
  ],
  2: [
    { id: 'ch6-10', file: '../SSIO-BOOK/02正文 第二卷 第6-10章 复杂性科学研究方法论完整版.md', title: '复杂性科学研究方法论', chapters: ['第6-10章'] },
    { id: 'ch7', file: '../SSIO-BOOK/02正文 第二卷 第7章 网络科学方法——复杂网络的结构与动力学.md', title: '网络科学方法', chapters: ['第7章'] },
    { id: 'ch8', file: '../SSIO-BOOK/02正文 第二卷 第8章 计算社会科学——基于代理的建模与仿真.md', title: '计算社会科学', chapters: ['第8章'] },
    { id: 'ch9', file: '../SSIO-BOOK/02正文 第二卷 第9章 复杂性度量——从信息论到统计物理的测度.md', title: '复杂性度量', chapters: ['第9章'] },
    { id: 'ch10', file: '../SSIO-BOOK/02正文 第二卷 第10章 跨学科整合——从多学科到超学科的研究设计.md', title: '跨学科整合', chapters: ['第10章'] }
  ],
  3: [
    { id: 'ch11', file: '../SSIO-BOOK/03正文 第三卷 第11章 多智能体系统11.2-11.5节.md', title: '多智能体系统', chapters: ['第11章'] },
    { id: 'ch12', file: '../SSIO-BOOK/03正文 第三卷 第12章 社会模拟与数字孪生.md', title: '社会模拟与数字孪生', chapters: ['第12章'] },
    { id: 'ch13-14', file: '../SSIO-BOOK/03正文 第三卷 第13-14章 认知架构与人机协同.md', title: '认知架构与人机协同', chapters: ['第13章', '第14章'] }
  ],
  4: [
    { id: 'app-a-e', file: '../SSIO-BOOK/02正文 实践指南 附录A-E SIO-MMOS工具箱核心章节.md', title: 'SIO-MMOS工具箱', chapters: ['附录A-E'] },
    { id: 'app-b', file: '../SSIO-BOOK/03附录 实践指南 附录B 研究设计检查清单.md', title: '研究设计检查清单', chapters: ['附录B'] },
    { id: 'app-c', file: '../SSIO-BOOK/03附录 实践指南 附录C 工程实施指南.md', title: '工程实施指南', chapters: ['附录C'] },
    { id: 'app-d', file: '../SSIO-BOOK/03附录 实践指南 附录D 案例研究库.md', title: '案例研究库', chapters: ['附录D'] }
  ]
};

// 全局状态
let currentVolume = 1;
let currentChapterIndex = 0;
let fontSize = 18;
let theme = 'light';
let bookmarks = JSON.parse(localStorage.getItem('sio-bookmarks') || '[]');

// DOM元素
const sidebar = document.getElementById('sidebar');
const tocContainer = document.getElementById('toc');
const readerContent = document.getElementById('readerContent');
const currentChapterEl = document.getElementById('currentChapter');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const floatTools = document.getElementById('floatTools');
const bookmarkPanel = document.getElementById('bookmarkPanel');
const bookmarkList = document.getElementById('bookmarkList');

// 初始化
document.addEventListener('DOMContentLoaded', init);

function init() {
  loadSettings();
  renderTOC();
  bindEvents();
  
  // 从URL参数获取章节
  const params = new URLSearchParams(window.location.search);
  const vol = params.get('vol');
  const ch = params.get('ch');
  
  if (vol && ch) {
    loadChapter(parseInt(vol), findChapterIndex(parseInt(vol), ch));
  } else {
    loadChapter(1, 0);
  }
  
  // 检查移动端
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
}

function loadSettings() {
  const savedFontSize = localStorage.getItem('sio-font-size');
  const savedTheme = localStorage.getItem('sio-theme');
  
  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
  }
  
  if (savedTheme) {
    theme = savedTheme;
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function renderTOC() {
  const volumes = [
    { num: 1, title: '第一卷', subtitle: '复杂系统哲学原理' },
    { num: 2, title: '第二卷', subtitle: '复杂性科学研究方法论' },
    { num: 3, title: '第三卷', subtitle: '智能社会生态工程实践' },
    { num: 4, title: '实践指南', subtitle: 'SIO-MMOS工具箱' }
  ];
  
  // 绑定卷选择器
  document.querySelectorAll('.vol-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const vol = parseInt(btn.dataset.vol);
      switchVolume(vol);
    });
  });
  
  switchVolume(1);
}

function switchVolume(vol) {
  currentVolume = vol;
  
  // 更新按钮状态
  document.querySelectorAll('.vol-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.vol) === vol);
  });
  
  // 渲染目录
  const chapters = chapterMapping[vol] || [];
  tocContainer.innerHTML = chapters.map((ch, idx) => `
    <div class="toc-item" data-vol="${vol}" data-idx="${idx}">
      <span class="ch-num">${ch.chapters.join(' · ')}</span>
      ${ch.title}
    </div>
  `).join('');
  
  // 绑定目录点击
  document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', () => {
      const v = parseInt(item.dataset.vol);
      const i = parseInt(item.dataset.idx);
      loadChapter(v, i);
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });
}

function findChapterIndex(vol, chId) {
  const chapters = chapterMapping[vol] || [];
  return chapters.findIndex(ch => ch.id === chId) || 0;
}

async function loadChapter(vol, idx) {
  const chapters = chapterMapping[vol] || [];
  const chapter = chapters[idx];
  if (!chapter) return;
  
  currentVolume = vol;
  currentChapterIndex = idx;
  
  // 更新URL
  history.pushState(null, '', `?vol=${vol}&ch=${chapter.id}`);
  
  // 更新标题
  currentChapterEl.textContent = chapter.title;
  
  // 更新目录高亮
  document.querySelectorAll('.toc-item').forEach(item => {
    item.classList.toggle('active', 
      parseInt(item.dataset.vol) === vol && parseInt(item.dataset.idx) === idx
    );
  });
  
  // 显示加载状态
  readerContent.innerHTML = '<div class="loading-placeholder"><div class="loading-spinner"></div><p>正在加载内容...</p></div>';
  
  try {
    const response = await fetch(chapter.file);
    if (!response.ok) throw new Error('加载失败');
    const md = await response.text();
    readerContent.innerHTML = marked.parse(md);
    
    // 更新进度
    updateProgress();
    
    // 更新导航按钮
    updateNavButtons(vol, idx);
    
    // 滚动到顶部
    window.scrollTo(0, 0);
  } catch (err) {
    readerContent.innerHTML = `<div class="error"><p>内容加载失败，请稍后重试</p><p style="font-size:0.8em;color:var(--text-muted)">${err.message}</p></div>`;
  }
}

function updateNavButtons(vol, idx) {
  const chapters = chapterMapping[vol] || [];
  const prevBtn = document.getElementById('prevChapter');
  const nextBtn = document.getElementById('nextChapter');
  const prevTitle = document.getElementById('prevTitle');
  const nextTitle = document.getElementById('nextTitle');
  
  if (idx > 0) {
    prevBtn.style.display = 'flex';
    prevTitle.textContent = chapters[idx - 1].title;
  } else {
    prevBtn.style.display = 'none';
  }
  
  if (idx < chapters.length - 1) {
    nextBtn.style.display = 'flex';
    nextTitle.textContent = chapters[idx + 1].title;
  } else {
    nextBtn.style.display = 'none';
  }
}

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  
  progressFill.style.width = progress + '%';
  progressPercent.textContent = progress + '%';
}

function bindEvents() {
  // 目录切换
  document.getElementById('tocToggle').addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('open');
    } else {
      sidebar.classList.toggle('collapsed');
      document.querySelector('.reader-main').classList.toggle('expanded');
    }
  });
  
  // 字体调整
  document.getElementById('fontUp').addEventListener('click', () => {
    if (fontSize < 24) {
      fontSize += 2;
      document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
      localStorage.setItem('sio-font-size', fontSize);
    }
  });
  
  document.getElementById('fontDown').addEventListener('click', () => {
    if (fontSize > 14) {
      fontSize -= 2;
      document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
      localStorage.setItem('sio-font-size', fontSize);
    }
  });
  
  // 主题切换
  document.getElementById('themeToggle').addEventListener('click', () => {
    const themes = ['light', 'dark', 'sepia'];
    const current = themes.indexOf(theme);
    theme = themes[(current + 1) % themes.length];
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sio-theme', theme);
  });
  
  // 章节导航
  document.getElementById('prevChapter').addEventListener('click', () => {
    if (currentChapterIndex > 0) {
      loadChapter(currentVolume, currentChapterIndex - 1);
    }
  });
  
  document.getElementById('nextChapter').addEventListener('click', () => {
    const chapters = chapterMapping[currentVolume] || [];
    if (currentChapterIndex < chapters.length - 1) {
      loadChapter(currentVolume, currentChapterIndex + 1);
    }
  });
  
  // 滚动事件
  window.addEventListener('scroll', () => {
    updateProgress();
    
    // 显示/隐藏浮动工具栏
    if (window.scrollY > 300) {
      floatTools.classList.add('visible');
    } else {
      floatTools.classList.remove('visible');
    }
  });
  
  // 书签功能
  document.getElementById('bookmarkBtn').addEventListener('click', () => {
    const sel = window.getSelection().toString().trim();
    if (sel) {
      addBookmark(sel);
    }
  });
  
  document.getElementById('closeBookmark').addEventListener('click', () => {
    bookmarkPanel.classList.remove('open');
  });
  
  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      document.getElementById('prevChapter').click();
    } else if (e.key === 'ArrowRight') {
      document.getElementById('nextChapter').click();
    } else if (e.key === 't') {
      document.getElementById('tocToggle').click();
    }
  });
}

function addBookmark(text) {
  const bookmark = {
    id: Date.now(),
    vol: currentVolume,
    ch: currentChapterIndex,
    text: text.substring(0, 100),
    chapter: document.getElementById('currentChapter').textContent,
    date: new Date().toLocaleDateString()
  };
  
  bookmarks.unshift(bookmark);
  if (bookmarks.length > 50) bookmarks.pop();
  
  localStorage.setItem('sio-bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
  
  // 显示书签面板
  bookmarkPanel.classList.add('open');
}

function renderBookmarks() {
  bookmarkList.innerHTML = bookmarks.map(bm => `
    <li class="bookmark-item" data-vol="${bm.vol}" data-idx="${bm.ch}">
      <div class="bm-chapter">${bm.chapter}</div>
      <div class="bm-text">${bm.text}</div>
      <div class="bm-date">${bm.date}</div>
    </li>
  `).join('');
  
  document.querySelectorAll('.bookmark-item').forEach(item => {
    item.addEventListener('click', () => {
      loadChapter(parseInt(item.dataset.vol), parseInt(item.dataset.idx));
      bookmarkPanel.classList.remove('open');
    });
  });
}
