---
name: immune-audit
description: >
  独立运行公理免疫审查。当已有推理结论/研报草稿需要校验是否违反五大公理、
  或用户要求逻辑审查、置信度校对时使用。
---

# Immune Audit

1. 读取 `axiom-alpha/knowledge/axioms/immune-rules.md`
2. 召唤 `/axiom-immune`，传入完整推理链与知识状态
3. 若本地有状态 JSON，运行：
   `python3 axiom-alpha/scripts/innate_immune_check.py <state_json>`
4. 按 verdict 执行：
   - PASS → 放行
   - WARN → 标注并建议下调置信度
   - FORCE_DIALECTIC → 召唤 `/dialectic-engine`
   - BLOCK → 要求重写推理
   - EMERGENCY_STOP → 停止并请求人类

输出必须包含 violations 列表与 required_action。
