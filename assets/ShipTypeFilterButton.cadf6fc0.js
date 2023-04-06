import{A as Z,C as ee,D as $,E as Oe,_ as R,r as S,G as te,H as Se,I as ae,j as k,k as n,J as re,K as z,L as K,M as Te,N as Ce,O as Re,P as se,Q as ne,R as oe,U as W,v as Ee,W as j,V as le,X as _e,Y as me,S as E,Z as H,$ as l,a0 as h,a1 as D,a2 as f,a3 as c,a4 as Ne,a as Ae,a5 as be,t as x,a6 as Pe,a7 as Fe,a8 as ye,a9 as ve,F as ke,B as G,aa as xe,q as X,ab as De,w as Ue}from"./index.87e5267c.js";import{B as Me,C as Be,g as ge,L as Ge}from"./domUtils.42f0cf46.js";import{u as He,P as Le}from"./useFormControl.1720c4a9.js";import{G as we,M as We,a as $e,L as ze}from"./PageContent.62966d61.js";function Ke(e){return Z("PrivateSwitchBase",e)}ee("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const je=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Ve=e=>{const{classes:t,checked:a,disabled:r,edge:s}=e,o={root:["root",a&&"checked",r&&"disabled",s&&`edge${z(s)}`],input:["input"]};return ae(o,Ke,t)},Ye=$(Oe)(({ownerState:e})=>R({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),Je=$("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),qe=S.exports.forwardRef(function(t,a){const{autoFocus:r,checked:s,checkedIcon:o,className:p,defaultChecked:d,disabled:u,disableFocusRipple:i=!1,edge:_=!1,icon:I,id:T,inputProps:U,inputRef:b,name:M,onBlur:P,onChange:F,onFocus:m,readOnly:g,required:O,tabIndex:v,type:y,value:N}=t,ue=te(t,je),[J,de]=Se({controlled:s,default:Boolean(d),name:"SwitchBase",state:"checked"}),A=He(),he=C=>{m&&m(C),A&&A.onFocus&&A.onFocus(C)},fe=C=>{P&&P(C),A&&A.onBlur&&A.onBlur(C)},pe=C=>{if(C.nativeEvent.defaultPrevented)return;const Q=C.target.checked;de(Q),F&&F(C,Q)};let B=u;A&&typeof B=="undefined"&&(B=A.disabled);const Ie=y==="checkbox"||y==="radio",L=R({},t,{checked:J,disabled:B,disableFocusRipple:i,edge:_}),q=Ve(L);return k(Ye,R({component:"span",className:re(q.root,p),centerRipple:!0,focusRipple:!i,disabled:B,tabIndex:null,role:void 0,onFocus:he,onBlur:fe,ownerState:L,ref:a},ue,{children:[n(Je,R({autoFocus:r,checked:s,defaultChecked:d,className:q.input,disabled:B,id:Ie&&T,name:M,onChange:pe,readOnly:g,ref:b,required:O,ownerState:L,tabIndex:v,type:y},y==="checkbox"&&N===void 0?{}:{value:N},U)),J?o:I]}))});var Qe=qe,Xe=K(n("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Ze=K(n("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),et=K(n("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function tt(e){return Z("MuiCheckbox",e)}const at=ee("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]);var w=at;const rt=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],st=e=>{const{classes:t,indeterminate:a,color:r}=e,s={root:["root",a&&"indeterminate",`color${z(r)}`]},o=ae(s,tt,t);return R({},t,o)},nt=$(Qe,{shouldForwardProp:e=>Te(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.indeterminate&&t.indeterminate,a.color!=="default"&&t[`color${z(a.color)}`]]}})(({theme:e,ownerState:t})=>R({color:(e.vars||e).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${t.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Ce(t.color==="default"?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${w.checked}, &.${w.indeterminate}`]:{color:(e.vars||e).palette[t.color].main},[`&.${w.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),ot=n(Ze,{}),lt=n(Xe,{}),ct=n(et,{}),it=S.exports.forwardRef(function(t,a){var r,s;const o=Re({props:t,name:"MuiCheckbox"}),{checkedIcon:p=ot,color:d="primary",icon:u=lt,indeterminate:i=!1,indeterminateIcon:_=ct,inputProps:I,size:T="medium",className:U}=o,b=te(o,rt),M=i?_:u,P=i?_:p,F=R({},o,{color:d,indeterminate:i,size:T}),m=st(F);return n(nt,R({type:"checkbox",inputProps:R({"data-indeterminate":i},I),icon:S.exports.cloneElement(M,{fontSize:(r=M.props.fontSize)!=null?r:T}),checkedIcon:S.exports.cloneElement(P,{fontSize:(s=P.props.fontSize)!=null?s:T}),ownerState:F,ref:a,className:re(m.root,U)},b,{classes:m}))});var ut=it,V={},dt=ne.exports;Object.defineProperty(V,"__esModule",{value:!0});var ce=V.default=void 0,ht=dt(se),ft=oe,pt=(0,ht.default)((0,ft.jsx)("path",{d:"M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"}),"FilterAlt");ce=V.default=pt;var Y={},It=ne.exports;Object.defineProperty(Y,"__esModule",{value:!0});var ie=Y.default=void 0,Ot=It(se),St=oe,Tt=(0,Ot.default)((0,St.jsx)("path",{d:"M19.79 5.61C20.3 4.95 19.83 4 19 4H6.83l7.97 7.97 4.99-6.36zM2.81 2.81 1.39 4.22 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.17l5.78 5.78 1.41-1.41L2.81 2.81z"}),"FilterAltOff");ie=Y.default=Tt;function Ct(e){return(e!=null?e:[E.FRONT,E.MIDDLE,E.BACK]).map(t=>({filterKey:t,name:Ae(t)}))}function Rt(e){return(e!=null?e:Object.keys(H)).map(t=>({filterKey:t,name:H[t].name}))}function Et(e){return(e!=null?e:[l.JUPITER_INDUSTRIES,l.NOMA_SHIPPING_GROUP,l.ANTONIOS_CONSORTIUM,l.DAWN_ACCORD,l.HAYREDDIN_CLAN,l.THUNDERBOLT_GROUP]).map(t=>({filterKey:t,name:be(t)}))}function _t(e){return(e!=null?e:[c.CITY_TRADE,c.DOCK_EFFECT,c.SALVAGE]).map(t=>({filterKey:t,name:ve(t)}))}function mt(e){return(e!=null?e:[h.JUPITER_INDUSTRIES,h.NOMA_SHIPPING_GROUP,h.ANTONIOS_CONSORTIUM,h.DAWN_ACCORD]).map(t=>({filterKey:t,name:x("label.researchManufacturerOption",{manufacturer:Pe(t)})}))}function Nt(e){return(e!=null?e:[f.OUTSTANDING_FIREPOWER,f.SUSTAINED_COMBAT,f.STRATEGY_AND_SUPPORT,f.FIGHTER_AND_CORVETTE]).map(t=>({filterKey:t,name:x("label.researchStrategyTypeOption",{strategyType:ye(t)})}))}function At(e){return(e!=null?e:[D.PROJECTILE_WEAPONS,D.DIRECT_FIRE_WEAPONS]).map(t=>({filterKey:t,name:x("label.researchTacticTypeOption",{tacticType:Fe(t)})}))}function bt(e={}){var t,a,r,s,o,p,d;return[...Ct((t=e.shipRows)!=null?t:null),...Rt((a=e.shipTypes)!=null?a:null),...Et((r=e.manufacturer)!=null?r:null),...e.researchManufacturer===!1?[]:mt((s=e.researchManufacturer)!=null?s:null),...e.researchTacticTypes===!1?[]:At((o=e.researchTacticTypes)!=null?o:null),...e.researchStrategyTypes===!1?[]:Nt((p=e.researchStrategyTypes)!=null?p:null),..._t((d=e.shipSources)!=null?d:null)]}function Lt(){return{[E.FRONT]:!1,[E.MIDDLE]:!1,[E.BACK]:!1,...Object.keys(H).reduce((e,t)=>({...e,[t]:!1}),{}),[l.JUPITER_INDUSTRIES]:!1,[l.NOMA_SHIPPING_GROUP]:!1,[l.ANTONIOS_CONSORTIUM]:!1,[l.DAWN_ACCORD]:!1,[l.HAYREDDIN_CLAN]:!1,[l.THUNDERBOLT_GROUP]:!1,[h.JUPITER_INDUSTRIES]:!1,[h.NOMA_SHIPPING_GROUP]:!1,[h.ANTONIOS_CONSORTIUM]:!1,[h.DAWN_ACCORD]:!1,[D.PROJECTILE_WEAPONS]:!1,[D.DIRECT_FIRE_WEAPONS]:!1,[f.OUTSTANDING_FIREPOWER]:!1,[f.SUSTAINED_COMBAT]:!1,[f.STRATEGY_AND_SUPPORT]:!1,[f.FIGHTER_AND_CORVETTE]:!1,[c.TECH_FILE]:!1,[c.CITY_TRADE]:!1,[c.DOCK_EFFECT]:!1,[c.SALVAGE]:!1,[c.STARTER_SHIP]:!1}}function Pt(e){const t={...e};return Object.keys(t).forEach(a=>{t[a]=!1}),t}function wt(e,t){let a=e;return Ft(t)&&(a=a.filter(r=>t[r.row]===!0)),yt(t)&&(a=a.filter(r=>t[r.type]===!0)),kt(t)&&(a=a.filter(r=>t[r.manufacturer]===!0)),xt(t)&&(a=a.filter(r=>r.researchManufacturer&&t[r.researchManufacturer]===!0)),Dt(t)&&(a=a.filter(r=>{var s;return((s=r.researchStrategyTypes)!=null?s:[]).some(o=>t[o]===!0)})),Ut(t)&&(a=a.filter(r=>{var s;return((s=r.researchTacticTypes)!=null?s:[]).some(o=>t[o]===!0)})),vt(t)&&(a=a.filter(r=>t[r.source]===!0)),a}function Wt(e){const t={[c.STARTER_SHIP]:[],[c.TECH_FILE]:[],[c.CITY_TRADE]:[],[c.DOCK_EFFECT]:[],[c.SALVAGE]:[],[c.UNKNOWN]:[]};return e.forEach(a=>{t[a.source].push(a)}),t}function Ft(e){return[E.FRONT,E.MIDDLE,E.BACK].some(t=>e[t]===!0)}function yt(e){return Object.keys(H).some(t=>e[t]===!0)}function vt(e){return Object.keys(Ne).some(t=>e[t]===!0)}function kt(e){return[l.JUPITER_INDUSTRIES,l.NOMA_SHIPPING_GROUP,l.ANTONIOS_CONSORTIUM,l.DAWN_ACCORD,l.HAYREDDIN_CLAN,l.THUNDERBOLT_GROUP].some(t=>e[t]===!0)}function xt(e){return[h.JUPITER_INDUSTRIES,h.NOMA_SHIPPING_GROUP,h.ANTONIOS_CONSORTIUM,h.DAWN_ACCORD].some(t=>e[t]===!0)}function Dt(e){return[f.OUTSTANDING_FIREPOWER,f.SUSTAINED_COMBAT,f.STRATEGY_AND_SUPPORT,f.FIGHTER_AND_CORVETTE].some(t=>e[t]===!0)}function Ut(e){return[D.PROJECTILE_WEAPONS,D.DIRECT_FIRE_WEAPONS].some(t=>e[t]===!0)}function $t(e,t){return e.filter(a=>{var r;return((r=t[a.id])==null?void 0:r.possession)===W.POSSESSED})}function zt(e,t){return e.filter(a=>{var r;return Ee(a,t).length>0?!0:((r=t.ships[a.id])==null?void 0:r.wish)===j.WANTED})}function Kt(e,t){return e.filter(a=>{var r;return le(a.id)&&((r=t[a.id])==null?void 0:r.wish)===j.NOT_WANTED})}function jt(e,t){return e.filter(s=>s.source===c.TECH_FILE||s.source===c.STARTER_SHIP).filter(s=>{var o;return((o=t.ships[s.id])==null?void 0:o.possession)===W.POSSESSED}).filter(s=>{var o,p,d;if(!!s.modules&&_e(s,t).length>0||s.baseModelId)return!1;if(!!s.subModelIds||!!s.baseModelId){const u=(d=(p=s.subModelIds)!=null?p:(o=me(s.baseModelId))==null?void 0:o.subModelIds)!=null?d:[];return Mt(u,t.ships)?!(u.filter(I=>le(I)&&!!t.ships[I]&&t.ships[I].possession!==W.POSSESSED).filter(I=>t.ships[I].wish!==j.NOT_WANTED).length>0):!1}return!0})}function Mt(e,t){return e.length>0&&e.every(a=>{var r;return!!((r=t[a])!=null&&r.possession)})}const Vt=e=>{const{onChange:t,popperProps:a,shipRows:r,shipTypes:s,researchManufacturer:o,researchStrategyTypes:p,researchTacticTypes:d,buttonProps:u}=e,[i,_]=S.exports.useState(e.filter),[I,T]=S.exports.useState(!1),[U]=S.exports.useState(()=>bt({shipRows:r,shipTypes:s,researchManufacturer:o,researchStrategyTypes:p,researchTacticTypes:d})),b=S.exports.useRef(null),[M,P]=S.exports.useTransition(),F=O=>{_(v=>({...v,[O]:!v[O]}))},m=()=>{_(O=>Pt(O))};S.exports.useEffect(()=>{P(()=>{t(i)})},[i,t]);const g=Object.values(i).some(O=>O);return k(ke,{children:[k(Me,{variant:"outlined",ref:b,fullWidth:u==null?void 0:u.fullWidth,size:u==null?void 0:u.size,children:[n(G,{startIcon:n(ce,{}),onClick:()=>T(!0),sx:{flexShrink:1},children:x("button.filter")}),g&&n(G,{size:"small",onClick:m,sx:{flexShrink:3},children:n(ie,{})})]},"filter"),n(Le,{open:I,anchorEl:b.current,role:void 0,transition:!0,disablePortal:!0,style:{zIndex:1},...a,children:({TransitionProps:O,placement:v})=>{var y;return n(we,{...O,style:{transformOrigin:v==="bottom"?"center top":"center bottom"},children:n("div",{children:n(Be,{onClickAway:()=>T(!1),children:k(xe,{children:[n(X,{component:"div",sx:{overflowY:"auto",maxHeight:`${((y=ge(b.current))!=null?y:0)-50}px`},children:n(We,{id:"split-button-menu",children:U.map(N=>k($e,{selected:i[N.filterKey],onClick:()=>F(N.filterKey),children:[n(Ge,{children:n(ut,{edge:"start",checked:i[N.filterKey],tabIndex:-1,disableRipple:!0})}),n(ze,{children:N.name})]},N.filterKey))})}),n(De,{}),n(X,{component:"div",p:1,display:"flex",justifyContent:"end",children:k(Ue,{spacing:1,direction:"row",children:[n(G,{variant:"outlined",onClick:m,disabled:!g,children:x("button.unselectAll")}),n(G,{variant:"outlined",onClick:()=>T(!1),children:x("button.close")})]})})]})})})})}})]})};export{ut as C,Vt as S,wt as a,zt as b,Lt as c,Kt as d,$t as e,jt as f,Qe as g,Wt as s};