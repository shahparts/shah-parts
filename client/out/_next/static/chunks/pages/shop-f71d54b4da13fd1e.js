(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4800],{5789:function(e,t,l){"use strict";t.Z=void 0;var a=l(38614);t.Z=a.Col},55673:function(e,t,l){"use strict";t.Z=void 0;var a=l(38614);t.Z=a.Row},13085:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shop",function(){return l(64379)}])},38293:function(e,t,l){"use strict";l.d(t,{C:function(){return ButtonComp}});var a=l(85893),o=l(65400),s=l.n(o),r=l(87893),i=l.n(r);let ButtonComp=e=>{let{text:t,type:l,onClick:o,disabled:r,loading:n}=e;return(0,a.jsx)(s(),{className:i().ButtonComp,htmlType:l,onClick:o,disabled:r,loading:n,children:t})}},63222:function(e,t,l){"use strict";l.d(t,{Z:function(){return Loading_Loading}});var a=l(85893),o=l(25675),s=l.n(o);l(67294);var r={src:"/_next/static/media/loading.5fd12965.gif",height:200,width:200,blurWidth:0,blurHeight:0},Loading_Loading=()=>(0,a.jsx)("div",{className:"flex justify-center items-center",children:(0,a.jsx)("div",{className:"w-[60px]",children:(0,a.jsx)(s(),{src:r,alt:"Spinning Tom Nook Loading Icon",width:100,height:100})})})},98825:function(e,t,l){"use strict";l.d(t,{I:function(){return ProductCard}});var a=l(85893),o=l(45770),s=l(25675),r=l.n(s),i=l(41664),n=l.n(i),d=l(11163),u=l(38293),c=l(90012),h=l.n(c);let ProductCard=e=>{let{product:t}=e,{addToCart:l}=(0,o.i)(),s=(0,d.useRouter)(),handleAddToCart=async()=>{t.qtyToShop=1,await l(t),s.push("/checkout")};return(0,a.jsxs)("div",{className:h().ProductCard,children:[(0,a.jsx)(n(),{href:"/product/".concat(null==t?void 0:t._id),children:(0,a.jsx)(r(),{width:100,height:100,quality:100,src:null==t?void 0:t.Pictures[0],alt:null==t?void 0:t.Title})}),(0,a.jsx)(u.C,{text:"Add To Cart",onClick:handleAddToCart}),(0,a.jsxs)("div",{className:"pt-2 md:p-3",children:[(0,a.jsx)("h2",{children:null==t?void 0:t.Title}),(0,a.jsxs)("p",{children:["$",null==t?void 0:t.Price]})]})]})}},64379:function(e,t,l){"use strict";l.r(t);var a=l(85893),o=l(86978),s=l(5789),r=l(69843),i=l(55673),n=l(64749),d=l(5121),u=l(11163),c=l(67294),h=l(66796),v=l.n(h),p=l(63222),_=l(98825),f=l(48389);t.default=()=>{let e=(0,u.useRouter)(),{setFilterValuesFun:t}=(0,f.b)(),[l,h]=(0,c.useState)([]),[g,m]=(0,c.useState)("createdAt"),[x,P]=(0,c.useState)([]),[y,S]=(0,c.useState)([]),[j,w]=(0,c.useState)(e.query.Make),[C,N]=(0,c.useState)(e.query.Part),[q,A]=(0,c.useState)(e.query.Model),[k,b]=(0,c.useState)(e.query.PartAccessory),[M,Z]=(0,c.useState)(),[T,B]=(0,c.useState)(!1),[E,L]=(0,c.useState)(),[W,z]=(0,c.useState)(1),getAllData=async()=>{B(!0),await d.Z.post("".concat("https://www.shahparts.com/api","/products/get"),{page:W-1,pageSize:"20",priceRange:M,Make:j,Model:q,Part:C,PartAccessorries:k,sortBy:g}).then(l=>{if(B(!1),200===l.status){var a,s,r,i,n,d,u,c;h(null===(a=l.data)||void 0===a?void 0:a.products),L(l.data.count);let o=l.data.products[0];!(null==e?void 0:null===(s=e.query)||void 0===s?void 0:s.Model)&&(null==e?void 0:null===(r=e.query)||void 0===r?void 0:r.Part)?t(null==o?void 0:o.Make,null==o?void 0:o.Model,null==e?void 0:null===(i=e.query)||void 0===i?void 0:i.Part):t(null==e?void 0:null===(n=e.query)||void 0===n?void 0:n.Make,null==e?void 0:null===(d=e.query)||void 0===d?void 0:d.Model,null==e?void 0:null===(u=e.query)||void 0===u?void 0:u.Part,null==e?void 0:null===(c=e.query)||void 0===c?void 0:c.partAccessory)}else(0,o.hW)(l.data.errorMessage)}).catch(e=>{B(!1),console.log(e)})},getAllParts=async()=>{B(!0),await d.Z.get("".concat("https://www.shahparts.com/api","/products/parts")).then(e=>{if(B(!1),200===e.status){var t;P(null===(t=e.data)||void 0===t?void 0:t.map(e=>({value:null==e?void 0:e.part,label:null==e?void 0:e.part})))}else(0,o.hW)(e.data.errorMessage)}).catch(e=>{B(!1),console.log(e)})},getAllMakes=async()=>{B(!0),await d.Z.get("".concat("https://www.shahparts.com/api","/products/makes")).then(e=>{if(B(!1),200===e.status){var t;S(null===(t=e.data)||void 0===t?void 0:t.map(e=>({value:null==e?void 0:e.make,label:null==e?void 0:e.make})))}else(0,o.hW)(e.data.errorMessage)}).catch(e=>{B(!1),console.log(e)})};return(0,c.useEffect)(()=>{var t,l,a,o;return getAllParts(),getAllMakes(),w(null===(t=e.query)||void 0===t?void 0:t.Make),A(null===(l=e.query)||void 0===l?void 0:l.Model),N(null===(a=e.query)||void 0===a?void 0:a.Part),b(null===(o=e.query)||void 0===o?void 0:o.PartAccessory),()=>{}},[e.asPath]),(0,c.useEffect)(()=>(getAllData(),()=>{}),[W,j,q,k,C,M,g]),console.log(e.query),(0,a.jsxs)("div",{className:v().ShopPage,children:[(0,a.jsxs)("div",{className:v().sortSection,children:[(0,a.jsxs)("div",{className:"flex items-center gap-6",children:[(0,a.jsx)("h4",{className:"mb-0",children:"Products"}),(0,a.jsxs)("p",{className:"w-full",children:[null==l?void 0:l.length," of ",E," items"]})]}),(0,a.jsxs)("div",{className:v().right,children:[(0,a.jsx)("h4",{className:"mb-0",children:"Sort By:"}),(0,a.jsx)(n.default,{className:v().sortSelect,defaultValue:"createdAt",onChange:e=>{m(e)},placeholder:"Sort",options:[{value:"lth",label:"Price: Low to High"},{value:"htl",label:"Price: High to Low"},{value:"a-z",label:"Product Name: A-Z"},{value:"z-a",label:"Product Name: Z-A"},{value:"createdAt",label:"Released Date"}]})]})]}),(0,a.jsx)("div",{className:"mt-4",children:T?(0,a.jsx)(p.Z,{}):(0,a.jsx)(i.Z,{gutter:[23,23],className:"p-4",children:null==l?void 0:l.map((e,t)=>(0,a.jsx)(s.Z,{xs:12,md:8,lg:6,children:(0,a.jsx)(_.I,{product:e})},t))})}),(0,a.jsx)("div",{className:"flex justify-center my-10",children:(0,a.jsx)(r.default,{current:W,defaultPageSize:20,showSizeChanger:!1,onChange:e=>z(e),total:E})})]})}},87893:function(e){e.exports={ButtonComp:"ButtonComp_ButtonComp__irX7_"}},90012:function(e){e.exports={ProductCard:"ProductCard_ProductCard__9rqA7"}},66796:function(e){e.exports={ShopPage:"shop_ShopPage__SFCNH",top:"shop_top__k5euW",title:"shop_title__tQfup",scroll:"shop_scroll__c8fAT",sortSection:"shop_sortSection__YcNWi",right:"shop_right__Zfqmd",sortSelect:"shop_sortSelect__Vofso",filters:"shop_filters__v5onB",filterSection:"shop_filterSection__p9Ebb",select:"shop_select__K8njP"}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=13085)}),_N_E=e.O()}]);