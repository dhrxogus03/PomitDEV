define("DS/ENODOTitleRules/Views/DOTitleRuleListView",["UWA/Class/View","DS/Utilities/Dom","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel","DS/TreeModel/DataModelSet","DS/DataGridView/DataGridView","DS/ENODOTitleRules/Views/DOTitleTbar","DS/ENODOTitleRules/Views/DOTitleRuleCreate","DS/UIKIT/Input/Button","DS/ENODerivedFormatEssentials/Utils/DerivedFormatUtil","css!DS/ENODOTitleRules/ENODOTitleRuleView"],function(e,t,a,i,n,r,o,l,d,s){var c,u,m;return e.extend({tagName:"div",className:"edfm-namerule-listview",tapedTwice:!1,setup:function(e){var t=this;derivedformatmanagementinfra.servererror||(t.setupTbar(),t.setupListView(),t.setupApplyResetToolbar(),widget.addEvent("onResize",t.adjust)),this.listenTo(t.collection,"onAdd",t.doTitleRuleCreatePostProcess.bind(null,t)),this.listenTo(t.collection,"onChange",t.doTitleRuleEditPostProcess.bind(null,t)),this.listenTo(t.collection,"onRemove",t.doTitleRuleDeletePostProcess.bind(null,t))},render:function(e){return e&&e.container&&this.container.inject(e.container),this},setupApplyResetToolbar:function(){var e,t,a,i,n,r=this;return e=UWA.createElement("div",{class:"nametab-list-applyResetDiv",styles:{bottom:"0",right:"0",position:"fixed"}}).inject(r.container),t=UWA.createElement("table",{class:"",id:"",width:"100%"}).inject(e),a=UWA.createElement("tr").inject(t),i=UWA.createElement("td",{width:"45%",Align:"left"}).inject(a),new d({className:"primary",id:"buttonExportNameTab",icon:"export",attributes:{disabled:!1,title:derivedformatmanagementinfra.getNLSData().button.applyTitle,text:derivedformatmanagementinfra.getNLSData().button.apply},events:{onClick:function(){r.applyRules(r)}}}).inject(i).getContent().setStyle("width",130),n=UWA.createElement("td",{width:"45%",Align:"right"}).inject(a),new d({className:"warning",icon:"loop",attributes:{disabled:!1,title:derivedformatmanagementinfra.getNLSData().button.resetTitle,text:derivedformatmanagementinfra.getNLSData().button.reset},events:{onClick:function(){r.resetButton(r)}}}).inject(n).getContent().setStyle("width",130),e},applyRules:function(e){e.collection.length&&e.collection.applyRules()},resetButton:function(e){var t=m.getChildren(),a=new Array;if(t){for(idx=0;idx<t.length;idx++)node=t[idx].options.grid,a.push(node);e.collection.remove(a)}e.collection.fetch()},setupTbar:function(){var e=this;new o({actions:[{icon:"plus",label:derivedformatmanagementinfra.getNLSData().button.addRule,hasAccess:!0,handler:e.createDOTitleRule.bind(null,e)},{icon:"trash",label:derivedformatmanagementinfra.getNLSData().button.deleteRule,hasAccess:!0,handler:e.deleteDOTitleRule.bind(null,e)}]}).render({container:e.container})},createDOTitleRule:function(e){new l({collection:e.collection,event:e.event}).render({container:void 0})},deleteDOTitleRule:function(e){var t=m.getSelectedNodes(),a=new Array,i=new Array,n=!1;if(t)for(var r=t.length,o=0;o<r;o++){var l=t[o],d=e.collection.get(l.options.grid);"deleted"!=d.get("action")&&(d.id?(n=!0,i.push(d)):a.push(d))}n?s.confimationModal(function(t){e.collection.setToBeDeleted(i),e.collection.remove(a),t.hide()},"delete"):e.collection.remove(a)},setupListView:function(){var e=this;u=new n,m=new a({dataModelSet:u}),_doTitleListViewDiv=UWA.createElement("div",{class:"dfm-nameruleslist-view",styles:{}}).inject(e.container),(c=new r({scrollable:!0,treeDocument:m,cellSelection:"none",height:widget.body.clientHeight-130,rowSelection:"multiple",columns:[{text:derivedformatmanagementinfra.getNLSData().label.contentType,dataIndex:"type",width:"30%"},{text:derivedformatmanagementinfra.getNLSData().label.titleRule,dataIndex:"doTitle",width:"40%"},{text:derivedformatmanagementinfra.getNLSData().label.deployStatus,dataIndex:"status",width:"20%",typeRepresentation:"icon"}],defaultColumnDef:{width:"auto",typeRepresentation:"string",editableFlag:!1,resizableFlag:!0,sortableFlag:!0}}).inject(_doTitleListViewDiv)).getContent().addClassName("dotitle-datagridview"),t.addEventOnElement(c,c,"click",function(t,a){if(!e.tapedTwice)return e.tapedTwice=!0,setTimeout(function(){e.tapedTwice=!1},600),!1;var i=a.nodeModel.options.grid,n=e.collection.get(i);"deleted"!=n.get("action")&&new l({event:e.event,collection:e.collection,container:void 0,selection:n}).render()}),e.customizeLayout()},customizeLayout:function(){c.layout.columnHeaderHeight=40,c.layout.cellHeight=35,c.layout.collectionView.showRowBorderFlag=!0},getDeployStatusIcon:function(e){var t,a=this,i=e.get("action");switch(i){case"deployed":t=a.buildImgSpan("check","green",i);break;case"notdeployed":t=a.buildImgSpan("cog","orange",i);break;case"created":t=a.buildImgSpan("cog","black",i);break;case"updated":t=a.buildImgSpan("pencil","orange",i);break;case"deleted":t=a.buildImgSpan("trash","red",i)}return t},buildImgSpan:function(e,t,a){return"fonticon fonticon-1x fonticon-"+e+" dfm-action-icon-"+t},doTitleRuleCreatePostProcess:function(e,t){var a={current:derivedformatmanagementinfra.getNLSData().label.attrMaturity,revision:derivedformatmanagementinfra.getNLSData().label.attrRevision,name:derivedformatmanagementinfra.getNLSData().label.attrName,"attribute[PLMEntity.V_Name]":derivedformatmanagementinfra.getNLSData().label.attrTitle,"relationship[VPMRepInstance].from.attribute[EnterpriseExtension.V_PartNumber]":derivedformatmanagementinfra.getNLSData().label.attrEIN,"attribute[PLMEntity.V_description]":derivedformatmanagementinfra.getNLSData().label.attrDescription,"":derivedformatmanagementinfra.getNLSData().label.noAttribute},n=t.get("attributes");if(n){for(var r=[],o=0;o<n.length;o++){var l=a[n[o]];r.push(l)}m.prepareUpdate();var d=t.get("type"),s=t.get("separator"),c="";if(r){for(o=0;o<r.length;o++)""!==r[o]&&"No Attribute"!==r[o]&&(c+=`\${${r[o]}}${s}`);c.endsWith(s)&&""!=s&&(c=c.slice(0,-s.length))}var g=e.getDeployStatusIcon(t),f={id:t.id,cid:t.cid,type:d,attributes1:r?[r[0]]:"",attributes2:r?[r[1]]:"",attributes3:r?[r[2]]:"",separator:s,doTitle:c,status:g},p=i.createTreeNodeDataModel(u,{label:f.text,grid:f});m.addChild(p),m.pushUpdate()}},doTitleRuleEditPostProcess:function(e,t){var a={current:derivedformatmanagementinfra.getNLSData().label.attrMaturity,revision:derivedformatmanagementinfra.getNLSData().label.attrRevision,name:derivedformatmanagementinfra.getNLSData().label.attrName,"attribute[PLMEntity.V_Name]":derivedformatmanagementinfra.getNLSData().label.attrTitle,"relationship[VPMRepInstance].from.attribute[EnterpriseExtension.V_PartNumber]":derivedformatmanagementinfra.getNLSData().label.attrEIN,"attribute[PLMEntity.V_description]":derivedformatmanagementinfra.getNLSData().label.attrDescription,"":derivedformatmanagementinfra.getNLSData().label.noAttribute};m.prepareUpdate();for(var i=m.getChildren(),n=i.length,r=0;r<n;r++){var o=i[r];if(o.options.grid.cid==t.cid){for(var l=t.get("separator"),d=t.get("attributes"),s=[],c=0;c<d.length;c++){var u=a[d[c]];s.push(u)}var g="";if(s){for(c=0;c<s.length;c++)""!==s[c]&&"No Attribute"!==s[c]&&(g+=`\${${s[c]}}${l}`);g.endsWith(l)&&""!=l&&(g=g.slice(0,-l.length))}var f=e.getDeployStatusIcon(t);o.updateOptions({grid:{status:f,attribute1:s[0]?s[0]:"",attribute2:s[1]?s[1]:"",attribute3:s[2]?s[2]:"",doTitle:g,separator:l}});break}}m.pushUpdate()},doTitleRuleDeletePostProcess:function(e,t){m.prepareUpdate();for(var a=m.getChildren(),i=a.length,n=0;n<i;n++){var r=a[n],o=r.options.grid.id,l=r.options.grid.cid;if(o&&o==t.id){r.remove();break}if(l&&l==t.cid){r.remove();break}}m.pushUpdate()},adjust:function(){c.height=document.getElementsByClassName("facetviews")[1].clientHeight-90}})});