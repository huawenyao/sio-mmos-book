#!/usr/bin/env python3
"""Validate Axiom-Alpha structured outputs against JSON Schemas."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_DIR = ROOT / "schemas"

SCHEMA_MAP = {
    "intent_decomposition": "intent_decomposition.json",
    "cognitive_plan": "cognitive_plan.json",
    "decision_anchor": "decision_anchor.json",
}


def load_json(path: Path):
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def validate(instance: dict, schema: dict) -> list[str]:
    """Minimal validator covering required fields and enums used in this project."""
    errors: list[str] = []

    def walk(node, sch, path: str):
        if not isinstance(sch, dict):
            return
        if sch.get("type") == "object" and isinstance(node, dict):
            for key in sch.get("required", []):
                if key not in node:
                    errors.append(f"{path or '$'}: missing required field '{key}'")
            props = sch.get("properties", {})
            for key, val in node.items():
                if key in props:
                    walk(val, props[key], f"{path}.{key}" if path else key)
            defs = sch.get("$defs") or sch.get("definitions") or {}
            # resolve local $ref shallowly for AxiomConclusion-like objects
            for key, prop_sch in props.items():
                if key in node and isinstance(prop_sch, dict) and "$ref" in prop_sch:
                    ref = prop_sch["$ref"].split("/")[-1]
                    if ref in defs:
                        walk(node[key], defs[ref], f"{path}.{key}" if path else key)
        if "enum" in sch and node is not None and node not in sch["enum"]:
            errors.append(f"{path}: value {node!r} not in enum {sch['enum']}")
        if sch.get("type") == "array" and isinstance(node, list):
            min_items = sch.get("minItems")
            if min_items is not None and len(node) < min_items:
                errors.append(f"{path}: expected >= {min_items} items, got {len(node)}")
            item_sch = sch.get("items")
            if item_sch:
                for i, item in enumerate(node):
                    walk(item, item_sch, f"{path}[{i}]")
        if sch.get("type") == "number" and isinstance(node, (int, float)):
            if "minimum" in sch and node < sch["minimum"]:
                errors.append(f"{path}: {node} < minimum {sch['minimum']}")
            if "maximum" in sch and node > sch["maximum"]:
                errors.append(f"{path}: {node} > maximum {sch['maximum']}")

    walk(instance, schema, "")
    return errors


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("json_file", type=Path, help="JSON file to validate")
    parser.add_argument(
        "--schema",
        choices=sorted(SCHEMA_MAP),
        help="Schema name; inferred from filename if omitted",
    )
    args = parser.parse_args(argv)

    schema_name = args.schema
    if not schema_name:
        stem = args.json_file.stem
        for key in SCHEMA_MAP:
            if key in stem:
                schema_name = key
                break
    if not schema_name:
        print("Cannot infer schema; pass --schema", file=sys.stderr)
        return 2

    schema = load_json(SCHEMA_DIR / SCHEMA_MAP[schema_name])
    instance = load_json(args.json_file)
    errors = validate(instance, schema)
    if errors:
        print(f"INVALID against {schema_name}:")
        for e in errors:
            print(f"  - {e}")
        return 1
    print(f"OK: {args.json_file} valid against {schema_name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
