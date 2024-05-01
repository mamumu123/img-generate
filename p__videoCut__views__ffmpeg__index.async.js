"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[813],{92342:function(W,b,e){e.d(b,{Jz:function(){return O},KQ:function(){return g},SQ:function(){return A},YZ:function(){return n},_Q:function(){return i},ml:function(){return D}});var g="output.mp4",y="input.mp4",A=g,n={getInfo:"getInfo",screenshot:"screenshot",getMp3FromVideo:"getMp3FromVideo",custom:"custom",cutVideo:"cutVideo"},D=function(s,m){var u="",o="",f=m||{},p=f.rangeLeft,h=f.rangeRight,v=f.input,M=f.out,a=f.timer;switch(s){case n.screenshot:o="-i ".concat(v," -ss ").concat(a,"  -vframes 1 ").concat(M),u="out.png";break;case n.getMp3FromVideo:o=" -f mp3 -vn",u="out.mp3";break;case n.getInfo:o="",u=g;break;case n.custom:o="",u=g;break;case n.cutVideo:o="-ss ".concat(p," -to ").concat(h," -i ").concat(v," -c:v copy -c:a copy ").concat(M),u=g;break;default:o=A,u=g}return[o,u]},O=[{value:n.getInfo,label:"\u83B7\u53D6\u89C6\u9891\u4FE1\u606F"},{value:n.custom,label:"\u81EA\u5B9A\u4E49\u8F93\u5165"},{value:n.screenshot,label:"\u89C6\u9891\u622A\u56FE"},{value:n.getMp3FromVideo,label:"\u63D0\u53D6\u97F3\u9891"},{value:n.cutVideo,label:"\u89C6\u9891\u5206\u5272"}],i={mp4:"video/mp4",mp3:"audio/mp3",png:"image/png"}},37713:function(W,b,e){e.d(b,{t:function(){return m}});var g=e(15009),y=e.n(g),A=e(19632),n=e.n(A),D=e(99289),O=e.n(D),i=e(5574),c=e.n(i),s=e(62435),m=function(o){var f=(0,s.useState)([]),p=c()(f,2),h=p[0],v=p[1],M=(0,s.useState)(0),a=c()(M,2),Q=a[0],B=a[1],r=(0,s.useState)(!1),R=c()(r,2),I=R[0],F=R[1];return(0,s.useEffect)(function(){O()(y()().mark(function V(){return y()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:if(o.setProgress(function(d){var _=d.ratio;console.log("[progress]",d),_>=0&&_<=1&&B(_*100),_===1&&setTimeout(function(){B(0)},1e3)}),o.setLogger(function(d){var _=d.type,x=d.message;switch(_){case"fferr":v(function(N){return[].concat(n()(N),[x])});return}}),o.isLoaded()){E.next=5;break}return E.next=5,o.load();case 5:F(!0);case 6:case"end":return E.stop()}},V)}))()},[]),{stderr:h,setStderr:v,progress:Q,ffmpegIsLoaded:I}}},7351:function(W,b,e){e.r(b);var g=e(62435),y=e(16957),A=e(78356),n=e(97029),D=e(80854),O=e(26420),i=e(86074);function c(){var s=(0,D.useModel)("video"),m=s.media,u=function(p){var h,v=(h=p.target.files)===null||h===void 0?void 0:h[0];if(v)try{var M=v.name;if(/\s/.test(M)){A.ZP.error("\u6587\u4EF6\u540D\u4E0D\u80FD\u5B58\u5728\u7A7A\u683C");return}y.p.files.put({name:M,type:v.type,data:v})}catch(a){console.error("handleMediaChange error",a)}},o=function(){m&&y.p&&y.p.files.delete(m.id)};return(0,i.jsx)("div",{children:m?(0,i.jsxs)("div",{children:[(0,i.jsxs)("p",{children:["\u6587\u4EF6\u540D\uFF1A",m.name]}),(0,i.jsxs)("p",{children:["\u6587\u4EF6\u7C7B\u578B\uFF1A",m.type]}),(0,i.jsxs)("p",{children:["\u6587\u4EF6\u5927\u5C0F\uFF1A",(0,O.NR)(m.data.size)]}),(0,i.jsx)(n.ZP,{onClick:o,children:"\u6E05\u9664\u6587\u4EF6"})]}):(0,i.jsx)("div",{children:(0,i.jsx)("input",{type:"file",onChange:u})})})}b.default=c},98574:function(W,b,e){e.r(b),e.d(b,{default:function(){return V}});var g=e(19632),y=e.n(g),A=e(15009),n=e.n(A),D=e(99289),O=e.n(D),i=e(5574),c=e.n(i),s={container:"container___roQLh",upload__container:"upload__container___ePo3U",all_args_box:"all_args_box___TFXqt",box:"box___SX04q",btn__box:"btn__box___ZtUvB",video__box:"video__box___uBvZR"},m=e(15045),u=e(62435),o=e(78356),f=e(55929),p=e(84385),h=e(97029),v=e(69814),M=e(37713),a=e(92342),Q=e(7351),B=e(80854),r=e(86074),R=function(E){var d=E.videoSrc,_=E.outputType,x=E.inputType;return!d||x===a.YZ.getInfo?null:(0,r.jsxs)("div",{className:s.video__box,children:[_===a._Q.mp4&&(0,r.jsx)("video",{controls:!0,crossOrigin:"anonymous",src:d.blob,width:300,height:300}),_===a._Q.mp3&&(0,r.jsx)("audio",{controls:!0,crossOrigin:"anonymous",src:d.blob}),_===a._Q.png&&(0,r.jsx)("img",{crossOrigin:"anonymous",src:d.blob,width:300,height:300}),(0,r.jsx)(h.ZP,{type:"primary",children:(0,r.jsx)("a",{href:d.blob,download:d.f,children:"\u4E0B\u8F7D"})})]})},I=e(9632),F=(0,m.createFFmpeg)({log:!0,corePath:"".concat(window.location.origin).concat("/","static/v0.11.0/ffmpeg-core.js")});function V(){var T=(0,M.t)(F),E=T.stderr,d=T.setStderr,_=T.progress,x=T.ffmpegIsLoaded,N=(0,B.useModel)("video"),S=N.media,U=S==null?void 0:S.name,k=(0,I.Z)("args",{defaultValue:a.SQ}),J=c()(k,2),G=J[0],K=J[1],q=(0,I.Z)("inputType",{defaultValue:a.Jz[0].value}),H=c()(q,2),L=H[0],ee=H[1],re=(0,u.useState)(""),X=c()(re,2),C=X[0],$=X[1],Y=(0,u.useMemo)(function(){var j=C.split(".").at(-1)||"",l=a._Q[j];return l},[C]),Z=(0,u.useMemo)(function(){return"-i ".concat(U," ").concat(G," ").concat(C)},[U,G,C]);(0,u.useEffect)(function(){if(L){var j=(0,a.ml)(L),l=c()(j,2),P=l[0],z=l[1];K(P),$(z)}else K(a.SQ),$(a.KQ)},[L]);var te=(0,u.useState)(),w=c()(te,2),ne=w[0],ae=w[1];(0,u.useEffect)(function(){!S||!x||O()(n()().mark(function j(){var l,P;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return l=S.data,P=S.name,t.t0=F,t.t1=P,t.next=5,(0,m.fetchFile)(l);case 5:t.t2=t.sent,t.t0.FS.call(t.t0,"writeFile",t.t1,t.t2);case 7:case"end":return t.stop()}},j)}))()},[S,x]);var ue=function(){var j=O()(n()().mark(function l(){var P;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(!U||!Z)){t.next=3;break}return o.ZP.error("\u8BF7\u786E\u8BA4\u53C2\u6570\u586B\u5199\u5B8C\u6574"),t.abrupt("return");case 3:return d([]),t.next=6,F.run.apply(F,y()(Z.split(" ")));case 6:if(C){t.next=8;break}return t.abrupt("return");case 8:t.prev=8,P=F.FS("readFile",C),ae(function(){var le=URL.createObjectURL(new Blob([P.buffer],{type:Y}));F.FS("unlink",C);var ie={f:C,blob:le};return ie}),t.next=17;break;case 13:return t.prev=13,t.t0=t.catch(8),console.error("error",t.t0),t.abrupt("return");case 17:case"end":return t.stop()}},l,null,[[8,13]])}));return function(){return j.apply(this,arguments)}}(),se=function(l){K(l.target.value)},oe=function(){K(a.SQ)};return(0,r.jsxs)("div",{className:s.container,children:[(0,r.jsxs)("div",{className:s.box,children:[(0,r.jsx)("h2",{children:" \u6B65\u9AA41: \u4E0A\u4F20\u5904\u7406\u6587\u4EF6"}),(0,r.jsx)(Q.default,{})]}),(0,r.jsxs)("div",{className:s.box,children:[(0,r.jsx)("h2",{children:" \u6B65\u9AA42: \u586B\u5199\u5904\u7406\u53C2\u6570"}),(0,r.jsxs)("div",{style:{marginBottom:10},children:[(0,r.jsx)("h3",{children:"\u53C2\u6570"}),(0,r.jsx)(f.Z,{value:L,style:{width:220,marginBottom:10},onChange:function(l){return ee(l)},options:a.Jz}),(0,r.jsx)(p.Z,{type:"text",value:G,onChange:se}),(0,r.jsx)("h3",{children:"\u8F93\u51FA\u6587\u4EF6\u540D"}),(0,r.jsx)(p.Z,{type:"text",value:C,onChange:function(l){$(l.target.value)}}),(0,r.jsx)("h3",{children:"\u5B8C\u6574\u53C2\u6570\u5C55\u793A"}),(0,r.jsx)(p.Z,{type:"text",value:Z,disabled:!0})]})]}),(0,r.jsxs)("div",{className:s.box,children:[(0,r.jsx)("h2",{children:" \u6B65\u9AA43: \u8FD0\u884C"}),(0,r.jsx)(p.Z.TextArea,{value:E.join(`
`),readOnly:!0,style:{height:200}}),(0,r.jsxs)("div",{className:s.btn__box,children:[(0,r.jsxs)(h.ZP,{type:"primary",onClick:ue,disabled:!U||!Z,children:[" ","\u8FD0\u884C"," "]}),_!==0&&(0,r.jsx)(v.Z,{percent:_}),(0,r.jsx)(h.ZP,{onClick:oe,children:" \u91CD\u7F6E "})]})]}),(0,r.jsxs)("div",{className:s.box,children:[(0,r.jsx)("h2",{children:" \u6B65\u9AA44: \u4E0B\u8F7D"}),(0,r.jsx)("div",{children:(0,r.jsx)(R,{videoSrc:ne,outputType:Y,inputType:L||""})})]})]})}}}]);
