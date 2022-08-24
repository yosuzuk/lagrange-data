import{q as Z,v as ee,w as z,x as Ie,_ as C,r as T,y as te,z as Se,A as re,a as F,j as n,C as Oe,D as L,E as $,G as Te,H as Ce,I as me,J as ae,K as se,L as ne,P as G,d as Re,W as j,M as oe,N as _e,O as Ne,e as m,Q as w,R as l,U as d,V as h,X as v,Y as P,t as Ee,Z as be,o as y,$ as Ae,a0 as Pe,a1 as xe,F as ke,B as g,a2 as Fe,b as X,a3 as ye,S as ve}from"./index.3216557f.js";import{B as Me,C as De,g as Ue,L as Be}from"./domUtils.e0e5f00e.js";import{u as ge,P as we}from"./useFormControl.617a4d60.js";import{G as He,M as We,a as Ge,L as ze}from"./PageContent.13c2f158.js";function Le(e){return Z("PrivateSwitchBase",e)}ee("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const $e=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],je=e=>{const{classes:t,checked:r,disabled:a,edge:s}=e,o={root:["root",r&&"checked",a&&"disabled",s&&`edge${L(s)}`],input:["input"]};return re(o,Le,t)},Ke=z(Ie,{skipSx:!0})(({ownerState:e})=>C({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),Je=z("input",{skipSx:!0})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),qe=T.exports.forwardRef(function(t,r){const{autoFocus:a,checked:s,checkedIcon:o,className:f,defaultChecked:I,disabled:i,disableFocusRipple:c=!1,edge:R=!1,icon:p,id:S,inputProps:M,inputRef:_,name:x,onBlur:N,onChange:b,onFocus:u,readOnly:k,required:U,tabIndex:A,type:B,value:q}=t,ie=te(t,$e),[Y,ue]=Se({controlled:s,default:Boolean(I),name:"SwitchBase",state:"checked"}),E=ge(),de=O=>{u&&u(O),E&&E.onFocus&&E.onFocus(O)},he=O=>{N&&N(O),E&&E.onBlur&&E.onBlur(O)},fe=O=>{if(O.nativeEvent.defaultPrevented)return;const Q=O.target.checked;ue(Q),b&&b(O,Q)};let D=i;E&&typeof D=="undefined"&&(D=E.disabled);const pe=B==="checkbox"||B==="radio",H=C({},t,{checked:Y,disabled:D,disableFocusRipple:c,edge:R}),V=je(H);return F(Ke,C({component:"span",className:Oe(V.root,f),centerRipple:!0,focusRipple:!c,disabled:D,tabIndex:null,role:void 0,onFocus:de,onBlur:he,ownerState:H,ref:r},ie,{children:[n(Je,C({autoFocus:a,checked:s,defaultChecked:I,className:V.input,disabled:D,id:pe&&S,name:x,onChange:fe,readOnly:k,ref:_,required:U,ownerState:H,tabIndex:A,type:B},B==="checkbox"&&q===void 0?{}:{value:q},M)),Y?o:p]}))});var Ye=qe,Ve=$(n("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Qe=$(n("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Xe=$(n("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Ze(e){return Z("MuiCheckbox",e)}const et=ee("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]);var W=et;const tt=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],rt=e=>{const{classes:t,indeterminate:r,color:a}=e,s={root:["root",r&&"indeterminate",`color${L(a)}`]},o=re(s,Ze,t);return C({},t,o)},at=z(Ye,{shouldForwardProp:e=>Te(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.indeterminate&&t.indeterminate,r.color!=="default"&&t[`color${L(r.color)}`]]}})(({theme:e,ownerState:t})=>C({color:e.palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:Ce(t.color==="default"?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${W.checked}, &.${W.indeterminate}`]:{color:e.palette[t.color].main},[`&.${W.disabled}`]:{color:e.palette.action.disabled}})),st=n(Qe,{}),nt=n(Ve,{}),ot=n(Xe,{}),lt=T.exports.forwardRef(function(t,r){var a,s;const o=me({props:t,name:"MuiCheckbox"}),{checkedIcon:f=st,color:I="primary",icon:i=nt,indeterminate:c=!1,indeterminateIcon:R=ot,inputProps:p,size:S="medium"}=o,M=te(o,tt),_=c?R:i,x=c?R:f,N=C({},o,{color:I,indeterminate:c,size:S}),b=rt(N);return n(at,C({type:"checkbox",inputProps:C({"data-indeterminate":c},p),icon:T.exports.cloneElement(_,{fontSize:(a=_.props.fontSize)!=null?a:S}),checkedIcon:T.exports.cloneElement(x,{fontSize:(s=x.props.fontSize)!=null?s:S}),ownerState:N,ref:r},M,{classes:b}))});var ct=lt,K={},it=se.exports;Object.defineProperty(K,"__esModule",{value:!0});var le=K.default=void 0,ut=it(ae),dt=ne,ht=(0,ut.default)((0,dt.jsx)("path",{d:"M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"}),"FilterAlt");le=K.default=ht;var J={},ft=se.exports;Object.defineProperty(J,"__esModule",{value:!0});var ce=J.default=void 0,pt=ft(ae),It=ne,St=(0,pt.default)((0,It.jsx)("path",{d:"M19.79 5.61C20.3 4.95 19.83 4 19 4H6.83l7.97 7.97 4.99-6.36zM2.81 2.81 1.39 4.22 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.17l5.78 5.78 1.41-1.41L2.81 2.81z"}),"FilterAltOff");ce=J.default=St;function Ot(e){return(e!=null?e:[m.FRONT,m.MIDDLE,m.BACK]).map(t=>({filterKey:t,name:Ee(t)}))}function Tt(e){return(e!=null?e:Object.keys(w)).map(t=>({filterKey:t,name:w[t].name}))}function Ct(e){return(e!=null?e:[l.JUPITER_INDUSTRIES,l.NOMA_SHIPPING_GROUP,l.ANTONIOS_CONSORTIUM,l.DAWN_ACCORD,l.HAYREDDIN_CLAN]).map(t=>({filterKey:t,name:be(t)}))}function mt(e){return(e!=null?e:[d.JUPITER_INDUSTRIES,d.NOMA_SHIPPING_GROUP,d.ANTONIOS_CONSORTIUM,d.DAWN_ACCORD]).map(t=>({filterKey:t,name:y("label.researchManufacturerOption",{manufacturer:Ae(t)})}))}function Rt(e){return(e!=null?e:[h.OUTSTANDING_FIREPOWER,h.SUSTAINED_COMBAT,h.STRATEGY_AND_SUPPORT,h.FIGHTER_AND_CORVETTE]).map(t=>({filterKey:t,name:y("label.researchStrategyTypeOption",{strategyType:Pe(t)})}))}function _t(e){return(e!=null?e:[v.PROJECTILE_WEAPONS,v.DIRECT_FIRE_WEAPONS]).map(t=>({filterKey:t,name:y("label.researchTacticTypeOption",{tacticType:xe(t)})}))}function Nt(e={}){var t,r,a,s,o,f;return[...Ot((t=e.shipRows)!=null?t:null),...Tt((r=e.shipTypes)!=null?r:null),...Ct((a=e.manufacturer)!=null?a:null),...e.researchManufacturer===!1?[]:mt((s=e.researchManufacturer)!=null?s:null),...e.researchStrategyTypes===!1?[]:Rt((o=e.researchStrategyTypes)!=null?o:null),...e.researchTacticTypes===!1?[]:_t((f=e.researchTacticTypes)!=null?f:null)]}function Bt(){return{[m.FRONT]:!1,[m.MIDDLE]:!1,[m.BACK]:!1,...Object.keys(w).reduce((e,t)=>({...e,[t]:!1}),{}),[l.JUPITER_INDUSTRIES]:!1,[l.NOMA_SHIPPING_GROUP]:!1,[l.ANTONIOS_CONSORTIUM]:!1,[l.DAWN_ACCORD]:!1,[l.HAYREDDIN_CLAN]:!1,[d.JUPITER_INDUSTRIES]:!1,[d.NOMA_SHIPPING_GROUP]:!1,[d.ANTONIOS_CONSORTIUM]:!1,[d.DAWN_ACCORD]:!1,[h.OUTSTANDING_FIREPOWER]:!1,[h.SUSTAINED_COMBAT]:!1,[h.STRATEGY_AND_SUPPORT]:!1,[h.FIGHTER_AND_CORVETTE]:!1,[v.PROJECTILE_WEAPONS]:!1,[v.DIRECT_FIRE_WEAPONS]:!1}}function Et(e){const t={...e};return Object.keys(t).forEach(r=>{t[r]=!1}),t}function gt(e,t){let r=e;return bt(t)&&(r=r.filter(a=>t[a.row]===!0)),At(t)&&(r=r.filter(a=>t[a.type]===!0)),Pt(t)&&(r=r.filter(a=>t[a.manufacturer]===!0)),xt(t)&&(r=r.filter(a=>a.researchManufacturer&&t[a.researchManufacturer]===!0)),kt(t)&&(r=r.filter(a=>{var s;return((s=a.researchStrategyTypes)!=null?s:[]).some(o=>t[o]===!0)})),Ft(t)&&(r=r.filter(a=>{var s;return((s=a.researchTacticTypes)!=null?s:[]).some(o=>t[o]===!0)})),r}function wt(e){const t={[P.STARTER_SHIP]:[],[P.TECH_FILE]:[],[P.CITY_TRADE]:[],[P.DOCK_EFFECT]:[],[P.UNKNOWN]:[]};return e.forEach(r=>{t[r.source].push(r)}),t}function bt(e){return[m.FRONT,m.MIDDLE,m.BACK].some(t=>e[t]===!0)}function At(e){return Object.keys(w).some(t=>e[t]===!0)}function Pt(e){return[l.JUPITER_INDUSTRIES,l.NOMA_SHIPPING_GROUP,l.ANTONIOS_CONSORTIUM,l.DAWN_ACCORD,l.HAYREDDIN_CLAN].some(t=>e[t]===!0)}function xt(e){return[d.JUPITER_INDUSTRIES,d.NOMA_SHIPPING_GROUP,d.ANTONIOS_CONSORTIUM,d.DAWN_ACCORD].some(t=>e[t]===!0)}function kt(e){return[h.OUTSTANDING_FIREPOWER,h.SUSTAINED_COMBAT,h.STRATEGY_AND_SUPPORT,h.FIGHTER_AND_CORVETTE].some(t=>e[t]===!0)}function Ft(e){return[v.PROJECTILE_WEAPONS,v.DIRECT_FIRE_WEAPONS].some(t=>e[t]===!0)}function Ht(e,t){return e.filter(r=>{var a;return((a=t[r.id])==null?void 0:a.possession)===G.POSSESSED})}function Wt(e,t){return e.filter(r=>{var a;return Re(r,t).length>0?!0:((a=t.ships[r.id])==null?void 0:a.wish)===j.WANTED})}function Gt(e,t){return e.filter(r=>{var a;return oe(r.id)&&((a=t[r.id])==null?void 0:a.wish)===j.NOT_WANTED})}function zt(e,t){return e.filter(s=>s.source===P.TECH_FILE||s.source===P.STARTER_SHIP).filter(s=>{var o;return((o=t.ships[s.id])==null?void 0:o.possession)===G.POSSESSED}).filter(s=>{var o,f,I;if(!!s.modules&&_e(s,t).length>0||s.baseModelId)return!1;if(!!s.subModelIds||!!s.baseModelId){const i=(I=(f=s.subModelIds)!=null?f:(o=Ne(s.baseModelId))==null?void 0:o.subModelIds)!=null?I:[];return yt(i,t.ships)?!(i.filter(p=>oe(p)&&!!t.ships[p]&&t.ships[p].possession!==G.POSSESSED).filter(p=>t.ships[p].wish!==j.NOT_WANTED).length>0):!1}return!0})}function yt(e,t){return e.length>0&&e.every(r=>{var a;return!!((a=t[r])!=null&&a.possession)})}const Lt=e=>{const{onChange:t,popperProps:r,shipRows:a,shipTypes:s,researchManufacturer:o,researchStrategyTypes:f,researchTacticTypes:I,buttonProps:i}=e,[c,R]=T.exports.useState(e.filter),[p,S]=T.exports.useState(!1),[M]=T.exports.useState(()=>Nt({shipRows:a,shipTypes:s,researchManufacturer:o,researchStrategyTypes:f,researchTacticTypes:I})),_=T.exports.useRef(null),x=u=>{R(k=>({...k,[u]:!k[u]}))},N=()=>{R(u=>Et(u))};T.exports.useEffect(()=>{const u=setTimeout(()=>{t(c)},0);return()=>clearTimeout(u)},[c,t]);const b=Object.values(c).some(u=>u);return F(ke,{children:[F(Me,{variant:"outlined",ref:_,fullWidth:i==null?void 0:i.fullWidth,size:i==null?void 0:i.size,children:[n(g,{startIcon:n(le,{}),onClick:()=>S(!0),sx:{flexShrink:1},children:y("button.filter")}),b&&n(g,{size:"small",onClick:N,sx:{flexShrink:3},children:n(ce,{})})]},"filter"),n(we,{open:p,anchorEl:_.current,role:void 0,transition:!0,disablePortal:!0,style:{zIndex:1},...r,children:({TransitionProps:u,placement:k})=>{var U;return n(He,{...u,style:{transformOrigin:k==="bottom"?"center top":"center bottom"},children:n("div",{children:n(De,{onClickAway:()=>S(!1),children:F(Fe,{children:[n(X,{sx:{overflowY:"auto",maxHeight:`${((U=Ue(_.current))!=null?U:0)-50}px`},children:n(We,{id:"split-button-menu",children:M.map(A=>F(Ge,{selected:c[A.filterKey],onClick:()=>x(A.filterKey),children:[n(Be,{children:n(ct,{edge:"start",checked:c[A.filterKey],tabIndex:-1,disableRipple:!0})}),n(ze,{children:A.name})]},A.filterKey))})}),n(ye,{}),n(X,{p:1,display:"flex",justifyContent:"end",children:F(ve,{spacing:1,direction:"row",children:[n(g,{variant:"outlined",onClick:N,disabled:!b,children:y("button.unselectAll")}),n(g,{variant:"outlined",onClick:()=>S(!1),children:y("button.close")})]})})]})})})})}})]})};export{ct as C,Lt as S,gt as a,Wt as b,Bt as c,Gt as d,Ht as e,zt as f,Ye as g,wt as s};
