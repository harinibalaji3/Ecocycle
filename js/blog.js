(function(){
const cards=[...document.querySelectorAll("[data-post]")],box=document.getElementById("bq"),cnt=document.getElementById("bc"),empty=document.getElementById("be"),chips=document.querySelector(".filter");
let cat="all",term="";
function apply(){let n=0;cards.forEach(c=>{const ok=(cat==="all"||c.dataset.post===cat)&&c.textContent.toLowerCase().includes(term);c.hidden=!ok;if(ok)n++});
cnt.textContent="Showing "+n+" of "+cards.length+" articles";empty.hidden=n>0}
chips.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cat=b.dataset.c;apply()});
box.addEventListener("input",()=>{term=box.value.trim().toLowerCase();apply()});
apply();
const pc=new URLSearchParams(location.search).get("c");if(pc){const bt=[...chips.querySelectorAll("button")].find(x=>x.dataset.c===pc);bt&&bt.click()}
})();