define("DS/DELMCBUserDefAdmin/DELMCBUserDefAdmin_en",{});define("DS/DELMCBUserDefAdmin/assets/nls/Applist",{apps:{Default:"Default (Last Used)",AdditivePartPreparation:"Additive Part Preparation",AssemblyDefinition:"Assembly Definition",AssemblyEvaluation:"Assembly Evaluation",AssemblyExperience:"Assembly Experience",AssemblyPathOptimization:"Assembly Path Optimization",ConstructionPlanning:"Construction Planning",CuttingToolsBuilder:"Cutting Tools Builder",DrillingRiveting:"Drilling Riveting",EquipmentAllocation:"Equipment Allocation",EquipmentSimulation:"Equipment Simulation",EquipmentVirtualCommissioning:"Equipment Virtual Commissioning",ErgonomicWorkplaceDesign:"Ergonomic Workplace Design",ErgonomicsatWork:"Ergonomics at Work",FabricatedStepDefinition:"Fabricated Step Definition",FactoryFlowSimulation:"Factory Flow Simulation",HeavyIndustryFluidicFabrication:"HeavyIndustry Fluidic Fabrication",HeavyIndustryManufacturing:"Heavy Industry Manufacturing",HeavyIndustryProcessPlanning:"Heavy Industry ProcessPlanning",HeavyIndustryStructureFabrication:"Heavy Industry Structure Fabrication",MachiningValidation:"Machining Validation",ManufacturedItemDefinition:"Manufactured Item Definition",ManufacturedItemDefinitionwithFasteners:"Manufactured Item Definition with Fasteners",MaterialDepositionFabrication:"Material Deposition Fabrication",MillingMachining:"Milling Machining",MillTurnMachining:"Mill Turn Machining",MultiaxisMachining:"Multiaxis Machining",PlanningStructure:"Planning Structure",PlantLayoutDesign:"Plant Layout Design",PrismaticTurningMachining:"Prismatic Turning Machining",ProcessFlowSimulation:"Process Flow Simulation",ProcessPlanning:"Process Planning",ProcessPlanningwithFasteners:"Process Planning with Fasteners",RobotArcSimulation:"Robot Arc Simulation",RobotOptimization:"Robot Optimization",RobotProgramming:"Robot Programming",RobotSimulation:"Robot Simulation",RobotSpotProgramming:"Robot Spot Programming",RobotSpotSimulation:"Robot Spot Simulation",RobotSurfaceSimulation:"Robot Surface Simulation",RobotVirtualCommissioning:"Robot Virtual Commissioning",RobotVirtualCommissioningReview:"Robot Virtual Commissioning Review",ServiceProcessStructure:"Service Process Structure",SimulationExperience:"Simulation Experience",TimeMotionStudy:"Time Motion Study",VirtualCommissioningReview:"Virtual Commissioning Review",WireEDMMachining:"Wire EDM Machining",WorkInstructions:"Work Instructions",WorkPlanPublication:"WorkPlan Publication"}});define("DS/DELMCBUserDefAdmin/assets/nls/DELMCBUserDefAdmin",{"title.procedureID":"Procedure ID","title.procedureName":"Procedure Name","title.procedureDesc":"Description","title.procedureVisibility":"Procedure Visibility","title.procedureAction":"Applicability","title.procedureNodeType":"Input Object Type","title.openinapp":"Open in App","title.procedureModificationDate":"Last Modification Date","title.step":"Step","title.param1":"Parameter #1","title.param2":"Parameter #2","title.param3":"Parameter #3","title.editProcedure":"Edit Procedure","button.cancel":"Cancel","button.deploy":"Deploy","command.createProc":"Create New Procedure","command.deleteProc":"Delete Selected Procedure","command.openProc":"Open Selected Procedure","msg.deploySuccess":"{procx} has been successfully deployed","msg.deploySuccessTitle":"Deployment successful","msg.deployFailTitle":"Deployment failed","msg.deleteSuccess":"{procx} has been successfully deleted","msg.deleteSuccessTitle":"Deletion successful","msg.deleteFailTitle":"Deletion failed","msg.missingProcProperties":"Fill all missing properties for the Procedure","error.fileNotSelected":"File not selected","error.invalidInput":"Invalid Input","error.procedureID":"Procedure ID must be in [procedure_name].[major_version_number].[minor_version_number].[patch_number] format","error.validationFailed":"Error","error.invalidInputs":"Invalid Input(s)","error.ProcActionValueNull":"No Applicability value is selected","error.MinimumNbStep":"Procedure should have a minimum of 2 steps","visible.inwork":"In-work","visible.production":"Production","visible.obsolete":"Obsolete","action.udo":"User-Defined Open","action.udo.shortHelp":"Enable the procedure for User-Defined Open command","action.ude":"User-Defined Explore","action.ude.shortHelp":"Enable the procedure for User-Defined Explore command","action.udr":"User-Defined Revision","action.udr.shortHelp":"Enable the procedure for User-Defined Revision command","nodetype.any":"Default (Any)","nodetype.product":"EBOM","nodetype.item":"MBOM","nodetype.workplan":"Workplan","nodetype.system":"System","nodetype.resource":"Resource","delete.title":"Confirm Deletion","delete.message":"{procx} will be permanently deleted. This cannot be undone. Are you sure?","menu.deleterow":"Delete Row","preferences.securityContext":"Credentials","preferences.tenant":"3DEXPERIENCE Platform","primitive.expandEBOM":"Expand EBOM","primitive.expandEBOM.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.expandEBOM.tooltip2":"An integer that defines the expansion depth, that is, the number of levels to expand. If set to 0, all levels are expanded","primitive.expandMBOM":"Expand MBOM","primitive.expandMBOM.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.expandMBOM.tooltip2":"An integer that defines the expansion depth, that is, the number of levels to expand. If set to 0, all levels are expanded","primitive.expandSystem":"Expand System / Workplan","primitive.expandSystem.tooltip1":"A Navigation Set that contains the Workplan or System occurrences","primitive.expandSystem.tooltip2":"An integer that defines the expansion depth, that is, the number of levels to expand. If set to 0, all levels are expanded","primitive.expandResource":"Expand Resource","primitive.expandResource.tooltip1":"A Navigation Set that contains the Resource occurrences","primitive.expandResource.tooltip2":"An integer that defines the expansion depth, that is, the number of levels to expand. If set to 0, all levels are expanded","primitive.expandMultiRoot":"Expand Multi-Root","primitive.expandMultiRoot.tooltip1":"Expand Multi-Root","primitive.expandMultiRoot.tooltip2":"Expand Multi-Root","primitive.keepRoot":"Keep Root","primitive.keepRoot.tooltip1":"A Navigation Set that contains the occurrences from which user wants to extract and keep only the root entity","primitive.I3DexpandEBOM":"Expand EBOM using 3D Index","primitive.I3DexpandEBOM.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.I3DexpandEBOM.tooltip2":"An integer that defines the expansion depth, that is, the number of levels to expand. If set to 0, all levels are expanded","primitive.I3DexpandMBOM":"Expand MBOM using 3D Index","primitive.I3DexpandMBOM.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.I3DexpandMBOM.tooltip2":"An integer that defines the expansion depth, that is, the number of levels to expand. If set to 0, all levels are expanded","primitive.I3DRetrieveContext":"Retrieve Context EBOM and MBOM using 3D Index","primitive.I3DRetrieveContext.tooltip1":"A Navigation Set that contains the EBOM occurrences to expand","primitive.I3DRetrieveContext.tooltip2":"A Navigation Set that contains the MBOM occurrences scoped with an EBOM (usually the root MBOM)","primitive.I3DRetrieveContext.tooltip3":"A Navigation Set that contains the selected MBOM (usually the install MBOM)","primitive.navigateFromMBOMToEBOM":"Navigate from MBOM to EBOM","primitive.navigateFromMBOMToEBOM.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.navigateFromMBOMToEBOM.tooltip2":"A Boolean array that specifies the three navigation modes: \n iRef_Ref: If true, navigates on a reference-reference pattern \n iRef_OccRef: If true, navigates on a reference-occurrence-reference pattern \n iInst_Occ: If true, navigates on an instance-occurence pattern \n\n For example: [true, true, true]","primitive.navigateFromEBOMToMBOM":"Navigate from EBOM to MBOM","primitive.navigateFromEBOMToMBOM.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.navigateFromEBOMToMBOM.tooltip2":"A Boolean array that specifies the three navigation modes: \n iRef_Ref: If true, navigates on a reference-reference pattern \n iRef_OccRef: If true, navigates on a reference-occurrence-reference pattern \n iInst_Occ: If true, navigates on an instance-occurence pattern \n\n For example: [true, true, true]","primitive.fastenersAnalysisBothSides":"Fasteners Analysis Both Sides","primitive.fastenersAnalysisBothSides.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.fastenersAnalysisBothSidesLegacy":"Fasteners Analysis Both Sides - Legacy","primitive.fastenersAnalysisBothSidesLegacy.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.getEBOMThroughMBOMAssignmentFilter":"Retrieve EBOMs from MBOMs using Assignment Filter","primitive.getEBOMThroughMBOMAssignmentFilter.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.getEBOMThroughMBOMAssignmentFilter.tooltip2":"A Boolean that defines the navigation mode: \n If true, navigates through Physical IDs \n If false, navigates through Logical IDs","primitive.getMBOMPredecessors":"Retrieve MBOM Predecessors","primitive.getMBOMPredecessors.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.getMBOMPredecessors.tooltip2":"An integer that defines the number of levels of predecessors to retrieve \n If set to 0, all levels are retrieved","primitive.getResultingProductFromMBOM":"Retrieve Resulting Products from MBOM","primitive.getResultingProductFromMBOM.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.navigateFromWorkPlanToMBOM":"Navigate from Workplan to MBOM","primitive.navigateFromWorkPlanToMBOM.tooltip1":"A Navigation Set that contains the Workplan occurrences","primitive.navigateFromWorkPlanToMBOM.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.navigateFromMBOMToWorkPlan":"Navigate from MBOM to Workplan","primitive.navigateFromMBOMToWorkPlan.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.navigateFromMBOMToWorkPlan.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.navigateFromProcessToMBOM":"Navigate from System / Workplan to MBOM","primitive.navigateFromProcessToMBOM.tooltip1":"A Navigation Set that contains the System occurrences","primitive.navigateFromProcessToMBOM.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.navigateFromMBOMToSystem":"Navigate from MBOM to System","primitive.navigateFromMBOMToSystem.tooltip1":"A Navigation Set that contains the MBOM occurrences","primitive.navigateFromMBOMToSystem.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.I3DnavigateFromProcessToMBOM":"Navigate from System / Workplan to MBOM using 3D Index","primitive.I3DnavigateFromProcessToMBOM.tooltip1":"A Navigation Set that contains the System / Workplan occurrences","primitive.I3DnavigateFromProcessToMBOM.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.navigateFromSystemToWorkPlan":"Navigate from System to Workplan","primitive.navigateFromSystemToWorkPlan.tooltip1":"A Navigation Set that contains the System occurrences","primitive.navigateFromSystemToWorkPlan.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.navigateFromWorkPlanToSystem":"Navigate from Workplan to System","primitive.navigateFromWorkPlanToSystem.tooltip1":"A Navigation Set that contains the Workplan occurrences","primitive.navigateFromWorkPlanToSystem.tooltip2":"A Boolean array that specifies the two navigation modes \n iRef_Ref: If true, navigates on a reference-reference pattern \n iOcc_Occ: If true, navigates on an occurrence-occurence pattern \n For Example: [true, true]","primitive.navigateFromProcessToResource":"Navigate from System to Resource","primitive.navigateFromProcessToResource.tooltip1":"A Navigation Set that contains the System occurrences","primitive.navigateFromProcessToResource.tooltip2":'A Boolean array that specifies the four navigation modes:\n iRef_Ref: If true, navigates on a reference-reference pattern for the scope\n iOcc_Occ_With: If true, navigates on an occurrence-occurence pattern for the "with" resources only\n iOcc_Occ_Where: If true, navigates on an occurrence-occurence pattern for the "where" resources only\n iOcc_Occ_Who: If true, navigates on an occurrence-port-occurence pattern for the "who" resources only',"primitive.navigateFromResourceToSystem":"Navigate from Resource to System","primitive.navigateFromResourceToSystem.tooltip1":"A Navigation Set that contains the Resource occurrences","primitive.navigateFromResourceToSystem.tooltip2":'A Boolean array that specifies the four navigation modes:\n iRef_Ref: If true, navigates on a reference-reference pattern for the scope\n iOcc_Occ_With: If true, navigates on an occurrence-occurence pattern for the "with" resources only\n iOcc_Occ_Where: If true, navigates on an occurrence-occurence pattern for the "where" resources only\n iOcc_Occ_Who: If true, navigates on an occurrence-port-occurence pattern for the "who" resources only',"primitive.navigateFromResourceToWorkplan":"Navigate from Resource to Workplan","primitive.navigateFromResourceToWorkplan.tooltip1":"A Navigation Set that contains the Resource occurrences","primitive.navigateFromResourceToWorkplan.tooltip2":'A Boolean array that specifies the four navigation modes:\n iRef_Ref: If true, navigates on a reference-reference pattern for the scope\n iOcc_Occ_With: If true, navigates on an occurrence-occurence pattern for the "with" resources only\n iOcc_Occ_Where: If true, navigates on an occurrence-occurence pattern for the "where" resources only\n iOcc_Occ_Who: If true, navigates on an occurrence-port-occurence pattern for the "who" resources only',"primitive.getAllProcessPredecessors":"Retrieve all Predecessors","primitive.getAllProcessPredecessors.tooltip1":"A Navigation Set that contains the System, Workplan, or Operation occurrences","primitive.getCapableRscLinkInContextFromProcess":"Navigate from System to Capable Resource in context","primitive.getCapableRscLinkInContextFromProcess.tooltip1":"A Navigation Set that contains the System occurrences","primitive.getCapableRscLinkInContextFromProcess.tooltip2":"A Boolean array that specifies the two navigation modes:\n iContext: If true, navigates the scope link to retrieve the capable resource in context\n iLink: If true, navigates the link to retrieve capable resource in context","primitive.getAssetRscLinkFromWorkplan":"Navigate from System to Resource asset reference occurrences","primitive.getAssetRscLinkFromWorkplan.tooltip1":"A Navigation Set that contains the System occurrences","primitive.getAssetRscLinkFromWorkplan.tooltip2":"A Boolean array that specifies the two navigation modes:\n iContext: If true, navigates the scope link to retrieve the asset structure\n iLink: If true, navigates the link to retrieve the preassigned work center","primitive.getCapableRscLinkFromProcess":"Navigate from System occurrence to Capable Resource reference","primitive.getCapableRscLinkFromProcess.tooltip1":"A Navigation Set that contains the System occurrences","primitive.getCapableRscLinkFromProcess.tooltip2":"A Boolean array that specifies the three navigation modes:\n iContext: navigates the scope link to retrieve the capable Resource structure\n iPrimLink: If true, navigates the link to retrieve the primary capable Resource\n iSecLink: If true, navigates the link to retrieve the secondary capable Resource","primitive.ModifyContextWithProximityVolume":"Modify Context with Proximity Volume","primitive.ModifyContextWithProximityVolume.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.ModifyContextWithProximityVolume.tooltip2":"The offset in millimeters","primitive.ModifyContextWithProximityVolume.tooltip3":"eReplace is the only available value for this parameter and it replaces the context volume by the proximity volume","primitive.ModifyContextWithBoundingBoxVolume":"Modify Context with Bounding Box Volume","primitive.ModifyContextWithBoundingBoxVolume.tooltip1":"A Navigation Set that contains the EBOM occurrences","primitive.ModifyContextWithBoundingBoxVolume.tooltip2":"The offset in millimeters","primitive.ModifyContextWithBoundingBoxVolume.tooltip3":"eReplace is the only available value for this parameter and it replaces the context volume by the proximity volume","primitive.getFirstUpperScopeFromMBOMToEBOM":"Retrieve first upper scope from MBOM to EBOM","primitive.getFirstUpperScopeFromMBOMToEBOM.tooltip1":"A Navigation Set that contains MBOM occurrence","primitive.compact":"Compact Navigation Set","primitive.compact.tooltip1":"A Navigation Set that contains the occurrences to filter","primitive.merge":"Merge Navigation Set","primitive.merge.tooltip1":"The Navigation Set to be inserted in the one output from the previous primitive","primitive.cutLeafOccurrences":"Cut Leaf Occurences","primitive.cutLeafOccurrences.tooltip1":"A Navigation Set that contains the occurrences to filter","primitive.removeOccurrences":"Remove Occurrences","primitive.removeOccurrences.tooltip1":"A Navigation Set that contains the occurrences to filter","primitive.removeOccurrences.tooltip2":"The WhereClause to apply to the references","primitive.insert":"Insert Navigation Set","primitive.insert.tooltip1":"The Navigation Set (containing a filter) where the occurrence should be inserted","primitive.insert.tooltip2":"The Navigation Set of occurrences to insert","primitive.filterOnLeaves":"Filter On Leaves","primitive.filterOnLeaves.tooltip1":"A Navigation Set that contains the occurrences to filter","primitive.filterOnLeaves.tooltip2":"The WhereClause to apply to the final references (leaves)","primitive.cutOccurrences":"Cut Occurences","primitive.cutOccurrences.tooltip1":"A Navigation Set that contains the occurrences to filter","primitive.cutOccurrences.tooltip2":"The WhereClause to apply to the references","primitive.Open":"Open","primitive.Open.tooltip1":"Navigation sets to Open","primitive.stopAt":"Stop At","primitive.stopAt.tooltip1":"Navigation set whose parents should not be Revised by User Defined Revision","primitive.tooltip.unused":"Not Used","command.udo":"UDO","command.ude":"UDE","command.udr":"UDR"});