(function(){
const links=[...document.querySelectorAll("[data-p]")],panels=[...document.querySelectorAll(".panel")],pt=document.getElementById("pt");
function show(id){const f=panels.find(p=>p.id===id)||panels[0];
panels.forEach(p=>p.classList.toggle("on",p===f));
links.forEach(l=>{const on=l.dataset.p===f.id;l.classList.toggle("on",on);if(on&&pt)pt.textContent=l.textContent.trim()})}
document.addEventListener("click",e=>{const l=e.target.closest("[data-p]");if(!l)return;e.preventDefault();history.replaceState(null,"","#"+l.dataset.p);show(l.dataset.p);window.scrollTo(0,0)});
show(location.hash.slice(1));
})();