import{r as p,k as o}from"./index.d9a9316b.js";import{u as a,T as l}from"./useTable.3dfc13f3.js";import"./TableRow.8c606294.js";function y(){return[{id:"property1",renderCell:r=>r.property1,renderHeader:()=>"Property1",initialSortDirection:"asc",sortFn:(r,e)=>r.property1.localeCompare(e.property1)},{id:"property2",renderCell:r=>r.property2,renderHeader:()=>"Property2",sortFn:(r,e)=>r.property2-e.property2},{id:"property3",renderCell:r=>r.property3,renderHeader:()=>"Property3",sortFn:(r,e)=>r.property3.localeCompare(e.property3)}]}function n(){return[{id:"data1",property1:"abc",property2:42,property3:"def",property4:"..."},{id:"data2",property1:"def",property2:45,property3:"ghi",property4:"..."},{id:"data3",property1:"ghi",property2:36,property3:"jkl",property4:"..."}]}const d=y(),s=n(),f=()=>{const{table:r,setTableData:e}=a();return p.exports.useEffect(()=>{e({columns:d,data:s,rowIdFn:t=>t.id})},[e]),o(l,{table:r})};export{f as TableExample,f as default};