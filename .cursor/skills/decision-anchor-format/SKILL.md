---
name: decision-anchor-format
description: >
  将已有分析材料格式化为标准 DecisionAnchor。当认知循环已完成、用户只要
  结构化决策锚点或导出 JSON 时使用。
---

# Decision Anchor Format

1. 读取 `axiom-alpha/schemas/decision_anchor.json` 与 `axiom-alpha/knowledge/templates/decision-anchor.md`
2. 召唤 `/decision-synthesizer`
3. 校验：`python3 axiom-alpha/scripts/validate_schemas.py --schema decision_anchor <file>`
   （或从项目根：`python3 axiom-alpha/scripts/validate_schemas.py`）
4. 同时给出人类可读简报 + JSON
5. 可选写入 `axiom-alpha/workspace/episodes/YYYYMMDD-<slug>.json`
