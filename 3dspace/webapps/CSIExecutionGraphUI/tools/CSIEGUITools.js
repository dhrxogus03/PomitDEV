/// <amd-module name='DS/CSIExecutionGraphUI/tools/CSIEGUITools'/>
define("DS/CSIExecutionGraphUI/tools/CSIEGUITools", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsTools", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary"], function (require, exports, ModelTools, BlockLibrary, TypeLibrary) {
    "use strict";
    /**
     * This class defines the CSI Execution Graph Editor tools.
     * @class CSIEGETools
     * @alias module:DS/CSIExecGraphEditor/tools/CSIEGETools
     * @private
     */
    class CSIEGUITools {
        /**
         * Ceates an HTML help link from the provided url.
         * @public
         * @static
         * @param {string} url - The url of the help link to open.
         * @returns {string} The HTML help link.
         */
        static createHelpLink(url) {
            return '<a href="' + url + '" target="_blank" class="csiegui-help-link" onClick="event.stopPropagation();">(?)</a>';
        }
        /**
         * Gets the CSI function information.
         * @public
         * @static
         * @param {GraphBlock} graphBlock - The graph block model.
         * @returns {ICSIJSONFunctionInfo} The CSI function information.
         */
        static getCSIFunctionInfo(graphBlock) {
            let jsonInfo;
            if (graphBlock) {
                jsonInfo = { name: 'name', pool: 'Pool', version: 1 };
                const graphBlockName = graphBlock.getName();
                if (graphBlockName) {
                    if (graphBlockName.search('/') > 0) {
                        jsonInfo.name = graphBlockName.split('/')[1];
                        jsonInfo.pool = graphBlockName.split('/')[0];
                    }
                    else {
                        jsonInfo.name = graphBlockName;
                    }
                    if (jsonInfo.name.search('_v') > 0) {
                        jsonInfo.version = parseInt(jsonInfo.name.split('_v')[1]);
                        jsonInfo.name = jsonInfo.name.split('_v')[0];
                    }
                }
            }
            return jsonInfo;
        }
        /**
         * Checks if the given object reference is an instance of one of the provided constructors.
         * @public
         * @static
         * @param {object} reference - The object reference.
         * @param {Constructor[]} constructors - The list of constrcutors.
         * @returns {boolean} True is the object reference is an instance of one of the provided constructors else false.
         */
        static isInstanceOf(reference, constructors) {
            return constructors.some(constructor => reference instanceof constructor);
        }
        /**
         * Checks if the execution graph handles context Id.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles context Id else false.
         */
        static hasExecGraphDebugContextId() {
            let result = false;
            const csiExecutionGraphDebuggerBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphDebugger_v1');
            if (csiExecutionGraphDebuggerBlock !== undefined) {
                const callDataPort = csiExecutionGraphDebuggerBlock.getDataPortByName('Call');
                const callType = callDataPort.getValueType();
                const callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                result = callTypeDescriptor.hasOwnProperty('contextId');
            }
            return result;
        }
        /**
         * Checks if the execution graph handles debug new update breakpoints.
         * This feature has been delivered at the same time as ContextId in the engine.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles debug new update breakpoints else false.
         */
        static hasExecGraphDebugNewUpdateBreakPoints() {
            return this.hasExecGraphDebugContextId();
        }
        /**
         * Checks if the execution graph handles break block data.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles break block data else false.
         */
        static hasExecGraphDebugBreakBlockData() {
            let result = false;
            const csiExecutionGraphDebuggerBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphDebugger_v1');
            if (csiExecutionGraphDebuggerBlock !== undefined) {
                const callDataPort = csiExecutionGraphDebuggerBlock.getDataPortByName('Call');
                const callType = callDataPort.getValueType();
                const callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                result = callTypeDescriptor.hasOwnProperty('breakBlockData');
            }
            return result;
        }
        /**
         * Checks if the execution graph handles block state.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles block state else false.
         */
        static hasExecGraphDebugBlockState() {
            let result = false;
            const csiExecutionGraphFunctionBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphFunction_v1');
            if (csiExecutionGraphFunctionBlock !== undefined) {
                const callDataPort = csiExecutionGraphFunctionBlock.getDataPortByName('Call');
                const callType = callDataPort.getValueType();
                const callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                const debugConfigType = callTypeDescriptor.debugConfig.type;
                const debugConfigTypeDescriptor = TypeLibrary.getGlobalType(debugConfigType);
                result = debugConfigTypeDescriptor.hasOwnProperty('blockState');
            }
            return result;
        }
        /**
         * Checks if the execution graph handles connection state.
         * @public
         * @static
         * @returns {boolean} True if the execution graph handles block state else false.
         */
        static hasExecGraphDebugConnectionState() {
            let result = false;
            const csiExecutionGraphFunctionBlock = BlockLibrary.getBlock('CSIExecutionGraph/csiExecutionGraphFunction_v1');
            if (csiExecutionGraphFunctionBlock !== undefined) {
                const callDataPort = csiExecutionGraphFunctionBlock.getDataPortByName('Call');
                const callType = callDataPort.getValueType();
                const callTypeDescriptor = TypeLibrary.getGlobalType(callType);
                const debugConfigType = callTypeDescriptor.debugConfig.type;
                const debugConfigTypeDescriptor = TypeLibrary.getGlobalType(debugConfigType);
                result = debugConfigTypeDescriptor.hasOwnProperty('connectionState');
            }
            return result;
        }
        /**
         * Convert the provided block path to CSI id.
         * @public
         * @static
         * @param {string} blockPath - The path of the block.
         * @returns {string} The CSI id.
         */
        static pathToCSIid(blockPath) {
            let csiPath = blockPath;
            csiPath = csiPath.replace(ModelTools.rootPath + '.', '');
            csiPath = csiPath.replace(/\.containedGraph/g, '');
            csiPath = csiPath.replace(/\./g, '/');
            return csiPath;
        }
        /**
         * Gets the required pools from the provided CSI JSON graph.
         * @public
         * @static
         * @param {ICSIJSONGraph} json - The CSI JSON graph.
         * @returns {string[]} The required pools.
         */
        static getRequiredPoolsOf(json) {
            let pools = [];
            json.implementation.blocks.forEach(block => {
                const isFunction = block.type === 'Function';
                const isExecutionBlock = block.type === 'ExecutionGraph';
                const isArrayMap = block.type === 'ArrayMap';
                if ((isFunction || isExecutionBlock || isArrayMap) && !block.implementation.nodeIdSelector && block.implementation.pool) {
                    pools.push(block.implementation.pool);
                }
                if (isExecutionBlock || isArrayMap) {
                    pools = pools.concat(this.getRequiredPoolsOf(block));
                }
            });
            json.implementation.nodeIdSelectors.forEach(nodeIdSelector => pools.push(nodeIdSelector.pool));
            pools.filter((value, index, self) => self.indexOf(value) === index);
            return pools;
        }
    }
    CSIEGUITools.AndAndBlockUid = '71ae6e55-9d1b-442b-a8eb-9a52f87850ad';
    CSIEGUITools.OrOrBlockUid = '7c7e3de3-6df4-49d7-ae17-6bb6ab0a9d17';
    return CSIEGUITools;
});
