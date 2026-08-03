---
name: axiom-worldview
description: >
  注入投资第一性原理公理世界观。当需要按五大公理感知市场、从定理模板识别模式、
  或任何投资推理开始前需要认知透镜时使用。可作为其他技能的前置世界观加载。
---

# Axiom Worldview（公理世界观）

公理不是笼子，而是 LLM 推理的坐标系。每次思考前透过透镜看世界。

## 激活步骤

1. 读取 `axiom-alpha/knowledge/axioms/five-axioms.md`
2. 读取 `axiom-alpha/knowledge/axioms/pattern-templates.md`
3. 读取 `axiom-alpha/knowledge/theorems/ten-theorems.md`
4. 按当前分析阶段**选择性激活**相关维度（不要每次塞满全部上下文）

## 感知透镜（按序）

1. **stasis_field**：多层惯性场——什么在维持现状？
2. **flow_dynamics**：五类流——什么在变？加速度？
3. **potential_topology**：势场拓扑——边界与支撑强度？
4. **consensus_state**：主体间共识——预期阶段？
5. **loop_competition**：反馈回路竞争——谁在主导？

## 动态注入策略

| 阶段 | 激活维度 |
|------|---------|
| 边界测绘 | A1, A3 |
| 增量追踪 | A2, A5 |
| 题材/预期 | A4, A2 |
| 拐点研判 | A2, A5, T3 |
| 最终决策 | 全部 + 定理库 |

详见 `references/dynamic-injection.md`。

## 输出习惯

任何中间结论格式：
```
[感知维度] → [模式模板] → [定理引用] → [结论] (confidence)
```
