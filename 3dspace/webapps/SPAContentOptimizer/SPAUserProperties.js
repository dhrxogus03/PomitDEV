/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
define("DS/SPAContentOptimizer/SPAUserProperties",["DS/CSICommandBinder/CSICommandBinder","DS/SPAContentOptimizer/SPAProperty"],function(e,r){"use strict";var t,n=function(){this.name="",this.Properties=[]};return t=e,new r,t.declareType({type:"SPAUserProperties",serialize:function(e,r){return e.writeString("name",r.name),e.writeObjectArray("properties","SPAProperty",r.properties),!0},unserialize:function(e){var r=new n;return r.name=e.readString("name"),r.properties=e.readObjectArray("properties","SPAProperty"),r}}),n});