import{q as ce,v as de,w as ue,D as he,_ as $,r as y,I as pe,y as fe,A as me,j as r,C as be,a9 as Se,bi as Ie,bj as V,bk as Z,p as Ne,k as v,d as De,b5 as ge,b3 as ye,U as D,V as A,X as K,N as Ae,b4 as Oe,bl as _e,i as Be,ao as Le,t as u,a as S,b as F,T as b,as as O,$ as Q,a0 as X,a1 as Y,aA as Ge,u as ze,bm as Ee,bn as je,F as _,bo as J,c as Ve,h as Ue,J as Ce,K as ve,L as xe,a3 as k,B as Fe,bf as He,S as U,a2 as qe}from"./index.36b31c50.js";import{a as x,N as Ke,P as Je}from"./PageContent.cd72ab05.js";import{u as Ze,T as Qe}from"./useTable.b7f03238.js";import{E as Xe}from"./ExpandStack.1f501c01.js";import{T as B}from"./Tooltip.6c2f8ede.js";import{T as Ye,a as le}from"./ToggleButtonGroup.c8e625b5.js";import{F as z,I as E,S as j}from"./Select.88190c9b.js";import{R as et}from"./ResponsiveDialog.6326ffce.js";import{P as tt}from"./PageFooter.85f37e24.js";import"./sorting.c6946657.js";import"./useFormControl.c197e665.js";function rt(e){return ce("MuiListSubheader",e)}de("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const at=["className","color","component","disableGutters","disableSticky","inset"],it=e=>{const{classes:t,color:n,disableGutters:s,inset:l,disableSticky:o}=e,c={root:["root",n!=="default"&&`color${he(n)}`,!s&&"gutters",l&&"inset",!o&&"sticky"]};return me(c,rt,t)},nt=ue("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="default"&&t[`color${he(n.color)}`],!n.disableGutters&&t.gutters,n.inset&&t.inset,!n.disableSticky&&t.sticky]}})(({theme:e,ownerState:t})=>$({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(e.vars||e).palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},t.color==="primary"&&{color:(e.vars||e).palette.primary.main},t.color==="inherit"&&{color:"inherit"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.inset&&{paddingLeft:72},!t.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(e.vars||e).palette.background.paper})),lt=y.exports.forwardRef(function(t,n){const s=pe({props:t,name:"MuiListSubheader"}),{className:l,color:o="default",component:c="li",disableGutters:h=!1,disableSticky:f=!1,inset:m=!1}=s,p=fe(s,at),a=$({},s,{color:o,component:c,disableGutters:h,disableSticky:f,inset:m}),i=it(a);return r(nt,$({as:c,className:be(i.root,l),ref:n,ownerState:a},p))});var H=lt;const st=y.exports.createContext();var se=st;function ot(e){return ce("MuiGrid",e)}const ct=[0,1,2,3,4,5,6,7,8,9,10],dt=["column-reverse","column","row-reverse","row"],ut=["nowrap","wrap-reverse","wrap"],I=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],L=de("MuiGrid",["root","container","item","zeroMinWidth",...ct.map(e=>`spacing-xs-${e}`),...dt.map(e=>`direction-xs-${e}`),...ut.map(e=>`wrap-xs-${e}`),...I.map(e=>`grid-xs-${e}`),...I.map(e=>`grid-sm-${e}`),...I.map(e=>`grid-md-${e}`),...I.map(e=>`grid-lg-${e}`),...I.map(e=>`grid-xl-${e}`)]),ht=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function P(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function pt({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce((s,l)=>{let o={};if(t[l]&&(n=t[l]),!n)return s;if(n===!0)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(n==="auto")o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const c=V({values:t.columns,breakpoints:e.breakpoints.values}),h=typeof c=="object"?c[l]:c;if(h==null)return s;const f=`${Math.round(n/h*1e8)/1e6}%`;let m={};if(t.container&&t.item&&t.columnSpacing!==0){const p=e.spacing(t.columnSpacing);if(p!=="0px"){const a=`calc(${f} + ${P(p)})`;m={flexBasis:a,maxWidth:a}}}o=$({flexBasis:f,flexGrow:0,maxWidth:f},m)}return e.breakpoints.values[l]===0?Object.assign(s,o):s[e.breakpoints.up(l)]=o,s},{})}function ft({theme:e,ownerState:t}){const n=V({values:t.direction,breakpoints:e.breakpoints.values});return Z({theme:e},n,s=>{const l={flexDirection:s};return s.indexOf("column")===0&&(l[`& > .${L.item}`]={maxWidth:"none"}),l})}function Te({breakpoints:e,values:t}){let n="";Object.keys(t).forEach(l=>{n===""&&t[l]!==0&&(n=l)});const s=Object.keys(e).sort((l,o)=>e[l]-e[o]);return s.slice(0,s.indexOf(n))}function mt({theme:e,ownerState:t}){const{container:n,rowSpacing:s}=t;let l={};if(n&&s!==0){const o=V({values:s,breakpoints:e.breakpoints.values});let c;typeof o=="object"&&(c=Te({breakpoints:e.breakpoints.values,values:o})),l=Z({theme:e},o,(h,f)=>{var m;const p=e.spacing(h);return p!=="0px"?{marginTop:`-${P(p)}`,[`& > .${L.item}`]:{paddingTop:P(p)}}:(m=c)!=null&&m.includes(f)?{}:{marginTop:0,[`& > .${L.item}`]:{paddingTop:0}}})}return l}function bt({theme:e,ownerState:t}){const{container:n,columnSpacing:s}=t;let l={};if(n&&s!==0){const o=V({values:s,breakpoints:e.breakpoints.values});let c;typeof o=="object"&&(c=Te({breakpoints:e.breakpoints.values,values:o})),l=Z({theme:e},o,(h,f)=>{var m;const p=e.spacing(h);return p!=="0px"?{width:`calc(100% + ${P(p)})`,marginLeft:`-${P(p)}`,[`& > .${L.item}`]:{paddingLeft:P(p)}}:(m=c)!=null&&m.includes(f)?{}:{width:"100%",marginLeft:0,[`& > .${L.item}`]:{paddingLeft:0}}})}return l}function St(e,t,n={}){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[n[`spacing-xs-${String(e)}`]];const s=[];return t.forEach(l=>{const o=e[l];Number(o)>0&&s.push(n[`spacing-${l}-${String(o)}`])}),s}const gt=ue("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:s,direction:l,item:o,spacing:c,wrap:h,zeroMinWidth:f,breakpoints:m}=n;let p=[];s&&(p=St(c,m,t));const a=[];return m.forEach(i=>{const g=n[i];g&&a.push(t[`grid-${i}-${String(g)}`])}),[t.root,s&&t.container,o&&t.item,f&&t.zeroMinWidth,...p,l!=="row"&&t[`direction-xs-${String(l)}`],h!=="wrap"&&t[`wrap-xs-${String(h)}`],...a]}})(({ownerState:e})=>$({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},e.wrap!=="wrap"&&{flexWrap:e.wrap}),ft,mt,bt,pt);function yt(e,t){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[`spacing-xs-${String(e)}`];const n=[];return t.forEach(s=>{const l=e[s];if(Number(l)>0){const o=`spacing-${s}-${String(l)}`;n.push(o)}}),n}const Ct=e=>{const{classes:t,container:n,direction:s,item:l,spacing:o,wrap:c,zeroMinWidth:h,breakpoints:f}=e;let m=[];n&&(m=yt(o,f));const p=[];f.forEach(i=>{const g=e[i];g&&p.push(`grid-${i}-${String(g)}`)});const a={root:["root",n&&"container",l&&"item",h&&"zeroMinWidth",...m,s!=="row"&&`direction-xs-${String(s)}`,c!=="wrap"&&`wrap-xs-${String(c)}`,...p]};return me(a,ot,t)},vt=y.exports.forwardRef(function(t,n){const s=pe({props:t,name:"MuiGrid"}),{breakpoints:l}=Se(),o=Ie(s),{className:c,columns:h,columnSpacing:f,component:m="div",container:p=!1,direction:a="row",item:i=!1,rowSpacing:g,spacing:C=0,wrap:T="wrap",zeroMinWidth:M=!1}=o,d=fe(o,ht),w=g||C,Re=f||C,We=y.exports.useContext(se),re=p?h||12:We,ae={},ie=$({},d);l.keys.forEach(G=>{d[G]!=null&&(ae[G]=d[G],delete ie[G])});const ne=$({},o,{columns:re,container:p,direction:a,item:i,rowSpacing:w,columnSpacing:Re,wrap:T,zeroMinWidth:M,spacing:C},ae,{breakpoints:l.keys}),Pe=Ct(ne);return r(se.Provider,{value:re,children:r(gt,$({ownerState:ne,className:be(Pe.root,c),as:m,ref:n},ie))})});var R=vt;function xt(){return Ne.filter(e=>!!e.researchManufacturer||!!e.researchStrategyTypes||!!e.researchTacticTypes)}function Ft(e,t){const n=[],s=[],l=[],o=[];return e.forEach(c=>{const h=De(c,t);if(h.length>0){s.push({shipDefinition:c,modules:h});return}if(ge(c.id,t)){l.push(c);return}if(ye(c.id,t)){n.push(c);return}o.push(c)}),{wantedShips:n.sort((c,h)=>v(c).localeCompare(v(h))),shipsWithWantedModule:s.sort((c,h)=>v(c.shipDefinition).localeCompare(v(h.shipDefinition))),possessedShips:l.sort((c,h)=>v(c).localeCompare(v(h))),remainingShips:o.sort((c,h)=>v(c).localeCompare(v(h)))}}function Tt(){const e=[D.NOMA_SHIPPING_GROUP,D.JUPITER_INDUSTRIES,D.ANTONIOS_CONSORTIUM,D.DAWN_ACCORD,null],t=[A.OUTSTANDING_FIREPOWER,A.SUSTAINED_COMBAT,A.STRATEGY_AND_SUPPORT,A.FIGHTER_AND_CORVETTE,null],n=[K.PROJECTILE_WEAPONS,K.DIRECT_FIRE_WEAPONS,null];return e.flatMap(s=>t.flatMap(l=>n.map(o=>({shipId:null,manufacturerFilter:s,strategyTypeFilter:l,tacticTypeFilter:o}))))}let wt=0;function $t(e,t,n){const s=t.filter(i=>!(e.manufacturerFilter!==null&&i.researchManufacturer!==e.manufacturerFilter||e.strategyTypeFilter!==null&&i.researchStrategyTypes&&!i.researchStrategyTypes.includes(e.strategyTypeFilter)||e.tacticTypeFilter!==null&&i.researchTacticTypes&&!i.researchTacticTypes.includes(e.tacticTypeFilter))),l=s.reduce((i,g)=>i+g.weight,0),o=s.map(i=>{const g=ge(i.id,n),C=i.weight/l,T=Ae(i,n);return{shipDefinition:i,chance:C,formula:`${i.weight} / ${l}`,possessed:g,wished:ye(i.id,n),unwished:Oe(i.id,n),modules:T.map(M=>({module:M,chance:C/T.length,formula:`${Rt(C)} / ${T.length}`,wished:_e(M.id,i.id,n)}))}});let c=0,h=0,f=0,m=0,p=0;o.forEach(i=>{if(i.possessed){if(i.modules.length>0){h+=i.chance,i.modules.find(g=>g.wished)&&(f+=i.chance);return}p+=i.chance;return}else{c+=i.chance,i.wished&&(f+=i.chance),i.unwished&&(m+=i.chance);return}});const a=Object.values(Be).map(i=>{const g=i;return{shipType:g,chance:o.filter(C=>C.shipDefinition.type===g).map(C=>C.chance).reduce((C,T)=>C+T,0)}}).filter(i=>i.chance>0);return{id:`${wt++}`,filterState:e,shipChances:o,shipTypeChances:a,totalShipChance:c,totalModuleChance:h,wishedShipChance:f,unwishedShipChance:m,techPointChance:p}}function Mt(e){var t,n,s;return`${(t=e.manufacturerFilter)!=null?t:"null"}.${(n=e.strategyTypeFilter)!=null?n:"null"}.${(s=e.tacticTypeFilter)!=null?s:"null"}`}function kt(e,t){if(t.shipId!==null)return e.filter(l=>!l.filterState.manufacturerFilter&&!l.filterState.strategyTypeFilter&&!l.filterState.tacticTypeFilter?!1:l.shipChances.find(o=>o.shipDefinition.id===t.shipId)).sort((l,o)=>{var f,m,p,a;const c=(m=(f=l.shipChances.find(i=>i.shipDefinition.id===t.shipId))==null?void 0:f.chance)!=null?m:0;return((a=(p=o.shipChances.find(i=>i.shipDefinition.id===t.shipId))==null?void 0:p.chance)!=null?a:0)-c});const n=[],s=e.filter(l=>t.manufacturerFilter!==null&&l.filterState.manufacturerFilter!==t.manufacturerFilter||t.strategyTypeFilter!==null&&l.filterState.strategyTypeFilter!==t.strategyTypeFilter||t.tacticTypeFilter!==null&&l.filterState.tacticTypeFilter!==t.tacticTypeFilter||!l.filterState.manufacturerFilter&&!l.filterState.strategyTypeFilter&&!l.filterState.tacticTypeFilter?!1:l.filterState.manufacturerFilter===t.manufacturerFilter&&l.filterState.strategyTypeFilter===t.strategyTypeFilter&&l.filterState.tacticTypeFilter===t.tacticTypeFilter?(n.push(l),!1):l);return[...n,...s]}function Rt(e){return`${Number((e*100).toFixed(3))} %`}const Wt=e=>{const{configurations:t,filterState:n,onClickConfiguration:s}=e,{table:l,setTableData:o}=Ze(),c=Se(),f=Le(c.breakpoints.down("sm"))?"38px":"50px",m=n.shipId;return y.exports.useEffect(()=>{const p={columns:[{id:"filter",renderHeader:()=>u("label.researchDirection"),renderCell:a=>S(F,{sx:{minWidth:"120px"},children:[a.filterState.manufacturerFilter&&r(b,{variant:"body2",children:r(O,{onClick:()=>s(a),children:Q(a.filterState.manufacturerFilter)})}),a.filterState.strategyTypeFilter&&r(b,{variant:"body2",children:r(O,{onClick:()=>s(a),children:X(a.filterState.strategyTypeFilter)})}),a.filterState.tacticTypeFilter&&r(b,{variant:"body2",children:r(O,{onClick:()=>s(a),children:Y(a.filterState.tacticTypeFilter)})}),!a.filterState.manufacturerFilter&&!a.filterState.strategyTypeFilter&&!a.filterState.tacticTypeFilter&&r(b,{variant:"body2",children:r(O,{onClick:()=>s(a),children:u("label.notSelected")})})]})},...m?[{id:"selectedShipChance",renderHeader:()=>u("label.selectedShip"),renderCell:a=>r(F,{sx:{minWidth:f},children:r(b,{variant:"body2",children:W(q(a,m))})}),sortFn:[(a,i)=>q(a,m)-q(i,m),(a,i)=>a.totalShipChance-i.totalShipChance,(a,i)=>i.techPointChance-a.techPointChance,(a,i)=>a.wishedShipChance-i.wishedShipChance,(a,i)=>i.unwishedShipChance-a.unwishedShipChance]}]:[],{id:"totalShipChance",renderHeader:()=>u("label.newShip"),renderCell:a=>r(F,{sx:{minWidth:f},children:r(b,{variant:"body2",children:W(a.totalShipChance)})}),sortFn:[(a,i)=>a.totalShipChance-i.totalShipChance,(a,i)=>i.techPointChance-a.techPointChance,(a,i)=>a.wishedShipChance-i.wishedShipChance,(a,i)=>i.unwishedShipChance-a.unwishedShipChance]},{id:"totalModuleChance",renderHeader:()=>u("label.additionalSystemModule"),renderCell:a=>r(F,{sx:{minWidth:f},children:r(b,{variant:"body2",children:W(a.totalModuleChance)})}),sortFn:[(a,i)=>a.totalModuleChance-i.totalModuleChance,(a,i)=>a.totalShipChance-i.totalShipChance,(a,i)=>i.techPointChance-a.techPointChance,(a,i)=>a.wishedShipChance-i.wishedShipChance,(a,i)=>i.unwishedShipChance-a.unwishedShipChance]},{id:"techPointChance",renderHeader:()=>u("label.techPoints"),renderCell:a=>r(F,{sx:{minWidth:f},children:r(b,{variant:"body2",children:W(a.techPointChance)})}),sortFn:[(a,i)=>a.techPointChance-i.techPointChance,(a,i)=>i.totalShipChance-a.totalShipChance,(a,i)=>i.wishedShipChance-a.wishedShipChance,(a,i)=>a.unwishedShipChance-i.unwishedShipChance]},{id:"wishedShipChance",renderHeader:()=>u("label.wantedBlueprint"),renderCell:a=>r(F,{sx:{minWidth:f},children:r(b,{variant:"body2",children:W(a.wishedShipChance)})}),sortFn:[(a,i)=>a.wishedShipChance-i.wishedShipChance,(a,i)=>i.techPointChance-a.techPointChance,(a,i)=>a.totalShipChance-i.totalShipChance,(a,i)=>i.unwishedShipChance-a.unwishedShipChance]},{id:"unwishedShipChance",renderHeader:()=>u("label.unwantedBlueprint"),renderCell:a=>r(F,{sx:{minWidth:f},children:r(b,{variant:"body2",children:W(a.unwishedShipChance)})}),sortFn:[(a,i)=>a.unwishedShipChance-i.unwishedShipChance,(a,i)=>i.totalShipChance-a.totalShipChance,(a,i)=>i.wishedShipChance-a.wishedShipChance,(a,i)=>a.techPointChance-i.techPointChance]}],data:t,rowIdFn:a=>Mt(a.filterState)};o(p)},[o,t,m,s,f]),r(Qe,{table:l,size:"small"})};function W(e){return`${Number((e*100).toFixed(2))} %`}function q(e,t){var n,s;return(s=(n=e.shipChances.find(l=>l.shipDefinition.id===t))==null?void 0:n.chance)!=null?s:0}const Pt=e=>{const{shipDefinition:t}=e,{openShipDetailDialog:n}=Ge();return r(b,{variant:"body2",component:"span",children:r(O,{onClick:()=>{n(t.id)},children:v(t)})})},we=e=>{const{configuration:t}=e,{userSettings:n}=ze();return r(Ee,{rows:[{key:`${t.id}.wishedShipChance`,label:u("label.wantedBlueprint"),value:N(t.wishedShipChance),separatorAfter:!0},...t.techPointChance>0?[{key:`${t.id}.techPointChance`,label:r(b,{variant:"body2",sx:t.techPointChance>0?{color:"red"}:void 0,children:u("label.techPoints")}),value:r(b,{variant:"body2",sx:t.techPointChance>0?{color:"red"}:void 0,children:N(t.techPointChance)}),separatorAfter:!0}]:[],...t.shipChances.flatMap(s=>{const l=s.possessed&&s.modules.length>0,o=s.wished||je(s.shipDefinition.id,n);return[{key:`${t.id}.${s.shipDefinition.id}`,label:S(_,{children:[r(Pt,{shipDefinition:s.shipDefinition}),J()&&r("span",{children:"\xA0"}),l&&r(b,{variant:"body2",component:"span",children:u("label.additionalSystemModuleBrackets")}),!l&&s.possessed&&r(b,{variant:"body2",component:"span",children:u("label.techPointsBrackets")}),o&&r(B,{arrow:!0,disableFocusListener:!0,title:`${u("label.wantedBlueprint")}`,children:r(b,{variant:"body2",component:"span",sx:{color:"#ffc107",marginLeft:"4px"},children:"\u2605"})})]}),value:r(B,{arrow:!0,disableFocusListener:!0,title:S(_,{children:[r(b,{variant:"body2",gutterBottom:!0,children:`[${u("label.probabilityWeight")}] / [${u("label.total")}]`}),r(b,{variant:"body2",children:s.formula})]}),children:r(b,{variant:"body2",sx:{color:!l&&s.possessed?"red":void 0},children:N(s.chance)})})},...l?s.modules.map(c=>({key:`${t.id}.${s.shipDefinition.id}.${c.module.id}`,label:S(_,{children:[r(b,{variant:"body2",component:"span",color:"text.secondary",sx:{opacity:.5},children:"\u2517"}),J()&&r("span",{children:"\xA0"}),r(b,{variant:"body2",component:"span",color:"text.secondary",children:`${c.module.category}${c.module.categoryNumber} ${Ve(s.shipDefinition.id,c.module)}`}),c.wished&&r(B,{arrow:!0,disableFocusListener:!0,title:`${u("label.wantedAdditionalSystemModule")}`,children:r(b,{variant:"body2",component:"span",sx:{color:"#ffc107",marginLeft:"4px"},children:"\u2605"})})]}),value:r(B,{arrow:!0,disableFocusListener:!0,title:S(_,{children:[r(b,{variant:"body2",gutterBottom:!0,children:`[${u("label.shipProbability")}] / [${u("label.remainingAdditionalSystemModules")}]`}),r(b,{variant:"body2",children:c.formula})]}),children:r(b,{variant:"body2",color:"text.secondary",children:N(c.chance)})})})):[]]}),...t.shipTypeChances.map((s,l)=>({key:`${t.id}.${s.shipType}`,label:Ue(s.shipType),value:N(s.chance),separatorBefore:l===0}))],rowGap:1})};function N(e){return`${Number((e*100).toFixed(3))} %`}const $e=e=>{var s,l;const{configuration:t,filterState:n}=e;return S(b,{variant:"body2",children:[[...t.filterState.manufacturerFilter!==null?[Q(t.filterState.manufacturerFilter)]:[],...t.filterState.strategyTypeFilter!==null?[X(t.filterState.strategyTypeFilter)]:[],...t.filterState.tacticTypeFilter!==null?[Y(t.filterState.tacticTypeFilter)]:[],...!t.filterState.manufacturerFilter&&!t.filterState.strategyTypeFilter&&!t.filterState.tacticTypeFilter?[u("label.notSelected")]:[]].map(o=>`\u300C${o}\u300D`).join("+"),n.shipId===null&&t.wishedShipChance>0&&r(B,{arrow:!0,disableFocusListener:!0,title:`${u("label.probabilityForWantedBlueprintColon")}${oe(t.wishedShipChance)}`,children:r(b,{variant:"body2",component:"span",sx:{color:"#ffc107",marginLeft:"4px"},children:"\u2605"})}),n.shipId!==null&&r(b,{variant:"body2",component:"span",children:`\u3000\u21D2\u3000${oe((l=(s=t.shipChances.find(o=>o.shipDefinition.id===n.shipId))==null?void 0:s.chance)!=null?l:0)}`})]})};function oe(e){return`${Number((e*100).toFixed(3))} %`}const It=e=>{const{configurations:t,filterState:n}=e,s=!!n.manufacturerFilter||!!n.strategyTypeFilter||!!n.tacticTypeFilter;return r(Xe,{expandables:t.map(l=>({id:l.id,initiallyOpened:s,summary:r($e,{configuration:l,filterState:n}),details:r(we,{configuration:l})})),unmount:!0})};var ee={},Nt=ve.exports;Object.defineProperty(ee,"__esModule",{value:!0});var Me=ee.default=void 0,Dt=Nt(Ce),At=xe,Ot=(0,Dt.default)((0,At.jsx)("path",{d:"M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z"}),"AccountTree");Me=ee.default=Ot;var te={},_t=ve.exports;Object.defineProperty(te,"__esModule",{value:!0});var ke=te.default=void 0,Bt=_t(Ce),Lt=xe,Gt=(0,Bt.default)((0,Lt.jsx)("path",{d:"M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z"}),"TableRows");ke=te.default=Gt;const zt=e=>{const{mode:t,onChange:n}=e;return S(Ye,{value:t,exclusive:!0,onChange:(l,o)=>{n(o)},size:"small","aria-label":"view mode",children:[r(le,{value:"ships","aria-label":"ships",children:r(Me,{})}),r(le,{value:"table","aria-label":"table",children:r(ke,{})})]})},Et=e=>{var g,C,T,M;const{filterState:t,shipFilterOptions:n,onChange:s}=e,[l,o]=y.exports.useState(t),[c,h]=y.exports.useTransition(),f=d=>{o(w=>({...w,shipId:d.target.value===""?null:d.target.value,manufacturerFilter:null,strategyTypeFilter:null,tacticTypeFilter:null}))},m=d=>{o(w=>({...w,shipId:null,manufacturerFilter:d.target.value===""?null:d.target.value}))},p=d=>{o(w=>({...w,shipId:null,strategyTypeFilter:d.target.value===""?null:d.target.value}))},a=d=>{o(w=>({...w,shipId:null,tacticTypeFilter:d.target.value===""?null:d.target.value}))},i=()=>{o(d=>({...d,shipId:null,manufacturerFilter:null,strategyTypeFilter:null,tacticTypeFilter:null}))};return y.exports.useEffect(()=>{h(()=>{s(l)})},[l,s]),S(R,{container:!0,spacing:2,children:[r(R,{item:!0,xs:12,sm:8,md:4,children:S(z,{fullWidth:!0,size:"small",children:[r(E,{id:"manufacturer-select-label",children:u("label.researchManufacturer")}),S(j,{labelId:"manufacturer-select-label",value:(g=l.manufacturerFilter)!=null?g:"",label:u("label.researchManufacturer"),onChange:m,children:[r(x,{value:"",children:u("label.notSelected")}),r(k,{}),Object.values(D).map(d=>r(x,{value:d,children:Q(d)},d))]})]})}),r(R,{item:!0,xs:12,sm:8,md:4,children:S(z,{fullWidth:!0,size:"small",children:[r(E,{id:"strategy-select-label",children:u("label.researchStrategyType")}),S(j,{labelId:"strategy-select-label",value:(C=l.strategyTypeFilter)!=null?C:"",label:u("label.researchStrategyType"),onChange:p,children:[r(x,{value:"",children:u("label.notSelected")}),r(k,{}),Object.values(A).map(d=>r(x,{value:d,children:X(d)},d))]})]})}),r(R,{item:!0,xs:12,sm:8,md:4,children:S(z,{fullWidth:!0,size:"small",children:[r(E,{id:"tactics-select-label",children:u("label.researchTacticType")}),S(j,{labelId:"tactics-select-label",value:(T=l.tacticTypeFilter)!=null?T:"",label:u("label.researchTacticType"),onChange:a,children:[r(x,{value:"",children:u("label.notSelected")}),r(k,{}),Object.values(K).map(d=>r(x,{value:d,children:Y(d)},d))]})]})}),r(R,{item:!0,xs:12,sm:8,children:S(z,{fullWidth:!0,size:"small",children:[r(E,{id:"ship-select-label",children:u("label.ship")}),S(j,{labelId:"ship-select-label",value:(M=l.shipId)!=null?M:"",label:u("label.ship"),onChange:f,children:[r(x,{value:"",children:u("label.notSelected")}),n.wantedShips.length+n.shipsWithWantedModule.length>0&&r(k,{}),n.wantedShips.length+n.shipsWithWantedModule.length>0&&r(H,{disableSticky:!0,children:u("label.wantedBlueprintColon")}),n.wantedShips.map(d=>S(x,{value:d.id,children:[v(d),r(b,{variant:"body1",component:"span",sx:{color:"#ffc107",marginLeft:"4px"},children:"\u2605"})]},d.id)),n.shipsWithWantedModule.map(({shipDefinition:d,modules:w})=>S(x,{value:d.id,children:[v(d),J()&&r("span",{children:"\xA0"}),u("label.additionalSystemModuleBrackets"),r(b,{variant:"body1",component:"span",sx:{color:"#ffc107",marginLeft:"4px"},children:"\u2605"})]},d.id)),n.remainingShips.length>0&&r(k,{}),n.remainingShips.length>0&&r(H,{disableSticky:!0,children:u("label.acquirableBlueprintColon")}),n.remainingShips.map(d=>r(x,{value:d.id,children:v(d)},d.id)),n.possessedShips.length>0&&r(k,{}),n.possessedShips.length>0&&r(H,{disableSticky:!0,children:u("label.acquiredBlueprintColon")}),n.possessedShips.map(d=>r(x,{value:d.id,children:v(d)},d.id))]})]})}),r(R,{item:!0,xs:12,sm:4,sx:{display:"flex",justifyContent:"end"},children:r(Fe,{variant:"outlined",onClick:i,children:u("button.reset")})})]})},jt=y.exports.memo(Wt),Vt=y.exports.memo(It),rr=()=>{const[e,t]=y.exports.useState("ships"),n=y.exports.useMemo(()=>xt(),[]),s=y.exports.useMemo(()=>He(),[]),l=y.exports.useMemo(()=>Tt(),[]),o=y.exports.useMemo(()=>l.map(i=>$t(i,n,s)),[l,n]),c=y.exports.useMemo(()=>Ft(n,s),[n,s]),[h,f]=y.exports.useState({shipId:null,manufacturerFilter:null,strategyTypeFilter:null,tacticTypeFilter:null}),m=y.exports.useMemo(()=>kt(o,h),[o,h]),[p,a]=y.exports.useState(null);return S(_,{children:[r(Ke,{currentRoute:"/researchAgreement"}),r(Je,{children:r(F,{p:1,children:S(U,{spacing:1,children:[S(U,{pt:1,pb:1,spacing:2,children:[r(b,{variant:"body2",children:u("researchAgreement.pageDescription1")}),r(b,{variant:"body2",children:u("researchAgreement.pageDescription2")}),r(b,{variant:"body2",children:u("researchAgreement.pageDescription3")})]}),r(qe,{children:r(F,{p:2,children:S(U,{spacing:2,children:[r(b,{variant:"body2",children:u("label.researchDirection")}),r("div",{children:r(Et,{filterState:h,onChange:f,shipFilterOptions:c})}),r(F,{sx:{display:"flex",justifyContent:"end"},children:r(zt,{mode:e,onChange:t})})]})})}),e==="ships"&&r(Vt,{configurations:m,filterState:h})]})})}),e==="table"&&r(F,{p:1,children:r(jt,{configurations:m,filterState:h,onClickConfiguration:a})}),p&&r(et,{maxWidth:"sm",title:r($e,{configuration:p,filterState:h}),content:r(we,{configuration:p}),actions:r(Fe,{variant:"outlined",onClick:()=>a(null),children:u("button.close")}),onClose:()=>a(null)}),r(tt,{disableContainer:e==="table"})]})};export{rr as ResearchAgreementPage,rr as default};
