import{r as p,j as o}from"./vendor.612e55a5.js";import{u as a,T as l}from"./useTable.a69db608.js";import"./sorting.c6946657.js";function n(){return[{id:"property1",renderCell:r=>r.property1,renderHeader:()=>"Property1",initialSortDirection:"asc",sortFn:(r,e)=>r.property1.localeCompare(e.property1)},{id:"property2",renderCell:r=>r.property2,renderHeader:()=>"Property2",sortFn:(r,e)=>r.property2-e.property2},{id:"property3",renderCell:r=>r.property3,renderHeader:()=>"Property3",sortFn:(r,e)=>r.property3.localeCompare(e.property3)}]}function y(){return[{id:"data1",property1:"abc",property2:42,property3:"def",property4:"..."},{id:"data2",property1:"def",property2:45,property3:"ghi",property4:"..."},{id:"data3",property1:"ghi",property2:36,property3:"jkl",property4:"..."}]}const s=n(),d=y(),b=()=>{const{table:r,setTableData:e}=a();return p.exports.useEffect(()=>{e({columns:s,data:d,rowIdFn:t=>t.id})},[e]),o(l,{table:r})};export{b as TableExample,b as default};