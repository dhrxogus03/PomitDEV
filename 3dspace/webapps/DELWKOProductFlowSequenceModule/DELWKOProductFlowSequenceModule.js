define("DS/DELWKOProductFlowSequenceModule/DELWKOProductFlowComponent",["UWA/Core"],function(e){"use strict";return function(t,n){var i,o,r,a,c,s,d,l,u,f,g,p,h,m,y,P,I,v,D,E,C,N,L,R,w,S,T,A,k,b,F,x,M,O,V,B,G,W,j,U=t.getComponent("EGraphCore"),_=t.getComponent("EGraphViews"),K=t.getComponent("EGraphIact"),H=t.getComponent("EGraphUtils"),Y=(t.getComponent("Button"),t.getComponent("Breadcrumb"),t.getComponent("ContextualMenuManager")),X=t.getComponent("TooltipModel"),Q=0,q=!1,z={},$=[];return r=!!e.is(n.readOnly)&&n.readOnly,s=e.is(n.nodes)?n.nodes:[],d=e.is(n.links)?n.links:[],!!e.is(n.detectLoop,"boolean")&&n.detectLoop,a=e.is(n.nodeOptions)?n.nodeOptions:[],l=e.is(n.identifier)?n.identifier:"",u=e.is(n.getNodeContextMenu,"function")?n.getNodeContextMenu:null,f=e.is(n.getLinkContextMenu,"function")?n.getLinkContextMenu:null,p=e.is(n.onConnectingNodes)?n.onConnectingNodes:null,e.is(n.onNodeSelection)&&n.onNodeSelection,k=e.is(n.onNodeDoubleClick,"function")?n.onNodeDoubleClick:null,B=e.is(n.onNodeSelectionChange,"function")?n.onNodeSelectionChange:null,o=function(){_.HTMLNodeView.call(this)},i=function(e){_.SVGEdgeView.call(this,e)},i.prototype.createTextEdgeView=function(e,t,n){var i,o="http://www.w3.org/2000/svg";(i=document.createElementNS(o,"textPath")).setAttributeNS("http://www.w3.org/1999/xlink","href","#"+this.display.elt.id),i.setAttribute("startOffset","10%"),""===e.mark?i.appendChild(document.createTextNode("")):e.mark.hasOwnProperty(t)&&(i.appendChild(document.createTextNode(e.mark[t])),n++),this.display.text=document.createElementNS(o,"text"),this.display.text.setAttribute("dy",-14*(n-1)+12),this.display.text.grElt=e,H.classListAdd(this.display.text,"edge-text"),this.display.text.appendChild(i),""!==i.innerHTML&&this.structure.root.appendChild(this.display.text)},i.prototype.oncreateDisplay=function(e){var t=this,n=0;_.SVGEdgeView.prototype.oncreateDisplay.apply(this,arguments),this.display.elt.id=Math.random(),this.display.elt.textContent="official",infos="Type",Array.isArray(infos)||(infos=[infos]),infos.forEach(function(i){t.createTextEdgeView(e,i,n),n++})},v=function(e){return/^(auto|0)$|^[+-]?[0-9]+.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc|rem)$/.test(e)},A=function(){return"SEQUENCE"===c},m=function(){var t=e.createElement("div",{class:"input-node my-node"}),n=e.createElement("img",{class:"my-node-type-img"}),i=e.createElement("div",{class:"my-node-container"}),o=e.createElement("div",{class:"my-node-col left"}),r=e.createElement("div",{class:"my-node-col right"}),a=e.createElement("div",{class:"myNodeLinkEdit"}),c=e.createElement("div",{class:"my-node-text"});return t.setStyles({width:"50px",height:"50px"}),c.setStyles({top:"0px"}),r.appendChild(c),t.appendChild(n),t.appendChild(i),t.appendChild(o),t.appendChild(r),t.appendChild(a),t},P=function(t,n){var i,o=n.grElt,a=n.clientPos[0],c=n.clientPos[1];e.is(o)&&!r&&(o.type===U.Type.NODE?(e.is(o.gr.selection.first)&&o.gr.selection.first.PID!==o.PID?(h.removeFromSelection(o.gr.selection.first),h.addToSelection(o)):null===o.gr.selection.first&&h.addToSelection(o),u&&(i=u(o.model))):o.type===U.Type.EDGE&&e.is(o.mark)&&f&&(i=f(o.mark)),e.is(i)&&(i=Array.isArray(i)?i:[i],Array.isArray(i)&&Y.show({nodes:i},[a,c])))},L=function(e,t,n){var i;return i=new U.Connector,!0===n&&(i.views.main=new _.SVGConnView("egraph_views_SVGConnView egraph_views_mySVGConnView")),i.multiset(["cstr","attach"],e,["cstr","offset"],40),i},R=function(t){e.is(t.connectors)||(t.connectors={}),t.connectors.in=L(U.BorderCstr.LEFT,0,!0),t.connectors.in.id="in_"+t.id,t.appendConnector(t.connectors.in),t.connectors.out=L(U.BorderCstr.RIGHT,0,!0),t.connectors.out.id="out_"+t.id,t.appendConnector(t.connectors.out),"HIERARCHY"===c&&(t.connectors.outInstance=L(U.BorderCstr.BOTTOM,0,!1),t.appendConnector(t.connectors.outInstance))},w=function(t,n,o){var r,a;return a="-productFlow",e.is(o.linkInfo.subType)&&("DELLmiTimeConstraintCnx_FinishToStart"===o.linkInfo.subType?a="-timeConstraint":"DELLmiTimeConstraintCnx_StartToStart"===o.linkInfo.subType?a="-timeConstraint":"DELLmiTimeConstraintCnx_FinishToFinish"===o.linkInfo.subType?a="-timeConstraint":"DELLmiExecTimeConstraintFailed"===o.linkInfo.subType?a="-timeConstraint-Failed":"DELLmiExecTimeConstraintAlternative"===o.linkInfo.subType&&(a="-timeConstraint-Alternative")),(r=new U.Edge).set("geometry",new U.AutoBezierGeometry),r.views.main=new i("egraph_views_SVGEdgeView my-sec-edge-view"+a),r.mark=o,h.addEdge(t,n,r),r},G=function(t,n){var i="";a.forEach(function(o){var r=Array.isArray(o)?o:[o],a=new e.Element("div",{class:"my-node-line"});r.forEach(function(n){var o,c,s=new e.Element("span",{class:"my-node-word"}),d="";n.fontSize&&v(n.fontSize)&&(c=n.fontSize),o=n.maxWidth&&v(n.maxWidth)?n.maxWidth:100/r.length+"%",e.is(t[n.property])&&(n.displayTitle&&(d=n.title+" : "),d+=t[n.property]),s.setText(d),s.setStyles({fontWeight:n.fontWeight,color:n.color,maxWidth:o,fontSize:c}),i+=d,i+=" ",s.inject(a)}),i+="\n",a.inject(n)}),n.tooltipInfos=new X({shortHelp:i})},I=function(t,n,i){var r=new U.Node,c=t.id;return c=c.replace(new RegExp(",","g"),"_"),r.views.main=new o,r.model=t,r.PID=t.id,r.id="node_"+c,r.multiset("left",n,"top",i,"width",250,"height",90),R(r),o.prototype.buildNodeElement=function(t){var n,i,o,r;return e.is(t)&&(i=t.model,(n=m()).addClassName("egraph_views_HTMLNodeView_Node "+i.className+" "+i.id),e.is(i.icon)&&e.is(i.icon.iconPath)&&(o=n.getElementsByClassName("my-node-type-img")[0],e.is(o)&&(o.src=i.icon.iconPath))),r=n.getElementsByClassName("my-node-container")[0],e.is(i)&&e.is(r)&&a.length>0&&G(i,r),n},r},N=function(){var t,n,i,o,r=e.extendElement(document.createElementNS("http://www.w3.org/2000/svg","svg")),a=e.extendElement(document.createElementNS("http://www.w3.org/2000/svg","defs")),c=e.extendElement(document.createElementNS("http://www.w3.org/2000/svg","marker")),s=e.extendElement(document.createElementNS("http://www.w3.org/2000/svg","path"));r.appendChild(a),a.appendChild(c),c.appendChild(s),r.setAttribute("width","0"),r.setAttribute("height","0"),r.setAttribute("style","position:absolute;"),c.setAttribute("id","arrow-edge-end-marker"),c.setAttribute("markerWidth","10"),c.setAttribute("markerHeight","8"),c.setAttribute("refX","8"),c.setAttribute("refY","4"),c.setAttribute("orient","auto"),s.setAttribute("d","M 0 0 L 10 4 L 0 8"),s.setAttribute("fill","#777"),s.setAttribute("stroke","none"),s.setAttribute("z-index","10"),(t=c.cloneNode(!0)).setAttribute("id","arrow-edge-end-productFlowMarker"),a.appendChild(t),(n=c.cloneNode(!0)).setAttribute("id","arrow-edge-end-timeConstraintMarker"),a.appendChild(n),(i=c.cloneNode(!0)).setAttribute("id","arrow-edge-end-timeConstraint-Alternative-Marker"),a.appendChild(i),(o=c.cloneNode(!0)).setAttribute("id","arrow-edge-end-timeConstraint-Failed-Marker"),a.appendChild(o),(D=e.createElement("div",{class:"canvas-gv",id:"canvas-"+l})).addEvent("contextmenu",function(t){e.Event.stop(t)}),D.setStyles({width:"100%",height:"calc(100% - 52px)","background-color":"white",position:"relatve"}),D.appendChild(r)},j=function(e){_.SVGEdgeView.prototype.oncreateDisplay.apply(this,arguments),this.display.elt.textContent="official",this.display.elt.setAttribute("data-link-type-nls",e.mark.linkInfo.NLS),this.display.elt.setAttribute("data-link-from",e.mark.fromNodeId),this.display.elt.setAttribute("data-link-to",e.mark.toNodeId)},y=function(){var e,t;return H.inherit(o,_.HTMLNodeView),H.inherit(i,_.SVGEdgeView),i.prototype.oncreateDisplay=j,(e=new U.EGraph).setViewOpts({addTopologicalIds:!0}),e.addView("main",new _.HTMLGraphView(D)),(t=new K.StateMachine(e,null,null,e.views.main)).rootState&&(k&&(t.rootState.doubleClickOnNode=k),t.rootState.oncontextmenu=P),e.setZoomOpts({customMgt:!0}),t.state.onwheel=function(e,t){if(t.inside){var n=e.graphView;if(n.zoominc){var i=D.getBoundingClientRect();n.zoominc(.5*t.wheelDelta,t.clientPos[0]-i.x,t.clientPos[1]-i.y)}}},e.updateLock(),e},C=function(){var e,t,n;for(n=new H.BoundingRect,e=h.nodes.first;e;e=U.dftNext(h,e))n.update(e,e.actualLeft-300,e.actualLeft+e.actualWidth,e.actualTop,e.actualTop+e.actualHeight);t=H.reframeViewpoint(h.views.main.getSize(),n,{padding:15,minSize:50,horizontal:-1,vertical:-1,aliasing:0,defaultVpt:h.views.main.vpt,maxScale:1}),h.views.main.setViewpoint(t,!0)},g=function(){var t,n,i=!0;h.addChangeListener(function(o){var a,c;"edges"===o[0].path[0]&&(a=o[0].child.cl2.c,c=o[0].child.cl1.c,null!==a&&null!==c&&e.is(a.node.model)&&e.is(c.node.model)&&(e.is(o[0].child.geometry)||!p||r||p(c.node.model,a.node.model),setTimeout(function(){if(e.is(D))for(t=D.getElements("path"),n=0;n<t.length;n++)"official"!==t[n].innerHTML&&("none"===window.getComputedStyle(t[n]).getPropertyValue("marker-end")&&"arrow-edge-end-marker"!==t[n].parentElement.id&&t[n].parentElement.removeChild(t[n]))},500))),i||(i=o.some(function(e){return"selection"===e.path[0]}))}),h.addListener("update",function(t){var n,o,a,c=[];if(i&&!r){if(i=!1,q)return void(q=!1);for(var s in z)z.hasOwnProperty(s)&&z[s]&&c.push(s);for(z={},n=h.selection.first;n;n=n.nextSel)o=n.model,e.is(o)&&!z[n.PID]&&(a=o,z[n.PID]=!0);B&&(e.is(a)||c.length>0)&&B(a,c)}})},S=function(e){var t,n={},i=0;for(e=Array.isArray(e)?e:[e],t=h.nodes.first;t&&(e.indexOf(t.PID)>-1&&(n[t.PID]=t,i++),i!==e.length);t=U.dftNext(h,t));return n},x=function(e){var t,n=[];for(e=Array.isArray(e)?e:[e],t=h.edges.first;t;t=t.next)e.indexOf(t.mark.id)>-1&&n.push(t);return n},b=function(){d.forEach(function(e){var t=S([e.fromNodeId,e.toNodeId]);w(t[e.fromNodeId].connectors.out,t[e.toNodeId].connectors.in,e)})},F=function(){var t,n,i={},o={},r={},a={},c={},l={},u={};d.forEach(function(t){e.is(u[t.fromNodeId])||(u[t.fromNodeId]=[]),u[t.fromNodeId].push(t.toNodeId)}),s.forEach(function(i,o){t=parseInt(i.position.x),n=parseInt(i.position.y),r[i.id]=t,l[i.id]=o,e.is(a[i.id])?n=a[i.id]:a[i.id]=n,c[i.id]=!0,e.is(u[i.id])&&u[i.id].forEach(function(e){c[e]=!1})}),(c=e.Object.keys(c).filter(function(e){return c[e]})).forEach(function(c){!function c(s){if(t=r[s],n=a[s],!e.is(o[s])){if(e.is(i[n+","+t])){for(;e.is(i[n+","+t]);)n++;i[n+","+t]=s}else i[n+","+t]=s;if(o[s]={x:n,y:t},!e.is(u[s]))return;u[s].forEach(function(e){c(e)})}}(c),Q++}),s.forEach(function(e){var t=I(e,450*o[e.id].x,150*o[e.id].y);h.addNode(t)})},T=function(){return s.some(function(t){return-1==$.indexOf(t.PPRType)&&$.push(t.PPRType),e.is(t.parentId)})?"HIERARCHY":"SEQUENCE"},E=function(){if(!e.is(h)){h=y(),c=T();try{A()&&F(),b()}finally{h.updateUnlock()}g(),C()}},M=function(t){var n=S([t.fromNodeId,t.toNodeId]);2==e.Object.keys(n).length&&w(n[t.fromNodeId].connectors.out,n[t.toNodeId].connectors.in,t)},O=function(e){var t;try{A()&&(h.updateLock(),t=I(e,0,150*Q),Q++,h.addNode(t))}finally{h.updateUnlock()}},V=function(e){var t,n=S([e]);for(t in n)n.hasOwnProperty(t)&&h.removeNode(n[t])},W=function(t,n){var i,o=S([t]);o=o[t],e.is(o)&&(o.model=e.extend(o.model,n),(i=o.view.elts.node.getElementsByClassName("my-node-container")[0]).innerHTML="",G(o.model,i))},{init:function(){N()},inject:function(e){D.inject(e)},createGraphComponent:function(){E()},destroy:function(){D.remove(),D.destroy(),D=void 0},addLink:function(e){M(e)},removeLink:function(e){x(e).forEach(function(e){e.remove()})},addNode:function(e){O(e)},removeNode:function(e){V(e)},selectNode:function(e){var t,n=S([e]);for(t in n)n.hasOwnProperty(t)&&(z[t]=!0,q=!0,h.addToSelection(n[t]))},unselectNode:function(e){var t,n=S([e]);for(t in n)n.hasOwnProperty(t)&&(z[t]=!1,q=!0,h.removeFromSelection(n[t]))},updateNode:function(e,t){W(e,t)}}}}),define("DS/DELWKOProductFlowSequenceModule/DELWKOProductFlowSequenceModuleCloud",["UWA/Core","DS/DELWKOProductFlowSequenceModule/DELWKOProductFlowComponent","DS/DELPPWProductFlowSequenceModule_FD02/GraphPanel","DS/DELWKONavigationServices/DELWKONavigateUtil"],function(e,t,n,i){"use strict";return{behaviors:["UXFactoryBehavior","ModelBehavior","ResourceBehavior","SelectionBehavior","EditAttributeBehavior","LinkBehavior","ProductFlowLinkBehavior","RootsBehavior"],creator:function(o,r,a,c,s,d,l,u,f){var g,p,h,m,y,P,I,v,D,E,C,N=["WORKORDER","EXECHEADER","OPERATION","STEP"],L=!1,R=!1,w=!1,S=r.getComponent("Breadcrumb"),T=r.create("WUXLoader",{showButtonFlag:!1}),A=r.getComponent("ModalContainer"),k=e.createElement("div",{class:"pert-loading-cont"}),b=r.getComponent("WUXCommandsManager"),F=u.getProductFlowRelationTypes(),x=function(){var t=c.getIconURLFromKey("Refresh"),n=e.createElement("img",{src:t,class:"GraphViewBar refresh-btn"});e.is(v)&&(v.remove(),v.empty(!0)),v=e.createElement("div",{class:"egraph-toobar"}),n.addEvent("click",function(){H()}),O(y.id,y.path).inject(v),n.inject(v),v.inject(D)},M=function(t){var n=t.model,i={objectId:n.referencePID};e.is(C)&&(i.filterQuery=C),_(i).then(function(){y.id=e.is(n.instancePID)?n.instancePID:n.referencePID,y.path=n.occcurancePath,Y()})},O=function(t,n){var i,r,s,d,l,u=e.createElement("div",{class:"egraph-navigator"}),f=[],g=function(e,t,n){s&&f.unshift({label:s.get("V_Name"),icon:c.getIconURLFromKey(s.get("type")),id:t,path:n})};if(e.is(n,"string")&&(n=n.split(",")),0===n.length)g(0,(s=a.getReference(t)).get("PID"),[]);else for(l=n.length-1;l>=0;l--)d=n[l],s=a.getReferenceModel(d),g(0,d,n.slice(0,l+1)),0===l&&(r=a.getInstance(d),g(0,(s=a.getAggregatingReferenceModelFromInstance(r)).get("PID"),[]));return f.length>0&&(i=new S({value:f,mode:S.MODE.NAVIGATION})).addEventListener("selectionChange",function(){var e;o.notify("EGraphNodeSelect",{selectedNodeIds:[y.id]}),R=!0,e=i.selectedValues[0],y=e,H()}),i.inject(u),u},V=function(t,n){var i,o,r=[],s=[],d=[],u=[];return i=a.getReferenceModel(t),((o=function(){var t,n,i;return e.is(C)?t=C:e.is(y)&&(0===y.path.length?n=y.id:(i=a.getInstance(y.path[0]),n=(i=a.getReference(i.get("isAggregatedBy"))).get("PID")),n&&(t=f.getRootFilter(n),t=e.is(t)&&e.is(t.originalFilterQuery)?t.originalFilterQuery:void 0)),t}())?a.getFilteredInstancesFromCollection(i.get("PID"),o):a.getInstancesFromCollection(i.get("PID"))).forEach(function(t){var i,o,s,l=t.get("PID"),f=n.concat([l]);s=a.getReferenceModelFromInstance(t),N.indexOf(s.get("PPRTYPE"))>-1&&(r.push(l),u.push({id:l}),i={id:f.toString(),PPRType:s.get("PPRTYPE"),instancePID:l,referencePID:s.get("PID"),occcurancePath:f,className:" EGraph_obj_"+s.get("PPRTYPE"),icon:{iconPath:c.getIconURLFromKey(s.get("type"))},position:{x:t.get("V_X2DPos")?t.get("V_X2DPos"):0,y:t.get("V_Y2DPos")?t.get("V_Y2DPos"):0}},P.forEach(function(n){(Array.isArray(n)?n:[n]).forEach(function(n){o=t.get(n.property),i[n.property]="NULL"!==o&&e.is(o)?o:s.get(n.property)})}),d.push(i))}),function(t){return a.isNavigateOnDemand()?(t.push({id:y.id,path:y.path}),l.getRelations(t)):e.Promise.resolve()}(u).then(function(){return a.getImpactedConnections(r,!1,{relationTypes:F}).forEach(function(t){var n,i;if(d.every(function(o){return o.id=o.referencePID,o.id.includes(t.get("from"))?n=o.id:o.id.includes(t.get("to"))&&(i=o.id),!(e.is(n)&&e.is(i))}),e.is(n)&&e.is(i)){var o=l.getLinkInfo(t);s.push({id:t.get("PID"),fromNodeId:n,toNodeId:i,linkType:t.get("type"),linkInfo:o})}}),{nodes:d,links:s}})},B=function(t){var n=o.getAppContext();return{icon:"url("+c.getIconURLFromKey("DisplayProperties")+")",label:c.getNLSValue("Cmd.DisplayProperties.Title"),sensitivity:"enabled",callback:function(){var i=b.getCommandCheckHeader("DisplayProperties",n),o=a.getReferenceIdFromInstance(t.instancePID);e.is(i)&&!1===i.getState()&&(i.options.node={referencePID:o,instancePID:t.instancePID,absPath:t.occcurancePath},i.toggleState())}}},G=function(e){c.getIconURLFromKey("GeneralDelete"),c.getNLSValue("LinksUI.DeleteLink"),e.linkType;var t={icon:"url("+c.getIconURLFromKey("EditAttribute")+")",label:c.getNLSValue("LinksUI.Attribute"),sensitivity:d.hasEditConfiguration(e.id)?"enabled":"disabled",callback:function(){d.editConfiguredAttributes(e.id)}};return o.getAppContext(),c.getIconURLFromKey("DisplayProperties"),c.getNLSValue("Cmd.DisplayProperties.Title"),[t]},W=function(t,n){var i={allowMove:!0},r=[];t&&(i.targetInstancePID=t.instancePID,i.targetInstancePIDsArray=t.occcurancePath,i.targetReferencePID=a.getReferenceIdFromInstance(t.instancePID),i.targetRootReferencePID=a.getInstance(t.occcurancePath[0]),i.targetRootReferencePID=e.is(i.rootReferencePID)?i.rootReferencePID.get("isAggregatedBy"):null),n&&(i.instancePID=n.instancePID,i.instancePIDsArray=n.occcurancePath,i.referencePID=a.getReferenceIdFromInstance(n.instancePID),i.rootReferencePID=a.getInstance(n.occcurancePath[0]),i.rootReferencePID=e.is(i.targetRootReferencePID)?i.targetRootReferencePID.get("isAggregatedBy"):null),("OPERATION"===t.PPRType&&"OPERATION"===n.PPRType||"SYSTEM"===t.PPRType&&"SYSTEM"===n.PPRType)&&(i.linkType=u.getProductFlowRelationTypeByPPRType(n.PPRType)),r.push(i),o.notify("CreateLinkOrInstance",[r])},j=function(t,n){var i={};s.getSelections()[0].indexOf(y.id)>-1&&n.push(y.id),n.length>0&&(n=n.map(function(e){var t=e.split(",");return t[t.length-1]}),R=!0),i.selectedNodeIds=n,t&&(i.changed={nodeId:a.getReferenceIdFromInstance(t.instancePID),childOccurencePath:e.is(t.occcurancePath)?t.occcurancePath:null,isSelected:!0},L=!0),o.notify("EGraphNodeSelect",i)},U=function(){e.is(m)&&(m.destroy(),m=void 0)},_=function(t){return t=t||{},new e.Promise(function(n,i){var o,r,c={};e.is(g.forceFetch)&&g.forceFetch&&e.is(t.objectId)?(o=t.objectId,r=function(){e.is(D)&&(T.off(),A.removeModal(k),k.remove()),n()},e.is(D)&&(k.inject(D),A.createModal(k,T.elements.container),T.on()),e.is(g.expandLevel)&&(c.expandLevel=g.expandLevel),e.is(g.withLinks)&&(c.withLinks=g.withLinks),e.is(g.withLinksResolved)&&(c.withLinksResolved=g.withLinksResolved),e.is(g.relationTypes)&&(c.gridIDs=g.relationTypes),e.is(g.forceDBMode)&&(c.forceDBMode=g.forceDBMode),e.is(t.filterQuery)&&(c.filterQuery=t.filterQuery),a.getDescendantsFromServer([o],r,c)):n()})},K=function(){return V(y.id,y.path).then(function(e){p=e.nodes,h=e.links,U(),(m=new t(r,{nodes:p,links:h,readOnly:E,identifier:"PPR-PERTVIEW",nodeOptions:P,getNodeContextMenu:B,getLinkContextMenu:G,onNodeDoubleClick:M,onConnectingNodes:W,onNodeSelectionChange:j})).init()})},H=function(){return K().then(function(){m.inject(D),m.createGraphComponent()})},Y=function(){x(),H()},X=function(t){var n,i,o;w||Array.isArray(t)||!e.is(p)||(p.every(function(o){var r=t.get("from"),a=t.get("to");return r=Array.isArray(r)?r.join(","):r,a=Array.isArray(a)?a.join(","):a,o.id.includes(r)?n=o.id:o.id.includes(a)&&(i=o.id),!(e.is(n)&&e.is(i))}),e.is(n)&&e.is(i)&&(o=l.getLinkInfo(t),m.addLink({fromNodeId:n,toNodeId:i,id:t.get("PID"),linkType:t.get("type"),linkInfo:o})))},Q=function(e){(Array.isArray(e)?e:[e]).forEach(function(e){m.removeLink(e.get("PID"))})},q=function(t){var n,i,o,r=t.get("isInstanceOf"),s=t.get("PID"),d=a.getReferenceIdFromInstance(y.id);d||(d=y.id),t.get("isAggregatedBy")===d&&(n=a.getReference(r),o={id:(i=y.path.concat([s])).toString(),V_Name:n.get("V_Name"),PPRType:n.get("PPRTYPE"),instancePID:s,referencePID:r,occcurancePath:i,className:" EGraph_obj_"+n.get("PPRTYPE"),icon:{iconPath:c.getIconURLFromKey(n.get("type"))}},m.addNode(o),p.push(e.clone(o)))},z=function(e){(Array.isArray(e)?e:[e]).forEach(function(e){var t=y.path.concat([e.get("PID")]).toString();m.removeNode(t)})},$=function(t){var n=t.changed,i=n.absPath.toString();e.is(m)&&(n.isSelected?(L||m.selectNode(i),L=!1):(R||m.unselectNode(i),R=!1))},Z=function(){H()},J=function(){},ee=function(){e.is(v)&&(v.destroy(),v=void 0),U()},te=function(e){w=!0,U()},ne=function(t){var n={};(t=Array.isArray(t)?t:[t]).forEach(function(t){P.forEach(function(e){(Array.isArray(e)?e:[e]).forEach(function(e){a.isEntityInstance(e.dicoType)||(n[e.property]=t.get(e.property))})}),p.forEach(function(i,o){i.referencePID===t.get("PID")&&(p[o]=e.clone(e.extend(p[o],n)),m.updateNode(p[o].id,n))})})},ie=function(t){!e.is(y)||y.id!==t&&y.path[0]!==t||(w=!w&&w,a.getDescendantsFromServer([t],function(){e.is(v)||x(),H()},{expandLevel:1,forceDBMode:!0}))};return{name:"ProductFlowViewModule",listenTo:function(){return{select:$,addConnection:X,removeConnection:Q,addInstance:q,removeInstance:z,refreshImpacted:Z,Hide:J,HideAll:ee,refreshAll:te,addRootNode:ie,changeReference:ne}},onStart:function(t,a){var d,u,f,p,h,m;g=t=t||{},e.is(t.displayNodeConfigXML)&&(d=l.getXMLValues(t.displayNodeConfigXML),e.is(d.Config.Preferences)&&(P=[],e.is(d.Config.Preferences.Node)&&e.is(d.Config.Preferences.Node.Lines)&&e.is(d.Config.Preferences.Node.Lines.Line)&&(P=(P=d.Config.Preferences.Node.Lines.Line).map(function(t){var n,i=t.Info;return i.displayAttributeName&&(i.displayTitle=!0,n=e.is(i.dicoType)?i.dicoType+"."+i.property:i.property,i.title=c.getNLSValue(n)),i})),e.is(d.Config.Preferences.Link)&&d.Config.Preferences.Link)),t.showPanel&&(u=c.getNLSValue(t.titleGraph),(I=new n(o,r,c)).init({title:u,identifier:"PPR-PERTVIEW",className:"PERTVIEW-panel-container",onClose:function(){e.is(t.toggleCmdId)?o.notify("toggleCmdCheckHeaderState",{cmdName:t.toggleCmdId,cmdState:!1}):I.hide()}}),D=I.getContainer(),m=s.getSelectedRefs()[0],y={reference:m,id:m.id,path:[]},f=y.reference,p=function(){I.buildSkeleton(),I.show(),Y()},h={excludeBOTypes:["DELLmiProdSystemIOPort"],expandLevel:-1},i.getDescendantsFromServer(f,p,h)),a()},onStop:function(){e.is(m)&&(m.destroy(),m=void 0),e.is(I)&&(I.destroy(),I=void 0)},createSequence:function(e){return _(e).then(function(){var t=e.objectId;return y={id:t,path:[]},C=e.filterQuery,K()})},inject:function(e){D=e,x(),m.inject(D),m.createGraphComponent()},setReadOnly:function(e){E=e}}}}}),define("DS/DELWKOProductFlowSequenceModule/DELWKOProductFlowSequenceModule",["UWA/Core","DS/DELWKOProductFlowSequenceModule/DELWKOProductFlowComponent","DS/DELPPWProductFlowSequenceModule_FD02/GraphPanel","DS/DELWKONavigationServices/DELWKONavigateUtil"],function(e,t,n,i){"use strict";return{behaviors:["UXFactoryBehavior","ModelBehavior","ResourceBehavior","SelectionBehavior","EditAttributeBehavior","LinkBehavior","ProductFlowLinkBehavior","RootsBehavior"],creator:function(o,r,a,c,s,d,l,u,f){var g,p,h,m,y,P,I,v,D,E,C,N=["WORKORDER","EXECHEADER"],L=!1,R=!1,w=!1,S=r.getComponent("Breadcrumb"),T=r.create("WUXLoader",{showButtonFlag:!1}),A=r.getComponent("ModalContainer"),k=e.createElement("div",{class:"pert-loading-cont"}),b=r.getComponent("WUXCommandsManager"),F=u.getProductFlowRelationTypes(),x=function(){var t=c.getIconURLFromKey("Refresh"),n=e.createElement("img",{src:t,class:"GraphViewBar refresh-btn"});e.is(v)&&(v.remove(),v.empty(!0)),v=e.createElement("div",{class:"egraph-toobar"}),n.addEvent("click",function(){H()}),O(y.id,y.path).inject(v),n.inject(v),v.inject(D)},M=function(t){var n=t.model,i={objectId:n.referencePID};e.is(C)&&(i.filterQuery=C),_(i).then(function(){y.id=e.is(n.instancePID)?n.instancePID:n.referencePID,y.path=n.occcurancePath,Y()})},O=function(t,n){var i,r,s,d,l,u=e.createElement("div",{class:"egraph-navigator"}),f=[],g=function(e,t,n){s&&f.unshift({label:s.get("V_Name"),icon:c.getIconURLFromKey(s.get("type")),id:t,path:n})};if(e.is(n,"string")&&(n=n.split(",")),0===n.length)g(0,(s=a.getReference(t)).get("PID"),[]);else for(l=n.length-1;l>=0;l--)d=n[l],s=a.getReferenceModel(d),g(0,d,n.slice(0,l+1)),0===l&&(r=a.getInstance(d),g(0,(s=a.getAggregatingReferenceModelFromInstance(r)).get("PID"),[]));return f.length>0&&(i=new S({value:f,mode:S.MODE.NAVIGATION})).addEventListener("selectionChange",function(){var e;o.notify("EGraphNodeSelect",{selectedNodeIds:[y.id]}),R=!0,e=i.selectedValues[0],y=e,H()}),i.inject(u),u},V=function(t,n){var i,o,r=[],s=[],d=[],u=[];return i=a.getReferenceModel(t),((o=function(){var t,n,i;return e.is(C)?t=C:e.is(y)&&(0===y.path.length?n=y.id:(i=a.getInstance(y.path[0]),n=(i=a.getReference(i.get("isAggregatedBy"))).get("PID")),n&&(t=f.getRootFilter(n),t=e.is(t)&&e.is(t.originalFilterQuery)?t.originalFilterQuery:void 0)),t}())?a.getFilteredInstancesFromCollection(i.get("PID"),o):a.getInstancesFromCollection(i.get("PID"))).forEach(function(t){var i,o,s,l=t.get("PID"),f=n.concat([l]);s=a.getReferenceModelFromInstance(t),N.indexOf(s.get("PPRTYPE"))>-1&&(r.push(l),u.push({id:l}),i={id:f.toString(),PPRType:s.get("PPRTYPE"),instancePID:l,referencePID:s.get("PID"),occcurancePath:f,className:" EGraph_obj_"+s.get("PPRTYPE"),icon:{iconPath:c.getIconURLFromKey(s.get("type"))},position:{x:t.get("V_X2DPos"),y:t.get("V_Y2DPos")}},P.forEach(function(n){(Array.isArray(n)?n:[n]).forEach(function(n){o=t.get(n.property),i[n.property]="NULL"!==o&&e.is(o)?o:s.get(n.property)})}),d.push(i))}),function(t){return a.isNavigateOnDemand()?(t.push({id:y.id,path:y.path}),l.getRelations(t)):e.Promise.resolve()}(u).then(function(){return a.getImpactedConnections(r,!1,{relationTypes:F}).forEach(function(t){var n,i;if(d.every(function(o){return o.id=o.referencePID,o.id.includes(t.get("from"))?n=o.id:o.id.includes(t.get("to"))&&(i=o.id),!(e.is(n)&&e.is(i))}),e.is(n)&&e.is(i)){var o=l.getLinkInfo(t);s.push({id:t.get("PID"),fromNodeId:n,toNodeId:i,linkType:t.get("type"),linkInfo:o})}}),{nodes:d,links:s}})},B=function(t){var n=o.getAppContext();return{icon:"url("+c.getIconURLFromKey("DisplayProperties")+")",label:c.getNLSValue("Cmd.DisplayProperties.Title"),sensitivity:"enabled",callback:function(){var i=b.getCommandCheckHeader("DisplayProperties",n),o=a.getReferenceIdFromInstance(t.instancePID);e.is(i)&&!1===i.getState()&&(i.options.node={referencePID:o,instancePID:t.instancePID,absPath:t.occcurancePath},i.toggleState())}}},G=function(e){c.getIconURLFromKey("GeneralDelete"),c.getNLSValue("LinksUI.DeleteLink"),e.linkType;var t={icon:"url("+c.getIconURLFromKey("EditAttribute")+")",label:c.getNLSValue("LinksUI.Attribute"),sensitivity:d.hasEditConfiguration(e.id)?"enabled":"disabled",callback:function(){d.editConfiguredAttributes(e.id)}};return o.getAppContext(),c.getIconURLFromKey("DisplayProperties"),c.getNLSValue("Cmd.DisplayProperties.Title"),[t]},W=function(t,n){var i={allowMove:!0},r=[];t&&(i.targetInstancePID=t.instancePID,i.targetInstancePIDsArray=t.occcurancePath,i.targetReferencePID=a.getReferenceIdFromInstance(t.instancePID),i.targetRootReferencePID=a.getInstance(t.occcurancePath[0]),i.targetRootReferencePID=e.is(i.rootReferencePID)?i.rootReferencePID.get("isAggregatedBy"):null),n&&(i.instancePID=n.instancePID,i.instancePIDsArray=n.occcurancePath,i.referencePID=a.getReferenceIdFromInstance(n.instancePID),i.rootReferencePID=a.getInstance(n.occcurancePath[0]),i.rootReferencePID=e.is(i.targetRootReferencePID)?i.targetRootReferencePID.get("isAggregatedBy"):null),("OPERATION"===t.PPRType&&"OPERATION"===n.PPRType||"SYSTEM"===t.PPRType&&"SYSTEM"===n.PPRType)&&(i.linkType=u.getProductFlowRelationTypeByPPRType(n.PPRType)),r.push(i),o.notify("CreateLinkOrInstance",[r])},j=function(t,n){var i={};s.getSelections()[0].indexOf(y.id)>-1&&n.push(y.id),n.length>0&&(n=n.map(function(e){var t=e.split(",");return t[t.length-1]}),R=!0),i.selectedNodeIds=n,t&&(i.changed={nodeId:a.getReferenceIdFromInstance(t.instancePID),childOccurencePath:e.is(t.occcurancePath)?t.occcurancePath:null,isSelected:!0},L=!0),o.notify("EGraphNodeSelect",i)},U=function(){e.is(m)&&(m.destroy(),m=void 0)},_=function(t){return t=t||{},new e.Promise(function(n,i){var o,r,c={};e.is(g.forceFetch)&&g.forceFetch&&e.is(t.objectId)?(o=t.objectId,r=function(){e.is(D)&&(T.off(),A.removeModal(k),k.remove()),n()},e.is(D)&&(k.inject(D),A.createModal(k,T.elements.container),T.on()),e.is(g.expandLevel)&&(c.expandLevel=g.expandLevel),e.is(g.withLinks)&&(c.withLinks=g.withLinks),e.is(g.withLinksResolved)&&(c.withLinksResolved=g.withLinksResolved),e.is(g.relationTypes)&&(c.gridIDs=g.relationTypes),e.is(g.forceDBMode)&&(c.forceDBMode=g.forceDBMode),e.is(t.filterQuery)&&(c.filterQuery=t.filterQuery),a.getDescendantsFromServer([o],r,c)):n()})},K=function(){return V(y.id,y.path).then(function(e){p=e.nodes,h=e.links,U(),(m=new t(r,{nodes:p,links:h,readOnly:E,identifier:"PPR-PERTVIEW",nodeOptions:P,getNodeContextMenu:B,getLinkContextMenu:G,onNodeDoubleClick:M,onConnectingNodes:W,onNodeSelectionChange:j})).init()})},H=function(){return K().then(function(){m.inject(D),m.createGraphComponent()})},Y=function(){x(),H()},X=function(t){var n,i,o;w||Array.isArray(t)||!e.is(p)||(p.every(function(o){var r=t.get("from"),a=t.get("to");return r=Array.isArray(r)?r.join(","):r,a=Array.isArray(a)?a.join(","):a,o.id.includes(r)?n=o.id:o.id.includes(a)&&(i=o.id),!(e.is(n)&&e.is(i))}),e.is(n)&&e.is(i)&&(o=l.getLinkInfo(t),m.addLink({fromNodeId:n,toNodeId:i,id:t.get("PID"),linkType:t.get("type"),linkInfo:o})))},Q=function(e){(Array.isArray(e)?e:[e]).forEach(function(e){m.removeLink(e.get("PID"))})},q=function(t){var n,i,o,r=t.get("isInstanceOf"),s=t.get("PID"),d=a.getReferenceIdFromInstance(y.id);d||(d=y.id),t.get("isAggregatedBy")===d&&(n=a.getReference(r),o={id:(i=y.path.concat([s])).toString(),V_Name:n.get("V_Name"),PPRType:n.get("PPRTYPE"),instancePID:s,referencePID:r,occcurancePath:i,className:" EGraph_obj_"+n.get("PPRTYPE"),icon:{iconPath:c.getIconURLFromKey(n.get("type"))}},m.addNode(o),p.push(e.clone(o)))},z=function(e){(Array.isArray(e)?e:[e]).forEach(function(e){var t=y.path.concat([e.get("PID")]).toString();m.removeNode(t)})},$=function(t){var n=t.changed,i=n.absPath.toString();e.is(m)&&(n.isSelected?(L||m.selectNode(i),L=!1):(R||m.unselectNode(i),R=!1))},Z=function(){H()},J=function(){},ee=function(){e.is(v)&&(v.destroy(),v=void 0),U()},te=function(e){w=!0,U()},ne=function(t){var n={};(t=Array.isArray(t)?t:[t]).forEach(function(t){P.forEach(function(e){(Array.isArray(e)?e:[e]).forEach(function(e){a.isEntityInstance(e.dicoType)||(n[e.property]=t.get(e.property))})}),p.forEach(function(i,o){i.referencePID===t.get("PID")&&(p[o]=e.clone(e.extend(p[o],n)),m.updateNode(p[o].id,n))})})},ie=function(t){!e.is(y)||y.id!==t&&y.path[0]!==t||(w=!w&&w,a.getDescendantsFromServer([t],function(){e.is(v)||x(),H()},{expandLevel:1,forceDBMode:!0}))};return{name:"ProductFlowViewModule",listenTo:function(){return{select:$,addConnection:X,removeConnection:Q,addInstance:q,removeInstance:z,refreshImpacted:Z,Hide:J,HideAll:ee,refreshAll:te,addRootNode:ie,changeReference:ne}},onStart:function(t,a){var d,u,f,p,h,m;g=t=t||{},e.is(t.displayNodeConfigXML)&&(d=l.getXMLValues(t.displayNodeConfigXML),e.is(d.Config.Preferences)&&(P=[],e.is(d.Config.Preferences.Node)&&e.is(d.Config.Preferences.Node.Lines)&&e.is(d.Config.Preferences.Node.Lines.Line)&&(P=(P=d.Config.Preferences.Node.Lines.Line).map(function(t){var n,i=t.Info;return i.displayAttributeName&&(i.displayTitle=!0,n=e.is(i.dicoType)?i.dicoType+"."+i.property:i.property,i.title=c.getNLSValue(n)),i})),e.is(d.Config.Preferences.Link)&&d.Config.Preferences.Link)),t.showPanel&&(u=c.getNLSValue(t.titleGraph),(I=new n(o,r,c)).init({title:u,identifier:"PPR-PERTVIEW",className:"PERTVIEW-panel-container",onClose:function(){e.is(t.toggleCmdId)?o.notify("toggleCmdCheckHeaderState",{cmdName:t.toggleCmdId,cmdState:!1}):I.hide()}}),D=I.getContainer(),m=s.getSelectionsWithPaths()[0][0],y={id:m.id,path:m.path},f=y.id,p=function(){I.buildSkeleton(),I.show(),Y()},h={excludeBOTypes:["DELLmiProdSystemIOPort"],forceDBMode:!0},i.getDescendantsFromServer(f,p,h)),a()},onStop:function(){e.is(m)&&(m.destroy(),m=void 0),e.is(I)&&(I.destroy(),I=void 0)},createSequence:function(e){return _(e).then(function(){var t=e.objectId;return y={id:t,path:[]},C=e.filterQuery,K()})},inject:function(e){D=e,x(),m.inject(D),m.createGraphComponent()},setReadOnly:function(e){E=e}}}}});