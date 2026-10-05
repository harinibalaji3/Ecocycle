(function(){
const U=(i,w)=>`https://images.unsplash.com/photo-${i}?auto=format&fit=crop&w=${w||900}&q=70`;
const face=i=>U(i,160)+"&crop=faces";
const app=document.getElementById("app");
if(typeof POSTS==="undefined"){app.innerHTML='<section class="wrap" style="padding-block:100px"><h1>Content file missing</h1><p class="mu">Could not load js/blog-data.js.</p></section>';return}
const q=new URLSearchParams(location.search).get("p");
const p=q?POSTS.find(x=>x.slug==q):POSTS[0];
if(!p){app.innerHTML='<section class="wrap" style="padding-block:100px;text-align:center"><h1>Article not found</h1><p class="mu" style="margin-block:12px 22px">It may have moved.</p><a class="btn" href="blog.html">Back to the blog</a></section>';return}
document.title=p.title+" | EcoCycle";
const a=AUTH[p.author],words=p.body.map(b=>Array.isArray(b[1])?b[1].join(" "):b[1]).join(" ").split(/\s+/).length,mins=Math.max(2,Math.round(words/110));
const body=p.body.map(b=>b[0]=="h"?`<h2>${b[1]}</h2>`:b[0]=="p"?`<p>${b[1]}</p>`:`<ul>${b[1].map(x=>`<li><i data-i="check"></i><span>${x}</span></li>`).join("")}</ul>`).join("");
const cats=["Guide","Rewards","Recycling","Tips","Stories"];
const recent=POSTS.filter(x=>x.slug!=p.slug).slice(0,4);
const rel=POSTS.filter(x=>x.slug!=p.slug).sort((x,y)=>(y.cat==p.cat)-(x.cat==p.cat)).slice(0,3);
const u=encodeURIComponent(location.href),t=encodeURIComponent(p.title);
app.innerHTML=`
<section class="page-hero" style="--bgimg:url('${U("1761807299731-da9bbef44b77",1800)}')"><div class="wrap"><nav class="crumb" aria-label="Breadcrumb" style="display:flex;gap:8px;font-size:.9rem;margin-bottom:16px"><a href="index.html">Home</a><span>/</span><a href="blog.html">Blog</a><span>/</span><span>${p.cat}</span></nav><h1>${p.title}</h1><div class="byline"><span class="tag">${p.cat}</span><span><img src="${face(a.img)}" alt="${p.author}">${p.author}</span><span><i data-i="calendar"></i>${p.date}</span><span><i data-i="clock"></i>${mins} min read</span></div></div><svg class="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60V30C240 0 480 0 720 25s480 30 720 5v30z" fill="currentColor"/></svg></section>
<section class="sec"><div class="wrap post-layout">
<article class="article"><img class="cover" src="${U(p.img,1400)}" alt="${p.title}"><div class="prose">${body}</div>
<div class="post-foot"><div class="row" style="gap:8px"><a class="tag" href="blog.html?c=${p.cat}">${p.cat}</a><a class="tag" href="blog.html">Recycling</a></div><div class="share"><span class="mu">Share</span><a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" aria-label="Share on Facebook"><i data-i="facebook"></i></a><a href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener" aria-label="Share on X"><i data-i="x"></i></a><a href="https://www.linkedin.com/sharing/share-offsite/?url=${u}" target="_blank" rel="noopener" aria-label="Share on LinkedIn"><i data-i="linkedin"></i></a></div></div>
<div class="card author-box"><img src="${face(a.img)}" alt="${p.author}"><div><small>Written by</small><h3>${p.author}</h3><b class="mu">${a.role}</b><p style="margin-top:6px">${a.bio}</p></div></div></article>
<aside class="side-w"><div class="card"><h3>Categories</h3><ul class="cat-list">${cats.map(c=>`<li><a href="blog.html?c=${c}"><span>${c}</span><span class="mu">${POSTS.filter(x=>x.cat==c).length}</span></a></li>`).join("")}</ul></div>
<div class="card"><h3>Recent posts</h3>${recent.map(r=>`<a class="rc" href="blog-details.html?p=${r.slug}"><img src="${U(r.img,200)}" alt=""><span><b>${r.title}</b><small>${r.date}</small></span></a>`).join("")}</div>
<div class="cta" style="padding:28px;border-radius:var(--r)"><h3>Ready to sort smarter?</h3><p style="margin:8px 0 16px">Book a pickup and start earning eco-points.</p><a class="btn" href="schedule-pickup.html">Schedule a pickup</a></div></aside></div></section>
<section class="sec alt"><div class="wrap"><h2>Related articles</h2><div class="svc-grid" style="margin-top:28px">${rel.map(r=>`<article class="card svc blog-card"><div class="svc-img"><img src="${U(r.img)}" alt="${r.title}" loading="lazy"><span class="tag">${r.cat}</span></div><div class="body"><h3>${r.title}</h3><div class="post-meta"><img src="${face(AUTH[r.author].img)}" alt=""><div><b>${r.author}</b><span>${r.date}</span></div></div><a class="rm" href="blog-details.html?p=${r.slug}">Read article <i data-i="arrow"></i></a></div></article>`).join("")}</div></div></section>`;
})();