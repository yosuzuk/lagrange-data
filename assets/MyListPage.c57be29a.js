import{c as q,i as U,r as P,t as o,a as D,S as g,b as R,d as b,s as $,g as F,e as V,f as N,h as M,j as d,k as j,l as z,o as W,m as H,n as u,F as f,p as e,q as G,u as T,B as C,T as p,v as k,w,x as K,y as J,z as Q,A as X}from"./index.4800e8f9.js";import{d as Y}from"./Settings.7423b0e6.js";import{e as E,S as Z,c as ee,a as te,b as ie,d as ae,f as ne}from"./ShipTypeFilterButton.a2bdf86f.js";import{A as se}from"./ActionBar.df46aebd.js";import{C as oe,S as re,c as le}from"./ShipDataTable.5186f233.js";import{d as ce,a as O}from"./ContentCopy.d8f4246e.js";import{d as pe,C as de}from"./ConfirmationDialog.a66a3f21.js";import{B as ue}from"./ButtonMenu.0937d27b.js";import{n as he}from"./sorting.c6946657.js";import{A as me,T as ye}from"./TextField.1dee9297.js";import{E as fe}from"./ExpandStack.ee0910d5.js";import{R as ge}from"./ResponsiveDialog.e444eb03.js";import{N as Se,P as Ce}from"./PageContent.93cd01f8.js";import{P as xe}from"./PageFooter.bd5749c1.js";import"./domUtils.191888ae.js";import"./useFormControl.b562c3e5.js";import"./useTable.8717d658.js";import"./TableRow.cff10942.js";import"./DialogContentText.f2337ab5.js";import"./Select.c4915843.js";var B={},be=U.exports;Object.defineProperty(B,"__esModule",{value:!0});var I=B.default=void 0,ve=be(q),Fe=P,Te=(0,ve.default)((0,Fe.jsx)("path",{d:"M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H15v-8h5V8l-6-6zm-1 7V3.5L18.5 9H13zm4 12.66V16h5.66v2h-2.24l2.95 2.95-1.41 1.41L19 19.41v2.24h-2z"}),"FileOpen");I=B.default=Te;function _(r,t){const s=[],i=[],n=[],h=[],c=[];r.forEach(a=>{switch(a.row){case g.FRONT:{s.push(a);break}case g.MIDDLE:{i.push(a);break}case g.BACK:{n.push(a);break}default:switch(a.type){case b.CORVETTE:{h.push(a);break}case b.FIGHTER:{c.push(a);break}}}});const l=he([(a,m)=>$(a.type,a.subType)-$(m.type,m.subType),(a,m)=>F(a).localeCompare(F(m),V())]);return[o("label.acquiredShipsAndBlueprints"),[o("myList.groupNameForSharing",{name:D(g.FRONT)}),...s.sort(l).map(a=>S(a,t))].join(`
`),[o("myList.groupNameForSharing",{name:D(g.MIDDLE)}),...i.sort(l).map(a=>S(a,t))].join(`
`),[o("myList.groupNameForSharing",{name:D(g.BACK)}),...n.sort(l).map(a=>S(a,t))].join(`
`),[o("myList.groupNameForSharing",{name:R(b.CORVETTE)}),...h.sort(l).map(a=>S(a,t))].join(`
`),[o("myList.groupNameForSharing",{name:R(b.FIGHTER)}),...c.sort(l).map(a=>S(a,t))].join(`
`)].join(`

`)}function S(r,t){const s=N(r,t);return s.length===0?`\u3000${F(r)}`:[`\u3000${F(r)}`,s.map(i=>`\u3000\u2517 ${i.category}${i.categoryNumber} ${M(r.id,i)}`).join(`
`)].join(`
`)}const we=r=>{const{onCopyAsText:t,buttonProps:s}=r,[i,n]=d.exports.useState(null),h=d.exports.useMemo(()=>{if(!i)return null;const a=E(j,i.ships);return _(a,i)},[i]),c=d.exports.useCallback(a=>{switch(a){case"copyAsText":{t();break}case"import":{(async()=>{const m=await W();m&&n(m)})();break}case"export":{z();break}}},[]),l=d.exports.useCallback(()=>{i&&(H(i),n(null),window.location.reload())},[i]);return u(f,{children:[e(ue,{icon:e(ce,{}),text:o("button.share"),value:void 0,buttonProps:s,onClick:c,options:[{key:"copyAsText",icon:e(O,{}),text:o("myList.copyAsText"),value:"copyAsText"},{key:"export",icon:e(pe,{}),text:o("myList.exportToFile"),value:"export"},{key:"import",icon:e(I,{}),text:o("myList.importFromFile"),value:"import",disabled:!G()}]}),i&&e(de,{title:o("myList.importConfirmTitle"),question:u(T,{children:[e(me,{severity:"warning",children:o("myList.importConfirmWarning")}),e(C,{p:1,children:e(p,{variant:"body2",component:"div",children:e("pre",{children:h})})})]}),onConfirm:l,onCancel:()=>n(null)})]})},Le=r=>{const{shipFilter:t,columnConfig:s,onEdit:i,onFilter:n,onCopyAsText:h,onColumnConfigChange:c}=r;return e(se,{left:l=>u(f,{children:[e(oe,{columnConfig:s,onChange:c,disableResearchAgreementOptions:!0,buttonProps:l},"columnConfig"),e(Z,{filter:t,onChange:n,researchManufacturer:!1,researchStrategyTypes:!1,researchTacticTypes:!1,buttonProps:l},"filter"),e(k,{variant:"outlined",startIcon:e(Y,{}),onClick:i,...l,children:o("myList.editMyList")},"edit")]}),right:l=>e(f,{children:e(we,{onCopyAsText:h,buttonProps:l})})})},De=r=>{const{ship:t}=r,{userSettings:s}=w(),i=d.exports.useMemo(()=>N(t,s),[t,s]);return i.length===0?null:e(C,{mt:.5,children:i.map(n=>u(p,{variant:"body2",color:"text.secondary",children:[e(p,{variant:"body2",component:"span",color:"text.secondary",sx:{opacity:.5},children:"\u2517 "}),`${n.category}${n.categoryNumber} ${M(t.id,n)}`]},n.id))})},ke=r=>{const{ship:t}=r,{userSettings:s}=w(),i=d.exports.useMemo(()=>K(t,s),[t,s]);return i.length===0?null:e(C,{mt:.5,children:i.map(n=>u(p,{variant:"body2",color:"text.secondary",children:[e(p,{variant:"body2",component:"span",color:"text.secondary",sx:{opacity:.5},children:"\u2517 "}),`${n.category}${n.categoryNumber} ${M(t.id,n)}`]},n.id))})},v=d.exports.memo(re),Me=r=>{const{shipListState:t,columnConfig:s}=r;return u(T,{spacing:1,children:[e(fe,{expandables:[{id:"possessed-ships",initiallyOpened:!0,summary:e(p,{variant:"body1",children:o("label.acquiredShipsAndBlueprints")}),details:e(v,{shipDefinitions:t.possessed,columnConfig:s,decorateName:(i,n)=>u(f,{children:[i,e(De,{ship:n})]})})},{id:"wished-ships",initiallyOpened:!1,summary:e(p,{variant:"body1",children:o("label.wantedBlueprints")}),details:e(v,{shipDefinitions:t.wished,columnConfig:s,decorateName:(i,n)=>u(f,{children:[i,e(ke,{ship:n})]})})},{id:"unwished-by-user-ships",initiallyOpened:!1,summary:e(p,{variant:"body1",children:o("label.unwantedBlueprints")}),details:e(v,{shipDefinitions:t.unwishedByUser,columnConfig:s})},{id:"unwished-by-data-ships",initiallyOpened:!1,summary:e(p,{variant:"body1",children:o("myList.unwantedDuplicates")}),details:u(f,{children:[e(v,{shipDefinitions:t.unwishedByData,columnConfig:s}),e(C,{pt:1,children:e(p,{variant:"caption",align:"right",paragraph:!0,children:o("myList.unwantedDuplicatesFootnote")})})]})}]}),e(p,{variant:"caption",align:"right",paragraph:!0,children:o("myList.pageFootnote")})]})},Be=r=>{const{ships:t,onClose:s}=r,[i,n]=d.exports.useState(!1),{userSettings:h}=w(),[c,l]=d.exports.useState(()=>_(t.possessed,h)),a=()=>{c&&Q(c).then(()=>{n(!0)})},m=L=>{l(L.target.value)},x=()=>{s(),n(!1)};return e(ge,{title:o("button.share"),content:u(T,{spacing:1,children:[e(ye,{variant:"filled",id:"outlined-multiline-static",multiline:!0,onChange:m,rows:10,defaultValue:c,fullWidth:!0}),!!navigator.clipboard&&e(k,{variant:"outlined",startIcon:i?e(J,{}):e(O,{}),onClick:a,fullWidth:!0,children:o("button.copyToClipboard")})]}),actions:e(k,{variant:"outlined",onClick:x,children:o("button.close")}),onClose:x})},Xe=()=>{const r=X(),{userSettings:t}=w(),[s,i]=d.exports.useState(ee),[n,h]=d.exports.useState(null),[c,l]=d.exports.useState(()=>le({name:!0,row:!0,type:!0,cost:!1,operationLimit:!1})),a=d.exports.useMemo(()=>{const y=te(j,s);return{possessed:E(y,t.ships),wished:ie(y,t),unwishedByUser:ae(y,t.ships),unwishedByData:ne(y,t)}},[t,s]),m=()=>{r("/myList/edit")},x=()=>{h(a)},L=()=>{h(null)},A=Object.values(c).filter(y=>typeof y=="boolean"&&y).length>3;return u(f,{children:[e(Se,{currentRoute:"/myList"}),e(Le,{shipFilter:s,columnConfig:c,onEdit:m,onFilter:i,onCopyAsText:x,onColumnConfigChange:l}),e(Ce,{disableContainer:A,children:u(C,{p:1,children:[u(T,{pt:1,pb:2,spacing:2,children:[e(p,{variant:"body2",children:o("myList.pageDescription1")}),e(p,{variant:"body2",children:o("myList.pageDescription2")}),e(p,{variant:"body2",children:o("myList.pageDescription3")})]}),e(Me,{shipListState:a,columnConfig:c})]})}),n&&e(Be,{ships:n,onClose:L}),e(xe,{disableContainer:A})]})};export{Xe as MyListPage,Xe as default};
