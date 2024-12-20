<%--
  emxbomMLBOMReportDialogFS.jsp
  � Dassault Systemes, 1993 - 2010.  All rights reserved.
  This program contains proprietary and trade secret information of MatrixOne,
  Inc.  Copyright notice is precautionary only
  and does not evidence any actual or intended publication of such program

  static const char RCSID[] =$Id: emxbomMLBOMReportDialogFS.jsp.rca 1.15 Wed Oct 22 16:21:17 2008 przemek Experimental przemek $
--%>
<%@include file="../emxUIFramesetUtil.inc"%>
<%@include file="../engineeringcentral/emxEngrFramesetUtil.inc"%>

<%
  framesetObject fs = new framesetObject();

  fs.setDirectory(appDirectory);

  String initSource = emxGetParameter(request,"initSource");
  if (initSource == null){
    initSource = "";
  }
  String jsTreeID = emxGetParameter(request,"jsTreeID");
  String suiteKey = emxGetParameter(request,"suiteKey");


  // ----------------- Do Not Edit Above ------------------------------
  /**
   * displayPage holds the value BOM or AVL.
   * Based on the displayPage variable location selector is displayed in 'Select Levels to Display' page.
   */
    String displayPage = emxGetParameter(request,"displayPage");
  /**
   */

  // Add Parameters Below
  String objectId = emxGetParameter(request,"objectId");

  // Specify URL to come in middle of frameset
  String contentURL = "emxbomCPXMLBOMReportDialog.jsp";

  // add these parameters to each content URL, and any others the App needs
  contentURL += "?suiteKey=" + suiteKey + "&initSource=" + initSource + "&jsTreeID=" + jsTreeID;
  contentURL += "&objectId=" + objectId;
  contentURL += "&displayPage="+displayPage;

  String PageHeading = "emxEngineeringCentral.EBOM.MultiLevelBOMReportPageHeading";
  //String HelpMarker = "emxhelppartbommultilevelreport";
  /**
   * If the displayPage is AVL Report, modify the Page Heading accordingly.
   */
  if (displayPage.equalsIgnoreCase("AVL")) {
    PageHeading = "emxEngineeringCentral.Part.AVL.MultiLevelAVLReportPageHeading";
    //HelpMarker = "emxhelppartbomavlmulti";
  }

  // Marker to pass into Help Pages
  // icon launches new window with help frameset inside
  //String HelpMarker = "emxhelppartbommultilevelreport";

  // Done as part of fix for IR-098236V6R2012 (earlier HelpMarker values is commented)
  // Need to look into emxbomCPXMLBOMReportDialog.jsp again for HelpMarkers used (if not relevant)
  String HelpMarker = "emxhelpmultiavlreport";

  fs.initFrameset(PageHeading,HelpMarker,contentURL,false,true,false,false);
  fs.setStringResourceFile("emxEngineeringCentralStringResource");
  fs.setSuiteKey(suiteKey);  // Done as part of fix for IR-100972V6R2012x, which enables relevant help

  if (acc.has(Access.cRead)) {
 // Role based access
 /*String roleList = "role_DesignEngineer,role_SeniorDesignEngineer,role_ManufacturingEngineer,role_SeniorManufacturingEngineer,role_ECRCoordinator,role_ECREvaluator,role_ECRChairman,role_ProductObsolescenceManager,role_PartFamilyCoordinator,role_SupplierEngineer,role_SupplierRepresentative";*/
 String roleList ="role_GlobalUser";

  fs.createCommonLink("emxEngineeringCentral.Common.Done",
                      "doneMethod()",
                       roleList,
                      false,
                      true,
                      "common/images/buttonDialogDone.gif",
                      false,
                      4);

  fs.createCommonLink("emxEngineeringCentral.Common.Cancel",
                      "parent.window.close()",
                       roleList,
                      false,
                      true,
                      "common/images/buttonDialogCancel.gif",
                      false,
                      0);
  }
  // ----------------- Do Not Edit Below ------------------------------

  fs.writePage(out);

%>
