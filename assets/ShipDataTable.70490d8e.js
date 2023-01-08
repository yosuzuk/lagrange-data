import{c as B,i as j,r as N,t as n,j as p,n as P,F as A,p as l,v as M,a8 as E,B as L,a9 as $,ax as V,g as o,e as s,ay as q,V as W,T as D,az as G,b as Y,s as H,a as J,aA as F,a7 as Q,aB as k,a3 as U,aC as R,a4 as X,aD as I,a6 as Z,aE as m,a5 as ee,aF as T,aG as ae}from"./index.d26a588e.js";import{B as re,C as ne,g as te,L as oe}from"./domUtils.41cc6831.js";import{P as le}from"./useFormControl.93476e47.js";import{G as ie,M as se,a as ce,L as me}from"./PageContent.70e41135.js";import{C as pe}from"./ShipTypeFilterButton.e3d4c7d1.js";import{u as ue,T as de}from"./useTable.8424afe8.js";var v={},he=j.exports;Object.defineProperty(v,"__esModule",{value:!0});var _=v.default=void 0,ye=he(B),Ce=N,fe=(0,ye.default)((0,Ce.jsx)("path",{d:"M14.67 5v14H9.33V5h5.34zm1 14H21V5h-5.33v14zm-7.34 0V5H3v14h5.33z"}),"ViewColumn");_=v.default=fe;function Ge(e={}){return{name:!0,type:!1,row:!1,cost:!1,operationLimit:!1,dpmShip:!1,dpmAntiAir:!1,dpmSiege:!1,hp:!1,speed:!1,warpSpeed:!1,dpmShipPerCommandPoint:!1,dpmAntiAirPerCommandPoint:!1,dpmSiegePerCommandPoint:!1,hpPerCommandPoint:!1,source:!1,manufacturer:!1,researchManufacturer:!1,researchTacticType:!1,researchStrategyType:!1,weight:!1,...e}}function Se(e){const{disableResearchAgreementOptions:a}=e;return[{columnKey:"type",name:n("label.shipType")},{columnKey:"row",name:n("label.rowPlacement")},{columnKey:"cost",name:n("label.commandPoints")},{columnKey:"operationLimit",name:n("label.operationLimit")},{columnKey:"dpmShip",name:n("label.antiShipDpm")},{columnKey:"dpmAntiAir",name:n("label.antiAirDpm")},{columnKey:"dpmSiege",name:n("label.siegeDpm")},{columnKey:"hp",name:n("label.hp")},{columnKey:"speed",name:n("label.cruiseSpeed")},{columnKey:"warpSpeed",name:n("label.warpSpeed")},{columnKey:"dpmShipPerCommandPoint",name:n("label.antiShipDpmPerCommandPoint")},{columnKey:"dpmAntiAirPerCommandPoint",name:n("label.antiAirDpmPerCommandPoint")},{columnKey:"dpmSiegePerCommandPoint",name:n("label.siegeDpmPerCommandPoint")},{columnKey:"hpPerCommandPoint",name:n("label.hpPerCommandPoint")},{columnKey:"source",name:n("label.acquirableThrough")},{columnKey:"manufacturer",name:n("label.manufacturer")},...a!==!0?[{columnKey:"researchManufacturer",name:n("label.researchManufacturerColumn")},{columnKey:"researchTacticType",name:n("label.researchTacticTypeColumn")},{columnKey:"researchStrategyType",name:n("label.researchStrategyTypeColumn")}]:[],{columnKey:"weight",name:n("label.probabilityWeight")}]}const Ye=e=>{const{onChange:a,buttonProps:r,disableResearchAgreementOptions:t}=e,[i,c]=p.exports.useState(e.columnConfig),[C,u]=p.exports.useState(!1),[x]=p.exports.useState(()=>Se({disableResearchAgreementOptions:t})),h=p.exports.useRef(null),[Be,O]=p.exports.useTransition(),z=f=>{c(S=>({...S,[f]:!S[f]}))};return p.exports.useEffect(()=>{O(()=>{a(i)})},[i,a]),P(A,{children:[l(re,{variant:"outlined",fullWidth:r==null?void 0:r.fullWidth,size:r==null?void 0:r.size,ref:h,children:l(M,{startIcon:l(_,{}),onClick:()=>u(!0),children:n("button.displayItems")})},"columnConfig"),l(le,{open:C,anchorEl:h.current,role:void 0,transition:!0,disablePortal:!0,style:{zIndex:1},children:({TransitionProps:f,placement:S})=>{var K;return l(ie,{...f,style:{transformOrigin:S==="bottom"?"center top":"center bottom"},children:l("div",{children:l(ne,{onClickAway:()=>u(!1),children:P(E,{children:[l(L,{sx:{overflowY:"auto",maxHeight:`${((K=te(h.current))!=null?K:0)-50}px`},children:l(se,{id:"split-button-menu",children:x.map(y=>P(ce,{selected:i[y.columnKey],onClick:()=>z(y.columnKey),children:[l(oe,{children:l(pe,{edge:"start",checked:i[y.columnKey],tabIndex:-1,disableRipple:!0})}),l(me,{children:y.name})]},y.columnKey))})}),l($,{}),l(L,{p:1,display:"flex",justifyContent:"end",children:l(M,{variant:"outlined",onClick:()=>u(!1),children:n("button.close")})})]})})})})}})]})},Te=e=>({id:"nameLink",renderHeader:()=>n("label.shipName"),renderCell:a=>{var t;return((t=e.decorateName)!=null?t:(i,c)=>i)(l(D,{variant:"body2",children:l(G,{onClick:()=>{e.onClick(a.id)},children:o(a)})}),a)},sortFn:(a,r)=>o(a).localeCompare(o(r),s())}),ge={id:"type",renderHeader:()=>n("label.shipType"),renderCell:e=>Y(e.type,e.subType),sortFn:[(e,a)=>H(e.type,e.subType)-H(a.type,a.subType),(e,a)=>o(e).localeCompare(o(a),s())],initialSortDirection:"asc"},be={id:"row",renderHeader:()=>n("label.rowPlacement"),renderCell:e=>J(e.row),sortFn:[(e,a)=>F(e.row)-F(a.row),(e,a)=>o(e).localeCompare(o(a),s())]},Pe={id:"cost",renderHeader:()=>n("label.commandPoints"),renderCell:e=>e.cost,sortFn:[(e,a)=>e.cost-a.cost,(e,a)=>o(e).localeCompare(o(a),s())]},we={id:"operationLimit",renderHeader:()=>n("label.operationLimit"),renderCell:e=>e.operationLimit,sortFn:[(e,a)=>e.operationLimit-a.operationLimit,(e,a)=>o(e).localeCompare(o(a),s())]},Ae={id:"source",renderHeader:()=>n("label.acquirableThrough"),renderCell:e=>Q(e.source),sortFn:[(e,a)=>k(e.source)-k(a.source),(e,a)=>o(e).localeCompare(o(a),s())]},De={id:"manufacturer",renderHeader:()=>n("label.manufacturer"),renderCell:e=>U(e.manufacturer),sortFn:[(e,a)=>R(e.manufacturer)-R(a.manufacturer),(e,a)=>o(e).localeCompare(o(a),s())]},ve={id:"researchManufacturer",renderHeader:()=>n("label.researchManufacturerColumn"),renderCell:e=>e.researchManufacturer?X(e.researchManufacturer):"-",sortFn:[(e,a)=>(e.researchManufacturer?I(e.researchManufacturer):0)-(a.researchManufacturer?I(a.researchManufacturer):0),(e,a)=>o(e).localeCompare(o(a),s())]},xe={id:"researchStrategyType",renderHeader:()=>n("label.researchStrategyTypeColumn"),renderCell:e=>{var a,r;return l(A,{children:(r=(a=e.researchStrategyTypes)==null?void 0:a.map(t=>l(D,{variant:"body2",children:Z(t)},t)))!=null?r:"-"})},sortFn:[(e,a)=>{var r,t;return((r=e.researchStrategyTypes)!=null&&r[0]?m(e.researchStrategyTypes[0]):0)-((t=a.researchStrategyTypes)!=null&&t[0]?m(a.researchStrategyTypes[0]):0)},(e,a)=>{var r,t;return((r=e.researchStrategyTypes)!=null&&r[1]?m(e.researchStrategyTypes[1]):0)-((t=a.researchStrategyTypes)!=null&&t[1]?m(a.researchStrategyTypes[1]):0)},(e,a)=>{var r,t;return((r=e.researchStrategyTypes)!=null&&r[2]?m(e.researchStrategyTypes[2]):0)-((t=a.researchStrategyTypes)!=null&&t[2]?m(a.researchStrategyTypes[2]):0)},(e,a)=>{var r,t;return((r=e.researchStrategyTypes)!=null&&r[3]?m(e.researchStrategyTypes[3]):0)-((t=a.researchStrategyTypes)!=null&&t[3]?m(a.researchStrategyTypes[3]):0)},(e,a)=>o(e).localeCompare(o(a),s())]},Ke={id:"researchTacticType",renderHeader:()=>n("label.researchTacticTypeColumn"),renderCell:e=>{var a,r;return l(A,{children:(r=(a=e.researchTacticTypes)==null?void 0:a.map(t=>l(D,{variant:"body2",children:ee(t)},t)))!=null?r:"-"})},sortFn:[(e,a)=>{var r,t;return((r=e.researchTacticTypes)!=null&&r[0]?T(e.researchTacticTypes[0]):0)-((t=a.researchTacticTypes)!=null&&t[0]?T(a.researchTacticTypes[0]):0)},(e,a)=>{var r,t;return((r=e.researchTacticTypes)!=null&&r[1]?T(e.researchTacticTypes[1]):0)-((t=a.researchTacticTypes)!=null&&t[1]?T(a.researchTacticTypes[1]):0)},(e,a)=>o(e).localeCompare(o(a),s())]},Me={id:"weight",renderHeader:()=>n("label.probabilityWeight"),renderCell:e=>e.weight,sortFn:[(e,a)=>e.weight-a.weight,(e,a)=>o(e).localeCompare(o(a),s())]},Le=d(n("label.antiShipDpm"),"dpmShip"),He=d(n("label.antiAirDpm"),"dpmAntiAir"),Fe=d(n("label.siegeDpm"),"dpmSiege"),ke=d(n("label.hp"),"hp"),Re=d(n("label.cruiseSpeed"),"speed"),Ie=d(n("label.warpSpeed"),"warpSpeed"),Ve=b(n("label.antiShipDpmPerCommandPoint"),"dpmShip"),_e=b(n("label.antiAirDpmPerCommandPoint"),"dpmAntiAir"),Oe=b(n("label.siegeDpmPerCommandPoint"),"dpmSiege"),ze=b(n("label.hpPerCommandPoint"),"hp");function d(e,a){return{id:a,renderHeader:()=>e,renderCell:r=>V(g(r.id,a)),sortFn:[(r,t)=>{var i,c;return((i=g(r.id,a))!=null?i:0)-((c=g(t.id,a))!=null?c:0)},(r,t)=>o(r).localeCompare(o(t),s())]}}function b(e,a){return{id:`${a}_per_command_point`,renderHeader:()=>e,renderCell:r=>V(w(r,a),0),sortFn:[(r,t)=>{var i,c;return((i=w(r,a))!=null?i:0)-((c=w(t,a))!=null?c:0)},(r,t)=>o(r).localeCompare(o(t),s())]}}function g(e,a){var t,i;const r=(i=(t=q(W(e),null))==null?void 0:t[a])!=null?i:null;if(typeof r=="boolean")throw new Error(`${a} is not a numeric value`);return r}function w(e,a){if(e.cost===0)return null;const r=g(e.id,a);if(typeof r=="boolean")throw new Error(`${a} is not a numeric value`);return r===null?null:r/e.cost}const Je=e=>{const{shipDefinitions:a,columnConfig:r,decorateName:t}=e,{table:i,setTableData:c}=ue(),{openShipDetailDialog:C}=ae(),u=p.exports.useMemo(()=>[Te({onClick:C,decorateName:t}),...r.type?[ge]:[],...r.row?[be]:[],...r.cost?[Pe]:[],...r.operationLimit?[we]:[],...r.dpmShip?[Le]:[],...r.dpmAntiAir?[He]:[],...r.dpmSiege?[Fe]:[],...r.hp?[ke]:[],...r.speed?[Re]:[],...r.warpSpeed?[Ie]:[],...r.dpmShipPerCommandPoint?[Ve]:[],...r.dpmAntiAirPerCommandPoint?[_e]:[],...r.dpmSiegePerCommandPoint?[Oe]:[],...r.hpPerCommandPoint?[ze]:[],...r.source?[Ae]:[],...r.manufacturer?[De]:[],...r.researchManufacturer?[ve]:[],...r.researchTacticType?[Ke]:[],...r.researchStrategyType?[xe]:[],...r.weight?[Me]:[]],[r,t,C]);return p.exports.useEffect(()=>{c({columns:u,data:a,rowIdFn:h=>h.id})},[c,u,a]),l(de,{table:i,size:"small"})};export{Ye as C,Je as S,Ge as c};
