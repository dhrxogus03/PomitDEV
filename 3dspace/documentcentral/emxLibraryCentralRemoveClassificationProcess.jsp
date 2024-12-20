<%-- emxLibraryCentralRemoveClassificationProcess.jsp
   Copyright (c) 1992-2016 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program
--%>

<%@ include file ="../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%@include file="emxLibraryCentralUtils.inc"%>

    <%@ page import    ="com.matrixone.apps.library.LibraryCentralConstants,
				com.matrixone.json.JSONObject"%>

<%

    String objectId             = emxGetParameter(request, "objectId");
    String selectedClassIds     = emxGetParameter(request,"selectedClassIds");
    RelationshipType relType    = new RelationshipType();
    DomainObject doChildObj     = new DomainObject(objectId);
    String selectedClassId      = "";
    StringList slSelectedClassIds   = FrameworkUtil.split(selectedClassIds, ",");
    StringBuffer strErrMsg          = new StringBuffer("");
    String childIds[] = new String[1];
    childIds[0] = objectId;
    Classification baseObject =(Classification)DomainObject.newInstance(context,LibraryCentralConstants.TYPE_PART_FAMILY,LibraryCentralConstants.LIBRARY);
    
    for(int i = 0; i < slSelectedClassIds.size(); i++) {
        DomainObject doParentObj= new DomainObject((String)slSelectedClassIds.get(i));
        try {
            baseObject.removeClassifiedItems(context,childIds,(String)slSelectedClassIds.get(i));
        } catch(Exception e) {
            StringList selectables = new StringList();
            selectables.add(DomainConstants.SELECT_TYPE);
            selectables.add(DomainConstants.SELECT_NAME);
            Map objInfo = doParentObj.getInfo(context,selectables);
            strErrMsg.append("\n").append(objInfo.get(DomainConstants.SELECT_TYPE));
            strErrMsg.append(" ").append(objInfo.get(DomainConstants.SELECT_NAME));
        }
    }
    if(strErrMsg.length() > 0){
        String strCannotRemoveMessage = EnoviaResourceBundle.getProperty(context, "emxLibraryCentralStringResource", new Locale(sLanguage), "emxLibraryCentral.Message.CannotRemoveMessage");
        strCannotRemoveMessage = strCannotRemoveMessage + strErrMsg;
%>
<script language="javascript" type="text/javaScript">
    alert("<%=XSSUtil.encodeForJavaScript(context, strCannotRemoveMessage)%>");
</script>
<%}%>

<script language="javascript" src="../components/emxComponentsTreeUtil.js"></script>
<script>
    var vParentObjectIds = "<xss:encodeForJavaScript><%=selectedClassIds%></xss:encodeForJavaScript>";
    var vAppDirectory    = "<xss:encodeForJavaScript><%=appDirectory%></xss:encodeForJavaScript>";
    updateCountAndRefreshTree(vAppDirectory, getTopWindow(), vParentObjectIds );
    getTopWindow().refreshTablePage();
</script>
