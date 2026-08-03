# PARR 生命周期详解

## 流程图

```
INTENT → INITIAL PLAN → COGNITIVE CYCLE
  SELECT → SUMMON → EXECUTE → IMMUNE → SYNTHESIZE → EVALUATE → REPLAN?
       ↑_______________________________________________|
                         sufficiency met?
                              ↓
                     DECISION ANCHOR → MEMORY STORE
```

## Replan 三级

### Micro-Replan
- 触发：新信息与预期基本一致
- 动作：调整优先级；插入高价值新问题

### Paradigm-Replan
- 触发：新信息颠覆原假设（如需求数据造假）
- 动作：推翻假设；重绘势场；重评所有置信度；生成全新路径

### Strategic-Replan
- 触发：发现更高维分析视角
- 动作：升维；原子问题降级为子节点；输出更高层框架

## 充分度默认标准

至少满足：
1. 已确定存量/边界定性（A1/A3）
2. 已识别主导增量类型与方向（A2）
3. 已评估虚实匹配度（A4）
4. 已判断反馈阶段或明确数据不足（A5）
5. 四维结论不矛盾，或矛盾已经辩证解决
6. 免疫最终检查非 BLOCK

## 安全阀

- MAX_CYCLES = 20
- 连续 2 次 BLOCK 仍无法通过 → Emergency Stop，请求人类介入
- 外生冲击信号出现 → 强制降低 conviction_cap，增加监控项
