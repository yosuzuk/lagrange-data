import{j as e,a as o,F as x,B as v,S as B,T as p,P as S,E as O,G as b,H as M,W as f,u as P,aG as $,aH as k,r as C,Q as d,Z as L,b as R,aI as W,aJ as U,l as w,k as H}from"./index.9f9b351b.js";import{d as j,a as q,b as z,C as G}from"./ConfirmationDialog.86fec781.js";import{S as Y,a as K,s as J,c as Q}from"./ShipTypeFilterButton.b9b8ce74.js";import{A as Z}from"./ActionBar.a7b2dc0b.js";import{d as V}from"./Settings.6da274d0.js";import{T as I,a as D}from"./ToggleButtonGroup.a48ac063.js";import{A as X,a as ee,b as ue}from"./AccordionSummary.2ded0dcb.js";import{N as te,P as ie}from"./PageContent.5249989f.js";import{P as se}from"./PageFooter.99b900d4.js";import"./ResponsiveDialog.001ed184.js";import"./domUtils.0fc10fd6.js";import"./MenuItem.a46a301d.js";const ne=i=>{const{shipFilter:u,onCancel:t,onSave:s,onReset:l,onFilter:r}=i;return e(Z,{left:a=>e(Y,{filter:u,onChange:r,researchManufacturer:!1,researchStrategyTypes:!1,researchTacticTypes:!1,buttonProps:a},"filter"),right:a=>o(x,{children:[e(v,{variant:"outlined",startIcon:e(j,{}),onClick:l,...a,children:"\u521D\u671F\u5316"},"reset"),e(v,{variant:"outlined",startIcon:e(q,{}),onClick:t,...a,children:"\u30AD\u30E3\u30F3\u30BB\u30EB"},"cancel"),e(v,{variant:"contained",startIcon:e(z,{}),onClick:s,...a,children:"\u4FDD\u5B58"},"save")]})})},T=i=>{const{label:u,options:t,possession:s,onChange:l}=i,r=(a,c)=>{l(c===null?S.UNDEFINED:Number(c))};return o(B,{spacing:1,direction:"row",alignItems:"center",children:[e(p,{variant:"body2",children:u}),o(I,{size:"small",color:"primary",value:`${s}`,exclusive:!0,onChange:r,children:[e(D,{value:`${S.POSSESSED}`,children:t[0]}),e(D,{value:`${S.NOT_POSSESSED}`,children:t[1]})]})]})};var y={},ae=b.exports;Object.defineProperty(y,"__esModule",{value:!0});var N=y.default=void 0,re=ae(O),oe=M,le=(0,re.default)((0,oe.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear");N=y.default=le;const _=i=>{const{wish:u,onChange:t}=i,s=(l,r)=>{t(r===null||r==="clear"?f.UNDEFINED:Number(r))};return o(B,{spacing:1,direction:"row",alignItems:"center",children:[e(p,{variant:"body2",children:"\u30AC\u30C1\u30E3\u3067"}),o(I,{size:"small",color:"primary",value:`${u}`,exclusive:!0,onChange:s,children:[e(D,{value:`${f.WANTED}`,children:"\u51FA\u3066\u6B32\u3057\u3044"}),e(D,{value:`${f.NOT_WANTED}`,children:"\u51FA\u3066\u6B32\u3057\u304F\u306A\u3044"}),u!==f.UNDEFINED&&e(D,{value:"clear",children:e(N,{})})]})]})},ce=i=>{const{ship:u,...t}=i,{userSettings:s,setShipPossession:l,setShipWish:r,setModulePossession:a,setModuleWish:c}=P(),E=$(u.id,s),h=k(u.id,s),F=C.exports.useMemo(()=>h!==f.UNDEFINED?!0:u.source===d.TECH_FILE&&E===S.NOT_POSSESSED,[u,E,h]);return e(L,{elevation:2,...t,children:e(R,{p:1,children:o(B,{spacing:3,children:[e(p,{variant:"h6",children:u.name}),e(T,{label:de(u),options:he(u),possession:E,onChange:n=>l(u.id,n)}),F&&e(_,{wish:h,onChange:n=>r(u.id,n)}),(u.source===d.TECH_FILE||u.source===d.STARTER_SHIP)&&E===S.POSSESSED&&u.modules&&u.modules.filter(n=>!n.defaultModule).map(n=>{const A=W(n.id,u.id,s);return o(C.exports.Fragment,{children:[e(p,{variant:"h6",children:`${n.category}${n.categoryNumber} ${n.name}`}),e(T,{label:"\u30B7\u30B9\u30C6\u30E0\u3092",options:["\u6301\u3063\u3066\u3044\u308B","\u6301\u3063\u3066\u3044\u306A\u3044"],possession:A,onChange:m=>a(n.id,u.id,m)}),A===S.NOT_POSSESSED&&e(_,{wish:U(n.id,u.id,s),onChange:m=>c(n.id,u.id,m)})]},n.id)})]})})})};function de(i){switch(i.source){case d.CITY_TRADE:return"\u90FD\u5E02\u3067";case d.DOCK_EFFECT:return"\u81E8\u6642\u8A2D\u8A08\u56F3\u3092";default:return"\u8A2D\u8A08\u56F3\u3092"}}function he(i){switch(i.source){case d.CITY_TRADE:return["\u8CB7\u3063\u3066\u3044\u308B","\u8CB7\u3063\u3066\u3044\u306A\u3044"];default:return["\u6301\u3063\u3066\u3044\u308B","\u6301\u3063\u3066\u3044\u306A\u3044"]}}const g=i=>{const{id:u,title:t,shipDefinitions:s,initiallyOpened:l,preRenderDetails:r=!1}=i,[a,c]=C.exports.useState(l);return o(X,{expanded:a,onChange:(h,F)=>{c(F)},children:[e(ee,{id:u,expandIcon:e(V,{}),children:e(p,{variant:"body1",children:t})}),e(ue,{children:(a||r)&&e(B,{spacing:3,children:s.map(h=>e(ce,{ship:h},h.id))})})]})},pe=i=>{const{shipFilter:u}=i,t=C.exports.useMemo(()=>{const s=K(w,u);return J(s)},[u]);return o(B,{spacing:1,children:[e("div",{children:e(g,{id:"tech-file-ships",title:"\u6280\u8853\u30D5\u30A1\u30A4\u30EB\u304B\u3089\u624B\u306B\u5165\u308B\u8266\u8239/\u8A2D\u8A08\u56F3",initiallyOpened:!1,preRenderDetails:!0,shipDefinitions:t[d.TECH_FILE]})}),e("div",{children:e(g,{id:"city-trade-ships",title:"\u90FD\u5E02\u3067\u8CB7\u3048\u308B\u8266\u8239",initiallyOpened:!1,shipDefinitions:t[d.CITY_TRADE]})}),e("div",{children:e(g,{id:"dock-effect-ships",title:"\u7D50\u5408\u52B9\u679C\u3067\u624B\u306B\u5165\u308B\u8266\u8239/\u81E8\u6642\u8A2D\u8A08\u56F3",initiallyOpened:!1,shipDefinitions:t[d.DOCK_EFFECT]})}),e("div",{children:e(g,{id:"starter-ships",title:"\u521D\u671F\u914D\u5E03\u3067\u624B\u306B\u5165\u308B\u8266\u8239/\u8A2D\u8A08\u56F3",initiallyOpened:!1,shipDefinitions:t[d.STARTER_SHIP]})})]})},Te=()=>{const i=H(),{saveUserSettings:u,restoreUserSettings:t,resetUserSettings:s}=P(),[l,r]=C.exports.useState(Q),[a,c]=C.exports.useState(!1);return C.exports.useEffect(()=>()=>{t()},[t]),o(x,{children:[e(te,{currentRoute:"/myList"}),e(ne,{shipFilter:l,onCancel:()=>{t(),i("/myList")},onReset:()=>{c(!0)},onSave:()=>{u(),i("/myList")},onFilter:r}),e(ie,{children:o(R,{p:1,children:[o(B,{pt:1,pb:2,spacing:2,children:[e(p,{variant:"body2",children:"\u3053\u3053\u3067\u306F\u8266\u8239/\u8A2D\u8A08\u56F3\u306E\u6240\u6709\u72B6\u614B\u3092\u8A2D\u5B9A\u3067\u304D\u307E\u3059\u3002"}),e(p,{variant:"body2",children:"\u5168\u3066\u7D30\u304B\u304F\u8A2D\u5B9A\u3059\u308B\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}),e(p,{variant:"body2",children:"\u8A2D\u5B9A\u30C7\u30FC\u30BF\u306F\u30D6\u30E9\u30A6\u30B6\u306E\u30ED\u30FC\u30AB\u30EB\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002"})]}),e(pe,{shipFilter:l})]})}),a&&e(G,{title:"\u521D\u671F\u5316",question:"\u30DE\u30A4\u30EA\u30B9\u30C8\u8A2D\u5B9A\u3092\u521D\u671F\u72B6\u614B\u306B\u623B\u3057\u307E\u3059\u304B\uFF1F",cancelText:"\u30AD\u30E3\u30F3\u30BB\u30EB",confirmText:"\u521D\u671F\u5316",onCancel:()=>{c(!1)},onConfirm:()=>{c(!1),s()}}),e(se,{})]})};export{Te as MyListEditPage,Te as default};
