module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s="./src/components/Pager/index.jsx")}({"./src/components/Pager/index.jsx":function(t,e,n){"use strict";n.r(e);var o=n("react"),i=n.n(o),r=n("prop-types"),a=n.n(r),u=n("@salesforce/design-system-react/lib/components/button-group"),s=n.n(u),l=n("@salesforce/design-system-react/lib/components/button"),c=n.n(l);var p=function(t){var e=[];return t.total<1||t.limit<1||Math.ceil(t.total/t.limit)<1?null:(t.visibleItems>0&&(e=function(t,e,n){var o=Math.floor(n/2),i=Math.max(0,Math.min(e-n,t-o)),r=Math.min(i+n,e);return Array.from({length:Math.max(0,r-i)},function(t,e){return e+i})}(t.page,Math.ceil(t.total/t.limit),t.visibleItems).map(function(e){return i.a.createElement(c.a,{type:"button",key:"button-".concat(e),label:e+1,onClick:function(){return t.onChange(e,t.limit)},variant:e===t.page?"brand":"neutral"})})),t.showSkip&&t.skip>0&&(t.page>=t.skip&&e.unshift(i.a.createElement(c.a,{type:"button",key:"button-prev-skip",assistiveText:{icon:"Skip Previous ".concat(t.skip," Pages")},iconName:"threedots",iconCategory:"utility",iconSize:"medium",iconVariant:"border-filled",onClick:function(){return t.onChange(Math.max(0,t.page-t.skip),t.limit)}})),t.page<Math.ceil(t.total/t.limit)-t.skip+1&&e.push(i.a.createElement(c.a,{type:"button",key:"button-next-skip",assistiveText:{icon:"Skip Next ".concat(t.skip," Pages")},iconName:"threedots",iconCategory:"utility",iconSize:"medium",iconVariant:"border-filled",onClick:function(){return t.onChange(Math.min(Math.floor(t.total/t.limit),t.page+t.skip),t.limit)}}))),t.showNextPrev&&(e.unshift(i.a.createElement(c.a,{type:"button",key:"button-prev",label:t.prevButtonLabel,iconCategory:t.prevButtonIconCategory,iconName:t.prevButtonIconName,iconPosition:"left",iconSize:"small",disabled:0===t.page,onClick:function(){return t.onChange(t.page-1,t.limit)}})),e.push(i.a.createElement(c.a,{type:"button",key:"button-next",label:t.nextButtonLabel,iconCategory:t.nextButtonIconCategory,iconName:t.nextButtonIconName,iconPosition:"right",iconSize:"small",disabled:t.page*t.limit>=Math.max(0,t.total-t.limit),onClick:function(){return t.onChange(t.page+1,t.limit)}}))),i.a.createElement(s.a,null,e))};p.defaultProps={visibleItems:5,showNextPrev:!0,showSkip:!0,skip:5,limit:25,nextButtonLabel:"Next",nextButtonIconCategory:"utility",nextButtonIconName:"forward",prevButtonLabel:"Previous",prevButtonIconCategory:"utility",prevButtonIconName:"back",onChange:function(){}},p.propTypes={visibleItems:a.a.number,showNextPrev:a.a.bool,showSkip:a.a.bool,skip:a.a.number,nextButtonLabel:a.a.string,nextButtonIconName:a.a.string,nextButtonIconCategory:a.a.string,prevButtonLabel:a.a.string,prevButtonIconName:a.a.string,prevButtonIconCategory:a.a.string,page:a.a.number.isRequired,limit:a.a.number,total:a.a.number.isRequired,onChange:a.a.func},e.default=p},"@salesforce/design-system-react/lib/components/button":function(t,e){t.exports=require("@salesforce/design-system-react/lib/components/button")},"@salesforce/design-system-react/lib/components/button-group":function(t,e){t.exports=require("@salesforce/design-system-react/lib/components/button-group")},"prop-types":function(t,e){t.exports=require("prop-types")},react:function(t,e){t.exports=require("react")}});