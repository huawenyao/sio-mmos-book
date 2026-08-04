# Axiom-Alpha Agent Team

**版本**: v4.0 · 意图驱动认知有机体  
**定位**: 投资第一性原理 → Cursor Agent Skills + Subagent Team 的可运行实现

## 体系分层

| 层 | 内容 | 路径 |
|----|------|------|
| 公理层 | 五大公理 | `knowledge/axioms/` |
| 定理层 | 十大定理 / 模式模板 | `knowledge/theorems/`, `knowledge/axioms/pattern-templates.md` |
| 分析模型层 | 静态-动态融合清单 | `knowledge/analysis-model/` |
| Agent Team | Subagents | `../.cursor/agents/` |
| Skills | PARR 循环与专项流程 | `../.cursor/skills/` |
| 契约 | JSON Schema | `schemas/` |
| 工作记忆 | 会话 episode | `workspace/episodes/` |

## Agent Team 角色

| Subagent | 职责 |
|----------|------|
| `intent-surface` | 意图解构 |
| `cognitive-planner` | 动态认知规划 / 三级重规划 |
| `epistemic-runner` | PARR 循环执行与动态召唤 |
| `stasis-cartographer` | 公理1/3 静态边界测绘 |
| `flow-tracker` | 公理2 五要素增量 |
| `consensus-observer` | 公理4 虚实共识 |
| `feedback-diagnostician` | 公理5 反馈阶段 |
| `axiom-immune` | 公理免疫系统 |
| `dialectic-engine` | 红蓝对抗 |
| `decision-synthesizer` | 决策锚点输出 |

## 主 Skill

- `/investment-decision-loop` — 完整 PARR 决策循环（默认入口）
- `/axiom-worldview` — 加载公理透镜
- `/binary-analysis-checklist` — 二元清单快检
- `/daily-four-layer-review` — 四层每日复盘
- `/immune-audit` — 独立免疫审查
- `/decision-anchor-format` — 格式化决策锚点

## 标准调用

```
/investment-decision-loop 帮我看看宁德现在能不能买
```

或自然语言触发；Agent 应根据 skill description 自动加载主循环并召唤团队。

## 硬约束

1. 公理不可被操作规则覆盖
2. 每个最终判断必须引用公理/定理编号
3. 免疫 BLOCK 未解除不得给出买入/加仓建议
4. 虚预期必须等待实增量验证

## 交互看板

```bash
python3 -m http.server 8000
# http://localhost:8000/axiom-alpha/demo/
```

业务流：大盘 → 行业/概念 → 个股  
数据流：事件 → 行情 → 指标 → 洞察 → 决策锚点  
认知流：PARR + 公理透镜筛选

## 校验命令

```bash
python3 axiom-alpha/scripts/validate_schemas.py axiom-alpha/examples/ningde-intent.example.json --schema intent_decomposition
python3 axiom-alpha/scripts/innate_immune_check.py axiom-alpha/examples/immune-block.example.json
```
