import{Q as l,R as c,U as p,k as a,F as i,B as d,ax as u,t as h,bC as v,A as f,r as m,j as g,v as D,ab as x,bD as B,bE as S,T as k}from"./index.d9a9316b.js";import{N as I,P}from"./PageContent.e531b5b1.js";import{A as _}from"./ActionBar.a587221c.js";import{P as b}from"./PageFooter.b3f3b6fd.js";import"./MenuItem.c4f628ab.js";var t={},j=c.exports;Object.defineProperty(t,"__esModule",{value:!0});var s=t.default=void 0,A=j(l),C=p,R=(0,A.default)((0,C.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");s=t.default=R;const y=()=>a(_,{left:e=>a(i,{children:a(d,{variant:"outlined",startIcon:a(s,{}),component:u,to:"/shipData",fullWidth:e.fullWidth,size:e.size,children:h("shipData.pageTitle")},"share")})}),T=()=>{const{shipId:e}=v(),r=f(),o=m.exports.useCallback(n=>{r(`/shipData/${n}`)},[r]);return g(i,{children:[a(I,{currentRoute:"/shipData"}),a(y,{}),a(P,{children:a(D,{component:"div",p:1,children:a(x,{children:e&&B(e)?a(S,{shipId:e,onClickShip:o}):a(k,{variant:"body1",children:"Invalid ID"})})})}),a(b,{})]})};export{T as ShipDetailPage,T as default};