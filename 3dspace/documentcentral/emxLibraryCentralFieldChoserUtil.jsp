<%--  emxLibraryCentalChoserFieldUtil.jsp

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxLibraryCentalChoserFieldUtil.jsp.rca 1.1 Wed Jan 14 05:57:06 2009 ds-smourougayan Experimental przemek $
--%>

<%@include file = "../common/emxNavigatorInclude.inc"%>
<%
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
String fieldNameActual = emxGetParameter(request, "fieldNameActual");
String uiType = emxGetParameter(request, "uiType");
String typeAhead = emxGetParameter(request, "typeAhead");
String frameName = emxGetParameter(request, "frameName");
String frameNameForField = emxGetParameter(request, "frameNameForField");
String fieldNameDisplay = emxGetParameter(request, "fieldNameDisplay");
String emxTableRowId[] = emxGetParameterValues(request, "emxTableRowId");
StringBuffer actualValue = new StringBuffer();
StringBuffer displayValue = new StringBuffer();
StringBuffer OIDValue = new StringBuffer();
for(int i=0;i<emxTableRowId.length;i++) {
    StringTokenizer strTokenizer = new StringTokenizer(emxTableRowId[i] , "|");
    String strObjectId = strTokenizer.nextToken() ;                         
    DomainObject objContext = new DomainObject(strObjectId);
    /*StringList strList = new StringList();
    strList.addElement(DomainConstants.SELECT_NAME);
    strList.addElement(DomainConstants.SELECT_TYPE);
    Map resultList = objContext.getInfo(context, strList);
    String strContextObjectName = (String)resultList.get("name");
    String strContextObjectType = (String)resultList.get("type");
    String strTypeSymbolicName  = UICache.getSymbolicName(context, strContextObjectType, "type");
	*/
	//Let us prefer to show title (if no title then lets show the name)
	String strContextObjectName = objContext.getInfo(context,DomainConstants.SELECT_ATTRIBUTE_TITLE);
	if(UIUtil.isNullOrEmpty(strContextObjectName))
		strContextObjectName = objContext.getInfo(context,DomainConstants.SELECT_NAME);
    OIDValue.append(strObjectId);
    actualValue.append(strContextObjectName.replaceAll("\"", "\\\\\"")); //spe22  IR-1067007-3DEXPERIENCER2024x
    /*if(!UIUtil.isNullOrEmpty(strTypeSymbolicName) && "type_Person".equals(strTypeSymbolicName)) {
        displayValue.append(PersonUtil.getFullName(context, strContextObjectName));
    } else {*/
        displayValue.append(strContextObjectName.replaceAll("\"", "\\\\\""));  //spe22  IR-1067007-3DEXPERIENCER2024x
    //}
        
    if(i!=emxTableRowId.length-1){
        actualValue.append("|");
        displayValue.append("|");
        OIDValue.append("|");
    }                           
}                       
%>

<%@page import="matrix.util.StringList,
                java.util.HashMap,
                com.matrixone.apps.domain.DomainObject,
                java.util.StringTokenizer,
                com.matrixone.apps.domain.DomainConstants,
                java.util.Map,
                com.matrixone.apps.domain.util.PersonUtil,
                com.matrixone.apps.framework.ui.UICache,
                com.matrixone.apps.framework.ui.UIUtil"
                %>
<script src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<script language="javascript" type="text/javaScript">

var typeAhead = "<%=XSSUtil.encodeForJavaScript(context, typeAhead)%>";
var targetWindow = null;
var uiType = "<%=XSSUtil.encodeForJavaScript(context, uiType)%>";
if(typeAhead == "true") {
    var frameName = "<%=XSSUtil.encodeForJavaScript(context, frameName)%>";
    if(frameName == null || frameName == "null" || frameName == "") {
        targetWindow = window.parent;
    } else {
        targetWindow = getTopWindow().findFrame(window.parent, frameName);
    }
    
    if(!targetWindow){
    	targetWindow = window.parent;
    }
} else {

	var frameName = "<%=XSSUtil.encodeForJavaScript(context, frameNameForField)%>";
	 if(frameName == null || frameName == "null" || frameName == "") {
		targetWindow = getTopWindow().getWindowOpener();
	 } else {
	      targetWindow = getTopWindow().findFrame(getTopWindow().getWindowOpener().getTopWindow(), frameName);
	 }
	 if(!targetWindow){
		 targetWindow = getTopWindow().getWindowOpener();
	 }
}

var tmpFieldNameActual = "<%=XSSUtil.encodeForJavaScript(context, fieldNameActual)%>";
var tmpFieldNameDisplay = "<%=XSSUtil.encodeForJavaScript(context, fieldNameDisplay)%>";
var tmpFieldNameOID = tmpFieldNameActual + "OID";

var vfieldNameActual = targetWindow.document.getElementById(tmpFieldNameActual) ? targetWindow.document.getElementById(tmpFieldNameActual) : targetWindow.parent.document.getElementById(tmpFieldNameActual);
var vfieldNameDisplay = targetWindow.document.getElementById(tmpFieldNameDisplay) ? targetWindow.document.getElementById(tmpFieldNameDisplay) : targetWindow.parent.document.getElementById(tmpFieldNameDisplay);
var vfieldNameOID = targetWindow.document.getElementById(tmpFieldNameOID) ? targetWindow.document.getElementById(tmpFieldNameOID) : targetWindow.parent.document.getElementById(tmpFieldNameOID);

if (vfieldNameActual==null && vfieldNameDisplay==null) {
	vfieldNameActual=targetWindow.document.forms[0][tmpFieldNameActual];
	vfieldNameDisplay=targetWindow.document.forms[0][tmpFieldNameDisplay];
	vfieldNameOID=targetWindow.document.forms[0][tmpFieldNameOID];
}

if (vfieldNameActual==null && vfieldNameDisplay==null) {
	if(targetWindow.parent.document.forms[0]){
		vfieldNameActual=targetWindow.parent.document.forms[0][tmpFieldNameActual] ? targetWindow.parent.document.forms[0][tmpFieldNameActual] : targetWindow.document.forms[0][tmpFieldNameActual];
		vfieldNameDisplay=targetWindow.parent.document.forms[0][tmpFieldNameDisplay] ? targetWindow.parent.document.forms[0][tmpFieldNameDisplay] : targetWindow.document.forms[0][tmpFieldNameDisplay];
		vfieldNameOID=targetWindow.parent.document.forms[0][tmpFieldNameOID] ? targetWindow.parent.document.forms[0][tmpFieldNameOID] : targetWindow.document.forms[0][tmpFieldNameOID];
	}
}

if (vfieldNameActual==null && vfieldNameDisplay==null) {
vfieldNameActual=targetWindow.document.getElementsByName(tmpFieldNameActual)[0] ? targetWindow.document.getElementsByName(tmpFieldNameActual)[0] : targetWindow.parent.document.getElementsByName(tmpFieldNameActual)[0];
vfieldNameDisplay=targetWindow.document.getElementsByName(tmpFieldNameDisplay)[0] ? targetWindow.document.getElementsByName(tmpFieldNameDisplay)[0] : targetWindow.parent.document.getElementsByName(tmpFieldNameDisplay)[0];
vfieldNameOID=targetWindow.document.getElementsByName(tmpFieldNameOID)[0] ? targetWindow.document.getElementsByName(tmpFieldNameOID)[0] : targetWindow.parent.document.getElementsByName(tmpFieldNameOID)[0];
}

/*
   FIX IR-088125V6R2012 
   In IE8, for some use-cases, getElementsByName doesn't work when 
   accessing URL with its full name. Below code address the issue.
 */
if (vfieldNameActual==null && vfieldNameDisplay==null) {
     var elem = targetWindow.document.getElementsByTagName("input");
     var att;
     var iarr;
     for(i = 0,iarr = 0; i < elem.length; i++) {
        att = elem[i].getAttribute("name");
        if(tmpFieldNameDisplay == att) {
            vfieldNameDisplay = elem[i];
            iarr++;
        }
        if(tmpFieldNameActual == att) {
            vfieldNameActual = elem[i];
            iarr++;
        }
        if(iarr == 2) {
            break;
        }
    }
}
/* FIX - END */

vfieldNameDisplay.value ="<%=displayValue%>" ;
vfieldNameActual.value ="<%=actualValue%>" ;

if(vfieldNameOID != null) {
vfieldNameOID.value ="<xss:encodeForJavaScript><%=OIDValue%></xss:encodeForJavaScript>" ;
} else if(uiType === "createForm" || uiType === "form") {
vfieldNameActual.value ="<xss:encodeForJavaScript><%=OIDValue%></xss:encodeForJavaScript>" ;
}

/*Below function should be invoked to update the filter values */
if(targetWindow.updateFilters) {
targetWindow.updateFilters("<xss:encodeForJavaScript><%=fieldNameDisplay%></xss:encodeForJavaScript>","<xss:encodeForJavaScript><%=displayValue%></xss:encodeForJavaScript>",true);
}

if(typeAhead != "true") {
getTopWindow().closeWindow();
}
</script>
