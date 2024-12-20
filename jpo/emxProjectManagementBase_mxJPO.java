/* emxProjectManagementBase.java

   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of
   MatrixOne, Inc.  Copyright notice is precautionary only and does
   not evidence any actual or intended publication of such program.

   static const char RCSID[] = $Id: ${CLASSNAME}.java.rca 1.16.2.2 Thu Dec  4 07:55:18 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.16.2.1 Thu Dec  4 01:53:26 2008 ds-ss Experimental ${CLASSNAME}.java.rca 1.16 Tue Oct 28 22:59:43 2008 przemek Experimental przemek $
*/

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import matrix.db.BusinessObject;
import matrix.db.BusinessObjectWithSelect;
import matrix.db.BusinessObjectWithSelectItr;
import matrix.db.BusinessObjectWithSelectList;
import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.Pattern;
import matrix.util.StringList;

import com.matrixone.apps.common.ProjectManagement;
import com.matrixone.apps.common.WorkspaceVault;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.domain.util.mxType;
import com.matrixone.apps.program.Assessment;
import com.matrixone.apps.program.Experiment;
import com.matrixone.apps.program.FinancialItem;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProjectSpace;
import com.matrixone.apps.program.Quality;
import com.matrixone.apps.program.ResourcePlanTemplate;
import com.matrixone.apps.program.Risk;
import com.matrixone.apps.program.Task;
import com.matrixone.apps.program.ProjectBaseline;
import com.matrixone.apps.program.ProgramCentralUtil;

import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.framework.ui.UIUtil;

/**
 * The <code>emxProjectManagementBase</code> class represents the Project Management
 * JPO functionality for the AEF type.
 *
 * @version AEF 9.5.2.0 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxProjectManagementBase_mxJPO extends ProjectManagement
{

    /**
    *used in triggerPromoteAction and triggerDemoteAction functions.
    */
    boolean doNotRecurse = false;

    /**
  * Alias used for to and from parent ids.
  */

    protected static final String SELECT_PARENT_ID =
            "to[" + RELATIONSHIP_SUBTASK + "].from.id";

    /**
     * Constructs a new emxProjectManagement JPO object.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *         String - containing the id
     * @throws Exception if the operation fails
     * @since AEF 9.5.2.0
     */
    public emxProjectManagementBase_mxJPO (Context context, String[] args)
        throws Exception
    {
        // Call the super constructor
        super();
        if (args != null && args.length > 0)
        {
            setId(args[0]);
        }
    }

    /**
     * Constructs a new emxProjectManagement JPO object.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        id - containing String as business object id
     * @throws Exception if the operation fails
     * @since AEF 9.5.2.0
     */
    public emxProjectManagementBase_mxJPO (String id)
        throws Exception
    {
        // Call the super constructor
        super(id);
    }

    /**
    * Delete override method for Project Management types
    * Deletes the Project/Task related structure
    *
    * Deletes Assessment, Risk, Finacial Items, Tasks, etc.
    *
    * @param context the eMatrix <code>Context</code> object
    * @param args holds the following input arguments:
    *        String containing the from object id
    * @return int based on success or failure
    * @throws Exception if operation fails
    * @since AEF 9.5.2.0
    */
    public int triggerDeleteOverride(Context context,String[] args) throws Exception {

        final int DO_NOT_REPLACE_EVENT = 0;
        final int REPLACE_EVENT = 1;
        int triggerAction = DO_NOT_REPLACE_EVENT;
        boolean isPushedContext = false; 
        String strErrorMsg = ProgramCentralConstants.EMPTY_STRING;
        try
        {
            // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::]
            String sUserAgent = PropertyUtil.getSchemaProperty(context, "person_UserAgent");

            //The first time this function is called this value will be false
            //second time around this will be true
            //Instead of recurssing through each of the subtasks the program
            //gets all the tasks in one call and deletes all the tasks
            //thereon if the sub-tasks call this function it returns without
            //doing anything
            //**Start**

            //Modified:27-Dec-2010:s4e:R211 PRG:IR-068141V6R2012 
            //Moved this code here because this code needs to get called recursively for Phase Delete.

            String objectId = args[0];
            ProjectSpace project = new ProjectSpace(objectId);

            String SELECT_PROJECT_BASELINE_ID = "from["+ProgramCentralConstants.RELATIONSHIP_PROJECT_BASELINE+"].to.id";
            String SELECT_EXPERIMENT_ID =  "from["+ProgramCentralConstants.RELATIONSHIP_EXPERIMENT+"].to.id";
            StringList multiValueSelectables = new StringList(2);
			multiValueSelectables.add(SELECT_PROJECT_BASELINE_ID);
			multiValueSelectables.add(SELECT_EXPERIMENT_ID);

            StringList selectables = new StringList(9);
            selectables.add(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
            selectables.add(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
            selectables.add(SELECT_OWNER);
            selectables.add("to["+DomainConstants.RELATIONSHIP_SUBTASK+"].from.current.access[modify]");
            selectables.add("from[" + RELATIONSHIP_BASELINE_LOG + "].to.id");
            selectables.add("to[" + RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.id");
			
			selectables.add("physicalId");
            
            selectables.add(SELECT_PROJECT_BASELINE_ID);
            selectables.add(SELECT_EXPERIMENT_ID);

            Map typeInfo = project.getInfo(context, selectables,multiValueSelectables);

            String isKindOfTaskManagement = (String) typeInfo.get(ProgramCentralConstants.SELECT_KINDOF_TASKMANAGEMENT);
            String isKindOfProject = (String) typeInfo.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);
            String ownerName  = (String) typeInfo.get(SELECT_OWNER);
            String hasModifyOnParent  = (String) typeInfo.get("to["+DomainConstants.RELATIONSHIP_SUBTASK+"].from.current.access[modify]");
            String logged_in_user = (String)context.getUser();
            String baselineLogId = (String)typeInfo.get("from[" + RELATIONSHIP_BASELINE_LOG + "].to.id");
            String accessListId = (String)typeInfo.get("to[" + RELATIONSHIP_PROJECT_ACCESS_LIST + "].from.id");
			
			String strPhysicalId = (String)typeInfo.get("physicalid");
			
            StringList projectBaselineIdList = (StringList)typeInfo.get(SELECT_PROJECT_BASELINE_ID);
            StringList experimentProjectIdList = (StringList)typeInfo.get(SELECT_EXPERIMENT_ID);

            boolean haveAccesToDelete = true;

            //If logged in user is not owner of the project then don't allow to delete..
            if(("TRUE".equalsIgnoreCase(isKindOfProject) && !logged_in_user.equalsIgnoreCase(ownerName))){
                haveAccesToDelete = false;
            }
            //If logged in user have modify access on parent task/Project then allow to delete.
            if("TRUE".equalsIgnoreCase(isKindOfTaskManagement) && !logged_in_user.equalsIgnoreCase(ownerName) && "FALSE".equalsIgnoreCase(hasModifyOnParent)){
                haveAccesToDelete = false;
            }
            
            if(!haveAccesToDelete && !"User Agent".equalsIgnoreCase(logged_in_user)){
                throw new Exception(EnoviaResourceBundle.getProperty(context,"ProgramCentral","emxProgramCentral.Project.NoRightsToDeleteTask",context.getSession().getLanguage()));
                    }
            //Added:4-Jun-2010:di1:R210 PRG:Advanced Resource Planning

            if("TRUE".equalsIgnoreCase(isKindOfProject)){

                final String RESOURCE_REQUEST_PHASE = "to["+ResourcePlanTemplate.RELATIONSHIP_PHASE_FTE+"].from."+SELECT_ID;
                final String LIST_OF_CONNECTED_PHASE_IDS = "from["+ResourcePlanTemplate.RELATIONSHIP_PHASE_FTE+"].to."+SELECT_ID;
                StringList resourceRequestList = project.getInfoList(context, RESOURCE_REQUEST_PHASE);

                if(null!=resourceRequestList && resourceRequestList.size()>0)
                {
                    String[] reourceRequestIdArr=new String[resourceRequestList.size()];                    
                    resourceRequestList.copyInto(reourceRequestIdArr) ;                 
                    StringList busSelect=new StringList(LIST_OF_CONNECTED_PHASE_IDS);
                    StringList slToDeleteResourceReq=new StringList();
                    BusinessObjectWithSelectList resourceRequestObjWithSelectList = BusinessObject.getSelectBusinessObjectData(context, reourceRequestIdArr, busSelect);
                    BusinessObjectWithSelect bows = null;
                    for(BusinessObjectWithSelectItr itr= new BusinessObjectWithSelectItr(resourceRequestObjWithSelectList); itr.next();)
                    {
                        bows = itr.obj();               
                        StringList slPhaseIds = bows.getSelectDataList(LIST_OF_CONNECTED_PHASE_IDS);
                        if(null!=slPhaseIds && slPhaseIds.size()==1)
                        {   
                            slToDeleteResourceReq.add(bows.getObjectId());
                        }
                    }
                    if(null!=resourceRequestList && slToDeleteResourceReq.size()>0)
                    {
                        reourceRequestIdArr=new String[slToDeleteResourceReq.size()];
                        slToDeleteResourceReq.copyInto(reourceRequestIdArr);
                        isPushedContext = false;
                        ContextUtil.pushContext(context, sUserAgent, DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING); // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::Start] 
                        isPushedContext = true;
                        try
                        {
                            DomainObject.deleteObjects(context, reourceRequestIdArr);
                        }
                        finally
                        {
                            if(isPushedContext)
                            {
                                ContextUtil.popContext(context);
                            }
                        }
                    }
                }
            }
            //End Added:4-Jun-2010:di1:R210 PRG:Advanced Resource Planning
            com.matrixone.apps.program.Risk risk = new Risk();
            if("TRUE".equalsIgnoreCase(isKindOfTaskManagement)) {
                //disconnect or delete the risks associated with this project
            	StringList busSelects = new StringList();
                busSelects.add(risk.SELECT_ID);
                busSelects.add(risk.SELECT_RPN_ID);
                MapList riskList = risk.getRisks(context, project,busSelects, null, null);
                int riskListSize=riskList.size();
                String connectedRisk[] = new String[riskListSize];
                int index=0;

                if (riskListSize > 0)
                {
                    Iterator itr1 = riskList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String riskId = (String) map.get(risk.SELECT_ID);
                        connectedRisk[index]=riskId;
                        index++;
                    }
                }
                if(riskListSize>0)
                {
                    Risk.removeOrDeleteRisksfromParent(context, objectId, connectedRisk);
                }
            }

            //Modified:27-Dec-2010:s4e:R211 PRG:IR-068141V6R2012
            //**End**
            if (doNotRecurse)
            {
                //function called recursively return without doing anything
                return 0;
            }

            doNotRecurse = true;

            // get values from args.
            com.matrixone.apps.common.ICDocument ic = new com.matrixone.apps.common.ICDocument();
            DomainObject domainObject = DomainObject.newInstance(context);
            com.matrixone.apps.program.Task task = new Task();
            com.matrixone.apps.common.WorkspaceVault workspaceVault = null;
            com.matrixone.apps.program.Assessment assessment = null;
            
            com.matrixone.apps.program.FinancialItem financialItem = null;
            com.matrixone.apps.program.URL bookmark = null;
            com.matrixone.apps.program.Quality quality = null;
            com.matrixone.apps.common.Route route = null;
            com.matrixone.apps.common.Message discussion = null;

            StringList busSelects = new StringList();

            if("TRUE".equalsIgnoreCase(isKindOfProject)){

                //delete the project folders
                busSelects.add(WorkspaceVault.SELECT_ID);
                String workspaceVaultType = project.TYPE_PROJECT_VAULT;
                MapList vaultList = workspaceVault.getWorkspaceVaults(context, project, busSelects, 0);
                if (vaultList.size() > 0)
                {
                    Iterator itr1 = vaultList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String vaultId = (String) map.get(WorkspaceVault.SELECT_ID);
                        domainObject.setId(vaultId);
                        domainObject.remove(context);
                    }
                }

                //delete the project assessments
                busSelects.clear();
                busSelects.add(Assessment.SELECT_ID);
                MapList assessmentList = assessment.getAssessments(context,project, busSelects, null, null, null);

                if (assessmentList.size() > 0)
                {
                    Iterator itr1 = assessmentList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String assessmentId = (String) map.get(Assessment.SELECT_ID);
                        domainObject.setId(assessmentId);
                        domainObject.remove(context);
                    }
                }

                //delete all the Quality objects
                busSelects.clear();
                busSelects.add(Quality.SELECT_ID);
                MapList qualityList = quality.getQualityItems(context, project, busSelects, null);
                if (qualityList.size() > 0)
                {
                    Iterator itr1 = qualityList.iterator();
                    while (itr1.hasNext())
                    {
                        Map map = (Map) itr1.next();
                        String qualityId = (String) map.get(Quality.SELECT_ID);
                        domainObject.setId(qualityId);
                        domainObject.remove(context);
                    }
                }

                //delete the financials associated with this project
                busSelects.clear();
                busSelects.add(FinancialItem.SELECT_ID);
                MapList financialList = financialItem.getFinancialItems(context,project, busSelects);
                if (financialList.size() > 0)
                {
                    isPushedContext = false;
                    ContextUtil.pushContext(context, sUserAgent, DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING); // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::Start] 
                    isPushedContext = true;
                    try
                    {
                        Iterator itr1 = financialList.iterator();
                        while (itr1.hasNext())
                        {
                            Map map = (Map) itr1.next();
                            String financialId = (String) map.get(FinancialItem.SELECT_ID);
                            domainObject.setId(financialId);
                            domainObject.remove(context);
                        }
                    }
                    finally
                    {
                        if(isPushedContext)
                        {
                            ContextUtil.popContext(context);       // [ADDED::PRG:RG6:Jan 21, 2011:IR-089218V6R2012 :R211::End]
                        }
                    }
                }

                //delete the Baseline Log object
                if(ProgramCentralUtil.isNotNullString(baselineLogId))
                {
                    domainObject.setId(baselineLogId);
                    domainObject.remove(context);
                }

                //delete Project Baseline connected to Project.
	            if(projectBaselineIdList!= null && projectBaselineIdList.size()>0){
	                for(int i=0;i<projectBaselineIdList.size();i++){
	                    String strBaselineId = (String)projectBaselineIdList.get(i);
	                    ProjectBaseline baseline = new ProjectBaseline();
	                    baseline.delete(context, strBaselineId);
	                }
	            }

                //Delete Experiment project from Project space
                if(experimentProjectIdList!= null && experimentProjectIdList.size()>0){
                    for(int i=0;i<experimentProjectIdList.size();i++){
                        String strExperimentId = (String)experimentProjectIdList.get(i);
                        Experiment experiment = new Experiment();
                        experiment.delete(context, strExperimentId);
                    }
                }

                //delete the resource Requests associated with Project Space

                StringList slBusSelects = new StringList();
                slBusSelects.add(SELECT_ID);

                StringList slRelSelects = new StringList();

                String strBusWhere = ProgramCentralConstants.EMPTY_STRING;
                String strRelWhere = ProgramCentralConstants.EMPTY_STRING;

                MapList mlResourceRequestInfo = project.getResourceRequests(context,slBusSelects,slRelSelects,strBusWhere,strRelWhere);

                String strRequestId = ProgramCentralConstants.EMPTY_STRING;
                StringList slRequestIds = new StringList();

                DomainObject dmoResourceRequest = DomainObject.newInstance(context);

                for (Iterator itrRequests = mlResourceRequestInfo.iterator(); itrRequests.hasNext();)
                {
                    Map mapRequestMap = (Map) itrRequests.next();
                    strRequestId = (String) mapRequestMap.get(SELECT_ID);
                    slRequestIds.add(strRequestId);
                }
                String[] strRequetsToDelete = (String[]) slRequestIds.toArray(new String[slRequestIds.size()]);
                //to push the context as having no rights to delete
                isPushedContext = false;
                ContextUtil.pushContext(context, sUserAgent, DomainConstants.EMPTY_STRING, DomainConstants.EMPTY_STRING);
                isPushedContext = true;
                try
                {
                    DomainObject.deleteObjects(context,strRequetsToDelete);
                }
                finally
                {
                    if(isPushedContext)
                    {
                        ContextUtil.popContext(context);       
                    }
                }
            }
            //disconnect or delete the risks associated with this project
            busSelects.clear();
            busSelects.add(risk.SELECT_ID);
            busSelects.add(risk.SELECT_RPN_ID);
            MapList riskList = risk.getRisks(context, project,busSelects, null, null);
            int riskListSize=riskList.size();
            String connectedRisk[] = new String[riskListSize];
            int index=0;

            if (riskListSize > 0)
            {
                Iterator itr1 = riskList.iterator();
                while (itr1.hasNext())
                {
                    Map map = (Map) itr1.next();
                    String riskId = (String) map.get(risk.SELECT_ID);
                    connectedRisk[index]=riskId;
                    index++;
                }
            }
            if(riskListSize>0)
            {
                Risk.removeOrDeleteRisksfromParent(context, objectId, connectedRisk);
            }

            //delete the bookmarks
            StringList relSelects = new StringList(1);
            relSelects.add(DomainRelationship.SELECT_ID);

            MapList  bookmarkList = bookmark.getURLs(context, project, null, relSelects, null, null);
            int bookmarkCount =  bookmarkList.size();
            //**Start**
            /*if(ProjectSpace.isEPMInstalled(context))
            {
                if(bookmarkCount > 0)
                {
                    String[] urlConnectionIds = new String[bookmarkCount];
                    for(int i=0; i< bookmarkCount; i++)
                    {
                        urlConnectionIds[i] = (String)(((Map)bookmarkList.get(i)).get(DomainRelationship.SELECT_ID));
                    }

                    //remove all urls which do not have more than one reference; otherwise, disconect
                    bookmark.removeURLs(context, urlConnectionIds, true);
                }

                //Before deleting the tasks, delete the associated IC Objects
                if ("true".equalsIgnoreCase(EnoviaResourceBundle.getProperty(context, "emxProgramCentral.Bridge.enabled")))
                {
                    StringList objSelects = new StringList(1);
                    objSelects.add(DomainConstants.SELECT_ID);
                    MapList icList = ic.getICObjects(context,objectId,objSelects);
                    if(icList != null && icList.size() > 0)
                    {
                        Iterator itr = icList.iterator();
                        while (itr.hasNext())
                        {
                            Map map = (Map) itr.next();
                            String icId = (String) map.get(DomainConstants.SELECT_ID);
                            if(icId!=null && !"null".equals(icId) && !"".equals(icId))
                            {
                                ic.setId(icId);
                                ic.delete(context, true);
                            }
                        }
                    }
                }
            }
            else
            {*/
                if(bookmarkCount > 0)
                {
                    String[] urlConnectionIds = new String[bookmarkCount];
                    for(int i=0; i< bookmarkCount; i++)
                    {
                        urlConnectionIds[i] = (String)(((Map)bookmarkList.get(i)).get(DomainRelationship.SELECT_ID));
                    }
                    //remove all urls which do not have more than one reference; otherwise, disconect
                    bookmark.removeURLs(context, urlConnectionIds, true);
                }
                //delete all the subtasks
                busSelects.clear();
                busSelects.add(task.SELECT_ID);
                busSelects.add(ProgramCentralConstants.SELECT_TASK_PROJECT_ID);
                busSelects.add(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);

                //START:Commented and Added for IR-226589V6R2014x
                // MapList utsList = task.getTasks(context, project, 1, busSelects, null, true);
                MapList utsList = task.getTasks(context, project, 0, busSelects, null, true);
                //END:Commented and Added for IR-226589V6R2014x
                if (utsList.size() > 0)
                {
                    Iterator itr = utsList.iterator();
                    while (itr.hasNext())
                    {
                        Map map = (Map) itr.next();
                        String taskId = (String) map.get(task.SELECT_ID);
                        String taskProjectId = (String) map.get(ProgramCentralConstants.SELECT_TASK_PROJECT_ID);
                        String isKindOfProjectSpace = (String) map.get(ProgramCentralConstants.SELECT_KINDOF_PROJECT_SPACE);

                        if(!"TRUE".equalsIgnoreCase(isKindOfProjectSpace) && objectId.equals(taskProjectId)){
                            task.setId(taskId);
                            task.delete(context, true);
                        }
                    }
                }
            //}
            //delete all Route objects if they are not referenced to any other object;
            //otherwise, just disconnect them from the project.
            route.removeRoutes(context, objectId, true);

			// IR-902835-3DEXPERIENCER2022x
			// change any project scope routes to All
            if("TRUE".equalsIgnoreCase(isKindOfProject) && UIUtil.isNotNullAndNotEmpty(strPhysicalId))
			{
				String busWhere = "attribute[" + DomainConstants.ATTRIBUTE_RESTRICT_MEMBERS + "] == '" + strPhysicalId + "'";
				String strCommandStatement = "temp query bus $1 $2 $3 where $4 select $5 dump $6";
				String routeId =  MqlUtil.mqlCommand(context, strCommandStatement, true,
						DomainConstants.TYPE_ROUTE, "*", "*", busWhere, "id", "|");
						
				if (UIUtil.isNotNullAndNotEmpty(routeId))
				{
					StringList routeIds = getQueryIds(context, routeId, "|");
				
					for (int i=0; i<routeIds.size(); i++)
					{
						MqlUtil.mqlCommand(context, "modify businessobject $1 $2 $3", true,
								(String)routeIds.get(i),
								DomainConstants.ATTRIBUTE_RESTRICT_MEMBERS,
								"All");
					}
				}
				
			
			}
            //delete all Thread/Message objects connected to the project
            discussion.deleteMessages(context, (DomainObject)project);

            //delete the "Project Access List" object
            //*** Leave this last to be deleted.
            if (accessListId != null)
            {
                domainObject.setId(accessListId);
                domainObject.remove(context);
            }
        }catch(Exception e){
            throw e;
        }
        return triggerAction;
    }

      /**
       * This method is used to connect the latest revision of a Document
       * to the respective holders
       *
       * @param context the eMatrix <code>Context</code> object
       * @param args holds the following input arguments:
       *       0 - String containing the object id
       * @throws Exception if the operation fails
       * @since Common 10-0-5-0
       */
      public void connectLatestRevision (matrix.db.Context context, String[] args)
          throws Exception
      {

        try
        {
          if ( args == null || args.length == 0)
          {
            throw new IllegalArgumentException();
          }

          String objectId = args[0];

          //Construct the Document object
          DomainObject document = DomainObject.newInstance(context, objectId);

          //Construct the PMC objects type pattern
          Pattern typePattern = new Pattern(Assessment.TYPE_ASSESSMENT);
          typePattern.addPattern(document.TYPE_BUSINESS_GOAL);
          typePattern.addPattern(document.TYPE_FINANCIAL_ITEM);
          typePattern.addPattern(document.TYPE_QUALITY);
          typePattern.addPattern(document.TYPE_RISK);

          StringList busSelects = new StringList(3);
          busSelects.addElement(document.SELECT_ID);
          busSelects.addElement("type.kindof["+Assessment.TYPE_ASSESSMENT+"]");
          busSelects.addElement(DomainConstants.SELECT_CURRENT);

          //Get the relationship ids with which the document is connected PMC objects
          MapList relIdList =    document.getRelatedObjects(context,
                                                            DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT,
                                                            typePattern.getPattern(),
                                                            busSelects,
                                                            new StringList(),
                                                            true,
                                                            false,
                                                            (short)1,
                                                            null,
                                                            null);

          //Iterate through the holder and perform replicate
          StringList slHolderIds = new StringList();
          String sKindofAssessment = "";
          String sCurrentState = "";
		  String sComplete = PropertyUtil.getSchemaProperty("policy",Assessment.POLICY_ASSESSMENT,"state_Complete");

          Iterator relItr = relIdList.iterator();
          while(relItr.hasNext())
          {
              Map map = (Map)relItr.next();
              sKindofAssessment = (String)map.get("type.kindof["+Assessment.TYPE_ASSESSMENT+"]");
              sCurrentState = (String)map.get(DomainConstants.SELECT_CURRENT);

              // We don't want to add revsion to Assassement if it is in Complete state
              if ("true".equalsIgnoreCase(sKindofAssessment) && sComplete.equalsIgnoreCase(sCurrentState))
				continue;
              
			  slHolderIds.addElement((String)map.get(document.SELECT_ID));
          }

          if ( slHolderIds.size() > 0)
		  {
              //Get the latest revision of the document object
              BusinessObject busObj = document.getLastRevision(context);
              DomainObject latestRevision = DomainObject.newInstance(context, busObj);
		      String [] holderIds = (String[])slHolderIds.toArray(new String[slHolderIds.size()]);
			  DomainRelationship.connect(context, latestRevision, DomainObject.RELATIONSHIP_REFERENCE_DOCUMENT, false, holderIds);
		  }

        }catch(Exception e){
          throw e;
        }
      }


 /**
       * This method is used to get the Policy for the Type in Edit Form.
       * to the respective holders
       *
       * @param context the eMatrix <code>Context</code> object
       * @param args holds the following input arguments:
       * @returns StringList - Policy list
       * @throws PMC X+2
       */
      @com.matrixone.apps.framework.ui.ProgramCallable
public HashMap getPolicy(Context context, String[] args)
    throws Exception
    {
     HashMap mpPolicyMap=new HashMap();
     try{
        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        HashMap paramMap = (HashMap)programMap.get("paramMap");
        HashMap requestMap = (HashMap)programMap.get("requestMap");
        String languageStr = (String) requestMap.get("languageStr");
        String objectId = (String) paramMap.get("objectId");
        DomainObject dom=DomainObject.newInstance(context, objectId);
        String strType=dom.getInfo(context,DomainConstants.SELECT_TYPE);
        MapList policyList =mxType.getPolicies(context, strType, true);
        StringList fieldRangeValues = new StringList();
        StringList fieldDisplayRangeValues = new StringList();
        Iterator itr = policyList.iterator();
                    while (itr.hasNext())
                    {
                        Map policyMap = (Map) itr.next();
                        String strPolicy=(String)policyMap.get("name");
                        String strPolicyDisplayValue=i18nNow.getAdminI18NString("Policy", strPolicy, languageStr);
                        fieldRangeValues.addElement(strPolicy);
                        fieldDisplayRangeValues.addElement(strPolicyDisplayValue);
                    }
                  mpPolicyMap.put("field_choices", fieldRangeValues);
                  mpPolicyMap.put("field_display_choices", fieldDisplayRangeValues);         
       }catch(Exception e)       {
           throw (e);
       }
      return  mpPolicyMap;
    }

/**
 * Get Value of Policy Program
 * 
 *  @param context the eMatrix <code>Context</code> object
 *  @param args
 *  @return String  
 *  @throws Exception  if the operation fails
 */
public String getPolicyProgram(Context context, String[] args) throws MatrixException
{          
    String strPolicyProgram=ProgramCentralConstants.EMPTY_STRING;
    try{
        String languageStr = context.getSession().getLanguage();             
        strPolicyProgram = EnoviaResourceBundle.getProperty(context, "Framework", 
                "emxFramework.Type.Program", languageStr);
    }
    catch(Exception e){

        throw new MatrixException(e);
    }
    return strPolicyProgram;
}
/**
 * Get Value of Policy Assessment
 * 
 *  @param context the eMatrix <code>Context</code> object
 *  @param args
 *  @return String  
 *  @throws Exception  if the operation fails
 */
public String getPolicyAssessment (Context context, String[] args) throws MatrixException
{          
    String strPolicyAssessment=ProgramCentralConstants.EMPTY_STRING;
    try{
        String languageStr = context.getSession().getLanguage();             
        strPolicyAssessment = EnoviaResourceBundle.getProperty(context, "Framework", 
                "emxFramework.Policy.Assessment", languageStr);
    }
    catch(Exception e){

        throw new MatrixException(e);
    }
    return strPolicyAssessment;
}

	private StringList getQueryIds(Context context, String strQueryResult, String strSplitter) {

		String strObjId = "";
		StringList slTmpObjIds = null;
		StringList slReturnObjIds = new StringList();
		StringList slObjIds = FrameworkUtil.split(strQueryResult, "\n");
		
		for (int i = 0; i < slObjIds.size(); i++){
			
			strObjId = (String) slObjIds.get(i);
			slTmpObjIds = FrameworkUtil.split(strObjId, strSplitter);
			strObjId = (String) slTmpObjIds.get(slTmpObjIds.size() - 1);
			if(!slReturnObjIds.contains(strObjId)){
				slReturnObjIds.add(strObjId);
			}
		}
		
		return slReturnObjIds;
	}


}
