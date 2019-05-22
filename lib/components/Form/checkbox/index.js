module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s="./src/components/Form/checkbox/index.jsx")}({"./src/components/Form/checkbox/index.jsx":function(e,r,t){"use strict";t.r(r);var n=t("react"),o=t.n(n),c=t("prop-types"),u=t.n(c),a=t("formik"),i=t("@salesforce/design-system-react/lib/components/checkbox"),l=t.n(i);function f(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(){return(s=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var p=function(e){return o.a.createElement(a.FastField,e,function(r){var t=r.form,n=r.field,c=e.trueValue,u=void 0===c||c,i=e.falseValue,f=void 0!==i&&i,p=e.onChange,b=void 0===p?function(){}:p,d=n.name,y=n.value,m=t.setFieldValue,O=t.errors,g=t.submitCount,v=t.handleBlur,h=(Object(a.getIn)(t.touched,d)||g>0)&&Object(a.getIn)(O,d);return o.a.createElement(l.a,s({},e,{errorText:h,checked:y===u,onChange:function(e,r){var t=r.checked,n=t?u:f;m(d,n),b(e,{checked:t,value:n})},onBlur:v}))})},b=l.a.propTypes,d=(b.checked,b.defaultChecked,b.errorText,function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(b,["checked","defaultChecked","errorText"]));p.propTypes=function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(r){f(e,r,t[r])})}return e}({},d,{name:u.a.string.isRequired,trueValue:u.a.any,falseValue:u.a.any,onChange:u.a.func}),r.default=p},"@salesforce/design-system-react/lib/components/checkbox":function(e,r){e.exports=require("@salesforce/design-system-react/lib/components/checkbox")},formik:function(e,r){e.exports=require("formik")},"prop-types":function(e,r){e.exports=require("prop-types")},react:function(e,r){e.exports=require("react")}});