/**
 * Axiom-Alpha 看板演示数据
 * 业务流：大盘 → 行业/概念 → 个股
 * 数据流：事件资讯 → 行情数据 → 分析指标 → 洞察标签 → 决策锚点
 * 认知流：静态边界 → 增量扰动 → 虚实校验 → 反馈阶段
 */
window.AXIOM_BOARD_DATA = {
  meta: {
    asOf: "2026-08-04 10:30 HKT",
    marketSession: "港股/A股/韩股盘中联动示意",
    worldview: "市场演化 = 静态存量边界 ⊕ 动态增量博弈 ⊕ 虚实自反馈闭环"
  },

  parrStages: [
    { id: "intent", label: "意图", en: "Intent", desc: "解构目标/隐含需求/风险偏好" },
    { id: "plan", label: "规划", en: "Plan", desc: "生成认知优先级与依赖图" },
    { id: "act", label: "研究", en: "Act", desc: "动态召唤能力模块取证" },
    { id: "reflect", label: "免疫", en: "Reflect", desc: "公理一致性审查与辩证" },
    { id: "decide", label: "决策", en: "Decide", desc: "输出决策锚点与监控清单" }
  ],

  axiomLenses: [
    { id: "stasis", code: "A1/A3", label: "静态边界", short: "静", color: "#1a5f7a",
      prompt: "先测绘存量结构与支撑：边界在哪？牢不牢？" },
    { id: "flow", code: "A2", label: "增量扰动", short: "动", color: "#c4783a",
      prompt: "只跟踪边际变化量：资金/供需/政策/业绩/情绪" },
    { id: "vr", code: "A4", label: "虚实共生", short: "虚实", color: "#2f6f4e",
      prompt: "预期是否被实增量验证？透支还是不足？" },
    { id: "feedback", code: "A5", label: "自反馈", short: "馈", color: "#8b3a4a",
      prompt: "反馈处于萌芽/强化/极致/反转哪一段？" }
  ],

  infoDims: [
    { id: "events", label: "事件资讯", icon: "⚡", flowStep: 1,
      desc: "外生扰动与叙事入口 · 驱动虚相与增量候选" },
    { id: "quotes", label: "行情数据", icon: "▦", flowStep: 2,
      desc: "价格/量能/资金的实相痕迹 · 观测能量强度" },
    { id: "metrics", label: "分析指标", icon: "◎", flowStep: 3,
      desc: "边界、斜率、拥挤度、虚实缺口的量化映射" },
    { id: "insights", label: "洞察标签", icon: "◇", flowStep: 4,
      desc: "定理模式识别输出 · 连接决策判定矩阵" }
  ],

  /* ========== 业务层：大盘 ========== */
  market: {
    id: "market",
    name: "市场 / 大盘",
    subtitle: "L5 宏观流动性与风险偏好场",
    stance: "中性偏谨慎",
    axiomStage: "feedback",
    pattern: "entropy_increase",
    summary: "全球风险资产高位震荡，存储成本上行通过供应链向消费电子传导；资金在AI硬件与高估值成长之间高低切换。",
    events: [
      { time: "09:15", title: "美债实际利率回升，成长股折现压力再现", tag: "宏观", axiom: "A2", impact: "负向增量",
        detail: "实际利率边际抬升压低长久期资产估值，风险偏好回落。" },
      { time: "09:42", title: "韩股科技股波动放大，存储产业链情绪传导", tag: "外盘", axiom: "A5", impact: "反馈强化",
        detail: "HBM叙事与周期见顶担忧并存，波动率抬升。" },
      { time: "10:05", title: "南向资金净流入放缓，港股科技承压", tag: "资金", axiom: "A2", impact: "边际转弱",
        detail: "存量博弈特征增强，板块跷跷板明显（T8）。" },
      { time: "10:20", title: "存储现货报价继续坚挺，消费电子成本预警", tag: "产业", axiom: "A1", impact: "结构扰动",
        detail: "存量成本曲线上移，手机链条利润边界受压。" }
    ],
    quotes: {
      indices: [
        { name: "恒生科技", value: "3842", chg: -1.86, vol: "中放量" },
        { name: "恒生指数", value: "20126", chg: -0.92, vol: "温和" },
        { name: "科创50", value: "986", chg: -1.12, vol: "缩量" },
        { name: "KOSPI", value: "3218", chg: -2.41, vol: "放量" }
      ],
      breadth: { up: 812, down: 1406, limitUp: 0.38, northbound: -42.6 },
      spark: [102, 101, 100, 99, 101, 98, 97, 96, 98, 95, 94, 93, 95, 92, 91]
    },
    metrics: [
      { name: "风险偏好指数", value: "42", unit: "/100", lens: "feedback", hint: "低于中枢，负反馈占优" },
      { name: "市场熵状态", value: "熵增", unit: "", lens: "flow", hint: "五要素未同向（T9）" },
      { name: "流动性边际", value: "-0.6σ", unit: "", lens: "flow", hint: "外部增量偏弱" },
      { name: "波动分位(20D)", value: "78%", unit: "", lens: "feedback", hint: "接近极致区警惕反转" },
      { name: "估值中枢偏离", value: "+0.4σ", unit: "", lens: "stasis", hint: "整体未极端泡沫" },
      { name: "外生冲击评分", value: "中", unit: "", lens: "vr", hint: "存储/利率双向扰动" }
    ],
    insights: [
      { tag: "存量博弈", theorem: "T8", tone: "warn", text: "增量资金不足，高低切换为主，不宜全面进攻。" },
      { tag: "熵增震荡", theorem: "T9", tone: "neutral", text: "要素背离，仓位以防守与主线精选为主。" },
      { tag: "反馈消化", theorem: "T3", tone: "info", text: "部分赛道价格正反馈中断，等待增量斜率再确认。" },
      { tag: "成本外溢", theorem: "A1→A2", tone: "warn", text: "存储涨价是跨行业外生冲击，下钻消费电子与整机。" }
    ],
    children: ["hbm-memory", "consumer-electronics", "ev-smart"]
  },

  /* ========== 业务层：行业/概念 ========== */
  industries: {
    "hbm-memory": {
      id: "hbm-memory",
      name: "HBM / 存储超级周期",
      subtitle: "产业势场 · 卖方市场与供给纪律",
      parent: "market",
      stance: "看多（产业）/ 谨慎（股价）",
      axiomStage: "flow",
      pattern: "trend_emergence",
      summary: "HBM挤占晶圆产能推升整体存储定价；产业增量仍强，但股价层出现估值压缩与波动消化。",
      events: [
        { time: "Q2", title: "SK海力士：HBM4量产出货，2026产能售罄", tag: "供给", axiom: "A2", impact: "强正向",
          detail: "实增量落地，虚预期获得验证（T5/T6）。" },
        { time: "近周", title: "机构警示：盈利高点伴随PE压缩或为周期尾部信号", tag: "估值", axiom: "A4", impact: "虚实张力",
          detail: "产业实强 vs 估值叙事转弱，触发辩证。" },
        { time: "月度", title: "三星HBM4追赶进度成为份额敏感变量", tag: "竞争", axiom: "A3", impact: "边界风险",
          detail: "护城河若被击穿，存量溢价不可逆削弱（T10反向）。" }
      ],
      quotes: {
        indices: [
          { name: "存储设备相对强度", value: "118", chg: -2.1, vol: "高波" },
          { name: "板块拥挤度", value: "82分位", chg: -0.4, vol: "回落" },
          { name: "DRAMS现货代理", value: "+4.2% WoW", chg: 4.2, vol: "坚挺" }
        ],
        breadth: { up: 6, down: 11, limitUp: 0.28, northbound: null },
        spark: [70, 78, 85, 92, 100, 110, 125, 140, 155, 148, 132, 128, 122, 118, 115]
      },
      metrics: [
        { name: "供需缺口", value: "卖方", unit: "", lens: "stasis", hint: "库存约4周量级示意" },
        { name: "ASP边际", value: "+30% QoQ*", unit: "DRAM", lens: "flow", hint: "*龙头季报量级示意" },
        { name: "ERG虚实缺口", value: "+0.15", unit: "", lens: "vr", hint: "轻度：股价预期已修正" },
        { name: "反馈阶段", value: "产业强化/股价消化", unit: "", lens: "feedback", hint: "嵌套周期（T7）" },
        { name: "供给纪律", value: "高", unit: "", lens: "stasis", hint: "寡头capex克制" },
        { name: "击穿旧边界条件", value: "已满足", unit: "", lens: "flow", hint: "趋势定理产业层成立" }
      ],
      insights: [
        { tag: "虚实共振主线", theorem: "T6", tone: "bull", text: "产业层具备真主线条件：持续增量验证叙事。" },
        { tag: "嵌套背离", theorem: "T7", tone: "warn", text: "大周期向上时，股价急跌更像次级回调——但仍需ASP斜率确认。" },
        { tag: "估值陷阱预警", theorem: "T5", tone: "warn", text: "低PE≠低风险；盈利高点定价需免疫审查。" },
        { tag: "序参量=供给纪律", theorem: "A2/A3", tone: "info", text: "真正决定2027定价权的是供给纪律能否维持。" }
      ],
      children: ["sk-hynix"]
    },
    "consumer-electronics": {
      id: "consumer-electronics",
      name: "消费电子 / 智能手机",
      subtitle: "成本曲线上移 · 利润边界承压",
      parent: "market",
      stance: "谨慎",
      axiomStage: "stasis",
      pattern: "boundary_reversion",
      summary: "存储涨价外溢至整机BOM，出货与毛利双压；高端化ASP提升难完全对冲。",
      events: [
        { time: "Q1", title: "多家安卓品牌指引成本压力贯穿半年", tag: "成本", axiom: "A2", impact: "负向",
          detail: "边际成本冲击尚未证伪结束。" },
        { time: "产业", title: "出货端承压，结构升级成防御策略", tag: "结构", axiom: "A1", impact: "稳态调整",
          detail: "存量竞争加剧，份额博弈。" }
      ],
      quotes: {
        indices: [
          { name: "消费电子指数", value: "912", chg: -1.4, vol: "缩量" },
          { name: "手机链条RS", value: "86", chg: -0.8, vol: "弱" }
        ],
        breadth: { up: 18, down: 42, limitUp: 0.22, northbound: null },
        spark: [110, 108, 105, 100, 98, 96, 94, 90, 88, 86, 87, 85, 84, 83, 82]
      },
      metrics: [
        { name: "成本冲击强度", value: "高", unit: "", lens: "flow", hint: "存储为序参量" },
        { name: "板块毛利中枢", value: "下移", unit: "", lens: "stasis", hint: "边界被成本改写" },
        { name: "预期匹配", value: "偏透支修复后", unit: "", lens: "vr", hint: "杀估值接近尾声？" },
        { name: "反馈阶段", value: "负反馈消化", unit: "", lens: "feedback", hint: "等成本斜率拐头" }
      ],
      insights: [
        { tag: "成本重绘边界", theorem: "A1/A3", tone: "warn", text: "静态利润边界被外生成本改写，勿用旧毛利中枢估值。" },
        { tag: "等待增量拐头", theorem: "T3", tone: "info", text: "存储价格斜率走平/转负才是板块级拐点。" }
      ],
      children: ["xiaomi"]
    },
    "ev-smart": {
      id: "ev-smart",
      name: "智能电动汽车",
      subtitle: "交付爬坡 vs 盈利边界",
      parent: "market",
      stance: "分化",
      axiomStage: "vr",
      pattern: "virtual_real_resonance",
      summary: "头部新势力交付分化；「放量叙事」需被毛利与稳态产能验证，否则高位易回归。",
      events: [
        { time: "7月", title: "多车企公布月交付，3万辆阵营拥挤", tag: "交付", axiom: "A2", impact: "分化",
          detail: "量的增量≠利的增量。" },
        { time: "政策", title: "购置税优惠退坡扰动ASP", tag: "政策", axiom: "A2", impact: "边际",
          detail: "政策增量减弱。" }
      ],
      quotes: {
        indices: [
          { name: "新能源车指数", value: "2240", chg: -0.6, vol: "平" },
          { name: "赛道拥挤度", value: "71分位", chg: -0.2, vol: "回落" }
        ],
        breadth: { up: 22, down: 30, limitUp: 0.4, northbound: null },
        spark: [90, 95, 100, 108, 120, 130, 125, 118, 112, 108, 105, 102, 100, 98, 97]
      },
      metrics: [
        { name: "交付加速度", value: "分化", unit: "", lens: "flow", hint: "看单票斜率" },
        { name: "盈利边界", value: "多数未稳", unit: "", lens: "stasis", hint: "亏损或低利润" },
        { name: "叙事溢价", value: "中高", unit: "", lens: "vr", hint: "需实增量续期" },
        { name: "反馈阶段", value: "强化→验证", unit: "", lens: "feedback", hint: "防极致后回撤" }
      ],
      insights: [
        { tag: "量利背离警惕", theorem: "T5", tone: "warn", text: "交付正增而亏损扩大 = 虚实错位风险。" },
        { tag: "主题验证期", theorem: "T6", tone: "info", text: "有实无续则短波；持续共振才是主线。" }
      ],
      children: ["xiaomi"]
    }
  },

  /* ========== 业务层：个股 ========== */
  stocks: {
    "sk-hynix": {
      id: "sk-hynix",
      name: "SK海力士",
      ticker: "000660.KS / SKHY",
      subtitle: "HBM龙头 · 产业趋势 vs 股价消化",
      parents: ["hbm-memory"],
      stance: "看多",
      conviction: 0.62,
      axiomStage: "feedback",
      pattern: "phase_transition",
      price: "₩1,601,000",
      chg: -6.8,
      summary: "产业卖方市场未破，Q2绝对盈利强但miss；可回调分批，不追涨。",
      events: [
        { time: "07-29", title: "Q2营收/营业利润高增但低于预期", tag: "业绩", axiom: "A2", impact: "斜率转弱",
          detail: "绝对增量仍在，相对预期转负——择时关键变量。" },
        { time: "Q2", title: "HBM4量产，约10家客户LTA", tag: "订单", axiom: "A4", impact: "实验证虚",
          detail: "虚实共振的核心证据。" },
        { time: "近月", title: "股价自高点大幅回撤，波动放大", tag: "交易", axiom: "A5", impact: "价格负反馈",
          detail: "产业与股价反馈阶段分裂（T7）。" }
      ],
      quotes: {
        indices: [
          { name: "现价", value: "₩1.60M", chg: -6.8, vol: "放量" },
          { name: "52W", value: "0.25–2.99M", chg: 0, vol: "—" },
          { name: "Forward PE", value: "~3–5x", chg: 0, vol: "压缩" },
          { name: "ADR SKHY", value: "$144", chg: -3.5, vol: "高波" }
        ],
        breadth: null,
        spark: [40, 55, 70, 90, 110, 130, 150, 160, 155, 140, 125, 120, 115, 108, 100]
      },
      metrics: [
        { name: "上下边界", value: "回调带/非极低", unit: "", lens: "stasis", hint: "远离52W高，未贴产业下沿" },
        { name: "增量持续性", value: "产业强/预期弱", unit: "", lens: "flow", hint: "delta conf≈0.68" },
        { name: "ERG", value: "+0.15", unit: "", lens: "vr", hint: "轻度错位" },
        { name: "反馈阶段", value: "产业强化/股价消化", unit: "", lens: "feedback", hint: "禁止强看多" },
        { name: "免疫", value: "PASS", unit: "", lens: "vr", hint: "公理引用齐全" }
      ],
      insights: [
        { tag: "趋势未证伪", theorem: "T2", tone: "bull", text: "持续短缺与ASP仍支持产业趋势持有逻辑。" },
        { tag: "禁止追涨", theorem: "T1/T7", tone: "warn", text: "股价层处震荡消化，分批回调介入。" },
        { tag: "证伪：ASP转负", theorem: "T3", tone: "info", text: "连续ASP环比转负则离场。" }
      ],
      decision: {
        action: "回调分批试仓/加仓",
        sizing: "15%–30% 分3批",
        entry: ["产业仍紧", "急跌后波动收敛"],
        stop: "产业证伪优先；价格纪律-18%~-25%",
        monitor: ["ASP", "云capex", "HBM份额"]
      }
    },
    "xiaomi": {
      id: "xiaomi",
      name: "小米集团-W",
      ticker: "01810.HK",
      subtitle: "手机利润承压 × 汽车交付爬坡",
      parents: ["consumer-electronics", "ev-smart"],
      stance: "中性",
      conviction: 0.58,
      axiomStage: "vr",
      pattern: "oscillation",
      price: "HK$27.4",
      chg: -4.9,
      summary: "双序参量系统：存储斜率定手机利润底，汽车交付加速度定叙事高。条件式分批，不重仓抢跑季报。",
      events: [
        { time: "Q1", title: "收入-10.9%，经调整净利-43.1%", tag: "业绩", axiom: "A2", impact: "负向",
          detail: "盈利负增量主导近端定价。" },
        { time: "7月", title: "汽车连续第4个月交付>3万，全年55万缺口仍大", tag: "交付", axiom: "A2", impact: "部分正向",
          detail: "有实增量，但未达趋势击穿盈利边界。" },
        { time: "08-18*", title: "Q2财报为关键验证窗（示意）", tag: "催化", axiom: "A4", impact: "虚实裁判",
          detail: "手机毛利止跌 + 汽车路径清晰 = 可加仓。" },
        { time: "回购", title: "推进最高200亿港元回购计划", tag: "资本", axiom: "A3", impact: "边界辅助",
          detail: "回购托底≠基本面反转。" }
      ],
      quotes: {
        indices: [
          { name: "现价", value: "HK$27.4", chg: -4.9, vol: "放量" },
          { name: "52W", value: "21.3–59.9", chg: 0, vol: "—" },
          { name: "50DMA", value: "~26.5", chg: 0, vol: "上方" },
          { name: "200DMA", value: "~34.7", chg: 0, vol: "下方" }
        ],
        breadth: null,
        spark: [160, 150, 140, 120, 100, 90, 80, 70, 65, 68, 72, 75, 78, 76, 70]
      },
      metrics: [
        { name: "价格位置", value: "中下轨", unit: "", lens: "stasis", hint: "非极值便宜" },
        { name: "手机毛利", value: "承压", unit: "~10.1%", lens: "flow", hint: "环比止跌=加仓条件" },
        { name: "汽车月销", value: ">3万", unit: "", lens: "flow", hint: "需向4-6万加速" },
        { name: "ERG", value: "修正后接近匹配", unit: "", lens: "vr", hint: "防季报前抢跑" },
        { name: "反馈阶段", value: "消化/再平衡", unit: "", lens: "feedback", hint: "熵增震荡" }
      ],
      insights: [
        { tag: "条件买入", theorem: "T1", tone: "info", text: "震荡市高抛低吸逻辑：回踩23-25或季报确认后再加。" },
        { tag: "双序参量", theorem: "A2", tone: "info", text: "存储斜率与汽车加速度同向改善才会触发趋势定理。" },
        { tag: "目标证伪", theorem: "T6", tone: "warn", text: "55万口号若落空，叙事二次坍塌风险。" }
      ],
      decision: {
        action: "条件式分批，不立刻重仓",
        sizing: "总预算10%–20%；试仓≤5%",
        entry: ["回踩23-25缩量止跌", "Q2毛利止跌+汽车路径", "站稳30再评估趋势仓"],
        stop: "破21.3或利润与交付双杀",
        monitor: ["手机毛利率", "月交付", "存储价格斜率"]
      }
    }
  }
};
