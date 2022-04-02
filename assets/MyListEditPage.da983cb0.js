var w=Object.defineProperty,q=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var j=(s,t,n)=>t in s?w(s,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[t]=n,p=(s,t)=>{for(var n in t||(t={}))_.call(t,n)&&j(s,n,t[n]);if(v)for(var n of v(t))N.call(t,n)&&j(s,n,t[n]);return s},C=(s,t)=>q(s,z(t));var O=(s,t)=>{var n={};for(var i in s)_.call(s,i)&&t.indexOf(i)<0&&(n[i]=s[i]);if(s!=null&&v)for(var i of v(s))t.indexOf(i)<0&&N.call(s,i)&&(n[i]=s[i]);return n};import{j as e,b as l,F as k,h as T,S as B,T as f,aa as P,ab as F,r as d,t as H,c as $,$ as Y,a0 as K,a1 as G,q as J}from"./vendor.d72687a6.js";import{d as Q,a as V,b as X,C as Z}from"./ConfirmationDialog.92f8f039.js";import{S as ee,a as te,s as se,c as ne}from"./ShipTypeFilterButton.d7bbd169.js";import{A as ie}from"./ActionBar.6c4cab2b.js";import{g as ue,h as g,c as ae}from"./index.752300b5.js";import{a as re,g as L,s as oe,c as le}from"./userSettingsUtils.680bf45f.js";import{d as ce}from"./Settings.95cfa736.js";import{P as m,W as A}from"./WishState.3db35fd5.js";import{c as de,i as he,r as pe,N as Ce,C as ge}from"./NavigationBar.60fa7a4c.js";import"./ResponsiveDialog.3bf70d89.js";import"./domUtils.e9df6b0f.js";const fe=s=>{const{shipFilter:t,onCancel:n,onSave:i,onReset:r,onFilter:a}=s;return e(ie,{left:u=>e(ee,{filter:t,onChange:a,researchManufacturer:!1,researchStrategyTypes:!1,researchTacticTypes:!1,buttonProps:u},"filter"),right:u=>l(k,{children:[e(T,C(p({variant:"outlined",startIcon:e(Q,{}),onClick:r},u),{children:"\u521D\u671F\u5316"}),"reset"),e(T,C(p({variant:"outlined",startIcon:e(V,{}),onClick:n},u),{children:"\u30AD\u30E3\u30F3\u30BB\u30EB"}),"cancel"),e(T,C(p({variant:"contained",startIcon:e(X,{}),onClick:i},u),{children:"\u4FDD\u5B58"}),"save")]})})},Se=s=>{const{shipId:t,possession:n,onChange:i}=s,r=(u,o)=>{i(t,o===null?m.UNDEFINED:Number(o))},a=ue(t).source;return l(B,{spacing:1,direction:"row",alignItems:"center",children:[e(f,{variant:"body1",children:Be(a)}),l(P,{size:"small",color:"primary",value:`${n}`,exclusive:!0,onChange:r,children:[e(F,{value:`${m.POSSESSED}`,children:U(a,!0)}),e(F,{value:`${m.NOT_POSSESSED}`,children:U(a,!1)})]})]})};function Be(s){switch(s){case g.CITY_TRADE:return"\u90FD\u5E02\u3067";case g.DOCK_EFFECT:return"\u81E8\u6642\u8A2D\u8A08\u56F3\u3092";default:return"\u8A2D\u8A08\u56F3\u3092"}}function U(s,t){switch(s){case g.CITY_TRADE:return t?"\u8CB7\u3063\u3066\u3044\u308B":"\u8CB7\u3063\u3066\u3044\u306A\u3044";default:return t?"\u6301\u3063\u3066\u3044\u308B":"\u6301\u3063\u3066\u3044\u306A\u3044"}}var x={},De=he.exports;Object.defineProperty(x,"__esModule",{value:!0});var M=x.default=void 0,Ee=De(de),Fe=pe,me=(0,Ee.default)((0,Fe.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear");M=x.default=me;const Ae=s=>{const{shipId:t,wish:n,onChange:i}=s,r=(a,u)=>{i(t,u===null||u==="clear"?A.UNDEFINED:Number(u))};return l(B,{spacing:1,direction:"row",alignItems:"center",children:[e(f,{variant:"body1",children:"\u30AC\u30C1\u30E3\u3067"}),l(P,{size:"small",color:"primary",value:`${n}`,exclusive:!0,onChange:r,children:[e(F,{value:`${A.WANTED}`,children:"\u51FA\u3066\u6B32\u3057\u3044"}),e(F,{value:`${A.NOT_WANTED}`,children:"\u51FA\u3066\u6B32\u3057\u304F\u306A\u3044"}),n!==A.UNDEFINED&&e(F,{value:"clear",children:e(M,{})})]})]})},ve=s=>{const o=s,{ship:t,possession:n,wish:i,onPossessionChange:r,onWishChange:a}=o,u=O(o,["ship","possession","wish","onPossessionChange","onWishChange"]);return e(H,C(p({elevation:2},u),{children:e($,{p:1,children:l(B,{spacing:3,children:[e(f,{variant:"h6",children:t.name}),e(Se,{shipId:t.id,possession:n,onChange:r}),n===m.NOT_POSSESSED&&t.source===g.TECH_FILE&&e(Ae,{shipId:t.id,wish:i,onChange:a})]})})}))},ye=d.exports.memo(ve),y=s=>{const{id:t,title:n,shipDefinitions:i,shipSetting:r,initiallyOpened:a,handlePossessionChange:u,handleWishChange:o,preRenderDetails:c=!1}=s,[h,I]=d.exports.useState(a);return l(Y,{expanded:h,onChange:(S,D)=>{I(D)},children:[e(K,{id:t,expandIcon:e(ce,{}),children:e(f,{variant:"body1",children:n})}),e(G,{children:(h||c)&&e(B,{spacing:3,children:i.map(S=>{var D,E,b,R;return e(ye,{ship:S,possession:(E=(D=r[S.id])==null?void 0:D.possession)!=null?E:m.UNDEFINED,wish:(R=(b=r[S.id])==null?void 0:b.wish)!=null?R:A.UNDEFINED,onPossessionChange:u,onWishChange:o},S.id)})})})]})},Te=s=>{const{shipSetting:t,shipFilter:n,onShipSettingChange:i}=s,r=d.exports.useMemo(()=>{const o=te(ae,n);return se(o)},[n]),a=d.exports.useCallback((o,c)=>{i(h=>re(h,o,c))},[i]),u=d.exports.useCallback((o,c)=>{i(h=>C(p({},h),{[o]:C(p({},h[o]),{wish:c})}))},[i]);return l(B,{spacing:1,children:[e("div",{children:e(y,{id:"tech-file-ships",title:"\u6280\u8853\u30D5\u30A1\u30A4\u30EB\u304B\u3089\u624B\u306B\u5165\u308B\u8266\u8239/\u8A2D\u8A08\u56F3",initiallyOpened:!1,preRenderDetails:!0,shipDefinitions:r[g.TECH_FILE],shipSetting:t,handlePossessionChange:a,handleWishChange:u})}),e("div",{children:e(y,{id:"city-trade-ships",title:"\u90FD\u5E02\u3067\u8CB7\u3048\u308B\u8266\u8239",initiallyOpened:!1,shipDefinitions:r[g.CITY_TRADE],shipSetting:t,handlePossessionChange:a,handleWishChange:u})}),e("div",{children:e(y,{id:"dock-effect-ships",title:"\u7D50\u5408\u52B9\u679C\u3067\u624B\u306B\u5165\u308B\u8266\u8239/\u81E8\u6642\u8A2D\u8A08\u56F3",initiallyOpened:!1,shipDefinitions:r[g.DOCK_EFFECT],shipSetting:t,handlePossessionChange:a,handleWishChange:u})}),e("div",{children:e(y,{id:"starter-ships",title:"\u521D\u671F\u914D\u5E03\u3067\u624B\u306B\u5165\u308B\u8266\u8239/\u8A2D\u8A08\u56F3",initiallyOpened:!1,shipDefinitions:r[g.STARTER_SHIP],shipSetting:t,handlePossessionChange:a,handleWishChange:u})})]})},Ue=()=>{const s=J(),[t,n]=d.exports.useState(L),[i,r]=d.exports.useState(ne),[a,u]=d.exports.useState(t.ships),[o,c]=d.exports.useState(!1);return l(k,{children:[e(Ce,{currentRoute:"/myList"}),e(fe,{shipFilter:i,onCancel:()=>{u(t.ships),s("/myList")},onReset:()=>{c(!0)},onSave:()=>{const E=C(p({},L()),{ships:a});oe(E),n(E),s("/myList")},onFilter:r}),e(ge,{children:l($,{p:1,children:[l(B,{pt:1,pb:2,spacing:2,children:[e(f,{variant:"body2",children:"\u3053\u3053\u3067\u306F\u8266\u8239/\u8A2D\u8A08\u56F3\u306E\u6240\u6709\u72B6\u614B\u3092\u8A2D\u5B9A\u3067\u304D\u307E\u3059\u3002"}),e(f,{variant:"body2",children:"\u5168\u3066\u7D30\u304B\u304F\u8A2D\u5B9A\u3059\u308B\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}),e(f,{variant:"body2",children:"\u8A2D\u5B9A\u30C7\u30FC\u30BF\u306F\u30D6\u30E9\u30A6\u30B6\u306E\u30ED\u30FC\u30AB\u30EB\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002"})]}),e(Te,{shipSetting:a,shipFilter:i,onShipSettingChange:u})]})}),o&&e(Z,{title:"\u521D\u671F\u5316",question:"\u30DE\u30A4\u30EA\u30B9\u30C8\u8A2D\u5B9A\u3092\u521D\u671F\u72B6\u614B\u306B\u623B\u3057\u307E\u3059\u304B\uFF1F",cancelText:"\u30AD\u30E3\u30F3\u30BB\u30EB",confirmText:"\u521D\u671F\u5316",onCancel:()=>{c(!1)},onConfirm:()=>{c(!1),u(le().ships)}})]})};export{Ue as MyListEditPage,Ue as default};
