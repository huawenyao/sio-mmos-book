(() => {
  const D = window.AXIOM_BOARD_DATA;
  const state = {
    biz: "market", // market | industry | stock
    entityId: "market",
    info: "events",
    lens: "all",
    parr: "act",
    intent: ""
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  function getEntity() {
    if (state.biz === "market") return D.market;
    if (state.biz === "industry") return D.industries[state.entityId];
    return D.stocks[state.entityId];
  }

  function lensColor(id) {
    return (D.axiomLenses.find((l) => l.id === id) || {}).color || "#1a5f7a";
  }

  function chgClass(n) {
    if (n > 0) return "up";
    if (n < 0) return "down";
    return "";
  }

  function fmtChg(n) {
    if (n === 0 || n == null || Number.isNaN(n)) return "—";
    const sign = n > 0 ? "+" : "";
    return `${sign}${Number(n).toFixed(2)}%`;
  }

  /* ---------- render shells ---------- */
  function renderRails() {
    const parr = $("#parrTrack");
    parr.innerHTML = D.parrStages.map((s) => `
      <button class="parr-step ${state.parr === s.id ? "active" : ""}" data-parr="${s.id}" title="${s.desc}">
        <div class="parr-dot"></div>
        <strong>${s.label}</strong>
        <small>${s.en}</small>
      </button>
    `).join("");

    const lenses = $("#lensRow");
    lenses.innerHTML = [
      `<button class="lens ${state.lens === "all" ? "active" : ""}" data-lens="all" style="--lens-color:#142028">
        <span class="code">ALL</span>
        <span class="label">全透镜</span>
        <span class="hint">不筛选，展示完整认知切片</span>
      </button>`,
      ...D.axiomLenses.map((l) => `
        <button class="lens ${state.lens === l.id ? "active" : ""}" data-lens="${l.id}" style="--lens-color:${l.color}">
          <span class="code">${l.code}</span>
          <span class="label">${l.label}</span>
          <span class="hint">${l.prompt}</span>
        </button>
      `)
    ].join("");
  }

  function renderBizBar() {
    const entity = getEntity();
    let crumb = "市场 / 大盘";
    if (state.biz === "industry") {
      crumb = `<button data-goto-market>市场</button> / ${entity.name}`;
    } else if (state.biz === "stock") {
      const parentId = (entity.parents || [])[0];
      const parent = D.industries[parentId];
      crumb = `<button data-goto-market>市场</button> / <button data-goto-industry="${parentId}">${parent ? parent.name : "行业"}</button> / ${entity.name}`;
    }
    $("#crumb").innerHTML = crumb;

    $$(".biz-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.biz === state.biz);
    });
  }

  function renderFlow() {
    const steps = $("#flowSteps");
    steps.innerHTML = D.infoDims.map((d, i) => `
      <button class="flow-step ${state.info === d.id ? "active" : ""}" data-info="${d.id}">
        <span class="flow-num">${d.flowStep}</span>
        <span>
          <strong>${d.icon} ${d.label}</strong>
          <small>${d.desc}</small>
        </span>
      </button>
      ${i < D.infoDims.length - 1 ? '<div class="flow-connector" aria-hidden="true"></div>' : ""}
    `).join("");
  }

  function drawSpark(canvas, values) {
    if (!canvas || !values || !values.length) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = 6;
    const pts = values.map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (values.length - 1);
      const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      return [x, y];
    });

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#1a5f7a");
    grad.addColorStop(1, "#c4783a");

    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.lineTo(pts[pts.length - 1][0], h);
    ctx.lineTo(pts[0][0], h);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, 0, 0, h);
    fill.addColorStop(0, "rgba(26,95,122,0.18)");
    fill.addColorStop(1, "rgba(26,95,122,0)");
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function filterByLens(items, key = "axiom") {
    if (state.lens === "all") return items;
    const map = {
      stasis: ["A1", "A3", "T1", "T4", "T7", "T10"],
      flow: ["A2", "T2", "T3", "T8", "T9"],
      vr: ["A4", "T5", "T6"],
      feedback: ["A5", "T3", "T9"]
    };
    const keys = map[state.lens] || [];
    return items.filter((it) => {
      const raw = String(it[key] || it.theorem || it.lens || "");
      return keys.some((k) => raw.includes(k)) || (it.lens && it.lens === state.lens);
    });
  }

  function renderInfoBody(entity) {
    const body = $("#infoBody");
    const dim = D.infoDims.find((d) => d.id === state.info);

    if (state.info === "events") {
      const events = filterByLens(entity.events || []);
      body.innerHTML = events.length ? `
        <div class="event-list">
          ${events.map((e) => `
            <article class="event">
              <time>${e.time}</time>
              <div>
                <h4>${e.title}</h4>
                <p>${e.detail}</p>
              </div>
              <div class="tags">
                <span class="mini-tag">${e.tag}</span>
                <span class="mini-tag">${e.axiom}</span>
                <span class="mini-tag">${e.impact}</span>
              </div>
            </article>
          `).join("")}
        </div>
      ` : emptyState("当前透镜下暂无事件，切换透镜或信息维");
    }

    if (state.info === "quotes") {
      const q = entity.quotes || {};
      const cards = (q.indices || []).map((x) => `
        <div class="quote-card">
          <div class="name">${x.name}</div>
          <div class="val">${x.value}</div>
          <div class="chg ${chgClass(x.chg)}">${fmtChg(x.chg)} · ${x.vol || ""}</div>
        </div>
      `).join("");
      const b = q.breadth;
      body.innerHTML = `
        <div class="quote-grid">${cards}</div>
        ${b ? `<div class="breadth">
          <span>上涨 ${b.up}</span>
          <span>下跌 ${b.down}</span>
          <span>涨跌比 ${(b.ratioUp * 100).toFixed(0)}%</span>
          ${b.northbound != null ? `<span>南向净流入示意 ${b.northbound} 亿</span>` : ""}
        </div>` : ""}
        <div class="spark-wrap">
          <canvas id="sparkCanvas" height="84"></canvas>
        </div>
      `;
      requestAnimationFrame(() => drawSpark($("#sparkCanvas"), q.spark || []));
    }

    if (state.info === "metrics") {
      const metrics = entity.metrics || [];
      body.innerHTML = `
        <div class="metric-grid">
          ${metrics.map((m) => {
            const hot = state.lens === "all" || m.lens === state.lens;
            const dimmed = state.lens !== "all" && m.lens !== state.lens;
            return `
              <div class="metric ${hot && state.lens !== "all" ? "hot" : ""} ${dimmed ? "dim" : ""}" style="--lens-color:${lensColor(m.lens)}">
                <div class="m-name">${m.name}</div>
                <div class="m-val">${m.value}<small style="font-size:12px;color:var(--muted);margin-left:4px">${m.unit || ""}</small></div>
                <div class="m-hint">${m.hint || ""}</div>
                <div class="m-lens">${(D.axiomLenses.find((l) => l.id === m.lens) || {}).label || m.lens}</div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    if (state.info === "insights") {
      const insights = filterByLens(entity.insights || [], "theorem");
      body.innerHTML = insights.length ? `
        <div class="insight-list">
          ${insights.map((i) => `
            <article class="insight ${i.tone || "info"}">
              <span class="badge">${i.tag}</span>
              <div>
                <h4>${i.tag}</h4>
                <p>${i.text}</p>
                <div class="th">模式引用 · ${i.theorem}</div>
              </div>
            </article>
          `).join("")}
        </div>
      ` : emptyState("当前透镜下暂无洞察标签");
    }

    // children drill-down
    const kids = entity.children || [];
    if (kids.length) {
      const labels = kids.map((id) => {
        const ind = D.industries[id];
        const stk = D.stocks[id];
        if (ind) return { id, name: ind.name, type: "industry" };
        if (stk) return { id, name: stk.name, type: "stock" };
        return null;
      }).filter(Boolean);
      body.innerHTML += `
        <div class="children">
          <h4>业务下钻 · ${state.biz === "market" ? "进入行业/概念" : "进入个股"}</h4>
          <div class="child-row">
            ${labels.map((k) => `<button class="child-btn" data-drill="${k.type}:${k.id}">${k.name} →</button>`).join("")}
          </div>
        </div>
      `;
    }

    // stock parents alternate
    if (state.biz === "stock" && entity.parents) {
      body.innerHTML += `
        <div class="children">
          <h4>关联行业（可回跳）</h4>
          <div class="child-row">
            ${entity.parents.map((pid) => {
              const p = D.industries[pid];
              return `<button class="child-btn" data-drill="industry:${pid}">${p ? p.name : pid}</button>`;
            }).join("")}
          </div>
        </div>
      `;
    }

    $("#infoDimLabel").textContent = dim ? `${dim.label} · Step ${dim.flowStep}/4` : "";
  }

  function emptyState(msg) {
    return `<p style="color:var(--muted);font-size:13px;padding:24px 8px">${msg}</p>`;
  }

  function renderDecision(entity) {
    const box = $("#decisionBody");
    const stance = entity.stance || "—";
    const conv = entity.conviction != null ? entity.conviction : "—";
    const d = entity.decision;

    if (!d) {
      box.innerHTML = `
        <div class="decision-stance">${stance}</div>
        <div class="decision-conv">层级研判 · 继续下钻至个股生成决策锚点</div>
        <div class="decision-block">
          <h5>当前层任务</h5>
          <p>${entity.summary || ""}</p>
        </div>
        <div class="decision-block">
          <h5>建议下一步</h5>
          <p>沿数据流完成「事件→行情→指标→洞察」后，下钻到具体标的输出仓位与证伪条件。</p>
        </div>
      `;
      return;
    }

    box.innerHTML = `
      <div class="decision-stance">${stance}</div>
      <div class="decision-conv">conviction ${conv} · <span class="immune">IMMUNE PASS</span></div>
      <div class="decision-block">
        <h5>主操作</h5>
        <p>${d.action}</p>
      </div>
      <div class="decision-block">
        <h5>仓位</h5>
        <p>${d.sizing}</p>
      </div>
      <div class="decision-block">
        <h5>介入条件</h5>
        <ul>${(d.entry || []).map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      <div class="decision-block">
        <h5>止损 / 证伪</h5>
        <p>${d.stop}</p>
      </div>
      <div class="decision-block">
        <h5>监控</h5>
        <p>${(d.monitor || []).join(" · ")}</p>
      </div>
    `;
  }

  function renderWorkspace() {
    const entity = getEntity();
    if (!entity) return;

    const priceLine = entity.price
      ? `<span class="chip mono">${entity.ticker || ""}</span>
         <span class="chip mono">${entity.price}</span>
         <span class="chip ${entity.chg < 0 ? "bear" : entity.chg > 0 ? "bull" : "neutral"}">${fmtChg(entity.chg)}</span>`
      : "";

    $("#entityHead").innerHTML = `
      <div class="eyebrow">${state.biz === "market" ? "L5 市场层" : state.biz === "industry" ? "L4 行业/概念层" : "L2–L4 个股层"}</div>
      <h2>${entity.name}</h2>
      <p class="sub">${entity.subtitle || ""}</p>
      <div class="entity-meta">
        <span class="chip ${/空|谨慎/.test(entity.stance) ? "bear" : /多/.test(entity.stance) ? "bull" : "neutral"}">${entity.stance}</span>
        <span class="chip mono">${entity.pattern || ""}</span>
        <span class="chip mono">透镜焦点 · ${(D.axiomLenses.find((l) => l.id === entity.axiomStage) || {}).label || entity.axiomStage}</span>
        ${priceLine}
      </div>
    `;
    $("#entitySummary").textContent = entity.summary || "";

    $$(".info-tab").forEach((t) => t.classList.toggle("active", t.dataset.info === state.info));
    renderInfoBody(entity);
    renderDecision(entity);
  }

  function renderAll() {
    $("#asOf").textContent = D.meta.asOf;
    $("#session").textContent = D.meta.marketSession;
    renderRails();
    renderBizBar();
    renderFlow();
    renderWorkspace();
  }

  /* ---------- interactions ---------- */
  function goMarket() {
    state.biz = "market";
    state.entityId = "market";
    state.parr = "plan";
    renderAll();
  }

  function goIndustry(id) {
    if (!D.industries[id]) return;
    state.biz = "industry";
    state.entityId = id;
    state.parr = "act";
    renderAll();
  }

  function goStock(id) {
    if (!D.stocks[id]) return;
    state.biz = "stock";
    state.entityId = id;
    state.parr = "decide";
    state.info = "insights";
    renderAll();
  }

  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-parr],[data-lens],[data-info],[data-biz],[data-drill],[data-goto-market],[data-goto-industry]");
      if (!t) return;

      if (t.dataset.parr) {
        state.parr = t.dataset.parr;
        // soft link parr to info dim
        const map = { intent: "events", plan: "metrics", act: "quotes", reflect: "insights", decide: "insights" };
        if (map[state.parr]) state.info = map[state.parr];
        renderAll();
      }
      if (t.dataset.lens) {
        state.lens = t.dataset.lens;
        renderAll();
      }
      if (t.dataset.info) {
        state.info = t.dataset.info;
        renderAll();
      }
      if (t.dataset.biz) {
        const biz = t.dataset.biz;
        if (biz === "market") goMarket();
        if (biz === "industry") {
          // default to first industry under market
          const first = (D.market.children || [])[0] || "hbm-memory";
          goIndustry(state.biz === "industry" ? state.entityId : first);
        }
        if (biz === "stock") {
          const cur = getEntity();
          const child = (cur.children || [])[0];
          if (state.biz === "stock") renderAll();
          else if (child && D.stocks[child]) goStock(child);
          else if (child && D.industries[child]) {
            const stk = (D.industries[child].children || [])[0];
            if (stk) goStock(stk);
          } else goStock("xiaomi");
        }
      }
      if (t.dataset.drill) {
        const [type, id] = t.dataset.drill.split(":");
        if (type === "industry") goIndustry(id);
        if (type === "stock") goStock(id);
      }
      if (t.hasAttribute("data-goto-market")) goMarket();
      if (t.dataset.gotoIndustry) goIndustry(t.dataset.gotoIndustry);
    });

    $("#intentForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const q = $("#intentInput").value.trim();
      state.intent = q;
      state.parr = "intent";
      // naive router for demo
      if (/海力士|hynix|HBM|存储/i.test(q)) {
        goStock("sk-hynix");
        state.info = "events";
        state.parr = "act";
      } else if (/小米|xiaomi|01810/i.test(q)) {
        goStock("xiaomi");
        state.info = "events";
        state.parr = "act";
      } else if (/汽车|新能源|EV/i.test(q)) {
        goIndustry("ev-smart");
      } else if (/手机|消费电子/i.test(q)) {
        goIndustry("consumer-electronics");
      } else {
        goMarket();
        state.info = "events";
      }
      renderAll();
      $("#intentHint").textContent = q
        ? `已解构意图：「${q}」→ 路由至当前业务层并激活研究循环`
        : "";
    });

    window.addEventListener("resize", () => {
      const entity = getEntity();
      if (state.info === "quotes" && entity?.quotes?.spark) {
        drawSpark($("#sparkCanvas"), entity.quotes.spark);
      }
    });
  }

  bind();
  renderAll();
})();
