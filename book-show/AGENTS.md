# book-show KNOWLEDGE BASE

**Scope:** 丛书网站前端 — 营销页、书籍展示、在线阅读器

## OVERVIEW
纯静态三页站点：index.html（营销）、book-show.html（展示+预览）、reader.html（阅读器）。

## STRUCTURE
```
book-show/
├── index.html          # 营销首页（全内联样式/脚本）
├── book-show.html      # 书籍展示（外部CSS/JS）
├── reader.html         # 阅读器（外部CSS/JS）
├── book-show.css       # 展示页样式（945行）
├── reader.css          # 阅读器样式（三主题支持）
├── styles.css          # 共享/通用样式
├── book-show.js        # 展示页交互（粒子、图谱、模态框）
├── reader.js           # 阅读器逻辑（目录、加载、书签）
├── chapters-data.js    # 章节元数据（模态框内容）
└── marked.min.js       # Markdown解析器（第三方，不可编辑）
```

## WHERE TO LOOK
| Task | File |
|------|------|
| 改营销页内容 | `index.html` |
| 改书籍展示布局 | `book-show.html` |
| 改阅读器UI | `reader.html` |
| 改展示页样式 | `book-show.css` |
| 改阅读器样式/主题 | `reader.css` |
| 改粒子/图谱动画 | `book-show.js` |
| 改阅读逻辑/目录 | `reader.js` |
| 改章节预览数据 | `chapters-data.js` |

## CONVENTIONS
- `index.html` 为唯一全内联文件，其余页面外链CSS/JS
- CSS变量前缀：`--bg-*`, `--text-*`, `--gradient-*`, `--shadow-*`
- 动画缓动统一：`cubic-bezier(0.4, 0, 0.2, 1)`
- Canvas 可视化均手写原生2D，无D3/Three.js

## ANTI-PATTERNS
- `marked.min.js` 为 vendored 第三方文件，禁止直接修改
- `index.html` 内联样式与 `generate.js` 生成的样式需保持同步（如用generate.js重新生成）
