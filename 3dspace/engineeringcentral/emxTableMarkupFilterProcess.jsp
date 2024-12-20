<%--  emxTableMarkupFilterProcess.jsp
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of Dassault Systemes
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program
--%>

<%@include file = "../common/emxNavigatorInclude.inc"%>
<jsp:useBean id="tableBean" class="com.matrixone.apps.framework.ui.UITable" scope="session"/>
<%@ page import="com.matrixone.apps.engineering.Part" %>
<%@ page import="com.matrixone.apps.domain.*" %>

<%@ page import="com.matrixone.apps.domain.util.ContextUtil"%>

<%

ContextUtil.pushContext(context);


String tableID = emxGetParameter(request, "tableID");
String selectedState = emxGetParameter(request,"filterState");
String selectedOwner=emxGetParameter(request,"filterowner");
MapList relBusObjList = tableBean.getObjectList(tableID);

HashMap tableData = tableBean.getTableData(tableID);
HashMap requestMap = tableBean.getRequestMap(tableData); 


String objectId=(String)requestMap.get("objectId");


DomainObject domobj=new DomainObject();
domobj.setId(objectId);


MapList filteredObjPageList = new MapList();



String relpattern="";
String typepattern="";
relpattern=PropertyUtil.getSchemaProperty(context,"relationship_EBOMMarkup");
typepattern=PropertyUtil.getSchemaProperty(context,"type_BOMMarkup");
	

StringList selectStmts = new StringList(3);
selectStmts.addElement(DomainConstants.SELECT_ID);
selectStmts.addElement(DomainConstants.SELECT_OWNER);
selectStmts.addElement(DomainConstants.SELECT_CURRENT);
    	
StringList selectRelStmts = new StringList(1);
selectRelStmts.addElement(DomainConstants.SELECT_RELATIONSHIP_ID);

	

String sWhere="";

// Enters If Loop if selectedState filter is Other than All
if(!selectedState.equalsIgnoreCase("All"))
{
	// Enters If Loop if Owner is other than All
	if(!selectedOwner.equalsIgnoreCase("All"))
	{
		sWhere="current=="+"\""+selectedState+"\""+"&&"+"owner=="+"\""+selectedOwner+"\"";
	}
	//Enters Else Loop if Owner is All
	else
	{
		sWhere="current=="+"\""+selectedState+"\"";
	}
 
}
//Enters Else Loop if selectedState filter is All
else
{	//Enters If Loop if Owner is other than All
	if(!selectedOwner.equalsIgnoreCase("All"))
	{
		sWhere="owner=="+"\""+selectedOwner+"\"";
	}
	// Enters Else Loop if State and  owner are All
	else
	{
		sWhere=null;
	}

		
}

filteredObjPageList = domobj.getRelatedObjects(context,
									relpattern,
									typepattern,
									selectStmts,
									selectRelStmts,
									false,
									true,
									(short)1,
									sWhere,
									null);
         

// Set the MapList to the table
tableBean.setFilteredObjectList(tableID,filteredObjPageList);


ContextUtil.popContext(context);	

%>
<script language="JavaScript">
parent.refreshTableBody();
</script>


