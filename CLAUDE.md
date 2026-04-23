# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**项目名称**：SIO-MMOS丛书 - 复杂性时代的认知操作系统  
**项目状态**：进行中，核心章节已完成约11万字（总目标53万字）  
**核心内容**：四卷系列丛书 + 实践指南，构建从哲学本体论到工程实践的完整认知-行动闭环  
**技术栈**：纯静态HTML/CSS/JavaScript，无需后端服务，直接在浏览器运行

## 目录结构

```
├── SSIO-BOOK/              # 丛书Markdown源文件目录
│   ├── 00总纲/            # 丛书总纲和项目文档
│   ├── 01大纲/            # 各卷详细大纲
│   ├── 02正文/            # 各卷正文内容
│   ├── 03附录/            # 实践指南和工具箱
│   ├── FILE_INDEX.md      # 文件索引
│   ├── GLOSSARY.md        # 术语表
│   └── OPEN_PROBLEMS.md   # 待解决问题清单
├── book-show/              # 书籍展示和阅读网站
│   ├── index.html         # 营销首页
│   ├── book-show.html     # 书籍展示和预览页
│   ├── reader.html        # 在线阅读器
│   ├── *.css              # 样式文件
│   ├── *.js               # 脚本文件
│   └── marked.min.js      # Markdown渲染库
└── *.md                   # 项目文档
```

## 常用命令

### 运行本地服务器
项目是纯静态网站，可以使用任意HTTP服务器运行：
```bash
# 使用Python
python -m http.server 8000

# 使用Node.js (http-server)
npx http-server -p 8000

# 使用PHP
php -S localhost:8000
```
访问 `http://localhost:8000/book-show/` 即可查看网站。

### 添加新章节
1. 在 `SSIO-BOOK/` 对应目录下创建Markdown文件
2. 更新 `chapters-data.js` 中的章节元数据
3. 阅读器会自动加载Markdown内容

### 更新网站内容
所有页面都是静态HTML，直接编辑对应文件即可，无需构建过程。

## 核心架构

### 网站结构
1. **营销首页 (index.html)**：项目介绍、核心定位、目标用户、架构展示、版本定价
2. **书籍展示页 (book-show.html)**：四卷书概览、知识图谱、架构可视化、章节预览
3. **在线阅读器 (reader.html)**：完整的阅读体验，支持多卷切换、目录导航、主题切换、进度跟踪、书签功能

### 阅读器工作原理
1. 章节元数据存储在 `chapters-data.js` 中
2. 阅读时通过Fetch API加载对应Markdown文件
3. 使用 `marked.min.js` 将Markdown渲染为HTML
4. 支持本地存储阅读进度、书签、偏好设置

### 核心技术特点
- 纯静态架构，无需服务器支持，可部署在任意静态托管平台
- 响应式设计，支持桌面和移动设备
- 深色/浅色主题切换
- 阅读进度本地持久化
- 离线可用（通过Service Worker，待实现）

## 编写规范

### Markdown编写规范
1. 标题层级：`#` 卷名，`##` 章节名，`###` 小节名，依此类推
2. 数学公式：使用LaTeX语法，支持KaTeX渲染（待集成）
3. 图表：优先使用Mermaid语法，或嵌入SVG
4. 引用：使用 `> ` 标记引用内容
5. 代码块：指定语言类型，便于语法高亮

### 内容编写原则
1. 保持术语统一，参考 `GLOSSARY.md`
2. 跨卷内容交叉引用使用标准格式：「参见第一卷第3章」
3. 重要概念首次出现时给出明确定义
4. 理论部分配合实际案例说明
5. 避免冗余，保持内容精炼

## 注意事项

### 内容安全
1. 不要在代码中提交敏感信息、API密钥、内部文档
2. 所有引用的外部资源使用CDN链接，避免版权问题
3. 引用第三方内容时注明出处

### 版本控制
1. 大的内容变更使用单独分支开发
2. 提交信息遵循约定：`类型: 简要描述`，例如：
   - `feat: 完成第一卷第3章正文`
   - `fix: 修复阅读器目录跳转问题`
   - `docs: 更新项目进度文档`

### 性能优化
1. Markdown文件保持在合理大小，避免单文件超过1MB
2. 图片资源使用WebP格式，压缩后再提交
3. 避免在页面中引入不必要的第三方脚本

## 项目资源链接
- 术语表：`SSIO-BOOK/GLOSSARY.md`
- 文件索引：`SSIO-BOOK/FILE_INDEX.md`
- 待解决问题：`SSIO-BOOK/OPEN_PROBLEMS.md`
- 项目总结：`SSIO-BOOK/00项目总结 PROJECT_SUMMARY.md`
