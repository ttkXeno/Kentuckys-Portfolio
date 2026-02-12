// -------------------- Menu & Form --------------------
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('active'));

document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (Hook this to backend/email service)");
});

// -------------------- Typing effect --------------------
const text = "I Design GFX and Code Discord Bots";
const typingElement = document.querySelector(".typing");
let idx = 0;
function type() {
    if (!typingElement) return;
    if (idx < text.length) {
        typingElement.textContent += text.charAt(idx++);
        setTimeout(type, 40 + Math.random() * 40);
    }
}
setTimeout(type, 600);

// -------------------- Canvas & Visual Engine --------------------
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d', { alpha: true });

let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
const DPR = Math.max(1, window.devicePixelRatio || 1);
canvas.width = W * DPR;
canvas.height = H * DPR;
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';
ctx.scale(DPR, DPR);

window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(DPR, DPR);
});

// mouse
const mouse = { x: W / 2, y: H / 2, vx: 0, vy: 0, down: false };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
});
window.addEventListener('mousedown', () => mouse.down = true);
window.addEventListener('mouseup', () => mouse.down = false);

// ---------- Utilities ----------
function rand(min, max) { return Math.random() * (max - min) + min; }
function choose(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ---------- Layers config ----------
const numOrbs = Math.round((W * H) / 50000) + 40; // dynamic density
const orbs = [];
const maxBirds = 12;
const birds = [];
const codeLines = [];
const fogLayers = [];

// ---------- Colors ----------
const palette = {
    orb: '#00bfff',
    orb2: '#7be8ff',
    code: ['#8cffc0','#aee8ff','#ffd280','#ffdbe8','#c7b3ff'],
    fog: ['rgba(3,10,18,0.55)','rgba(6,8,12,0.28)']
};

// ---------- Orbs (glowing particles) ----------
class Orb {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = rand(-50, W + 50);
        this.y = rand(-50, H + 50);
        this.r = rand(0.6, 3.4);
        this.vx = rand(-0.15, 0.15);
        this.vy = rand(-0.1, 0.1);
        this.alpha = rand(0.05, 0.5);
        this.color = Math.random() > 0.5 ? palette.orb : palette.orb2;
        this.twinkle = rand(0.002, 0.015);
    }
    update() {
        this.x += this.vx + Math.sin((this.y + performance.now()/1200) * 0.002) * 0.2;
        this.y += this.vy;
        this.alpha += (Math.sin(performance.now() * this.twinkle + this.x/100) * 0.002);
        if (this.x < -60 || this.x > W + 60 || this.y < -60 || this.y > H + 60) this.reset();
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 12);
        g.addColorStop(0, this.color);
        g.addColorStop(0.4, this.color + '30');
        g.addColorStop(1, 'rgba(10,10,12,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
for (let i = 0; i < numOrbs; i++) orbs.push(new Orb());

// ---------- Fog layers (soft parallax gradients) ----------
class Fog {
    constructor(i) {
        this.i = i;
        this.offset = rand(0, 1000);
        this.speed = 0.02 + i * 0.01;
        this.alpha = 0.04 + i * 0.02;
        this.scale = 1.2 + i * 0.25;
    }
    draw(ctx, t) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = this.alpha;
        const gradient = ctx.createLinearGradient(0, H * 0.2 + Math.sin((t + this.offset) * 0.0008) * 120, W, H);
        gradient.addColorStop(0, 'rgba(10,16,28,0.0)');
        gradient.addColorStop(0.5, 'rgba(4,12,20,0.06)');
        gradient.addColorStop(1, 'rgba(2,6,12,0.02)');
        ctx.fillStyle = gradient;
        ctx.fillRect(-50, -50 + Math.sin((t + this.offset) * this.speed) * 60, W + 100, H + 100);
        ctx.restore();
    }
}
for (let i=0; i<3; i++) fogLayers.push(new Fog(i));

// ---------- Birds (simple flapping triangles with steering) ----------
class Bird {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = rand(-60, W + 60);
        this.y = rand(H * 0.05, H * 0.7);
        const s = rand(0.6, 1.6);
        this.size = 12 * s;
        this.speed = rand(0.6, 2.2);
        this.vx = (Math.random() > 0.5 ? 1 : -1) * this.speed;
        this.vy = rand(-0.3, 0.3);
        this.wing = rand(0, Math.PI * 2);
        this.color = `rgba(240,248,255, ${rand(0.5,0.95)})`;
        this.flapSpeed = rand(0.14, 0.33);
        this.direction = this.vx >= 0 ? 1 : -1;
    }
    update() {
        // basic steering: avoid mouse if close
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
            // strong repulsion from mouse
            this.vx += (dx / dist) * 0.6;
            this.vy += (dy / dist) * 0.6;
        } else {
            // Slight wandering
            this.vx += Math.sin(performance.now() * 0.0005 + this.x) * 0.002;
            this.vy += Math.cos(performance.now() * 0.0007 + this.y) * 0.002;
        }

        // Limit speeds
        this.vx = Math.max(-3.6, Math.min(3.6, this.vx));
        this.vy = Math.max(-1.6, Math.min(1.6, this.vy));

        this.x += this.vx;
        this.y += this.vy;
        this.wing += this.flapSpeed;

        // Wrap edges to make flock continuous
        if (this.x < -140) this.x = W + rand(20,140);
        if (this.x > W + 140) this.x = -rand(20,140);
        if (this.y < 20) this.y = 20;
        if (this.y > H - 20) this.y = H - 20;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        const dir = this.vx >= 0 ? 1 : -1;
        ctx.scale(dir, 1);
        // body (soft)
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.6, 0);
        ctx.quadraticCurveTo(0, -this.size * 0.4, this.size * 0.8, 0);
        ctx.quadraticCurveTo(0, this.size * 0.4, -this.size * 0.6, 0);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.85;
        ctx.fill();

        // wings (flapping)
        const wingAngle = Math.sin(this.wing) * 0.9;
        ctx.save();
        ctx.rotate(wingAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size * 1.6, -this.size * 0.9);
        ctx.lineTo(this.size * 0.2, -this.size * 0.05);
        ctx.closePath();
        ctx.fillStyle = 'rgba(200,240,255,0.85)';
        ctx.fill();
        ctx.restore();

        // small tail
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.7, 0);
        ctx.lineTo(-this.size * 1.1, -this.size * 0.28);
        ctx.lineTo(-this.size * 1.1, this.size * 0.28);
        ctx.closePath();
        ctx.fillStyle = 'rgba(160,200,220,0.85)';
        ctx.fill();

        ctx.restore();
    }
}
for (let i = 0; i < maxBirds; i++) birds.push(new Bird());

// ---------- Floating code lines ----------
const snippetPool = [
    "for (let i=0;i<n;i++) { render(); }",
    "const bot = new Client({ intents: ['GUILDS'] })",
    "function handleTicket(ticket) { /* ... */ }",
    "await fetch('/api'); // TODO: cache",
    "if (user.isAdmin) { permit(); }",
    "const gfx = createCanvas(1024,1024);",
    "<div class='card'>Hello</div>",
    "let speed = Math.max(0.1, v);",
    "map(user => user.id).join(',')",
    "spawnVehicle('EMS', coords);",
    "console.log('hello world');",
    "setTimeout(()=>{}, 200);"
];

class CodeLine {
    constructor() {
        this.reset(true);
    }
    reset(initial=false) {
        this.text = choose(snippetPool);
        this.x = rand(0, W);
        this.y = initial ? rand(0, H) : rand(-40, -400);
        this.vy = rand(0.2, 1.1);
        this.vx = rand(-0.15, 0.15);
        this.alpha = rand(0.08, 0.9);
        this.size = Math.floor(rand(12, 20));
        this.color = choose(palette.code);
        this.rotate = rand(-0.12, 0.12);
        this.life = rand(6000, 22000); // ms
        this.birth = performance.now();
    }
    update(dt) {
        this.x += this.vx;
        this.y += this.vy + Math.sin((performance.now() + this.x) * 0.0008) * 0.2;
        if (this.y > H + 40 || this.x < -200 || this.x > W + 200) this.reset();
        // occasionally drift horizontally stronger
        if (Math.random() < 0.0008) this.vx += rand(-0.6, 0.6);
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(0.95, this.alpha));
        ctx.font = `${this.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
        // small subtle glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.restore();
    }
}
for (let i=0;i<30;i++) codeLines.push(new CodeLine());

// ---------- Connectors (random floating lines) ----------
class Connector {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = rand(0, W);
        this.y = rand(0, H);
        this.len = rand(20, 160);
        this.angle = rand(0, Math.PI * 2);
        this.speed = rand(0.001, 0.003);
        this.alpha = rand(0.03, 0.12);
        this.color = palette.orb2;
    }
    update(t) {
        this.angle += Math.sin(t * this.speed) * 0.01;
        this.x += Math.cos(this.angle) * 0.02;
        this.y += Math.sin(this.angle) * 0.02;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        const x2 = this.x + Math.cos(this.angle) * this.len;
        const y2 = this.y + Math.sin(this.angle) * this.len;
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }
}
const connectors = [];
for (let i=0;i<28;i++) connectors.push(new Connector());

// ---------- Main loop ----------
let last = performance.now();
function loop(t) {
    const dt = t - last;
    last = t;

    // clear with a subtle gradient background
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#03050a');
    g.addColorStop(0.5, '#071122');
    g.addColorStop(1, '#041018');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // fog layers (back)
    fogLayers.forEach(f => f.draw(ctx, t));

    // soft grid / connectors (very subtle)
    connectors.forEach(c => { c.update(t); c.draw(ctx); });

    // orbs
    orbs.forEach(o => { o.update(); o.draw(ctx); });

    // code lines (floating text) - draw behind birds for depth
    codeLines.forEach(cl => { cl.update(dt); cl.draw(ctx); });

    // birds draw on top
    birds.forEach(b => { b.update(); b.draw(ctx); });

    // foreground glow zone (near hero) — soft elliptical light around center
    ctx.save();
    const cx = W/2, cy = H*0.35;
    const lg = ctx.createRadialGradient(cx, cy, 40, cx, cy, Math.max(W, H) * 0.9);
    lg.addColorStop(0, 'rgba(0,191,255,0.06)');
    lg.addColorStop(0.4, 'rgba(0,191,255,0.02)');
    lg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // subtle vignette
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    const vignette = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*0.4, W/2, H/2, Math.max(W,H));
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ---------- small dynamic adjustments to keep things lively ----------
setInterval(() => {
    // occasionally add/remove code lines or birds if window size changes
    if (codeLines.length < Math.max(24, Math.round(W/80))) codeLines.push(new CodeLine());
    if (Math.random() < 0.06 && birds.length < 18) birds.push(new Bird());
    if (Math.random() < 0.06 && birds.length > 6) birds.splice(Math.floor(Math.random()*birds.length), 1);
}, 1200);

// ---------- Performance-friendly culling (when tab hidden) ----------
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // pause by stopping rendering loop using a trick: no-op
    } else {
        last = performance.now();
    }
});
