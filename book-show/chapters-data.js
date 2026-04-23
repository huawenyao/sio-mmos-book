// 章节数据 - 包含每个章节的详细内容和交互元素
const chaptersData = {
  ch1: {
    title: "系统存在论", volume: "第一卷", concept: "SIO三元结构",
    coreIdea: "存在不是静态的实体，而是动态的过程；不是孤立的个体，而是关系网络中的节点",
    keyPoints: [
      { title: "实体本体论的危机", desc: "量子纠缠挑战局域实在论" },
      { title: "笛卡尔二元论的困境", desc: "思维与物质的鸿沟" },
      { title: "SIO本体论", desc: "主体-互动-客体的三元结构" }
    ],
    diagram: { type: "triangle", elements: ["主体", "互动", "客体"] },
    quote: "局域实在论是错误的。不存在完全独立于观测的实体。",
    applications: ["量子力学解释", "认知科学研究", "AI哲学基础"]
  },
  ch2: {
    title: "系统生成论", volume: "第一卷", concept: "从存在到生成",
    coreIdea: "存在不是给定的本质，而是持续生成的历史",
    keyPoints: [
      { title: "过程哲学", desc: "从静态存在到动态过程" },
      { title: "涌现性", desc: "整体大于部分之和" },
      { title: "自组织", desc: "无中心控制下的秩序生成" }
    ],
    diagram: { type: "flow", elements: ["存在→过程→生成"] },
    quote: "过程是实在的本质，存在是过程的结晶。",
    applications: ["复杂系统演化", "生命起源研究", "社会组织变革"]
  },
  ch3: {
    title: "认知结构", volume: "第一卷", concept: "认知主体性",
    coreIdea: "认知是主体、工具、世界在三元互动中共同生成意义的过程",
    keyPoints: [
      { title: "具身认知", desc: "认知涉及身体、环境和大脑" },
      { title: "延展认知", desc: "认知延展于世界之中" },
      { title: "分布式认知", desc: "认知分布于社会和技术系统" }
    ],
    diagram: { type: "network", elements: ["大脑-身体-环境-工具-社会"] },
    quote: "心智不是封闭于头骨中的实体，而是延展于世界中的过程。",
    applications: ["人机交互设计", "教育方法创新", "AI认知架构"]
  },
  ch4: {
    title: "时间性与过程", volume: "第一卷", concept: "复杂系统的时间维度",
    coreIdea: "时间不是外在的参数，而是系统内在的构成维度",
    keyPoints: [
      { title: "时间方向性", desc: "熵增与时间箭头" },
      { title: "多重时间尺度", desc: "不同层次的时间性" },
      { title: "历史性", desc: "系统演化依赖历史路径" }
    ],
    diagram: { type: "spiral", elements: ["过去→现在→未来"] },
    quote: "时间是存在展开的维度，历史是系统生成的轨迹。",
    applications: ["系统预测", "演化分析", "决策时域"]
  },
  ch5: {
    title: "价值与规范", volume: "第一卷", concept: "系统价值论",
    coreIdea: "价值是在SIO系统中生成的，不是主观偏好或客观属性",
    keyPoints: [
      { title: "价值涌现", desc: "价值如何从复杂系统涌现" },
      { title: "规范性基础", desc: "伦理规范的系统论基础" },
      { title: "责任归属", desc: "多智能体系统中的责任分配" }
    ],
    diagram: { type: "balance", elements: ["事实-价值-规范"] },
    quote: "从实然到应然的桥梁，在于系统价值的涌现机制。",
    applications: ["AI伦理", "治理设计", "组织文化"]
  },
  ch6: {
    title: "系统科学方法论", volume: "第二卷", concept: "整体论与还原论的整合",
    coreIdea: "真正的系统方法论是还原论与整体论的辩证综合",
    keyPoints: [
      { title: "还原论方法", desc: "分析、分解、简化" },
      { title: "整体论方法", desc: "综合、整合、情境" },
      { title: "整合方法论", desc: "多尺度、多层次整合" }
    ],
    diagram: { type: "cycle", elements: ["分析→综合→验证→应用"] },
    quote: "分析方法揭示机制，综合方法把握整体。",
    applications: ["跨学科研究", "复杂问题解决", "系统设计"]
  },
  ch7: {
    title: "网络科学方法", volume: "第二卷", concept: "复杂网络分析",
    coreIdea: "网络是复杂系统的通用语言",
    keyPoints: [
      { title: "网络拓扑", desc: "小世界、无标度、社区结构" },
      { title: "网络动力学", desc: "传播、同步、级联失效" },
      { title: "网络干预", desc: "关键节点识别与影响最大化" }
    ],
    diagram: { type: "network", elements: ["节点-边-权重-社区"] },
    quote: "网络思维是从还原论到系统论的关键桥梁。",
    applications: ["社交网络分析", "基础设施保护", "流行病预测"]
  },
  ch8: {
    title: "计算社会科学", volume: "第二卷", concept: "社会模拟与数字实验",
    coreIdea: "计算成为理解社会的新工具：模拟、预测、干预",
    keyPoints: [
      { title: "Agent建模", desc: "从微观规则到宏观涌现" },
      { title: "社会仿真", desc: "虚拟社会作为实验室" },
      { title: "数字实验", desc: "大数据驱动的假设检验" }
    ],
    diagram: { type: "simulation", elements: ["Agent-规则-涌现"] },
    quote: "用代码理解社会，用模拟预见未来。",
    applications: ["政策模拟", "市场预测", "社会实验"]
  },
  ch9: {
    title: "复杂性度量", volume: "第二卷", concept: "量化复杂性",
    coreIdea: "复杂性可以度量，但需要多维度指标体系",
    keyPoints: [
      { title: "信息熵", desc: "不确定性程度的度量" },
      { title: "网络复杂度", desc: "结构和拓扑复杂性" },
      { title: "算法复杂度", desc: "计算和描述复杂性" }
    ],
    diagram: { type: "metrics", elements: ["熵-网络-算法"] },
    quote: "度量是科学的基础，复杂性度量是复杂科学的基础。",
    applications: ["系统评估", "风险度量", "决策优化"]
  },
  ch10: {
    title: "跨学科整合", volume: "第二卷", concept: "统一方法论框架",
    coreIdea: "SIO本体论为跨学科研究提供统一框架和语言",
    keyPoints: [
      { title: "概念映射", desc: "不同学科概念的对应关系" },
      { title: "方法迁移", desc: "方法从一个领域移植到另一个领域" },
      { title: "理论综合", desc: "跨学科理论框架构建" }
    ],
    diagram: { type: "bridge", elements: ["学科A-SIO框架-学科B"] },
    quote: "学科边界是人为的，问题是真实的，方法是共通的。",
    applications: ["跨学科研究", "创新方法论", "复杂问题解决"]
  },
  ch11: {
    title: "多智能体系统", volume: "第三卷", concept: "MAS架构与设计模式",
    coreIdea: "从单体智能到群体智能：分布式自主系统设计原理",
    keyPoints: [
      { title: "Agent架构", desc: "BDI、反应式、混合式架构" },
      { title: "通信协议", desc: "ACL、合同网、协商机制" },
      { title: "协调机制", desc: "合作、竞争、博弈均衡" }
    ],
    diagram: { type: "multi-agent", elements: ["Agent1-Agent2-环境"] },
    quote: "群体智能涌现于简单规则的交互，而非中心控制的设计。",
    applications: ["智能交通", "电网调度", "机器人集群"]
  },
  ch12: {
    title: "社会模拟与数字孪生", volume: "第三卷", concept: "数字镜像世界",
    coreIdea: "用数字孪生技术构建社会系统镜像，实现预测与干预",
    keyPoints: [
      { title: "社会仿真", desc: "人工社会的构建与演化" },
      { title: "数字孪生", desc: "物理系统的实时数字映射" },
      { title: "预测干预", desc: "基于仿真的决策支持" }
    ],
    diagram: { type: "mirror", elements: ["物理世界-数字世界"] },
    quote: "数字孪生：在虚拟世界中试验，在现实世界中实施。",
    applications: ["城市规划", "应急管理", "政策评估"]
  },
  ch13: {
    title: "认知架构", volume: "第三卷", concept: "认知智能体设计",
    coreIdea: "构建具有认知能力的智能体：感知、推理、学习、决策",
    keyPoints: [
      { title: "感知系统", desc: "多模态感知与情境理解" },
      { title: "推理引擎", desc: "知识表示与逻辑推理" },
      { title: "学习机制", desc: "在线学习与适应性改进" }
    ],
    diagram: { type: "cognitive", elements: ["感知-推理-学习-行动"] },
    quote: "认知架构是通用人工智能的基石。",
    applications: ["智能助手", "自主系统", "决策支持"]
  },
  ch14: {
    title: "人机协同", volume: "第三卷", concept: "混合智能系统",
    coreIdea: "人机协同是优势互补的混合智能",
    keyPoints: [
      { title: "任务分配", desc: "基于能力的人机任务分工" },
      { title: "交互设计", desc: "自然直观的人机交互界面" },
      { title: "信任建立", desc: "可解释性与信任校准" }
    ],
    diagram: { type: "hybrid", elements: ["人类-AI-环境"] },
    quote: "最好的人机协同是人与AI共同完成任何一方都无法单独完成的事。",
    applications: ["医疗诊断", "创意设计", "复杂决策"]
  },
  ch15: {
    title: "智能社会生态", volume: "第三卷", concept: "系统工程设计",
    coreIdea: "智能社会生态系统是技术、组织、制度的协同演化",
    keyPoints: [
      { title: "系统架构", desc: "多层次、多尺度的系统设计" },
      { title: "演化路径", desc: "技术推动与需求拉动的协同" },
      { title: "治理框架", desc: "适应性治理与迭代优化" }
    ],
    diagram: { type: "ecosystem", elements: ["技术-组织-制度-文化"] },
    quote: "智能社会的构建是系统工程，更是生态培育。",
    applications: ["智慧城市", "产业生态", "数字治理"]
  },
  appA: {
    title: "分析框架模板", volume: "实践指南", concept: "SIO五维分析工具",
    coreIdea: "结构化的分析框架，用于系统性分析复杂问题",
    keyPoints: [
      { title: "结构维度", desc: "系统构成要素及其关系" },
      { title: "整合维度", desc: "要素之间的协同与整合机制" },
      { title: "生成维度", desc: "系统演化路径与未来状态" }
    ],
    diagram: { type: "template", elements: ["输入-分析-输出"] },
    quote: "好的分析框架让思考更系统，让决策更科学。",
    applications: ["问题分析", "方案设计", "决策支持"]
  },
  appB: {
    title: "研究设计检查清单", volume: "实践指南", concept: "完整性验证工具",
    coreIdea: "确保研究设计的完整性和系统性",
    keyPoints: [
      { title: "问题界定", desc: "研究问题的清晰定义" },
      { title: "方法选择", desc: "方法与研究问题的匹配" },
      { title: "效度检验", desc: "内部效度与外部效度" }
    ],
    diagram: { type: "checklist", elements: ["问题-方法-验证"] },
    quote: "检查清单是复杂任务的认知脚手架。",
    applications: ["研究设计", "项目评审", "质量控制"]
  },
  appC: {
    title: "工程实施指南", volume: "实践指南", concept: "项目落地方法论",
    coreIdea: "从理论到实践的桥梁，确保工程成功落地",
    keyPoints: [
      { title: "需求分析", desc: "利益相关者需求收集与分析" },
      { title: "方案设计", desc: "技术方案与实施路径" },
      { title: "迭代优化", desc: "敏捷开发与持续改进" }
    ],
    diagram: { type: "process", elements: ["需求-设计-实施-优化"] },
    quote: "工程实施是将知识转化为价值的关键环节。",
    applications: ["系统开发", "项目实施", "产品迭代"]
  },
  appD: {
    title: "案例研究库", volume: "实践指南", concept: "典型应用案例集",
    coreIdea: "精选典型案例，提供实践参考",
    keyPoints: [
      { title: "案例选择", desc: "代表性案例的筛选标准" },
      { title: "分析框架", desc: "统一的案例分析框架" },
      { title: "经验提炼", desc: "从案例中提炼普适原则" }
    ],
    diagram: { type: "cases", elements: ["案例-分析-经验"] },
    quote: "案例是连接理论与实践的桥梁。",
    applications: ["学习培训", "方案借鉴", "研究素材"]
  },
  appE: {
    title: "数字工具包", volume: "实践指南", concept: "可操作的软件工具",
    coreIdea: "配套的数字化工具，支持SIO方法论的实际应用",
    keyPoints: [
      { title: "建模工具", desc: "系统建模与仿真平台" },
      { title: "分析工具", desc: "数据分析与可视化" },
      { title: "协作平台", desc: "团队协作与知识管理" }
    ],
    diagram: { type: "tools", elements: ["建模-分析-协作"] },
    quote: "工欲善其事，必先利其器。",
    applications: ["系统建模", "数据分析", "团队协作"]
  }
};
