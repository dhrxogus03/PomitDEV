define("UWA/Controls/Lightbox",["UWA/Core","UWA/Controls/Overlay"],function(t,n){"use strict";var e=n.extend({getInnerElement:function(){return this.elements.container},setContent:function(t){return this.getInnerElement().setContent(t),this},addContent:function(t){return this.getInnerElement().addContent(t),this}});return t.namespace("Controls/Lightbox",e,t)});