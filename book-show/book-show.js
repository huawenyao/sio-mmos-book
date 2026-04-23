// ====== Hero粒子网络动画 ======
const heroCanvas = document.getElementById('heroCanvas');
const ctx = heroCanvas.getContext('2d');
let particles = [];
let mouse = {x: null, y: null};

function resizeHeroCanvas() {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = this.getRandomColor();
        this.alpha = Math.random() * 0.5 + 0.2;
    }
    
    getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > heroCanvas.width) this.x = 0;
        if (this.x < 0) this.x = heroCanvas.width;
        if (this.y > heroCanvas.height) this.y = 0;
        if (this.y < 0) this.y = heroCanvas.height;
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    particles = [];
    const numParticles = Math.min(80, (heroCanvas.width * heroCanvas.height) / 15000);
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.globalAlpha = (120 - dist) / 120 * 0.15;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animateHero() {
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateHero);
}

resizeHeroCanvas();
initParticles();
animateHero();

window.addEventListener('resize', () => { resizeHeroCanvas(); initParticles(); });
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

// ====== 知识图谱动画 ======
const kgCanvas = document.getElementById('kgCanvas');
const kgCtx = kgCanvas.getContext('2d');

const concepts = [
    {id:'SIO', label:'SIO本体论', x:0.5, y:0.3, color:'#667eea', layer:1},
    {id:'subject', label:'主体', x:0.3, y:0.5, color:'#667eea', layer:1},
    {id:'interaction', label:'互动', x:0.5, y:0.5, color:'#667eea', layer:1},
    {id:'object', label:'客体', x:0.7, y:0.5, color:'#667eea', layer:1},
    {id:'emergence', label:'涌现性', x:0.2, y:0.7, color:'#f093fb', layer:2},
    {id:'network', label:'网络科学', x:0.4, y:0.7, color:'#f093fb', layer:2},
    {id:'complexity', label:'复杂性度量', x:0.6, y:0.7, color:'#f093fb', layer:2},
    {id:'simulation', label:'社会模拟', x:0.8, y:0.7, color:'#f093fb', layer:2},
    {id:'agent', label:'智能体', x:0.3, y:0.85, color:'#4facfe', layer:3},
    {id:'mas', label:'MAS架构', x:0.5, y:0.85, color:'#4facfe', layer:3},
    {id:'cognitive', label:'认知架构', x:0.7, y:0.85, color:'#4facfe', layer:3}
];

const links = [
    {from:'SIO', to:'subject'}, {from:'SIO', to:'interaction'}, {from:'SIO', to:'object'},
    {from:'subject', to:'emergence'}, {from:'interaction', to:'network'}, {from:'object', to:'complexity'},
    {from:'emergence', to:'agent'}, {from:'network', to:'mas'}, {from:'complexity', to:'cognitive'},
    {from:'simulation', to:'mas'}, {from:'subject', to:'agent'}
];

function resizeKGCanvas() {
    const container = kgCanvas.parentElement;
    kgCanvas.width = container.clientWidth;
    kgCanvas.height = container.clientHeight;
}

function drawKnowledgeGraph(time) {
    kgCtx.clearRect(0, 0, kgCanvas.width, kgCanvas.height);
    
    // 绘制连接线
    links.forEach(link => {
        const from = concepts.find(c => c.id === link.from);
        const to = concepts.find(c => c.id === link.to);
        const fx = from.x * kgCanvas.width;
        const fy = from.y * kgCanvas.height;
        const tx = to.x * kgCanvas.width;
        const ty = to.y * kgCanvas.height;
        
        kgCtx.beginPath();
        kgCtx.moveTo(fx, fy);
        kgCtx.lineTo(tx, ty);
        kgCtx.strokeStyle = `rgba(255,255,255,0.1)`;
        kgCtx.lineWidth = 1;
        kgCtx.stroke();
        
        // 动态光点
        const progress = (Math.sin(time * 0.001 + from.x * 10) + 1) / 2;
        const px = fx + (tx - fx) * progress;
        const py = fy + (ty - fy) * progress;
        kgCtx.beginPath();
        kgCtx.arc(px, py, 2, 0, Math.PI * 2);
        kgCtx.fillStyle = from.color;
        kgCtx.fill();
    });
    
    // 绘制节点
    concepts.forEach(c => {
        const x = c.x * kgCanvas.width;
        const y = c.y * kgCanvas.height;
        const pulse = Math.sin(time * 0.002 + c.x * 5) * 3;
        
        // 光晕
        const gradient = kgCtx.createRadialGradient(x, y, 0, x, y, 30 + pulse);
        gradient.addColorStop(0, c.color + '40');
        gradient.addColorStop(1, 'transparent');
        kgCtx.beginPath();
        kgCtx.arc(x, y, 30 + pulse, 0, Math.PI * 2);
        kgCtx.fillStyle = gradient;
        kgCtx.fill();
        
        // 节点
        kgCtx.beginPath();
        kgCtx.arc(x, y, 8, 0, Math.PI * 2);
        kgCtx.fillStyle = c.color;
        kgCtx.fill();
        
        // 标签
        kgCtx.font = '12px "Noto Sans SC"';
        kgCtx.fillStyle = '#fff';
        kgCtx.textAlign = 'center';
        kgCtx.fillText(c.label, x, y - 15);
    });
    
    requestAnimationFrame(drawKnowledgeGraph);
}

resizeKGCanvas();
requestAnimationFrame(drawKnowledgeGraph);
window.addEventListener('resize', resizeKGCanvas);

// ====== 章节Tab切换 ======
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ====== 书籍悬停动画 ======
const bookItems = document.querySelectorAll('.book-item');
bookItems.forEach(book => {
    book.addEventListener('mouseenter', function() {
        bookItems.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// ====== 架构层动画 ======
const archLayers = document.querySelectorAll('.arch-layer');
const layerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {threshold: 0.2});

archLayers.forEach(layer => {
    layer.style.opacity = '0';
    layer.style.transform = 'translateY(30px)';
    layer.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    layerObserver.observe(layer);
});

// ====== 阅读旅程动画 ======
const journeyNodes = document.querySelectorAll('.journey-node');
const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const step = entry.target.dataset.step;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, step * 150);
        }
    });
}, {threshold: 0.3});

journeyNodes.forEach(node => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(40px)';
    node.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    journeyObserver.observe(node);
});

// ====== 章节卡片动画 ======
const chapterCards = document.querySelectorAll('.chapter-card');
chapterCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ====== 导航栏滚动效果 ======
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.padding = '0.75rem 2rem';
        nav.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        nav.style.padding = '1rem 2rem';
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    }
});

// ====== 章节详情模态框 ======
document.querySelectorAll('.chapter-card').forEach(card => {
    card.addEventListener('click', () => {
        const chNum = card.querySelector('.ch-num').textContent;
        const chapterId = getChapterId(chNum);
        if (chapterId && chaptersData[chapterId]) {
            openModal(chaptersData[chapterId]);
        }
    });
});

function getChapterId(chNum) {
    const map = {
        '第1章': 'ch1', '第2章': 'ch2', '第3章': 'ch3', '第4章': 'ch4', '第5章': 'ch5',
        '第6章': 'ch6', '第7章': 'ch7', '第8章': 'ch8', '第9章': 'ch9', '第10章': 'ch10',
        '第11章': 'ch11', '第12章': 'ch12', '第13章': 'ch13', '第14章': 'ch14', '第15章': 'ch15',
        '附录A': 'appA', '附录B': 'appB', '附录C': 'appC', '附录D': 'appD', '附录E': 'appE'
    };
    return map[chNum];
}

function openModal(data) {
    document.getElementById('modalVol').textContent = data.volume;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalConcept').textContent = data.concept;
    document.getElementById('modalCoreIdea').textContent = data.coreIdea;
    document.getElementById('modalQuote').textContent = data.quote;
    
    const keyPointsList = document.getElementById('modalKeyPoints');
    keyPointsList.innerHTML = data.keyPoints.map(p => 
        `<li><strong>${p.title}</strong><span>${p.desc}</span></li>`
    ).join('');
    
    const appsContainer = document.getElementById('modalApps');
    appsContainer.innerHTML = data.applications.map(a => `<span>${a}</span>`).join('');
    
    document.getElementById('chapterModal').classList.add('active');
    setTimeout(() => drawDiagram(data.diagram), 100);
}

function closeModal() {
    document.getElementById('chapterModal').classList.remove('active');
}

function drawDiagram(diagram) {
    const canvas = document.getElementById('diagramCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 400;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.offsetWidth;
    const h = 200;
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    
    if (diagram.type === 'triangle') {
        const cx = w / 2, cy = h / 2, r = 60;
        const points = [{x: cx, y: cy - r}, {x: cx - r * 0.866, y: cy + r * 0.5}, {x: cx + r * 0.866, y: cy + r * 0.5}];
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.stroke();
        diagram.elements.forEach((el, i) => {
            ctx.fillStyle = '#fff';
            ctx.font = '14px Noto Sans SC';
            ctx.textAlign = 'center';
            ctx.fillText(el, points[i].x, points[i].y + (i === 0 ? -10 : 20));
        });
    } else {
        const parts = diagram.elements[0].split(/[-→]/);
        const startX = (w - (parts.length - 1) * 100) / 2;
        parts.forEach((part, i) => {
            const x = startX + i * 100;
            ctx.beginPath();
            ctx.arc(x, h/2, 35, 0, Math.PI * 2);
            ctx.fillStyle = colors[i % colors.length] + '33';
            ctx.fill();
            ctx.strokeStyle = colors[i % colors.length];
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = '12px Noto Sans SC';
            ctx.textAlign = 'center';
            ctx.fillText(part, x, h/2 + 4);
            if (i < parts.length - 1) {
                ctx.beginPath();
                ctx.moveTo(x + 40, h/2);
                ctx.lineTo(x + 60, h/2);
                ctx.strokeStyle = '#667eea';
                ctx.stroke();
            }
        });
    }
}

document.getElementById('chapterModal').addEventListener('click', (e) => {
    if (e.target.id === 'chapterModal') closeModal();
});

console.log('SIO-MMOS Book Show initialized');
