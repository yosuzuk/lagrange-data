import{t as i,k as n,j as m,F as f,B as e}from"./index.afc0fdd1.js";import{R as C}from"./ResponsiveDialog.94d217b4.js";import{D as d}from"./DialogContentText.adcc5093.js";const g=a=>{const{title:r,question:o,cancelText:c=i("button.cancel"),confirmText:s=i("button.confirm"),onCancel:t,onConfirm:l}=a;return n(C,{title:r,content:typeof o=="string"?n(d,{children:o}):o,actions:m(f,{children:[n(e,{variant:"outlined",onClick:t,children:c}),n(e,{variant:"contained",onClick:l,children:s})]}),onClose:t})};export{g as C};
