# Axiom-Alpha v4.0

基于投资第一性原理（五大公理 · 十大定理）的 **Cursor Agent Skill + Agent Team** 实现。

> 不建流水线，建认知有机体。  
> 不写死流程，写活意图。  
> 给 LLM 公理化世界观，让它在受控自由中自主思考。

## 快速开始

在 Cursor Agent 对话中：

```text
/investment-decision-loop 帮我看看固态电池板块现在是什么阶段
```

或直接说投资问题；主 skill 与相关 subagent 会按需加载。

### 专项入口

| 命令 | 用途 |
|------|------|
| `/investment-decision-loop` | 完整 PARR 决策循环 |
| `/daily-four-layer-review` | 四层每日复盘 |
| `/binary-analysis-checklist` | 静态-动态清单 |
| `/immune-audit` | 公理逻辑审查 |
| `/axiom-worldview` | 仅加载公理透镜 |

显式召唤专家：`/stasis-cartographer`、`/flow-tracker`、`/consensus-observer`、`/feedback-diagnostician`、`/dialectic-engine` 等。

## 架构

```
用户意图
  → Intent Surface          (intent-surface)
  → Cognitive Plan          (cognitive-planner)
  → PARR Loop               (epistemic-runner)
      SELECT → SUMMON → ACT → IMMUNE → SYNTHESIZE → REPLAN
  → Decision Anchor         (decision-synthesizer)
```

横切：**公理免疫系统**（axiom-immune）贯穿每轮推理。

详情见：
- `.cursor/skills/investment-decision-loop/SKILL.md`
- `AGENTS.md`
- `knowledge/axioms/five-axioms.md`

## 交互看板 Demo

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000/axiom-alpha/demo/
```

- **业务维**：市场/大盘 → 行业/概念 → 个股（可钻取）
- **信息维**：事件资讯 → 行情数据 → 分析指标 → 洞察标签
- **认知维**：PARR 循环 + 四大公理透镜筛选
- **输出**：个股层决策锚点（仓位/介入/证伪）

## 目录

```
axiom-alpha/
├── demo/                # 交互式决策看板 HTML
├── knowledge/           # 公理、定理、分析模型、模板
├── schemas/             # Intent / Plan / Decision 契约
├── scripts/             # Schema 校验 + 先天免疫检查
├── examples/            # 示例输入
├── workspace/episodes/  # 运行产物
├── AGENTS.md
└── README.md

.cursor/
├── agents/              # Agent Team（10 个 subagents）
├── skills/              # 6 个 skills
└── rules/axiom-alpha.mdc
```

## 本地校验

```bash
python3 axiom-alpha/scripts/validate_schemas.py \
  axiom-alpha/examples/ningde-intent.example.json \
  --schema intent_decomposition

python3 axiom-alpha/scripts/innate_immune_check.py \
  axiom-alpha/examples/immune-block.example.json
# 期望：verdict=BLOCK（演示无增量却判趋势突破）
```

## 设计原则（摘自 v4.0）

| 维度 | 做法 |
|------|------|
| 流程 | LLM 实时生成思维图，非预写死 DAG |
| 调度 | 按认知需求动态召唤专家 |
| 约束 | 公理 = 物理定律；免疫系统实时纠偏 |
| 学习 | episode 落盘，支持后续反思扩展 |

## 与生产级 LangGraph 栈的关系

本仓库交付的是 **Agentic Loop 可运行的 Cursor 原生层**（Skills + Subagents + 知识库 + 契约校验）。  
完整数据接入（Wind/Tushare）、Neo4j 因果图谱、Celery 队列等属于下一阶段工程扩展，接口位已在 `schemas/` 与 episode 结构中预留。
