"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[455],{27320:function(L,p,t){t.d(p,{j:function(){return h},y:function(){return T}});var T=function(i,s){if(!i)return{x:0,y:0};var d=i.getBoundingClientRect(),x=s.clientX-d.left,o=s.clientY-d.top;return{x,y:o}},h=function(i,s,d,x,o){var C=i-d,c=s-x;return C*C+c*c<=o*o}},32604:function(L,p,t){t.d(p,{f:function(){return X}});var T=t(5574),h=t.n(T),a=t(62435),i=t(86074),s=function(n){var e=n.draw,r=n.$canvas,v=n.waveCanvas,f=n.currentTime,R=n.duration;return(0,a.useEffect)(function(){v&&(e==null||e())},[v,e,f,R]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("canvas",{ref:r,id:"shcanvas",style:{height:"100%",width:"100%",zIndex:0,pointerEvents:"auto"}})})},d=t(1970),x=t.n(d);function o(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return x().d2t(l.toFixed(3))}var C=function(n,e){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"#529393";if(!(!n||!e)){var v=n.width,f=n.height;e.clearRect(0,0,v,f),e.fillStyle=r,e.fillRect(0,0,v,f)}};function c(l){return l*10}function B(l,n){return Number(Number(l/n).toFixed(3))}function F(l,n){return Math.floor(l/n)*n}var I=function(n,e){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,v=arguments.length>3&&arguments[3]!==void 0?arguments[3]:15,f=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0;if(!(!n||!e)){var R=n.width,y=7,j=15,N=30;e.font="".concat(y*r,"px Arial"),e.fillStyle="#fff";for(var w=c(v),S=B(R,w),E=F(f,v),P=-1,m=0;m<w;m+=1)m%10===0?(P+=1,e.fillRect(m*S,0,r,j*r),e.fillText(o(E+P).split(".")[0],S*m-y*r*2+r,N*r)):m%5===0?e.fillRect(m*S,0,r,j*r/1.5):e.fillRect(m*S,0,r,j*r/3)}},K=function(n){var e=n.canvas,r=n.ctx,v=n.pixelRatio,f=v===void 0?1:v,R=n.duration,y=R===void 0?10:R,j=n.currentTime,N=j===void 0?5:j,w=n.color,S=w===void 0?"red":w,E=n.pointerWidth,P=E===void 0?2:E;if(!(!e||!r)){var m=e.width,J=e.height;r.fillStyle=S;var b=c(y),u=B(m,b),Q=F(N,y),$=Number(((N-Q)*10*u).toFixed(3)),O=P*f;r.fillRect($,0,O,J)}};function U(l,n,e){return Math.max(Math.min(l,Math.max(n,e)),Math.min(n,e))}var M={container:"container___FqMEL",shwave:"shwave___yXRah",tool__container:"tool__container____l2mI",slider:"slider___RlCKp"},k=t(71230),z=t(15746),G=t(71338),D=t(56549),H=t(56615),V=t(27320),Y=function(){var n=(0,a.useState)(0),e=h()(n,2),r=e[0],v=e[1],f=function(){v(function(y){return y+1})};return(0,a.useEffect)(function(){},[r]),f},X=function(n){var e=n.currentTime,r=e===void 0?0:e,v=n.duration,f=v===void 0?10:v,R=n.backgroundColor,y=R===void 0?"#529393":R,j=n.pointerWidth,N=j===void 0?2:j,w=n.pointerColor,S=w===void 0?"white":w,E=n.click,P=Y(),m=(0,a.useRef)(f);(0,a.useEffect)(function(){m.current=f,P()},[f]);var J=(0,a.useState)(null),b=h()(J,2),u=b[0],Q=b[1],$=(0,a.useRef)(null),O=(0,a.useRef)(null),Z=(0,H.Z)(O),an=(0,a.useState)(1),tn=h()(an,2),_=tn[0],en=tn[1],on=function(g){g!==null&&Q(g)},un=function(g){if(!u||!$.current)return 0;var A=(0,V.y)(u,g),q=A.x,cn=u.clientWidth,dn=c(m.current),ln=B(cn,dn),nn=F(r,m.current),vn=U(q/ln/10+nn,nn,nn+m.current);return vn},rn=function(g){var A=un(g);r!==A&&(E==null||E(A))};(0,a.useEffect)(function(){if(u!==null)return u.addEventListener("click",rn),function(){u.removeEventListener("click",rn)}},[u]),(0,a.useEffect)(function(){if(!(!Z||!O.current||!$.current)){var W=Z.width;O.current.style.width="".concat(W,"px")}},[Z]);var sn=function(){var g=u&&(u==null?void 0:u.getContext("2d"));if(!(!u||!g||!Z||!$.current)){var A=Z.width,q=Z.height;u.width=A*_,u.height=q,$.current.style.width="".concat(u.width,"px"),C(u,g,y),I(u,g,1,m.current),K({canvas:u,ctx:g,pixelRatio:1,duration:f,currentTime:r,color:S,pointerWidth:N})}};return(0,i.jsxs)("div",{className:M.container,ref:O,children:[(0,i.jsx)("div",{className:M.tool__container,children:(0,i.jsxs)(k.Z,{className:M.slider,children:[(0,i.jsx)(z.Z,{span:5,children:(0,i.jsx)(G.Z,{min:1,max:20,onChange:function(g){return en(g)},value:_,step:.1})}),(0,i.jsx)(z.Z,{span:8,children:(0,i.jsx)(D.Z,{min:1,max:20,style:{margin:"0 16px"},step:.1,value:_,onChange:function(g){return en(g||1)}})})]})}),(0,i.jsx)("div",{ref:$,className:M.shwave,children:(0,i.jsx)(s,{$canvas:on,waveCanvas:u,draw:sn,currentTime:r,duration:f})})]})}},4075:function(L,p,t){t.d(p,{Y:function(){return a}});var T=t(62435),h=t(86074),a=function(s){var d=s.playerRef,x=s.setDuration,o=s.url,C=s.setCurrentTime;return(0,T.useEffect)(function(){d.current&&(d.current.ontimeupdate=function(){var c;C==null||C((c=d.current)===null||c===void 0?void 0:c.currentTime)},d.current.addEventListener("canplay",function(){var c;x==null||x((c=d.current)===null||c===void 0?void 0:c.duration)}))},[o]),(0,h.jsx)("div",{children:(0,h.jsx)("video",{controls:!0,width:"100%",height:"auto",crossOrigin:"anonymous",src:o,ref:d})})}},83535:function(L,p,t){t.r(p),t.d(p,{default:function(){return c}});var T=t(5574),h=t.n(T),a={container:"container___IJZpY",header:"header___atA1f",main:"main___D1e70",side_bar:"side_bar___U6sqr",main_right:"main_right___RC1g0",main_top:"main_top___Wx03t",asset:"asset___B0gRG",pre:"pre___f9oaE",main_bottom:"main_bottom___p4Pby"},i=t(97029),s=t(62435),d=t(32604),x=t(4075),o=t(86074),C=function(){var F=(0,s.useState)(0),I=h()(F,2),K=I[0],U=I[1],M=(0,s.useState)(""),k=h()(M,2),z=k[0],G=k[1],D=(0,s.useRef)(null),H=(0,s.useState)(10),V=h()(H,2),Y=V[0],X=V[1];console.log("xxxx duration",Y);var l=function(r){if(!D.current){console.error("onClick no playerRef"),U(r);return}D.current.pause(),D.current.currentTime=r},n=function(){D.current&&G("https://live-s3m.mediav.com/nativevideo/853af20ef450e4b0e467055fc6b955b9-bit_cloud768.mp4")};return(0,o.jsx)("div",{className:a.container,children:(0,o.jsx)("div",{className:a.main,children:(0,o.jsxs)("div",{className:a.main_right,children:[(0,o.jsxs)("div",{className:a.main_top,children:[(0,o.jsx)("div",{className:a.asset,children:(0,o.jsx)(i.ZP,{onClick:n,children:"\u52A0\u8F7D demo"})}),(0,o.jsx)("div",{className:a.pre,children:(0,o.jsx)(x.Y,{playerRef:D,setCurrentTime:U,url:z,setDuration:X})})]}),(0,o.jsx)("div",{className:a.main_bottom,children:(0,o.jsx)(d.f,{currentTime:K,click:l,duration:Y})})]})})})},c=C},58964:function(L,p,t){t.d(p,{Z:function(){return x}});var T=t(87462),h=t(62435),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"},i=a,s=t(93771),d=function(C,c){return h.createElement(s.Z,(0,T.Z)({},C,{ref:c,icon:i}))},x=h.forwardRef(d)}}]);