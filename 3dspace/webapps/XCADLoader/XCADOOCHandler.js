define("DS/XCADLoader/XCADOOCHandler",["DS/Visualization/ThreeJS_DS","DS/3DXMTiles/OOCHandler","DS/3DXMTiles/3DXMTilesUtils","DS/EasySax/EasySax","DS/ZipJS2/pako","DS/ZipJS2/LoaderInflate","DS/XCADLoader/XCADError"],function(e,t,s,a,i,r,n){"use strict";var l=function(e){t.call(this,t.InstRefHander),this.viewer=e.viewer,this.manager=e.manager,this.rootId=e.rootId,this.onHandlePathesCB=null,this.onDoneCB=null,this.ready=!0,this.zipArchive=e.zipArchive||null,this.filename=e.filename||null,this.useZip2=e.useZip2,this.cnt=0,this.process=0,this.nbExternalRef=0,this.processExternalRef=0,this.shapeRepListMap=new Map,this.assyProductsMap=new Map,this.rootProducts=[],this.rootBbox=void 0,this.rootName=void 0,this.childSet=new Set,this._filesSet=new Set,this._Files=[],this._Parts=[],this._VORs=[],this._occurencesMap=new Map,this._matchingDoc=new Map,this._matchingRC=new Map,this._matchingBBox=new Map,this._matchingFile=new Map,this.filesuids=[],this._missingPart=[],this._roots=[]};return(l.prototype=Object.create(t.prototype)).dispose=function(){},l.prototype.isReady=function(){return this.ready},l.prototype.isOK=async function(){return"OK"},l.prototype.init=function(t){function s(s){var i=s.data;let r=!1,l=!1,o=!1,h=!1,d=!1,c=!1,p=!1,u=!1,f=!1,g=!1,_=!1,m=!1,b=!1,P=!1,R=!1,v=void 0,F=void 0,x=void 0,S=void 0,D=void 0;var y=new a;y.on("startNode",function(e,t){var a=t();switch(e){case"Header":r=!0;break;case"DataContainer":break;case"File":if(l=!0,!o){var i={uid:a.uid,path:".",root:v};s.handler._matchingFile.set(i.uid+v,s.handler._Files.length),s.handler._Files.push(i)}break;case"Id":null!=a.id&&!0===l&&(s.handler._Files[s.handler._Files.length-1].filename=a.id),null!=a.id&&!0===p&&!0===P&&(s.handler._Parts[s.handler._Parts.length-1].occurences[s.handler._Parts[s.handler._Parts.length-1].occurences.length-1].id=a.id);break;case"Identifier":null!=a.id&&!0===p&&!0===P&&(s.handler._Parts[s.handler._Parts.length-1].occurences[s.handler._Parts[s.handler._Parts.length-1].occurences.length-1].id=a.id);break;case"IdentifierString":h=!0;break;case"DocumentVersion":o=!0,D=a.uid;break;case"ClassString":d=!0;break;case"Part":p=!0;var n={uid:a.uid,root:v,occurences:[],vors:[],bbox:[]};s.handler._Parts.push(n);break;case"Name":c=!0;break;case"CharacterString":b=!0;break;case"Occurrence":if(P=!0,null!=a.uid&&!0===p){var F={uid:a.uid};s.handler._Parts[s.handler._Parts.length-1].occurences.push(F)}break;case"AssignedDocument":if(p){let e=a.uidRef;s.handler._Parts[s.handler._Parts.length-1].AssignedDocumentUidRef=e}break;case"ViewOccurrenceRelationship":u=!0;var x={uid:a.uid,idx:s.handler._VORs.length,part_idx:-1};p&&(x.part_idx=s.handler._Parts.length-1),l&&(x.File_id=s.handler._Files[s.handler._Files.length-1].id),s.handler._VORs.push(x);break;case"Related":u&&(s.handler._VORs[s.handler._VORs.length-1].uidRef=a.uidRef);break;case"RotationMatrix":f=!0;break;case"TranslationVector":g=!0;break;case"Document":break;case"RepresentationContext":S=a.uid,_=!0;break;case"DigitalFile":o&&s.handler._matchingDoc.set(D,a.uidRef);break;case"ShapeDependentProperty":m=!0;break;case"DefinedIn":p&&m&&(s.handler._Parts[s.handler._Parts.length-1].bbox[s.handler._Parts[s.handler._Parts.length-1].bbox.length]=a.uidRef);break;case"Coordinates":R=!0}}),y.on("textNode",function(e,t){!0===l&&(!0===h&&(s.handler._Files[s.handler._Files.length-1].path=e),!0===d&&(s.handler._Files[s.handler._Files.length-1].type=e)),!0===u&&(!0===f&&(F=e),!0===g&&(x=e)),!0===p&&c&&b&&void 0===s.handler._Parts[s.handler._Parts.length-1].name&&(s.handler._Parts[s.handler._Parts.length-1].name=e+s.handler._Parts[s.handler._Parts.length-1].uid),_&&R&&s.handler._matchingRC.set(S,e),r&&c&&void 0===v&&(v=e)}),y.on("endNode",function(t){switch(t){case"Header":r=!1;break;case"DataContainer":v=void 0;break;case"File":l=!1;break;case"Id":break;case"IdentifierString":h=!1;break;case"ClassString":d=!1;break;case"Part":p=!1;break;case"Name":c=!1;break;case"CharacterString":b=!1;break;case"Occurrence":P=!1;break;case"ViewOccurrenceRelationship":let S=(a=F.trim().split(" "),i=x.trim().split(" "),(n=new e.Matrix4).set(parseFloat(a[0]),parseFloat(a[3]),parseFloat(a[6]),parseFloat(i[0]),parseFloat(a[1]),parseFloat(a[4]),parseFloat(a[7]),parseFloat(i[1]),parseFloat(a[2]),parseFloat(a[5]),parseFloat(a[8]),parseFloat(i[2]),0,0,0,1),n);s.handler._VORs[s.handler._VORs.length-1].curTransfo=S,!0===p&&s.handler._Parts[s.handler._Parts.length-1].vors.push(s.handler._VORs[s.handler._VORs.length-1]),u=!1;break;case"RotationMatrix":f=!1;break;case"TranslationVector":g=!1;break;case"Document":break;case"RepresentationContext":_=!1;break;case"DocumentVersion":o=!1,D=void 0;break;case"ShapeDependentProperty":m=!1;break;case"Coordinates":R=!1}var a,i,n}),s.handler.processSTPXFileV2(i,y,function(){if(s.handler._missingPart.length>0){let t="";for(let e=0;e<s.handler._missingPart.length;e++)t+=s.handler._missingPart[e],e!=s.handler._missingPart.length-1&&(t+=",");var e=new n;e.setError("XCADLoader/XCADLoader","warning.MISSING_PART",t),null!=s.handler.manager.modelLoader.onErrorCB&&s.handler.manager.modelLoader.onErrorCB(e)}for(let e=0;e<s.handler._Parts.length;e++){for(let t=0;t<s.handler._Parts[e].vors.length;t++)s.handler._occurencesMap.set(s.handler._Parts[e].root+s.handler._Parts[e].vors[t].uidRef,s.handler._Parts[e].vors[t].idx);if(2===s.handler._Parts[e].bbox.length){let t=s.handler._matchingRC.get(s.handler._Parts[e].bbox[0]),a=s.handler._matchingRC.get(s.handler._Parts[e].bbox[1]),i=void 0;null!=t&&null!=a&&(i=s.handler.buildBbox(t.trim().split(" "),a.trim().split(" "))),s.handler._matchingBBox.set(s.handler._Parts[e].name,i)}}for(var a=0;a<s.handler._Parts.length;a++)s.handler.processOccurenceV2(s.handler._Parts[a]);t()})}if(this.zipArchive){var r=this.filename.substring(this.filename.lastIndexOf("/")+1,this.filename.lastIndexOf("."));let e=this;(function(e){let t=e.zipArchive.find("stpa.ini");if(!t)return new Promise(function(e,t){e("no manifest")});if(e.useZip2)return t.getRope().then(t=>{!function(e){let t=e.data.toString().match(/Names=\".*\"/g);if(0!=t.length)for(var s=0;s<t.length;s++)e.handler._roots.push(t[s].substring(7,t[0].length-1))}({data:t,handler:e})});console.log("not implemented")})(this).then(()=>(function(){let t=void 0,a=void 0;null!=e._roots[0]?(t=e._roots[0].toUpperCase().includes(".STPX")?e._roots[0]:void 0,a=e._roots[0].toUpperCase().includes(".STPXZ")?e._roots[0]:void 0):(t=r+".stpx",a=r+".stpxZ");var l=e.zipArchive.find(t);if(l)e.useZip2?l.getRope().then(t=>{s({data:t,handler:e})}):l.getBlob("text/plain",t=>{var a=new FileReader;a.onload=(t=>{s({data:t.target.result,handler:e})}),a.readAsText(t)});else if(void 0===(l=e.zipArchive.find(a))&&(a=r+".stpxz",l=e.zipArchive.find(a)),l)l.getUint8Array().then(t=>{var a=i.inflate(t),r=new TextDecoder,n=[];if(a.length>268435456){let e=0,t=268435456,s=0;for(;t<a.length;)n[s]=r.decode(a.subarray(e,t)),s++,e=t,t+=268435456;n[s]=r.decode(a.subarray(e,a.length))}else n[0]=r.decode(a);s({data:n,handler:e})});else{var o=new n;o.setError("XCADLoader/XCADLoader","error.NO_STPXZ",null),null!=e.manager.modelLoader.onErrorCB&&e.manager.modelLoader.onErrorCB(o)}})())}},l.prototype.processSTPXFileV2=function(e,t,s,a,i){this.process++;let r=0;t.parse(e);for(var n=0;n<this._Files.length;n++){let e=void 0;e=void 0===a?this._Files[n].uid:a;var l=this._Files[n].filename.substring(this._Files[n].filename.lastIndexOf(".")+1,this._Files[n].filename.length);if(("geometry"==this._Files[n].type||"STPX"!=l.toUpperCase())&&"/NULL"!==this._Files[n].filename){let t=this._Files[n].path;t.startsWith("./")?t=t.substring(2,t.length):t.startsWith(".")&&(t=t.substring(1,t.length));let s=t+this._Files[n].filename,a=this.zipArchive.find(s);null==a&&(null==(a=this.zipArchive.find(s+"Z"))?(a=this.zipArchive.find(s+"z"),this._Files[n].filename+="z"):this._Files[n].filename+="Z"),null!=a?this.shapeRepListMap.set(e+this._Files[n].root,{type:this._Files[n].type,filename:this._Files[n].filename,folder:this._Files[n].path}):this._missingPart.push(s)}if(!1===this._filesSet.has(this._Files[n].path+this._Files[n].filename)){r++,this._filesSet.add(this._Files[n].path+this._Files[n].filename);let e=this._Files[n].uid;if("STPX"===l.toUpperCase()){this.nbExternalRef++;let a=this.zipArchive.find(this._Files[n].filename);a&&(this.useZip2?a.getBlob("application/octet-stream").then(a=>{let i=new FileReader;i.onload=(a=>{this.processSTPXFileV2(a.target.result,t,s,e,function(e){e.processExternalRef++,e.nbExternalRef==e.processExternalRef&&s()})}),i.readAsText(a)}):a.getBlob("application/octet-stream",a=>{var i=new FileReader;i.onload=(a=>{this.processSTPXFileV2(a.target.result,t,s,e,function(e){e.processExternalRef++,e.nbExternalRef==e.processExternalRef&&s()})}),i.readAsText(a)}))}}}null!=i&&i(this),null!=i||0!=r&&0!=this.nbExternalRef||s()},l.prototype.processOccurenceV2=function(e){let t=void 0,s=void 0,a=void 0,i=void 0,r=void 0;for(let n=0;n<e.occurences.length;n++){let l=this._occurencesMap.get(e.root+e.occurences[n].uid);t=e.occurences[n].id,s=e.name;let o=(a=this._Parts[this._VORs[l].part_idx].name)?this._matchingBBox.get(s):void 0;if(null!=(i=e.AssignedDocumentUidRef)&&i.startsWith("DV")&&(i=this._matchingDoc.get(i)),null!=i){let t=this._matchingFile.get(i+e.root);"STPX"===this._Files[t].filename.substring(this._Files[t].filename.lastIndexOf(".")+1,this._Files[t].filename.length).toUpperCase()?i+=this._Files[t].filename:i+=e.root}if(null!=(r=e.AssignedDocumentUidRef)&&r.startsWith("DV")&&(r=this._matchingDoc.get(r)),null!=r){let t=this._matchingFile.get(r+e.root);"STPX"===this._Files[t].filename.substring(this._Files[t].filename.lastIndexOf(".")+1,this._Files[t].filename.length).toUpperCase()?r+=this._Files[t].filename:r+=e.root}if(null!==s&&null!==s){if(!1===this.assyProductsMap.has(a)&&(this.assyProductsMap.set(a,{referenceName:a,isRoot:!0,childrenList:[],geomRep:this.shapeRepListMap.get(r)}),this.rootProducts.push(a),this.rootName=a,this.rootBbox=o),!0===this.assyProductsMap.has(s)){this.assyProductsMap.get(s).isRoot=!1;let e=this.rootProducts.indexOf(s);-1!=e&&this.rootProducts.splice(e,1)}else this.assyProductsMap.set(s,{referenceName:s,isRoot:!1,childrenList:[],geomRep:this.shapeRepListMap.get(i)});this.assyProductsMap.get(a).geomRep=void 0,this.assyProductsMap.get(a).childrenList.push({instanceName:t,productReferenceIdx:s,transfo:this._VORs[l].curTransfo,bbox:o})}}},l.prototype.buildBbox=function(t,s){let a=new e.Box3;return a.setValues(parseFloat(t[0]),parseFloat(t[1]),parseFloat(t[2]),parseFloat(s[0]),parseFloat(s[1]),parseFloat(s[2])),a},l.prototype.processInstance=function(e,t,s){let a=e.instanceName,i=e.productReferenceIdx,r=e.transfo,n=e.bbox,l=void 0,o=this.assyProductsMap.get(i);if(o.geomRep){let e=o.geomRep.folder;e.startsWith("./")?e=e.substring(2,e.length):e.startsWith(".")&&(e=e.substring(1,e.length)),l=e+o.geomRep.filename}if(!0===s?this.manager.registerReference(i,{boundingSphere:null,boundingBox:n,url:this.zipArchive?void 0:l,src:this.zipArchive?{zipArchive:this.zipArchive,path:l}:void 0,handlerType:o.geomRep?"repRef":"ref"}):0==this.childSet.has(t+" : "+i+" : "+a)&&(this.childSet.add(t+" : "+i+" : "+a),this.manager.addChild(t,i,{instanceId:a+this.cnt++,matrix:r})),!o.geomRep){let e=o.childrenList.length;for(let t=0;t<e;t++)this.processInstance(o.childrenList[t],i,s)}},l.prototype.handlePathes=function(e,t,s){if(1!==e.length)throw new Error("Invalid pathes.length ("+e.length+")");if(1!==e[0].ids.length)throw new Error("Invalid pathes.ids.length ("+e.ids.length+")");this.ready=!1,this.onHandlePathesCB&&this.onHandlePathesCB(e,t,s),setTimeout(this.handlePathes_internal.bind(this,e,t,s),0)},l.prototype.handlePathes_internal=function(e,t,s){this.manager.startInstRefGraphTransaction(),this.assyProductsMap.forEach((e,t)=>{if(e.isRoot){let t=e.childrenList.length;for(let s=0;s<t;s++)this.processInstance(e.childrenList[s],"root_url",!0)}}),this.assyProductsMap.forEach((e,t)=>{if(e.isRoot){let t=e.childrenList.length;for(let s=0;s<t;s++)this.processInstance(e.childrenList[s],"root_url",!1)}});let a=this.manager.getHandler("repRef").rootId;this.manager.freezeRoot(a),this.manager.endInstRefGraphTransaction(),this.ready=!0,t.doneCB(e,[])},l});