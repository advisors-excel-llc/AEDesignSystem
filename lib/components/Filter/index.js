module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s="./src/components/Filter/index.jsx")}({"./src/components/Filter/context.jsx":function(e,t,r){"use strict";r.r(t),r.d(t,"Provider",function(){return a}),r.d(t,"Consumer",function(){return c}),r.d(t,"connect",function(){return u});var n=r("react"),o=r.n(n);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({filters:{},properties:{},modified:!1,setFilter:function(){},removeFilter:function(){},setFilterValue:function(){},getFilterValue:function(){return null},getFilter:function(){return null},setModified:function(){},setProperty:function(){},removeProperty:function(){},hasProperty:function(){}}),a=l.Provider,c=l.Consumer;function u(e){return function(t){var r=t.children,n=s(t,["children"]);return o.a.createElement(c,null,function(t){return o.a.createElement(e,i({},n,t),r)})}}},"./src/components/Filter/field/context.jsx":function(e,t,r){"use strict";r.r(t),r.d(t,"Provider",function(){return a}),r.d(t,"Consumer",function(){return c}),r.d(t,"connect",function(){return u});var n=r("react"),o=r.n(n);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({predicate:"is empty",setPredicate:function(){}}),a=l.Provider,c=l.Consumer;function u(e){return function(t){var r=t.children,n=s(t,["children"]);return o.a.createElement(c,null,function(t){return o.a.createElement(e,i({},n,t),r)})}}},"./src/components/Filter/field/index.jsx":function(e,t,r){"use strict";r.r(t);var n=r("react"),o=r.n(n),i=r("prop-types"),s=r.n(i),l=r("@salesforce/design-system-react/lib/components/filter"),a=r.n(l),c=r("@salesforce/design-system-react/lib/components/combobox"),u=r.n(c),p=r("./src/components/Filter/context.jsx"),f=r("./src/components/Filter/field/context.jsx");function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){y(e,t,r[t])})}return e}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function m(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var s,l=e[Symbol.iterator]();!(n=(s=l.next()).done)&&(r.push(s.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var b=function(e){var t=v(Object(n.useState)("is empty"),2),r=t[0],i=t[1],s=e.filters,l=e.removeFilter,c=e.setFilter,p=e.components,y=void 0===p?[]:p,b=e.filter,O=e.properties,g=m(e,["filters","removeFilter","setFilter","components","filter","properties"]),h=!!b.property&&Object.entries(O).filter(function(e){var t=v(e,1)[0];return b.property===t}).map(function(e){var t=v(e,2);return{id:t[0],label:t[1]}})||[],j=Object.keys(O).filter(function(e){return!Object.keys(s).includes(e)}).map(function(e){return{id:e,label:O[e]}}).concat(h).reduce(function(e,t){return t&&!e.map(function(e){return e.id}).includes(t.id)&&e.push(t),e},[]),w=!!b.property&&y.filter(function(e){return!(!e.props||!e.props.property)&&e.props.property===b.property}).pop();if(null!==b.value&&void 0!==b.value&&w&&"function"==typeof w.type.buildFieldPredicate){var F=w.type.buildFieldPredicate(b,w.props);F!==r&&i(F)}return(b.isNew||Object.keys(O).includes(b.property))&&o.a.createElement(a.a,{predicate:r,property:!!b.property&&O[b.property]||"New Filter",onRemove:function(){return l(b.id)},onClick:function(){var e=window.scrollY;document.hasOwnProperty("scrollingElement")&&(e=document.scrollingElement.scrollTop),setTimeout(function(){document.hasOwnProperty("scrollingElement")?document.scrollingElement.scrollTo({top:e}):window.scrollTo({top:e})},1)}},o.a.createElement("div",{className:"slds-p-around--small"},o.a.createElement(u.a,{options:j,labels:{label:"Field",placeholderReadOnly:"Select a Field"},required:!0,selection:h,events:{onSelect:function(e,t){var r=t.selection.pop().id;c(d({},b,{property:r,value:null}))}},variant:"readonly",disabled:!b.isNew})),o.a.createElement("div",{className:"slds-p-around--small"},o.a.createElement(f.Provider,{value:d({predicate:r,setPredicate:i,filters:s,removeFilter:l,setFilter:c,filter:b,properties:O},g)},w)))};b.propTypes={filter:s.a.shape({property:s.a.string,value:s.a.any,isNew:s.a.bool}).isRequired,components:s.a.arrayOf(s.a.node)},t.default=Object(p.connect)(b)},"./src/components/Filter/index.jsx":function(e,t,r){"use strict";r.r(t);var n=r("react"),o=r.n(n),i=r("prop-types"),s=r.n(i),l=r("@salesforce/design-system-react/lib/components/panel"),a=r.n(l),c=r("@salesforce/design-system-react/lib/components/panel/filtering/group"),u=r.n(c),p=r("@salesforce/design-system-react/lib/components/panel/filtering/list"),f=r.n(p),d=r("./src/components/Filter/field/index.jsx"),y=r("./src/components/Filter/context.jsx");function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){w(e,t,r[t])})}return e}function b(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function O(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var F=function(e){function t(){var e,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return w(h(r=function(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?h(e):t}(this,(e=g(t)).call.apply(e,[this].concat(o)))),"state",{modified:!1,activeFilters:{},properties:{},components:[]}),w(h(r),"addNewItem",function(){var e=t.generateId();r.setState({modified:!0,activeFilters:Object.assign({},r.state.activeFilters,w({},e,{id:e,isNew:!0,property:null,value:null}))})}),w(h(r),"compileFilterValues",function(){return Object.fromEntries(Object.values(r.state.activeFilters).map(function(e){return[e.property,e.value]}))}),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(t,o.a.Component),function(e,t,r){t&&O(e.prototype,t),r&&O(e,r)}(t,[{key:"shouldComponentUpdate",value:function(e,t){var r=e.children,n=t.components,o=[].concat(r);return n.length!==o.length||(this.state!==t||o.reduce(function(e,t){var r=n.filter(function(e){var r=e.props.property;return!!r&&t.props.property===r}).pop();return e||!!r&&JSON.stringify(t.props)!==JSON.stringify(r.props)},!1))}},{key:"render",value:function(){var e=this,t=this.props.children;return this.props.isOpen&&o.a.createElement("div",{className:"slds-grid_vertical-align-start slds-grow",style:this.props.style},o.a.createElement(a.a,{variant:"filters"},o.a.createElement(u.a,{modified:this.state.modified,variant:"panel",onClickAdd:this.addNewItem,onRequestCancel:function(){e.setState({modified:!1})},onRequestClose:function(){e.setState({modified:!1}),e.props.onClose()},onRequestSave:function(){e.props.onSave(e.compileFilterValues()),e.setState({modified:!1})},onClickRemoveAll:function(){e.setState({activeFilters:{},modified:e.state.modified||e.state.activeFilters!=e.props.filters})}},0===Object.keys(this.state.activeFilters).length&&o.a.createElement("div",{className:"slds-align_absolute-center"},o.a.createElement("p",{className:"slds-text-heading"},"No filters ",this.state.modified?"will be applied to the results upon save":"have been applied to the current results")),o.a.createElement(f.a,null,o.a.createElement(y.Provider,{value:{filters:this.state.activeFilters,properties:this.state.properties,modified:this.state.modified,setModified:function(t){return e.setState({modified:t})},setFilter:function(t){var r=t.id,n=b(t,["id"]);if(!r)throw new Error("`id` is a required property when adding a filter");e.setState({modified:!0,activeFilters:v({},e.state.activeFilters,w({},r,v({},n,{id:r})))})},removeFilter:function(t){if(!t)throw new Error("`id` is required when removing a filter");var r=Object.assign({},e.state.activeFilters);delete r[t],e.setState({modified:!0,activeFilters:r})},getFilter:function(t){return e.state.activeFilters[t]},setFilterValue:function(t,r){if(e.state.activeFilters.hasOwnProperty(t)){var n=Object.assign({},e.state.activeFilters[t]);n.value=r,e.setState({modified:!0,activeFilters:Object.assign({},e.state.activeFilters,w({},t,n))})}},getFilterValue:function(t){var r=e.state.activeFilters[t];return r?r.value:null},setProperty:function(t,r){e.setState({properties:v({},e.state.properties,w({},t,r))})},removeProperty:function(t){var r=Object.assign({},e.state.properties);delete r[t],e.setState({properties:r})},hasProperty:function(t){return!!e.state.properties[t]}}},Object.values(this.state.activeFilters).map(function(e){return o.a.createElement(d.default,{filter:e,components:t instanceof Array?t:[t],key:e.id})}))))))}}],[{key:"getDerivedStateFromProps",value:function(e,r){var n=r.activeFilters,o=void 0===n?{}:n;if(r.modified)return r;var i=e.filters,s=void 0===i?{}:i,l=e.children,a=[].concat(l),c=Object.fromEntries(a.map(function(e){var t=e.props,r=t.property;return[r,t.label||r]}));return s!==o?v({},r,{activeFilters:Object.fromEntries(s.filter(function(e){var t=e.property;return Object.keys(c).includes(t)}).map(function(e){return e.hasOwnProperty("id")&&e.id?[e.property,v({},e,{isNew:!1})]:[e.property,v({},e,{id:e.property||t.generatedId(),isNew:!1})]})),components:a,properties:c}):r}},{key:"generateId",value:function(){return(new Date).getTime()*(1e3*Math.random()).toFixed(0).toString()}}]),t}();w(F,"propTypes",{isOpen:s.a.bool,onClose:s.a.func,onSave:s.a.func,style:s.a.oneOfType([s.a.object,s.a.string]),filters:s.a.arrayOf(s.a.shape({property:s.a.string.isRequired,value:s.a.any,isNew:s.a.bool})).isRequired}),w(F,"defaultProps",{isOpen:!1,onClose:function(){},onSave:function(){},filters:[],values:[],style:{}}),t.default=F},"@salesforce/design-system-react/lib/components/combobox":function(e,t){e.exports=require("@salesforce/design-system-react/lib/components/combobox")},"@salesforce/design-system-react/lib/components/filter":function(e,t){e.exports=require("@salesforce/design-system-react/lib/components/filter")},"@salesforce/design-system-react/lib/components/panel":function(e,t){e.exports=require("@salesforce/design-system-react/lib/components/panel")},"@salesforce/design-system-react/lib/components/panel/filtering/group":function(e,t){e.exports=require("@salesforce/design-system-react/lib/components/panel/filtering/group")},"@salesforce/design-system-react/lib/components/panel/filtering/list":function(e,t){e.exports=require("@salesforce/design-system-react/lib/components/panel/filtering/list")},"prop-types":function(e,t){e.exports=require("prop-types")},react:function(e,t){e.exports=require("react")}});