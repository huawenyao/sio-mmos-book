#!/usr/bin/env python3
"""Innate axiom immune checks (Layer-1 hard rules)."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


def check(state: dict[str, Any]) -> dict[str, Any]:
    violations = []

    conclusion = state.get("conclusion")
    delta_conf = float(state.get("delta_evidence", {}).get("confidence", 1.0))
    if conclusion == "trend_breakout" and delta_conf < 0.7:
        violations.append(
            {
                "id": "AXIOM2_VIOLATION",
                "severity": "block",
                "message": "公理2违反：趋势判定需要持续增量确认，当前增量证据不足",
            }
        )

    deviation = float(state.get("price_deviation_from_boundary", 0.0))
    risk = state.get("risk_assessment")
    if deviation > 3.0 and risk == "low":
        violations.append(
            {
                "id": "AXIOM3_VIOLATION",
                "severity": "block",
                "message": "公理3违反：价格严重偏离边界，不应判定低风险",
            }
        )

    erg_gap = float(state.get("erg_gap", 0.0))
    accel = float(state.get("material_flow_acceleration", 0.0))
    stance = state.get("stance")
    if erg_gap > 0.5 and accel <= 0 and stance in {"bullish", "看多", "强看多", "strong_bullish"}:
        violations.append(
            {
                "id": "AXIOM4_VIOLATION",
                "severity": "dialectic",
                "message": "公理4/定理5触发：虚实严重背离，强制启动辩证引擎",
            }
        )

    delta_acc = float(state.get("delta_acceleration", 0.0))
    declining = int(state.get("delta_momentum", {}).get("declining_for_periods", 0))
    if delta_acc < 0 and declining >= 3 and stance in {"strong_bullish", "强看多"}:
        violations.append(
            {
                "id": "AXIOM5_VIOLATION",
                "severity": "block",
                "message": "公理5/定理3触发：势能衰竭预警已亮，必须重新评估",
            }
        )

    axiom_refs = state.get("axiom_refs") or state.get("causal_chain_axiom_refs") or []
    if state.get("is_final_decision") and not axiom_refs:
        violations.append(
            {
                "id": "EMPIRICISM_VIOLATION",
                "severity": "block",
                "message": "最终决策缺少公理/定理引用",
            }
        )

    conviction = state.get("conviction_level")
    min_ev = state.get("min_evidence_confidence")
    if conviction is not None and min_ev is not None:
        if float(conviction) > 0.8 and float(min_ev) < 0.5:
            violations.append(
                {
                    "id": "CONFIDENCE_MISMATCH",
                    "severity": "warn",
                    "message": "置信度与证据强度不匹配，建议降低 conviction",
                }
            )

    if any(v["severity"] == "block" for v in violations):
        verdict = "BLOCK"
    elif any(v["severity"] == "dialectic" for v in violations):
        verdict = "FORCE_DIALECTIC"
    elif violations:
        verdict = "WARN"
    else:
        verdict = "PASS"

    return {"verdict": verdict, "violations": violations}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("state_json", type=Path)
    args = parser.parse_args(argv)
    state = json.loads(args.state_json.read_text(encoding="utf-8"))
    result = check(state)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["verdict"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
