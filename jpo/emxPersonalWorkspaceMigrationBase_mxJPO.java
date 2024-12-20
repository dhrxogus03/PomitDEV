import java.util.Iterator;
import java.util.Map;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.MatrixException;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;

/**
 * @author WGI
 *
 */
public class emxPersonalWorkspaceMigrationBase_mxJPO extends emxCommonMigration_mxJPO {
    
    /**
     * 
     */
    private static final long serialVersionUID = -8490323668001935723L;
    
    /**
     * @param context
     * @param args
     * @throws Exception
     */
    public emxPersonalWorkspaceMigrationBase_mxJPO(Context context, String[] args) throws Exception {
        super(context, args);
    }
    
    /**
     * @deprecated since R2022x GA, Personal Workspace are deprecated
     */
    @Deprecated
    public void migrateObjects(Context context, StringList objectList) throws Exception {
        mqlLogRequiredInformationWriter("In emxSecurityMigrationMigratePersonObjects 'migrateObjects' method "+"\n");
        String relationshipEmployee = PropertyUtil.getSchemaProperty(context, "relationship_Employee");
        StringList mxObjectSelects = new StringList();
        String EmployeeOrgId = "to[" + relationshipEmployee + "].from.id";
        String EmployeeOrgName = "to[" + relationshipEmployee + "].from.name";
        mxObjectSelects.add(EmployeeOrgId);
        mxObjectSelects.add(EmployeeOrgName);
        mxObjectSelects.add("id");
        mxObjectSelects.add("name");
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        try {
            ContextUtil.pushContext(context);
              MapList mapList = DomainObject.getInfo(context, oidsArray, mxObjectSelects);
              Iterator<?> itr = mapList.iterator();
              while (itr.hasNext()) {
                  Map<?, ?> m = (Map<?, ?>)itr.next();
                  mqlLogWriter(m.toString());
                  String personName = (String)m.get("name");
                  mqlLogRequiredInformationWriter("==============================================================================");
                  mqlLogRequiredInformationWriter("Start Migrating User == " + personName);
                  String personId = (String)m.get("id");
                  String companyName = (String)m.get(EmployeeOrgName);
                  mqlLogRequiredInformationWriter("User == " + personName + " is conencted to "+ companyName + " with employee relationship");
                  String companyId = (String)m.get(EmployeeOrgId);
                  boolean unconverted = false;
                  String comment = "";
                  if (companyName != null && !"".equals(companyName) ) {
                      createPersonalWorkspace(context, personId, companyId, personName);
                  } else {
                      unconverted = true;
                      comment = "Person "+ personName + " is not connected to any organization with Employee relationship. \n";
                      comment += "Person "+ personName + " can't be used for new Security model Grants. \n";
                  }
                  
                  if (unconverted) {
                      writeUnconvertedOID(comment, personId);
                  } else {
                      loadMigratedOids(personId);
                  }
              }
        } catch(Exception ex) {
            ex.printStackTrace();
            throw ex;
        } finally {
            ContextUtil.popContext(context);
        }
    }
    
    /**
     * Create Personal Workspace objects, used by migrateObjects()
     * 
     * @param context the eMatrix <code>Context</code> object
     * @param personId id of person for whom Personal Workspace will be created
     * @param companyId id of organization object 
     * @param personName name of person for whom Personal Workspace will be created
     * @throws Exception if operation fails
     * @deprecated since R2022x GA, Personal Workspace are deprecated
     */
    @Deprecated
    private void createPersonalWorkspace(Context context, String personId, String companyId, String personName) throws Exception {
        try {
            String personPRJ = MqlUtil.mqlCommand(context, "list role $1", personName +"_PRJ");
            if (personPRJ != null && personPRJ.equals(personName +"_PRJ") ) {
                String[] args = new String[]{personId};
                mqlLogRequiredInformationWriter("Verify for existence Personal Workspace for User == " + personName);
                String personalWorkspaceId = JPO.invoke(context, "emxPerson", null, "getPersonalWorkspaceId", args, String.class);
                mqlLogRequiredInformationWriter("Personal Workspace for User == " + personName +" is " + personalWorkspaceId);
                if (personalWorkspaceId == null || "".equals(personalWorkspaceId) ) {
                    args = new String[]{companyId, personId};
                    mqlLogRequiredInformationWriter("Creating Personal Workspace for User == " + personName);
                    //createPersonalWorkspace(context,companyId, personId);
                    JPO.invoke(context, "emxPerson", null, "createPersonalWorkspace", args);
                } else {
                    String cmd = "mod bus $1 $2 $3";
                    String ATTRIBUTE_FOLDER_CLASSIFICATION = PropertyUtil.getSchemaProperty(context, "attribute_FolderClassification");
                    MqlUtil.mqlCommand(context, cmd, true, personalWorkspaceId, ATTRIBUTE_FOLDER_CLASSIFICATION, "Personal");
                    mqlLogRequiredInformationWriter("Personal Workspace for User == " + personName + " is already created ...");                    
                }
            } else {
                mqlLogRequiredInformationWriter("Personal Workspace is not getting created for User == " + personName + " as this user doesn't have _PRJ role created");
            }
        } catch (MatrixException e) {
            e.printStackTrace();
        }
    }
    
    public void mqlLogRequiredInformationWriter(String command) throws Exception {
        super.mqlLogRequiredInformationWriter(command +"\n");
    }
    
    public void mqlLogWriter(String command) throws Exception {
        super.mqlLogWriter(command +"\n");
    }
}
