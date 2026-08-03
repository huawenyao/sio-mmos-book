# 公理免疫系统规则库

> 横切关注点：贯穿每一次推理，实时监测逻辑一致性。

## 响应级别

| 级别 | 触发条件 | 响应动作 |
|------|---------|---------|
| Monitor | 轻微逻辑不一致 | 记录日志，继续执行 |
| Warn | 置信度与证据不匹配 | 输出标注警告，建议降低置信度 |
| Force Dialectic | 公理间冲突 / 虚实严重背离 | 强制召唤红蓝对抗辩论 |
| Block & Rethink | 公理硬性违反 | 阻断输出，强制重新推理 |
| Emergency Stop | 系统性逻辑崩溃 | 停止执行，请求人类介入 |

## 先天免疫硬规则（零容忍）

### AXIOM1/2_VIOLATION — 无增量判趋势
- **描述**：增量未确认就判定趋势突破
- **检查**：`conclusion == trend_breakout AND delta_evidence.confidence < 0.7`
- **响应**：BLOCK_AND_RETHINK
- **消息**：公理2违反：趋势判定需要持续增量确认，当前增量证据不足

### AXIOM3_VIOLATION — 远离边界判安全
- **描述**：价格严重偏离边界时判定低风险
- **检查**：`price_deviation_from_boundary > 3.0 AND risk_assessment == low`
- **响应**：BLOCK_AND_RETHINK
- **消息**：公理3违反：价格严重偏离边界，回归引力巨大，不应判定低风险

### AXIOM4_VIOLATION — 虚实背离仍强看多
- **描述**：虚预期远超实增量却维持看多
- **检查**：`erg_gap > 0.5 AND material_flow_acceleration <= 0 AND stance == bullish`
- **响应**：FORCE_DIALECTIC
- **消息**：公理4/定理5触发：虚实严重背离，强制启动辩证引擎

### AXIOM5_VIOLATION — 势能衰竭仍强看多
- **描述**：增量加速度为负且持续衰退后仍强看多
- **检查**：`delta_acceleration < 0 AND declining_periods >= 3 AND stance == strong_bullish`
- **响应**：FORCE_REASSESS
- **消息**：公理5/定理3触发：势能衰竭预警已亮，必须重新评估

### EMPIRICISM_VIOLATION — 经验主义跳跃
- **描述**：跳过公理直接用经验模板得出结论
- **检查**：结论缺少公理/定理引用编号
- **响应**：WARN 或 BLOCK（最终决策锚点必须 BLOCK）
- **消息**：禁止经验主义套模板；每个判断必须引用公理/定理

### CONFIDENCE_MISMATCH — 置信度与证据不匹配
- **描述**：证据薄弱但置信度过高
- **检查**：`conviction_level > 0.8 AND min(evidence_confidence) < 0.5`
- **响应**：WARN
- **消息**：置信度与证据强度不匹配，建议降低 conviction

## 适应性免疫审查清单

审查员（另一个推理视角）必须检查：
1. 是否存在"跳过公理直接得出结论"的跳跃？
2. 是否存在"已知信息与结论矛盾"但被忽略？
3. 是否使用了经验主义而非公理演绎？
4. 结论置信度是否与证据强度匹配？
5. 是否存在确认偏误——只看到支持结论的证据？

## 体系边界（不可神化）

| 边界 | 应对 |
|------|------|
| 外生冲击（黑天鹅） | 增加外生冲击观测层，降低仓位 |
| 潜空间难以精确量化 | 虚预期必须等实验证，禁止纯臆测 |
| 信号噪音 | 连续多周期验证持续性 |
