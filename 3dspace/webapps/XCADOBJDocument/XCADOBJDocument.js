define("DS/XCADOBJDocument/XCADOBJTessellatedRepresentation",["DS/XCADInputDocuments/XCADTessellatedRepresentation","DS/XCADInputDocuments/XCADRepresentation","DS/XCADInputDocuments/XCADFaceData"],function(e,t,n){"use strict";return e.extend(function(){this._representationType=t.XCAD_TESSELLATED_REPRESENTATION,this._NodeList=[],this._NodeList.push({_NodeType:e.KindOfNode.NOD_ContainerNode,_ChildList:[]})},{getChild:function(t,n){var i=null;if(!(t>=0&&t<=this._NodeList.length))throw"Error: Invalid NodeID !";if(e.KindOfNode.NOD_GP===this._NodeList[t]._NodeType)throw'Error: Current node is not a kind of "Container Node " !';return n>=0&&n<this._NodeList[t]._ChildList.length&&(i=this._NodeList[t]._ChildList[n]),i},getChildCount:function(t){if(!(t>=0&&t<=this._NodeList.length))throw"Error: Invalid NodeID !";if(e.KindOfNode.NOD_GP===this._NodeList[t]._NodeType)throw'Error: Current node is not a kind of "Container Node " !';return this._NodeList[t]._ChildList.length},getCircleData:function(e){throw"Error: not implemented method"},getConeData:function(e){throw"Error: not implemented method"},getCoordinateSystem:function(e){throw"Error: not implemented method"},getCylinderData:function(e){throw"Error: not implemented method"},getEdgeData:function(e){throw"Error: not implemented method"},getFaceData:function(t){if(!(t>=0&&t<=this._NodeList.length))throw"Error: Invalid NodeID";if(e.KindOfNode.NOD_GP!==this._NodeList[t]._NodeType||e.KindOfGP.GP_Face!==this._NodeList[t]._GPType)throw"Error: Current node is not a GP_Face";return this._NodeList[t]._GPData},getGPType:function(t){e.KindOfGP.GP_Unknown;if(!(t>=0&&t<=this._NodeList.length))throw"Error: Invalid NodeID";if(e.KindOfNode.NOD_GP!==this._NodeList[t]._NodeType)throw"Error: Current node is not a NOD_GP";return this._NodeList[t]._GPType},getNodeBoundingSphere:function(e){throw"Error: not implemented method"},getNodeColor:function(e){return[.825,.825,1,1]},getNodeOrientationMatrix:function(e){throw"Error: not implemented method"},getNodeType:function(t){e.KindOfNode.NOD_Unknown;if(!(t>=0&&t<=this._NodeList.length))throw"Error: Invalid NodeID !";return this._NodeList[t]._NodeType},getNodeUID:function(e){throw"Error: not implemented method"},getPlaneData:function(e){throw"Error: not implemented method"},getPointData:function(e){throw"Error: not implemented method"},getPolyLineData:function(e){throw"Error: not implemented method"},getRootNode:function(e){return 0},getRootNodesCount:function(){return 1},getSAG:function(e){throw"Error: not implemented method"},getSphereData:function(e){throw"Error: not implemented method"},isIndexed:function(){return!0},createContainerNode:function(t,n){var i=null;if(e.KindOfNode.NOD_GP===this._NodeList[n]._NodeType)throw"Error: cannot add child to a GP node !";return this._NodeList.push({_NodeType:t,_ChildList:[]}),i=this._NodeList.length-1,this._NodeList[n]._ChildList.push(i),i},createGPNode:function(t,n,i){var r=null;if(e.KindOfNode.NOD_GP===this._NodeList[i]._NodeType)throw"Error: cannot add child to a GP node !";return this._NodeList.push({_NodeType:e.KindOfNode.NOD_GP,_GPType:t,_GPData:n}),r=this._NodeList.length-1,this._NodeList[i]._ChildList.push(r),r}})}),define("DS/XCADOBJDocument/XCADOBJInputDocument",["DS/XCADInputDocuments/XCADInputDocument","DS/XCADInputDocuments/XCADRepresentation","DS/XCADInputDocuments/XCADTessellatedRepresentation","DS/XCADInputDocuments/XCADFaceData","DS/XCADOBJDocument/XCADOBJTessellatedRepresentation"],function(e,t,n,i,r){"use strict";return e.extend(function(){this._TessellatedRep=null},{close:function(){this._TessellatedRep=null},getRepresentation:function(e){var n=null;return e===t.XCAD_TESSELLATED_REPRESENTATION&&(n=this._TesselatedRepresentation),n},initialize:function(e){function t(e){var t=[],n=[];t[0]=e[1]._x-e[0]._x,t[1]=e[1]._y-e[0]._y,t[2]=e[1]._z-e[0]._z,n[0]=e[2]._x-e[0]._x,n[1]=e[2]._y-e[0]._y,n[2]=e[2]._z-e[0]._z;var i=t[1]*n[2]-t[2]*n[1],r=t[2]*n[0]-t[0]*n[2],s=t[0]*n[1]-t[1]*n[0],o=i*i+r*r+s*s,d=0;return 0!==o&&(d=1/Math.sqrt(o)),t=null,n=null,{_dx:i*=d,_dy:r*=d,_dz:s*=d}}this._TesselatedRepresentation=null;var s=e.split("\n"),o=s.length;e="";var d=[],a=[],p=-1,h=new i,l=[],u=/v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,_=/vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,c=/vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,f=/f( +\d+)( +\d+)( +\d+)( +\d+)?/,N=/f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/,g=/f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/,D=/f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/;if(o>0){this._TesselatedRepresentation=new r;for(var I=0;I<o;I++){var m,v=s[I].trim();if(0!==v.length&&"#"!==v.charAt(0))if(null!==(m=u.exec(v)))d.push({_x:parseFloat(m[1]),_y:parseFloat(m[2]),_z:parseFloat(m[3])});else if(null!==(m=_.exec(v)))a.push({_dx:parseFloat(m[1]),_dy:parseFloat(m[2]),_dz:parseFloat(m[3])});else{if(null!==(m=c.exec(v)))continue;if(null!==(m=f.exec(v))){(R=[]).push(d[parseInt(m[1])-1],d[parseInt(m[2])-1],d[parseInt(m[3])-1]);var T=t(R);if(void 0===m[4])for(var x=1;x<=3;x++){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";var O=parseInt(m[x])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(T._dx,T._dy,T._dz);var y=h.vertices.length/3-1;l.push(O)}h.singleTrianglesIndices.push(y)}else{var C=[];for(x=1;x<=4;x++){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(T._dx,T._dy,T._dz);y=h.vertices.length/3-1;l.push(O)}C.push(y)}h.stripTrianglesIndices.push(C[0]),h.stripTrianglesIndices.push(C[1]),h.stripTrianglesIndices.push(C[3]),h.stripTrianglesIndices.push(C[2]),h.nbVertexPerStripTriangle.push(4)}}else if(null!==(m=N.exec(v))){var R;(R=[]).push(d[parseInt(m[2])-1],d[parseInt(m[5])-1],d[parseInt(m[8])-1]);T=t(R);if(void 0===m[10])for(x=2;x<10;x+=3){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,Vertices[O]._y,d[O]._z),h.normals.push(T._dx,T._dy,T._dz);y=h.vertices.length/3-1;l.push(O)}h.singleTrianglesIndices.push(y)}else{for(C=[],x=2;x<12;x+=3){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(T._dx,T._dy,T._dz);y=h.vertices.length/3-1;l.push(O)}C.push(y)}h.stripTrianglesIndices.push(C[0]),h.stripTrianglesIndices.push(C[1]),h.stripTrianglesIndices.push(C[3]),h.stripTrianglesIndices.push(C[2]),h.nbVertexPerStripTriangle.push(4)}}else if(null!==(m=g.exec(v)))if(void 0===m[13])for(x=2;x<13;x+=4){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1;var E=parseInt(m[x+2])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(a[E]._dx,a[E]._dy,a[E]._dz);y=h.vertices.length/3-1;l.push(O)}h.singleTrianglesIndices.push(y)}else{for(C=[],x=2;x<16;x+=4){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1,E=parseInt(m[x+2])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(a[E]._dx,a[E]._dy,a[E]._dz);y=h.vertices.length/3-1;l.push(O)}C.push(y)}h.stripTrianglesIndices.push(C[0]),h.stripTrianglesIndices.push(C[1]),h.stripTrianglesIndices.push(C[3]),h.stripTrianglesIndices.push(C[2]),h.nbVertexPerStripTriangle.push(4)}else if(null!==(m=D.exec(v)))if(void 0===m[10])for(x=2;x<10;x+=3){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1,E=parseInt(m[x+1])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(a[E]._dx,a[E]._dy,a[E]._dz);y=h.vertices.length/3-1;l.push(O)}h.singleTrianglesIndices.push(y)}else{for(C=[],x=2;x<12;x+=4){if(parseInt(m[x])<0)throw"ERROR: Negative vertex indices are currently not supported !";O=parseInt(m[x])-1,E=parseInt(m[x+1])-1;if(-1===(y=l.indexOf(O))){h.vertices.push(d[O]._x,d[O]._y,d[O]._z),h.normals.push(a[E]._dx,a[E]._dy,a[E]._dz);y=h.vertices.length/3-1;l.push(O)}C.push(y)}h.stripTrianglesIndices.push(C[0]),h.stripTrianglesIndices.push(C[1]),h.stripTrianglesIndices.push(C[3]),h.stripTrianglesIndices.push(C[2]),h.nbVertexPerStripTriangle.push(4)}else if(/^o /.test(v))h.vertices.length>0&&(p=this._TesselatedRepresentation.createContainerNode(n.KindOfNode.NOD_SolidNode,0),this._TesselatedRepresentation.createGPNode(n.KindOfGP.GP_Face,h,p)),p=-1,h=new i,l=[];else{if(/^g /.test(v))continue;if(/^usemtl /.test(v))continue;if(/^mtllib /.test(v))continue;if(/^s /.test(v))continue;console.log("XCADOBJInputDocument: Unhandled record "+v)}}}h.vertices.length>0&&(p=this._TesselatedRepresentation.createContainerNode(n.KindOfNode.NOD_SolidNode,0),this._TesselatedRepresentation.createGPNode(n.KindOfGP.GP_Face,h,p))}}})});