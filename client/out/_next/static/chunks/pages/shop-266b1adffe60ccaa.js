(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4800],{5789:function(e,t,l){"use strict";t.Z=void 0;var o=l(38614);t.Z=o.Col},55673:function(e,t,l){"use strict";t.Z=void 0;var o=l(38614);t.Z=o.Row},13085:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shop",function(){return l(64379)}])},38293:function(e,t,l){"use strict";l.d(t,{C:function(){return ButtonComp}});var o=l(85893),a=l(65400),s=l.n(a),i=l(87893),r=l.n(i);let ButtonComp=e=>{let{text:t,type:l,onClick:a,disabled:i,loading:d}=e;return(0,o.jsx)(s(),{className:r().ButtonComp,htmlType:l,onClick:a,disabled:i,loading:d,children:t})}},63222:function(e,t,l){"use strict";l.d(t,{Z:function(){return Loading_Loading}});var o=l(85893),a=l(25675),s=l.n(a);l(67294);var i={src:"/_next/static/media/loading.5fd12965.gif",height:200,width:200,blurWidth:0,blurHeight:0},Loading_Loading=()=>(0,o.jsx)("div",{className:"flex justify-center items-center",children:(0,o.jsx)("div",{className:"w-[60px]",children:(0,o.jsx)(s(),{src:i,alt:"Spinning Tom Nook Loading Icon",width:100,height:100})})})},98825:function(e,t,l){"use strict";l.d(t,{I:function(){return ProductCard}});var o=l(85893),a=l(45770),s=l(25675),i=l.n(s),r=l(41664),d=l.n(r),n=l(11163),u=l(38293),c=l(90012),h=l.n(c);let ProductCard=e=>{let{product:t}=e,{addToCart:l}=(0,a.i)(),s=(0,n.useRouter)(),handleAddToCart=async()=>{t.qtyToShop=1,await l(t),s.push("/checkout")};return(0,o.jsxs)("div",{className:h().ProductCard,children:[(0,o.jsx)(d(),{href:"/product/".concat(null==t?void 0:t._id),children:(0,o.jsx)(i(),{width:100,height:100,quality:100,src:null==t?void 0:t.Pictures[0],alt:null==t?void 0:t.Title})}),(0,o.jsx)(u.C,{text:"Add To Cart",onClick:handleAddToCart}),(0,o.jsxs)("div",{className:"pt-2 md:p-3",children:[(0,o.jsx)("h2",{children:null==t?void 0:t.Title}),(0,o.jsxs)("p",{children:["$",null==t?void 0:t.Price]})]})]})}},64379:function(e,t,l){"use strict";l.r(t);var o=l(85893),a=l(86978),s=l(5789),i=l(69843),r=l(55673),d=l(64749),n=l(5121),u=l(11163),c=l(67294),h=l(66796),v=l.n(h),p=l(63222),_=l(98825),f=l(48389);t.default=()=>{let e=(0,u.useRouter)(),{setFilterValuesFun:t}=(0,f.b)(),[l,h]=(0,c.useState)([]),[g,m]=(0,c.useState)("createdAt"),[x,y]=(0,c.useState)([]),[P,S]=(0,c.useState)([]),[j,w]=(0,c.useState)(e.query.Make),[C,N]=(0,c.useState)(e.query.Part),[q,k]=(0,c.useState)(e.query.Model),[A,M]=(0,c.useState)(e.query.PartAccessory),[b,Z]=(0,c.useState)(),[T,B]=(0,c.useState)(!1),[E,L]=(0,c.useState)(),[W,z]=(0,c.useState)(1),getAllData=async()=>{B(!0),await n.Z.post("".concat("https://www.shahparts.com/api","/products/get"),{page:W-1,pageSize:"20",priceRange:b,Make:j,Model:q,Part:C,PartAccessorries:A,sortBy:g}).then(l=>{if(B(!1),200===l.status){var o,s,i,r,d,n,u,c;h(null===(o=l.data)||void 0===o?void 0:o.products),L(l.data.count);let a=l.data.products[0];(null==e?void 0:null===(s=e.query)||void 0===s?void 0:s.Make)&&t(null==e?void 0:null===(d=e.query)||void 0===d?void 0:d.Make),(null==e?void 0:null===(i=e.query)||void 0===i?void 0:i.Model)&&t(null==e?void 0:null===(n=e.query)||void 0===n?void 0:n.Make,null==e?void 0:null===(u=e.query)||void 0===u?void 0:u.Model),(null==e?void 0:null===(r=e.query)||void 0===r?void 0:r.Part)&&t(null==a?void 0:a.Make,null==a?void 0:a.Model,null==e?void 0:null===(c=e.query)||void 0===c?void 0:c.Part)}else(0,a.hW)(l.data.errorMessage)}).catch(e=>{B(!1),console.log(e)})},getAllParts=async()=>{B(!0),await n.Z.get("".concat("https://www.shahparts.com/api","/products/parts")).then(e=>{if(B(!1),200===e.status){var t;y(null===(t=e.data)||void 0===t?void 0:t.map(e=>({value:null==e?void 0:e.part,label:null==e?void 0:e.part})))}else(0,a.hW)(e.data.errorMessage)}).catch(e=>{B(!1),console.log(e)})},getAllMakes=async()=>{B(!0),await n.Z.get("".concat("https://www.shahparts.com/api","/products/makes")).then(e=>{if(B(!1),200===e.status){var t;S(null===(t=e.data)||void 0===t?void 0:t.map(e=>({value:null==e?void 0:e.make,label:null==e?void 0:e.make})))}else(0,a.hW)(e.data.errorMessage)}).catch(e=>{B(!1),console.log(e)})};return(0,c.useEffect)(()=>{var t,l,o,a,s,i,r,d;return getAllParts(),getAllMakes(),(null===(t=e.query)||void 0===t?void 0:t.Make)&&w(null===(s=e.query)||void 0===s?void 0:s.Make),(null===(l=e.query)||void 0===l?void 0:l.Model)&&k(null===(i=e.query)||void 0===i?void 0:i.Model),(null===(o=e.query)||void 0===o?void 0:o.Part)&&N(null===(r=e.query)||void 0===r?void 0:r.Part),(null===(a=e.query)||void 0===a?void 0:a.PartAccessory)&&M(null===(d=e.query)||void 0===d?void 0:d.PartAccessory),()=>{}},[e.query]),(0,c.useEffect)(()=>(getAllData(),()=>{}),[W,j,q,A,C,b,g]),(0,o.jsxs)("div",{className:v().ShopPage,children:[(0,o.jsxs)("div",{className:v().sortSection,children:[(0,o.jsxs)("div",{className:"flex items-center gap-6",children:[(0,o.jsx)("h4",{className:"mb-0",children:"Products"}),(0,o.jsxs)("p",{className:"w-full",children:[null==l?void 0:l.length," of ",E," items"]})]}),(0,o.jsxs)("div",{className:v().right,children:[(0,o.jsx)("h4",{className:"mb-0",children:"Sort By:"}),(0,o.jsx)(d.default,{className:v().sortSelect,defaultValue:"createdAt",onChange:e=>{m(e)},placeholder:"Sort",options:[{value:"lth",label:"Price: Low to High"},{value:"htl",label:"Price: High to Low"},{value:"a-z",label:"Product Name: A-Z"},{value:"z-a",label:"Product Name: Z-A"},{value:"createdAt",label:"Released Date"}]})]})]}),(0,o.jsx)("div",{className:"mt-4",children:T?(0,o.jsx)(p.Z,{}):(0,o.jsx)(r.Z,{gutter:[23,23],className:"p-4",children:null==l?void 0:l.map((e,t)=>(0,o.jsx)(s.Z,{xs:12,md:8,lg:6,children:(0,o.jsx)(_.I,{product:e})},t))})}),(0,o.jsx)("div",{className:"flex justify-center my-10",children:(0,o.jsx)(i.default,{current:W,defaultPageSize:20,showSizeChanger:!1,onChange:e=>z(e),total:E})})]})}},87893:function(e){e.exports={ButtonComp:"ButtonComp_ButtonComp__irX7_"}},90012:function(e){e.exports={ProductCard:"ProductCard_ProductCard__9rqA7"}},66796:function(e){e.exports={ShopPage:"shop_ShopPage__SFCNH",top:"shop_top__k5euW",title:"shop_title__tQfup",scroll:"shop_scroll__c8fAT",sortSection:"shop_sortSection__YcNWi",right:"shop_right__Zfqmd",sortSelect:"shop_sortSelect__Vofso",filters:"shop_filters__v5onB",filterSection:"shop_filterSection__p9Ebb",select:"shop_select__K8njP"}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=13085)}),_N_E=e.O()}]);