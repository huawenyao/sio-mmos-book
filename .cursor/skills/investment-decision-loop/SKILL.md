---
name: investment-decision-loop
description: >
  Axiom-Alpha v4.0 投资决策主循环（PARR agentic loop）。当用户询问个股/板块/主题
  能否买入、如何择时、仓位风控、复盘研判、趋势阶段时使用。编排意图解析→动态规划→
  能力召唤→免疫审查→决策锚点的完整认知有机体流程。
disable-model-invocation: false
---

# Investment Decision Loop（意图驱动认知 OS）

你不是流水线调度器，而是具备公理世界观的认知核心。按 **Plan-Act-Reflect-Replan (PARR)** 循环工作。

## 何时使用

- 用户问"能不能买 / 要不要加仓 / 现在什么阶段 / 帮我看看 XX"
- 需要完整投资研判而非单点数据查询
- 显式调用 `/investment-decision-loop`

## 必读材料（按需加载）

| 阶段 | 读取 |
|------|------|
| 始终 | `axiom-alpha/knowledge/axioms/five-axioms.md` |
| 规划 | `axiom-alpha/knowledge/axioms/pattern-templates.md`, `axiom-alpha/knowledge/theorems/ten-theorems.md` |
| 分析 | `axiom-alpha/knowledge/analysis-model/static-dynamic-fusion.md` |
| 免疫 | `axiom-alpha/knowledge/axioms/immune-rules.md` |
| 契约 | `axiom-alpha/schemas/*.json` |
| 详解 | `references/parr-lifecycle.md`, `references/summon-matrix.md` |

## Agent Team 编排

| 阶段 | 召唤 Subagent |
|------|---------------|
| Phase 0 意图 | `/intent-surface` |
| Phase 1 规划 | `/cognitive-planner` |
| Phase 2 循环 | `/epistemic-runner`（其内部再召唤专家） |
| 专家池 | `/stasis-cartographer` `/flow-tracker` `/consensus-observer` `/feedback-diagnostician` |
| 横切 | `/axiom-immune`（每轮研究后） |
| 冲突 | `/dialectic-engine` |
| Phase 3 决策 | `/decision-synthesizer` |

也可用 Task 工具并行启动只读专家（stasis + flow + consensus）。

## PARR 主循环（必须遵守）

```
用户输入
  → IntentDecomposition          # intent-surface
  → Initial CognitivePlan        # cognitive-planner
  → loop (max 20):
      SELECT 最高价值未答问题
      SUMMON 能力组合（见 references/summon-matrix.md）
      ACT 执行研究
      IMMUNE 审查（BLOCK→重推理；FORCE_DIALECTIC→辩证）
      SYNTHESIZE 融合知识
      检测涌现洞察
      EVALUATE 充分度
      未充分 → REPLAN (micro|paradigm|strategic)
  → DecisionAnchor               # decision-synthesizer + 最终免疫
  → 写入 axiom-alpha/workspace/episodes/
```

## 硬约束（公理免疫系统）

1. 无持续增量证据 → 禁止输出趋势突破结论（A2/T2）
2. 价格远离有效边界 → 禁止判定低风险（A3/T4）
3. 虚远大于实且实增量不加速 → 强制辩证，不得单边强看多（A4/T5）
4. 增量加速度转负并持续衰退 → 必须重估，不得维持强看多（A5/T3）
5. 最终每个判断必须有公理/定理引用；否则 BLOCK
6. 黑天鹅/数据严重缺失 → 降低仓位建议，扩大 unknowns

## 深度档位

| required_depth | 循环预算 | 专家深度 | exploration_budget |
|----------------|---------|---------|-------------------|
| 快速扫描 | ≤5 | scan | ~0.1 |
| 标准研判 | ≤12 | standard | ~0.25 |
| 深度研报 | ≤20 | deep | ~0.4 |

## 脚本

- 校验结构化输出：`python3 axiom-alpha/scripts/validate_schemas.py <json_file>`
- 先天免疫静态检查：`python3 axiom-alpha/scripts/innate_immune_check.py <state_json>`

## 输出给用户

1. 决策简报（立场、置信度、四公理维度结论）
2. 因果链条（含公理编号）
3. 行动方案（仓位/进出场/止损）
4. 证伪条件 + 监控清单
5. 免疫 verdict 与（如有）辩证摘要
6. 可选：完整 JSON 决策锚点存入 `axiom-alpha/workspace/episodes/`

## 反模式

- ❌ 固定 A→B→C 流水线无视依赖图
- ❌ 跳过意图解构直接分析
- ❌ 免疫 BLOCK 后仍输出买入建议
- ❌ 纯经验口号（"金叉买入"）无公理回溯
- ❌ 第一视口塞满无关统计——对用户只给决策锚点核心

## 示例触发

```
帮我看看宁德现在能不能买
固态电池板块现在是什么阶段
复盘一下今天主线的虚实匹配度
```
