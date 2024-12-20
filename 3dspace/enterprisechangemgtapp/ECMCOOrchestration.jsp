<%--
  ECMCOOrchestration.jsp
  
  Copyright (c) 2018-2020 Dassault Systemes.
  All Rights Reserved.
  This program contains proprietary and trade secret information of 
  Dassault Systemes.
  Copyright notice is precautionary only and does not evidence any actual
  or intended publication of such program
--%>

<%-- Common Includes --%>

<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../common/emxUIConstantsInclude.inc"%>

<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="com.matrixone.apps.domain.util.MqlUtil"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import = "com.matrixone.apps.domain.DomainConstants"%>
<%@page import="com.matrixone.apps.common.Person"%>
<%@page import="com.matrixone.apps.domain.util.PersonUtil"%>

<%
  out.clear();
  String urlStr = "";
  String  strContextID = "";
  String strObjectType = "";
  boolean bIsError = false;
  String userFullName = "";
  try
  {
    String objectId = emxGetParameter(request,"objectId");
    DomainObject rootDom = new DomainObject(objectId);
    strContextID = rootDom.getInfo(context, "physicalid");

    String contextUser = Person.getPerson(context).getName();
    userFullName = PersonUtil.getFullName(context, contextUser);
  }
  catch(Exception e)
  {
    bIsError=true;
    session.putValue("error.message", e.getMessage());
  }// End of main Try-catck block
%>
<html>
<head>
<script type="text/javascript" src="../webapps/AmdLoader/AmdLoader.js"></script>
<link rel="stylesheet" type="text/css" href="../webapps/c/UWA/assets/css/standalone.css" />
<script type="text/javascript" src="../webapps/c/UWA/js/UWA_Standalone_Alone.js"></script>
<script type="text/javascript" src="../webapps/WebappsUtils/WebappsUtils.js"></script>
<script type="text/javascript" src="../webapps/UIKIT/UIKIT.js"></script>
<script language="Javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script type="text/javascript" src="../webapps/PlatformAPI/PlatformAPI.js"></script>
<script type="text/javascript" src="../webapps/ENOChangeActionUX/ENOChangeActionUX.js"></script>
 
<style type="text/css">
    .tile-title{
        font-size: 15px;
        font-family: '3dsregular' tahoma,serif;
        color: #368ec4;
    }
    .module{
        width:100%;
        height:99%;
        margin: 0;
        border: none;
    }
    .moduleWrapper {
        z-index: inherit;
        zoom: 1;
    }
    .module > .moduleHeader {
        display: none;
    }
    .moduleFooter {
        display: none;
    }
    #coOrchestrationParentContainer .content-orchestration-tile-div, #coOrchestrationParentContainer .content-orchestration-grid-div {
      height: calc(100% - 30px) !important;
    }
	
	#coOrchestrationBody .datepicker, #coOrchestrationBody .select-dropdown, #coOrchestrationBody .dropdown-menu {
      z-index: 50000 !important;
    }
	#coOrchestrationBody .select-results {
      text-align: left !important;
    }	
	
</style>
<script>

    function loadCOOrchestrationContent(){
          
        require(['DS/PlatformAPI/PlatformAPI',
            'DS/ENOChangeActionUX/scripts/CASpinner',
            'DS/ENOChgServices/scripts/services/ChgInfraService',
            'DS/ENOChgServices/scripts/services/ChgServiceGlobalVariable',
            "DS/ENOChgServices/scripts/services/ChgDataService",
            'DS/CoreEvents/ModelEvents',
            'DS/ENOChgGovernanceUX/scripts/view/facets/changeOrchestration/ChgOrchestrationDataGridLayout',
            "DS/ENOChgServices/scripts/services/ChgCustomAttributeService",
			"DS/ENOChgServices/scripts/services/UserPreferenceUtil",
			"DS/ENOChgServices/scripts/services/DefaultPreferencesManager",
			'UWA/Class/Promise'
        ],
        function(PlatformAPI, CASpinner,ChgInfraService,ChgServiceGlobalVariable, ChgDataService, ModelEvents, ChgOrchestrationDataGridLayout,ChgCustomAttributeService, UserPreferenceUtil, DefaultPreferencesManager, Promise){
                 
            ChgInfraService.init();
            var curTenant = "OnPremise";
            <%
                if(!FrameworkUtil.isOnPremise(context)){
            %>
					       curTenant = "<%=XSSUtil.encodeForJavaScript(context, context.getTenant())%>";
            <%
                }
            %>
            
			      window.enoviaServer.tenant = curTenant;
            var caGlobalObject = ChgServiceGlobalVariable.getGlobalVariable();
            caGlobalObject.tenant = curTenant;
            caGlobalObject.is3DSpace = true;   

            var userFullName = '<%=userFullName%>';
            caGlobalObject.contextUserFullName = userFullName; 
            
            var userId = "<%=XSSUtil.encodeForJavaScript(context, context.getUser())%>";
            var language = "<%=XSSUtil.encodeForJavaScript(context, context.getSession().getLanguage())%>";
                    
            var randomName = "wdg_" + new Date().getTime();
            ChgInfraService.setupIntercomConnections.call(this, widget, caGlobalObject, randomName);
            widget.body.setStyle("min-height", "50px");
            CASpinner.set3DSpace(true);
            CASpinner.doWait(widget.body);
            var currentTop = getTopWindow();
            while (currentTop && currentTop.x3DPlatformServices == undefined) {
                if (currentTop.getWindowOpener().getTopWindow()) currentTop = currentTop.getWindowOpener().getTopWindow();
            }
					  
			      caGlobalObject.compassWindow = currentTop;
					 
            var myAppBaseURL=""; 
            if (currentTop && currentTop.x3DPlatformServices) {
                for(var tenantCounter=0 ; tenantCounter < currentTop.x3DPlatformServices.length ; tenantCounter++){
                    var tenantDetails = currentTop.x3DPlatformServices[tenantCounter];
                    if(tenantDetails && tenantDetails.platformId == curTenant){
                        myAppBaseURL = tenantDetails["3DCompass"];
                        break;
                    }
                }
            }

            var config = {
                myAppsBaseUrl: myAppBaseURL,
                userId: userId,
                lang: language
            };
                       
            ChgInfraService.populate3DSpaceURL(config).then(function(success){
              ChgInfraService.populateSecurityContext().then(function (securityContextDetails){
                ChgInfraService.getCSRFToken().then(function (success){
				
				UserPreferenceUtil.initialize({
				  prefix: "CHG",
				  storage: ChgServiceGlobalVariable.getGlobalVariable(),

				});
				
				let platform = "WebApp";
				var promisesArr = [];
				promisesArr.push(UserPreferenceUtil.fetchUserPreference(DefaultPreferencesManager.preferences));
				promisesArr.push(ChgInfraService.getSearchForbiddenTypes());
				promisesArr.push(ChgInfraService.getSearchTypes());
				promisesArr.push(ChgInfraService.getExpressionValue());
				promisesArr.push(ChgInfraService.iaSubTypesFetched());
				promisesArr.push(ChgCustomAttributeService.coSubTypesFetched());
				promisesArr.push(ChgCustomAttributeService.crSubTypesFetched());
				promisesArr.push(ChgCustomAttributeService.iaSubTypesFetched());
				promisesArr.push(ChgInfraService.caSubTypesFetched());
				promisesArr.push(ChgInfraService.getLicenceAccess(platform));
				
				Promise.all(promisesArr).then(function (promiseResultList) {
					
					var that = this;
					
					ChgServiceGlobalVariable.getGlobalVariable().isFullLicence = promiseResultList[9].data[0].IsFullLicense;
                    ChgServiceGlobalVariable.getGlobalVariable().isLiteLicence = promiseResultList[9].data[0].IsLiteLicense;
                    ChgServiceGlobalVariable.getGlobalVariable().isDerivativeLicense = promiseResultList[9].data[0].isDerivativeLicense;
					
					var physicalID = '<%=strContextID%>';
					
					var coOrchestrationFullViewContainer = UWA.createElement('div', {
					  'class' : 'divElem', 
					  'id' : 'coOrchestrationFullViewContainer',
					  'styles' : {
						'height' : 'calc(100% - 20px)',
						'width': '100%'
					  }
					});

					var coOrchestrationSlideInContainer = UWA.createElement('div', {
					  'class' : 'divElem', 
					  'id' : 'coOrchestrationSlideInContainer',
					  'styles': { 'height': '100%', 'width': '0', 'position': 'fixed', 'zIndex': '1', 'top': '0', 'right': '0', 'overflowX': 'hidden', 'transition': '.5s', 'borderLeft': '0 solid #d1d4d4', 'background': 'white' }
					});
										
					var maincontainer = document.getElementById('coOrchestrationParentContainer');
					
					maincontainer.appendChild(coOrchestrationFullViewContainer);
					maincontainer.appendChild(coOrchestrationSlideInContainer);
					
					var appChannelOptions = {};
					appChannelOptions.name = "appChannelModleEvent";
									
					var input = {};
					input.id = physicalID;
									input.contextDetails = {'id': physicalID, isKindOfType: 'ChangeOrder'};
					input.target = coOrchestrationFullViewContainer;
					input.infoPanelContainer = coOrchestrationSlideInContainer;
					input.isSelected = true;

					//for different component integration from dashboard like maturity/generic create etc.
					Array.prototype.find = function (userFunction) {
					  var bFound = false;
					  for (var i=0; i  < this.length ; i++) {
						if (userFunction(this[i])) {
						  return this[i];
						}
					  }
					  return undefined;  
					}

					delete Array.prototype.remove;
					delete Array.prototype.apply;
					//for different component integration from dashboard like maturity/generic create etc.

					ChgDataService.getChangeOrderUserAccess(physicalID).then(function (resp) {
						ChgOrchestrationDataGridLayout.createChangeOrchestrationView(input, new ModelEvents(appChannelOptions));
									
						CASpinner.endWait(widget.body);
						var contextId = physicalID;
						var type = resp.data[0].type;
						var accessBits = resp.data[0].dataelements;

						var processedResponse = {
						  id: contextId,
						  type: type,
						  accessBits: accessBits,
						};
						PlatformAPI.publish("CO-AccessBit-Update", processedResponse);
					});
				});	//end of promise.all
					
				/*
                ChgInfraService.getSearchForbiddenTypes();
                ChgInfraService.getSearchTypes();
                ChgInfraService.getExpressionValue().then(function (success) {
				
				
				
				let platform = "WebApp";
				ChgInfraService.getLicenceAccess(platform).then(function(response){
					ChgServiceGlobalVariable.getGlobalVariable().isFullLicence = response.data[0].IsFullLicense;
					ChgServiceGlobalVariable.getGlobalVariable().isLiteLicence = response.data[0].IsLiteLicense;
					ChgServiceGlobalVariable.getGlobalVariable().isDerivativeLicense = response.data[0].isDerivativeLicense;
					
                  ChgInfraService.iaSubTypesFetched()
                              .then(function(success){
                                ChgCustomAttributeService.coSubTypesFetched()
                                  .then(function(success){
                                    ChgCustomAttributeService.crSubTypesFetched()
                                  .then(function(success){
                                ChgCustomAttributeService.iaSubTypesFetched()
                                  .then(function(success){
									  ChgInfraService.caSubTypesFetched()
									  .then(function(success){
								var that = this;
                var physicalID = '<%=strContextID%>';
                
                var coOrchestrationFullViewContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'coOrchestrationFullViewContainer',
                  'styles' : {
                    'height' : 'calc(100% - 20px)',
                    'width': '100%'
                  }
                });

                var coOrchestrationSlideInContainer = UWA.createElement('div', {
                  'class' : 'divElem', 
                  'id' : 'coOrchestrationSlideInContainer',
                  'styles': { 'height': '100%', 'width': '0', 'position': 'fixed', 'zIndex': '1', 'top': '0', 'right': '0', 'overflowX': 'hidden', 'transition': '.5s', 'borderLeft': '0 solid #d1d4d4', 'background': 'white' }
                });
                                    
                var maincontainer = document.getElementById('coOrchestrationParentContainer');
                
                maincontainer.appendChild(coOrchestrationFullViewContainer);
                maincontainer.appendChild(coOrchestrationSlideInContainer);
                
                var appChannelOptions = {};
                appChannelOptions.name = "appChannelModleEvent";
                                
                var input = {};
                input.id = physicalID;
								input.contextDetails = {'id': physicalID, isKindOfType: 'ChangeOrder'};
                input.target = coOrchestrationFullViewContainer;
                input.infoPanelContainer = coOrchestrationSlideInContainer;
				input.isSelected = true;

                //for different component integration from dashboard like maturity/generic create etc.
                Array.prototype.find = function (userFunction) {
                  var bFound = false;
                  for (var i=0; i  < this.length ; i++) {
                    if (userFunction(this[i])) {
                      return this[i];
                    }
                  }
                  return undefined;  
                }

                delete Array.prototype.remove;
                delete Array.prototype.apply;
                //for different component integration from dashboard like maturity/generic create etc.

                ChgDataService.getChangeOrderUserAccess(physicalID).then(function (resp) {
                    ChgOrchestrationDataGridLayout.createChangeOrchestrationView(input, new ModelEvents(appChannelOptions));
                                
                    CASpinner.endWait(widget.body);
                    var contextId = physicalID;
                    var type = resp.data[0].type;
                    var accessBits = resp.data[0].dataelements;

                    var processedResponse = {
                      id: contextId,
                      type: type,
                      accessBits: accessBits,
                    };
                    PlatformAPI.publish("CO-AccessBit-Update", processedResponse);
                });
                                        //resolve();
								   })
                                 })
                                })//end of ChgCustomAttributeService.crSubTypesFetched
                          })//end of ChgCustomAttributeService.coSubTypesFetched
                        })//end of ChgInfraService.iaSubTypesFetched 
                 

                });//end of get expression

				});
				
				*/
				
              });
              });
            });
        });
	  }   
</script>
</head>
<body id="coOrchestrationBody" onLoad = "loadCOOrchestrationContent();" style="overflow:hidden;">
<div id="coOrchestrationParentContainer" style="height: 100%; width: 100%; display: flex;"></div>
</body>
</html>  
