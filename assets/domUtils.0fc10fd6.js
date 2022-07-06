import{r as l,a3 as P,ad as W,ae as L,j as $,m as M,n as k,o as I,_ as p,C as N,D as T,q as y,w as z,av as O,x as H,y as c}from"./index.9f9b351b.js";import{g as F}from"./MenuItem.a46a301d.js";import{b as U}from"./PageContent.5249989f.js";function B(o){return o.substring(2).toLowerCase()}function _(o,t){return t.documentElement.clientWidth<o.clientX||t.documentElement.clientHeight<o.clientY}function ot(o){const{children:t,disableReactTree:e=!1,mouseEvent:r="onClick",onClickAway:v,touchEvent:d="onTouchEnd"}=o,s=l.exports.useRef(!1),n=l.exports.useRef(null),u=l.exports.useRef(!1),h=l.exports.useRef(!1);l.exports.useEffect(()=>(setTimeout(()=>{u.current=!0},0),()=>{u.current=!1}),[]);const R=P(t.ref,n),f=W(i=>{const a=h.current;h.current=!1;const g=L(n.current);if(!u.current||!n.current||"clientX"in i&&_(i,g))return;if(s.current){s.current=!1;return}let x;i.composedPath?x=i.composedPath().indexOf(n.current)>-1:x=!g.documentElement.contains(i.target)||n.current.contains(i.target),!x&&(e||!a)&&v(i)}),b=i=>a=>{h.current=!0;const g=t.props[i];g&&g(a)},C={ref:R};return d!==!1&&(C[d]=b(d)),l.exports.useEffect(()=>{if(d!==!1){const i=B(d),a=L(n.current),g=()=>{s.current=!0};return a.addEventListener(i,f),a.addEventListener("touchmove",g),()=>{a.removeEventListener(i,f),a.removeEventListener("touchmove",g)}}},[f,d]),r!==!1&&(C[r]=b(r)),l.exports.useEffect(()=>{if(r!==!1){const i=B(r),a=L(n.current);return a.addEventListener(i,f),()=>{a.removeEventListener(i,f)}}},[f,r]),$(l.exports.Fragment,{children:l.exports.cloneElement(t,C)})}function D(o){return M("MuiButtonGroup",o)}const V=k("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","fullWidth","vertical","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary"]);var m=V;const j=["children","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"],A=(o,t)=>{const{ownerState:e}=o;return[{[`& .${m.grouped}`]:t.grouped},{[`& .${m.grouped}`]:t[`grouped${c(e.orientation)}`]},{[`& .${m.grouped}`]:t[`grouped${c(e.variant)}`]},{[`& .${m.grouped}`]:t[`grouped${c(e.variant)}${c(e.orientation)}`]},{[`& .${m.grouped}`]:t[`grouped${c(e.variant)}${c(e.color)}`]},t.root,t[e.variant],e.disableElevation===!0&&t.disableElevation,e.fullWidth&&t.fullWidth,e.orientation==="vertical"&&t.vertical]},X=o=>{const{classes:t,color:e,disabled:r,disableElevation:v,fullWidth:d,orientation:s,variant:n}=o,u={root:["root",n,s==="vertical"&&"vertical",d&&"fullWidth",v&&"disableElevation"],grouped:["grouped",`grouped${c(s)}`,`grouped${c(n)}`,`grouped${c(n)}${c(s)}`,`grouped${c(n)}${c(e)}`,r&&"disabled"]};return z(u,D,t)},q=I("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:A})(({theme:o,ownerState:t})=>p({display:"inline-flex",borderRadius:o.shape.borderRadius},t.variant==="contained"&&{boxShadow:o.shadows[2]},t.disableElevation&&{boxShadow:"none"},t.fullWidth&&{width:"100%"},t.orientation==="vertical"&&{flexDirection:"column"},{[`& .${m.grouped}`]:p({minWidth:40,"&:not(:first-of-type)":p({},t.orientation==="horizontal"&&{borderTopLeftRadius:0,borderBottomLeftRadius:0},t.orientation==="vertical"&&{borderTopRightRadius:0,borderTopLeftRadius:0},t.variant==="outlined"&&t.orientation==="horizontal"&&{marginLeft:-1},t.variant==="outlined"&&t.orientation==="vertical"&&{marginTop:-1}),"&:not(:last-of-type)":p({},t.orientation==="horizontal"&&{borderTopRightRadius:0,borderBottomRightRadius:0},t.orientation==="vertical"&&{borderBottomRightRadius:0,borderBottomLeftRadius:0},t.variant==="text"&&t.orientation==="horizontal"&&{borderRight:`1px solid ${o.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`},t.variant==="text"&&t.orientation==="vertical"&&{borderBottom:`1px solid ${o.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`},t.variant==="text"&&t.color!=="inherit"&&{borderColor:N(o.palette[t.color].main,.5)},t.variant==="outlined"&&t.orientation==="horizontal"&&{borderRightColor:"transparent"},t.variant==="outlined"&&t.orientation==="vertical"&&{borderBottomColor:"transparent"},t.variant==="contained"&&t.orientation==="horizontal"&&{borderRight:`1px solid ${o.palette.grey[400]}`,[`&.${m.disabled}`]:{borderRight:`1px solid ${o.palette.action.disabled}`}},t.variant==="contained"&&t.orientation==="vertical"&&{borderBottom:`1px solid ${o.palette.grey[400]}`,[`&.${m.disabled}`]:{borderBottom:`1px solid ${o.palette.action.disabled}`}},t.variant==="contained"&&t.color!=="inherit"&&{borderColor:o.palette[t.color].dark},{"&:hover":p({},t.variant==="outlined"&&t.orientation==="horizontal"&&{borderRightColor:"currentColor"},t.variant==="outlined"&&t.orientation==="vertical"&&{borderBottomColor:"currentColor"})}),"&:hover":p({},t.variant==="contained"&&{boxShadow:"none"})},t.variant==="contained"&&{boxShadow:"none"})})),Y=l.exports.forwardRef(function(t,e){const r=T({props:t,name:"MuiButtonGroup"}),{children:v,className:d,color:s="primary",component:n="div",disabled:u=!1,disableElevation:h=!1,disableFocusRipple:R=!1,disableRipple:f=!1,fullWidth:b=!1,orientation:C="horizontal",size:i="medium",variant:a="outlined"}=r,g=y(r,j),x=p({},r,{color:s,component:n,disabled:u,disableElevation:h,disableFocusRipple:R,disableRipple:f,fullWidth:b,orientation:C,size:i,variant:a}),E=X(x),G=l.exports.useMemo(()=>({className:E.grouped,color:s,disabled:u,disableElevation:h,disableFocusRipple:R,disableRipple:f,fullWidth:b,size:i,variant:a}),[s,u,h,R,f,b,i,a,E.grouped]);return $(q,p({as:n,role:"group",className:H(E.root,d),ref:e,ownerState:x},g,{children:$(O.Provider,{value:G,children:v})}))});var et=Y;const J=["className"],K=o=>{const{alignItems:t,classes:e}=o;return z({root:["root",t==="flex-start"&&"alignItemsFlexStart"]},F,e)},Q=I("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:e}=o;return[t.root,e.alignItems==="flex-start"&&t.alignItemsFlexStart]}})(({theme:o,ownerState:t})=>p({minWidth:56,color:o.palette.action.active,flexShrink:0,display:"inline-flex"},t.alignItems==="flex-start"&&{marginTop:8})),Z=l.exports.forwardRef(function(t,e){const r=T({props:t,name:"MuiListItemIcon"}),{className:v}=r,d=y(r,J),s=l.exports.useContext(U),n=p({},r,{alignItems:s.alignItems}),u=K(n);return $(Q,p({className:H(u.root,v),ownerState:n,ref:e},d))});var rt=Z;function it(o){var e,r;return o===null?void 0:((r=(e=window.innerHeight)!=null?e:document.documentElement.clientHeight)!=null?r:document.body.clientHeight)-o.getBoundingClientRect().top-o.offsetHeight-20}export{et as B,ot as C,rt as L,it as g};
