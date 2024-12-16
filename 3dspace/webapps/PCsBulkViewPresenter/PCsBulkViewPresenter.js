define('DS/PCsBulkViewPresenter/js/Utils/PCsBulkViewPresenterUtils',[
    'UWA/Core',
    'DS/ConfiguratorPanel/scripts/Models/ConfiguratorVariables'
],function(
    UWA,
    ConfiguratorVariables
){
    'use strict';
    var PCsBulkViewPresenterUtils = {};
    /**
        * convert from jsonModel format to solver format before sending to solver
        * @param {Object} columnData from json model
        * @param {boolean} allcriteria check all or only selected
        * @param {string} baseConfigurationId  id of the parent baseConfiguration
        * @returns {Object}
        */
    PCsBulkViewPresenterUtils.buildSolverInputFormat = function(columnData, allcriteria, baseConfigurationId) {
        var solverInputData;
        if (columnData && columnData.length > 0) {
            var configurationCriteria = [];
            for (var i = 0; i < columnData.length; i++) {
                var cellData = {};
                if(columnData[i].values){ // for Options
                    for(var j = 0; j<columnData[i].values.length; j++){
                        cellData = this.createCellDataInSolverFormat(columnData[i].values[j]);
                        if ( cellData.Id && cellData.Id.length > 0 && ( cellData.State === ConfiguratorVariables.Chosen || allcriteria ) ) {
                            configurationCriteria.push(cellData);
                        }
                    }
                }else if(UWA.is(columnData[i].title,'string') && !UWA.is(columnData[i].unit)){ // for Variant
                // Accept only 'Chosen' and 'Dismissed' state
                    cellData = this.createCellDataInSolverFormat(columnData[i]);
                    // Test if a value with 'Dismissed' state exists in the dropDown data => should be added too.
                    //Add the selected value in the DGv if exist
                    if(cellData.Id && cellData.Id.length > 0){
                        if (cellData.State){
                        // Add only 'Chosen' & 'Dismissed' state to solver input before check conflict
                            if(cellData.State === ConfiguratorVariables.Chosen || cellData.State === ConfiguratorVariables.Dismissed || allcriteria ) {
                                configurationCriteria.push(cellData);

                            }
                        }
                    }
                }else if(UWA.is(columnData[i].title,'number')){ // for Parameter
                    // Accept only 'Chosen' and 'Dismissed' state
                    cellData = this.createCellDataInSolverFormat(columnData[i], columnData[i].title);
                    // Test if a value with 'Dismissed' state exists in the dropDown data => should be added too.
                    //Add the selected value in the DGv if exist
                    if(cellData.Id && cellData.Id.length > 0){
                        if (cellData.State){
                        // Add only 'Chosen' & 'Dismissed' state to solver input before check conflict
                            if(cellData.State === ConfiguratorVariables.Chosen || cellData.State === ConfiguratorVariables.Dismissed || allcriteria ) {
                                configurationCriteria.push(cellData);

                            }
                        }
                    }
                }
                var dropDownMenu = columnData[i].dropDownData;
                if(dropDownMenu && dropDownMenu.length > 0){
                    for(var k=0; k<dropDownMenu.length; k++){
                        if(dropDownMenu[k].state === 'M'){
                        // Test if the value is already exist in solver input with 2 different state ( 'Dismissed' & 'Chosen')
                        // TO ensure that same value with two different states shouldn't be added to solver input
                            if(cellData.Id !== dropDownMenu[k].id){
                                var dropDownSingleData = this.createCellDataInSolverFormat(dropDownMenu[k]);
                                configurationCriteria.push(dropDownSingleData);
                            }
                        }
                    }
                }
            }
            if(baseConfigurationId) {
                configurationCriteria.push({
                    Id: baseConfigurationId,
                    State: 'Chosen'
                })
            }
            solverInputData = {
                'configurationCriteria': configurationCriteria
            };
        }
        return solverInputData;
    };

     /**
       * convert from jsonModel format to solver format after sending the solver request
       * @param {*} columnData from json model
       * @param {boolean} saveDone flag to update the persistancy format of the parameter
       * @returns {Object}
       */
      PCsBulkViewPresenterUtils.buildPersistencyInputFormat = function(columnData, saveDone) {
        var configurationCriteria = [];
        if (columnData && columnData.length > 0) {

            for (var i = 0; i < columnData.length; i++) {
                if(columnData[i].values){ // options
                    for(var j = 0; j<columnData[i].values.length; j++){
                        configurationCriteria.push({
                            'id': columnData[i].values[j].id,
                            'status': this.fromStateToStatus('C')
                        });
                    }
                    if(columnData[i].dropDownData){
                        for(var k = 0;k<columnData[i].dropDownData.length;k++){
                            if(columnData[i].dropDownData[k].state === 'M'){
                                configurationCriteria.push({
                                    'id': columnData[i].dropDownData[k].id,
                                    'status': this.fromStateToStatus('M')
                                });
                            }
                        }
                    }
                }else{
                    if(UWA.is(columnData[i].title, 'number')) { // param                                         
                        var value = columnData[i].title + "";
                        if(columnData[i].unit !== ""){
                            value += ' ' + columnData[i].unit;
                        }
                        configurationCriteria.push({
                            'id': columnData[i].id,
                            'value': value,
                            'status': this.fromStateToStatus('C')
                        });  

                    }else {  // variant
                        // Set 'Chosen' state with an exception for 'Dismissed' & 'Unselected'
                        if(columnData[i].state !== 'M' && columnData[i].state !== 'U'){
                            configurationCriteria.push({
                                'id': columnData[i].id,
                                'status': this.fromStateToStatus('C')
                            });
                        }
                        if(columnData[i].dropDownData){
                            for(var m = 0;m<columnData[i].dropDownData.length;m++){
                                if(columnData[i].dropDownData[m].state === 'M'){
                                    configurationCriteria.push({
                                        'id': columnData[i].dropDownData[m].id,
                                        'status': this.fromStateToStatus('M')
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        return configurationCriteria;
    };

    PCsBulkViewPresenterUtils.fromStateToStatus = function(state) {
        var status = "";

        if (state === 'C') {
            status = ConfiguratorVariables.Chosen;
        }else if (state === 'S') {
            status = ConfiguratorVariables.Selected;
        } else if (state === 'I') {
            status = ConfiguratorVariables.Incompatible;
        } else if (state === 'D') {
            status = ConfiguratorVariables.Default;
        } else if (state === 'R') {
            status = ConfiguratorVariables.Required;
        } else if(state === 'M'){
            status = ConfiguratorVariables.Dismissed;
        }else {
            status = ConfiguratorVariables.Unselected;
        }
        return status;
    };

    PCsBulkViewPresenterUtils.createCellDataInSolverFormat = function(columnData, NumericalValue){
        var cellData = {};
        cellData = {
            'Id': columnData.id,
            'State': this.fromStateToStatus(columnData.state)
        };
        if(UWA.is(NumericalValue,'number')) {
            cellData = UWA.merge(cellData, {
                'NumericalValue': NumericalValue
            });
        }
        return cellData;
    };

    /**
       * convert the format of pc content to jsonmodel format
       * @param {Object} receivedData
       * @param {Object} variabilityValuesMap
       * @returns {cellObj} in json model format
       */
    PCsBulkViewPresenterUtils.buildJsonModelFormatForLoadedData = function(receivedData, variabilityValuesMap) {
        var cellObj = {};
        if (receivedData && receivedData.id) {
            if (variabilityValuesMap[receivedData.id]) {
                var variabilityValue = variabilityValuesMap[receivedData.id].variabilityValue;
                var rowID = variabilityValuesMap[receivedData.id].rowID;
                var type = variabilityValue.type;
                var image = variabilityValue.image;
                if (variabilityValue && rowID >= 0) {
                    cellObj.id = variabilityValue.id;
                    cellObj.rowID = rowID;
                    cellObj.type = type;
                    cellObj.image = image;
                    cellObj.state = this.convertCriteriaStateFormat(receivedData.status);
                    cellObj.stateValidity = variabilityValue.stateValidity;
                    if (receivedData.value) {
                        // value can return 
                        var valueformat = receivedData.value.split(' ');
                        if(valueformat.length > 0) 
                            cellObj.unit = valueformat[1];
                        else 
                            cellObj.unit = undefined;
                        cellObj.title =  parseInt(valueformat[0]);
                    
                    } else if (receivedData.status) {
                        cellObj.title = variabilityValue.title;
                    }
                }
            }
        }
        return cellObj;
    };

    /**
       * Convert solver State from solver format to jsonmodel format
       * @param {*} status
       * @returns {String} new state
       */
     PCsBulkViewPresenterUtils.convertCriteriaStateFormat = function(status) {
        var state;
        switch (status) {
            case ConfiguratorVariables.Chosen:
                state = 'C';
                break;
            case ConfiguratorVariables.Default:
                state = 'D';
                break;
            case ConfiguratorVariables.Required:
                state = 'R';
                break;
            case ConfiguratorVariables.Selected:
                state = 'S';
                break;
            case ConfiguratorVariables.Incompatible:
                state = 'I';
                break;
            case ConfiguratorVariables.Dismissed:
                state = 'M';
                break;
            default:
                state = 'U'; // for 'Unselected' if Config criteria is empty
                break;
        }
        return state;
    };

    // converts the solver configuration criteria to json model list
      // idList will filter the criteria if not undefined
      PCsBulkViewPresenterUtils.convertSolverConfigurationJson = function (configurationCriteria, idList, variabilityValuesMap, parameterMap ,configCriteriaMap) {
        var criteriaList = [];
        if (configurationCriteria) {
            if (configurationCriteria.length > 0) {
                for (var i = 0; i < configurationCriteria.length; i++) {
                    var criteriaId = configurationCriteria[i].Id;

                    if(idList && idList.indexOf(criteriaId) < 0) {
                        continue;
                    }
                    if(variabilityValuesMap[criteriaId] || parameterMap[criteriaId]) {
                        var criteriaState = configurationCriteria[i].State;
                        var numericalValue = configurationCriteria[i].NumericalValue;
                        var minValue = configurationCriteria[i].MinValue;
                        var maxValue = configurationCriteria[i].MaxValue;
                        var unit = configurationCriteria[i].unit;
                        var configCriteriaState = this.convertCriteriaStateFormat(criteriaState);
                        var configCriteriaObj = null;
                        if(variabilityValuesMap[criteriaId].variabilityValue) {
                            configCriteriaObj = variabilityValuesMap[criteriaId].variabilityValue;
                            configCriteriaObj.rowID = variabilityValuesMap[criteriaId].rowID;
                        }                            
                        else 
                            configCriteriaObj = parameterMap[criteriaId];
                        
                        if(configCriteriaMap && configCriteriaMap[criteriaId]){
                            configCriteriaObj.stateValidity = 'C';
                        }else{
                            configCriteriaObj.stateValidity = 'V'; // valid state by default
                        }
                        
                        if (configCriteriaState) {
                            configCriteriaObj.state = configCriteriaState;
                        } else {
                            configCriteriaObj.state = 'U';
                        }
                        if(UWA.is(numericalValue,'number')) {
                            configCriteriaObj.title = numericalValue;
                        }
                        if(UWA.is(minValue,'number') && UWA.is(maxValue,'number')) {
                            configCriteriaObj.minValue = minValue;
                            configCriteriaObj.maxValue = maxValue;
                        }
                        if(UWA.is(unit,'string')) {
                            configCriteriaObj.unit = unit;
                        }

                        criteriaList.push(configCriteriaObj);
                    }
                }
            }
        }
        return criteriaList;
    };

    return PCsBulkViewPresenterUtils;
});

define('DS/PCsBulkViewPresenter/js/PCsBulkViewPresenter', [
    'UWA/Core',
    'DS/WAFData/WAFData',
    'DS/i3DXCompassServices/i3DXCompassServices',
    'DS/CoreEvents/ModelEvents',
    'DS/UIKIT/Badge',
    'DS/Utilities/Dom',
    'DS/Controls/SpinBox',
    'DS/UIKIT/Mask',
    'DS/xModelEventManager/xModelEventManager',
    'DS/CfgBulkTablePresenter/BulkEdition/Presenter/BulkTablePresenter',
    'DS/PCsBulkViewPresenter/js/Utils/PCsBulkViewPresenterUtils',
    'DS/CfgBulkTablePresenter/BulkEdition/Model/BulkTableModel',
    'DS/ConfiguratorPanel/scripts/Models/ConfiguratorModel',
    'DS/ConfiguratorPanel/scripts/Presenters/NumericalSelectionEditor',
    'i18n!DS/PCsBulkViewPresenter/assets/nls/PCsBulkViewPresenter',
    'i18n!DS/CfgBulkTablePresenter/assets/nls/BulkTablePresenter',
    'i18n!DS/xDimensionManager/assets/nls/xUnitLabelLong.json',
    'css!DS/PCsBulkViewPresenter/css/PCsBulkViewPresenter.css'
], function (
    UWA,
    WAFData,
    i3DXCompassServices,
    ModelEvents,
    Badge,
    Dom,
    SpinBox,
    Mask,
    xModelEventManager,
    BulkTablePresenter,
    PCsBulkViewPresenterUtils,
    BulkTableModel,
    ConfiguratorModel,
    NumericalSelectionEditor,
    _NLS_PCsBulkTablePresenter,
    _NLS_BulkTablePresenter,
    _NLS_xUnitLabelLong) {
    'use strict';

    var COLUMN_ID_INDEX = 3;
    var CONSTANT_GET_CRITERIA_CONFIGURATION_INSTANCE = 'getCriteriaConfigurationInstances';
    var INVOKE_SERVICE = 'dspfl/invoke/dspfl:';
    var RESOURCE_WS_URL = '/resources/v1/modeler/';
    var STR_SERVICE_NAME = "3DSpace";
    var PCsBulkViewPresenter = BulkTablePresenter.extend({
        init: function (options) {
            if (!options) {
                options = {};
            }
            this._modelId = options.modelId;
            this._privateChannel = new ModelEvents();
            this._applicationChannel = options.applicationChannel || new ModelEvents();
            this._privateChannelForRules = options.privateChannelForRules || new ModelEvents();
            this._withSolver = UWA.is(options.withSolver, 'boolean') ? options.withSolver : true;
            this._withStatusComputing = this._withSolver;
            this._withSuggestionComputing = false;
            this._modelMaturity = '';
            if (!UWA.is(options.showEditAction, 'boolean')) {
                options.showEditAction = true;
            }
            if (!UWA.is(options.showCompareAction, 'boolean')) {
                options.showCompareAction = true;
            }
            this._solverKey = '';
            this._loadedPCs = {};
            this._pauseCheckConflictCall = false;
            this._arrayColumnIDsToCheck = [];
            this._arrayColumnIDsChecked = [];
            this._bufferFetchIds = [];
            this._bufferFetchPromises = [];
            this._selectedPCs = [];
            this._eventManager = new xModelEventManager(this._privateChannel, this._applicationChannel, this._privateChannelForRules);
            this._securityContext = options.securityContext;
            this._tenant = options.tenant;
            this._isBCConfigEnabled = options.isBCConfigEnabled;
            let VariabilityOption = {
                "text": _NLS_BulkTablePresenter.Variability,
                "dataIndex": 'tree',
                pinned: 'left',
                editableFlag: false 
            };
            var columns = [];
            if(this._isBCConfigEnabled){
                columns.push({
                    "text": _NLS_PCsBulkTablePresenter.ProductConfiguration,
                    "dataIndex": "productConfiguration",
                    pinned: 'left',
                    editableFlag: false,
                    "type": "Product Configuration",
                    "children":  [{
                        "text": _NLS_PCsBulkTablePresenter.BaseConfiguration,
                        "dataIndex": 'baseConfiguration',
                        "type": "Base Configuration",
                        pinned: 'left',
                        editableFlag: false,
                        "children": [ VariabilityOption ]
                    }],
                },
                {
                    "dataIndex": "productConfiguration_Type",
                    "children":  [{
                        "dataIndex": "baseConfiguration_Type",
                        children:  [{
                            "text": _NLS_BulkTablePresenter.Type,
                            "dataIndex": 'type',
                            pinned: 'left',
                            editableFlag: false,
                            visibleFlag: false,
                            getCellValue: function(cellInfos){
                                if (cellInfos.nodeModel) {
                                    var grid = cellInfos.nodeModel.options.grid;
                                    var label;
                                    if(grid){
                                        if(grid.type === 'Parameter'){
                                            label = _NLS_BulkTablePresenter.Parameter;
                                        }else if(grid.type === 'VariabilityGroup'){
                                            label = _NLS_BulkTablePresenter.OptionGroup;
                                        }else if(grid.type === 'Variant'){
                                            label = _NLS_BulkTablePresenter.Variant;
                                        }
                                        return label;
                                    }
                                }
                            }
                        }]
                    }]  
                }, 
                {
                    "dataIndex": "productConfiguration_SequenceNumber",
                    "children":  [{
                        "dataIndex": "baseConfiguration_SequenceNumber",
                        children:  [{
                            "text": _NLS_BulkTablePresenter.SequenceNumber,
                            "dataIndex": 'sequenceNumber',
                            pinned: 'left',
                            editableFlag: false,
                            visibleFlag: false,
                            typeRepresentation: 'integer'
                        }]
                    }]
                });
            }else{
                columns.push(VariabilityOption);
                columns.push({
                    "text": _NLS_BulkTablePresenter.Type,
                    "dataIndex": 'type',
                    pinned: 'left',
                    editableFlag: false,
                    visibleFlag: false,
                    getCellValue: function(cellInfos){
                      if (cellInfos.nodeModel) {
                        var grid = cellInfos.nodeModel.options.grid;
                        var label;
                        if(grid){
                          if(grid.type === 'Parameter'){
                            label = _NLS_BulkTablePresenter.Parameter;
                          }else if(grid.type === 'VariabilityGroup'){
                            label = _NLS_BulkTablePresenter.OptionGroup;
                          }else if(grid.type === 'Variant'){
                            label = _NLS_BulkTablePresenter.Variant;
                          }
                          return label;
                        }
          
                      }
                    }
                  }, {
                    "text": _NLS_BulkTablePresenter.SequenceNumber,
                    "dataIndex": 'sequenceNumber',
                    pinned: 'left',
                    editableFlag: false,
                    visibleFlag: false,
                    typeRepresentation: 'integer'
                  });
            }
            options.columnOptions = columns;
            this._parent(options);
        },
        updateEditAction: function(){
            if(this._modelMaturity === 'Obsolete'){
                if(this._showEditAction){
                    this._showEditAction = false;
                    this._privateChannel.publish({ event: 'enox-collection-toolbar-visibility-action', data: { id : 'edit-pencil' , flag : false }});
                    this._editionflag = false;
                    this._bulkTableModel.restoreJsonModelFromSnapshot();
                    this.onTableUpdateEnd();
                }
            }
            else{
                this._showEditAction = true;
                this._privateChannel.publish({ event: 'enox-collection-toolbar-visibility-action', data: { id : 'edit-pencil' , flag : true }});
            }
        },
        setModelMaturity: function(modelMaturity){
            this._modelMaturity = modelMaturity;
        },
        setModelVersion: function (modelVersionId) {
            this._modelId = modelVersionId;
        },
        setSecurityContext: function(securityContext){
            this._securityContext = securityContext;
        },
        setTenant: function(tenant){
            this._tenant = tenant;
        },
        loadVariabilityInfo: function (variabilityDictionary) {
            if (variabilityDictionary && variabilityDictionary.portfolioClasses) {

                this._variabilityDictionary = variabilityDictionary;
                this._initPCBulkModel();
                var bulkPresenterOptions = {
                    jsonModel: this._bulkTableModel.getJsonModel(),
                    COLUMN_ID_INDEX: COLUMN_ID_INDEX,
                    presenterState: 'preview-mode',
                    modelEvent: this._privateChannel,
                    statusBarOptions: {
                        nbRows: this._bulkTableModel.getNbRows(),
                        nbColumns: 0,
                        totalColumnLabel: _NLS_PCsBulkTablePresenter.TotalProductConfigurations,
                        totalRowsLabel: _NLS_PCsBulkTablePresenter.TotalVariability,
                        withStatusInfo: this._withSolver, //true withStatusInfo
                        withStatusComputing: this._withStatusComputing, //true,
                        withSuggestionsComputing: this._withSuggestionComputing //false
                    },
                    setAsReferenceItem: true                   
                };
                if (this._container) {
                    this.destroy();
                    this._eventManager = new xModelEventManager(this._privateChannel, this._applicationChannel, this._privateChannelForRules);
                }
                this._createBulkTableDGV(bulkPresenterOptions);
                //for autocomplete implementation
                this.registerCellContent();
            }
        },
        _createBulkTableDGV: function (bulkPresenterOptions) {

            if (bulkPresenterOptions) {
                this._parent(bulkPresenterOptions);
            }
        },
        _initPCBulkModel: function () {
            var configModel = new ConfiguratorModel({});
            configModel.setDictionary(this._variabilityDictionary);
            var mapDicoPC = configModel.getDictionary();
            this._bulkTableModel = new BulkTableModel(mapDicoPC);
        },
        _subscribeToEvents: function() {
            this._parent();
        },
        setColumnAsReference: function(cellInfos){
            this._parent(cellInfos);
        },
        unSetColumnAsReference: function(isChangeReference){
            this._parent(isChangeReference);
        },
        onTableUpdateStart: function () {
            this._parent();
        },
        onTableUpdateEnd : function () {
            this._parent();
        },
        fetchData: function (arraySelectedIds) {
            var that_ = this;
            return new Promise((resolve, reject) => {
                if (arraySelectedIds.length) {

                    // R14 do not overwhelm the server with fetch.
                    // When the loading Selected PCs function is busy
                    // push new entries to a buffer
                    if (UWA.is(that_._batchLoadingPromise)) {
                        that_._bufferFetchIds = that_._bufferFetchIds.concat(arraySelectedIds);
                        that_._bufferFetchPromises.push({
                            resolve: resolve,
                            reject: reject
                        });
                    } else {
                        Mask.mask(that_._container);
                        arraySelectedIds.forEach(function (pcObj) {
                            pcObj.modelID = that_._modelId;
                            that_._bulkTableModel.createColumn(pcObj);
                        });
                        // update list of selected Ids.
                        that_._selectedPCs = that_._selectedPCs.concat(arraySelectedIds);
                        that_._batchLoadingPromise = that_.batchLoading(arraySelectedIds).then(function () {
                            that_._batchLoadingPromise = null;
                            Mask.unmask(that_._container);
                            setTimeout(function () {
                                if (that_._bufferFetchIds.length) {
                                    that_.fetchData(that_._bufferFetchIds).then(function () {
                                        that_._bufferFetchPromises.forEach(function (mypromise) {
                                            mypromise.resolve();
                                        });
                                    });
                                    that_._bufferFetchIds = [];
                                }
                            });
                            resolve();
                        }, function (err) {
                            that_._batchLoadingPromise = null;
                            Mask.unmask(that_._container);
                            reject(err);
                        });
                    }
                } else {
                    reject(new Error("Empty List"));
                }
            });
        },
        /**
         * R14: to move to BulkTablePresenter
         * fetching content column by column after selection then checking conflict
         */
        batchLoading: function (arraySelectedIds) {
            var that = this;
            var selectedPCs = UWA.clone(arraySelectedIds, false); // doing shallow clone to avoid stack max side exceed issue
            var FinalPromise = new Promise((resolve, reject) => {
                var PromiseArray = [];
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));
                if (arraySelectedIds.length)
                    PromiseArray.push(that.loadElement(arraySelectedIds.shift()));

                if (PromiseArray.length) {
                    Promise.all(PromiseArray).then((values) => {
                        setTimeout(function () {
                            that._createColumnsForLoadedInfos(values, selectedPCs);
                            that.batchLoading(arraySelectedIds).then(
                                function () {
                                    resolve();
                                },
                                function (err) {
                                    reject(err);
                                }
                            );
                        });
                    });
                } else {
                    resolve();
                    
                    that._pauseCheckConflictCall = false;
                    that.checkConflictOfAllPCs();
                    
                }
            });
            return FinalPromise;
        },
        loadElement: function (selectedPC) {
            var that = this;
            return new UWA.Promise(function(resolve,reject){
                that.getCriteriaConfigurationInstances({
                    id: selectedPC.id,
                    filterRejected:false
                }, function (data_success) {
                    UWA.log('Success');
                    resolve(data_success);
                }, function (data_failure) {
                    UWA.log('Failed' + data_failure);
                    reject();
                });
            });
        },
        _createColumnsForLoadedInfos: function (loadData, selectedPCs) {
            if (loadData) {

                var variabilityValuesMap = this._bulkTableModel.getVariabilityValuesMap();
                for (var i = 0; i < loadData.length; i++) {
                    if (loadData[i].member && UWA.is(loadData[i].member, 'array')) {
                        var dataReceived = loadData[i].member;
                        var configurationCriteria = [];
                        for (var j = 0; j < dataReceived.length; j++) {
                            var cellObj = PCsBulkViewPresenterUtils.buildJsonModelFormatForLoadedData(dataReceived[j], variabilityValuesMap);
                            configurationCriteria.push(cellObj);
                        }
                        var pcId = selectedPCs[i].id;
                        var columnID = this._bulkTableModel.getColumnID(pcId);
                        // push Id to check conflict
                        if(!this._arrayColumnIDsToCheck.includes(columnID)){
                            this._arrayColumnIDsToCheck.push(columnID);
                        }
                        if (columnID !== undefined) {
                            configurationCriteria = this._bulkTableModel.switchVariantToMultiSelection(configurationCriteria, columnID);
                            this._bulkTableModel.updateJsonModel(configurationCriteria, columnID);
                            var pcObj = this._bulkTableModel.getColumnHeader(columnID);
                            // create the column in dgv after getting the content
                            if (!this._loadedPCs[pcObj.id]) {
                                this._loadedPCs[pcObj.id] = pcObj;
                                this._createColumnForPC(pcObj);
                            }
                        }

                    }
                }

            }
        },
        _createColumnForPC: function (pcObj) {
            var that = this;

            if (pcObj) {

                let VariabilityOpt = {
                    dataIndex: pcObj.id,
                    sortableFlag: false,
                    autoRowHeightFlag: true,
                    editableFlag : that._editionflag,
                    onCellRequest: function (cellInfos) {
                        var isEditable = that._dataGridView.layout.getColumnEditableFlag(cellInfos.columnID);
                        that._setCellContent(cellInfos, isEditable);
                    },
                    getCellValue: function (cellInfos) {
                        if (cellInfos.nodeModel) {
                            var matrix_columnID = cellInfos.columnID - COLUMN_ID_INDEX;
                            var matrix_rowID = cellInfos.rowID;
                            var cellData = that._bulkTableModel.getMatrixCellData(matrix_columnID, matrix_rowID);
                            var title = cellData.title;
                            if (UWA.is(cellData.title,'number')) {
                                title = String(title);
                                if (cellData.unit) {
                                    title += " " + _NLS_xUnitLabelLong[cellData.unit];
                                }
                            }
                            else if (cellData && cellData.title) {
                                title = cellData.title;
                            }
                            return title;                            
                        }
                    },
                    setCellValue: function (cellInfos, value) {
                        that._privateChannel.publish({
                            event: 'bulkEdit-on-change'
                        });
                        var rowID = cellInfos.nodeModel.options.grid.rowIndex;
                        var cellType = that._bulkTableModel.getCellType(cellInfos.rowID);
                        var checkConflictOfAllPC = true;
                        if (value !== undefined) {
                            if (cellType && cellType === 'Parameter') {
                                // in case of Param => do check conflict
                                checkConflictOfAllPC = true;
                                // Math.round: spinbox returns 204.99999999 for 205 IR-1224493-3DEXPERIENCER2024x
                                that._bulkTableModel.setMatrixCellData(cellInfos.columnID - COLUMN_ID_INDEX, rowID, Math.round(value));
                            }else{
                                that._bulkTableModel.setMatrixCellData(cellInfos.columnID - COLUMN_ID_INDEX, rowID, value);
                            }
                        }
                        if (checkConflictOfAllPC) {
                            that.checkConflictOfPC(cellInfos.columnID - COLUMN_ID_INDEX).then(function (data) {
                                that.applySolverAnswer(data, cellInfos.columnID - COLUMN_ID_INDEX);
                                that.checkStatusOfPC(cellInfos.columnID - COLUMN_ID_INDEX).then(function (solverData) {
                                    that.applySolverAnswer(solverData, cellInfos.columnID - COLUMN_ID_INDEX);
                                    //update the UX
                                    that._updateDGVColumn(cellInfos.columnID);
                                });
                            });
                        }
                    }
                };

                var columnOptions = { };
                if(this._isBCConfigEnabled) {
                    columnOptions = { 
                        text: pcObj.title,
                        icon: pcObj.attributes.image,                   
                        typeRepresentation: 'string', 
                        dataIndex: pcObj.id + '_title', 
                        children:  [{
                            text: pcObj.attributes.BaseConfigurationTitle ?  pcObj.attributes.BaseConfigurationTitle + ' ' + pcObj.attributes.BaseConfigurationRevision : '',                        
                            typeRepresentation: "dropdownSelection",
                            dataIndex: pcObj.attributes.BaseConfigurationId,
                            children: [ VariabilityOpt ]
                        }] 
                    };
                }else 
                    columnOptions = UWA.merge(VariabilityOpt, {'text': pcObj.title , icon: pcObj.attributes.image });                                       
               
                this._dataGridView.addColumnOrGroup(columnOptions);
                var data = {
                    id: 'totalColumn',
                    text: _NLS_PCsBulkTablePresenter.TotalProductConfigurations + ' : ' + Object.keys(this._loadedPCs).length
                };
                this._updateStatusBar(data);
            }
        },

        removeLoadedPC: function (pcsToRemove) {
            if (pcsToRemove) {
                var arraySelectedPCs = pcsToRemove;
                if (UWA.is(pcsToRemove, 'array') === false) {
                    arraySelectedPCs = [pcsToRemove];
                }
                this._dataGridView.prepareUpdateView();
                for (var i = 0; i < arraySelectedPCs.length; i++) {
                    // deactivate show differences icon if we are removing the reference pc
                    var columnAsReference = this._bulkTableModel.getColumnHeader(this._bulkTableModel.getColumnID(arraySelectedPCs[i].id));
                    if (columnAsReference) {
                        if (columnAsReference.isAsReference) {
                            this._compareFlag = false;
                            this._privateChannel.publish({
                                event: 'enox-collection-toolbar-change-icon-action',
                                data: {
                                    id: 'compare-pc',
                                    fonticon: 'variants-and-options-compare',
                                    text: _NLS_BulkTablePresenter.HighlightDifferences
                                }
                            });
                        }
                    }
                    var columnId = this._bulkTableModel.getColumnIndexFromColumnMap(arraySelectedPCs[i].id);
                    if(UWA.is(columnId)){
                        if(this._arrayColumnIDsToCheck.includes(columnId)){
                            this._arrayColumnIDsToCheck.splice(this._arrayColumnIDsToCheck.indexOf(columnId), 1);
                        }
                        if(this._arrayColumnIDsChecked.includes(columnId)){
                            this._arrayColumnIDsChecked.splice(this._arrayColumnIDsChecked.indexOf(columnId), 1);
                        }
                    }
                    this._bulkTableModel.removeColumn(arraySelectedPCs[i]);
                    delete this._loadedPCs[arraySelectedPCs[i].id];
                    this._dataGridView.removeColumnOrGroup(arraySelectedPCs[i].id);
                }
                var data = {
                    id: 'totalColumn',
                    text: _NLS_PCsBulkTablePresenter.TotalProductConfigurations + ' : ' + Object.keys(this._loadedPCs).length
                };
                // Unset column as reference and deactivate show differences icon if there is less than two columns left
                if (Object.keys(this._loadedPCs).length < 2 && this._compareFlag) {
                    this.unSetColumnAsReference(false);
                }
                this._updateStatusBar(data);
                this._dataGridView.pushUpdateView();
            }
        },

        removeAllLoadedPCs: function () {
            var that = this;
            if (this._loadedPCs && Object.keys(this._loadedPCs).length > 0) {
                Object.values(this._loadedPCs).forEach(function (pc) {
                    that.removeLoadedPC(pc);
                });
            }
        },
        getNbLoadedPCs: function () {
            return this._bulkTableModel.getAllColumnIDs().length;
        },
        _setCellContent: function (cellInfos, isEditable) {

            var component;
            var rowID = cellInfos.nodeModel.options.grid.rowIndex;
            cellInfos.rowID = rowID;
            var cellData = this.getCellData(cellInfos);
            var type = cellInfos.nodeModel ? cellInfos.nodeModel.getAttributeValue('type') : undefined;
            var referenceCellData;
            if (this._compareFlag) {
                referenceCellData = this.getReferenceCellData(cellInfos);
            }
            if (type) {
                // Variant , VariabilityGroup, Parameter

                cellInfos.cellView.setReusableContent(null);
                if (isEditable) {
                    if (type === 'Parameter') {
                        var paramData = this._bulkTableModel.getRowHeaderData(cellInfos.rowID);
                        var max = paramData.range[0].max;
                        var min = paramData.range[0].min;
                        var state = cellData.state;
                        var value = cellData.title;
                        if (value === '') {
                            value = undefined;
                        }
                        component = this._dataGridView.reuseCellContent('numericalSelectionEditor');
                        component.setProperties({
                            value: value,
                            units: min.unit,
                            minValue: cellData.minValue ? cellData.minValue : min.value,
                            maxValue: cellData.maxValue ? cellData.maxValue : max.value,
                            state: PCsBulkViewPresenterUtils.fromStateToStatus(state),
                            isConflicting: cellData.stateValidity && cellData.stateValidity !== 'V'
                        });
                        if (referenceCellData) {
                            var referenceParam = referenceCellData.title + referenceCellData.unit;
                            value = cellData.title + cellData.unit;
                            if (referenceParam !== value) {
                                component.getContent().classList.add('highlight-parameter');
                            }else {
                                component.getContent().classList.remove('highlight-parameter');
                            }
                        }

                    } else {
                        if (type === 'VariabilityGroup') {
                            component = this._dataGridView.reuseCellContent('_autoCompleteMultiple');
                            component.setTemplateOptions({
                                values: cellData.values,
                                referenceValues: referenceCellData ? referenceCellData.values : undefined,
                                items: cellData.dropDownData,
                                cellInfos: cellInfos
                            });
                        } else {

                            component = this._dataGridView.reuseCellContent('_autoComplete');
                            var dataIndex = this._dataGridView.layout.getDataIndexFromColumnIndex(cellInfos.columnID);
                            var id = cellData.id;
                            if (cellInfos.nodeModel.getAttributeValue(dataIndex)) {
                                id = cellInfos.nodeModel.getAttributeValue(dataIndex);
                            }
                            component.setTemplateOptions({
                                id: id,
                                referenceId: referenceCellData ? referenceCellData.id : undefined,
                                image: cellData.image,
                                value: cellData.title,
                                items: cellData.dropDownData,
                                multiSelect: false,
                                cellInfos: cellInfos,
                                stateValidity: cellData.stateValidity,
                                state: cellData.state
                            });
                        }
                    }


                } else {
                    if (type === 'VariabilityGroup') {
                        component = this._dataGridView.reuseCellContent('_valueMultiple');
                        component.setTemplateOptions({
                            items: cellData.values,
                            referenceValues: referenceCellData ? referenceCellData.values : undefined
                        });
                    } else {
                        // For variant in multi-selection, we display a multiple value badge
                        if (cellData.values) {
                            component = this._dataGridView.reuseCellContent('_valueMultiple');
                            component.setTemplateOptions({
                                items: cellData.values,
                                referenceValues: referenceCellData ? referenceCellData.values : undefined
                            });
                        } else {
                            // For variant & parameter, we display a single value badge for both
                            component = this._dataGridView.reuseCellContent('_valueSingle');
                            var title = "";
                            if (type === 'Parameter') {
                                if (UWA.is(cellData.title,'number')) {
                                    title = String(cellData.title);
                                    if (cellData.unit) {
                                        title += " " + _NLS_xUnitLabelLong[cellData.unit];
                                    }
                                }
                            } else { //Variant
                                title = cellData.title;
                            }
                            component.setTemplateOptions({
                                id: cellData.id,
                                type: type,
                                referenceData: referenceCellData ? referenceCellData : undefined,
                                value: title,
                                icon: cellData.image,
                                state: cellData.state,
                                stateValidity: cellData.stateValidity
                            });
                        }
                    }
                }
            }

            if (component) {
                // set content
                if ((type && type === 'Parameter') && isEditable) {
                    cellInfos.cellView.setReusableContent(component);
                } else {
                    cellInfos.cellView.setReusableContent(component.getTemplateContent());
                    if (type) {
                        if (type === 'VariabilityGroup' || (type === 'Variant' && component.items)) {
                            this._dataGridView.layout.resetRowHeight(cellInfos.rowID);
                        }
                    }
                }
            } else {
                this._dataGridView.defaultOnCellRequest(cellInfos);
            }
        },


        getCellData: function (cellInfos) {
            var matrix_columnID = cellInfos.columnID - COLUMN_ID_INDEX;
            var matrix_rowID = cellInfos.rowID;
            return this._bulkTableModel.getMatrixCellData(matrix_columnID, matrix_rowID);
        },
        registerCellContent: function () {
            var that = this;
            var STATE_ICONS = {
                'C': '',
                'A': '',
                'S': 'lightbulb',
                'R': 'lock',
                'D': 'favorite-on',
                'I': 'block',
                'M': 'user-delete',
                'Conflict': 'alert'
            };

            this._dataGridView.registerReusableCellContent({
                id: '_valueSingle',
                buildContent: function () {
                    var content = UWA.createElement('div');
                    content.classList.add('single-value-content');
                    var badges = {
                        setTemplateOptions: function (option) {
                            this.id = option.id;
                            this.referenceData = option.referenceData;
                            this.icon = option.icon;
                            this.state = option.state;
                            this.type = option.type;
                            this.stateValidity = option.stateValidity;
                            this.label.textContent = '';
                            var value = option.value;
                            if (this.state) {
                                if (this.state === 'C' || this.state === 'R' || this.state === 'D') {
                                    this.stateBtn.setContent(Dom.generateIcon(STATE_ICONS[this.state]));
                                    if (this.icon && value) {
                                        this.label.textContent = value;
                                        this.iconBtn.setContent(Dom.generateIcon({
                                            iconPath: this.icon,
                                            iconSize: {
                                                width: '25px',
                                                height: '22px'
                                            }
                                        }));
                                        this.iconBtn.setStyle('visibility', 'visible');
                                        this.stateBtn.setStyle('visibility', 'visible');
                                        content.addContent(this.iconBtn);
                                        this.label.setStyle('padding-left', '0px');
                                    }
                                    if (this.state === 'R' || this.state === 'D') {
                                        content.addContent(this.stateBtn);
                                        this.label.setStyle('padding-left', '5px');
                                    }
                                } else {
                                    this.iconBtn.setStyle('visibility', 'hidden');
                                    this.stateBtn.setStyle('visibility', 'hidden');
                                }
                            }

                            if (this.stateValidity && this.stateValidity === 'C') {
                                this.stateBtn.setContent(Dom.generateIcon(STATE_ICONS.Conflict));
                                this.stateBtn.setStyle('visibility', 'visible');
                                this.stateBtn.classList.add('pc-bulk-conflict');
                                content.addContent(this.stateBtn);
                                this.label.setStyle('padding-left', '20px');
                                content.addContent(this.label);
                                content.value = this.id;
                            } else {
                                content.addContent(this.label);
                                content.value = this.id;
                            }
                            if (this.referenceData) {
                                if (this.referenceData.id !== this.id) {
                                    content.classList.add('highlight-background');
                                } else {
                                    if (this.type === 'Parameter') {
                                        var referenceParamValue = "";
                                        if (UWA.is(this.referenceData.title,'number')) {
                                            referenceParamValue = String(this.referenceData.title);
                                            if (this.referenceData.unit) {
                                                referenceParamValue += " " + _NLS_xUnitLabelLong[this.referenceData.unit];
                                            }
                                        }
                                        if (referenceParamValue !== value) {
                                            content.classList.add('highlight-background');
                                        }
                                    }
                                }
                            }
                        },
                        iconBtn: UWA.createElement('div', {
                            styles: {
                                display: 'inline-block'
                            }
                        }),
                        stateBtn: UWA.createElement('div', {
                            styles: {
                                display: 'inline-block'
                            }
                        }),
                        label: UWA.createElement('span'),
                        getTemplateContent: function () {
                            return content;
                        }
                    };
                    return badges;
                }
            });

            this._dataGridView.registerReusableCellContent({
                id: '_valueMultiple',
                buildContent: function () {
                    var content = UWA.createElement('div');
                    content.classList.add('multiple-value-content');
                    var badges = {
                        setTemplateOptions: function (option) {
                            this.referenceValues = option.referenceValues;
                            if (option && option.items) {
                                this.items = option.items;
                            }
                            if (content.getChildren().length > 0) {
                                content.destroy();
                            }
                            for (var i = 0; i < this.items.length; i++) {
                                if (this.items[i].state && (this.items[i].state === 'C' || this.items[i].state === 'R' || this.items[i].state === 'D')) {
                                    var iconBtn = UWA.createElement('div', {
                                        styles: {
                                            display: 'inline-block'
                                        }
                                    });
                                    iconBtn.setContent(Dom.generateIcon({
                                        iconPath: this.items[i].image,
                                        iconSize: {
                                            width: '27px',
                                            height: '22px'
                                        }
                                    }));
                                    iconBtn.setStyle('visibility', 'visible');

                                    var badge = new Badge({
                                        content: this.items[i].title,
                                        className: "default"
                                    });
                                    var referenceValueExist = true;
                                    if (this.referenceValues) {
                                        referenceValueExist = this.referenceValues.some(elem => elem.id === this.items[i].id);
                                    }
                                    var badgeDivContent = badge.getContent();
                                    badgeDivContent.classList.add('badge-multiple-value');
                                    //Case if the value doesn't exist in the reference column -> highlight that value
                                    if (!referenceValueExist) {
                                        badgeDivContent.classList.add('highlight-background');
                                    }
                                    badgeDivContent.insertBefore(iconBtn, badgeDivContent.children[0]);
                                    if (this.items[i].stateValidity && this.items[i].stateValidity === 'C') {
                                        var conflictBtn = UWA.createElement('div', {
                                            styles: {
                                                display: 'inline-block'
                                            }
                                        });
                                        conflictBtn.setContent(Dom.generateIcon(STATE_ICONS.Conflict));
                                        conflictBtn.setStyle('visibility', 'visible');
                                        conflictBtn.classList.add('pc-bulk-conflict-option');
                                        badgeDivContent.insertBefore(conflictBtn, badgeDivContent.children[badgeDivContent.getChildren().length - 1]);
                                        conflictBtn.onclick = function () {
                                            if (this.id && that.configCriteriaMap) {
                                                var listConflictingRules = that.configCriteriaMap[this.id].conflictingRules;
                                                if (listConflictingRules && listConflictingRules.length > 0) {
                                                    that._getRuleDetails(listConflictingRules, this.title);
                                                }
                                            }
                                        }.bind(this.items[i]);
                                    }
                                    content.addContent(badge);
                                }

                            }
                            // If reference column's cell contains values and the compared with column's cell is empty -> highlight cell background
                            if (this.items.length === 0) {
                                if (this.referenceValues && this.referenceValues.length > 0) {
                                    content.classList.add('highlight-background');
                                }
                            } else {
                                // If reference column's cell contains values and compared column's cell :
                                // 1) Does not contain all values from reference cell -> highlight compared cell background
                                // 2) Contains all values from reference cell -> dont compared highlight the cell background

                                // if(this.referenceValues && this.referenceValues.length > this.items.length){
                                //   content.classList.add('highlight-background');
                                // }else
                                if (this.referenceValues && this.referenceValues.length > 0) {
                                    var differences = this.referenceValues.filter(obj1 => {
                                        return !this.items.some(obj2 => {
                                            return obj1.id === obj2.id;
                                        });
                                    });
                                    if (differences.length > 0) {
                                        content.classList.add('highlight-background');
                                    }
                                }
                            }
                        },
                        getTemplateContent: function () {
                            return content;
                        }
                    };
                    return badges;
                }
            });
            
            this._dataGridView.registerReusableCellContent({
                id: 'numericalSelectionEditor',
                buildContent: function() {
                    return new NumericalSelectionEditor({});
                },
                cleanContent: function(content) {
                    if (content && UWA.is(content.cleanContent, 'function')) {
                        content.cleanContent();
                    }
                }
            });

        },
        destroy: function () {
            this._parent();
            if (this._eventManager) {
                this._eventManager.cleanup("PCsBulkTablePresenter");
                this._eventManager = null;
            }

        },
        refresh: function () {
            if (this._dataGridView) {
                this._dataGridView.invalidateLayout({
                    updateCellContent: true,
                    updateCellLayout: false,
                    updateCellAttributes: false
                });

            }
        },
        inject: function (parentContainer) {
            this._container.inject(parentContainer);
        },
        getContent: function () {
            return this._container;
        },
        getCriteriaConfigurationInstances: function (data, onCompl, onFail) {
            var that = this;
            var urlCatalog;
            this.getURL().then(function(){
                if (that._3dCompassUrl) {
                    urlCatalog = that._3dCompassUrl;
                }
                urlCatalog += RESOURCE_WS_URL + INVOKE_SERVICE + CONSTANT_GET_CRITERIA_CONFIGURATION_INSTANCE;

                that._integratedEnv = true;
                var ajaxRequest = that._integratedEnv ? WAFData.authenticatedRequest : WAFData.proxifiedRequest;
                data = UWA.is(data, 'string') ? data : JSON.stringify(data);
                ajaxRequest(urlCatalog, {
                    method: 'POST',
                    data: data,
                    type: 'json',
                    async: true,
                    headers: that._integratedEnv ? {
                        'SecurityContext': (that._securityContext) ? that._securityContext : '',
                        'Content-Type': 'application/json'
                    } : {
                        'Content-Type': 'application/json',
                        'Authorization': urlCatalog.authorizationTicket ? urlCatalog.authorizationTicket : '',
                        'SecurityContext': urlCatalog.securityContext ? urlCatalog.securityContext : ''
                    },
                    onComplete: onCompl,
                    onFailure: onFail,
                    timeout: 300000
                });
            });
        },
        getURL: function () {
            var that = this;
            return new UWA.Promise(function (resolve, reject) {
                if (that._3dCompassUrl === null || that._3dCompassUrl === undefined) {
                    var parameters = {
                        serviceName: STR_SERVICE_NAME,
                        platformId: that._tenant,
                        async: false,
                        onComplete: function (URLResult) {
                            if (typeof URLResult === 'string') {
                                that._3dCompassUrl = URLResult;
                            } else {
                                that._3dCompassUrl = URLResult[0].url;
                                URLResult.forEach(function (platforms) {
                                    if (platforms.platformId === that._tenant) {
                                        that._3dCompassUrl = platforms.url;
                                    }
                                });
                            }
                            resolve();
                        },
                        onFailure: function () {
                            UWA.log('3DCompasss Service URL fetch failed...');
                            reject();
                        }
                    };
                    i3DXCompassServices.getServiceUrl(parameters);
                } else {
                    resolve();
                }
            });
        }
    });
    return PCsBulkViewPresenter;
});

