define("DS/CSICommandBinder/CSIAsyncType",["DS/ExperienceKernel/ExperienceKernel","DS/CSICommandBinder/CSIParameters","DS/CSICommandBinder/CSIErrorReport"],function(e,t,i){"use strict";var o=!1;function n(e,t){if(o){var i="GetActiveTypes Usage";void 0!==e&&(i=void 0!==t&&t.length>0?"Call to function "+e+": incomplete types : ["+t+"] must be declared! See: http://executionfw.dsone.3ds.com/docs/csi/BasicDocumentation/Type/?h=declaretype#serialization":"Call to function "+e+": incomplete types must be declared! See: http://executionfw.dsone.3ds.com/docs/csi/BasicDocumentation/Type/?h=declaretype#serialization"),console.warn("CSI DEPRECATED: "+i+" CSI>")}}"undefined"!=typeof window&&void 0!==window.__karma__&&(o=!0);var s={storedFunctionCallList_:[],jsModuleMap_:{},poolMap_:{}};s.execute=function(){return this.storedFunctionCallList_.forEach(function(e){if(!e.execute())return!1}),this.storedFunctionCallList_=[],!0},s.storeFunction=function(e){return!(e.node.complete_||!function(e){for(var i=0;i<e.length;++i)if(e[i]instanceof t&&e[i].isIncomplete())return!0;return!1}(e.parameters))&&(this.storedFunctionCallList_.push(new r(e)),!0)};var r=function(e){this.node_=e.node,this.messageBuilder_=e.messageBuilder,this.parameters_=e.parameters,this.interruption_=e.interruption,this.iterative_=e.iterative,void 0!==e.functionRequest&&(this.functionRequest_=e.functionRequest,n(this.functionRequest_.name+"_v"+this.functionRequest_.version)),void 0!==e.commandRequest&&(this.commandRequest_=e.commandRequest),void 0!==e.iterativeCommandRequest&&(this.iterativeCommandRequest_=e.iterativeCommandRequest),void 0!==e.userCommandRequest&&(this.userCommandRequest_=e.userCommandRequest),this.functionGuid_=e.functionGuid,void 0!==e.userCommandRequest&&(this.userCommandRequest_=e.userCommandRequest,n(this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version))};return r.prototype.execute=function(){for(var e=[],o=0;o<this.parameters_.length;++o)if(this.parameters_[o]instanceof t&&!this.parameters_[o].complete(e)){if(this.functionRequest_)return i.error("Error: could not call function "+this.functionRequest_.name+"_v"+this.functionRequest_.version+"() because type(s): ["+this.parameters_[o].getIncompleteRequiredTypes()+"] could not be serialized");if(this.userCommandRequest_)return 0===this.iterative_?i.error("Error: could not call iterative command (begin) "+this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version+"() because type(s): ["+this.parameters_[o].getIncompleteRequiredTypes()+"] could not be serialized"):1===this.iterative_?i.error("Error: could not call iterative command (do) "+this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version+"() because type(s): ["+this.parameters_[o].getIncompleteRequiredTypes()+"] could not be serialized"):2===this.iterative_?i.error("Error: could not call iterative command (end) "+this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version+"() because type(s): ["+this.parameters_[o].getIncompleteRequiredTypes()+"] could not be serialized"):i.error("Error: could not call command "+this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version+"() because type(s): ["+this.parameters_[o].getIncompleteRequiredTypes()+"] could not be serialized")}return this.functionRequest_?(n(this.functionRequest_.name+"_v"+this.functionRequest_.version,e),this.node_.callInternal(this.functionRequest_,this.functionGuid_,this.messageBuilder_,this.interruption_)):this.commandRequest_?(n(this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version,e),this.commandRequest_.send(this.parameters_[0],this.parameters_[1],this.parameters_[2])):this.iterativeCommandRequest_&&(n(this.userCommandRequest_.command+"_v"+this.userCommandRequest_.version,e),0===this.iterative_?this.iterativeCommandRequest_.begin(this.parameters_[0]):1===this.iterative_?this.iterativeCommandRequest_.send(this.parameters_[0]):2===this.iterative_&&this.iterativeCommandRequest_.end(this.parameters_[0])),!0},s.getActiveTypes=function(i,o,n,r){if(void 0!==e.window&&void 0===s.poolMap_[r]){s.poolMap_[r]=!1,t.prototype.checkForIncomplete_=!0;o.call({destinationNodeId:n,name:"csiGetActiveTypes",version:3,parameters:void 0,onSuccess:function(n){var a=[],u=n.readParametersArray("types","CSIDeclarativeTypeDefinition");if(u instanceof Array){for(var m=[],d=void 0,c=0;c<u.length;++c){var p=u[c];if(void 0!==p&&"CSIDeclarativeTypeDefinition"===p.typeName_){var _=p.toJSObject();d=void 0===_.implementation?void 0:_.implementation.jsModule,void 0!==_.name&&void 0===t.prototype.typeDefinitions_[_.name]&&(t.prototype.typeDefinitions_[_.name]=_,void 0!==d&&d.length>0&&void 0===s.jsModuleMap_[d]&&(m.push(d),a.push(_.name)))}}e.window.require(m,function(){for(var e=0;e<arguments.length;++e){var n=a[e],u=arguments[e],m=t.prototype.typeDefinitions_[n].implementation.jsModule;u.declareType instanceof Function&&(s.jsModuleMap_[m]=u,void 0===t.prototype.serializeMap_[n]&&u.declareType(i,n))}s.poolMap_[r]=!0,t.prototype.checkForIncomplete_=function(){for(var e in s.poolMap_)if(!s.poolMap_[e])return!0;return!1}(),o.complete_=!0,s.execute()})}},onProgress:void 0,onError:function(){}})}},s});