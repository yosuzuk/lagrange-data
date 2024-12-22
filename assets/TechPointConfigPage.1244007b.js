import{M as Ie,k as r,C as Ee,D as Pe,E as z,L as _,_ as S,b7 as Ke,r as p,P as Fe,H as he,aW as $e,I as qe,ai as Ae,bt as et,aj as Te,J as Me,j as g,K as J,O as ye,b9 as tt,b8 as ot,x as I,T as y,t as T,aw as nt,v as te,aA as it,g as Ne,aL as st,f as rt,aI as ct,F as ee,c as P,B as ce,be as A,bs as at,av as xe,m as lt,a4 as we,bG as dt}from"./index.2b056f30.js";import{g as ut,S as ht,c as pt,a as ft}from"./ShipTypeFilterButton.5adc8357.js";import{N as gt,P as mt}from"./PageContent.5c764c80.js";import{P as vt}from"./PageFooter.a8b831cb.js";import{d as St,C as Ct}from"./ConfirmationDialog.8a86d4c9.js";import{E as bt}from"./ExpandStack.7f40edab.js";import{v as Tt}from"./visuallyHidden.c6275901.js";import{c as yt,b as xt}from"./boolMapUtils.54d90c14.js";import{d as wt}from"./Save.15909dcd.js";import{d as kt,a as Rt}from"./DeleteForever.bfb6c5fa.js";import{A as It}from"./ActionBar.eaca503d.js";import{S as Et}from"./SearchInput.273cfc65.js";import"./domUtils.df855419.js";import"./MenuItem.2116f85c.js";import"./Popper.b61f1969.js";import"./ClickAwayListener.8dba0913.js";import"./useFormControl.1350e2fd.js";import"./ResponsiveDialog.ac3922e7.js";import"./DialogContentText.7619c583.js";import"./TextField.0b66033f.js";import"./Select.c9eac106.js";import"./InputAdornment.3fa14ebc.js";var Pt=Ie(r("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),Ft=Ie(r("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");function $t(e){return Ee("MuiRating",e)}const At=Pe("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]);var Z=At;const Mt=["value"],Nt=["className","defaultValue","disabled","emptyIcon","emptyLabelText","getLabelText","highlightSelectedOnly","icon","IconContainerComponent","max","name","onChange","onChangeActive","onMouseLeave","onMouseMove","precision","readOnly","size","value"];function Ot(e,t,o){return e<t?t:e>o?o:e}function Lt(e){const t=e.toString().split(".")[1];return t?t.length:0}function ae(e,t){if(e==null)return e;const o=Math.round(e/t)*t;return Number(o.toFixed(Lt(t)))}const _t=e=>{const{classes:t,size:o,readOnly:n,disabled:s,emptyValueFocused:i,focusVisible:c}=e,a={root:["root",`size${_(o)}`,s&&"disabled",c&&"focusVisible",n&&"readyOnly"],label:["label","pristine"],labelEmptyValue:[i&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return Me(a,$t,t)},zt=z("span",{name:"MuiRating",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${Z.visuallyHidden}`]:t.visuallyHidden},t.root,t[`size${_(o.size)}`],o.readOnly&&t.readOnly]}})(({theme:e,ownerState:t})=>S({display:"inline-flex",position:"relative",fontSize:e.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent",[`&.${Z.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${Z.focusVisible} .${Z.iconActive}`]:{outline:"1px solid #999"},[`& .${Z.visuallyHidden}`]:Tt},t.size==="small"&&{fontSize:e.typography.pxToRem(18)},t.size==="large"&&{fontSize:e.typography.pxToRem(30)},t.readOnly&&{pointerEvents:"none"})),Oe=z("label",{name:"MuiRating",slot:"Label",overridesResolver:(e,t)=>t.label})(({ownerState:e})=>S({cursor:"inherit"},e.emptyValueFocused&&{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"})),Dt=z("span",{name:"MuiRating",slot:"Icon",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.icon,o.iconEmpty&&t.iconEmpty,o.iconFilled&&t.iconFilled,o.iconHover&&t.iconHover,o.iconFocus&&t.iconFocus,o.iconActive&&t.iconActive]}})(({theme:e,ownerState:t})=>S({display:"flex",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),pointerEvents:"none"},t.iconActive&&{transform:"scale(1.2)"},t.iconEmpty&&{color:(e.vars||e).palette.action.disabled})),Bt=z("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:e=>Ke(e)&&e!=="iconActive",overridesResolver:(e,t)=>{const{iconActive:o}=e;return[t.decimal,o&&t.iconActive]}})(({iconActive:e})=>S({position:"relative"},e&&{transform:"scale(1.2)"}));function Vt(e){const t=he(e,Mt);return r("span",S({},t))}function ke(e){const{classes:t,disabled:o,emptyIcon:n,focus:s,getLabelText:i,highlightSelectedOnly:c,hover:a,icon:h,IconContainerComponent:l,isActive:u,itemValue:d,labelProps:C,name:x,onBlur:$,onChange:E,onClick:f,onFocus:w,readOnly:v,ownerState:k,ratingValue:O,ratingValueRounded:ne}=e,V=c?d===O:d<=O,Q=d<=a,H=d<=s,ie=d===ne,X=$e(),D=r(Dt,{as:l,value:d,className:J(t.icon,V?t.iconFilled:t.iconEmpty,Q&&t.iconHover,H&&t.iconFocus,u&&t.iconActive),ownerState:S({},k,{iconEmpty:!V,iconFilled:V,iconHover:Q,iconFocus:H,iconActive:u}),children:n&&!V?n:h});return v?r("span",S({},C,{children:D})):g(p.exports.Fragment,{children:[g(Oe,S({ownerState:S({},k,{emptyValueFocused:void 0}),htmlFor:X},C,{children:[D,r("span",{className:t.visuallyHidden,children:i(d)})]})),r("input",{className:t.visuallyHidden,onFocus:w,onBlur:$,onChange:E,onClick:f,disabled:o,value:d,id:X,type:"radio",name:x,checked:ie})]})}const Ht=r(Pt,{fontSize:"inherit"}),Ut=r(Ft,{fontSize:"inherit"});function jt(e){return`${e} Star${e!==1?"s":""}`}const Gt=p.exports.forwardRef(function(t,o){const n=Fe({name:"MuiRating",props:t}),{className:s,defaultValue:i=null,disabled:c=!1,emptyIcon:a=Ut,emptyLabelText:h="Empty",getLabelText:l=jt,highlightSelectedOnly:u=!1,icon:d=Ht,IconContainerComponent:C=Vt,max:x=5,name:$,onChange:E,onChangeActive:f,onMouseLeave:w,onMouseMove:v,precision:k=1,readOnly:O=!1,size:ne="medium",value:V}=n,Q=he(n,Nt),H=$e($),[ie,X]=qe({controlled:V,default:i,name:"Rating"}),D=ae(ie,k),De=Ae(),[{hover:M,focus:K},W]=p.exports.useState({hover:-1,focus:-1});let U=D;M!==-1&&(U=M),K!==-1&&(U=K);const{isFocusVisibleRef:ve,onBlur:Be,onFocus:Ve,ref:He}=et(),[Ue,se]=p.exports.useState(!1),Se=p.exports.useRef(),je=Te(He,Se),Ge=Te(je,o),Xe=m=>{v&&v(m);const b=Se.current,{right:F,left:q}=b.getBoundingClientRect(),{width:j}=b.firstChild.getBoundingClientRect();let G;De.direction==="rtl"?G=(F-m.clientX)/(j*x):G=(m.clientX-q)/(j*x);let N=ae(x*G+k/2,k);N=Ot(N,k,x),W(B=>B.hover===N&&B.focus===N?B:{hover:N,focus:N}),se(!1),f&&M!==N&&f(m,N)},We=m=>{w&&w(m);const b=-1;W({hover:b,focus:b}),f&&M!==b&&f(m,b)},Ce=m=>{let b=m.target.value===""?null:parseFloat(m.target.value);M!==-1&&(b=M),X(b),E&&E(m,b)},Ye=m=>{m.clientX===0&&m.clientY===0||(W({hover:-1,focus:-1}),X(null),E&&parseFloat(m.target.value)===D&&E(m,null))},Ze=m=>{Ve(m),ve.current===!0&&se(!0);const b=parseFloat(m.target.value);W(F=>({hover:F.hover,focus:b}))},Je=m=>{if(M!==-1)return;Be(m),ve.current===!1&&se(!1);const b=-1;W(F=>({hover:F.hover,focus:b}))},[Qe,be]=p.exports.useState(!1),Y=S({},n,{defaultValue:i,disabled:c,emptyIcon:a,emptyLabelText:h,emptyValueFocused:Qe,focusVisible:Ue,getLabelText:l,icon:d,IconContainerComponent:C,max:x,precision:k,readOnly:O,size:ne}),L=_t(Y);return g(zt,S({ref:Ge,onMouseMove:Xe,onMouseLeave:We,className:J(L.root,s),ownerState:Y,role:O?"img":null,"aria-label":O?l(U):null},Q,{children:[Array.from(new Array(x)).map((m,b)=>{const F=b+1,q={classes:L,disabled:c,emptyIcon:a,focus:K,getLabelText:l,highlightSelectedOnly:u,hover:M,icon:d,IconContainerComponent:C,name:H,onBlur:Je,onChange:Ce,onClick:Ye,onFocus:Ze,ratingValue:U,ratingValueRounded:D,readOnly:O,ownerState:Y},j=F===Math.ceil(U)&&(M!==-1||K!==-1);if(k<1){const G=Array.from(new Array(1/k));return r(Bt,{className:J(L.decimal,j&&L.iconActive),ownerState:Y,iconActive:j,children:G.map((N,B)=>{const re=ae(F-1+(B+1)*k,k);return r(ke,S({},q,{isActive:!1,itemValue:re,labelProps:{style:G.length-1===B?{}:{width:re===U?`${(B+1)*k*100}%`:"0%",overflow:"hidden",position:"absolute"}}}),re)})},F)}return r(ke,S({},q,{isActive:j,itemValue:F}),F)}),!O&&!c&&g(Oe,{className:J(L.label,L.labelEmptyValue),ownerState:Y,children:[r("input",{className:L.visuallyHidden,value:"",id:`${H}-empty`,type:"radio",name:H,checked:D==null,onFocus:()=>be(!0),onBlur:()=>be(!1),onChange:Ce}),r("span",{className:L.visuallyHidden,children:h})]})]}))});var Xt=Gt;function Wt(e){return Ee("MuiSwitch",e)}const Yt=Pe("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var R=Yt;const Zt=["className","color","edge","size","sx"],Jt=e=>{const{classes:t,edge:o,size:n,color:s,checked:i,disabled:c}=e,a={root:["root",o&&`edge${_(o)}`,`size${_(n)}`],switchBase:["switchBase",`color${_(s)}`,i&&"checked",c&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},h=Me(a,Wt,t);return S({},t,h)},Qt=z("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.edge&&t[`edge${_(o.edge)}`],t[`size${_(o.size)}`]]}})(({ownerState:e})=>S({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},e.edge==="start"&&{marginLeft:-8},e.edge==="end"&&{marginRight:-8},e.size==="small"&&{width:40,height:24,padding:7,[`& .${R.thumb}`]:{width:16,height:16},[`& .${R.switchBase}`]:{padding:4,[`&.${R.checked}`]:{transform:"translateX(16px)"}}})),Kt=z(ut,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.switchBase,{[`& .${R.input}`]:t.input},o.color!=="default"&&t[`color${_(o.color)}`]]}})(({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${e.palette.mode==="light"?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${R.checked}`]:{transform:"translateX(20px)"},[`&.${R.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${e.palette.mode==="light"?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${R.checked} + .${R.track}`]:{opacity:.5},[`&.${R.disabled} + .${R.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:`${e.palette.mode==="light"?.12:.2}`},[`& .${R.input}`]:{left:"-100%",width:"300%"}}),({theme:e,ownerState:t})=>S({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:ye(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${R.checked}`]:{color:(e.vars||e).palette[t.color].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:ye(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${R.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t.color}DisabledColor`]:`${e.palette.mode==="light"?tt(e.palette[t.color].main,.62):ot(e.palette[t.color].main,.55)}`}},[`&.${R.checked} + .${R.track}`]:{backgroundColor:(e.vars||e).palette[t.color].main}})),qt=z("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})(({theme:e})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${e.palette.mode==="light"?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:`${e.palette.mode==="light"?.38:.3}`})),eo=z("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})(({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"})),to=p.exports.forwardRef(function(t,o){const n=Fe({props:t,name:"MuiSwitch"}),{className:s,color:i="primary",edge:c=!1,size:a="medium",sx:h}=n,l=he(n,Zt),u=S({},n,{color:i,edge:c,size:a}),d=Jt(u),C=r(eo,{className:d.thumb,ownerState:u});return g(Qt,{className:J(d.root,s),sx:h,ownerState:u,children:[r(Kt,S({type:"checkbox",icon:C,checkedIcon:C,ref:o,ownerState:u},l,{classes:S({},d,{root:d.switchBase})})),r(qt,{className:d.track,ownerState:u})]})});var Le=to;const le="1.5rem",Re="1rem",pe=e=>{const{techPoints:t,maxTechPoints:o,unlockCost:n,selected:s,incomplete:i,showZero:c}=e,a=s===!0&&n!==null&&n>0,h=(t!=null?t:0)+(a&&n!=null?n:0),l=(o!=null?o:0)+(a&&n!=null?n:0),u=s===!0||c||t!==null&&t>0,d=a||o!==null&&o>0;return g(I,{direction:"row",spacing:1,alignItems:"center",sx:{minWidth:"160px"},children:[r(y,{variant:"body2",color:"text.secondary",whiteSpace:"nowrap",children:T("techPointConfig.techPointShortColon")}),u&&r(y,{variant:"body1",textAlign:"right",sx:{fontSize:le},children:`${h}`}),g(I,{direction:"row",alignItems:"center",children:[r(y,{variant:"body1",textAlign:"right",sx:{fontSize:u?Re:le},color:u||!d?"text.secondary":"text.primary",children:`${u?"/ ":""}${d?`${l}`:"?"}`}),d&&i&&r(y,{variant:"body1",color:"text.secondary",sx:{fontSize:u?Re:le},children:"+"})]})]})},oo=e=>{const{shipId:t,selected:o,onToggle:n}=e,s=Ae(),i=nt(s.breakpoints.up("sm"));return r(Xt,{name:"toggle-favorite",size:i?"medium":"small",value:o?1:0,onChange:()=>{n(t)},max:1})},no=e=>{const{shipConfig:t,onClickName:o,onToggleFavorite:n}=e;return g(I,{spacing:3,direction:"row",pr:2,sx:{flexGrow:1},justifyContent:"end",flexWrap:"wrap",children:[r(te,{component:"div",sx:{display:"flex",flexGrow:1,alignItems:"center"},children:g("div",{children:[g(I,{spacing:1,direction:"row",alignItems:"center",children:[r(y,{variant:"body1",children:r(it,{onClick:()=>{o(t.shipDefinition.id)},children:Ne(t.shipDefinition)})}),r(oo,{shipId:t.shipDefinition.id,selected:t.favorite,onToggle:n})]}),t.incomplete&&r(y,{variant:"body2",sx:{color:"red"},children:T("techPointConfig.incomplete")})]})}),r(pe,{techPoints:t.techPoints,maxTechPoints:t.maxTechPoints,unlockCost:0,incomplete:t.incomplete})]})};function ue(e){return{ships:e.reduce((o,n)=>({...o,[n.id]:io(n)}),{})}}function io(e){var c,a,h,l;const t=(a=(c=e.modules)==null?void 0:c.filter(u=>u.skillSlots!==0).reduce((u,d)=>({...u,[d.id]:so(d)}),{}))!=null?a:{},o=(l=(h=e.modules)==null?void 0:h.filter(u=>u.skillSlots!==0&&u.category==="STATIC"||u.defaultModule===!0).map(u=>u.id))!=null?l:[],n=fe(t,o),s=ge(t,o),i=me(t,o);return{shipDefinition:e,modules:t,selectedModuleIds:o,techPoints:null,maxTechPoints:n,unlockCost:s,incomplete:i,favorite:!1}}function so(e){var s,i;const t=[...(s=e.flagshipEffects)!=null?s:[],...(i=e.skills)!=null?i:[]].filter(c=>Number.isFinite(c.cost)&&Number(c.cost)>0).reduce((c,a,h)=>{const l=`${a.type}_${h}`;return{...c,[l]:ro(a,l)}},{}),o=co(e),n=e.category!=="STATIC"&&!e.defaultModule?10:0;return{module:e,enhancements:t,selectedEnhancementIds:[],techPoints:null,maxTechPoints:o,unlockCost:n,incomplete:ao(e)}}function ro(e,t){return{id:t,enhancement:e,techPoints:e.cost}}function fe(e,t){return Object.keys(e).map(o=>e[o]).filter(o=>o.module.category==="STATIC"||t.includes(o.module.id)).map(o=>o.maxTechPoints).reduce((o,n)=>(o!=null?o:0)+(n!=null?n:0),null)}function ge(e,t){return Object.keys(e).map(o=>t.includes(o)?e[o].unlockCost:0).reduce((o,n)=>o+n,0)}function co(e){var n,s;if(!e.skillSlots||!e.skills||e.skills.length===0)return null;const t=[...e.skills,...(n=e.flagshipEffects)!=null?n:[]].filter(i=>i.isDefault&&i.cost!==null).map(i=>Number(i.cost)).reduce((i,c)=>(i!=null?i:0)+(c!=null?c:0),0),o=[...e.skills,...(s=e.flagshipEffects)!=null?s:[]].filter(i=>!i.isDefault&&Number.isFinite(i.cost)).map(i=>Number(i.cost)).sort((i,c)=>(c!=null?c:0)-(i!=null?i:0)).slice(0,e.skillSlots).reduce((i,c)=>(i!=null?i:0)+(c!=null?c:0),0);return t+o}function me(e,t){const o=Object.keys(e);return o.length===0?!0:o.map(n=>e[n]).filter(n=>n.module.category==="STATIC"||t.includes(n.module.id)).some(n=>n.incomplete)}function ao(e){var t,o;return e.skillSlots?!e.skillSlots||e.skillComplete!==!0||[...(t=e.flagshipEffects)!=null?t:[],...(o=e.skills)!=null?o:[]].some(n=>!n.isDefault&&n.cost===null):!0}function lo(e,t){if(e.selectedModuleIds.includes(t))return e.selectedModuleIds.filter(n=>n!==t);const{category:o}=e.modules[t].module;return o==="STATIC"?[...e.selectedModuleIds,t]:[...e.selectedModuleIds.filter(n=>o!==e.modules[n].module.category),t]}function uo(e,t,o){var c;const n=(c=e.ships[t])!=null?c:null;if(!n)throw new Error(`Missing config for "${t}"`);if(!n.modules[o])throw new Error(`Invalid module for "${t}", "${o}"`);const i={...n,selectedModuleIds:lo(n,o)};return{...e,ships:{...e.ships,[t]:{...i,techPoints:ze(i),maxTechPoints:fe(i.modules,i.selectedModuleIds),unlockCost:ge(i.modules,i.selectedModuleIds),incomplete:me(i.modules,i.selectedModuleIds)}}}}function _e(e,t){const o=e.filter(n=>{const{isDefault:s,cost:i}=t.enhancements[n].enhancement;return!s&&i!==null&&i>0}).length;return!!t.module.skillSlots&&o>t.module.skillSlots}function ho(e,t,o,n){var h,l;const s=(l=(h=e.ships[t])==null?void 0:h.modules[o])!=null?l:null;if(!s)throw new Error(`Missing config for "${t}", "${o}"`);const i=fo(s.selectedEnhancementIds,n);if(_e(i,s))return console.log("No more slots available"),e;const c={...s,selectedEnhancementIds:i},a={...e.ships[t],modules:{...e.ships[t].modules,[o]:{...c,techPoints:go(c)}}};return{...e,ships:{...e.ships,[t]:{...a,techPoints:ze(a)}}}}function po(e,t){return{...e,ships:{...e.ships,[t]:{...e.ships[t],favorite:!e.ships[t].favorite}}}}function fo(e,t){return e.includes(t)?e.filter(o=>o!==t):[...e,t]}function ze(e){return Object.values(e.modules).filter(t=>e.selectedModuleIds.includes(t.module.id)).map(t=>t.techPoints).reduce((t,o)=>(t!=null?t:0)+(o!=null?o:0),null)}function go(e){return Object.values(e.enhancements).filter(t=>e.selectedEnhancementIds.includes(t.id)).map(t=>t.techPoints).reduce((t,o)=>(t!=null?t:0)+(o!=null?o:0),null)}const mo=e=>{const{shipConfig:t,moduleConfig:o,enhancementConfig:n,onToggleEnhancement:s}=e,i=o.selectedEnhancementIds.includes(n.id),c=_e([...o.selectedEnhancementIds,n.id],o);return g(I,{spacing:1,direction:"row",children:[r("div",{children:r(Le,{checked:i,color:n.enhancement.isDefault?"secondary":"primary",onChange:()=>{s(t.shipDefinition.id,o.module.id,n.id)},disabled:!i&&c})}),r(te,{component:"div",sx:{display:"flex",flexGrow:1,alignItems:"center"},children:g(I,{spacing:.5,sx:{flexGrow:1},children:[r(y,{variant:"body2",children:`${n.enhancement.name}`}),n.enhancement.properties.map((a,h)=>r(y,{variant:"body2",color:"text.secondary",sx:{maxWidth:"80%"},children:a},`property_${h}`)),n.enhancement.cost===null&&r(y,{variant:"body2",sx:{color:"red"},children:T("techPointConfig.maxCostUnknown")})]})})]})},vo=e=>{var h;const{shipConfig:t,moduleConfig:o,onToggleModule:n,onToggleEnhancement:s}=e,{mode:i}=st(),c=t.selectedModuleIds.includes(o.module.id),a=o.selectedEnhancementIds.filter(l=>!o.enhancements[l].enhancement.isDefault).length;return g(I,{p:2,spacing:1,sx:{backgroundColor:i==="dark"?"rgba(255, 255, 255, 0.05)":"rgba(229, 229, 229, 0.5)"},children:[g(I,{spacing:1,direction:"row",children:[r("div",{children:r(Le,{checked:c,disabled:o.module.category==="STATIC",onChange:()=>{n(t.shipDefinition.id,o.module.id)}})}),r(te,{component:"div",sx:{display:"flex",flexGrow:1,alignItems:"center"},children:g(te,{component:"div",sx:{flexGrow:1},children:[r(y,{variant:"body2",children:`${o.module.category!=="STATIC"?`${o.module.category}${o.module.categoryNumber}`:""} ${rt(t.shipDefinition.id,o.module)}`}),o.incomplete&&r(y,{variant:"body2",sx:{color:"red"},children:T("techPointConfig.incomplete")})]})}),r(pe,{techPoints:c?o.techPoints:0,maxTechPoints:o.maxTechPoints,unlockCost:o.module.category!=="STATIC"&&!o.module.defaultModule?10:null,selected:c,incomplete:o.incomplete,showZero:!0})]}),c&&g(I,{spacing:3,pl:5,pt:1,pb:2,children:[g("div",{children:[r(y,{variant:"body1",color:"text.secondary",children:T("techPointConfig.enhancementSlotsColonValue",{value:`${a} / ${(h=o.module.skillSlots)!=null?h:"?"}`})}),!o.module.skillSlots&&r(y,{variant:"body2",sx:{color:"red"},children:T("techPointConfig.incomplete")})]}),Object.values(o.enhancements).map(l=>r(mo,{shipConfig:t,moduleConfig:o,enhancementConfig:l,onToggleEnhancement:s},l.id))]})]})},So=e=>{const{shipConfig:t,onToggleModule:o,onToggleEnhancement:n}=e;return g(I,{spacing:1,justifyContent:"end",children:[Object.values(t.modules).map(s=>r(vo,{shipConfig:t,moduleConfig:s,onToggleModule:o,onToggleEnhancement:n},s.module.id)),r(I,{justifyContent:"end",flexDirection:"row",sx:{paddingRight:"40px"},children:r(pe,{techPoints:t.techPoints,maxTechPoints:t.maxTechPoints,incomplete:t.incomplete,unlockCost:0})})]})},Co=e=>{const{config:t,onToggleEnhancement:o,onToggleModule:n,onToggleFavorite:s}=e,{openShipDetailDialog:i}=ct(),c=p.exports.useMemo(()=>{const a=[],h=[];return Object.values(t.ships).forEach(l=>{(l.favorite?a:h).push(l)}),[...a,...h]},[t]);return r(bt,{expandables:c.map(a=>({id:a.shipDefinition.id,initiallyOpened:!1,expandIcon:r(St,{}),summary:r(no,{shipConfig:a,onClickName:i,onToggleFavorite:s}),details:r(So,{shipConfig:a,onToggleModule:n,onToggleEnhancement:o})}))})},bo=e=>{const{shipFilter:t,modified:o,stored:n,onFilterChange:s,onReset:i,onCancel:c,onSave:a}=e,[h,l]=p.exports.useState(!1),u=p.exports.useCallback(()=>{l(!1),i()},[i]);return g(ee,{children:[r(It,{left:d=>r(ee,{children:r(ht,{filter:t,onChange:s,buttonProps:d,shipRows:[],manufacturer:[],researchManufacturer:!1,researchStrategyTypes:!1,researchTacticTypes:!1,shipSources:[],shipTypes:[P.AUXILIARY,P.CARRIER,P.BATTLE_CRUISER,P.CRUISER,P.CORVETTE,P.FIGHTER]},"filter")}),right:d=>g(ee,{children:[r(ce,{variant:"outlined",startIcon:r(kt,{}),onClick:()=>{l(!0)},disabled:!n,...d,children:T("button.reset")},"reset"),r(ce,{variant:"outlined",startIcon:r(Rt,{}),onClick:c,disabled:!o,...d,children:T("button.cancel")},"cancel"),r(ce,{variant:"contained",startIcon:r(wt,{}),onClick:a,disabled:!o,...d,children:T("button.save")},"save")]})}),h&&r(Ct,{title:T("button.reset"),question:T("techPointConfig.confirmReset"),cancelText:T("button.cancel"),confirmText:T("button.reset"),onCancel:()=>{l(!1)},onConfirm:u})]})},oe="tp";function To(){return!!window.localStorage.getItem(oe)}function yo(){window.localStorage.removeItem(oe)}function xo(e){const t=wo(e);window.localStorage.setItem(oe,JSON.stringify(t))}function de(e){const t=ue(e),o=window.localStorage.getItem(oe);if(!o)return t;let n;try{n=JSON.parse(o)}catch(s){return console.warn("Invalid tech point config",s),t}return ko(t,n)}function wo(e){const t={version:1,ships:[]};return Object.keys(e.ships).forEach(o=>{const n=e.ships[o],s=[o,[]];Object.keys(n.modules).forEach(i=>{const c=n.modules[i],a=n.selectedModuleIds.includes(i)?1:0,h=n.favorite?1:0,l=[i,c.selectedEnhancementIds,a,h];s[1].push(l)}),t.ships.push(s)}),t}function ko(e,t){return t.ships.forEach(([o,n])=>{const s=e.ships[o];if(!s){console.warn(`Invalid shipId "${o}"`);return}n.forEach(([i,c,a,h])=>{const l=s.modules[i];if(!l){console.warn(`Invalid moduleId "${i}" for ship ${s.shipDefinition.id}`);return}if(l.selectedEnhancementIds.length>0){console.warn(`Skip moduleId "${i}" (duplicate)`);return}if(c.forEach(u=>{var C,x,$,E;const d=l.enhancements[u];if(!d){console.warn(`Invalid enhancement "${u}"`);return}l.selectedEnhancementIds.push(u),l.techPoints=((C=l.techPoints)!=null?C:0)+((x=d.enhancement.cost)!=null?x:0),s.techPoints=(($=s.techPoints)!=null?$:0)+((E=d.enhancement.cost)!=null?E:0)}),a===1&&!s.selectedModuleIds.includes(i)){const u=Object.keys(s.modules).filter(d=>{const{category:C}=s.modules[d].module;return C!=="STATIC"&&C===l.module.category});s.selectedModuleIds=[...s.selectedModuleIds.filter(d=>!u.includes(d)),i]}s.favorite=h===1}),s.maxTechPoints=fe(s.modules,s.selectedModuleIds),s.unlockCost=ge(s.modules,s.selectedModuleIds),s.incomplete=me(s.modules,s.selectedModuleIds)}),e}const Ro=e=>{const{supportedShips:t,visibleShips:o}=e,[n,s]=p.exports.useState(()=>ue([])),[i,c]=p.exports.useState(!1),[a,h]=p.exports.useState(To());p.exports.useEffect(()=>{const f=de(t);s(f)},[t]);const l=p.exports.useCallback((f,w)=>{c(!0),s(v=>uo(v,f,w))},[]),u=p.exports.useCallback((f,w,v)=>{c(!0),s(k=>ho(k,f,w,v))},[]),d=p.exports.useCallback(f=>{c(!0),s(w=>po(w,f))},[]),C=p.exports.useCallback(()=>{yo();const f=ue(t);s(f),c(!1),h(!1)},[t]),x=p.exports.useCallback(()=>{const f=de(t);s(f),c(!1)},[n,t]),$=p.exports.useCallback(()=>{xo(n);const f=de(t);s(f),c(!1),h(!0)},[n,t]);return{config:p.exports.useMemo(()=>({ships:o.reduce((f,w)=>{const v=n.ships[w.id];return v?{...f,[w.id]:v}:f},{})}),[n,o]),modified:i,stored:a,handleToggleModule:l,handleToggleEnhancement:u,handleToggleFavorite:d,handleReset:C,handleCancel:x,handleSave:$}},Io=[P.AUXILIARY,P.CARRIER,P.BATTLE_CRUISER,P.CRUISER,P.CORVETTE,P.FIGHTER],Eo=[A.AC721_D,A.CERES_A,A.GUARDIAN_B,A.TUNDRA_B,A.WINGED_HUSSAR_C,A.MARE_IMBRIUM_A,A.MARE_TRANQUILLITATIS_B,A.MARE_TRANQUILLITATIS_C,A.XENO_STINGER_A,A.XENO_STINGER_B],Qo=()=>{const[e,t]=at(),[o,n]=p.exports.useState(()=>yt(e.getAll("filter"),pt()));p.exports.useEffect(()=>{t(xe.techPointConfig.createSearchParams({filter:xt(o)}))},[o]);const s=p.exports.useMemo(()=>lt.filter(v=>v.source===we.TECH_FILE||v.source===we.STARTER_SHIP).filter(v=>Io.includes(v.type)||Eo.includes(v.id)),[]),[i,c]=p.exports.useState(""),a=p.exports.useMemo(()=>{const v=ft(s,o);return dt(v)},[s,o]),h=p.exports.useMemo(()=>i?a.filter(v=>Ne(v).toLowerCase().includes(i)):a,[a,i]),{config:l,modified:u,stored:d,handleToggleModule:C,handleToggleEnhancement:x,handleToggleFavorite:$,handleReset:E,handleCancel:f,handleSave:w}=Ro({supportedShips:s,visibleShips:h});return g(ee,{children:[r(gt,{currentRoute:xe.techPointConfig.path}),r(bo,{shipFilter:o,modified:u,stored:d,onFilterChange:n,onReset:E,onCancel:f,onSave:w}),r(mt,{children:g(I,{spacing:2,p:1,children:[g(I,{pt:1,pb:1,spacing:2,children:[r(y,{variant:"body2",children:T("techPointConfig.pageDescription1")}),r(y,{variant:"body2",children:T("techPointConfig.pageDescription2")}),r(y,{variant:"body2",children:T("techPointConfig.pageDescription3")})]}),r(Et,{id:"searchShip",lowerCase:!0,value:i,placeholder:T("label.shipName"),onChange:c}),r(Co,{config:l,onToggleModule:C,onToggleEnhancement:x,onToggleFavorite:$})]})}),r(vt,{})]})};export{Qo as TechPointConfigPage,Qo as default};