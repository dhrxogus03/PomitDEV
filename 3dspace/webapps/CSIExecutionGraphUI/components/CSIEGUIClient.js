/// <amd-module name='DS/CSIExecutionGraphUI/components/CSIEGUIClient'/>
define("DS/CSIExecutionGraphUI/components/CSIEGUIClient", ["require", "exports", "DS/CSIExecutionGraphUI/controllers/CSIEGUIExecutionEventController", "DS/CSIExecutionGraphUI/tools/CSIEGUITools", "DS/CSIExecutionGraphUI/typings/ExperienceKernel/CSIEGUIExperienceKernel", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/CSIExecutionGraphUI/typings/CSIIntrospectionWeb/CSIEGUICSIExecutionGraph", "DS/EPSSchematicsCSI/EPSSchematicsCSITools", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPEventServices/EPEventServices", "DS/EPSSchematicEngine/EPSSchematicsExecutionEvents", "DS/EPSSchematicsCSI/typings/CSICommandBinder/EPSSCSICommandBinder", "DS/EPSSchematicsUI/EPSSchematicsUIEnums"], function (require, exports, CSIEGUIExecutionEventController, CSIEGUITools, EK, Tools, CSIExecutionGraph, CSITools, UITools, EventServices, ExecutionEvents, CSI, UIEnums) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a CSI Execution Graph UI Client component.
     * @class CSIEGUIClient
     * @alias module:DS/CSIExecutionGraphUI/components/CSIEGUIClient
     * @private
     */
    class CSIEGUIClient {
        /**
         * @constructor
         * @param {CSIExecutionGraphUIEditor} editor - The CSI Execution Graph UI editor.
         */
        constructor(editor) {
            this._requestedDisconnection = false;
            this._requestedReconnection = false;
            this._nonSelectablePools = [];
            this._kTimeout = 10;
            this._isBlockDebugCallEnabled = false;
            this._executionGraphEditor = editor;
            this._eventController = new CSIEGUIExecutionEventController(editor);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the client.
         * @public
         */
        remove() {
            if (this._eventController) {
                this._eventController.remove();
            }
            this.disconnect();
            this._executionGraphEditor = undefined;
            this._eventController = undefined;
            this._nodeId = undefined;
            this._nodeWebapp = undefined;
            this._poolName = undefined;
            this._inputs = undefined;
            this._outputs = undefined;
            this._progresses = undefined;
            this._breakpoints = undefined;
            this._interruption = undefined;
            this._expectedStatus = undefined;
            this._requestedDisconnection = undefined;
            this._requestedReconnection = undefined;
            this._nonSelectablePools = undefined;
            this._isBlockDebugCallEnabled = undefined;
        }
        /**
         * Checks if the client is connected.
         * @public
         * @returns {boolean} True if the client is connected, false otherwise.
         */
        isConnected() {
            return this._nodeId && this._nodeId.getStatus() === EK.Status.connected;
        }
        /**
         * Connects the client.
         * @public
         * @param {IConnectionOptions} options - The connection options.
         */
        connect(options) {
            var _a, _b;
            this._requestedDisconnection = false;
            this._requestedReconnection = false;
            this._poolName = options.poolName;
            this._resetNodes();
            const poolWebapp = CSI.getPool('executionGraph');
            this._nodeWebapp = poolWebapp.createNode({
                hypervisorUrl: options.hypervisorUrl,
                onError: (_a = options.onError) === null || _a === void 0 ? void 0 : _a.bind(this),
                authentication: (_b = options.authentication) === null || _b === void 0 ? void 0 : _b.bind(this)
            });
            this._nodeWebapp.isPoolSelectable(this._poolName, this._checkPoolSelectability.bind(this));
            const noIdentifier = !options.identifier || options.identifier === 'none' || options.identifier.trim() === '';
            const criterion = noIdentifier ? EK.Criterion.timeout(this._kTimeout) : EK.Criterion.identifier(options.identifier).withTimeout(this._kTimeout);
            this._nodeId = this._nodeWebapp.select(this._poolName, criterion);
            if (options.onStatusChange) {
                this._nodeId.onStatusChange(options.onStatusChange.bind(this));
                options.onStatusChange.call(this, this._nodeId, this._poolName);
            }
        }
        /**
         * Disconnects the client.
         * @public
         */
        disconnect() {
            this._requestedDisconnection = true;
            this.interruptPlay();
            this._resetNodes();
        }
        /**
         * Reconnects the client.
         * @public
         */
        reconnect() {
            this.disconnect();
            this._requestedReconnection = true;
        }
        /**
         * Interrupts the play.
         * @public
         */
        interruptPlay() {
            if (this._interruption) {
                try {
                    this._interruption.interrupt();
                }
                catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            }
            this._eventController.traceStop();
        }
        /**
         * Resets the inputs, outputs and progresses of the client.
         * @public
         */
        resetIO() {
            this._inputs = undefined;
            this._outputs = undefined;
            this._progresses = [];
        }
        /**
         * Continues the execution.
         * @public
         * @param {Function} [onSuccess] - the onSuccess callback.
         */
        continue(onSuccess) {
            const debugParameters = new CSI.Parameters();
            debugParameters.writeString('debugRequest', 'continue');
            this._debuggerCall(debugParameters, onSuccess);
        }
        /**
         * Breaks all the execution.
         * @public
         */
        breakAll() {
            const debugParameters = new CSI.Parameters();
            debugParameters.writeString('debugRequest', 'breakAll');
            this._debuggerCall(debugParameters);
        }
        /**
         * Steps over the execution.
         * @public
         * @param {string} contextPath - The context path.
         */
        stepOver(contextPath) {
            this._stepDebug(contextPath, 'stepOver');
        }
        /**
         * Steps into the execution.
         * @public
         * @param {string} contextPath - The context path.
         */
        stepInto(contextPath) {
            this._stepDebug(contextPath, 'stepInto');
        }
        /**
         * Steps out the execution.
         * @public
         * @param {string} contextPath - The context path.
         */
        stepOut(contextPath) {
            this._stepDebug(contextPath, 'stepOut');
        }
        /**
         * Updates the breakpoints.
         * @public
         * @param {IBreakpoint[]} breakpoints - The list of breakpoints.
         */
        updateBreakPoints(breakpoints) {
            this._breakpoints = breakpoints;
            if (CSIEGUITools.hasExecGraphDebugNewUpdateBreakPoints()) {
                const debugParameters = new CSI.Parameters();
                debugParameters.writeString('debugRequest', 'breakPoints');
                this._addBreakPoints(debugParameters);
                this._debuggerCall(debugParameters);
            }
        }
        /**
         * Updates the break block data.
         * @public
         * @param {IDebugValue[]} breakBlockData - The break block data.
         */
        updateBreakBlockData(breakBlockData) {
            if (CSIEGUITools.hasExecGraphDebugBreakBlockData()) {
                const events = [];
                const debugParameters = new CSI.Parameters();
                debugParameters.writeString('debugRequest', 'breakBlockData');
                let breakBlockParameters;
                const breakBlockInput = new CSI.Parameters();
                breakBlockData.forEach(debugValue => {
                    const dataPort = debugValue.dataPort;
                    const value = debugValue.value;
                    const fromDebug = debugValue.fromDebug;
                    const valueType = dataPort.getValueType();
                    if (fromDebug) {
                        const event = new ExecutionEvents.TraceDataPortEvent();
                        event.path = dataPort.toPath();
                        event.value = value;
                        event.valueType = valueType;
                        event.fromDebug = fromDebug;
                        events.push(event);
                    }
                    const nameWithoutSpaces = dataPort.getName().replace(/\s/g, '');
                    const csiName = nameWithoutSpaces.charAt(0).toLowerCase() + nameWithoutSpaces.slice(1);
                    CSITools.writePropertyParameters(csiName, valueType, value, dataPort.getGraphContext(), breakBlockInput);
                });
                if (breakBlockInput.exists('call')) {
                    breakBlockParameters = breakBlockInput;
                }
                else {
                    breakBlockParameters = new CSI.Parameters();
                    breakBlockParameters.writeParameters('call', 'Parameters', breakBlockInput);
                }
                debugParameters.writeParameters('breakBlockData', 'Parameters', breakBlockParameters);
                const onSuccess = () => events.forEach(event => EventServices.dispatchEvent(event));
                this._debuggerCall(debugParameters, onSuccess);
            }
        }
        /**
         * Launches the play process.
         * @public
         * @param {IPlayOptions} [options] - The play options.
         */
        play(options) {
            var _a, _b;
            this.resetIO();
            this._eventController.clear();
            const inputJSON = this._executionGraphEditor.getJSONFunction(true);
            const parameters = new CSI.Parameters();
            const definition = JSON.parse(inputJSON).implementation.settings;
            const graphDefinition = new CSIExecutionGraph.CSIExecGraphBlock(definition);
            parameters.writeObject('definition', 'CSIExecGraphBlock', graphDefinition);
            this._inputs = this._getInputParameters();
            parameters.writeParameters('inputs', 'Parameters', this._inputs);
            const debugConfig = new CSI.Parameters();
            const currentViewMode = (_b = (_a = this._executionGraphEditor) === null || _a === void 0 ? void 0 : _a._getTabViewSwitcher()) === null || _b === void 0 ? void 0 : _b.getCurrentViewMode();
            if (currentViewMode === UIEnums.EViewMode.eDebug) {
                const breakOnStart = this._executionGraphEditor.getPlayPanel().getBreakOnStartToggleCheckedState();
                debugConfig.writeBool('breakOnStart', breakOnStart);
                this._addBreakPoints(debugConfig);
                debugConfig.writeBool('blockDebugCall', this._isBlockDebugCallEnabled);
            }
            if (CSIEGUITools.hasExecGraphDebugBlockState()) {
                debugConfig.writeBool('blockState', true);
            }
            if (CSIEGUITools.hasExecGraphDebugConnectionState()) {
                debugConfig.writeBool('connectionState', true);
            }
            debugConfig.writeBool('progressEvents', true);
            parameters.writeObject('debugConfig', 'Parameters', debugConfig);
            this._interruption = new EK.Interruption;
            this._getRequiredPools().forEach(poolName => {
                this._nodeWebapp.isPoolSelectable(poolName, this._checkPoolSelectability.bind(this));
            });
            this._nodeWebapp.call({
                destinationNodeId: this._nodeId,
                name: 'csiExecutionGraphFunction',
                version: 1,
                parameters: parameters,
                onSuccess: param => {
                    this._expectedStatus = 'success';
                    this._outputs = param;
                    this._updateTempRecordInfo();
                    this._eventController.executionGraphDataEvent('success', param.toJSObject());
                    this._eventController.clear();
                    if (options === null || options === void 0 ? void 0 : options.onSuccess) {
                        options.onSuccess.call(this, param);
                    }
                },
                onError: param => {
                    this._expectedStatus = 'error';
                    this._outputs = param;
                    this._updateTempRecordInfo();
                    this._eventController.executionGraphDataEvent('error', param.toJSObject());
                    this._eventController.clear();
                    if (options === null || options === void 0 ? void 0 : options.onError) {
                        options.onError.call(this, param);
                    }
                },
                onProgress: param => {
                    const objParam = param.toJSObject();
                    if (objParam && objParam.port && objParam.port.name.startsWith('debug')) {
                        this._eventController.debugEvent(param);
                    }
                    else {
                        this._progresses.push(param);
                        if (options === null || options === void 0 ? void 0 : options.onProgress) {
                            options.onProgress.call(this, param);
                        }
                    }
                    this._updateTempRecordInfo();
                }
            }, this._interruption);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      ____  ____   ___ _____ _____ ____ _____ _____ ____                        //
        //                     |  _ \|  _ \ / _ \_   _| ____/ ___|_   _| ____|  _ \                       //
        //                     | |_) | |_) | | | || | |  _|| |     | | |  _| | | | |                      //
        //                     |  __/|  _ <| |_| || | | |__| |___  | | | |___| |_| |                      //
        //                     |_|   |_| \_\\___/ |_| |_____\____| |_| |_____|____/                       //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Resets the nodeId and the nodeWebapp.
         * @protected
         */
        _resetNodes() {
            if (this._nodeId) {
                this._nodeId.close();
                this._nodeId = undefined;
            }
            if (this._nodeWebapp) {
                this._nodeWebapp.stop();
                this._nodeWebapp = undefined;
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Abstract step debug.
         * @private
         * @param {string} contextPath - The context path.
         * @param {string} stepType - The step type.
         */
        _stepDebug(contextPath, stepType) {
            const parameters = new CSI.Parameters();
            parameters.writeString('debugRequest', stepType);
            if (CSIEGUITools.hasExecGraphDebugContextId()) {
                if (contextPath !== Tools.rootPath) {
                    let contextId = contextPath.replace(Tools.rootPath + '.', '');
                    contextId = contextId.replace(/\.containedGraph/g, '');
                    contextId = contextId.replace(/\./g, '/');
                    parameters.writeString('contextId', contextId);
                }
            }
            this._debuggerCall(parameters);
        }
        /**
         * Gets the inputs object.
         * @private
         * @returns {object} The inputs object.
         */
        _getInputs() {
            let inputs;
            if (this._inputs && this._inputs.exportToString) {
                inputs = JSON.parse(this._inputs.exportToString());
            }
            return inputs;
        }
        /**
         * Gets the outputs object.
         * @private
         * @returns {object} The outputs object.
         */
        _getOutputs() {
            let outputs;
            if (this._outputs && this._outputs.exportToString) {
                outputs = JSON.parse(this._outputs.exportToString());
            }
            return outputs;
        }
        /**
         * Gets the progresses object.
         * @private
         * @returns {object[]} The progresses object.
         */
        _getProgresses() {
            let progresses;
            if (this._progresses && this._progresses.length > 0) {
                progresses = this._progresses.map(p => JSON.parse(p.exportToString()));
            }
            return progresses;
        }
        /**
         * Updates the temporary record info.
         * @private
         */
        _updateTempRecordInfo() {
            const inputs = this._getInputs();
            const outputs = this._getOutputs();
            const progresses = this._getProgresses();
            this._executionGraphEditor._setTempRecordInfo(this._poolName, this._expectedStatus, inputs, outputs, progresses);
        }
        /**
         * Add breakpoints.
         * @private
         * @param {CSI.Parameters} parameters - The CSI parameters.
         */
        _addBreakPoints(parameters) {
            if (this._breakpoints) {
                const parametersBreakPoints = [];
                this._breakpoints.forEach(bp => {
                    const pbp = new CSI.Parameters();
                    pbp.writeString('blockId', CSIEGUITools.pathToCSIid(bp.path));
                    parametersBreakPoints.push(pbp);
                });
                parameters.writeParametersArray('breakPoints', 'Parameters', parametersBreakPoints);
            }
        }
        /**
         * Calls the debugger.
         * @private
         * @param {CSI.Parameters} parameters - The CSI parameters.
         * @param {Function} [onSuccess] - the onSuccess callback.
         */
        _debuggerCall(parameters, onSuccess) {
            const debugId = this._eventController.getDebugId();
            if (debugId !== undefined) {
                parameters.writeUint32('debugId', debugId);
                if (!CSIEGUITools.hasExecGraphDebugNewUpdateBreakPoints()) {
                    this._addBreakPoints(parameters);
                }
                if (this._nodeWebapp !== undefined) {
                    this._nodeWebapp.call({
                        destinationNodeId: this._nodeId,
                        name: 'csiExecutionGraphDebugger',
                        version: 1,
                        onSuccess: onSuccess,
                        parameters: parameters
                    });
                }
            }
        }
        /**
         * Checks the pool selectability.
         * @private
         * @param {string} poolName - The pool name.
         * @param {boolean} isSelectable - True if selectable else false.
         */
        _checkPoolSelectability(poolName, isSelectable) {
            if (!isSelectable && this._nonSelectablePools.indexOf(poolName) === -1) {
                this._nonSelectablePools.push(poolName);
                this._executionGraphEditor.displayNotification({
                    level: 'warning',
                    title: poolName,
                    subtitle: 'non-provisionable',
                    message: 'The Play can be deadlocked. Check your server Hypervisor settings.'
                });
            }
        }
        /**
         * Gets the input parameters.
         * @private
         * @returns {CSI.Parameters} The input parameters.
         */
        _getInputParameters() {
            const graphModel = this._executionGraphEditor.getGraphModel();
            const callDataPort = graphModel.getDataPortByName('Call');
            let inputParameters;
            try {
                // we use also the defaultValue because we don't send the complete function declaration of the graph
                const inputValue = UITools.mergeObject(callDataPort.getDefaultValue(), callDataPort.getTestValues()[0], false);
                inputParameters = CSITools.createParameters(callDataPort.getValueType(), inputValue, graphModel);
            }
            catch (error) {
                inputParameters = CSI.createParameters();
            }
            return inputParameters;
        }
        /**
         * Gets the list of required pools.
         * @private
         * @returns {string[]} The list of required pools.
         */
        _getRequiredPools() {
            const jsonFct = this._executionGraphEditor.getJSONFunction(true);
            const json = JSON.parse(jsonFct);
            const pools = CSIEGUITools.getRequiredPoolsOf(json.implementation.settings);
            pools.push(this._poolName);
            pools.filter((pool, index) => pools.indexOf(pool) === index);
            return pools;
        }
        /**
         * (DO NOT USE) Enables the block debug call.
         * @private
         * @ignore
         * @param {boolean} isEnabled - true to enable block debug call else false.
         */
        _setBlockDebugCall(isEnabled) {
            this._isBlockDebugCallEnabled = isEnabled;
        }
    }
    return CSIEGUIClient;
});
