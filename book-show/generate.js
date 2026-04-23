const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SIO-MMOS丛书 | 认知-行动操作系统</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--p:#0a0a0f;--s:#12121a;--g1:linear-gradient(135deg,#667eea,#764ba2);--g2:linear-gradient(135deg,#f093fb,#f5576c);--g3:linear-gradient(135deg,#4facfe,#00f2fe);--g4:linear-gradient(135deg,#43e97b,#38f9d7);--tl:#fff;--tm:rgba(255,255,255,.7);--cb:rgba(255,255,255,.03);--ch:rgba(255,255,255,.06);--br:rgba(255,255,255,.08)}
html{scroll-behavior:smooth}
body{font-family:'Noto Sans SC',sans-serif;background:var(--p);color:var(--tl);line-height:1.7}
nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:1rem 2rem;background:rgba(10,10,15,.9);backdrop-filter:blur(20px);border-bottom:1px solid var(--br);display:flex;justify-content:space-between;align-items:center}
.logo{font-family:'Noto Serif SC',serif;font-size:1.4rem;font-weight:700;background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.links{display:flex;gap:2rem;list-style:none}
.links a{color:var(--tm);text-decoration:none;font-size:.9rem;transition:.3s}
.links a:hover{color:var(--tl)}
.cta{padding:.6rem 1.5rem;background:var(--g1);border:none;border-radius:50px;color:#fff;font-weight:600;cursor:pointer;transition:.3s}
.cta:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(102,126,234,.3)}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;padding:6rem 2rem 4rem;text-align:center;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(102,126,234,.15),transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(240,147,251,.1),transparent 40%),radial-gradient(ellipse at 60% 80%,rgba(67,233,123,.1),transparent 40%)}
.content{position:relative;z-index:1;max-width:850px}
.badge{display:inline-block;padding:.5rem 1.25rem;background:var(--cb);border:1px solid var(--br);border-radius:50px;font-size:.85rem;color:#ff6b6b;margin-bottom:1.5rem}
.badge::before{content:'◆ ';color:#ffd700}
h1{font-family:'Noto Serif SC',serif;font-size:clamp(2.2rem,5vw,3.5rem);font-weight:700;line-height:1.25;margin-bottom:1.25rem}
h1 span{background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.subtitle{font-size:clamp(1rem,2vw,1.2rem);color:var(--tm);max-width:600px;margin:0 auto 2rem}
.btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{padding:.9rem 1.8rem;border-radius:50px;font-weight:600;cursor:pointer;transition:.3s;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem}
.btn-p{background:var(--g1);color:#fff;border:none}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 12px 35px rgba(102,126,234,.4)}
.btn-s{background:transparent;color:var(--tl);border:1px solid var(--br)}
.btn-s:hover{background:var(--cb)}
.sec{padding:5rem 2rem;position:relative}
.box{max-width:1200px;margin:0 auto}
.hd{text-align:center;margin-bottom:3rem}
.tag{display:inline-block;padding:.25rem 1rem;background:var(--cb);border:1px solid var(--br);border-radius:50px;font-size:.7rem;color:#667eea;letter-spacing:2px;margin-bottom:.75rem}
.hd h2{font-family:'Noto Serif SC',serif;font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:.5rem}
.hd p{color:var(--tm);max-width:500px;margin:0 auto}
.dark{background:var(--s)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem}
.card{background:var(--cb);border:1px solid var(--br);border-radius:16px;padding:1.75rem;transition:.3s;text-align:center}
.card:hover{background:var(--ch);transform:translateY(-4px)}
.icon{font-size:2.5rem;margin-bottom:.75rem}
.card h3{font-size:1.1rem;margin-bottom:.4rem;background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.card p{color:var(--tm);font-size:.9rem}
.arch{display:flex;flex-direction:column;gap:1rem;max-width:800px;margin:0 auto}
.layer{display:flex;align-items:center;gap:1.5rem;padding:1.25rem 1.5rem;background:var(--cb);border:1px solid var(--br);border-radius:12px;transition:.3s}
.layer:hover{background:var(--ch);transform:translateX(8px)}
.layer .lbl{font-family:'Noto Serif SC',serif;font-size:1.5rem;font-weight:700;min-width:50px;text-align:center}
.layer.dao .lbl{color:#667eea}
.layer.fa .lbl{color:#f093fb}
.layer.shu .lbl{color:#4facfe}
.layer.shi .lbl{color:#43e97b}
.layer.qi .lbl{color:#fa709a}
.layer h3{font-size:1.05rem;margin-bottom:.25rem}
.layer p{color:var(--tm);font-size:.85rem}
.layer small{color:var(--tm);font-size:.75rem;opacity:.7}
.inno{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
.ino{background:var(--cb);border:1px solid var(--br);border-radius:16px;padding:1.5rem;transition:.3s}
.ino:hover{background:var(--ch)}
.ino h3{font-size:1rem;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}
.ino .old{color:#ff6b6b;font-size:.85rem;margin-bottom:.25rem}
.ino .new{color:#43e97b;font-size:.85rem}
.ino .arrow{text-align:center;color:var(--tm);font-size:1.5rem;margin:.5rem 0}
.hl{background:var(--s);padding:4rem 2rem}
.hlbox{max-width:1000px;margin:0 auto}
.hlcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem}
.hlc{background:var(--cb);border:1px solid var(--br);border-radius:16px;padding:1.5rem;text-align:center;transition:.3s}
.hlc:hover{background:var(--ch);transform:scale(1.02)}
.hlc h3{font-size:1rem;margin-bottom:.5rem;background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hlc p{color:var(--tm);font-size:.85rem;margin-bottom:.75rem}
.hlc .price{font-size:1.5rem;font-weight:700;color:#ffd700;margin-bottom:.5rem}
.hlc ul{text-align:left;list-style:none;font-size:.8rem;color:var(--tm)}
.hlc li{padding:.25rem 0}
.hlc li::before{content:'✓ ';color:#43e97b}
footer{background:var(--s);padding:3rem 2rem;text-align:center;border-top:1