var g=Object.defineProperty,h=Object.defineProperties;var f=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var m=(a,e,n)=>e in a?g(a,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[e]=n,i=(a,e)=>{for(var n in e||(e={}))S.call(e,n)&&m(a,n,e[n]);if(x)for(var n of x(e))k.call(e,n)&&m(a,n,e[n]);return a},d=(a,e)=>h(a,f(e));import{r as l,j as o,c as E,b,a1 as j,a2 as y,a3 as A,F as I,a4 as O,S as T}from"./vendor.612e55a5.js";import{d as C}from"./ExpandMore.57c07b9b.js";const F=a=>{var r;const{expandable:e,expanded:n,onToggle:s,unmount:p}=a;return l.exports.useEffect(()=>{e.initiallyOpened!==n&&s(e.id)},[e.initiallyOpened,s]),o(E,{sx:{flexGrow:1},children:b(j,{expanded:n,onChange:()=>s(e.id),children:[o(y,{id:e.id,expandIcon:(r=e.expandIcon)!=null?r:o(C,{}),children:e.summary}),o(A,{children:(!p||n)&&o(I,{children:e.details})}),e.actions&&o(O,{children:e.actions})]})})},M=l.exports.memo(F),B=a=>{const{expandables:e,unmount:n=!0,stackProps:s}=a,[p,r]=l.exports.useState(()=>e.reduce((t,c)=>d(i({},t),{[c.id]:c.initiallyOpened}),{})),u=l.exports.useCallback(t=>{r(c=>d(i({},c),{[t]:!c[t]}))},[]);return o(T,d(i({spacing:1},s),{children:e.filter(t=>t.skip!==!0).map(t=>o(M,{expandable:t,expanded:!!p[t.id],onToggle:u,unmount:n},t.id))}))};export{B as E};