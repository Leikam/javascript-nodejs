var footer=webpackJsonp_name_([2],{0:function(e,t,n){"use strict";var o=n(6),r=n(7);t.init=function(){o(),window.devicePixelRatio>1&&r()}},6:function(e,t,n){"use strict";var o=n(42);e.exports=function(){function e(e){var t=e.clientX+i;t+r.offsetWidth>document.documentElement.clientWidth&&(t=Math.max(0,e.clientX-i-r.offsetWidth)),r.style.left=t+"px";var n=e.clientY+s;n+r.offsetHeight>document.documentElement.clientHeight&&(n=Math.max(0,e.clientY-s-r.offsetHeight)),r.style.top=n+"px"}function t(t){var n=t.target.closest("a");n&&(n.closest(".toolbar")||(r=document.createElement("span"),r.className="link__type",n.getAttribute("data-tooltip")?r.setAttribute("data-tooltip",n.getAttribute("data-tooltip")):r.setAttribute("data-url",n.getAttribute("href")),document.body.appendChild(r),e(t),document.addEventListener("mousemove",e)))}function n(){r&&(document.removeEventListener("mousemove",e),r.remove(),r=null)}var r=null,i=8,s=10,a=o(t,n,"a");document.addEventListener("mouseover",function(e){e.target.closest("a")&&a.call(this,e)}),document.addEventListener("mouseout",a)}},7:function(e){"use strict";e.exports=function(){for(var e=document.querySelectorAll('figure img[src$=".png"]'),t=0;t<e.length;t++)!function(){var n=e[t];n.onload=function(){if(delete this.onload,!this.src.match(/@2x.png$/)){var e=new Image;e.onload=function(){this.width&&this.height&&(n.src=this.src)},e.src=this.src.replace(".png","@2x.png")}},n.complete&&n.onload()}()}},42:function(e){"use strict";function t(e,t){function n(e){r=e.pageX,i=e.pageY}function o(e,t){return t.hoverIntentTimer=clearTimeout(t.hoverIntentTimer),Math.sqrt((s-r)*(s-r)+(a-i)*(a-i))<c.sensitivity?(t.removeEventListener("mousemove",n),t.hoverIntentState=!0,void c.over.call(t,e)):(s=r,a=i,void(t.hoverIntentTimer=setTimeout(function(){o(e,t)},c.interval)))}var r,i,s,a,c={interval:100,sensitivity:6,timeout:0,over:e,out:t};return function(e){this.hoverIntentTimer&&(clearTimeout(this.hoverIntentTimer),delete this.hoverIntentTimer),"mouseover"===e.type?(s=e.pageX,a=e.pageY,this.addEventListener("mousemove",n),this.hoverIntentState||(this.hoverIntentTimer=setTimeout(function(){o(e,this)}.bind(this),c.interval))):(this.removeEventListener("mousemove",n),this.hoverIntentState&&(this.hoverIntentTimer=setTimeout(function(){this.hoverIntentState=!1,c.out.call(this,e)}.bind(this),c.timeout)))}}e.exports=void 0===document.ontouchstart?t:function(){return function(){}}}});