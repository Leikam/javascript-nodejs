var tutorial=webpackJsonp_name_([5],[function(t,e,n){"use strict";function r(){a(document,".task__solution","click",function(t){t.target.closest(".task").classList.toggle("task__answer_open")}),a(document,".task__answer-close","click",function(t){t.target.closest(".task").classList.toggle("task__answer_open")}),a(document,".task__step-show","click",function(t){t.target.closest(".task__step").classList.toggle("task__step_open")})}function i(){a(document,".lessons-list__lesson_level_1 > .lessons-list__link","click",function(t){var e=t.delegateTarget,n=e.closest(".lessons-list").querySelector(".lessons-list__lesson_open");n&&n!=e.parentNode&&n.classList.remove("lessons-list__lesson_open"),e.parentNode.classList.toggle("lessons-list__lesson_open"),t.preventDefault()})}var a=n(31),o=n(35),s=(n(32),n(28));e.init=function(){r(),i(),a(document,'[data-action="tutorial-map"]',"click",function(t){new s,t.preventDefault()}),o(),window.isEbook&&n.e(6,function(){n(30).init()})},e.TutorialMap=n(29)},,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(){o.apply(this,arguments);var t=new s;this.setContent(t.elem),t.start();var e=this.request({url:"/tutorial/map"}),n=this;e.addEventListener("success",function(t){var e=document.createElement("div");e.className="tutorial-map-overlay",e.innerHTML=t.result+'<button class="close-button tutorial-map-overlay__close"></button>',document.body.classList.add("tutorial-map_on"),n.setContent(e),new u(n.contentElem.firstElementChild)}),e.addEventListener("fail",function(){n.remove()}),e.send()}var i=n(32),a=n(31),o=n(20),s=n(41),u=n(29);r.prototype=Object.create(o.prototype),a.delegateMixin(r.prototype),r.prototype.remove=function(){o.prototype.remove.apply(this,arguments),document.body.classList.remove("tutorial-map_on")},r.prototype.request=function(t){var e=i(t);return e.addEventListener("loadstart",function(){var t=this.startRequestIndication();e.addEventListener("loadend",t)}.bind(this)),e},r.prototype.startRequestIndication=function(){this.showOverlay();var t=this;return function(){t.hideOverlay()}},t.exports=r},function(t,e,n){"use strict";function r(t){var e=this;this.elem=t,this.showTasksCheckbox=t.querySelector("[data-tutorial-map-show-tasks]"),this.showTasksCheckbox.checked=+localStorage.showTasksCheckbox,this.updateShowTasks(),this.showTasksCheckbox.onchange=this.updateShowTasks.bind(this),this.filterInput=this.elem.querySelector("[data-tutorial-map-filter]"),this.layoutSwitch=this.elem.querySelector("[data-tutorial-map-layout-switch]");var n=+localStorage.isMapSingleColumn;this.layoutSwitch.querySelector('[value="0"]').checked=!n,this.layoutSwitch.querySelector('[value="1"]').checked=n,this.updateLayout(),this.layoutSwitch.onchange=this.onLayoutSwitchChange.bind(this),this.filterInput.oninput=this.onFilterInput.bind(this),this.elem.querySelector(".close-button").onclick=function(){e.filterInput.value="",e.showClearButton(!1),e.filter("")},this.chaptersCollapsed=JSON.parse(localStorage.tutorialMapChapters||"{}"),this.showChaptersCollapsed(),this.delegate(".tutorial-map__item > .tutorial-map__link","click",function(t){t.preventDefault();var e=t.delegateTarget.getAttribute("href");this.chaptersCollapsed[e]?delete this.chaptersCollapsed[e]:this.chaptersCollapsed[e]=1,localStorage.tutorialMapChapters=JSON.stringify(this.chaptersCollapsed),this.showChaptersCollapsed()})}function i(t,e){for(var n=0,r=0;n<t.length&&r<e.length;)t[n]==e[r]?(n++,r++):n++;return r==e.length}var a=n(47),o=n(31);r.prototype.showChaptersCollapsed=function(){for(var t=this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link"),e=0;e<t.length;e++){var n=t[e];this.chaptersCollapsed[n.getAttribute("href")]?n.parentNode.classList.add("tutorial-map__item_collapsed"):n.parentNode.classList.remove("tutorial-map__item_collapsed")}},r.prototype.onLayoutSwitchChange=function(){this.updateLayout()},r.prototype.updateLayout=function(){var t=+this.elem.querySelector('[name="map-layout"]:checked').value;t?this.elem.classList.add("tutorial-map_singlecol"):this.elem.classList.remove("tutorial-map_singlecol"),localStorage.isMapSingleColumn=t?"1":"0"},r.prototype.updateShowTasks=function(){this.showTasksCheckbox.checked?this.elem.classList.add("tutorial-map_show-tasks"):this.elem.classList.remove("tutorial-map_show-tasks"),localStorage.showTasksCheckbox=this.showTasksCheckbox.checked?"1":"0"},r.prototype.onFilterInput=function(t){this.showClearButton(t.target.value),this.throttleFilter(t.target.value)},r.prototype.showClearButton=function(t){var e=this.elem.querySelector(".tutorial-map__filter .text-input");t?e.classList.add("text-input_clear-button"):e.classList.remove("text-input_clear-button")},r.prototype.focus=function(){this.filterInput.focus()},r.prototype.filter=function(t){function e(e){return i(e.querySelector("a").innerHTML.toLowerCase(),t.replace(/\s/g,""))}t=t.toLowerCase();for(var n=this.showTasksCheckbox.checked,r=(this.elem.querySelectorAll(".tutorial-map-link"),this.elem.querySelectorAll(".tutorial-map__item")),a=0;a<r.length;a++){var o=r[a],s=o.querySelectorAll(".tutorial-map__sub-item"),u=Array.prototype.reduce.call(s,function(t,r){var i=!1;if(n){var a=r.querySelectorAll(".tutorial-map__sub-sub-item");i=Array.prototype.reduce.call(a,function(t,n){var r=e(n);return n.hidden=!r,t||r},!1)}var o=i||e(r);return r.hidden=!o,t||o},!1);o.hidden=!(u||e(o))}},r.prototype.throttleFilter=a(r.prototype.filter,200),o.delegateMixin(r.prototype),t.exports=r},,,function(t,e,n){"use strict";function r(t){function e(t,e){var n=new CustomEvent(t);return n.originalEvent=e,n}function n(t,n){var r=e("fail",n);r.reason=t,a.dispatchEvent(r)}function r(t,n){var r=e("success",n);r.result=t,a.dispatchEvent(r)}var a=new XMLHttpRequest,o=t.method||"GET",s=t.body,u=t.url;window.csrf&&(u=i(u,"_csrf",window.csrf)),a.open(o,u,t.sync?!1:!0),a.method=o,"[object Object]"=={}.toString.call(s)&&(a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),s=JSON.stringify(s)),t.noGlobalEvents||(a.addEventListener("loadstart",function(t){var n=e("xhrstart",t);document.dispatchEvent(n)}),a.addEventListener("loadend",function(t){var n=e("xhrend",t);document.dispatchEvent(n)}),a.addEventListener("success",function(t){var n=e("xhrsuccess",t);n.result=t.result,document.dispatchEvent(n)}),a.addEventListener("fail",function(t){var n=e("xhrfail",t);n.reason=t.reason,document.dispatchEvent(n)})),t.json&&a.setRequestHeader("Accept","application/json"),a.setRequestHeader("X-Requested-With","XMLHttpRequest");var c=t.normalStatuses||[200];return a.addEventListener("error",function(t){n("Ошибка связи с сервером.",t)}),a.addEventListener("timeout",function(t){n("Превышено максимально допустимое время ожидания ответа от сервера.",t)}),a.addEventListener("abort",function(t){n("Запрос был прерван.",t)}),a.addEventListener("load",function(e){if(!a.status)return void n("Не получен ответ от сервера.",e);if(-1==c.indexOf(a.status))return void n("Ошибка на стороне сервера (код "+a.status+"), попытайтесь позднее",e);var i=a.responseText,o=a.getResponseHeader("Content-Type");if(o.match(/^application\/json/)||t.json)try{i=JSON.parse(i)}catch(e){return void n("Некорректный формат ответа от сервера",e)}r(i,e)}),setTimeout(function(){a.send(s)},0),a}function i(t,e,n){var r=encodeURIComponent(e)+"="+encodeURIComponent(n);return~t.indexOf("?")?t+"&"+r:t+"?"+r}var a=n(14);document.addEventListener("xhrfail",function(t){new a.Error(t.reason)}),t.exports=r},,,function(t,e,n){"use strict";function r(){for(var t=document.getElementsByClassName("code-example"),e=0;e<t.length;e++){var n=t[e];new a(n)}}function i(){for(var t=document.querySelectorAll("div.code-tabs"),e=0;e<t.length;e++)new o(t[e])}n(52),n(53),n(54),n(55),n(56),n(57),n(58),n(59),n(60),n(61),n(62),n(63),n(64),n(65),n(66),Prism.tokenTag="code";var a=n(48),o=n(49);t.exports=function(){document.removeEventListener("DOMContentLoaded",Prism.highlightAll),document.addEventListener("DOMContentLoaded",function(){r(),i()})}},,,,,,,,,,,,,function(t,e,n){"use strict";function r(t){function e(){var t=m[0].contentWindow;return"function"!=typeof t.postMessage?void alert("Извините, запуск кода требует более современный браузер"):void t.postMessage(p,"http://ru.lookatcode.com/showjs")}function n(){var e,n=!1;if(g&&t.dataset.refresh&&(g.remove(),g=null),g)e=g.querySelector("iframe");else{if(g=document.createElement("div"),g.className="code-result code-example__result",e=document.createElement("iframe"),e.name="frame-"+Math.random(),e.className="code-result__iframe","0"===t.dataset.demoHeight)e.style.display="none",n=!0;else if(t.dataset.demoHeight){var r=+t.dataset.demoHeight;e.style.height=r+"px",n=!0}g.appendChild(e),t.appendChild(g)}if(y){var i=e.contentDocument||e.contentWindow.document;i.open(),i.write(l(p)),i.close(),n||o.iframe(e),w&&t.dataset.autorun||s(g)||g.scrollIntoView(!1)}else{var a=document.createElement("form");a.style.display="none",a.method="POST",a.enctype="application/x-www-form-urlencoded",a.action="http://ru.lookatcode.com/showhtml",a.target=e.name;var u=document.createElement("textarea");u.name="code",u.value=l(p),a.appendChild(u),e.parentNode.insertBefore(a,e.nextSibling),a.submit(),a.remove(),w&&t.dataset.autorun||(e.onload=function(){n||o.iframe(e),s(g)||g.scrollIntoView(!1)})}}function r(){if(y)try{window.eval.call(window,p)}catch(n){alert("Ошибка: "+n.message)}else t.dataset.refresh&&m&&(m.remove(),m=null),m?e():(m=document.createElement("iframe"),m.className="js-frame",m.src="http://ru.lookatcode.com/showjs",m.style.width=0,m.style.height=0,m.style.border="none",m.onload=function(){e()},document.body.appendChild(m))}function c(){var t;if(v)t=l(p);else{var e=p.replace(/^/gim,"    ");t="<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n"+e+"\n  </script>\n</body>\n\n</html>"}var n=document.createElement("form");n.action="http://plnkr.co/edit/?p=preview",n.method="POST",n.target="_blank",document.body.appendChild(n);var r=document.createElement("textarea");r.name="files[index.html]",r.value=t,n.appendChild(r);var i=document.createElement("input");i.name="description",i.value="Fork from "+window.location,n.appendChild(i),n.submit(),n.remove()}function l(){var t=p.toLowerCase(),e=t.match("<body>"),n=t.match("</body>"),r=t.match("<html>"),i=t.match("</html>"),a=t.match(/^\s*<!doctype/);if(a)return p;var o=p;return r||(o="<html>\n"+o),i||(o+="\n</html>"),e||(o=o.replace("<html>",'<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')),n||(o=o.replace("</html>","\n</body>\n</html>")),o="<!DOCTYPE HTML>\n"+o}function f(){$?r():n(),w=!1}var h=t.querySelector("pre"),d=h.querySelector("code"),p=d.textContent;Prism.highlightElement(d),u(h),i(h,t.dataset.highlightBlock),a(h,t.dataset.highlightInline);var m,g,$=h.classList.contains("language-javascript"),v=h.classList.contains("language-markup"),y=t.dataset.trusted,w=!0;if($||v){var b=t.querySelector('[data-action="run"]');b&&(b.onclick=function(){return this.blur(),f(),!1});var E=t.querySelector('[data-action="edit"]');E&&(E.onclick=function(){return this.blur(),c(),!1}),t.dataset.autorun&&setTimeout(f,10)}}function i(t,e){if(e)for(var n,r=e.replace(/\s+/g,"").split(","),i=0;n=r[i++];){n=n.split("-");var a=+n[0],o=+n[1]||a,s='<code class="block-highlight" data-start="'+a+'" data-end="'+o+'">'+Array(a+1).join("\n")+'<code class="mask">'+Array(o-a+2).join("\n")+"</code></code>";t.insertAdjacentHTML("afterBegin",s)}}function a(t,e){var n=t.querySelector('code[class*="language-"]');e=e?e.split(","):[];for(var r=0;r<e.length;r++){var i=e[r].split(":"),a=+i[0],o=i[1].split("-"),s=+o[0],u=+o[1],c='<code class="inline-highlight">'+Array(a+1).join("\n")+Array(s+1).join(" ")+'<code class="mask">'+Array(u-s+1).join(" ")+"</code></code>";n.insertAdjacentHTML("afterBegin",c)}}var o=n(27),s=n(72),u=n(71);t.exports=r},function(t,e,n){"use strict";function r(t){window.isEbook||(this.elem=t,this.translateX=0,this.switchesElem=t.querySelector("[data-code-tabs-switches]"),this.switchesElemItems=this.switchesElem.firstElementChild,this.arrowLeft=t.querySelector("[data-code-tabs-left]"),this.arrowRight=t.querySelector("[data-code-tabs-right]"),this.arrowLeft.onclick=function(t){t.preventDefault(),this.translateX=Math.max(0,this.translateX-this.switchesElem.offsetWidth),this.renderTranslate()}.bind(this),this.arrowRight.onclick=function(t){t.preventDefault(),this.translateX=Math.min(this.translateX+this.switchesElem.offsetWidth,this.switchesElemItems.offsetWidth-this.switchesElem.offsetWidth),this.renderTranslate()}.bind(this),this.delegate(".code-tabs__switch","click",this.onSwitchClick))}var i=n(31),a=n(71);r.prototype.onSwitchClick=function(t){t.preventDefault();for(var e,n=t.delegateTarget.parentNode.children,r=this.elem.querySelector("[data-code-tabs-content]").children,i=0;i<n.length;i++){var a=n[i],o=r[i];a==t.delegateTarget?(e=i,o.classList.add("code-tabs__section_current"),a.classList.add("code-tabs__switch_current")):(o.classList.remove("code-tabs__section_current"),a.classList.remove("code-tabs__switch_current"))}0===e?this.elem.classList.add("code-tabs_result_on"):(this.elem.classList.remove("code-tabs_result_on"),this.highlightTab(r[e]))},r.prototype.highlightTab=function(t){if(!t.highlighted){var e=t.querySelector("pre"),n=e.querySelector("code");Prism.highlightElement(n),a(e),t.highlighted=!0}},r.prototype.renderTranslate=function(){this.switchesElemItems.style.transform="translateX(-"+this.translateX+"px)",0===this.translateX?this.arrowLeft.setAttribute("disabled",""):this.arrowLeft.removeAttribute("disabled"),this.translateX===this.switchesElemItems.offsetWidth-this.switchesElem.offsetWidth?this.arrowRight.setAttribute("disabled",""):this.arrowRight.removeAttribute("disabled")},i.delegateMixin(r.prototype),t.exports=r},,,function(t){self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var e=function(){var t=/\blang(?:uage)?-(?!\*)(\w+)\b/i,n=self.Prism={util:{encode:function(t){return t instanceof r?new r(t.type,n.util.encode(t.content),t.alias):"Array"===n.util.type(t)?t.map(n.util.encode):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(t){return Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1]},clone:function(t){var e=n.util.type(t);switch(e){case"Object":var r={};for(var i in t)t.hasOwnProperty(i)&&(r[i]=n.util.clone(t[i]));return r;case"Array":return t.slice()}return t}},languages:{extend:function(t,e){var r=n.util.clone(n.languages[t]);for(var i in e)r[i]=e[i];return r},insertBefore:function(t,e,r,i){i=i||n.languages;var a=i[t];if(2==arguments.length){r=arguments[1];for(var o in r)r.hasOwnProperty(o)&&(a[o]=r[o]);return a}var s={};for(var u in a)if(a.hasOwnProperty(u)){if(u==e)for(var o in r)r.hasOwnProperty(o)&&(s[o]=r[o]);s[u]=a[u]}return n.languages.DFS(n.languages,function(e,n){n===i[t]&&e!=t&&(this[e]=s)}),i[t]=s},DFS:function(t,e,r){for(var i in t)t.hasOwnProperty(i)&&(e.call(t,i,t[i],r||i),"Object"===n.util.type(t[i])?n.languages.DFS(t[i],e):"Array"===n.util.type(t[i])&&n.languages.DFS(t[i],e,i))}},highlightAll:function(t,e){for(var r,i=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),a=0;r=i[a++];)n.highlightElement(r,t===!0,e)},highlightElement:function(e,i,a){for(var o,s,u=e;u&&!t.test(u.className);)u=u.parentNode;if(u&&(o=(u.className.match(t)||[,""])[1],s=n.languages[o]),s){e.className=e.className.replace(t,"").replace(/\s+/g," ")+" language-"+o,u=e.parentNode,/pre/i.test(u.nodeName)&&(u.className=u.className.replace(t,"").replace(/\s+/g," ")+" language-"+o);var c=e.textContent;if(c){var l={element:e,language:o,grammar:s,code:c};if(n.hooks.run("before-highlight",l),i&&self.Worker){var f=new Worker(n.filename);f.onmessage=function(t){l.highlightedCode=r.stringify(JSON.parse(t.data),o),n.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,a&&a.call(l.element),n.hooks.run("after-highlight",l)},f.postMessage(JSON.stringify({language:l.language,code:l.code}))}else l.highlightedCode=n.highlight(l.code,l.grammar,l.language),n.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,a&&a.call(e),n.hooks.run("after-highlight",l)}}},highlight:function(t,e,i){var a=n.tokenize(t,e);return r.stringify(n.util.encode(a),i)},tokenize:function(t,e){var r=n.Token,i=[t],a=e.rest;if(a){for(var o in a)e[o]=a[o];delete e.rest}t:for(var o in e)if(e.hasOwnProperty(o)&&e[o]){var s=e[o];s="Array"===n.util.type(s)?s:[s];for(var u=0;u<s.length;++u){var c=s[u],l=c.inside,f=!!c.lookbehind,h=0,d=c.alias;c=c.pattern||c;for(var p=0;p<i.length;p++){var m=i[p];if(i.length>t.length)break t;if(!(m instanceof r)){c.lastIndex=0;var g=c.exec(m);if(g){f&&(h=g[1].length);var $=g.index-1+h,g=g[0].slice(h),v=g.length,y=$+v,w=m.slice(0,$+1),b=m.slice(y+1),E=[p,1];w&&E.push(w);var _=new r(o,l?n.tokenize(g,l):g,d);E.push(_),b&&E.push(b),Array.prototype.splice.apply(i,E)}}}}}return i},hooks:{all:{},add:function(t,e){var r=n.hooks.all;r[t]=r[t]||[],r[t].push(e)},run:function(t,e){var r=n.hooks.all[t];if(r&&r.length)for(var i,a=0;i=r[a++];)i(e)}}},r=n.Token=function(t,e,n){this.type=t,this.content=e,this.alias=n};if(r.stringify=function(t,i,a){if("string"==typeof t)return t;if("[object Array]"==Object.prototype.toString.call(t))return t.map(function(e){return r.stringify(e,i,t)}).join("");var o={type:t.type,content:r.stringify(t.content,i,a),tag:e.tokenTag||"span",classes:["token",t.type],attributes:{},language:i,parent:a};if("comment"==o.type&&(o.attributes.spellcheck="true"),t.alias){var s="Array"===n.util.type(t.alias)?t.alias:[t.alias];Array.prototype.push.apply(o.classes,s)}n.hooks.run("wrap",o);var u="";for(var c in o.attributes)u+=c+'="'+(o.attributes[c]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+u+">"+o.content+"</"+o.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(t){var e=JSON.parse(t.data),r=e.language,i=e.code;self.postMessage(JSON.stringify(n.util.encode(n.tokenize(i,n.languages[r])))),self.close()},!1),self.Prism):self.Prism;var i=document.getElementsByTagName("script");return i=i[i.length-1],i&&(n.filename=i.src,document.addEventListener&&!i.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",n.highlightAll)),self.Prism}();void 0!==t&&t.exports&&(t.exports=e)},function(){Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))})},function(){Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').+?\1/gi,inside:{"attr-name":{pattern:/^\s*style/gi,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/gi,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag))},function(){Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class":/:[-\w]+(?:\(.*\))?/g,"class":/\.[-:\.\w]+/g,id:/#[-:\.\w]+/g}},Prism.languages.insertBefore("css","function",{hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/[\d%\.]+/g})},function(){Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g}},function(){Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,"function":/(?!\d)[a-z0-9_$]+(?=\()/gi}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}})},function(){!function(t){var e=/#(?!\{).+/g,n={pattern:/#\{[^}]+\}/g,alias:"variable"};t.languages.coffeescript=t.languages.extend("javascript",{comment:e,string:[/'(?:\\?[\s\S])*?'/g,{pattern:/"(?:\\?[\s\S])*?"/g,inside:{interpolation:n}}],keyword:/\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/g,"class-member":{pattern:/@(?!\d)\w+/,alias:"variable"}}),t.languages.insertBefore("coffeescript","comment",{"multiline-comment":{pattern:/###[\s\S]+?###/g,alias:"comment"},"block-regex":{pattern:/\/{3}[\s\S]*?\/{3}/,alias:"regex",inside:{comment:e,interpolation:n}}}),t.languages.insertBefore("coffeescript","string",{"inline-javascript":{pattern:/`(?:\\?[\s\S])*?`/g,inside:{delimiter:{pattern:/^`|`$/g,alias:"punctuation"},rest:t.languages.javascript}},"multiline-string":[{pattern:/'''[\s\S]*?'''/,alias:"string"},{pattern:/"""[\s\S]*?"""/,alias:"string",inside:{interpolation:n}}]}),t.languages.insertBefore("coffeescript","keyword",{property:/(?!\d)\w+(?=\s*:(?!:))/g})}(Prism)},function(){Prism.languages.http={"request-line":{pattern:/^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/g,inside:{property:/^\b(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/g,"attr-name":/:\w+/g}},"response-status":{pattern:/^HTTP\/1.[01] [0-9]+.*/g,inside:{property:/[0-9]+[A-Z\s-]+$/gi}},keyword:/^[\w-]+:(?=.+)/gm};var t={"application/json":Prism.languages.javascript,"application/xml":Prism.languages.markup,"text/xml":Prism.languages.markup,"text/html":Prism.languages.markup};for(var e in t)if(t[e]){var n={};n[e]={pattern:RegExp("(content-type:\\s*"+e+"[\\w\\W]*?)\\n\\n[\\w\\W]*","gi"),lookbehind:!0,inside:{rest:t[e]}},Prism.languages.insertBefore("http","keyword",n)}},function(){Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","function",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g})},function(){Prism.languages.sql={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,lookbehind:!0},string:{pattern:/(^|[^@])("|')(\\?[\s\S])*?\2/g,lookbehind:!0},variable:/@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/g,"function":/\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/gi,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,"boolean":/\b(?:TRUE|FALSE|NULL)\b/gi,number:/\b-?(0x)?\d*\.?[\da-f]+\b/g,operator:/\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//gi,punctuation:/[;[\]()`,.]/g}},function(){Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind:!0}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(t){"php"===t.language&&(t.tokenStack=[],t.backupCode=t.code,t.code=t.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(e){return t.tokenStack.push(e),"{{{PHP"+t.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(t){"php"===t.language&&(t.code=t.backupCode,delete t.backupCode)}),Prism.hooks.add("after-highlight",function(t){if("php"===t.language){for(var e,n=0;e=t.tokenStack[n];n++)t.highlightedCode=t.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(e,t.grammar,"php"));t.element.innerHTML=t.highlightedCode}}),Prism.hooks.add("wrap",function(t){"php"===t.language&&"markup"===t.type&&(t.content=t.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g}))},function(){Prism.languages.insertBefore("php","variable",{"this":/\$this/g,global:/\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,scope:{pattern:/\b[\w\\]+::/g,inside:{keyword:/(static|self|parent)/,punctuation:/(::|\\)/}}})},function(){Prism.languages.python={comment:{pattern:/(^|[^\\])#.*?(\r?\n|$)/g,lookbehind:!0},string:/"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/g,keyword:/\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,"boolean":/\b(True|False)\b/g,number:/\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/gi,operator:/[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g}},function(){Prism.languages.ruby=Prism.languages.extend("clike",{comment:/#[^\r\n]*(\r?\n|$)/g,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g}),Prism.languages.insertBefore("ruby","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0},variable:/[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,symbol:/:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g})},function(){Prism.languages.java=Prism.languages.extend("clike",{keyword:/\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,number:/\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\b\d*\.?\d+\b/gi,operator:{pattern:/(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/gm,lookbehind:!0}})
},,,,,function(t){"use strict";function e(t){var e,n=1+t.innerHTML.split("\n").length,r=Array(n);r=r.join("<span></span>"),e=document.createElement("span"),e.className="line-numbers-rows",e.innerHTML=r,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+ +t.dataset.start-1),t.appendChild(e)}t.exports=e},function(t){"use strict";function e(t){var e=t.getBoundingClientRect(),n=0;if(e.top<0)n=e.bottom;else{if(!(e.bottom>window.innerHeight))return!0;n=window.innerHeight-top}return n>10}t.exports=e}]);