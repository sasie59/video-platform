(this["webpackJsonpvideo-platform"]=this["webpackJsonpvideo-platform"]||[]).push([[0],{15:function(e,t,c){e.exports={VideoItem:"style_VideoItem__22_xz",duration:"style_duration__2wVkD",title:"style_title__1oZt5",description:"style_description__3aa3G"}},17:function(e,t,c){e.exports={HomePage:"style_HomePage__39HyE",loading:"style_loading__2xXeE",pagination:"style_pagination__1icEQ"}},18:function(e,t,c){e.exports={PlayPage:"style_PlayPage__3Nf3F",Player:"style_Player__1FIqP",AD:"style_AD__15s8F"}},28:function(e,t,c){},36:function(e,t,c){},62:function(e,t,c){"use strict";c.r(t);var n=c(1),i=c(0),a=c(27),s=c.n(a),o=(c(36),c(10)),r=c(11),l=c(4),j=c(2),d=c(28),b=c.n(d),u=c(19),O=c(15),h=c.n(O);function x(e){return Object(n.jsxs)("div",{className:h.a.VideoItem,children:[Object(n.jsxs)(l.b,{to:"/play?id=".concat(e.id),children:[Object(n.jsx)("img",{src:e.snippet.thumbnails.default.url,alt:e.snippet.title}),Object(n.jsx)("div",{className:h.a.title,children:e.snippet.title}),Object(n.jsx)("div",{className:h.a.description,children:e.snippet.description}),e.contentDetails&&Object(n.jsx)("div",{className:h.a.duration,children:e.contentDetails.duration})]}),Object(n.jsx)("button",{onClick:e.onClick.bind(this,e),children:e.buttonText})]})}var f=c(17),p=c.n(f),v="AIzaSyDOwkfXvX0jeCcDUeKHzaYE0Do8b2741lk",m=100,g=Math.ceil(m/12),y="https://www.googleapis.com/youtube/v3/search?key=".concat(v,"&maxResults=50&part=snippet&q="),_="https://www.googleapis.com/youtube/v3/videos?key=".concat(v,"&maxResults=50&part=snippet,contentDetails,statistics"),k=[],P=function e(t,c){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";fetch("".concat(t).concat(n)).then((function(e){return e.json()})).then((function(n){var i=n.items,a=n.nextPageToken;(k=[].concat(Object(u.a)(k),Object(u.a)(i))).length<m?e(t,c,"&pageToken=".concat(a)):c(k)}))},D=function(e){var t,c=Object(i.useRef)(),a=Object(j.f)(),s=Object(i.useState)([]),d=Object(r.a)(s,2),b=d[0],O=d[1],h=new URLSearchParams(a.search),f=Number(null!==(t=h.get("page"))&&void 0!==t?t:1),v=function(t){var c=e.favoriteVideo;c[t.id]=t,e.updateFavoriteVideo(c)};return Object(i.useEffect)((function(){k=[],P("".concat(_,"&chart=mostPopular"),O)}),[]),Object(n.jsxs)("div",{className:p.a.HomePage,children:[Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/",children:"\u9996\u9801"})}),Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/favorite",children:"\u6536\u85cf\u9801"})})]}),Object(n.jsx)("h1",{children:"\u9996\u9801"}),Object(n.jsx)("form",{onSubmit:function(e){e.preventDefault();var t=c.current.value.trim();t&&(k=[],P("".concat(y).concat(t),(function(e){var t=e.map((function(e){return e.id.videoId})).slice(0,50).join(",");P("".concat(_,"&id=").concat(t),O)})))},children:Object(n.jsx)("input",{type:"text",ref:c,required:!0})}),Object(n.jsxs)("ul",{className:p.a.pagination,children:[Object(n.jsx)("li",{children:f>1&&Object(n.jsx)(l.b,{to:"/?page=".concat(f-1),children:"\u4e0a\u4e00\u9801"})}),Object(u.a)(Array(g).keys()).map((function(e){return Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/?page=".concat(e+1),children:e+1})},e)})),Object(n.jsx)("li",{children:f<m/12&&Object(n.jsx)(l.b,{to:"/?page=".concat(f+1),children:"\u4e0b\u4e00\u9801"})})]}),Object(n.jsx)("hr",{}),!b.length&&Object(n.jsx)("div",{className:p.a.loading,children:"Loading"}),b.slice(12*(f-1),12*f).map((function(e){return Object(n.jsx)(x,Object(o.a)(Object(o.a)({},e),{},{onClick:v,buttonText:"\u6536\u85cf"}),e.id)}))]})},w=c(30),N=c.n(w),S=c(18),V=c.n(S),C=void 0,I="https://www.googleapis.com/youtube/v3/videos?key=".concat("AIzaSyDOwkfXvX0jeCcDUeKHzaYE0Do8b2741lk","&part=snippet,contentDetails,statistics&id="),F=function(){var e=Object(i.useRef)(),t=Object(j.f)(),c=new URLSearchParams(t.search).get("id"),a=Object(i.useState)({}),s=Object(r.a)(a,2),o=s[0],d=s[1],b=Object(i.useState)(!0),u=Object(r.a)(b,2),O=u[0],h=u[1],x=Object(i.useState)(!1),f=Object(r.a)(x,2),p=f[0],v=f[1],m=function(t){var c=e.current.getCurrentTime();e.current.seekTo(c+t,"seconds")};return Object(i.useLayoutEffect)((function(){fetch("".concat(I).concat(c)).then((function(e){return e.json()})).then((function(e){var t=e.items;d(t[0].snippet)}))}),[c]),Object(n.jsxs)("div",{className:V.a.PlayPage,children:[Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/",children:"\u9996\u9801"})}),Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/favorite",children:"\u6536\u85cf\u9801"})})]}),Object(n.jsx)("h1",{children:o.title}),Object(n.jsxs)("div",{className:V.a.Player,children:[Object(n.jsx)(N.a,{controls:!0,playsinline:!0,ref:e,playing:O,onPause:function(){h(!1),v(!0)},url:"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"}),p&&Object(n.jsxs)("div",{className:V.a.AD,children:[Object(n.jsx)("h3",{children:"AD"}),Object(n.jsx)("button",{onClick:function(){h(!0),v(!1)},children:"close AD"})]})]}),Object(n.jsx)("button",{onClick:m.bind(C,15),children:"forward 15sec"}),Object(n.jsx)("button",{onClick:m.bind(C,-15),children:"back 15sec"}),Object(n.jsx)("div",{children:o.description})]})},A=function(e){var t=e.favoriteVideo,c=e.updateFavoriteVideo,i=function(e){delete t[e.id],c(t)};return Object(n.jsxs)("div",{children:[Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/",children:"\u9996\u9801"})}),Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/favorite",children:"\u6536\u85cf\u9801"})})]}),Object(n.jsx)("h1",{children:"\u6536\u85cf\u9801"}),Object.keys(t).map((function(e){return Object(n.jsx)(x,Object(o.a)(Object(o.a)({},t[e]),{},{onClick:i,buttonText:"\u53d6\u6d88\u6536\u85cf"}),e)}))]})};var T=function(){var e,t=Object(i.useState)(null!==(e=JSON.parse(localStorage.getItem("favoriteVideo")))&&void 0!==e?e:{}),c=Object(r.a)(t,2),a=c[0],s=c[1],d=function(e){localStorage.setItem("favoriteVideo",JSON.stringify(e)),s(Object(o.a)({},e))};return Object(n.jsx)(l.a,{children:Object(n.jsx)("div",{className:b.a.App,children:Object(n.jsxs)(j.c,{children:[Object(n.jsx)(j.a,{exact:!0,path:"/play",children:Object(n.jsx)(F,{})}),Object(n.jsx)(j.a,{exact:!0,path:"/favorite",children:Object(n.jsx)(A,Object(o.a)({},{favoriteVideo:a,updateFavoriteVideo:d}))}),Object(n.jsx)(j.a,{exact:!0,path:"/",children:Object(n.jsx)(D,Object(o.a)({},{favoriteVideo:a,updateFavoriteVideo:d}))})]})})})},E=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,63)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;c(e),n(e),i(e),a(e),s(e)}))};s.a.render(Object(n.jsx)(T,{}),document.getElementById("root")),E()}},[[62,1,2]]]);
//# sourceMappingURL=main.3a553ca6.chunk.js.map