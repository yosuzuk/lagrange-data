import{q as ae,v as ie,E as I,j as c,w as O,a2 as Z,D as J,aO as z,aN as P,_ as N,r as $,I as se,y as ue,A as ce,a as L,C as le,F as Q,B as de,J as fe,K as pe,L as me,o as f,h as g,f as ye,e as C,t as ge,i as h,k as he,s as U,bi as Ce,c as Re,O as F,bq as j,br as v,Q as Me}from"./index.3216557f.js";import{I as ve,G as xe,M as Ae,a as _e,L as Ee}from"./PageContent.13c2f158.js";import{B as Be,g as De,C as Fe,L as Te}from"./domUtils.e0e5f00e.js";import{P as Ie}from"./useFormControl.617a4d60.js";import{n as X}from"./sorting.c6946657.js";function Se(e){return ae("MuiAlert",e)}const Oe=ie("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var G=Oe,Ne=I(c("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),$e=I(c("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),Le=I(c("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),ke=I(c("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),be=I(c("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),H;const we=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],Ye=e=>{const{variant:t,color:n,severity:o,classes:r}=e,a={root:["root",`${t}${J(n||o)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return ce(a,Se,r)},ze=O(Z,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${J(n.color||n.severity)}`]]}})(({theme:e,ownerState:t})=>{const n=e.palette.mode==="light"?z:P,o=e.palette.mode==="light"?P:z,r=t.color||t.severity;return N({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},r&&t.variant==="standard"&&{color:n(e.palette[r].light,.6),backgroundColor:o(e.palette[r].light,.9),[`& .${G.icon}`]:{color:e.palette.mode==="dark"?e.palette[r].main:e.palette[r].light}},r&&t.variant==="outlined"&&{color:n(e.palette[r].light,.6),border:`1px solid ${e.palette[r].light}`,[`& .${G.icon}`]:{color:e.palette.mode==="dark"?e.palette[r].main:e.palette[r].light}},r&&t.variant==="filled"&&{color:"#fff",fontWeight:e.typography.fontWeightMedium,backgroundColor:e.palette.mode==="dark"?e.palette[r].dark:e.palette[r].main})}),Pe=O("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Ue=O("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),W=O("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),V={success:c(Ne,{fontSize:"inherit"}),warning:c($e,{fontSize:"inherit"}),error:c(Le,{fontSize:"inherit"}),info:c(ke,{fontSize:"inherit"})},je=$.exports.forwardRef(function(t,n){const o=se({props:t,name:"MuiAlert"}),{action:r,children:a,className:i,closeText:s="Close",color:u,icon:l,iconMapping:d=V,onClose:p,role:R="alert",severity:m="success",variant:M="standard"}=o,oe=ue(o,we),A=N({},o,{color:u,severity:m,variant:M}),_=Ye(A);return L(ze,N({role:R,elevation:0,ownerState:A,className:le(_.root,i),ref:n},oe,{children:[l!==!1?c(Pe,{ownerState:A,className:_.icon,children:l||d[m]||V[m]}):null,c(Ue,{ownerState:A,className:_.message,children:a}),r!=null?c(W,{className:_.action,children:r}):null,r==null&&p?c(W,{ownerState:A,className:_.action,children:c(ve,{size:"small","aria-label":s,title:s,color:"inherit",onClick:p,children:H||(H=c(be,{fontSize:"small"}))})}):null]}))});var ct=je;const Ge=e=>{const{options:t,icon:n,text:o,value:r,onClick:a,buttonProps:i}=e,[s,u]=$.exports.useState(!1),l=$.exports.useRef(null),d=p=>{u(!1),a(p)};return L(Q,{children:[c(Be,{variant:"outlined",fullWidth:i==null?void 0:i.fullWidth,ref:l,disabled:i==null?void 0:i.disabled,size:i==null?void 0:i.size,children:c(de,{startIcon:n,onClick:p=>{p.stopPropagation(),u(!0)},disabled:i==null?void 0:i.disabled,children:o})}),c(Ie,{open:s,anchorEl:l.current,role:void 0,transition:!0,disablePortal:!0,style:{zIndex:2},children:({TransitionProps:p,placement:R})=>c(xe,{...p,style:{transformOrigin:R==="bottom"?"center top":"center bottom"},children:c(Z,{style:{maxHeight:De(l.current),overflowY:"auto"},children:c(Fe,{onClickAway:()=>u(!1),children:c(Ae,{children:t.map(m=>L(_e,{selected:m.value===r,onClick:M=>{M.stopPropagation(),d(m.value)},disabled:m.disabled,children:[m.icon&&c(Te,{children:m.icon}),c(Ee,{children:m.text})]},m.key))})})})})})]})};var Y={},He=pe.exports;Object.defineProperty(Y,"__esModule",{value:!0});var ee=Y.default=void 0,We=He(fe),Ve=me,qe=(0,We.default)((0,Ve.jsx)("path",{d:"M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"}),"Sort");ee=Y.default=qe;var y=(e=>(e.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME="groupByRowSortByTypeAndName",e.GROUP_BY_TYPE_SORT_BY_NAME="groupByTypeSortByName",e.SORT_BY_TYPE_AND_NAME="sortByTypeAndName",e.SORT_BY_NAME="sortByName",e))(y||{});const q={initial:0,self:1,ally:2,ally2:3,ally3:4},te=(e,t)=>{var n,o;return q[(n=e.reinforcement)!=null?n:"initial"]-q[(o=t.reinforcement)!=null?o:"initial"]},T=X([(e,t)=>h(e.shipDefinition).localeCompare(h(t.shipDefinition),he()),te]),S=X([(e,t)=>U(e.shipDefinition.type,e.shipDefinition.subType)-U(t.shipDefinition.type,t.shipDefinition.subType),T,te]);function lt(e,t){switch(e){case"groupByRowSortByTypeAndName":return{groupedBy:e,groups:Ke(t.ships)};case"groupByTypeSortByName":return{groupedBy:e,groups:Ze(t.ships)};case"sortByTypeAndName":return{groupedBy:e,groups:[{id:"all",name:f("fleetSetup.fleetFormation"),ships:t.ships.map(n=>({...n,carriedShips:[...n.carriedShips].sort(S)})).sort(S),count:t.ships.map(n=>n.count).reduce((n,o)=>n+o,0)}]};case"sortByName":return{groupedBy:e,groups:[{id:"all",name:f("fleetSetup.fleetFormation"),ships:t.ships.map(n=>({...n,carriedShips:[...n.carriedShips].sort(T)})).sort(T),count:t.ships.map(n=>n.count).reduce((n,o)=>n+o,0)}]};default:throw new Error(`Unknown group and sort option "${e}"`)}}function Ke(e){return[C.FRONT,C.MIDDLE,C.BACK].map(t=>{const n=e.filter(r=>r.shipDefinition.row===t).map(r=>({...r,carriedShips:[...r.carriedShips].sort(S)})).sort(S),o=n.map(r=>r.count).reduce((r,a)=>r+a,0);return{id:t,name:ge(t),ships:n,count:o}})}function Ze(e){return[g.CARRIER,g.AUXILIARY,g.BATTLE_CRUISER,g.CRUISER,g.DESTROYER,g.FRIGATE].map(t=>{const n=e.filter(r=>r.shipDefinition.type===t).map(r=>({...r,carriedShips:[...r.carriedShips].sort(T)})).sort(T),o=n.map(r=>r.count).reduce((r,a)=>r+a,0);return{id:t,name:ye(t),ships:n,count:o}})}function dt(e,t){const n=Ce()?" ":"";return[e.name,t.groups.filter(o=>o.ships.length>0).map(o=>[...t.groups.length>1?[f("fleetSetup.groupNameForSharing",{name:o.name})]:[],...o.ships.flatMap(r=>{const a=r.count*r.shipDefinition.cost,i=Je(r);switch(r.reinforcement){case"self":return[`${x(r.count)}\xD7\u3000${h(r.shipDefinition)}${n}${f("fleetSetup.reinforcementBrackets")}`,...i?[i]:[],...E(r.carriedShips)];case"ally":return[`${x(r.count)}\xD7\u3000${h(r.shipDefinition)}${n}${f("fleetSetup.orgReinforcementABrackets")}`,...i?[i]:[],...E(r.carriedShips)];case"ally2":return[`${x(r.count)}\xD7\u3000${h(r.shipDefinition)}${n}${f("fleetSetup.orgReinforcementBBrackets")}`,...i?[i]:[],...E(r.carriedShips)];case"ally3":return[`${x(r.count)}\xD7\u3000${h(r.shipDefinition)}${n}${f("fleetSetup.orgReinforcementCBrackets")}`,...i?[i]:[],...E(r.carriedShips)];default:return[`${x(r.count)}\xD7\u3000${h(r.shipDefinition)}${n}${f("fleetSetup.commandPointsValueBrackets",{value:a})}`,...i?[i]:[],...E(r.carriedShips)]}})].join(`
`)).join(`

`),[`${f("fleetSetup.reinforcementColon")}${n}${e.totalReinforcementCount}/${e.maxReinforcement}`,`${f("label.commandPointsColon")}${n}${e.totalCost}/${e.maxCost}`].join(`
`)].join(`

`)}function E(e){return e.map(t=>`\u3000\u3000${x(t.count)}\xD7\u3000${h(t.shipDefinition)}`)}function Je(e){if(e.moduleSelection===null||e.moduleSelection.static)return null;const t=["M","A","B","C"].flatMap(n=>{var i,s,u;const r=Object.keys((s=(i=e.moduleSelection)==null?void 0:i.groups[n])!=null?s:{}).find(l=>{var d;return((d=e.moduleSelection)==null?void 0:d.groups[n][l].usage)==="used"});if(!r)return[];const a=(u=e.moduleSelection)==null?void 0:u.groups[n][r];return!a||a.module.defaultModule?[]:a?[`${Re(e.shipDefinition.id,a.module)}\uFF08${a.module.id}\uFF09`]:[]});return t.length===0?null:t.map(n=>`\u3000\u3000${n}`).join(`
`)}function x(e){return e<10?`${e}`.padStart(3):`${e}`}const ft=e=>{const{value:t,onChange:n,buttonProps:o}=e;return c(Q,{children:c(Ge,{icon:c(ee,{}),text:f("button.displayItems"),value:t,options:[{key:y.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME,text:f("fleetSetup.groupByRowSortByShipTypeAndName"),value:y.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME},{key:y.GROUP_BY_TYPE_SORT_BY_NAME,text:f("fleetSetup.groupByShipTypeSortByName"),value:y.GROUP_BY_TYPE_SORT_BY_NAME},{key:y.SORT_BY_TYPE_AND_NAME,text:f("fleetSetup.sortByShipTypeAndName"),value:y.SORT_BY_TYPE_AND_NAME},{key:y.SORT_BY_NAME,text:f("fleetSetup.sortByName"),value:y.SORT_BY_NAME}],onClick:n,buttonProps:o})})};function pt(){var e,t,n,o,r;return[(e=B("fleet1"))!=null?e:D(1),(t=B("fleet2"))!=null?t:D(2),(n=B("fleet3"))!=null?n:D(3),(o=B("fleet4"))!=null?o:D(4),(r=B("fleet5"))!=null?r:D(5)]}function mt(e){const t=JSON.stringify(Xe(e));window.localStorage.setItem(e.key,t)}function B(e){const t=window.localStorage.getItem(e);if(!t)return null;const n=rt(t);return n?Qe(et(n),e):null}function Qe(e,t){const n=e.myListOnly===!0,o=e.ships.map(r=>{var a;return{...re({shipDefinition:F(r.shipId),usedModules:(a=r.usedModules)!=null?a:null,count:r.count,reinforcement:r.reinforcement,maxReinforcement:e.maxReinforcement}),carriedShips:r.carriedShips.map(i=>ne({shipId:i.shipId,count:i.count,reinforcement:r.reinforcement}))}});return{key:t,name:e.name,ships:o,totalCost:b(o),totalReinforcementCount:w(o),maxReinforcement:e.maxReinforcement,maxCost:e.maxCost,myListOnly:n}}function Xe(e){return{name:e.name,ships:e.ships.map(t=>({shipId:t.shipDefinition.id,usedModules:t.moduleSelection?tt(t.moduleSelection):void 0,carriedShips:t.carriedShips.map(n=>({shipId:n.shipDefinition.id,count:n.count})),count:t.count,reinforcement:t.reinforcement})),maxReinforcement:e.maxReinforcement,maxCost:e.maxCost,myListOnly:e.myListOnly}}function et(e){const t=e.ships.reduce((o,r)=>{const a=j(r.shipId),i=F(a);if(!i)return o;let s;r.usedModules&&i.modules&&(s=r.usedModules.filter(l=>{var d;return!!((d=i.modules)!=null&&d.find(p=>p.id===l))}));const u=r.carriedShips.flatMap(l=>{const d=j(l.shipId);return F(d)?[{...l,shipId:d}]:[]});return[...o,{...r,shipId:a,usedModules:s,carriedShips:u}]},[]);return{...e,ships:t}}function tt(e){const t=[];return Object.keys(e.groups).forEach(n=>{Object.keys(e.groups[n]).forEach(o=>{e.groups[n][o].usage==="used"&&t.push(e.groups[n][o].module.id)})}),t}function rt(e){try{return JSON.parse(e)}catch(t){return alert("ERROR - Failed to restore fleet setup"),console.error(t),null}}function D(e){return{key:`fleet${e}`,name:`${e}\u53F7\u8266\u968A`,ships:[],totalCost:0,totalReinforcementCount:0,maxReinforcement:5,maxCost:400,myListOnly:!0}}function re(e){const{shipDefinition:t,usedModules:n,count:o,reinforcement:r,maxReinforcement:a,temporary:i}=e,s=nt(t,n),u=k(t,s),l=r===null||t.type===g.FIGHTER||t.type===g.CORVETTE?t.operationLimit:Math.min(t.operationLimit,a);return{shipDefinition:t,carrierCapabilities:u,carriedShips:[],count:Math.max(0,o),reinforcement:r,maxCount:l,moduleSelection:s,temporary:i}}function nt(e,t){if(!e.modules||e.modules.length===0)return null;const n=t!=null?t:e.modules.filter(r=>r.defaultModule).map(r=>r.id),o={static:e.staticModules===!0,groups:{}};return e.modules.forEach(r=>{if(o.groups[r.category]||(o.groups[r.category]={}),o.static){o.groups[r.category][r.id]={module:r,usage:"used"};return}o.groups[r.category][r.id]={module:r,usage:n.includes(r.id)?"used":"not_used"}}),o}function k(e,t){var i;let n=0,o=0,r=0,a=(i=e.carryCorvette)!=null?i:0;if(e.carryFighter)switch(e.carryFighterType){case v.LARGE_FIGHTER:{n+=e.carryFighter;break}case v.MEDIUM_FIGHTER:{o+=e.carryFighter;break}case v.SMALL_FIGHTER:{r+=e.carryFighter;break}}return t&&Object.keys(t.groups).forEach(s=>{var u;Object.keys((u=t.groups[s])!=null?u:{}).forEach(l=>{var p,R,m,M;const d=t.groups[s][l];if(d.usage==="used"){switch(d.module.carryFighterType){case v.LARGE_FIGHTER:{n+=(p=d.module.carryFighter)!=null?p:0;break}case v.MEDIUM_FIGHTER:{o+=(R=d.module.carryFighter)!=null?R:0;break}case v.SMALL_FIGHTER:{r+=(m=d.module.carryFighter)!=null?m:0;break}}a+=(M=d.module.carryCorvette)!=null?M:0}})}),{canCarry:n+o+r+a>0,carryUpToLargeFighter:n,carryUpToMediumFighter:o,carryUpToSmallFighter:r,carryCorvette:a}}function ne(e){const{shipId:t,count:n,reinforcement:o,temporary:r}=e;return{shipDefinition:F(t),count:Math.max(0,n),reinforcement:o,temporary:r}}function yt(e){const{shipId:t,count:n,reinforcement:o,fleetSetup:r,keepZero:a}=e,i=F(t);let s=!0;const u={...r,ships:r.ships.flatMap(l=>l.shipDefinition.id!==t||l.reinforcement!==o?l:(s=!1,!a&&n<=0?[]:[{...l,count:n}]))};return s?{...u,ships:[...u.ships,re({shipDefinition:i,usedModules:null,count:n,reinforcement:o,maxReinforcement:r.maxReinforcement})],totalCost:b(u.ships),totalReinforcementCount:w(u.ships)}:{...u,totalCost:b(u.ships),totalReinforcementCount:w(u.ships)}}function gt(e){const{shipId:t,carrierShipId:n,count:o,reinforcement:r,fleetSetup:a,keepZero:i}=e;return{...a,ships:a.ships.map(s=>s.shipDefinition.id!==n||s.reinforcement!==r?s:s.carriedShips.find(u=>u.shipDefinition.id===t)?{...s,carriedShips:s.carriedShips.flatMap(u=>{if(u.shipDefinition.id!==t)return[u];if(u.reinforcement!==r)throw new Error("Detected invalid reinforcement");return!i&&o<=0?[]:[{...u,count:Math.max(0,o),reinforcement:r}]})}:{...s,carriedShips:[...s.carriedShips,ne({shipId:t,count:o,reinforcement:r})]})}}function ht(e){const{shipId:t,reinforcement:n,moduleSelection:o,fleetSetup:r}=e;return{...r,ships:r.ships.map(a=>a.shipDefinition.id!==t?a:n!=null&&n.includes("ally")?a.reinforcement===n?{...a,moduleSelection:o,carrierCapabilities:k(a.shipDefinition,o)}:a:!a.reinforcement||!a.reinforcement.includes("ally")?{...a,moduleSelection:o,carrierCapabilities:k(a.shipDefinition,o)}:a)}}function Ct(e,t,n){return{...n,groups:{...n.groups,[e]:Object.keys(n.groups[e]).reduce((o,r)=>{const a=n.groups[e][r];return{...o,[r]:r===t?{...a,usage:"used"}:{...a,usage:"not_used"}}},n.groups[e])}}}function b(e){return e.filter(t=>t.reinforcement===null).map(t=>t.count*t.shipDefinition.cost).reduce((t,n)=>t+n,0)}function w(e){return e.filter(t=>t.reinforcement!==null).map(t=>t.count).reduce((t,n)=>t+n,0)}function Rt(e){let t=0;const n=e.map(a=>a.count).reduce((a,i)=>a+i,0),o=Object.keys(Me).reduce((a,i)=>({...a,[i]:0}),{}),r={[C.FRONT]:0,[C.MIDDLE]:0,[C.BACK]:0,[C.NONE]:0};return e.forEach(a=>{a.reinforcement===null&&(t+=a.count*a.shipDefinition.cost),o[a.shipDefinition.type]+=a.count,r[a.shipDefinition.row]+=a.count,a.carriedShips.length>0&&a.carriedShips.forEach(i=>{o[i.shipDefinition.type]+=i.count})}),{shipCount:n,shipCountByType:o,shipCountByRow:r,totalCost:t}}function Mt(e){var n,o;const t={};return e.name.length===0&&(t.name="\u5FC5\u9808\u9805\u76EE"),(!Number.isFinite(e.maxReinforcement)||e.maxReinforcement<0)&&(t.maxReinforcement="\u7121\u52B9\u306A\u5024"),(!Number.isFinite(e.maxCost)||e.maxCost<300||e.maxCost>450)&&(t.maxCost="\u7121\u52B9\u306A\u5024"),e.maxCost>400&&e.maxReinforcement>5&&(t.maxReinforcement=(n=t.maxReinforcement)!=null?n:"\u57FA\u5730\u7D50\u5408\u52B9\u679C\u306F\uFF11\u3064\u307E\u3067\u3067\u3059",t.maxCost=(o=t.maxCost)!=null?o:"\u57FA\u5730\u7D50\u5408\u52B9\u679C\u306F\uFF11\u3064\u307E\u3067\u3067\u3059"),t}function vt(e){const t={},n={},o={};return e.ships.forEach(r=>{const a=K(r.shipDefinition.id,r.reinforcement);if(n[a]){const i=n[a];n[a]={count:r.reinforcement===null?r.count:i.count,reinforcementCount:r.reinforcement!==null?r.count:i.reinforcementCount,operationLimit:r.shipDefinition.operationLimit}}else n[a]={count:r.reinforcement===null?r.count:0,reinforcementCount:r.reinforcement!==null?r.count:0,operationLimit:r.shipDefinition.operationLimit};r.carriedShips.forEach(i=>{const s=K(i.shipDefinition.id,r.reinforcement);o[s]?o[s].count+=i.count:o[s]={count:i.count,operationLimit:i.shipDefinition.operationLimit}})}),Object.keys(n).forEach(r=>{const a=n[r];a.count+a.reinforcementCount>a.operationLimit&&(t[r]="\u914D\u5099\u3057\u305F\u5408\u8A08\u6570\u304C\u7A3C\u50CD\u4E0A\u9650\u3092\u8D85\u3048\u3066\u3044\u307E\u3059\u3002")}),Object.keys(o).forEach(r=>{const a=o[r];a.count>a.operationLimit&&(t[r]="\u914D\u5099\u3057\u305F\u5408\u8A08\u6570\u304C\u7A3C\u50CD\u4E0A\u9650\u3092\u8D85\u3048\u3066\u3044\u307E\u3059\u3002")}),t}function K(e,t){const n=t!=null&&t.includes("ally")?t:"self";return`${e}#${n}`}export{ct as A,Ge as B,y as G,ft as S,Rt as a,lt as b,yt as c,gt as d,ht as e,dt as f,pt as g,D as h,Mt as i,re as j,Ct as k,K as l,ne as m,mt as s,vt as v};
