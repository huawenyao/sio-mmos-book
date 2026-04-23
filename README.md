# SIO-MMOS丛书

> **"给 AI 以哲学根基，给认知以系统框架"**
> 
> —— SIO-MMOS，大模型时代的本体论觉醒

## 简介

**SIO-MMOS = System Integration Ontology - Multi-dimensional Meta-Operational System**

本丛书旨在构建一套从哲学基础研究到工程实践落地的完整认知-行动体系，把握【复杂系统哲学原理到智能社会生态的认知实践】这一核心命题。

### 与 AI/LLM 的关系

在大型语言模型（LLM）和生成式 AI 快速发展的今天，SIO-MMOS 提供了一套独特的哲学和方法论框架：

- **本体论觉醒**：AI 需要理解世界的基本结构，SIO 三元结构（主体-互动-客体）为 AI 认知提供了坚实的哲学根基
- **系统思维**：从还原论到整体论的转变，是理解和设计智能系统的关键
- **人机协同**：第三卷的混合智能设计原则，为 AI 与人类的协作提供了方法论指导
- **认知架构**：从 SOAR 到现代 LLM，认知架构的演进揭示了智能的本质

## 在线访问

🌐 **GitHub Pages**: [https://huawenyao.github.io/sio-mmos-book/](https://huawenyao.github.io/sio-mmos-book/)

### 从 `github.io` 被跳到自定义域名时

本仓库的静态页面**没有**写任何跳转到 `siommos.book` 的脚本。若访问 `https://huawenyao.github.io/...` 时浏览器地址栏会跳到 `http://siommos.book/...`，这是 **GitHub Pages 在仓库里配置了自定义域名（Custom domain）之后，由服务器返回的 HTTP 301 重定向**，并非页面内 JavaScript。

若希望 **`github.io` 与自定义域名并存、不自动跳到后者**，请到 GitHub：**仓库 → Settings → Pages**，在 **Custom domain** 中清空并保存（或移除仓库根目录的 `CNAME` 文件），等待 DNS 与 Pages 刷新后再试。若希望统一使用自定义域名，保留现状即可，README 中的 `github.io` 链接在浏览器里会落到你的主域名。

## 页面导航

### 📚 1. 营销首页 (`/book-show/index.html`)

**URL**: [https://huawenyao.github.io/sio-mmos-book/book-show/index.html](https://huawenyao.github.io/sio-mmos-book/book-show/index.html)

丛书的主入口页面，展示：
- 丛书核心理念与定位
- 四卷书籍概览
- 快速导航入口

### 📖 2. 书籍展示页 (`/book-show/book-show.html`)

**URL**: [https://huawenyao.github.io/sio-mmos-book/book-show/book-show.html](https://huawenyao.github.io/sio-mmos-book/book-show/book-show.html)

交互式书籍展示页面，包含：
- **Hero 区域**：品牌标语、GitHub Star 按钮、四卷书籍可视化展示
- **知识图谱**：概念之间的动态关联网络动画
- **道法术势器架构**：五位一体的方法论框架可视化
- **阅读旅程**：从认知到行动的完整路径指引
- **章节预览**：各卷章节概览与详情模态框

功能特点：
- 粒子网络动画背景
- 实时获取 GitHub Star 数量
- 章节卡片点击展开详情模态框
- 响应式设计，支持移动端

### 📝 3. 在线阅读器 (`/book-show/reader.html`)

**URL**: [https://huawenyao.github.io/sio-mmos-book/book-show/reader.html?vol=1&ch=ch1-2](https://huawenyao.github.io/sio-mmos-book/book-show/reader.html?vol=1&ch=ch1-2)

Markdown 在线阅读器，功能包括：

- **目录导航**：左侧可折叠的多卷目录树
- **Markdown 渲染**：基于 marked.js 的实时渲染
- **阅读进度**：自动保存阅读位置到 localStorage
- **主题切换**：支持亮色/暗色/护眼三主题
- **字体调节**：可调整字体大小
- **书签功能**：保存重要章节
- **URL 参数**：通过 `?vol=1&ch=ch1-2` 参数直接定位章节

URL 参数说明：
- `vol`: 卷号（1-4）
- `ch`: 章节ID（如 ch1-2, ch6-10 等）

## 本地运行

本站为纯静态网站，无需构建，可直接用任意 HTTP 服务器运行：

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000/book-show/`

## 项目结构

```
.
├── book-show/              # 网站前端
│   ├── index.html          # 营销首页
│   ├── book-show.html      # 书籍展示页
│   ├── reader.html         # 在线阅读器
│   ├── book-show.css       # 展示页样式
│   ├── reader.css          # 阅读器样式
│   ├── book-show.js        # 展示页交互脚本
│   ├── reader.js           # 阅读器逻辑脚本
│   ├── chapters-data.js    # 章节元数据
│   └── marked.min.js       # Markdown 解析库
│
├── SSIO-BOOK/              # Markdown 源文件
│   ├── 00总纲/             # 总纲与项目总结
│   ├── 01大纲/             # 四卷详细大纲
│   ├── 02正文/             # 各卷正文
│   ├── 03附录/             # 实践指南
│   └── FILE_INDEX.md       # 文件索引
│
└── README.md               # 本文档
```

## 技术栈

- **纯静态**：HTML + CSS + JavaScript，无框架依赖
- **Markdown 渲染**：[marked.js](https://marked.js.org/)
- **动画**：原生 Canvas 2D API
- **数据持久化**：localStorage（阅读进度、书签、主题偏好）

## 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 贡献

欢迎提交 Issue 和 Pull Request！

如果这个项目对你有帮助，请给我们一个 ⭐ Star！

## 许可证

本项目内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

---

**SIO-MMOS丛书编委会** © 2026