!function(){{const e=()=>{const e=document.querySelectorAll(".wp-block-happyprime-show-hide-group .toggle-all");e.length>0&&e.forEach((e=>e.addEventListener("click",(()=>{const t=e.parentElement.querySelectorAll("details.wp-block-happyprime-show-hide-section");"true"!==e.ariaExpanded?(t.forEach((e=>{e.setAttribute("open","true")})),e.innerText="Close All",e.ariaExpanded="true"):(t.forEach((e=>{e.removeAttribute("open")})),e.innerText="Open All",e.ariaExpanded="false")}))))};document.addEventListener("DOMContentLoaded",e)}}();