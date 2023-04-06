import{k as e,j as h,F as O,B as L,t,r as n,w as C,T as S,U as E,W as b,ba as M,d as k,aM as I,q as D,f as _,bb as R,u as P,bc as W,bd as B,a3 as m,aa as $,g as w,ab as q,aO as U,aP as z,aR as Y,m as H,z as j}from"./index.87e5267c.js";import{d as G,C as K}from"./ConfirmationDialog.dfc327f2.js";import{d as V,a as J}from"./DeleteForever.9c276202.js";import{S as Q,a as X,s as Z,c as ee}from"./ShipTypeFilterButton.cadf6fc0.js";import{A as ie}from"./ActionBar.bc02dc9c.js";import{d as se}from"./Settings.4ee4b959.js";import{T as A,a as x}from"./ToggleButtonGroup.c951376a.js";import{d as te}from"./Clear.b81646e5.js";import{N as ne,P as oe}from"./PageContent.62966d61.js";import{P as ae}from"./PageFooter.18ae1815.js";import"./ResponsiveDialog.1270fc1d.js";import"./DialogContentText.0b5b65ab.js";import"./domUtils.42f0cf46.js";import"./useFormControl.1720c4a9.js";import"./IconButton.938b2120.js";const re=a=>{const{shipFilter:i,onCancel:s,onSave:o,onReset:l,onFilter:d}=a;return e(ie,{left:r=>e(Q,{filter:i,onChange:d,researchManufacturer:!1,researchStrategyTypes:!1,researchTacticTypes:!1,buttonProps:r},"filter"),right:r=>h(O,{children:[e(L,{variant:"outlined",startIcon:e(V,{}),onClick:l,...r,children:t("button.initialize")},"reset"),e(L,{variant:"outlined",startIcon:e(J,{}),onClick:s,...r,children:t("button.cancel")},"cancel"),e(L,{variant:"contained",startIcon:e(G,{}),onClick:o,...r,children:t("button.save")},"save")]})})},N=a=>{const{label:i,options:s,possession:o,onChange:l}=a,[d,r]=n.exports.useState(o),[u,p]=n.exports.useTransition(),c=(g,y)=>{r(y===null?E.UNDEFINED:Number(y))};return n.exports.useEffect(()=>{p(()=>{l(d)})},[d,l]),h(C,{spacing:1,direction:"row",alignItems:"center",children:[e(S,{variant:"body2",children:i}),h(A,{size:"small",color:"primary",value:`${d}`,exclusive:!0,onChange:c,children:[e(x,{value:`${E.POSSESSED}`,children:s[0]}),e(x,{value:`${E.NOT_POSSESSED}`,children:s[1]})]})]})},F=a=>{const{wish:i,onChange:s}=a,[o,l]=n.exports.useState(i),[d,r]=n.exports.useTransition(),u=(p,c)=>{l(c===null||c==="clear"?b.UNDEFINED:Number(c))};return n.exports.useEffect(()=>{r(()=>{s(o)})},[o,s]),h(C,{spacing:1,direction:"row",alignItems:"center",children:[e(S,{variant:"body2",children:t("myList.wantOption")}),h(A,{size:"small",color:"primary",value:`${o}`,exclusive:!0,onChange:u,children:[e(x,{value:`${b.WANTED}`,children:t("myList.wantOptionYes")}),e(x,{value:`${b.NOT_WANTED}`,children:t("myList.wantOptionNo")}),o!==b.UNDEFINED&&e(x,{value:"clear",children:e(te,{})})]})]})},le=a=>{const{ship:i,module:s,userSettings:o,setModulePossession:l,setModuleWish:d}=a,r=n.exports.useCallback(g=>{l(s.id,i.id,g)},[s,i,l]),u=n.exports.useCallback(g=>{d(s.id,i.id,g)},[s,i,d]),p=n.exports.useMemo(()=>M(s.id,i.id,o),[s,i,o]),c=k()===I.JAPANESE;return e(D,{component:"div",pl:2,children:h(C,{spacing:3,children:[h("div",{children:[e(S,{variant:"h6",children:`${s.category}${s.categoryNumber} ${_(i.id,s)}`}),c&&s.description&&e(S,{variant:"caption",color:"text.secondary",children:s.description})]}),e(N,{label:t("myList.additionalModuleAcquiredOption"),options:[t("myList.blueprintAcquiredOptionYes"),t("myList.blueprintAcquiredOptionNo")],possession:p,onChange:r}),p===E.NOT_POSSESSED&&e(F,{wish:R(s.id,i.id,o),onChange:u})]})},s.id)},ce=a=>{const{ship:i,...s}=a,{userSettings:o,setShipPossession:l,setShipWish:d,setModulePossession:r,setModuleWish:u}=P(),p=n.exports.useMemo(()=>W(i.id,o),[i,o]),c=n.exports.useMemo(()=>B(i.id,o),[i,o]),g=n.exports.useMemo(()=>c!==b.UNDEFINED?!0:i.source===m.TECH_FILE&&p===E.NOT_POSSESSED,[i,p,c]),y=n.exports.useCallback(f=>{l(i.id,f)},[l,i]),T=n.exports.useCallback(f=>{d(i.id,f)},[d,i]);return e($,{elevation:2,...s,children:e(D,{component:"div",p:1,children:h(C,{spacing:3,children:[e(S,{variant:"h6",children:w(i)}),e(N,{label:de(i),options:pe(i),possession:p,onChange:y}),g&&e(F,{wish:c,onChange:T}),(i.source===m.TECH_FILE||i.source===m.STARTER_SHIP)&&p===E.POSSESSED&&i.modules&&i.modules.filter(f=>!f.defaultModule).map(f=>h(n.exports.Fragment,{children:[e(q,{}),e(le,{ship:i,module:f,userSettings:o,setModulePossession:r,setModuleWish:u})]},f.id))]})})})};function de(a){switch(a.source){case m.CITY_TRADE:return t("myList.shipBoughtOption");case m.DOCK_EFFECT:return t("myList.dockingEffectBlueprintAcquiredOption");case m.SALVAGE:return t("myList.salvageAcquiredOption");default:return t("myList.blueprintAcquiredOption")}}function pe(a){switch(a.source){case m.CITY_TRADE:return[t("myList.shipBoughtOptionYes"),t("myList.shipBoughtOptionNo")];default:return[t("myList.blueprintAcquiredOptionYes"),t("myList.blueprintAcquiredOptionNo")]}}const v=a=>{const{id:i,title:s,shipDefinitions:o,initiallyOpened:l,preRenderDetails:d=!1}=a,[r,u]=n.exports.useState(l),p=n.exports.useCallback((c,g)=>{u(g)},[]);return h(U,{expanded:r,onChange:p,children:[e(z,{id:i,expandIcon:e(se,{}),children:e(S,{variant:"body1",children:s})}),e(Y,{children:(r||d)&&e(C,{spacing:3,children:o.map(c=>e(ce,{ship:c},c.id))})})]})},he=a=>{const{shipFilter:i}=a,s=n.exports.useMemo(()=>{const o=X(H,i);return Z(o)},[i]);return h(C,{spacing:1,children:[e("div",{children:e(v,{id:"tech-file-ships",title:t("shipSource.techFile"),initiallyOpened:!1,preRenderDetails:!0,shipDefinitions:s[m.TECH_FILE]})}),e("div",{children:e(v,{id:"city-trade-ships",title:t("shipSource.cityTrade"),initiallyOpened:!1,shipDefinitions:s[m.CITY_TRADE]})}),e("div",{children:e(v,{id:"dock-effect-ships",title:t("shipSource.dockEffect"),initiallyOpened:!1,shipDefinitions:s[m.DOCK_EFFECT]})}),e("div",{children:e(v,{id:"salvage-ships",title:t("shipSource.salvage"),initiallyOpened:!1,shipDefinitions:s[m.SALVAGE]})}),e("div",{children:e(v,{id:"starter-ships",title:t("shipSource.starterShip"),initiallyOpened:!1,shipDefinitions:s[m.STARTER_SHIP]})})]})},Pe=()=>{const a=j(),{saveUserSettings:i,restoreUserSettings:s,resetUserSettings:o}=P(),[l,d]=n.exports.useState(ee),[r,u]=n.exports.useState(!1);n.exports.useEffect(()=>()=>{s()},[s]);const p=n.exports.useCallback(()=>{s(),a("/myList")},[s,a]),c=n.exports.useCallback(()=>{i(),a("/myList")},[i,a]),g=n.exports.useCallback(()=>{u(!1)},[]),y=n.exports.useCallback(()=>{u(!0)},[]),T=n.exports.useCallback(()=>{u(!1),o()},[o]);return h(O,{children:[e(ne,{currentRoute:"/myList"}),e(re,{shipFilter:l,onCancel:p,onReset:y,onSave:c,onFilter:d}),e(oe,{children:h(D,{component:"div",p:1,children:[h(C,{pt:1,pb:2,spacing:2,children:[e(S,{variant:"body2",children:t("myListConfig.pageDescription1")}),e(S,{variant:"body2",children:t("myListConfig.pageDescription2")}),e(S,{variant:"body2",children:t("myListConfig.pageDescription3")})]}),e(he,{shipFilter:l})]})}),r&&e(K,{title:t("button.initialize"),question:t("myList.confirmInitialize"),cancelText:t("button.cancel"),confirmText:t("button.initialize"),onCancel:g,onConfirm:T}),e(ae,{})]})};export{Pe as MyListEditPage,Pe as default};