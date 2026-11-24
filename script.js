(()=>{
const D=DATA.clients,$=s=>document.querySelector(s),U=encodeURI,E=n=>`assets/christmas-elements/${n}.png`;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const chev='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.5 4l6 6-6 6"/></svg>';
const img=(n,c='',s='')=>`<img class="${c}" src="${E(n)}" alt="" style="${s}">`;
function lights(){const S=6,N=46,col=['#CC9254','#e0505f','#8fd0b0','#CC9254'],Y=x=>6+24*Math.sin(Math.PI*((x*S)%1));let p='',s='';
 for(let i=0;i<=120;i++){const x=i/120;p+=(i?'L':'M')+(x*100).toFixed(2)+','+(i===120?6:Y(x)).toFixed(1)}
 for(let i=0;i<N;i++){const x=(i+.5)/N;s+=`<i style="left:${x*100}%;top:${Y(x)}px;--c:${col[i%4]};--d:${i*60}"></i>`}
 return `<div class="lights"><svg viewBox="0 0 100 46" preserveAspectRatio="none"><path d="${p}" fill="none" stroke="#CC9254" stroke-opacity=".55" vector-effect="non-scaling-stroke"/></svg>${s}</div>`}
const SIL=[['holly','left:2%;bottom:84px;width:177px'],['christmas_tree_2','right:2%;bottom:84px;width:116px'],['sleigh_1','left:3%;top:84px;width:181px'],['snowman','right:3%;top:84px;width:118px'],['bells','left:4%;bottom:84px;width:146px'],['stocking','right:4%;top:84px;width:122px']];
const sil=k=>[SIL[k%6],SIL[(k+3)%6]].map(([n,s])=>img(n,'sil',s)).join('');
const vid=m=>`<div class="frame" style="--ar:${m.w}/${m.h}"><video playsinline controls preload="none" data-src="${U(m.src)}" aria-label="${esc(m.cap)}"></video><button class="play" aria-label="Play video"></button></div>`;
const pic=m=>`<div class="frame zoom" style="--ar:${m.w}/${m.h}"><img src="${U(m.src)}" alt="${esc(m.cap)}" loading="lazy"></div>`;
const media=ms=>`<div class="media">${ms.map(m=>m.t==='video'?vid(m):pic(m)).join('')}</div>`;
const art=a=>`<div class="art">${a.map((n,i)=>img(n,'a'+i)).join('')}</div>`;
const plate=(c,k='')=>`<div class="plate ${k}" style="--plate:${c.plate}"><img src="${U(c.logo)}" alt="${esc(c.name)} logo"></div>`;
const S=[];
S.push({k:'intro',snow:1,cid:null,label:'Maze Advertising',html:`<section class="slide intro">${lights()}
 <div class="orn" style="left:3%;--len:70px">${img('10_ornament')}</div><div class="orn" style="left:11%;--len:26px;animation-delay:-3s">${img('09_star')}</div><div class="orn" style="right:3%;--len:90px;animation-delay:-2s">${img('17_christmas_wreath')}</div><div class="orn" style="right:11%;--len:40px;animation-delay:-5s">${img('10_ornament')}</div>
 <div class="crowd l">${img('04_christmas_tree','','width:190px')}${img('03_gift_boxes')}${img('05_snowman')}</div><div class="crowd r">${img('07_reindeer')}${img('19_sleigh')}${img('01_santa_claus','','width:170px')}</div>
 <div class="in hero"><h1><span>December</span><span>Creative Showcase</span></h1><div class="rule">${img('09_star')}</div><p class="sub">Christmas Ideas &amp; Campaign Concepts</p><p class="by">Presented by Maze Advertising</p>
 <button class="cta" data-go="1">Meet the clients</button><p class="hint">Use the arrow keys, or swipe, to move through the presentation</p></div></section>`});
S.push({k:'dir',snow:1,cid:null,label:'Clients',html:`<section class="slide dir">${lights()}<div class="in"><header><h2>${D.length} clients, one December</h2><p>Select a client to explore its Christmas ideas and references.</p></header><div class="grid">${
 D.map(c=>`<button class="card" data-go="@${c.id}" style="--ca:${c.ca}">${plate(c)}<div class="row"><div><h3>${esc(c.name)}</h3><small>${c.ideas.length} December idea${c.ideas.length>1?'s':''}</small></div><span class="go">Explore ${chev}</span></div>${c.desc?`<p>${esc(c.desc)}</p>`:''}</button>`).join('')}</div></div></section>`});
D.forEach((c,ci)=>{
 const first=c.ideas.find(i=>i.media&&i.media.length),n=c.ideas.length;
 S.push({k:'ci',snow:1,cid:c.id,c,id:c.id,label:c.name,html:`<section class="slide cintro" style="--ca:${c.ca}">${lights()}<div class="in two"><div class="copy rv">${plate(c,'big')}<h2>${esc(c.name)}</h2>${c.desc?`<p class="desc">${esc(c.desc)}</p>`:''}<p class="cnt">${n} December idea${n>1?'s':''}</p><ul class="idx">${c.ideas.map((x,k)=>`<li><button data-go="@${c.id}-${k+1}">${esc(x.title)}</button></li>`).join('')}</ul></div><div class="rv">${first?media([first.media[0]]):art(c.ideas[0].art)}</div></div></section>`});
 c.ideas.forEach((x,k)=>{const nx=D[ci+1],last=k===n-1;
  S.push({k:'idea',cid:c.id,c,id:`${c.id}-${k+1}`,label:c.name,html:`<section class="slide idea" style="--ca:${c.ca}">${sil(ci+k)}<div class="in two"><div class="copy rv">${x.tag?`<span class="pill">${esc(x.tag)}</span>`:''}<h2>${esc(x.title)}</h2><p>${esc(x.text)}</p>${x.note?`<p class="note">${esc(x.note)}</p>`:''}${last?(nx?`<button class="next" data-go="@${nx.id}">${img('09_star')}<span>Next client: ${esc(nx.name)}</span></button>`:`<button class="next" data-go="1">${img('09_star')}<span>Back to the client directory</span></button>`):''}</div><div class="rv" style="--i:1">${x.media&&x.media.length?media(x.media):art(x.art)}</div></div></section>`})})});
const deck=$('#deck');deck.innerHTML=S.map(s=>s.html).join('');
[...deck.children].forEach((el,i)=>{S[i].el=el;S[i].i=i});
const idxOf=id=>S.findIndex(s=>s.id===id||('@'+s.id)===id);
const groups=[{name:'Start',a:0,b:1,go:0}];D.forEach(c=>{const m=S.filter(s=>s.cid===c.id);groups.push({name:c.name,a:m[0].i,b:m[m.length-1].i,go:m[0].i})});
$('#track').innerHTML=groups.map(g=>`<button class="seg" style="flex:${g.b-g.a+1}" data-go="${g.go}" title="${esc(g.name)}" aria-label="${esc(g.name)}"><i></i></button>`).join('');
let cur=-1,busy=0;
function unload(s){s.el.querySelectorAll('video').forEach(v=>{v.pause();if(v.getAttribute('src')){v.removeAttribute('src');v.load()}v.parentNode.classList.remove('playing')})}
function load(s){s.el.querySelectorAll('video').forEach(v=>{if(!v.getAttribute('src')){v.preload='metadata';v.src=v.dataset.src+'#t=0.1'}})}
function show(i){const o=S[cur],s=S[i];if(o){o.el.classList.remove('on');unload(o)}cur=i;s.el.classList.add('on');s.el.scrollTop=0;load(s);ui(s);history.replaceState(null,'','#'+(s.id||(s.k==='dir'?'directory':'intro')))}
function ui(s){const c=s.c;$('#who').innerHTML=c?`<img src="${U(c.logo)}" alt="" style="--p:${c.plate}"><span>${esc(c.name)}</span>`:`<span>${esc(s.label)}</span>`;
 const mine=c?S.filter(x=>x.cid===c.id):[];$('#pips').innerHTML=mine.map(x=>`<button data-go="${x.i}" class="${x.i===s.i?'on':''}" aria-label="${x.k==='ci'?'Client introduction':'Idea '+x.id.split('-').pop()}" title="${x.k==='ci'?'Introduction':esc(c.ideas[x.i-mine[0].i-1].title)}"></button>`).join('');
 $('#prev').disabled=s.i===0;$('#next').disabled=s.i===S.length-1;$('#count').textContent=`${s.i+1} / ${S.length}`;
 document.querySelectorAll('.seg').forEach((el,k)=>{const g=groups[k];el.firstChild.style.width=(s.i>g.b?100:s.i<g.a?0:(s.i-g.a+1)/(g.b-g.a+1)*100)+'%'});
 const on=!!s.snow&&!RM;document.body.classList.toggle('snowing',on);on?snow.on():snow.off()}
function go(t){const i=typeof t==='string'?idxOf(t):t;if(i<0||i>=S.length||i===cur||busy)return;if(cur<0)return show(i);
 const a=S[cur],b=S[i];if(RM||a.cid===b.cid)return show(i);
 busy=1;const w=$('#wipe');$('.lbl').textContent=b.cid?b.c.name:b.k==='dir'?'Our clients':'';w.classList.remove('run');void w.offsetWidth;w.classList.add('run');
 setTimeout(()=>show(i),520);setTimeout(()=>{busy=0;w.classList.remove('run')},1170)}
const snow=(()=>{const cv=$('#snow'),cx=cv.getContext('2d'),im=['snowflake_2','snowflake_3'].map(n=>{const x=new Image();x.src=E(n);return x});let W,H,f=[],r=0;
 const size=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;f=Array.from({length:Math.round(W*H/30000)},(_,i)=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.6,v:Math.random()*.5+.25,s:Math.random()*6,k:i%8===0?im[i%2]:null}))};
 const tick=()=>{cx.clearRect(0,0,W,H);for(const p of f){p.y+=p.v;p.s+=.01;p.x+=Math.sin(p.s)*.35;if(p.y>H+12){p.y=-12;p.x=Math.random()*W}
  if(p.k&&p.k.complete){cx.globalAlpha=.6;const z=p.r*8;cx.drawImage(p.k,p.x,p.y,z*p.k.width/p.k.height,z)}else{cx.globalAlpha=.5;cx.fillStyle='#F6EEDF';cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill()}}r=requestAnimationFrame(tick)};
 addEventListener('resize',size);size();return{on(){if(!r)tick()},off(){setTimeout(()=>{if(!document.body.classList.contains('snowing')){cancelAnimationFrame(r);r=0}},900)}}})();
const lb=$('#lb');let L=[],li=0;
const lbShow=()=>{const m=L[li];$('#lb img').src=m.src;$('#lb img').alt=m.alt;$('#lb figcaption').textContent=m.alt;lb.classList.toggle('one',L.length<2);lb.classList.add('open')};
const lbStep=d=>{li=(li+d+L.length)%L.length;lbShow()},lbClose=()=>lb.classList.remove('open');
document.addEventListener('click',e=>{const t=e.target,g=t.closest('[data-go]');
 if(g){const v=g.dataset.go;return go(/^\d+$/.test(v)?+v:v)}
 if(t.closest('.play')){t.closest('.frame').querySelector('video').play();return}
 const z=t.closest('.zoom');if(z){L=[...z.parentNode.querySelectorAll('.zoom img')];li=L.indexOf(z.querySelector('img'));lbShow();return}
 if(t.closest('.x')||t===lb)lbClose();else if(t.closest('.la'))lbStep(-1);else if(t.closest('.ra'))lbStep(1)});
$('#home').onclick=()=>go(1);$('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);
document.addEventListener('play',e=>e.target.parentNode.classList.add('playing'),true);
['pause','ended'].forEach(n=>document.addEventListener(n,e=>e.target.parentNode&&e.target.parentNode.classList.remove('playing'),true));
addEventListener('keydown',e=>{const k=e.key;
 if(lb.classList.contains('open')){if(k==='Escape')lbClose();else if(k==='ArrowLeft')lbStep(-1);else if(k==='ArrowRight')lbStep(1);return}
 if(k==='ArrowRight'||k==='PageDown'){e.preventDefault();go(cur+1)}else if(k==='ArrowLeft'||k==='PageUp'){e.preventDefault();go(cur-1)}else if(k==='Home')go(1);else if(k==='Escape')go(1)});
let tx,ty;addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{if(e.target.closest('video'))return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>70&&Math.abs(dy)<50)go(cur+(dx<0?1:-1))},{passive:true});
addEventListener('hashchange',()=>{const h=location.hash.slice(1),i=h==='directory'?1:idxOf(h);if(i>=0&&i!==cur&&!busy)go(i)});
const h0=location.hash.slice(1);show(h0==='directory'?1:Math.max(0,idxOf(h0)));
})();
