define("DS/ENODODisplayPSE/commands/facets/DerivedOutputFacet",["DS/ENODODisplay/commands/facets/DerivedOutputFacet","UWA/Core","UWA/Controls/Abstract","UWA/Class","DS/PADUtils/PADContext"],function(e,t,i,n,r){"use strict";return e.extend({_actionAuthorized:!1,_currentSelectionId:null,init:function(e){this._parent(e)},isActionAvailable:function(e){return 1==this._actionAuthorized&&"generateDeriveOutput"==e||this._parent(e)},onAction:function(e){if("generateDeriveOutput"===e){var t=this,i=r.get(),n=i.options.model?i.options.model:i.getPADTreeDocument(),o={};null!=this._selectionInfo&&(o=this._selectionInfo.getDOGenerationFilter()),require(["DS/ENODOManagementCmdsLight/commands/GenericDOGenerationCmd"],function(e){var r=n.getSelectedNodes(),s=t._retrieveSelectionAndFilters(i,r);new e({command_id:t.options.ID,data:{selections:s.selections,context:widget.data.appId,filter:o}})})}else this._parent(e)},_retrieveFilteOnSelection:function(){var e=r.get(),t=(e.options.model?e.options.model:e.getPADTreeDocument()).getSelectedNodes(),i=this._retrieveSelectionAndFilters(e,t);return i.selections.length>0?i.selections[0]:{}},_retrieveSelectionAndFilters:function(e,i){var n={selections:[]},r=[],o=[];for(h=0;h<i.length;h++){var s=i[h],a=s.getOccurencePath(),l=s.getID(),c=new RegExp("^[0-9a-f.]+$");if(!t.is(l)||!c.test(l.toLowerCase()))throw nls.error.invalidPhID;var u=s.getRoot().getID(),d=r.indexOf(u);if(-1===d){r.push(u);var p=[a];o.push(p)}else o[d]&&o[d].push(a)}for(var h=0;h<r.length;h++){p={};var f=[];f.push(r[h]),p.paths=f;var D={filter:{all:1}};if(e.GetFilterSpec){var g=this.prefixPath(o[h]);D=e.GetFilterSpec(r[h],{V2:{prefixPathArray:g}}),p.filter=D.filter}n.selections.push(p)}return console.log(n),n},prefixPath:function(e){return e.map(e=>({physical_id_path:e}))}})});