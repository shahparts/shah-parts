(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[169],{64518:function(e,a,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/update-product/[id]",function(){return l(29766)}])},38293:function(e,a,l){"use strict";l.d(a,{C:function(){return ButtonComp}});var s=l(85893),t=l(65400),r=l.n(t),n=l(87893),i=l.n(n);let ButtonComp=e=>{let{text:a,type:l,onClick:t,disabled:n,loading:o}=e;return(0,s.jsx)(r(),{className:i().ButtonComp,htmlType:l,onClick:t,disabled:n,loading:o,children:a})}},13310:function(e,a,l){"use strict";var s=l(85893),t=l(67294),r=l(82803),n=l.n(r),i=l(11187),o=l(28465),d=l(47550),c=l(35855),u=l(25675),h=l.n(u),m=l(63222);let{Dragger:x}=o.default;a.Z=e=>{let{updateFiles:a,value:l,noMultiple:r}=e,[o,u]=(0,t.useState)([]),[p,g]=(0,t.useState)(!1);(0,t.useEffect)(()=>{(null==l?void 0:l.length)>0&&u(l)},[l]);let handleDelete=e=>{let l=o.filter((a,l)=>l!==e);u(l),a(l)};return(0,s.jsxs)("div",{children:[(0,s.jsx)(x,{maxCount:r?1:10,name:"file",multiple:!0,action:"".concat("https://www.shahparts.com/api","/files/upload"),onChange:async e=>{var l,s;g(!0);let{status:t}=e.file;await (null===(l=e.fileList)||void 0===l?void 0:l.map(e=>{var a;return null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.url}));let n=null===(s=e.fileList)||void 0===s?void 0:s.map(e=>{var a;return null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.url});"uploading"!==t&&g(!1),"done"===t?(r?(a([n[0]]),u([n[0]])):(null==o?void 0:o.length)>0?(a([...o,n[(null==n?void 0:n.length)-1]]),u([...o,n[(null==n?void 0:n.length)-1]])):(a([n[0]]),u([n[0]])),i.ZP.success("".concat(e.file.name," file uploaded successfully."))):"error"===t&&i.ZP.error("".concat(e.file.name," file upload failed."))},onDrop(e){console.log("Dropped files",e.dataTransfer.files)},className:n().dragger,showUploadList:!1,previewFile:!1,children:(0,s.jsxs)("div",{className:"flex justify-center gap-3",children:[(0,s.jsx)(c.Z,{}),(0,s.jsxs)("div",{className:"text-[14px] font-[600] flex items-center justify-center w-auto gap-1",children:[(0,s.jsx)("div",{className:"text-[#1796E3]",children:"Click to upload pictures"}),(0,s.jsx)("div",{children:"or drag and drop"})]})]})}),(0,s.jsxs)("div",{className:"flex gap-4 flex-wrap items-center mt-4",children:[(null==o?void 0:o.length)>0&&(null==o?void 0:o.map((e,a)=>(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"text-end",children:(0,s.jsx)(d.Z,{onClick:()=>handleDelete(a)})}),(0,s.jsx)(h(),{src:e,alt:"File",className:n().image,width:64,height:64})]},a))),p&&(0,s.jsx)("div",{className:"flex justify-center items-center h-[64px] w-[64px] border",children:(0,s.jsx)(m.Z,{})})]})]})}},63222:function(e,a,l){"use strict";l.d(a,{Z:function(){return Loading_Loading}});var s=l(85893),t=l(25675),r=l.n(t);l(67294);var n={src:"/_next/static/media/loading.5fd12965.gif",height:200,width:200,blurWidth:0,blurHeight:0},Loading_Loading=()=>(0,s.jsx)("div",{className:"flex justify-center items-center",children:(0,s.jsx)("div",{className:"w-[60px]",children:(0,s.jsx)(r(),{src:n,alt:"Spinning Tom Nook Loading Icon",width:100,height:100})})})},80979:function(e,a,l){"use strict";l.d(a,{Z:function(){return Admin_AdminLayout}});var s=l(85893),t=l(80912),r=l(63222),n=l(5789),i=l(55673),o=l(11163),d=l(67294),c=l(41664),u=l.n(c),h=l(5005),m=l(78390),x=l(53598),p=l(606),g=l(73771),v=l.n(g),Admin_AdminSidebar=()=>{let e=(0,o.useRouter)();return(0,s.jsx)("div",{className:v().AdminSidebar,children:(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:v().linkContainer,children:[(0,s.jsx)("div",{className:v().linkWrapper,children:(0,s.jsx)(u(),{href:"/admin/dashboard",children:(0,s.jsxs)("button",{className:"".concat("/admin/dashboard"===e.pathname?v().activeLink:v().inactiveLink),children:[(0,s.jsx)(h.Z,{}),(0,s.jsx)("span",{children:"Dashboard"})]})})}),(0,s.jsx)("div",{className:v().linkWrapper,children:(0,s.jsx)(u(),{href:"/admin/products",children:(0,s.jsxs)("button",{className:"".concat("/admin/products"===e.pathname?v().activeLink:v().inactiveLink),children:[(0,s.jsx)(p.Z,{}),(0,s.jsx)("span",{children:"Products"})]})})}),(0,s.jsx)("div",{className:v().linkWrapper,children:(0,s.jsx)(u(),{href:"/admin/orders",children:(0,s.jsxs)("button",{className:"".concat("/admin/orders"===e.pathname?v().activeLink:v().inactiveLink),children:[(0,s.jsx)(x.Z,{}),(0,s.jsx)("span",{children:"Orders"})]})})})]}),(0,s.jsx)("div",{className:v().logoutWrapper,children:(0,s.jsxs)("a",{href:"/login",onClick:t.kS,className:v().logoutButton,children:[(0,s.jsx)("span",{className:v().logoutText,children:"Logout"}),(0,s.jsx)(m.Z,{})]})})]})})},Admin_AdminLayout=e=>{let a=(0,o.useRouter)(),[l,c]=(0,d.useState)(!0),[u,h]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{(0,t.$8)()&&1===(0,t.$8)().role||a.push("/login"),c(!1)},[]),l?(0,s.jsx)(r.Z,{}):(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"xxl:container mx-auto AdminLayout bg-[#F5F8FB] ".concat(u&&"blackMask"),children:e.sidebar?(0,s.jsxs)(i.Z,{className:"block md:flex mt-0",children:[(0,s.jsx)(n.Z,{xs:24,lg:4,className:"hidden lg:block AdminSidebar",children:(0,s.jsx)(Admin_AdminSidebar,{})}),(0,s.jsx)(n.Z,{xs:24,lg:20,className:"md:bg-[#F5F8FB]",children:(0,s.jsx)("div",{className:"md:p-5",children:(0,s.jsx)("div",{className:"mx-2",children:e.children})})})]}):e.children})})}},29766:function(e,a,l){"use strict";l.r(a);var s=l(85893),t=l(51024),r=l(64749),n=l(67294),i=l(86994);l(37676);var o=l(5121),d=l(80979),c=l(86978),u=l(41664),h=l.n(u),m=l(13310),x=l(11163),p=l(38293),g=l(63222);a.default=()=>{var e;let a=(0,x.useRouter)(),l=null==a?void 0:null===(e=a.query)||void 0===e?void 0:e.id,[u,v]=(0,n.useState)(!1),[j,f]=(0,n.useState)({Title:"",Price:"",Pictures:"",Description:"",Featured:"",Make:"",Model:"",Part:"",PartAccessorries:"",Location:"",Condition:"",ModelCode:"",RegistrationYear:"",Mileage:"",MissionType:"",EngineModel:"",EngineSize:"",Fuel:"",Drive:"",AutoPartsMaker:"",GenuinePartsNo:"",ChassisNo:"",RefNo:"",GearType:""}),handleChange=(e,a)=>{f({...j,[e]:a})},getProductById=async e=>{v(!0),await o.Z.get("".concat("https://www.shahparts.com/api","/products/product/").concat(e)).then(e=>{v(!1),"OK"===e.statusText?f(e.data):(0,c.hW)(e.data.errorMessage)}).catch(e=>{v(!1),console.log(e),(0,c.hW)(null==e?void 0:e.message)})};return(0,n.useEffect)(()=>(void 0!==l&&getProductById(l),()=>{}),[l]),(0,s.jsx)(d.Z,{sidebar:!0,children:(0,s.jsxs)("div",{className:"Pages pt-6 md:max-w-[60vw]",children:[(0,s.jsx)("div",{className:"flex justify-between items-center",children:(0,s.jsxs)("div",{className:"flex gap-2 justify-center items-center py-4",children:[(0,s.jsx)("span",{children:"Admin"})," ",(0,s.jsx)(i.default,{})," ",(0,s.jsx)("button",{className:"text-[#0094DA]",children:"Update product"})]})}),u?(0,s.jsx)(g.Z,{}):(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault(),v(!0),o.Z.put("".concat("https://www.shahparts.com/api","/products/update/").concat(l),j,{headers:{authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>{v(!1),200===e.status?((0,c.Ik)(e.data.successMessage),a.push("/admin/products")):(0,c.hW)(e.data.errorMessage)}).catch(e=>{v(!1),console.log(e),(0,c.hW)(null==e?void 0:e.message)})},children:[(0,s.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,s.jsx)("div",{children:(0,s.jsx)("h1",{className:"text-[33px] font-bold",children:"Update a Product"})}),(0,s.jsx)("div",{children:(0,s.jsx)(h(),{href:"/admin/products",type:"button",className:"btn-close","aria-label":"Close"})})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Title"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Title,required:!0,type:"text",className:"form-control mb-2",placeholder:"Enter Your Product Title",onChange:e=>handleChange("Title",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Price"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Price,required:!0,type:"number",className:"form-control mb-2",placeholder:"Enter Product's Price",onChange:e=>handleChange("Price",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Description"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Description,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Description",onChange:e=>handleChange("Description",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Featured"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(r.default,{className:"w-full",value:j.Featured,placeholder:"Featured",onChange:e=>handleChange("Featured",e),options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}]})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Make"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Make,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Make",onChange:e=>handleChange("Make",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Model"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Model,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Model",onChange:e=>handleChange("Model",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Part"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Part,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Part",onChange:e=>handleChange("Part",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Part Accessories"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.PartAccessorries,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Part Accessories",onChange:e=>handleChange("PartAccessorries",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Location"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Location,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Location",onChange:e=>handleChange("Location",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Condition"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Condition,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Condition",onChange:e=>handleChange("Condition",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Model Code"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.ModelCode,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Model Code",onChange:e=>handleChange("ModelCode",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Registration Year/Month"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.RegistrationYear,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Registration Year/Month",onChange:e=>handleChange("RegistrationYear",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Mileage"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Mileage,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Mileage",onChange:e=>handleChange("Mileage",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Mission Type"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.MissionType,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Mission Type",onChange:e=>handleChange("MissionType",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Engine Model"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.EngineModel,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Engine Model",onChange:e=>handleChange("EngineModel",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Engine Size"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.EngineSize,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Engine Size",onChange:e=>handleChange("EngineSize",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Fuel"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Fuel,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Fuel",onChange:e=>handleChange("Fuel",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Drive"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.Drive,type:"text",className:"form-control mb-2",placeholder:"Enter Product's DoDrive",onChange:e=>handleChange("Drive",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Auto Parts MaMaker"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.AutoPartsMaker,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Auto Parts MaMaker",onChange:e=>handleChange("AutoPartsMaker",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Genuine Parts Number"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.GenuinePartsNo,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Genuine Parts Number",onChange:e=>handleChange("GenuinePartsNo",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Chassis Number"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.ChassisNo,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Chassis Number",onChange:e=>handleChange("ChassisNo",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Reference Number"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.RefNo,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Reference Number",onChange:e=>handleChange("RefNo",e.target.value)})]}),(0,s.jsxs)("div",{className:"form-group mt-4",children:[(0,s.jsx)("label",{children:"Gear Type"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(t.default,{value:null==j?void 0:j.GearType,type:"text",className:"form-control mb-2",placeholder:"Enter Product's Gear Type",onChange:e=>handleChange("GearType",e.target.value)})]}),(0,s.jsxs)("div",{className:"my-3",children:[(0,s.jsx)("label",{children:"Pictures"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(m.Z,{value:null==j?void 0:j.Pictures,updateFiles:e=>handleChange("Pictures",e)})]}),(0,s.jsx)("div",{className:"mt-5",children:(0,s.jsx)(p.C,{type:"primary",htmlType:"submit",loading:u,disabled:u,text:"Submit"})})]})]})})}},37676:function(){},87893:function(e){e.exports={ButtonComp:"ButtonComp_ButtonComp__irX7_"}},82803:function(e){e.exports={dragger:"Dragger_dragger__u1SrF"}},73771:function(e){e.exports={AdminSidebar:"AdminSidebar_AdminSidebar__6eFiO",linkContainer:"AdminSidebar_linkContainer__8QIYH",linkWrapper:"AdminSidebar_linkWrapper__4rIoI",activeLink:"AdminSidebar_activeLink__ocl97",inactiveLink:"AdminSidebar_inactiveLink__ZRV86",logoutWrapper:"AdminSidebar_logoutWrapper__loysx",logoutButton:"AdminSidebar_logoutButton__Ih4Gk",logoutText:"AdminSidebar_logoutText__ug7Ml"}}},function(e){e.O(0,[4055,2055,117,6457,9774,2888,179],function(){return e(e.s=64518)}),_N_E=e.O()}]);