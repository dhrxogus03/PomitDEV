define("DS/MePreferencesUIBuilder/MePreferencesAdminWidget", [
    "DS/Controls/Tab",
    "DS/Controls/Button",
    "DS/CollectionView/ResponsiveTilesCollectionView",
    "DS/TreeModel/TreeDocument",
    "DS/TreeModel/TreeNodeModel",
    "DS/WebappsUtils/WebappsUtils",
    "DS/MePreferencesUIBuilder/MePreferencesMainView",
    "DS/MePreferencesUIBuilder/MePreferencesSelectionModel",
    "DS/PlatformAPI/PlatformAPI",
    "DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices",
    "DS/WAFData/WAFData",
    "i18n!DS/MePreferencesUIBuilder/assets/nls/translation",
    "DS/Windows/Dialog",
    "DS/Windows/ImmersiveFrame",
    'DS/Notifications/NotificationsManagerUXMessages',
    'DS/Notifications/NotificationsManagerViewOnScreen',
    "DS/Utilities/Dom"

],
    function (WUXTab, WUXButton, WUXResponsiveTilesCollectionView,
        TreeDocument, TreeNodeModel, WebappsUtils, MePreferencesMainView, MePreferencesSelectionModel,
        PlatformAPI, i3DXCompassPlatformServices, WAFData, mePrefWidgetTranslation, WUXDialog, WUXImmersiveFrame,
        NotificationsManagerUXMessages, WUXNotificationsManagerViewOnScreen, Dom) {
        "use strict";

        var SET_ADMIN_PROFILE_ENDPOINT = "/api/v1/admin_profile/preferences";
        var DEFAULT_ADMIN_PROFILE_DATA_ENDPOINT = "/api/v1/admin_profile/preferences";
        var DEFAULT_PROFILE_NAME = "Default";
        var OVERRIDE_GLOBAL_KEY = "overrideGlobal";
        var PROFILE_NAME_KEY = "profile_name";
        const removeImmEvent = new Event("ResetDialogImmFrameRemoved");
        var immersiveFrame = null;

        var serviceURL = "";
        var repoPrefNameObjAdminProfileMap = null;
        var repoPrefNameObjDefaultValueMap = null;
        var adminProfileValues = null;

        var widgetContentDiv = null;

        window.notifs = NotificationsManagerUXMessages;
        WUXNotificationsManagerViewOnScreen.setNotificationManager(window.notifs);
        WUXNotificationsManagerViewOnScreen.setStackingPolicy(1);

        /**
         * @private
         */
        function prepareDefaultValueRspMap(respMap) {

            if (repoPrefNameObjDefaultValueMap == null)
                repoPrefNameObjDefaultValueMap = {};

            //Create array of the incoming map
            var respMapArray = [];
            for (var i in respMap)
                respMapArray.push([respMap[i]])

            //iterate over all the appId's to create common pref value map
            for (let appCnt = 0; appCnt < respMapArray.length; appCnt++) {

                var repoArry = respMapArray[appCnt][0].repositories;
                var repoArryLen = 0;
                if (repoArry)
                    repoArryLen = repoArry.length;
                if (repoArryLen) {
                    for (var repoCnt = 0; repoCnt < repoArryLen; repoCnt++) {
                        var repoObj = repoArry[repoCnt];
                        var repoName = repoObj["name"];
                        var prefArray = repoObj["preferences"];
                        var prefArrayLen = 0;
                        if (prefArray)
                            prefArrayLen = prefArray.length;
                        if (prefArrayLen) {
                            for (var prefCnt = 0; prefCnt < prefArrayLen; prefCnt++) {
                                var prefObj = prefArray[prefCnt];
                                var prefName = prefObj["name"];
                                var val = prefObj["value"];
                                var mapKey = repoName + "." + prefName;
                                if (!repoPrefNameObjDefaultValueMap[mapKey])
                                    repoPrefNameObjDefaultValueMap[mapKey] = val;
                            }
                        }
                    }
                }

            }
        }

        /**
         * @private
         */
        function prepareAdminProfileRspMap(respObj) {

            repoPrefNameObjAdminProfileMap = {};
            var repoArry = respObj["repositories"];
            var repoArryLen = 0;
            if (repoArry)
                repoArryLen = repoArry.length;
            if (repoArryLen) {
                for (var repoCnt = 0; repoCnt < repoArryLen; repoCnt++) {
                    var repoObj = repoArry[repoCnt];
                    var repoName = repoObj["name"];
                    var prefArray = repoObj["preferences"];
                    var prefArrayLen = 0;
                    if (prefArray)
                        prefArrayLen = prefArray.length;
                    if (prefArrayLen) {
                        for (var prefCnt = 0; prefCnt < prefArrayLen; prefCnt++) {
                            var prefObj = prefArray[prefCnt];
                            var prefName = prefObj["name"];
                            var val = prefObj["defValue"];
                            var lockState = prefObj["lockState"];
                            var mapKey = repoName + "." + prefName;
                            var valObj = {};
                            valObj["value"] = val;
                            valObj["lockState"] = lockState;
                            repoPrefNameObjAdminProfileMap[mapKey] = valObj;
                        }
                    }
                }
            }
        }

        //P1 : Selection Model
        //P2 : Admin Profile Response
        //P3 : Default Preference Response 
        /**
         * @private
         */
        function prepareRequestBody(selectionModel) {
            var repoArray = new Array();
            //1.Get Admin Profile Response 
            var getProfileResponse = JSON.parse(adminProfileValues);
            //2.Prepare the Admin Profile Response map here : P2
            prepareAdminProfileRspMap(getProfileResponse);
            //3. Get Default Preferences Response
            var defaultPrefRespMap = MePreferencesMainView.getDefaultPrefValuesMap();
            //4.Prepare the Default Values Response map here : P3
            prepareDefaultValueRspMap(defaultPrefRespMap);
            if (selectionModel.getNumberOfVisibleDescendants() > 0) {
                selectionModel.processDescendants({
                    processNode: async function (nodeInfos) {
                        if (nodeInfos && nodeInfos.nodeModel) {
                            let prefObject = {};
                            prefObject["name"] = (nodeInfos.nodeModel.getAttributeValue("label")).split(".")[1];
                            var repoName = (nodeInfos.nodeModel.getAttributeValue("label")).split(".")[0];
                            var prefName = (nodeInfos.nodeModel.getAttributeValue("label")).split(".")[1];
                            var mapKey = repoName + "." + prefName;

                            //Value
                            if (nodeInfos.nodeModel.getAttributeValue("value") != undefined) {
                                prefObject["defValue"] = (nodeInfos.nodeModel.getAttributeValue("value")).toString();
                            }
                            else if (repoPrefNameObjAdminProfileMap[mapKey]) {
                                //if present in Admin Profile Map
                                var valObj = repoPrefNameObjAdminProfileMap[mapKey]
                                prefObject["defValue"] = valObj["value"];
                            }
                            else if (repoPrefNameObjDefaultValueMap[mapKey] != undefined) {
                                //if present in the Default pref map
                                var val = repoPrefNameObjDefaultValueMap[mapKey]
                                prefObject["defValue"] = val;
                            }
                            else {
                                prefObject["defValue"] = null;
                            }

                            //LockState
                            if (nodeInfos.nodeModel.getAttributeValue("lockState") != undefined) {
                                prefObject["lockState"] = (nodeInfos.nodeModel.getAttributeValue("lockState")).toString();
                            }
                            else {
                                console.log("\n\t lockState is not present in selection model, retrive from API call");
                                // 1. Call getAdminProfile REST API  --> Done                                
                                // 2. prepare one map: <key,value> ==> <repoName.PrefName, Object> 
                                //      obj{ "locakState" : <lockState>, "value": <value> }
                                // 3. Parse response to retrieve lockState,value
                                if (repoPrefNameObjAdminProfileMap[mapKey]) {
                                    var valObj = repoPrefNameObjAdminProfileMap[mapKey]
                                    prefObject["lockState"] = valObj["lockState"];
                                }
                                else {
                                    //else false
                                    prefObject["lockState"] = "false";
                                }
                            }

                            let prefArray = new Array();
                            prefArray.push(prefObject);
                            var repoObject = {};
                            repoObject["name"] = (nodeInfos.nodeModel.getAttributeValue("label")).split(".")[0];
                            repoObject["preferences"] = prefArray;

                            repoArray.push(repoObject);
                        }
                    },
                    treeTraversalOrder: "postOrder",
                });

                var repoObj = { "repositories": repoArray };

                //Add existing profile preferences to the new ones: Old+New
                if (Object.keys(repoPrefNameObjAdminProfileMap).length) {

                    //Creating Map from New Preferences
                    var repoNamePrejObjListMap = {};
                    var repoArr = repoObj["repositories"];
                    var repoLen = 0;
                    if (repoArr)
                        repoLen = repoArr.length;
                    if (repoLen) {
                        for (var repoCnt = 0; repoCnt < repoLen; repoCnt++) {
                            var repoObj = repoArr[repoCnt];
                            var repoName = repoObj["name"];
                            var prefArr = repoObj["preferences"];
                            var prefArrLen = 0;
                            if (prefArr)
                                prefArrLen = prefArr.length;
                            if (prefArrLen) {
                                var prefObjList = [];
                                for (var prefCnt = 0; prefCnt < prefArrLen; prefCnt++) {
                                    var prefObj = prefArr[prefCnt];
                                    prefObjList.push(prefObj);
                                }
                                if (repoNamePrejObjListMap[repoName]) {
                                    var tempPrejList = repoNamePrejObjListMap[repoName];
                                    var combinedList = tempPrejList.concat(prefObjList);
                                    repoNamePrejObjListMap[repoName] = combinedList;
                                } else {
                                    repoNamePrejObjListMap[repoName] = prefObjList;
                                }
                            }
                        }
                    }

                    var modifiedRepoArr = [];
                    repoArr = getProfileResponse["repositories"];
                    repoLen = 0;
                    if (repoArr)
                        repoLen = repoArr.length;
                    if (repoLen) {
                        for (var repoCnt = 0; repoCnt < repoLen; repoCnt++) {
                            var repoObj = repoArr[repoCnt];
                            var repoName = repoObj["name"];
                            var oldPrefArr = repoObj["preferences"];

                            //When same repositories are present in both old and new list
                            if (repoNamePrejObjListMap[repoName]) {
                                var newPrefArr = repoNamePrejObjListMap[repoName];
                                //var combinedPrefs = oldPrefArr.concat(newPrefArr);

                                //Create map for old preferences
                                var combinedPrefs = [];
                                var prefNamePrefObjMap = {};
                                var oldPrefArrLen = 0;
                                if (oldPrefArr)
                                    oldPrefArrLen = oldPrefArr.length;
                                for (var prefCnt = 0; prefCnt < oldPrefArrLen; prefCnt++) {
                                    var prefObj = oldPrefArr[prefCnt];
                                    var prefName = prefObj["name"];
                                    prefNamePrefObjMap[prefName] = prefObj;
                                }

                                //First add all new preferences from selection Model, 
                                //since they're the latest/updated ones.
                                var newPrefArrLen = 0;
                                if (newPrefArr)
                                    newPrefArrLen = newPrefArr.length;
                                for (var prefCnt = 0; prefCnt < newPrefArrLen; prefCnt++) {
                                    var prefObj = newPrefArr[prefCnt];
                                    var prefName = prefObj["name"];
                                    if (prefNamePrefObjMap[prefName]) {
                                        delete prefNamePrefObjMap[prefName];
                                    }
                                    combinedPrefs.push(prefObj);
                                }

                                //Add remaining preferences from getAdminProfile response
                                if (Object.keys(prefNamePrefObjMap).length) {
                                    for (var tempKey in prefNamePrefObjMap) {
                                        var prefObj = prefNamePrefObjMap[tempKey];
                                        combinedPrefs.push(prefObj);
                                    }
                                }
                                repoObj["preferences"] = combinedPrefs;
                                delete repoNamePrejObjListMap[repoName];
                            }
                            //When repo exist only in the old list
                            modifiedRepoArr.push(repoObj);
                        }
                        // Add remaining repos which only exist in new list.
                        if (Object.keys(repoNamePrejObjListMap).length) {
                            for (var tempKey in repoNamePrejObjListMap) {
                                var repoName = tempKey;
                                var prefArray = repoNamePrejObjListMap[tempKey];
                                var repoObj = {};
                                repoObj["name"] = repoName;
                                repoObj["preferences"] = prefArray;
                                modifiedRepoArr.push(repoObj);
                            }
                        }
                        var finalrepoObj = { "repositories": modifiedRepoArr };
                        return finalrepoObj;
                    }
                }
                else {
                    //Only New
                    return repoObj;
                }
            }
            else {

                //Check if existing profiles are there, process accordingly: Only Old
                if (Object.keys(repoPrefNameObjAdminProfileMap).length) {
                    return getProfileResponse;
                }
                else // Keep the profile empty, as it is.
                    return null;
            }
        }


        async function readDefaultAdminProfileValues() {
            var completeURL = serviceURL + DEFAULT_ADMIN_PROFILE_DATA_ENDPOINT;
            return await callRestAPI.call(this, null, completeURL, 'GET').then((responseObject) => {
                return responseObject[0];
            }).catch((errorInfo) => {
                return null;
            });
        }

        /**
         * @private
         */
        function addOverrideGlobalFlag(url, val) {
            var fullUrl = url + OVERRIDE_GLOBAL_KEY + "=" + val;
            return fullUrl;
        }

        /**
         * @private 
         */
        function addProfileName(url, val) {
            var fullUrl = url + PROFILE_NAME_KEY + "=" + val;
            return fullUrl;
        }

        /**
         * @private
         */
        function loadServiceURL(platformId) {
            var prom = new Promise(function (resolve, reject) {
                i3DXCompassPlatformServices.getServiceUrl({
                    serviceName: 'mepreferences',
                    platformId: platformId,
                    onComplete: function (urlData) {
                        resolve(urlData);
                    },
                    onFailure: function (errorInfo) {
                        reject(errorInfo);
                    }
                });
            });
            return prom;
        }

        /**
         * @private
         */

        async function getTenant() {
            let tenantID = null;
            try {
                tenantID = PlatformAPI.getWidgetTenant();
            }
            catch (e) {
                tenantID = PlatformAPI.getTenant();
            }
            return tenantID;

        }

        /**
         * @private
         */
        async function isUserAdmin(tenantID) {
            var prom = new Promise(function (resolve, reject) {
                i3DXCompassPlatformServices.getUser({
                    platformId: tenantID,
                    onComplete: function (data) {
                        resolve(data.admin);
                    },
                    onFailure: function (errorInfo) {
                        reject(errorInfo);
                    }
                });
            });
            return prom;
        }

        /**
         * @private
         * */
        async function isServiceAvailable(tenantID) {
            var newProm = new Promise(function (resolve, reject) {
                loadServiceURL(tenantID).then((urlData) => {
                    serviceURL = urlData;
                    resolve(true);
                }).catch((errorInfo) => {
                    reject(false);
                });
            });
            return newProm;
        }


        /**
         * @private
         */
        function callRestAPI(requestBody, completeURL, methodType) {

            //To do in future: pass entire options object
            var dataInfo;
            var headersInfo;
            if (requestBody) {
                dataInfo = JSON.stringify(requestBody);
                headersInfo = {
                    'Content-Type': 'application/json'
                };
            }
            var newProm = new Promise(function (resolve, reject) {
                WAFData.authenticatedRequest(completeURL, {
                    method: methodType,
                    data: dataInfo,
                    headers: headersInfo,
                    onComplete: function (responseObject, headers, respCode) {
                        var promArr = [responseObject, respCode];
                        resolve(promArr);
                    },
                    onFailure: function (errorObject) {
                        reject(errorObject);
                    }
                });
            });
            return newProm;
        }

        var myWidget1 = {

            createWidgetUI: async function () {
                var tenantID = await getTenant();
                await isUserAdmin(tenantID).then(async (isAdmin) => {
                    if (isAdmin) {
                        return isServiceAvailable(tenantID).then(async () => {

                            widgetContentDiv = createDiv("widget-content-div");
                            var isAdminView = true;

                            loadCSS();

                            function createDiv(style) {
                                return new UWA.createElement("div", {
                                    "class": style
                                });
                            }

                            //Collection View Creation
                            var collectionViewDiv = createDiv("collection-view-div");

                            var myResponsiveTilesCollectionView = new WUXResponsiveTilesCollectionView().inject(collectionViewDiv);

                            var TreedocModel = new TreeDocument();

                            var node1 = new TreeNodeModel({
                                label: mePrefWidgetTranslation["CollectionViewLabel.Label"],
                                description: mePrefWidgetTranslation["CollectionViewDescription.Label"],
                                thumbnail: "checkbox-off",
                                icon: {
                                    iconName: "pencil",
                                    fontIconFamily: WUXManagedFontIcons.Font3DS
                                }
                            });

                            TreedocModel.addRoot(node1);
                            myResponsiveTilesCollectionView.loadApplicativeModel(TreedocModel);

                            function loadCSS() {
                                var path = WebappsUtils.getWebappsBaseUrl() + "MePreferencesUIBuilder/MePreferencesAdminWidget.css";
                                var linkElem = new UWA.createElement('link', {
                                    'rel': 'stylesheet',
                                    'type': 'text/css',
                                    'href': path
                                });
                                document.getElementsByTagName('head')[0].appendChild(linkElem);
                            }


                            var buttonsDiv = createDiv("buttonDiv");

                            var saveButtonDiv = createDiv("saveButtonDiv");

                            var saveButton = new WUXButton({
                                label: mePrefWidgetTranslation["SaveButton.Label"],
                                emphasize: "primary"
                            });

                            var me = this;
                            saveButton.addEventListener('buttonclick', async function (e) {

                                let saveResponseCode = await me.saveAdminProfile();
                                if (saveResponseCode == 200) {
                                    let saveSuccessNotif = {
                                        level: 'info',
                                        title: mePrefWidgetTranslation["AdminSaveSuccessNotification.Label"],
                                        sticky: false
                                    }
                                    NotificationsManagerUXMessages.addNotif(saveSuccessNotif);
                                    console.log("\n\t save done ");
                                } else if (saveResponseCode == 206) {
                                    let partialSaveNotif = {
                                        level: 'info',
                                        title: mePrefWidgetTranslation["AdminPartialSaveNotification.Label"],
                                        sticky: false
                                    }
                                    NotificationsManagerUXMessages.addNotif(partialSaveNotif);
                                } else if (saveResponseCode == null) {
                                    let saveEmptyReqNotif = {
                                        level: 'error',
                                        title: mePrefWidgetTranslation["AdminSaveReqEmptyNotification.Label"],
                                        sticky: false
                                    }
                                    NotificationsManagerUXMessages.addNotif(saveEmptyReqNotif);
                                } else {
                                    let saveFailureNotif = {
                                        level: 'error',
                                        title: mePrefWidgetTranslation["AdminSaveFailureNotification.Label"],
                                        sticky: false
                                    }
                                    NotificationsManagerUXMessages.addNotif(saveFailureNotif);
                                }


                            });

                            var resetButtonDiv = createDiv("resetButtonDiv");

                            var resetButton = new WUXButton({
                                label: mePrefWidgetTranslation["ResetButton.Label"],
                                emphasize: "secondary"
                            });

                            resetButton.addEventListener("buttonclick", async function (e) {
                                immersiveFrame = new WUXImmersiveFrame({
                                    identifier: "me-reset-dialog-immersive-frame"
                                });
                                var baseURL = WebappsUtils.getWebappsBaseUrl();
                                // var appendUrl = "MePreferencesUIBuilder/assets/icons/";
                                var resetDialogIcon = Dom.generateIcon({
                                    iconPath: baseURL + "MePreferencesUIBuilder/assets/icons/errorIcon.png",
                                    iconSize: {
                                        height: "26px",
                                        width: "26px"
                                    }
                                });

                                var resetMessage = new UWA.Element("span", {
                                    text: mePrefWidgetTranslation["reset.SubTitle"],
                                    class: "resetMessageSpan"
                                })

                                let resetDialogContentDiv = new UWA.createElement("div", {
                                    class: "resetDialogContentDiv"
                                });

                                resetDialogIcon.inject(resetDialogContentDiv);
                                resetMessage.inject(resetDialogContentDiv);
                                var confirmationDialog = new WUXDialog({
                                    width: 350,
                                    immersiveFrame: immersiveFrame,
                                    identifier: "mep-reset-confirmation-dialog",
                                    title: mePrefWidgetTranslation["reset.Title"],
                                    content: resetDialogContentDiv,
                                    activeFlag: false,
                                    modalFlag: true,
                                    position: {
                                        my: "center",
                                        at: "center",
                                        of: immersiveFrame
                                    },
                                    buttons: {
                                        Reset: new WUXButton({
                                            domId: "mep-reset-ok",
                                            emphasize: "primary",
                                            onClick: async function (e) {
                                                confirmationDialog.close();
                                                await me.resetAdminProfile();
                                                widget.dispatchEvent("onRefresh");
                                                removeImmersiveFrame();
                                            }
                                        }),
                                        Cancel: new WUXButton({
                                            domId: "mep-reset-cancel",
                                            onClick: function (e) {
                                                confirmationDialog.close();
                                                removeImmersiveFrame();
                                            }
                                        })
                                    }
                                });

                                confirmationDialog.elements._buttonsDiv.firstChild.setStyle("background-color", "#42a2da");
                                confirmationDialog.elements._buttonsDiv.firstChild.setStyle("color", "white");

                                if (confirmationDialog) {
                                    var confirmationDialogCloseButton = confirmationDialog.elements._closeButton;
                                    confirmationDialogCloseButton.addEventListener('click', function () {
                                        //Remove Immersive Frame
                                        removeImmersiveFrame();
                                    });
                                }
                                immersiveFrame.inject(document.body);

                            });

                            function removeImmersiveFrame() {
                                //Get all immersive frames present in the application.
                                var immFramesList = document.getElementsByClassName('wux-windows-immersive-frame');
                                for (let it = 0; it < immFramesList.length; it++) {
                                    let immFrame = immFramesList[it];
                                    //Remove the immersive frame added for MePreferenceDialog 
                                    if (immFrame.dsModel.identifier == "me-reset-dialog-immersive-frame") {
                                        immFrame.remove();
                                        break;
                                    }
                                }
                                immersiveFrame = null;
                                document.dispatchEvent(removeImmEvent);
                            }


                            saveButton.inject(saveButtonDiv);
                            resetButton.inject(resetButtonDiv);
                            saveButtonDiv.inject(buttonsDiv);
                            resetButtonDiv.inject(buttonsDiv);


                            collectionViewDiv.inject(widgetContentDiv);
                            buttonsDiv.inject(widgetContentDiv);
                            adminProfileValues = await readDefaultAdminProfileValues();

                            var mainViewDiv = await MePreferencesMainView.createMainView("3DSApp.TECMEPA_AP", isAdminView, adminProfileValues, serviceURL);
                            mainViewDiv.inject(widgetContentDiv);

                            // collectionViewDiv.inject(widgetContentDiv);


                            widgetContentDiv.inject(widget.body);


                        });
                    }
                    else {
                        let widgetContentDiv = new UWA.createElement("div", {
                            "class": "widget-content-div",
                        });
                        widgetContentDiv.textContent = "403: Forbidden";
                        widgetContentDiv.inject(widget.body);

                        return true;
                    }
                })
            },

            saveAdminProfile: async function () {

                console.log("\n\t Inside saveAdminProfile method ");
                //1. getSelectionModel
                var selectionModel = MePreferencesSelectionModel.getSelectionModel();
                //2. Form request body
                var reqBody = prepareRequestBody(selectionModel);

                //if reqBody is null then keep the profile empty by skipping the API call.
                if (reqBody) {
                    //3. Call REST API
                    var tenantID = await getTenant();
                    return await isServiceAvailable(tenantID).then(async (RC) => {
                        if (RC) {    //getServiceURL call success       
                            //Valid service url retrieved successfully. 
                                var completeURL = serviceURL + SET_ADMIN_PROFILE_ENDPOINT + "?";
                                completeURL = addProfileName(completeURL, DEFAULT_PROFILE_NAME) + "&";
                                completeURL = addOverrideGlobalFlag(completeURL, "true");
                                return callRestAPI(reqBody, completeURL, 'POST').then((responseObject) => {
                                    return responseObject[1].status;
                                }).catch((errorInfo) => {
                                    console.log("\n\t Error in save ", errorInfo);
                                    return false;
                                });
                        }
                        else  //getServiceURL call fails
                            return null;
                    }).catch((errorInfo) => {
                        console.log("\n\t Error in save ", errorInfo);
                        return false;
                    });
                } else
                    return null;
            },

            resetAdminProfile: async function () {
                console.log("\n\t Inside resetAdminProfile method ");

                // immersiveFrame.inject(document.body);
                var repoArray = [];
                var reqBody = { "repositories": repoArray };
                var model = MePreferencesSelectionModel.getSelectionModel();

                model.empty();
                //3. Call REST API
                var tenantID = await getTenant();
                return await isServiceAvailable(tenantID).then(async (RC) => {
                    if (RC) {    //getServiceURL call success       
                        //Valid service url retrieved successfully. 
                            var completeURL = serviceURL + SET_ADMIN_PROFILE_ENDPOINT + "?";
                            completeURL = addProfileName(completeURL, DEFAULT_PROFILE_NAME) + "&";
                            completeURL = addOverrideGlobalFlag(completeURL, "true");
                            return callRestAPI(reqBody, completeURL, 'POST').then((responseObject) => {
                                return true;
                            }).catch((errorInfo) => {
                                console.log("\n\t Error in save ", errorInfo);
                                return false;
                            });
                    }
                    else  //getServiceURL call fails
                        return null;
                }).catch((errorInfo) => {
                    console.log("\n\t Error in save ", errorInfo);
                    return false;
                });

            },



            getWidgetContent: function () {
                return widgetContentDiv;
            },

            emptyMainDiv: function () {
                widgetContentDiv = null;
            }

        }

        return myWidget1;

    });
