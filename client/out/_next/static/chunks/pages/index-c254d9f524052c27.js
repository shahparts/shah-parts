(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5405],{75557:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(98716)}])},98825:function(e,s,a){"use strict";a.d(s,{I:function(){return ProductCard}});var i=a(85893),t=a(45770),r=a(25675),n=a.n(r),l=a(41664),o=a.n(l),d=a(11163),c=a(38293),h=a(90012),u=a.n(h);let ProductCard=e=>{let{product:s}=e,{addToCart:a}=(0,t.i)(),r=(0,d.useRouter)(),handleAddToCart=async()=>{s.qtyToShop=1,await a(s),r.push("/checkout")};return(0,i.jsxs)("div",{className:u().ProductCard,children:[(0,i.jsx)(o(),{href:"/product/".concat(null==s?void 0:s._id),children:(0,i.jsx)(n(),{width:100,height:100,quality:100,src:null==s?void 0:s.Pictures[0],alt:null==s?void 0:s.Title})}),(0,i.jsx)(c.C,{text:"Add To Cart",onClick:handleAddToCart}),(0,i.jsxs)("div",{className:"pt-2 md:p-3",children:[(0,i.jsx)("h2",{children:null==s?void 0:s.Title}),(0,i.jsxs)("p",{children:["$",null==s?void 0:s.Price]})]})]})}},98716:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return pages}});var i=a(85893),t=a(2261);a(60439),a(19360),a(7025);var r={src:"/_next/static/media/imgpsh_fullsize-2.0d7a8167.png",height:933,width:1823,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAb0lEQVR42gFkAJv/AFtNS1hLSUtEPCchLLq5qPPz4OLi1fn56gBpZV2Mi39aSUu0saH//+fj49TMzMb09OAAhYZ6bXRgf3Bz0dLE4+bR4ODJ39/I7OzXANDEuqGWjp+ekuXo0/n54fDv2PHw2ff35pEkQlCMoA17AAAAAElFTkSuQmCC",blurWidth:8,blurHeight:4},n=a(25675),l=a.n(n),o=a(41664),d=a.n(o),c=a(14205),h=a.n(c),u=a(99304),Header_Header=()=>(0,i.jsx)("header",{className:h().Header,children:(0,i.jsx)(t.tq,{spaceBetween:0,slidesPerView:1,navigation:!0,autoplay:{delay:2e5,disableOnInteraction:!0},loop:!0,onSlideChange:()=>console.log("slide change"),onSwiper:e=>console.log(e),pagination:{clickable:!0},className:h().swiper,modules:[u.tl,u.W_,u.pt],children:(0,i.jsx)(t.o5,{className:h().swiperSlide,children:(0,i.jsx)(d(),{href:"/",children:(0,i.jsx)(l(),{src:r,alt:"Engine Banner"})})})})}),p=a(5789),m=a(51024),x=a(55673),g=a(67294),j=a(62516),w=a.n(j),A={src:"/_next/static/media/sidebar-badge-1.e9c4caeb.png",height:220,width:290,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAyUlEQVR42mO4tkyRiQEIzvUx8J1ebpp9dkdt5uNTE3hBYofmJYHlGM43MQhfWx9w5cWNtf8fXl7zf/+cxIvzPBgEGWDg8ZGorEenW/4f27fix/Z5NT82Njn93z/LIw0s+ZuBQe/FsuIn10/2/1/Y6PFraYXxr9ML3P/f73Z/8s/Q1oDhkYXM2ktpnu8OLsu+dWJJ9v+bWzL/PzhacuNCsuubh6YyGxjOGmmpX2FgkO0v5RTbNz2w7dLm7Nazl/tFzzEwyJy3M9AAAJI1XVivMDIEAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:6},_=a(86978),f=a(5121),v=a(98825),N=a(38293),b=a(11163),C=a(77742),P=a(19353),y=a(64573),S=a(21358),k=a(48715),E=a(7737),T=a(48389),pages=()=>{let e=(0,b.useRouter)(),{setFilterValuesFun:s}=(0,T.b)(),[a,r]=(0,g.useState)([]),[n,o]=(0,g.useState)([]),[c,h]=(0,g.useState)(!1),getAllFeaturedProducts=async e=>{h(!0),await f.Z.get("".concat("https://www.shahparts.com/api","/products/get/featured")).then(e=>{h(!1),200===e.status?r(e.data):(0,_.hW)(e.data.errorMessage)}).catch(e=>{h(!1),console.log(e)})},getAllBrands=async e=>{h(!0),await f.Z.get("".concat("https://www.shahparts.com/api","/products/makes")).then(e=>{h(!1),200===e.status?o(e.data):(0,_.hW)(e.data.errorMessage)}).catch(e=>{h(!1),console.log(e)})};(0,g.useEffect)(()=>(getAllFeaturedProducts(),getAllBrands(),()=>{}),[]);let j=[{title:"Engine Parts",link:"Engine & Components",image:"https://storage.googleapis.com/shah-parts/categories/engine.jpg"},{title:"Transmissions & Suspension",link:"Suspension & Components",image:"https://storage.googleapis.com/shah-parts/categories/Suspension.jpg"},{title:"LIGHT SECTION",link:"Lightings",image:"https://storage.googleapis.com/shah-parts/categories/lighting.jpg"},{title:"Body Parts",link:"Body Parts",image:"https://storage.googleapis.com/shah-parts/categories/body%20parts.jpg"}],handleReferCategoryToShop=a=>{if(a){s("","",a,"");let i=new URLSearchParams;a&&i.append("Part",a),e.push("/shop?".concat(i.toString()))}};return(0,i.jsxs)("div",{className:"".concat(w().Home," home"),children:[(0,i.jsxs)("main",{className:"pb-8",children:[(0,i.jsx)(Header_Header,{}),(0,i.jsxs)("section",{className:w().featuredParts,children:[(0,i.jsxs)("div",{className:w().viewAllContainer,children:[(0,i.jsx)("h1",{className:"".concat(w().title," mainTitle"),children:"Featured auto parts categories"}),(0,i.jsx)(d(),{href:"/categories",children:"View All >"})]}),(0,i.jsx)(x.Z,{gutter:[40,40],children:null==j?void 0:j.map((e,s)=>(0,i.jsxs)(p.Z,{xs:24,md:12,lg:8,xl:6,className:"text-left cursor-pointer",onClick:()=>handleReferCategoryToShop(null==e?void 0:e.link),children:[(0,i.jsx)("h3",{className:w().subTitle,children:null==e?void 0:e.title}),(0,i.jsx)(l(),{style:{width:"100%"},width:200,height:200,src:null==e?void 0:e.image,className:null===w()||void 0===w()?void 0:w().ftImage,alt:""})]},s))})]}),(0,i.jsxs)("section",{className:w().featuredProducts,children:[(0,i.jsxs)("div",{className:"flex justify-between items-center mt-5",children:[(0,i.jsx)("h1",{className:"".concat("".concat(w().title," mainTitle")),children:"Featured Products"}),(0,i.jsx)(l(),{width:130,className:"w-[60px] md:w-[130px]",src:A,alt:"Featured Banner"})]}),(0,i.jsx)(t.tq,{spaceBetween:50,slidesPerView:1,navigation:!0,autoplay:{delay:3500,disableOnInteraction:!0},loop:!0,modules:[u.W_,u.pt],breakpoints:{640:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:40},1024:{slidesPerView:4,spaceBetween:50}},children:null==a?void 0:a.map((e,s)=>(0,i.jsx)(t.o5,{className:w().swiperSlide,children:(0,i.jsx)(v.I,{product:e})},s))})]}),(0,i.jsxs)("section",{className:"mt-[60px]",children:[(0,i.jsxs)("div",{className:w().viewAllContainer,children:[(0,i.jsx)("h1",{className:"".concat(w().title," mainTitle"),children:"car auto parts by brands"}),(0,i.jsx)(d(),{href:"/brands",children:"View All >"})]}),(0,i.jsx)("div",{className:"".concat(w().brands," flex gap-10 flex-wrap"),children:null==n?void 0:n.map((e,s)=>{var a;return(0,i.jsx)("div",{className:"border-2 border-[rgba(244,244,244,1)]",children:(0,i.jsx)(d(),{href:"/shop?Make=".concat(null==e?void 0:null===(a=e.make)||void 0===a?void 0:a.toUpperCase()),children:(0,i.jsx)(l(),{src:null==e?void 0:e.image,alt:null==e?void 0:e.make,width:200,height:200,style:{height:"180px",objectFit:"contain"}})},s)},s)})})]}),(0,i.jsx)("section",{className:"mt-4 md:mt-[60px]",children:(0,i.jsxs)("div",{className:w().textContainer,children:[(0,i.jsx)("h1",{className:"".concat(w().title," mainTitle"),children:"Auto Parts you get"}),(0,i.jsx)("p",{children:"As Japan’s leading used automobile and auto parts exporter, SHAH PARTS provides an extensive selection of top-of-the-line used parts and accessories available for worldwide delivery. Our stock is sourced daily from a network of registered and professional representatives who review all auction markets throughout Japan, as well as private owners and car dealerships."}),(0,i.jsx)("p",{children:"We pride ourselves not only in providing quality Japanese automobiles and auto parts at prices you can afford, but also maintaining the highest level of Japanese customer service throughout the shopping process. Buy from us once and you will see why our number of loyal customers continues to grow."}),(0,i.jsx)("div",{className:"my-0",children:(0,i.jsxs)(t.tq,{className:w().swiper,spaceBetween:50,slidesPerView:1,navigation:!0,autoplay:{delay:3500,disableOnInteraction:!0},loop:!0,modules:[u.W_,u.pt],breakpoints:{640:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:40},1024:{slidesPerView:4,spaceBetween:50}},children:[(0,i.jsxs)(t.o5,{className:w().swiperSlide,children:[(0,i.jsx)("div",{className:w().icon,children:(0,i.jsx)(P.Z,{})}),(0,i.jsx)("li",{children:"Access to over 400,000 genuine parts and accessories with new stock arriving every day."})]}),(0,i.jsxs)(t.o5,{className:w().swiperSlide,children:[(0,i.jsx)("div",{className:w().icon,children:(0,i.jsx)(E.default,{})}),(0,i.jsx)("li",{children:"Easy-to-use search results that show only the parts you need."})]}),(0,i.jsxs)(t.o5,{className:w().swiperSlide,children:[(0,i.jsx)("div",{className:w().icon,children:(0,i.jsx)(S.Z,{})}),(0,i.jsx)("li",{children:"Quick and efficient shipping direct from Japan."})]}),(0,i.jsxs)(t.o5,{className:w().swiperSlide,children:[(0,i.jsx)("div",{className:w().icon,children:(0,i.jsx)(k.Z,{})}),(0,i.jsx)("li",{children:"Expert guidance in 30 languages."})]}),(0,i.jsxs)(t.o5,{className:w().swiperSlide,children:[(0,i.jsx)("div",{className:w().icon,children:(0,i.jsx)(y.Z,{})}),(0,i.jsx)("li",{children:"Quality parts at reasonable prices."})]}),(0,i.jsxs)(t.o5,{className:w().swiperSlide,children:[(0,i.jsx)("div",{className:w().icon,children:(0,i.jsx)(C.Z,{})}),(0,i.jsx)("li",{children:"Extensive listings by Japan’s top auto makers: Toyota, Nissan, Honda, Mazda, and more!"})]})]})})]})})]}),(0,i.jsxs)(x.Z,{gutter:[23,23],className:w().emailListContainer,children:[(0,i.jsx)(p.Z,{xs:24,md:12,children:(0,i.jsx)(l(),{src:"/assets/car.jpg",width:100,height:100})}),(0,i.jsxs)(p.Z,{xs:24,md:12,className:w().inner,children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{className:"".concat(w().title," mainTitle"),children:"Expert advice to your inbox"}),(0,i.jsx)("h3",{children:"Subscribe to our Emailing List for Updated Prices and Sales Alert on Auto Parts and Electronics"})]}),(0,i.jsxs)("form",{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{children:"Full Name"}),(0,i.jsx)(m.default,{required:!0})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{children:"Email"}),(0,i.jsx)(m.default,{type:"email",required:!0})]}),(0,i.jsx)(N.C,{text:"Submit"})]})]})]})]})}},90012:function(e){e.exports={ProductCard:"ProductCard_ProductCard__9rqA7"}},14205:function(e){e.exports={Header:"Header_Header__O6PxF",swiperSlide:"Header_swiperSlide__c3xpk",swiper:"Header_swiper__bnL5b"}},62516:function(e){e.exports={Home:"home_Home__fxApI",title:"home_title__znpQq",viewAllContainer:"home_viewAllContainer__onL4A",featuredParts:"home_featuredParts__zijon",featuredProducts:"home_featuredProducts__Q2n2Z",ftImage:"home_ftImage__J1Y_t",imagesContainer:"home_imagesContainer__GS7aG",subTitle:"home_subTitle__Fxr0c",browseContainer:"home_browseContainer__KTWC_",bgColor:"home_bgColor__NNN7D",textContainer:"home_textContainer__5EGGe",swiper:"home_swiper__V2zZn",swiperSlide:"home_swiperSlide__v6RaW",icon:"home_icon__Pmt8J",emailListContainer:"home_emailListContainer__MJMd1",brands:"home_brands__XU3FD"}}},function(e){e.O(0,[4775,9774,2888,179],function(){return e(e.s=75557)}),_N_E=e.O()}]);