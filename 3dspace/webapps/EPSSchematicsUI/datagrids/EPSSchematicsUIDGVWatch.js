/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVWatch'/>
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVWatch", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDataGridView", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVTools", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXTreeNodeModel", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsUI/tools/EPSSchematicsUIEvents", "DS/EPSSchematicsUI/tools/EPSSchematicsUIWUXTools", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "css!DS/EPSSchematicsUI/css/datagrids/EPSSchematicsUIDGVWatch"], function (require, exports, UIDataGridView, UIDGVTools, WUXTreeNodeModel, EventServices, ExecutionEvents, Events, ModelEnums, Tools, UIEvents, UIWUXTools, UINLS) {
    "use strict";
    /**
     * This class defines a UI data grid view watch.
     * @private
     * @class UIDGVWatch
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVWatch
     * @extends UIDataGridView
     */
    class UIDGVWatch extends UIDataGridView {
        /**
         * @public
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        constructor(editor) {
            super({
                className: 'sch-datagridview-watch',
                rowsHeader: false,
                columnsHeader: true,
                columnDragEnabledFlag: false,
                cellDragEnabledFlag: false,
                showAlternateBackgroundFlag: false,
                showRowBorderFlag: false,
                showCellActivationFlag: false,
                cellActivationFeedback: 'none',
                cellSelection: 'none',
                cellPreselectionFeedback: 'row',
                rowSelection: 'none',
                treeNodeCellOptions: {
                    expanderStyle: 'triangle'
                }
            });
            this._isPlaying = false;
            this._isBreak = false;
            this._eventListenerMap = new Map();
            this._onViewerChangeCB = this._onViewerChange.bind(this);
            this._onTraceStartCB = this._onTraceStart.bind(this);
            this._onTraceStopCB = this._onTraceStop.bind(this);
            this._onTraceBlockCB = this._onTraceBlock.bind(this);
            this._onTraceDataPortCB = this._onTraceDataPort.bind(this);
            this._onDebugBreakCB = this._onDebugBreak.bind(this);
            this._onDebugUnbreakCB = this._onDebugUnbreak.bind(this);
            this._onDataPortChangeCB = this._onDataPortChange.bind(this);
            this._onDataPortRenameCB = this._onDataPortRename.bind(this);
            this._editor = editor;
            this._viewer = this._editor.getViewerController().getCurrentViewer();
            this._rootGraph = this._editor.getViewerController().getRootViewer().getMainGraph().getModel();
            this._traceController = this._editor.getTraceController();
            this._initialize();
        }
        /**
         * Gets the user scope node.
         * @public
         * @returns {WUXTreeNodeModel} The user scope node.
         */
        getUserScopeNode() {
            return this._userScopeNode;
        }
        /**
         * Removes the data grid view.
         * @public
         * @override
         */
        remove() {
            this._editor.removeListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            EventServices.removeListener(ExecutionEvents.TraceStartEvent, this._onTraceStartCB);
            EventServices.removeListener(ExecutionEvents.TraceStopEvent, this._onTraceStopCB);
            EventServices.removeListener(ExecutionEvents.TraceBlockEvent, this._onTraceBlockCB);
            EventServices.removeListener(ExecutionEvents.TraceDataPortEvent, this._onTraceDataPortCB);
            EventServices.removeListener(ExecutionEvents.DebugBreakEvent, this._onDebugBreakCB);
            EventServices.removeListener(ExecutionEvents.DebugUnbreakEvent, this._onDebugUnbreakCB);
            this._removeUserScopeChildren();
            this._editor = undefined;
            this._viewer = undefined;
            this._rootGraph = undefined;
            this._traceController = undefined;
            this._isPlaying = undefined;
            this._isBreak = undefined;
            this._lastBlockPath = undefined;
            this._userScopeNode = undefined;
            this._breakScopeNode = undefined;
            this._lastBlockNode = undefined;
            this._currentBlockNode = undefined;
            this._graphScopeNode = undefined;
            this._onViewerChangeCB = undefined;
            this._onTraceStartCB = undefined;
            this._onTraceStopCB = undefined;
            this._onTraceDataPortCB = undefined;
            this._onDebugBreakCB = undefined;
            this._onDebugUnbreakCB = undefined;
            this._onDataPortChangeCB = undefined;
            this._onDataPortRenameCB = undefined;
            super.remove();
        }
        /**
         * Add the data port to the user scope.
         * @public
         * @param {string} path - The data port path.
         */
        addDataPortToUserScope(path) {
            if (path !== '') {
                const childNodes = this._userScopeNode.getChildren() || [];
                const exist = childNodes.find(cn => {
                    const dataPort = cn.getAttributeValue('dataPort');
                    return dataPort.toPath(this._rootGraph) === path;
                }) !== undefined;
                if (!exist) {
                    let dataPort = this._rootGraph.getObjectFromPath(path);
                    if (dataPort) {
                        const nodeModel = this._createDataPortNode(dataPort, true);
                        this._userScopeNode.addChild(nodeModel);
                        this._userScopeNode.expand();
                        const listeners = [];
                        // Manage data port name change
                        this._registerListener(nodeModel, dataPort, Events.DataPortNameChangeEvent, this._onDataPortRenameCB);
                        // Manage data port validity change (when changing type definition)
                        // We decide to do nothing as the data port becomes invalid in the UI (red color)
                        // And if the user removes it, it will also be removed from the watch!
                        // this._registerListener(nodeModel, dataPort, Events.DataPortValidityChangeEvent, this._onDataPortChangeCB);
                        if (dataPort.dataPort) {
                            // Manage removing subDataPort
                            this._registerListener(nodeModel, dataPort.dataPort, Events.DataPortRemoveEvent, this._onDataPortChangeCB);
                            // Manage parent data port name change
                            this._registerListener(nodeModel, dataPort.dataPort, Events.DataPortNameChangeEvent, this._onDataPortRenameCB);
                            dataPort = dataPort.dataPort;
                        }
                        if (dataPort.block) {
                            // Manage removing data port from its block
                            this._registerListener(nodeModel, dataPort.block, Events.DataPortRemoveEvent, this._onDataPortChangeCB);
                            // Manage parent block name change
                            this._registerListener(nodeModel, dataPort.block, Events.BlockNameChangeEvent, this._onDataPortRenameCB);
                            // Manage removing and renaming a block on all hierarchy
                            let graph = dataPort.block.graph;
                            while (graph) {
                                this._registerListener(nodeModel, graph, Events.BlockRemoveEvent, this._onDataPortChangeCB);
                                this._registerListener(nodeModel, graph, Events.BlockNameChangeEvent, this._onDataPortRenameCB);
                                graph = graph.graph;
                            }
                        }
                        this._eventListenerMap.set(nodeModel, listeners);
                    }
                }
            }
        }
        /**
         * The callback on the data port change event.
         * @private
         * @param {EPEvent} _event - The data port change event.
         */
        _onDataPortChange(_event) {
            this.updateRemovedDataPortsFromUserScope();
        }
        /**
         * The callback on the data port rename event.
         * @private
         * @param {EPEvent} _event - The data port rename event.
         */
        _onDataPortRename(_event) {
            let children = this._userScopeNode.getChildren() || [];
            children.forEach(child => {
                const dataPort = child.getAttributeValue('dataPort');
                const newName = this._formatDataPortPath(dataPort);
                child.setLabel(newName);
            });
        }
        /**
         * Removes the user scope children.
         * @private
         */
        _removeUserScopeChildren() {
            let children = this._userScopeNode.getChildren() || [];
            children.forEach(child => this._removeUserScopeChildNode(child));
            this._userScopeNode.removeChildren();
        }
        /**
         * Remove the provided child node from the user scope.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The child node to remove.
         */
        _removeUserScopeChildNode(nodeModel) {
            if (this._eventListenerMap.has(nodeModel)) {
                const listeners = this._eventListenerMap.get(nodeModel);
                listeners.forEach(listener => listener.parent.removeListener(listener.eventType, listener.callback));
                this._eventListenerMap.delete(nodeModel);
            }
            this._userScopeNode.removeChild(nodeModel);
        }
        /**
         * Resgisters the listener for the specified node model.
         * @private
         * @param {WUXTreeNodeModel} nodeModel - The node model to register.
         * @param {DataPort | Block} parent - The parent data port or block model.
         * @param {EPEvent} eventType - The event type of the listener.
         * @param {IEPEventCB} callback - The callback of the listener.
         */
        _registerListener(nodeModel, parent, eventType, callback) {
            const listeners = this._eventListenerMap.get(nodeModel) || [];
            parent.addListener(eventType, callback);
            listeners.push({ parent: parent, eventType: eventType, callback: callback });
            this._eventListenerMap.set(nodeModel, listeners);
        }
        /**
         * Updates the removed data ports from the user scope.
         * @public
         */
        updateRemovedDataPortsFromUserScope() {
            let children = this._userScopeNode.getChildren() || [];
            // Remove unexisting data ports
            const childrenToRemove = children.filter(cn => {
                const dataPort = cn.getAttributeValue('dataPort');
                return dataPort.toPath(this._rootGraph) === undefined;
            });
            childrenToRemove.forEach(cn => this._removeUserScopeChildNode(cn));
            // Update label of remaining ports
            children = this._userScopeNode.getChildren() || [];
            children.forEach(cn => cn.setLabel(this._formatDataPortPath(cn.getAttributeValue('dataPort'))));
        }
        /**
         * Initializes the data grid view.
         * @private
         */
        _initialize() {
            this._userScopeNode = new WUXTreeNodeModel({
                label: UINLS.get('watchPanelSectionUserScope'),
                grid: {}
            });
            this._treeDocument.addRoot(this._userScopeNode);
            // Break Scope
            this._lastBlockNode = new WUXTreeNodeModel({
                label: UINLS.get('watchPanelSectionLastBlock'),
                grid: {}
            });
            this._lastBlockNode.hide();
            this._currentBlockNode = new WUXTreeNodeModel({
                label: UINLS.get('watchPanelSectionCurrentBlock'),
                grid: {}
            });
            this._currentBlockNode.hide();
            this._breakScopeNode = new WUXTreeNodeModel({
                label: UINLS.get('watchPanelSectionBreakScope'),
                grid: {},
                children: [this._lastBlockNode, this._currentBlockNode]
            });
            this._breakScopeNode.expand();
            this._treeDocument.addRoot(this._breakScopeNode);
            // Graph Scope
            this._graphScopeNode = new WUXTreeNodeModel({
                label: UINLS.get('watchPanelsectionGraphScope'),
                grid: {}
            });
            this._graphScopeNode.expand();
            this._treeDocument.addRoot(this._graphScopeNode);
            this._editor.addListener(UIEvents.UIViewerChangeEvent, this._onViewerChangeCB);
            EventServices.addListener(ExecutionEvents.TraceStartEvent, this._onTraceStartCB);
            EventServices.addListener(ExecutionEvents.TraceStopEvent, this._onTraceStopCB);
            EventServices.addListener(ExecutionEvents.TraceBlockEvent, this._onTraceBlockCB);
            EventServices.addListener(ExecutionEvents.TraceDataPortEvent, this._onTraceDataPortCB);
            EventServices.addListener(ExecutionEvents.DebugBreakEvent, this._onDebugBreakCB);
            EventServices.addListener(ExecutionEvents.DebugUnbreakEvent, this._onDebugUnbreakCB);
        }
        /**
         * Creates a data port node.
         * @private
         * @param {DataPort} dataPort - The data port model.
         * @param {boolean} [userScope=false] - True for user scope, false otherwise.
         * @returns {WUXTreeNodeModel} The created data port node.
         */
        _createDataPortNode(dataPort, userScope = false) {
            const dataPortPath = dataPort.toPath();
            const traceEvents = this._traceController.getEventByDataPortPath(dataPortPath);
            const lastTraceEvent = traceEvents[traceEvents.length - 1];
            const defaultValue = lastTraceEvent ? lastTraceEvent.getValue() : dataPort.getDefaultValue();
            const isRootDataPort = dataPort.block === this._rootGraph;
            const portTypeMap = ['i', 'O', 'L'];
            const dataPortIcon = {
                userName: portTypeMap[dataPort.getType()],
                iconSize: {
                    width: '22px',
                    height: '22px'
                }
            };
            const icons = userScope && isRootDataPort ? [dataPortIcon, 'home'] : [dataPortIcon];
            const dataPortNode = new WUXTreeNodeModel({
                label: userScope ? this._formatDataPortPath(dataPort) : dataPort.getName(),
                grid: {
                    dataPort: dataPort,
                    defaultValue: userScope ? undefined : defaultValue,
                    isDataPort: true,
                    isUserScope: userScope,
                    actions: {}
                },
                icons: icons
            });
            return dataPortNode;
        }
        /**
         * Initializes the graph scope.
         * @private
         */
        _initializeGraphScope() {
            this._resetGraphScope();
            const graphContext = this._viewer.getMainGraph();
            const localDataPorts = graphContext.getModel().getDataPorts(ModelEnums.EDataPortType.eLocal);
            localDataPorts.forEach(dp => this._graphScopeNode.addChild(this._createDataPortNode(dp)));
            const inputDataPorts = graphContext.getModel().getDataPorts(ModelEnums.EDataPortType.eInput);
            inputDataPorts.forEach(dp => this._graphScopeNode.addChild(this._createDataPortNode(dp)));
            const outputDataPorts = graphContext.getModel().getDataPorts(ModelEnums.EDataPortType.eOutput);
            outputDataPorts.forEach(dp => this._graphScopeNode.addChild(this._createDataPortNode(dp)));
            this._graphScopeNode.expand();
        }
        /**
         * Initializes the block scope.
         * @private
         * @param {string} blockPath - The path of the block.
         */
        _initializeBlockScope(blockPath) {
            // By default we display each data port (including NodeIdSelector data port).
            // However if the data port UI element exist (focus set on the sub graph) we retrieve the exposed state.
            const block = this._rootGraph.getObjectFromPath(blockPath);
            if (block) {
                this._currentBlockNode.removeChildren();
                const rootGraphUI = this._editor.getViewerController().getRootViewer().getMainGraph();
                const inputDataPorts = block.getDataPorts(ModelEnums.EDataPortType.eInput);
                inputDataPorts.forEach(dp => {
                    const isCurrentGraph = this._viewer.getMainGraph().getModel().getGraphContext() === dp.getGraphContext();
                    const dataPortUI = rootGraphUI.getObjectFromPath(dp.toPath(this._rootGraph));
                    const displayDataPort = dataPortUI !== undefined ? dataPortUI.isExposed() : !isCurrentGraph;
                    if (displayDataPort) {
                        this._currentBlockNode.addChild(this._createDataPortNode(dp));
                    }
                });
                this._currentBlockNode.expand();
                this._currentBlockNode.show();
            }
        }
        /**
         * Initializes the last block scope.
         * @private
         */
        _initializeLastBlockScope() {
            if (this._isBreak && this._lastBlockPath !== undefined) {
                this._lastBlockNode.removeChildren();
                const block = this._rootGraph.getObjectFromPath(this._lastBlockPath);
                if (block !== undefined) {
                    block.getDataPorts().forEach(dp => this._lastBlockNode.addChild(this._createDataPortNode(dp)));
                    this._lastBlockNode.expand();
                    this._lastBlockNode.show();
                }
            }
        }
        /**
         * Initializes the user scope.
         * @private
         */
        _initializeUserScope() {
            const children = this._userScopeNode.getChildren() || [];
            children.forEach(child => {
                const dataPort = child.getAttributeValue('dataPort');
                if (dataPort.getDataLinks().length === 0) {
                    child.setAttribute('defaultValue', dataPort.getDefaultValue());
                }
            });
        }
        /**
         * Resets the graph scope.
         * @private
         */
        _resetGraphScope() {
            this._graphScopeNode.removeChildren();
        }
        /**
         * Resets the break scope.
         * @private
         */
        _resetBreakScope() {
            this._lastBlockNode.removeChildren();
            this._currentBlockNode.removeChildren();
            this._lastBlockNode.hide();
            this._currentBlockNode.hide();
        }
        /**
         * Resets the user scope.
         * @private
         */
        _resetUserScope() {
            const children = this._userScopeNode.getChildren() || [];
            children.forEach(child => child.setAttribute('defaultValue', undefined));
        }
        /**
         * Defines the data grid view columns.
         * @protected
         * @override
         */
        _defineColumns() {
            this._defineWatchTreeColumn();
            this._definePortDefaultValueColumn();
            this._defineActionsColumn();
        }
        /**
         * The callback on the preselected cell change event.
         * @protected
         * @param {IWUXDataGridViewEvent} event - The data grid view event.
         */
        _onPreselectedCellChange(event) {
            const graphUI = this._viewer.getMainGraph();
            graphUI.unhighlightCompatibleDataPorts();
            if (event.dsModel) {
                const cellID = event.dsModel.getPreselectedCellID();
                const cellInfos = event.dsModel.getCellInfosAt(String(cellID));
                if (cellInfos?.nodeModel?.getAttributeValue('isDataPort')) {
                    const dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                    graphUI.highlightUIElementsFromModel([dataPort], ModelEnums.ESeverity.eWarning);
                }
            }
        }
        /**
         * Defines the watch tree column.
         * @private
         */
        _defineWatchTreeColumn() {
            this._columns.push({
                dataIndex: 'tree',
                text: '',
                visibleFlag: true,
                sortableFlag: false,
                editableFlag: false,
                typeRepresentation: 'string',
                getCellClassName: (cellInfos) => {
                    let className = UIDGVWatch._getCellClassName(cellInfos);
                    if (cellInfos?.nodeModel && className === '') {
                        const dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                        if (dataPort) {
                            const portType = dataPort.getType();
                            const portTypeMap = ['sch-dgv-dataport-input', 'sch-dgv-dataport-output', 'sch-dgv-dataport-local'];
                            className = portTypeMap[portType];
                        }
                    }
                    return className;
                },
                getCellTooltip: cellInfos => {
                    let tooltip;
                    if (cellInfos?.nodeModel?.getAttributeValue('isDataPort')) {
                        const dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                        const dataPortType = dataPort.getType();
                        const isInput = dataPortType === ModelEnums.EDataPortType.eInput;
                        const isOutput = dataPortType === ModelEnums.EDataPortType.eOutput;
                        const shortHelp = isInput ? UINLS.get('inputDataPortShortHelp') : isOutput ? UINLS.get('outputDataPortShortHelp') : UINLS.get('localDataPortShortHelp');
                        tooltip = UIWUXTools.createTooltip({
                            shortHelp: shortHelp,
                            initialDelay: 500
                        });
                    }
                    return tooltip;
                }
            });
        }
        /**
         * Defines the port default value column.
         * @private
         */
        _definePortDefaultValueColumn() {
            this._columns.push({
                dataIndex: 'defaultValue',
                text: '',
                width: 150,
                minWidth: 150,
                editionPolicy: 'EditionInPlace',
                getCellEditableState: (cellInfos) => {
                    let isEditable = false;
                    if (this._isDataPortDebuggable(cellInfos)) {
                        if (cellInfos.nodeModel.getParent() === this._currentBlockNode) {
                            isEditable = true;
                        }
                    }
                    return isEditable;
                },
                getCellClassName: UIDGVWatch._getCellClassName,
                getCellSemantics: (cellInfos) => {
                    let result = {};
                    if (cellInfos?.nodeModel?.getAttributeValue('isDataPort')) {
                        const dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                        const valueType = dataPort.getValueType();
                        if (UIDGVTools.isAnyObjectType(this._rootGraph.getGraphContext(), valueType)) {
                            const name = cellInfos.nodeModel.getLabel();
                            const defaultValue = cellInfos.nodeModel.getAttributeValue('defaultValue');
                            result = {
                                editor: this._editor,
                                objectName: name,
                                valueType: valueType,
                                value: defaultValue
                            };
                        }
                    }
                    return result;
                },
                getCellTypeRepresentation: (cellInfos) => {
                    let result = 'string';
                    if (cellInfos?.nodeModel?.getAttributeValue('isDataPort')) {
                        const dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                        result = dataPort.getValueType();
                    }
                    return result;
                },
                setCellValue: (cellInfos, value) => {
                    if (this._isDataPortDebuggable(cellInfos)) {
                        const dataPort = cellInfos.nodeModel.getAttributeValue('dataPort');
                        const isValueSettable = dataPort.isDefaultValueSettable();
                        if (isValueSettable) {
                            const previousDefaultValue = cellInfos.nodeModel.getAttributeValue('defaultValue');
                            if (UIDGVTools.isClassOrEventType(dataPort)) {
                                const valueType = dataPort.getValueType();
                                value = this._editor.getTypesCatalog().createClassTypeInstance(valueType, value);
                            }
                            const result = dataPort.setDefaultValue(value);
                            const defaultValue = result ? value : previousDefaultValue;
                            cellInfos.nodeModel.updateOptions({ grid: { defaultValue: defaultValue } });
                            const breakBlockData = [];
                            dataPort.block.getDataPorts(ModelEnums.EDataPortType.eInput).forEach(dp => {
                                const fromDebug = dp === dataPort;
                                breakBlockData.push({
                                    dataPort: dp,
                                    value: fromDebug ? defaultValue : dp.getDefaultValue(),
                                    fromDebug: fromDebug
                                });
                            });
                            this._editor.getOptions().playCommands.callbacks.onBreakBlockDataChange(breakBlockData);
                        }
                    }
                }
            });
        }
        /**
         * Checks whether the given data port is debuggable.
         * @private
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {boolean} True if the data port is debuggable.
         */
        _isDataPortDebuggable(cellInfos) {
            const isDataPort = cellInfos?.nodeModel?.getAttributeValue('isDataPort');
            const isDebuggable = this._editor.getOptions()?.playCommands?.callbacks?.onBreakBlockDataChange !== undefined;
            return isDataPort && isDebuggable && this._isPlaying;
        }
        /**
         * Defines the data grid view actions column.
         * @protected
         */
        _defineActionsColumn() {
            this._columns.push({
                dataIndex: 'actions',
                text: '',
                typeRepresentation: 'DGVActionBar',
                visibleFlag: true,
                editionPolicy: 'EditionInPlace',
                editableFlag: true,
                width: 30,
                minWidth: 30,
                getCellClassName: UIDGVWatch._getCellClassName,
                getCellSemantics: (cellInfos) => {
                    let result = {};
                    if (cellInfos?.nodeModel?.getAttributeValue('isUserScope')) {
                        result = {
                            count: 1,
                            removeButtonDefinition: {
                                display: true,
                                index: 0,
                                disabled: false,
                                tooltipOptions: {
                                    title: UINLS.get('removeWatchDataPortTitle'),
                                    shortHelp: UINLS.get('removeWatchDataPortShortHelp')
                                }
                            }
                        };
                    }
                    return result;
                },
                setCellValue: (cellInfos, value) => {
                    if (cellInfos?.nodeModel && value) {
                        if (value === 'eRemoveAction') {
                            this._userScopeNode.removeChild(cellInfos.nodeModel);
                        }
                    }
                }
            });
        }
        /**
         * Gets the cell class name.
         * @private
         * @static
         * @param {IWUXCellInfos} cellInfos - The cell infos.
         * @returns {string} - The cell class name.
         */
        static _getCellClassName(cellInfos) {
            let className = '';
            if (cellInfos?.nodeModel?.isRoot()) {
                className = 'sch-dgv-node-root';
            }
            return className;
        }
        /**
         * The callback on the trace start event.
         * @private
         */
        _onTraceStart() {
            this._isPlaying = true;
            this._initializeGraphScope();
            this._initializeUserScope();
        }
        /**
         * The callback on the trace stop event.
         * @private
         */
        _onTraceStop() {
            this._isPlaying = false;
            this._resetUserScope();
            this._resetBreakScope();
            this._resetGraphScope();
        }
        /**
         * The callback on the trace block event.
         * @private
         * @param {TraceBlockEvent} event - The trace block event.
         */
        _onTraceBlock(event) {
            const path = event.getPath();
            const isPathValid = path !== undefined && path !== '' && path !== Tools.rootPath;
            const executionResult = event.getExecutionResult();
            const isExecutionResultValid = executionResult === ModelEnums.EExecutionResult.eExecutionFinished ||
                executionResult === ModelEnums.EExecutionResult.eExecutionWarning;
            // If we are break on a block we ignore the traces that can arrive afterwards!
            if (!this._isBreak && isPathValid && isExecutionResultValid) {
                this._lastBlockPath = path;
            }
        }
        /**
         * The callback on the trace data port event.
         * @private
         * @param {TraceDataPortEvent} event - The trace data port event.
         */
        _onTraceDataPort(event) {
            const path = event.getPath();
            const defaultValue = event.getValue();
            const rootNodes = this._treeDocument.getAllDescendants();
            const dataPortNodes = rootNodes.filter(n => n.getAttributeValue('isDataPort'));
            // We can have the same node in graph scope and user scope!
            const foundNodes = dataPortNodes.filter(n => {
                const dataPort = n.getAttributeValue('dataPort');
                return dataPort.toPath(this._rootGraph) === path;
            });
            if (foundNodes.length > 0) {
                foundNodes.forEach(n => n.setAttribute('defaultValue', defaultValue));
            }
        }
        /**
         * The callback on the viewer change event.
         * @private
         * @param {UIEvents.UIViewerChangeEvent} event - The viewer change event.
         */
        _onViewerChange(event) {
            const viewer = event.getViewer();
            if (this._viewer !== viewer) {
                this._viewer = viewer;
                if (this._isPlaying) {
                    this._initializeGraphScope();
                }
            }
        }
        /**
         * The callback on the execution debug break event.
         * @private
         * @param {ExecutionEvents.DebugBreakEvent} event - The execution debug break event.
         */
        _onDebugBreak(event) {
            this._isBreak = true;
            const blockPath = event.getPath();
            if (blockPath && blockPath !== '') {
                this._initializeBlockScope(blockPath);
                this._initializeLastBlockScope();
            }
            this._breakScopeNode.expand();
        }
        /**
         * The callback on the debug unbreak event.
         * @private
         */
        _onDebugUnbreak() {
            this._resetBreakScope();
            this._isBreak = false;
        }
        /**
         * Formats the data port path for display.
         * @private
         * @param {DataPort} dataPort - The data port.
         * @returns {string} The formatted data port path.
         */
        _formatDataPortPath(dataPort) {
            let formattedPath;
            if (dataPort) {
                formattedPath = dataPort.getName();
                let parentDataPort = dataPort;
                while (parentDataPort.dataPort !== undefined) {
                    parentDataPort = parentDataPort.dataPort;
                    formattedPath = parentDataPort.getName() + '.' + formattedPath;
                }
                let parent = parentDataPort.block;
                if (parent) {
                    const isRootDataPort = parent === this._rootGraph;
                    if (isRootDataPort) {
                        formattedPath = '> ' + formattedPath;
                    }
                    else {
                        formattedPath = UIDGVWatch._getBlockNameWithContextualIndex(parent) + ' > ' + formattedPath;
                        while (parent && parent.graph && parent.graph !== this._rootGraph) {
                            parent = parent.graph;
                            formattedPath = parent.getName() + ' > ' + formattedPath;
                        }
                    }
                }
            }
            return formattedPath;
        }
        /**
         * Gets the block name with its contextual index.
         * @private
         * @static
         * @param {Block} block - The block model.
         * @returns {string} The block name with its contextual index.
         */
        static _getBlockNameWithContextualIndex(block) {
            let name = block.getName();
            if (block.graph) {
                const contextualIndex = block.graph.getBlocks().filter(b => b.getName() === name).indexOf(block);
                if (contextualIndex > 0) {
                    name += ' (' + contextualIndex + ')';
                }
            }
            return name;
        }
    }
    return UIDGVWatch;
});
