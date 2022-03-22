!function(){"use strict";function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},e.apply(this,arguments)}var t=window.wp.element,r=window.wp.blocks,o=window.wp.blockEditor,s=window.wp.i18n,i=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"happyprime/show-hide-section","title":"Show Hide Section","textdomain":"happy-prime","category":"widgets","description":"A section of collapsible content.","icon":"media-document","parent":["happyprime/show-hide-group"],"attributes":{"htmlId":{"type":"string","source":"attribute","selector":"details","attribute":"id"},"isOpen":{"type":"boolean","default":"false"},"summary":{"type":"string","source":"text","selector":"summary"}},"supports":{"anchor":true,"html":false,"multiple":true},"editorScript":"file:../../build/show-hide-section.js"}');(0,r.registerBlockType)(i,{edit:r=>{const i=(0,o.useBlockProps)(),{attributes:{isOpen:a,summary:n},setAttributes:l}=r;return(0,t.createElement)("details",e({},i,{open:a}),(0,t.createElement)(o.RichText,{tagName:"summary",label:(0,s.__)("Summary","happy-prime"),hideLabelFromVision:!0,placeholder:(0,s.__)("Summary","happy-prime"),value:n,allowedFormats:["core/bold","core/italic"],onChange:e=>{l({summary:e})}}),(0,t.createElement)(o.InnerBlocks,null))},save:r=>{const s=o.useBlockProps.save(),{attributes:{htmlId:i,summary:a}}=r;return(0,t.createElement)("details",e({},s,{id:i}),(0,t.createElement)("summary",null,a),(0,t.createElement)(o.InnerBlocks.Content,null))}})}();