var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function l(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function a(t,n){t.appendChild(n)}function c(t,n,e){t.insertBefore(n,e||null)}function s(t){t.parentNode.removeChild(t)}function i(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function u(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function f(){return p(" ")}function d(){return p("")}function x(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function h(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function C(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}let g;function m(t){g=t}const b=[],$=[],v=[],y=[],k=Promise.resolve();let w=!1;function D(t){v.push(t)}let F=!1;const A=new Set;function S(){if(!F){F=!0;do{for(let t=0;t<b.length;t+=1){const n=b[t];m(n),_(n.$$)}for(m(null),b.length=0;$.length;)$.pop()();for(let t=0;t<v.length;t+=1){const n=v[t];A.has(n)||(A.add(n),n())}v.length=0}while(b.length);for(;y.length;)y.pop()();w=!1,F=!1,A.clear()}}function _(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(D)}}const M=new Set;let U;function N(){U={r:0,c:[],p:U}}function I(){U.r||o(U.c),U=U.p}function E(t,n){t&&t.i&&(M.delete(t),t.i(n))}function G(t,n,e,o){if(t&&t.o){if(M.has(t))return;M.add(t),U.c.push(()=>{M.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}function B(t,n){t.d(1),n.delete(t.key)}function O(t,n){G(t,1,1,()=>{n.delete(t.key)})}function j(t,n,e,o,r,l,a,c,s,i,u,p){let f=t.length,d=l.length,x=f;const h={};for(;x--;)h[t[x].key]=x;const C=[],g=new Map,m=new Map;for(x=d;x--;){const t=p(r,l,x),c=e(t);let s=a.get(c);s?o&&s.p(t,n):(s=i(c,t),s.c()),g.set(c,C[x]=s),c in h&&m.set(c,Math.abs(x-h[c]))}const b=new Set,$=new Set;function v(t){E(t,1),t.m(c,u),a.set(t.key,t),u=t.first,d--}for(;f&&d;){const n=C[d-1],e=t[f-1],o=n.key,r=e.key;n===e?(u=n.first,f--,d--):g.has(r)?!a.has(o)||b.has(o)?v(n):$.has(r)?f--:m.get(o)>m.get(r)?($.add(o),v(n)):(b.add(r),f--):(s(e,a),f--)}for(;f--;){const n=t[f];g.has(n.key)||s(n,a)}for(;d;)v(C[d-1]);return C}function L(t){t&&t.c()}function P(t,e,l,a){const{fragment:c,on_mount:s,on_destroy:i,after_update:u}=t.$$;c&&c.m(e,l),a||D(()=>{const e=s.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]}),u.forEach(D)}function T(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function q(t,n){-1===t.$$.dirty[0]&&(b.push(t),w||(w=!0,k.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function R(n,r,l,a,c,i,u=[-1]){const p=g;m(n);const f=n.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:e(),dirty:u,skip_bound:!1};let d=!1;if(f.ctx=l?l(n,r.props||{},(t,e,...o)=>{const r=o.length?o[0]:e;return f.ctx&&c(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),d&&q(n,t)),e}):[],f.update(),d=!0,o(f.before_update),f.fragment=!!a&&a(f.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);f.fragment&&f.fragment.l(t),t.forEach(s)}else f.fragment&&f.fragment.c();r.intro&&E(n.$$.fragment),P(n,r.target,r.anchor,r.customElement),S()}m(p)}class z{$destroy(){T(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function H(n){let e,o;return{c(){e=u("div"),o=p(n[0])},m(t,n){c(t,e,n),a(e,o)},p(t,[n]){1&n&&C(o,t[0])},i:t,o:t,d(t){t&&s(e)}}}function J(t,n,e){let{id:o}=n;return t.$$set=t=>{"id"in t&&e(0,o=t.id)},[o]}class K extends z{constructor(t){super(),R(this,t,J,H,l,{id:0})}}function Q(n){let e,o;return{c(){e=u("span"),o=p(n[0])},m(t,n){c(t,e,n),a(e,o)},p(t,[n]){1&n&&C(o,t[0])},i:t,o:t,d(t){t&&s(e)}}}function V(t,n,e){let{id:o}=n;return t.$$set=t=>{"id"in t&&e(0,o=t.id)},[o]}class W extends z{constructor(t){super(),R(this,t,V,Q,l,{id:0})}}function X(t,n,e){const o=t.slice();return o[11]=n[e],o}function Y(t,n,e){const o=t.slice();return o[14]=n[e],o}function Z(t,n,e){const o=t.slice();return o[14]=n[e],o}function tt(t){let n,e,o=[],r=new Map,l=t[0];const a=t=>t[14].id;for(let n=0;n<l.length;n+=1){let e=Y(t,l,n),c=a(e);r.set(c,o[n]=et(c,e))}return{c(){for(let t=0;t<o.length;t+=1)o[t].c();n=d()},m(t,r){for(let n=0;n<o.length;n+=1)o[n].m(t,r);c(t,n,r),e=!0},p(t,e){1&e&&(l=t[0],N(),o=j(o,e,a,1,t,l,r,n.parentNode,O,et,n,Y),I())},i(t){if(!e){for(let t=0;t<l.length;t+=1)E(o[t]);e=!0}},o(t){for(let t=0;t<o.length;t+=1)G(o[t]);e=!1},d(t){for(let n=0;n<o.length;n+=1)o[n].d(t);t&&s(n)}}}function nt(t){let n,e,o=[],r=new Map,l=t[0];const a=t=>t[14].id;for(let n=0;n<l.length;n+=1){let e=Z(t,l,n),c=a(e);r.set(c,o[n]=ot(c,e))}return{c(){for(let t=0;t<o.length;t+=1)o[t].c();n=d()},m(t,r){for(let n=0;n<o.length;n+=1)o[n].m(t,r);c(t,n,r),e=!0},p(t,e){1&e&&(l=t[0],N(),o=j(o,e,a,1,t,l,r,n.parentNode,O,ot,n,Z),I())},i(t){if(!e){for(let t=0;t<l.length;t+=1)E(o[t]);e=!0}},o(t){for(let t=0;t<o.length;t+=1)G(o[t]);e=!1},d(t){for(let n=0;n<o.length;n+=1)o[n].d(t);t&&s(n)}}}function et(t,n){let e,o,r;return o=new W({props:{id:n[14].id}}),{key:t,first:null,c(){e=d(),L(o.$$.fragment),this.first=e},m(t,n){c(t,e,n),P(o,t,n),r=!0},p(t,e){n=t;const r={};1&e&&(r.id=n[14].id),o.$set(r)},i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),r=!1},d(t){t&&s(e),T(o,t)}}}function ot(t,n){let e,o,r;return o=new K({props:{id:n[14].id}}),{key:t,first:null,c(){e=d(),L(o.$$.fragment),this.first=e},m(t,n){c(t,e,n),P(o,t,n),r=!0},p(t,e){n=t;const r={};1&e&&(r.id=n[14].id),o.$set(r)},i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),r=!1},d(t){t&&s(e),T(o,t)}}}function rt(t){let n;return{c(){n=u("div"),n.textContent="-"},m(t,e){c(t,n,e)},d(t){t&&s(n)}}}function lt(t){let n,e,r,l,p,d,C,g,m,b,$,v,y,k,w,D,F,A,S,_,M,U,B,O,j,L;const P=[nt,tt],T=[];function q(t,n){return 1===t[2]?0:1}M=q(t),U=T[M]=P[M](t);let R=t[1],z=[];for(let n=0;n<R.length;n+=1)z[n]=rt(X(t,R,n));return{c(){n=u("main"),e=u("div"),r=u("div"),l=u("label"),l.textContent="Number of components or elements to create",p=f(),d=u("input"),C=f(),g=u("button"),g.textContent="Generate components",m=f(),b=u("button"),b.textContent="Generate static elements",$=f(),v=u("button"),v.textContent="Change child component type",y=f(),k=u("div"),w=u("div"),D=u("button"),D.textContent="Delete all components",F=f(),A=u("button"),A.textContent="Add one component",S=f(),_=u("div"),U.c(),B=f();for(let t=0;t<z.length;t+=1)z[t].c();h(d,"id","input-num-to-create"),h(d,"type","number"),h(d,"min","1"),h(g,"id","btn-generate-components"),h(b,"id","btn-generate-elements"),h(v,"id","btn-switch-child-type"),h(D,"id","btn-delete"),h(A,"id","btn-add-one")},m(o,s){c(o,n,s),a(n,e),a(e,r),a(r,l),a(r,p),a(r,d),a(r,C),a(r,g),a(r,m),a(r,b),a(r,$),a(r,v),a(e,y),a(e,k),a(k,w),a(w,D),a(w,F),a(w,A),a(e,S),a(e,_),T[M].m(_,null),a(_,B);for(let t=0;t<z.length;t+=1)z[t].m(_,null);O=!0,j||(L=[x(d,"change",t[9]),x(g,"click",t[5]),x(b,"click",t[6]),x(v,"click",t[8]),x(D,"click",t[4]),x(A,"click",t[3])],j=!0)},p(t,[n]){let e=M;if(M=q(t),M===e?T[M].p(t,n):(N(),G(T[e],1,1,()=>{T[e]=null}),I(),U=T[M],U?U.p(t,n):(U=T[M]=P[M](t),U.c()),E(U,1),U.m(_,B)),2&n){const n=R.length;let e;for(R=t[1],e=n;e<R.length;e+=1){X(t,R,e);z[e]||(z[e]=rt(),z[e].c(),z[e].m(_,null))}for(e=R.length;e<n;e+=1)z[e].d(1);z.length=R.length}},i(t){O||(E(U),O=!0)},o(t){G(U),O=!1},d(t){t&&s(n),T[M].d(),i(z,t),j=!1,o(L)}}}function at(t,n,e){let o=[],r=[],l=0,a=1;function c(t){l=parseInt(t.target.value,10)}return[o,r,a,function(){e(0,o=[...o,{id:o.length+1}])},function(){e(0,o=[])},function(){e(0,o=new Array(l).fill(null).map((t,n)=>({id:n})))},function(){e(1,r=new Array(l).fill(null))},c,function(){e(2,a=2)},t=>c(t)]}class ct extends z{constructor(t){super(),R(this,t,at,lt,l,{})}}function st(n){let e,o,r,l,i,f,d,g;return{c(){e=u("span"),o=p("Prop value: "),r=p(n[0]),l=p(", internal value: "),i=p(n[1]),f=u("button"),f.textContent="Update child",h(f,"class","cell-btn-increment")},m(t,s){c(t,e,s),a(e,o),a(e,r),a(e,l),a(e,i),a(e,f),d||(g=x(f,"click",n[2]),d=!0)},p(t,[n]){1&n&&C(r,t[0]),2&n&&C(i,t[1])},i:t,o:t,d(t){t&&s(e),d=!1,g()}}}function it(t,n,e){let o=0,{value:r}=n;return t.$$set=t=>{"value"in t&&e(0,r=t.value)},[r,o,function(){e(1,o+=1)}]}class ut extends z{constructor(t){super(),R(this,t,it,st,l,{value:0})}}function pt(t,n,e){const o=t.slice();return o[5]=n[e],o[7]=e,o}function ft(t,n){let e,o,r;return o=new ut({props:{value:n[7]+n[2]}}),{key:t,first:null,c(){e=d(),L(o.$$.fragment),this.first=e},m(t,n){c(t,e,n),P(o,t,n),r=!0},p(t,e){n=t;const r={};5&e&&(r.value=n[7]+n[2]),o.$set(r)},i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),r=!1},d(t){t&&s(e),T(o,t)}}}function dt(t){let n,e,r,l,i,d,g,m,b,$,v,y,k=[],w=new Map,D=t[0];const F=t=>t[5].id;for(let n=0;n<D.length;n+=1){let e=pt(t,D,n),o=F(e);w.set(o,k[n]=ft(o,e))}return{c(){n=u("div"),e=u("div"),r=p("Row count: "),l=p(t[1]),i=f(),d=u("button"),d.textContent="Update children",g=f(),m=u("button"),m.textContent="Upate parent",b=f();for(let t=0;t<k.length;t+=1)k[t].c();h(d,"class","row-btn-update-children"),h(m,"class","row-btn-update-self")},m(o,s){c(o,n,s),a(n,e),a(e,r),a(e,l),a(e,i),a(e,d),a(e,g),a(e,m),a(n,b);for(let t=0;t<k.length;t+=1)k[t].m(n,null);$=!0,v||(y=[x(d,"click",t[4]),x(m,"click",t[3])],v=!0)},p(t,[e]){(!$||2&e)&&C(l,t[1]),5&e&&(D=t[0],N(),k=j(k,e,F,1,t,D,w,n,O,ft,null,pt),I())},i(t){if(!$){for(let t=0;t<D.length;t+=1)E(k[t]);$=!0}},o(t){for(let t=0;t<k.length;t+=1)G(k[t]);$=!1},d(t){t&&s(n);for(let t=0;t<k.length;t+=1)k[t].d();v=!1,o(y)}}}function xt(t,n,e){let{columns:o}=n,r=0,l=0;return t.$$set=t=>{"columns"in t&&e(0,o=t.columns)},[o,r,l,function(){e(1,r+=1)},function(){e(2,l+=1)}]}class ht extends z{constructor(t){super(),R(this,t,xt,dt,l,{columns:0})}}function Ct(t,n,e){const o=t.slice();return o[8]=n[e],o}function gt(t,n){let e,o,r;return o=new ht({props:{columns:n[8].columns}}),{key:t,first:null,c(){e=d(),L(o.$$.fragment),this.first=e},m(t,n){c(t,e,n),P(o,t,n),r=!0},p(t,e){n=t;const r={};1&e&&(r.columns=n[8].columns),o.$set(r)},i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),r=!1},d(t){t&&s(e),T(o,t)}}}function mt(t){let n,e,r,l,i,p,d,C,g,m,b,$,v,y,k,w,D=[],F=new Map,A=t[0];const S=t=>t[8].id;for(let n=0;n<A.length;n+=1){let e=Ct(t,A,n),o=S(e);F.set(o,D[n]=gt(o,e))}return{c(){n=u("div"),e=u("div"),r=u("label"),r.textContent="Number of rows",l=f(),i=u("input"),p=f(),d=u("label"),d.textContent="Number of columns",C=f(),g=u("input"),m=f(),b=u("button"),b.textContent="Generate",$=f(),v=u("div");for(let t=0;t<D.length;t+=1)D[t].c();h(i,"id","input-rows"),h(i,"type","number"),h(i,"min","1"),h(g,"id","input-columns"),h(g,"type","number"),h(g,"min","1"),h(b,"id","btn-generate")},m(o,s){c(o,n,s),a(n,e),a(e,r),a(e,l),a(e,i),a(e,p),a(e,d),a(e,C),a(e,g),a(e,m),a(e,b),a(n,$),a(n,v);for(let t=0;t<D.length;t+=1)D[t].m(v,null);y=!0,k||(w=[x(i,"change",t[4]),x(g,"change",t[5]),x(b,"click",t[1])],k=!0)},p(t,[n]){1&n&&(A=t[0],N(),D=j(D,n,S,1,t,A,F,v,O,gt,null,Ct),I())},i(t){if(!y){for(let t=0;t<A.length;t+=1)E(D[t]);y=!0}},o(t){for(let t=0;t<D.length;t+=1)G(D[t]);y=!1},d(t){t&&s(n);for(let t=0;t<D.length;t+=1)D[t].d();k=!1,o(w)}}}function bt(t,n,e){let o=0,r=0,l=[];function a(t){r=parseInt(t,10)}function c(t){o=parseInt(t,10)}return[l,function(){e(0,l=new Array(o).fill(null).map((t,n)=>({id:n,columns:new Array(r).fill(null).map((t,e)=>({id:`row${n}-col${e}`}))})))},a,c,t=>c(t.target.value),t=>a(t.target.value)]}class $t extends z{constructor(t){super(),R(this,t,bt,mt,l,{})}}function vt(t,n,e){const o=t.slice();return o[4]=n[e],o}function yt(n){let e,o,r,l,i,d;return{c(){e=u("div"),o=p(n[2]),r=f(),l=u("button"),l.textContent="Update leaf",h(l,"class","btn-increment-leaf")},m(t,s){c(t,e,s),a(e,o),a(e,r),a(e,l),i||(d=x(l,"click",n[3]),i=!0)},p(t,n){4&n&&C(o,t[2])},i:t,o:t,d(t){t&&s(e),i=!1,d()}}}function kt(t){let n,e,o=Array(t[0]),r=[];for(let n=0;n<o.length;n+=1)r[n]=wt(vt(t,o,n));const l=t=>G(r[t],1,1,()=>{r[t]=null});return{c(){for(let t=0;t<r.length;t+=1)r[t].c();n=d()},m(t,o){for(let n=0;n<r.length;n+=1)r[n].m(t,o);c(t,n,o),e=!0},p(t,e){if(3&e){let a;for(o=Array(t[0]),a=0;a<o.length;a+=1){const l=vt(t,o,a);r[a]?(r[a].p(l,e),E(r[a],1)):(r[a]=wt(l),r[a].c(),E(r[a],1),r[a].m(n.parentNode,n))}for(N(),a=o.length;a<r.length;a+=1)l(a);I()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)E(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)G(r[t]);e=!1},d(t){i(r,t),t&&s(n)}}}function wt(t){let n,e;return n=new At({props:{subtreeDepth:t[1]-1,branchingFactor:t[0]}}),{c(){L(n.$$.fragment)},m(t,o){P(n,t,o),e=!0},p(t,e){const o={};2&e&&(o.subtreeDepth=t[1]-1),1&e&&(o.branchingFactor=t[0]),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){T(n,t)}}}function Dt(t){let n,e,o,r;const l=[kt,yt],a=[];function i(t,n){return t[1]>0?0:1}return e=i(t),o=a[e]=l[e](t),{c(){n=u("div"),o.c()},m(t,o){c(t,n,o),a[e].m(n,null),r=!0},p(t,[r]){let c=e;e=i(t),e===c?a[e].p(t,r):(N(),G(a[c],1,1,()=>{a[c]=null}),I(),o=a[e],o?o.p(t,r):(o=a[e]=l[e](t),o.c()),E(o,1),o.m(n,null))},i(t){r||(E(o),r=!0)},o(t){G(o),r=!1},d(t){t&&s(n),a[e].d()}}}function Ft(t,n,e){let{branchingFactor:o}=n,{subtreeDepth:r}=n,l=0;return t.$$set=t=>{"branchingFactor"in t&&e(0,o=t.branchingFactor),"subtreeDepth"in t&&e(1,r=t.subtreeDepth)},[o,r,l,function(){e(2,l+=1)}]}class At extends z{constructor(t){super(),R(this,t,Ft,Dt,l,{branchingFactor:0,subtreeDepth:1})}}function St(t,n,e){const o=t.slice();return o[8]=n[e],o}function _t(t){let n,e,o=Array(t[0]),r=[];for(let n=0;n<o.length;n+=1)r[n]=Mt(St(t,o,n));const l=t=>G(r[t],1,1,()=>{r[t]=null});return{c(){n=u("div");for(let t=0;t<r.length;t+=1)r[t].c()},m(t,o){c(t,n,o);for(let t=0;t<r.length;t+=1)r[t].m(n,null);e=!0},p(t,e){if(3&e){let a;for(o=Array(t[0]),a=0;a<o.length;a+=1){const l=St(t,o,a);r[a]?(r[a].p(l,e),E(r[a],1)):(r[a]=Mt(l),r[a].c(),E(r[a],1),r[a].m(n,null))}for(N(),a=o.length;a<r.length;a+=1)l(a);I()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)E(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)G(r[t]);e=!1},d(t){t&&s(n),i(r,t)}}}function Mt(t){let n,e;return n=new At({props:{branchingFactor:t[0],subtreeDepth:t[1]-1}}),{c(){L(n.$$.fragment)},m(t,o){P(n,t,o),e=!0},p(t,e){const o={};1&e&&(o.branchingFactor=t[0]),2&e&&(o.subtreeDepth=t[1]-1),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){T(n,t)}}}function Ut(t){let n,e,r,l,i,d,g,m,b,$,v,y,k,w,D,F,A,S,_,M=t[2]&&_t(t);return{c(){n=u("div"),e=u("label"),e.textContent="Select branching factor",r=f(),l=u("input"),i=f(),d=u("label"),d.textContent="Select tree depth",g=f(),m=u("input"),b=f(),$=u("button"),$.textContent="Generate tree",v=f(),y=u("div"),k=p(t[3]),w=f(),D=u("button"),D.textContent="Update root",F=f(),M&&M.c(),h(l,"id","input-branching-factor"),h(l,":value","branchingFactor"),h(m,"id","input-tree-depth"),h(m,":value","treeDepth"),h($,"id","btn-generate"),h(D,"id","btn-increment-root")},m(o,s){c(o,n,s),a(n,e),a(n,r),a(n,l),a(n,i),a(n,d),a(n,g),a(n,m),a(n,b),a(n,$),a(n,v),a(n,y),a(y,k),a(n,w),a(n,D),a(n,F),M&&M.m(n,null),A=!0,S||(_=[x(l,"change",t[4]),x(m,"change",t[5]),x($,"click",t[6]),x(D,"click",t[7])],S=!0)},p(t,[e]){(!A||8&e)&&C(k,t[3]),t[2]?M?(M.p(t,e),4&e&&E(M,1)):(M=_t(t),M.c(),E(M,1),M.m(n,null)):M&&(N(),G(M,1,1,()=>{M=null}),I())},i(t){A||(E(M),A=!0)},o(t){G(M),A=!1},d(t){t&&s(n),M&&M.d(),S=!1,o(_)}}}function Nt(t,n,e){let o=0,r=0,l=!1,a=0;return[o,r,l,a,function(t){e(0,o=parseInt(t.target.value,10))},function(t){e(1,r=parseInt(t.target.value,10))},function(){e(2,l=!0)},function(){e(3,a+=1)}]}class It extends z{constructor(t){super(),R(this,t,Nt,Ut,l,{})}}function Et(n){let e,o,r,l,i,f,d,x,h,g,m,b,$,v,y,k,w,D,F,A,S,_,M,U,N,I,E,G,B,O,j,L,P,T,q,R,z,H,J,K,Q,V,W,X,Y,Z,tt,nt,et,ot,rt,lt,at,ct,st,it,ut,pt,ft,dt,xt,ht,Ct,gt,mt,bt,$t,vt,yt,kt,wt,Dt,Ft,At,St,_t,Mt,Ut,Nt,It,Et,Gt,Bt,Ot,jt,Lt,Pt,Tt,qt,Rt,zt,Ht,Jt,Kt,Qt,Vt,Wt,Xt,Yt,Zt,tn,nn,en;return{c(){e=u("div"),o=u("span"),o.textContent="-",r=u("span"),r.textContent="-",l=u("span"),l.textContent="-",i=u("span"),i.textContent="-",f=u("span"),f.textContent="-",d=u("span"),d.textContent="-",x=u("span"),x.textContent="-",h=u("span"),h.textContent="-",g=u("span"),g.textContent="-",m=u("span"),m.textContent="-",b=u("span"),b.textContent="-",$=u("span"),$.textContent="-",v=u("span"),v.textContent="-",y=u("span"),y.textContent="-",k=u("span"),k.textContent="-",w=u("span"),w.textContent="-",D=u("span"),D.textContent="-",F=u("span"),F.textContent="-",A=u("span"),A.textContent="-",S=u("span"),S.textContent="-",_=u("span"),_.textContent="-",M=u("span"),M.textContent="-",U=u("span"),U.textContent="-",N=u("span"),N.textContent="-",I=u("span"),I.textContent="-",E=u("span"),E.textContent="-",G=u("span"),G.textContent="-",B=u("span"),B.textContent="-",O=u("span"),O.textContent="-",j=u("span"),j.textContent="-",L=u("span"),L.textContent="-",P=u("span"),P.textContent="-",T=u("span"),T.textContent="-",q=u("span"),q.textContent="-",R=u("span"),R.textContent="-",z=u("span"),z.textContent="-",H=u("span"),H.textContent="-",J=u("span"),J.textContent="-",K=u("span"),K.textContent="-",Q=u("span"),Q.textContent="-",V=u("span"),V.textContent="-",W=u("span"),W.textContent="-",X=u("span"),X.textContent="-",Y=u("span"),Y.textContent="-",Z=u("span"),Z.textContent="-",tt=u("span"),tt.textContent="-",nt=u("span"),nt.textContent="-",et=u("span"),et.textContent="-",ot=u("span"),ot.textContent="-",rt=u("span"),rt.textContent="-",lt=u("span"),at=p(n[0]),ct=u("span"),ct.textContent="-",st=u("span"),st.textContent="-",it=u("span"),it.textContent="-",ut=u("span"),ut.textContent="-",pt=u("span"),pt.textContent="-",ft=u("span"),ft.textContent="-",dt=u("span"),dt.textContent="-",xt=u("span"),xt.textContent="-",ht=u("span"),ht.textContent="-",Ct=u("span"),Ct.textContent="-",gt=u("span"),gt.textContent="-",mt=u("span"),mt.textContent="-",bt=u("span"),bt.textContent="-",$t=u("span"),$t.textContent="-",vt=u("span"),vt.textContent="-",yt=u("span"),yt.textContent="-",kt=u("span"),kt.textContent="-",wt=u("span"),wt.textContent="-",Dt=u("span"),Dt.textContent="-",Ft=u("span"),Ft.textContent="-",At=u("span"),At.textContent="-",St=u("span"),St.textContent="-",_t=u("span"),_t.textContent="-",Mt=u("span"),Mt.textContent="-",Ut=u("span"),Ut.textContent="-",Nt=u("span"),Nt.textContent="-",It=u("span"),It.textContent="-",Et=u("span"),Et.textContent="-",Gt=u("span"),Gt.textContent="-",Bt=u("span"),Bt.textContent="-",Ot=u("span"),Ot.textContent="-",jt=u("span"),jt.textContent="-",Lt=u("span"),Lt.textContent="-",Pt=u("span"),Pt.textContent="-",Tt=u("span"),Tt.textContent="-",qt=u("span"),qt.textContent="-",Rt=u("span"),Rt.textContent="-",zt=u("span"),zt.textContent="-",Ht=u("span"),Ht.textContent="-",Jt=u("span"),Jt.textContent="-",Kt=u("span"),Kt.textContent="-",Qt=u("span"),Qt.textContent="-",Vt=u("span"),Vt.textContent="-",Wt=u("span"),Wt.textContent="-",Xt=u("span"),Xt.textContent="-",Yt=u("span"),Yt.textContent="-",Zt=u("span"),Zt.textContent="-",tn=u("span"),tn.textContent="-",nn=u("span"),nn.textContent="-",en=u("span"),en.textContent="-"},m(t,n){c(t,e,n),a(e,o),a(e,r),a(e,l),a(e,i),a(e,f),a(e,d),a(e,x),a(e,h),a(e,g),a(e,m),a(e,b),a(e,$),a(e,v),a(e,y),a(e,k),a(e,w),a(e,D),a(e,F),a(e,A),a(e,S),a(e,_),a(e,M),a(e,U),a(e,N),a(e,I),a(e,E),a(e,G),a(e,B),a(e,O),a(e,j),a(e,L),a(e,P),a(e,T),a(e,q),a(e,R),a(e,z),a(e,H),a(e,J),a(e,K),a(e,Q),a(e,V),a(e,W),a(e,X),a(e,Y),a(e,Z),a(e,tt),a(e,nt),a(e,et),a(e,ot),a(e,rt),a(e,lt),a(lt,at),a(e,ct),a(e,st),a(e,it),a(e,ut),a(e,pt),a(e,ft),a(e,dt),a(e,xt),a(e,ht),a(e,Ct),a(e,gt),a(e,mt),a(e,bt),a(e,$t),a(e,vt),a(e,yt),a(e,kt),a(e,wt),a(e,Dt),a(e,Ft),a(e,At),a(e,St),a(e,_t),a(e,Mt),a(e,Ut),a(e,Nt),a(e,It),a(e,Et),a(e,Gt),a(e,Bt),a(e,Ot),a(e,jt),a(e,Lt),a(e,Pt),a(e,Tt),a(e,qt),a(e,Rt),a(e,zt),a(e,Ht),a(e,Jt),a(e,Kt),a(e,Qt),a(e,Vt),a(e,Wt),a(e,Xt),a(e,Yt),a(e,Zt),a(e,tn),a(e,nn),a(e,en)},p(t,[n]){1&n&&C(at,t[0])},i:t,o:t,d(t){t&&s(e)}}}function Gt(t,n,e){let{value:o}=n;return t.$$set=t=>{"value"in t&&e(0,o=t.value)},[o]}class Bt extends z{constructor(t){super(),R(this,t,Gt,Et,l,{value:0})}}function Ot(t,n,e){const o=t.slice();return o[9]=n[e],o}function jt(t,n){let e,o,r;return o=new Bt({props:{value:n[9].value}}),{key:t,first:null,c(){e=d(),L(o.$$.fragment),this.first=e},m(t,n){c(t,e,n),P(o,t,n),r=!0},p(t,e){n=t;const r={};1&e&&(r.value=n[9].value),o.$set(r)},i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),r=!1},d(t){t&&s(e),T(o,t)}}}function Lt(t){let n,e,r,l,i,p,d,C,g,m,b,$,v,y,k,w,D=[],F=new Map,A=t[0];const S=t=>t[9].id;for(let n=0;n<A.length;n+=1){let e=Ot(t,A,n),o=S(e);F.set(o,D[n]=jt(o,e))}return{c(){n=u("div"),e=u("div"),r=u("div"),l=u("label"),l.textContent="Number of components",i=f(),p=u("input"),d=f(),C=u("button"),C.textContent="Generate",g=f(),m=u("button"),m.textContent="Update children",b=f(),$=u("button"),$.textContent="Update single child",v=f();for(let t=0;t<D.length;t+=1)D[t].c();h(p,"id","input-components"),h(p,"type","number"),h(p,"min","1"),h(p,":value","numChildren"),h(C,"id","btn-generate"),h(m,"id","btn-update"),h($,"id","btn-update-single")},m(o,s){c(o,n,s),a(n,e),a(e,r),a(r,l),a(r,i),a(r,p),a(r,d),a(r,C),a(r,g),a(r,m),a(r,b),a(r,$),a(e,v);for(let t=0;t<D.length;t+=1)D[t].m(e,null);y=!0,k||(w=[x(p,"change",t[7]),x(C,"click",t[1]),x(m,"click",t[3]),x($,"click",t[4])],k=!0)},p(t,[n]){1&n&&(A=t[0],N(),D=j(D,n,S,1,t,A,F,e,O,jt,null,Ot),I())},i(t){if(!y){for(let t=0;t<A.length;t+=1)E(D[t]);y=!0}},o(t){for(let t=0;t<D.length;t+=1)G(D[t]);y=!1},d(t){t&&s(n);for(let t=0;t<D.length;t+=1)D[t].d();k=!1,o(w)}}}function Pt(t,n,e){let o,r=0,l=0,a=0;function c(t){r=parseInt(t,10)}return t.$$.update=()=>{96&t.$$.dirty&&e(0,o=new Array(l).fill(null).map((t,n)=>({id:n,value:n+a})))},[o,function(){e(5,l=r)},c,function(){e(6,a+=1)},function(){const t=Math.floor(Math.random()*Math.floor(o.length));e(0,o[t].value+=1,o)},l,a,t=>c(t.target.value)]}class Tt extends z{constructor(t){super(),R(this,t,Pt,Lt,l,{})}}function qt(t,n,e){const o=t.slice();return o[4]=n[e],o}function Rt(t){let n,e,o=Array(t[0]),r=[];for(let n=0;n<o.length;n+=1)r[n]=zt(qt(t,o,n));const l=t=>G(r[t],1,1,()=>{r[t]=null});return{c(){for(let t=0;t<r.length;t+=1)r[t].c();n=d()},m(t,o){for(let n=0;n<r.length;n+=1)r[n].m(t,o);c(t,n,o),e=!0},p(t,e){if(3&e){let a;for(o=Array(t[0]),a=0;a<o.length;a+=1){const l=qt(t,o,a);r[a]?(r[a].p(l,e),E(r[a],1)):(r[a]=zt(l),r[a].c(),E(r[a],1),r[a].m(n.parentNode,n))}for(N(),a=o.length;a<r.length;a+=1)l(a);I()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)E(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)G(r[t]);e=!1},d(t){i(r,t),t&&s(n)}}}function zt(t){let n,e;return n=new Kt({props:{subtreeDepth:t[1]-1,branchingFactor:t[0]}}),{c(){L(n.$$.fragment)},m(t,o){P(n,t,o),e=!0},p(t,e){const o={};2&e&&(o.subtreeDepth=t[1]-1),1&e&&(o.branchingFactor=t[0]),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){T(n,t)}}}function Ht(t){let n,e,o,r,l,i,d,g,m,b,$,v,y,k,w,D,F,A,S,_,M,U,B,O,j,L,P,T,q,R,z,H,J,K,Q,V,W,X,Y,Z,tt,nt,et,ot,rt,lt,at,ct,st,it,ut,pt,ft,dt,xt,ht,Ct,gt,mt,bt,$t,vt,yt,kt,wt,Dt,Ft,At,St,_t,Mt,Ut,Nt,It,Et,Gt,Bt,Ot,jt,Lt,Pt,Tt,qt,zt,Ht,Jt,Kt,Qt,Vt,Wt,Xt,Yt,Zt,tn,nn,en,on,rn,ln,an,cn,sn,un,pn,fn,dn,xn,hn,Cn,gn,mn,bn,$n,vn=t[1]>0&&Rt(t);return{c(){n=u("div"),e=u("span"),e.textContent="-",o=u("span"),o.textContent="-",r=u("span"),r.textContent="-",l=u("span"),l.textContent="-",i=u("span"),i.textContent="-",d=u("span"),d.textContent="-",g=u("span"),g.textContent="-",m=u("span"),m.textContent="-",b=u("span"),b.textContent="-",$=u("span"),$.textContent="-",v=u("span"),v.textContent="-",y=u("span"),y.textContent="-",k=u("span"),k.textContent="-",w=u("span"),w.textContent="-",D=u("span"),D.textContent="-",F=u("span"),F.textContent="-",A=u("span"),A.textContent="-",S=u("span"),S.textContent="-",_=u("span"),_.textContent="-",M=u("span"),M.textContent="-",U=u("span"),U.textContent="-",B=u("span"),B.textContent="-",O=u("span"),O.textContent="-",j=u("span"),j.textContent="-",L=u("span"),L.textContent="-",P=u("span"),P.textContent="-",T=u("span"),T.textContent="-",q=u("span"),q.textContent="-",R=u("span"),R.textContent="-",z=u("span"),z.textContent="-",H=u("span"),H.textContent="-",J=u("span"),J.textContent="-",K=u("span"),K.textContent="-",Q=u("span"),Q.textContent="-",V=u("span"),V.textContent="-",W=u("span"),W.textContent="-",X=u("span"),X.textContent="-",Y=u("span"),Y.textContent="-",Z=u("span"),Z.textContent="-",tt=u("span"),tt.textContent="-",nt=u("span"),nt.textContent="-",et=u("span"),et.textContent="-",ot=u("span"),ot.textContent="-",rt=u("span"),rt.textContent="-",lt=u("span"),lt.textContent="-",at=u("span"),at.textContent="-",ct=u("span"),ct.textContent="-",st=u("span"),st.textContent="-",it=u("span"),it.textContent="-",ut=u("span"),ut.textContent="-",pt=u("span"),ft=f(),dt=u("div"),xt=p(t[2]),ht=f(),Ct=u("button"),Ct.textContent="Update leaf",gt=f(),mt=u("span"),mt.textContent="-",bt=u("span"),bt.textContent="-",$t=u("span"),$t.textContent="-",vt=u("span"),vt.textContent="-",yt=u("span"),yt.textContent="-",kt=u("span"),kt.textContent="-",wt=u("span"),wt.textContent="-",Dt=u("span"),Dt.textContent="-",Ft=u("span"),Ft.textContent="-",At=u("span"),At.textContent="-",St=u("span"),St.textContent="-",_t=u("span"),_t.textContent="-",Mt=u("span"),Mt.textContent="-",Ut=u("span"),Ut.textContent="-",Nt=u("span"),Nt.textContent="-",It=u("span"),It.textContent="-",Et=u("span"),Et.textContent="-",Gt=u("span"),Gt.textContent="-",Bt=u("span"),Bt.textContent="-",Ot=u("span"),Ot.textContent="-",jt=u("span"),jt.textContent="-",Lt=u("span"),Lt.textContent="-",Pt=u("span"),Pt.textContent="-",Tt=u("span"),Tt.textContent="-",qt=u("span"),qt.textContent="-",zt=u("span"),zt.textContent="-",Ht=u("span"),Ht.textContent="-",Jt=u("span"),Jt.textContent="-",Kt=u("span"),Kt.textContent="-",Qt=u("span"),Qt.textContent="-",Vt=u("span"),Vt.textContent="-",Wt=u("span"),Wt.textContent="-",Xt=u("span"),Xt.textContent="-",Yt=u("span"),Yt.textContent="-",Zt=u("span"),Zt.textContent="-",tn=u("span"),tn.textContent="-",nn=u("span"),nn.textContent="-",en=u("span"),en.textContent="-",on=u("span"),on.textContent="-",rn=u("span"),rn.textContent="-",ln=u("span"),ln.textContent="-",an=u("span"),an.textContent="-",cn=u("span"),cn.textContent="-",sn=u("span"),sn.textContent="-",un=u("span"),un.textContent="-",pn=u("span"),pn.textContent="-",fn=u("span"),fn.textContent="-",dn=u("span"),dn.textContent="-",xn=u("span"),xn.textContent="-",hn=u("span"),hn.textContent="-",Cn=u("span"),gn=f(),vn&&vn.c(),h(Ct,"class","btn-increment-leaf")},m(s,u){c(s,n,u),a(n,e),a(n,o),a(n,r),a(n,l),a(n,i),a(n,d),a(n,g),a(n,m),a(n,b),a(n,$),a(n,v),a(n,y),a(n,k),a(n,w),a(n,D),a(n,F),a(n,A),a(n,S),a(n,_),a(n,M),a(n,U),a(n,B),a(n,O),a(n,j),a(n,L),a(n,P),a(n,T),a(n,q),a(n,R),a(n,z),a(n,H),a(n,J),a(n,K),a(n,Q),a(n,V),a(n,W),a(n,X),a(n,Y),a(n,Z),a(n,tt),a(n,nt),a(n,et),a(n,ot),a(n,rt),a(n,lt),a(n,at),a(n,ct),a(n,st),a(n,it),a(n,ut),a(n,pt),a(n,ft),a(n,dt),a(dt,xt),a(dt,ht),a(dt,Ct),a(n,gt),a(n,mt),a(n,bt),a(n,$t),a(n,vt),a(n,yt),a(n,kt),a(n,wt),a(n,Dt),a(n,Ft),a(n,At),a(n,St),a(n,_t),a(n,Mt),a(n,Ut),a(n,Nt),a(n,It),a(n,Et),a(n,Gt),a(n,Bt),a(n,Ot),a(n,jt),a(n,Lt),a(n,Pt),a(n,Tt),a(n,qt),a(n,zt),a(n,Ht),a(n,Jt),a(n,Kt),a(n,Qt),a(n,Vt),a(n,Wt),a(n,Xt),a(n,Yt),a(n,Zt),a(n,tn),a(n,nn),a(n,en),a(n,on),a(n,rn),a(n,ln),a(n,an),a(n,cn),a(n,sn),a(n,un),a(n,pn),a(n,fn),a(n,dn),a(n,xn),a(n,hn),a(n,Cn),a(n,gn),vn&&vn.m(n,null),mn=!0,bn||($n=x(Ct,"click",t[3]),bn=!0)},p(t,[e]){(!mn||4&e)&&C(xt,t[2]),t[1]>0?vn?(vn.p(t,e),2&e&&E(vn,1)):(vn=Rt(t),vn.c(),E(vn,1),vn.m(n,null)):vn&&(N(),G(vn,1,1,()=>{vn=null}),I())},i(t){mn||(E(vn),mn=!0)},o(t){G(vn),mn=!1},d(t){t&&s(n),vn&&vn.d(),bn=!1,$n()}}}function Jt(t,n,e){let{branchingFactor:o}=n,{subtreeDepth:r}=n,l=0;return t.$$set=t=>{"branchingFactor"in t&&e(0,o=t.branchingFactor),"subtreeDepth"in t&&e(1,r=t.subtreeDepth)},[o,r,l,function(){e(2,l+=1)}]}class Kt extends z{constructor(t){super(),R(this,t,Jt,Ht,l,{branchingFactor:0,subtreeDepth:1})}}function Qt(t,n,e){const o=t.slice();return o[8]=n[e],o}function Vt(t){let n,e,o=Array(t[0]),r=[];for(let n=0;n<o.length;n+=1)r[n]=Wt(Qt(t,o,n));const l=t=>G(r[t],1,1,()=>{r[t]=null});return{c(){n=u("div");for(let t=0;t<r.length;t+=1)r[t].c()},m(t,o){c(t,n,o);for(let t=0;t<r.length;t+=1)r[t].m(n,null);e=!0},p(t,e){if(3&e){let a;for(o=Array(t[0]),a=0;a<o.length;a+=1){const l=Qt(t,o,a);r[a]?(r[a].p(l,e),E(r[a],1)):(r[a]=Wt(l),r[a].c(),E(r[a],1),r[a].m(n,null))}for(N(),a=o.length;a<r.length;a+=1)l(a);I()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)E(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)G(r[t]);e=!1},d(t){t&&s(n),i(r,t)}}}function Wt(t){let n,e;return n=new Kt({props:{branchingFactor:t[0],subtreeDepth:t[1]-1}}),{c(){L(n.$$.fragment)},m(t,o){P(n,t,o),e=!0},p(t,e){const o={};1&e&&(o.branchingFactor=t[0]),2&e&&(o.subtreeDepth=t[1]-1),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){T(n,t)}}}function Xt(t){let n,e,r,l,i,d,g,m,b,$,v,y,k,w,D,F,A,S,_,M=t[2]&&Vt(t);return{c(){n=u("div"),e=u("label"),e.textContent="Select branching factor",r=f(),l=u("input"),i=f(),d=u("label"),d.textContent="Select tree depth",g=f(),m=u("input"),b=f(),$=u("button"),$.textContent="Generate tree",v=f(),y=u("div"),k=p(t[3]),w=f(),D=u("button"),D.textContent="Update root",F=f(),M&&M.c(),h(l,"id","input-branching-factor"),h(l,":value","branchingFactor"),h(m,"id","input-tree-depth"),h(m,":value","treeDepth"),h($,"id","btn-generate"),h(D,"id","btn-increment-root")},m(o,s){c(o,n,s),a(n,e),a(n,r),a(n,l),a(n,i),a(n,d),a(n,g),a(n,m),a(n,b),a(n,$),a(n,v),a(n,y),a(y,k),a(n,w),a(n,D),a(n,F),M&&M.m(n,null),A=!0,S||(_=[x(l,"change",t[4]),x(m,"change",t[5]),x($,"click",t[6]),x(D,"click",t[7])],S=!0)},p(t,[e]){(!A||8&e)&&C(k,t[3]),t[2]?M?(M.p(t,e),4&e&&E(M,1)):(M=Vt(t),M.c(),E(M,1),M.m(n,null)):M&&(N(),G(M,1,1,()=>{M=null}),I())},i(t){A||(E(M),A=!0)},o(t){G(M),A=!1},d(t){t&&s(n),M&&M.d(),S=!1,o(_)}}}function Yt(t,n,e){let o=0,r=0,l=!1,a=0;return[o,r,l,a,function(t){e(0,o=parseInt(t.target.value,10))},function(t){e(1,r=parseInt(t.target.value,10))},function(){e(2,l=!0)},function(){e(3,a+=1)}]}class Zt extends z{constructor(t){super(),R(this,t,Yt,Xt,l,{})}}function tn(t,n,e){const o=t.slice();return o[5]=n[e],o}function nn(t,n,e){const o=t.slice();return o[8]=n[e],o[10]=e,o}function en(t,n){let e,o,r,l,i,d,x,g,m,b,$,v,y,k,w,D,F,A,S,_,M,U,N,I,E,G,B,O,j,L,P,T=n[8].value0+"",q=n[8].value1+"",R=n[8].value2+"",z=n[8].value3+"",H=n[8].value4+"",J=n[8].value5+"",K=n[8].value6+"",Q=n[8].value7+"",V=n[8].value8+"",W=n[8].value9+"";return{key:t,first:null,c(){e=u("div"),o=u("span"),r=p(T),l=f(),i=u("span"),d=p(q),x=f(),g=u("span"),m=p(R),b=f(),$=u("span"),v=p(z),y=f(),k=u("span"),w=p(H),D=f(),F=u("span"),A=p(J),S=f(),_=u("span"),M=p(K),U=f(),N=u("span"),I=p(Q),E=f(),G=u("span"),B=p(V),O=f(),j=u("span"),L=p(W),h(e,"key",P=n[10]),this.first=e},m(t,n){c(t,e,n),a(e,o),a(o,r),a(e,l),a(e,i),a(i,d),a(e,x),a(e,g),a(g,m),a(e,b),a(e,$),a($,v),a(e,y),a(e,k),a(k,w),a(e,D),a(e,F),a(F,A),a(e,S),a(e,_),a(_,M),a(e,U),a(e,N),a(N,I),a(e,E),a(e,G),a(G,B),a(e,O),a(e,j),a(j,L)},p(t,o){n=t,4&o&&T!==(T=n[8].value0+"")&&C(r,T),4&o&&q!==(q=n[8].value1+"")&&C(d,q),4&o&&R!==(R=n[8].value2+"")&&C(m,R),4&o&&z!==(z=n[8].value3+"")&&C(v,z),4&o&&H!==(H=n[8].value4+"")&&C(w,H),4&o&&J!==(J=n[8].value5+"")&&C(A,J),4&o&&K!==(K=n[8].value6+"")&&C(M,K),4&o&&Q!==(Q=n[8].value7+"")&&C(I,Q),4&o&&V!==(V=n[8].value8+"")&&C(B,V),4&o&&W!==(W=n[8].value9+"")&&C(L,W),4&o&&P!==(P=n[10])&&h(e,"key",P)},d(t){t&&s(e)}}}function on(t){let n,e,o=Array(t[0]),r=[];for(let n=0;n<o.length;n+=1)r[n]=rn(tn(t,o,n));const l=t=>G(r[t],1,1,()=>{r[t]=null});return{c(){for(let t=0;t<r.length;t+=1)r[t].c();n=d()},m(t,o){for(let n=0;n<r.length;n+=1)r[n].m(t,o);c(t,n,o),e=!0},p(t,e){if(7&e){let a;for(o=Array(t[0]),a=0;a<o.length;a+=1){const l=tn(t,o,a);r[a]?(r[a].p(l,e),E(r[a],1)):(r[a]=rn(l),r[a].c(),E(r[a],1),r[a].m(n.parentNode,n))}for(N(),a=o.length;a<r.length;a+=1)l(a);I()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)E(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)G(r[t]);e=!1},d(t){i(r,t),t&&s(n)}}}function rn(t){let n,e;return n=new cn({props:{subtreeDepth:t[1]-1,branchingFactor:t[0],items:t[2]}}),{c(){L(n.$$.fragment)},m(t,o){P(n,t,o),e=!0},p(t,e){const o={};2&e&&(o.subtreeDepth=t[1]-1),1&e&&(o.branchingFactor=t[0]),4&e&&(o.items=t[2]),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){T(n,t)}}}function ln(t){let n,e,o,r,l,i,d,g,m,b,$=[],v=new Map,y=t[2];const k=t=>t[10];for(let n=0;n<y.length;n+=1){let e=nn(t,y,n),o=k(e);v.set(o,$[n]=en(o,e))}let w=t[1]>0&&on(t);return{c(){n=u("div");for(let t=0;t<$.length;t+=1)$[t].c();e=f(),o=u("div"),r=p(t[3]),l=f(),i=u("button"),i.textContent="Update leaf",d=f(),w&&w.c(),h(i,"class","btn-increment-leaf")},m(s,u){c(s,n,u);for(let t=0;t<$.length;t+=1)$[t].m(n,null);a(n,e),a(n,o),a(o,r),a(o,l),a(o,i),a(n,d),w&&w.m(n,null),g=!0,m||(b=x(i,"click",t[4]),m=!0)},p(t,[o]){4&o&&(y=t[2],$=j($,o,k,1,t,y,v,n,B,en,e,nn)),(!g||8&o)&&C(r,t[3]),t[1]>0?w?(w.p(t,o),2&o&&E(w,1)):(w=on(t),w.c(),E(w,1),w.m(n,null)):w&&(N(),G(w,1,1,()=>{w=null}),I())},i(t){g||(E(w),g=!0)},o(t){G(w),g=!1},d(t){t&&s(n);for(let t=0;t<$.length;t+=1)$[t].d();w&&w.d(),m=!1,b()}}}function an(t,n,e){let{branchingFactor:o}=n,{subtreeDepth:r}=n,{items:l}=n,a=0;return t.$$set=t=>{"branchingFactor"in t&&e(0,o=t.branchingFactor),"subtreeDepth"in t&&e(1,r=t.subtreeDepth),"items"in t&&e(2,l=t.items)},[o,r,l,a,function(){e(3,a+=1)}]}class cn extends z{constructor(t){super(),R(this,t,an,ln,l,{branchingFactor:0,subtreeDepth:1,items:2})}}function sn(t,n,e){const o=t.slice();return o[9]=n[e],o}function un(t){let n,e,o=Array(t[0]),r=[];for(let n=0;n<o.length;n+=1)r[n]=pn(sn(t,o,n));const l=t=>G(r[t],1,1,()=>{r[t]=null});return{c(){n=u("div");for(let t=0;t<r.length;t+=1)r[t].c()},m(t,o){c(t,n,o);for(let t=0;t<r.length;t+=1)r[t].m(n,null);e=!0},p(t,e){if(19&e){let a;for(o=Array(t[0]),a=0;a<o.length;a+=1){const l=sn(t,o,a);r[a]?(r[a].p(l,e),E(r[a],1)):(r[a]=pn(l),r[a].c(),E(r[a],1),r[a].m(n,null))}for(N(),a=o.length;a<r.length;a+=1)l(a);I()}},i(t){if(!e){for(let t=0;t<o.length;t+=1)E(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)G(r[t]);e=!1},d(t){t&&s(n),i(r,t)}}}function pn(t){let n,e;return n=new cn({props:{branchingFactor:t[0],subtreeDepth:t[1]-1,items:t[4]}}),{c(){L(n.$$.fragment)},m(t,o){P(n,t,o),e=!0},p(t,e){const o={};1&e&&(o.branchingFactor=t[0]),2&e&&(o.subtreeDepth=t[1]-1),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){T(n,t)}}}function fn(t){let n,e,r,l,i,d,g,m,b,$,v,y,k,w,D,F,A,S,_,M=t[2]&&un(t);return{c(){n=u("div"),e=u("label"),e.textContent="Select branching factor",r=f(),l=u("input"),i=f(),d=u("label"),d.textContent="Select tree depth",g=f(),m=u("input"),b=f(),$=u("button"),$.textContent="Generate tree",v=f(),y=u("div"),k=p(t[3]),w=f(),D=u("button"),D.textContent="Update root",F=f(),M&&M.c(),h(l,"id","input-branching-factor"),h(l,":value","branchingFactor"),h(m,"id","input-tree-depth"),h(m,":value","treeDepth"),h($,"id","btn-generate"),h(D,"id","btn-increment-root")},m(o,s){c(o,n,s),a(n,e),a(n,r),a(n,l),a(n,i),a(n,d),a(n,g),a(n,m),a(n,b),a(n,$),a(n,v),a(n,y),a(y,k),a(n,w),a(n,D),a(n,F),M&&M.m(n,null),A=!0,S||(_=[x(l,"change",t[5]),x(m,"change",t[6]),x($,"click",t[7]),x(D,"click",t[8])],S=!0)},p(t,[e]){(!A||8&e)&&C(k,t[3]),t[2]?M?(M.p(t,e),4&e&&E(M,1)):(M=un(t),M.c(),E(M,1),M.m(n,null)):M&&(N(),G(M,1,1,()=>{M=null}),I())},i(t){A||(E(M),A=!0)},o(t){G(M),A=!1},d(t){t&&s(n),M&&M.d(),S=!1,o(_)}}}function dn(t,n,e){let o=0,r=0,l=!1,a=0,c=Array(10).fill(null).map(()=>({value0:0,value1:1,value2:2,value3:3,value4:4,value5:5,value6:6,value7:7,value8:8,value9:9}));return[o,r,l,a,c,function(t){e(0,o=parseInt(t.target.value,10))},function(t){e(1,r=parseInt(t.target.value,10))},function(){e(2,l=!0)},function(){e(3,a+=1)}]}class xn extends z{constructor(t){super(),R(this,t,dn,fn,l,{})}}function hn(t){let n,e,o;var r=t[1];return r&&(n=new r({})),{c(){n&&L(n.$$.fragment),e=d()},m(t,r){n&&P(n,t,r),c(t,e,r),o=!0},p(t,o){if(r!==(r=t[1])){if(n){N();const t=n;G(t.$$.fragment,1,0,()=>{T(t,1)}),I()}r?(n=new r({}),L(n.$$.fragment),E(n.$$.fragment,1),P(n,e.parentNode,e)):n=null}},i(t){o||(n&&E(n.$$.fragment,t),o=!0)},o(t){n&&G(n.$$.fragment,t),o=!1},d(t){t&&s(e),n&&T(n,t)}}}function Cn(n){let e,r,l,i,d,C,g,m,b,$,v,y,k,w,D,F,A,S,_,M,U,N,I,E,G,B,O,j,L,P,T,q,R,z,H;return{c(){e=u("div"),r=u("h4"),r.textContent="Select scenario",l=f(),i=u("div"),d=u("div"),C=u("label"),C.textContent="Scenario 1: Generate and delete components",g=f(),m=u("button"),m.textContent="Select",b=f(),$=u("div"),v=u("label"),y=p("Scenario 2: Update components in a flat DOM tree\n              "),k=u("button"),k.textContent="Select",w=f(),D=u("div"),F=u("label"),A=p("Scenario 3: Update components in a branching DOM tree\n              "),S=u("button"),S.textContent="Select",_=f(),M=u("div"),U=u("label"),N=p("Scenario 4: Update components containing mostly static content\n              "),I=u("button"),I.textContent="Select",E=f(),G=u("div"),B=u("label"),O=p("Scenario 5\n              "),j=u("button"),j.textContent="Select",L=f(),P=u("div"),T=u("label"),q=p("Scenario 6\n              "),R=u("button"),R.textContent="Select",h(m,"id","btn-scen-1"),h(k,"id","btn-scen-2"),h(S,"id","btn-scen-3"),h(I,"id","btn-scen-4"),h(j,"id","btn-scen-5"),h(R,"id","btn-scen-6")},m(t,o){c(t,e,o),a(e,r),a(e,l),a(e,i),a(i,d),a(d,C),a(d,g),a(d,m),a(i,b),a(i,$),a($,v),a(v,y),a(v,k),a(i,w),a(i,D),a(D,F),a(F,A),a(F,S),a(i,_),a(i,M),a(M,U),a(U,N),a(U,I),a(i,E),a(i,G),a(G,B),a(B,O),a(B,j),a(i,L),a(i,P),a(P,T),a(T,q),a(T,R),z||(H=[x(m,"click",n[3]),x(k,"click",n[4]),x(S,"click",n[5]),x(I,"click",n[6]),x(j,"click",n[7]),x(R,"click",n[8])],z=!0)},p:t,i:t,o:t,d(t){t&&s(e),z=!1,o(H)}}}function gn(t){let n,e,o,r,l;const i=[Cn,hn],p=[];function f(t,n){return null==t[0]?0:1}return o=f(t),r=p[o]=i[o](t),{c(){n=u("main"),e=u("div"),r.c()},m(t,r){c(t,n,r),a(n,e),p[o].m(e,null),l=!0},p(t,[n]){let l=o;o=f(t),o===l?p[o].p(t,n):(N(),G(p[l],1,1,()=>{p[l]=null}),I(),r=p[o],r?r.p(t,n):(r=p[o]=i[o](t),r.c()),E(r,1),r.m(e,null))},i(t){l||(E(r),l=!0)},o(t){G(r),l=!1},d(t){t&&s(n),p[o].d()}}}function mn(t,n,e){let o;function r(t){e(0,l=t)}let l=null;return t.$$.update=()=>{1&t.$$.dirty&&e(1,o=1===l?ct:2===l?$t:3===l?It:4===l?Tt:5===l?Zt:6===l?xn:null)},[l,o,r,()=>r(1),()=>r(2),()=>r(3),()=>r(4),()=>r(5),()=>r(6)]}return new class extends z{constructor(t){super(),R(this,t,mn,gn,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
