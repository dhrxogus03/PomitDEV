/**
 * Copyright (c) 1992-2020 Dassault Systemes. All Rights Reserved. This program
 * contains proprietary and trade secret information of MatrixOne,Inc.
 * Copyright notice is precautionary only and does not evidence any actual or
 * intended publication of such program.
 *
 * static const char RCSID[] = "$Id: ${CLASSNAME}.java.rca 1.37 Tue Oct 28 19:04:45 2008 przemek Experimental przemek $"
 */

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import matrix.db.AttributeType;
import matrix.db.AttributeTypeList;
import matrix.db.Context;
import matrix.db.Dimension;
import matrix.db.JPO;
import matrix.db.MQLCommand;
import matrix.util.StringList;

import com.dassault_systemes.knowledge_itfs.IKweDictionary;
import com.dassault_systemes.knowledge_itfs.IKweMagnitude;
import com.dassault_systemes.knowledge_itfs.IKweUnit;
import com.dassault_systemes.knowledge_itfs.KweInterfacesServices;
import com.matrixone.apps.classification.AttributeGroup;
import com.matrixone.apps.classification.Classification;
import com.matrixone.apps.classification.ClassificationAttributesCreationUtil;
import com.matrixone.apps.classification.ClassificationCacheManager;
import com.matrixone.apps.classification.ClassificationConstants;
import com.matrixone.apps.common.util.ComponentsUtil;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkProperties;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.domain.util.XSSUtil;
import com.matrixone.apps.domain.util.eMatrixDateFormat;
import com.matrixone.apps.domain.util.i18nNow;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.library.LibraryCentralConstants;
import com.matrixone.apps.library.LibraryUtil;
import com.matrixone.apps.domain.util.PropertyUtil;

import org.slf4j.ext.XLogger;
import org.slf4j.ext.XLoggerFactory;
/**
 * The <code>emxMultipleClassificationAttributeGroupBase</code> class represents the APIs for Attribute Groups and Attributes management
 *
 *  @exclude
 */
public class emxMultipleClassificationAttributeGroupBase_mxJPO implements ClassificationConstants {
    private final XLogger _LOG  = XLoggerFactory.getXLogger(emxMultipleClassificationAttributeGroupBase_mxJPO.class);
    public HashMap tempMap_Cache = new HashMap();       //Added the for Bug 354212
    /**
     * Default Constructior
     */
    public emxMultipleClassificationAttributeGroupBase_mxJPO() {
    }

    /**
     * Creates an instance of the Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - name Attribute Group name
     * @return Returns an instance of the Attribute Group, reading the vaules from database.
     * @throws exception if the operation fails
     */
    public AttributeGroup getInstance(Context context, String[] args)
    throws Exception {
        StringList attrList = null;
        AttributeGroup attrGrp = null;
        String result = "";
        String strQuery = "";
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String attrGrpName = (String) paramMap.get("name");
            if (attrGrpName != null && !"null".equals(attrGrpName)) {
                    strQuery    = "list interface $1 select name description originated attribute dump $2";
                    result      = MqlUtil.mqlCommand(context, strQuery, attrGrpName,"|");
                    if (result != null) {
                        attrGrp = new AttributeGroup();
                        StringBuffer sbuf = new StringBuffer(result);
                        while (sbuf.toString().indexOf("||") > 0) {
                            sbuf.replace(sbuf.toString().indexOf("||"), (sbuf
                            .toString().indexOf("||") + 2), "| |");
                        }
                        result = sbuf.toString();
                        StringTokenizer tokens = new StringTokenizer(result,"|");
                        String description = "";
                        if (tokens.hasMoreTokens()) {
                            attrGrp.setName(tokens.nextToken());
                        }
                        if (tokens.hasMoreTokens()) {
                            description = tokens.nextToken().trim();
                        }
                        attrGrp.setDescription(description);
                        String originated = "";
                        if (tokens.hasMoreTokens()) {
                            originated = tokens.nextToken().trim();
                        }
                        attrGrp.setOriginated(originated);

                        if (tokens.hasMoreTokens()) {
                            attrList = new StringList();
                            while (tokens.hasMoreTokens()) {
                                attrList.addElement(tokens.nextToken().trim());
                            }
                        }
                        attrGrp.setAttributes(attrList);
                    }
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return attrGrp;
    }

    /**
     * Creates an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - name Attribute Group name
     *      1 - description Attribute Group description
     *      0 - attributes  to be added to Attribute Group
     * @throws exception if the operation fails
     */
    public void create(Context context, String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("name");
            String description = (String) paramMap.get("description");
            String isHidden = (String) paramMap.get("isHidden");
            StringList attributes = (StringList) paramMap.get("attributes");
            create(context, name, description, attributes, "true".equalsIgnoreCase(isHidden));
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Creates an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param name Name of the Attribute Group to be created.
     * @param description Description of the Attribute Group to be created.
     * @param attributes List of attributes that are to be added to the created Attribute Group.
     * @param isHidden 
     * @throws exception if the operation fails
     */
      public void create(Context context, String name, String description,
            StringList attributes, boolean isHidden) throws Exception {
        try {
        	
			Boolean hasLibrarianRole = JPO.invoke(context, "emxObjectAccessBase", null, "hasLibrarianRole", null,Boolean.class);
        	
        	if(!hasLibrarianRole.booleanValue()){
        		throw new FrameworkException("No Libraian Role or equivalent role");
        	}
            StringBuffer queryBuffer = new StringBuffer("add interface $1 derived $2 description $3 ");

            if(isHidden)
            	queryBuffer.append("hidden ");
            if(attributes == null) {
                attributes = new StringList();
            }
            String[] methodArgs = new String[attributes.size()+3];
            methodArgs[0]       = name;
            methodArgs[1]       = DomainConstants.INTERFACE_CLASSIFICATION_ATTRIBUTE_GROUPS;
            methodArgs[2]       = description;

            for (int i = 0; i < attributes.size(); i++) {
                queryBuffer.append("attribute ");
                queryBuffer.append("$").append(i+4).append(" ");
                methodArgs[i+3] = (String) attributes.get(i);
            }


            queryBuffer.append(";");
            MqlUtil.mqlCommand(context, queryBuffer.toString(), true, methodArgs);

        } catch (Exception ex) {
            throw ex;
        }
        //TO invalidate VPLM Cache
        String isImport = context.getCustomData("LBC_IMPORT"); //IR-855966-3DEXPERIENCER2021x
        if(isImport == null || isImport.trim().isEmpty()){
        	LibraryUtil.invalidateVPLMCatalogueCache(context);
        }
    }

    /**
     * Deletes an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - name Attribute Group name
     * @throws exception if the operation fails
     */
    public void delete(Context context, String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("name");

            delete(context, name.trim());
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Deletes an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param name Name of the Attribute Group to be deleted.
     * @throws exception if the operation fails
     */
    public void delete(Context context, String name) throws Exception {
        String queryCmd = "";
        try {
            if (name != null && !name.equals("") && !"null".equals(name)) {
                queryCmd = "delete interface $1 ";
             } else {
                throw new Exception(
                        FrameworkProperties
                                .getProperty("emxClassificationModule.AttributeGroup.NameIsNull"));
            }
            //Execute the command
            MqlUtil.mqlCommand(context, queryCmd.toString(), true, name);
        } catch (Exception ex) {
            throw ex;
        }
        try {
            _LOG.info(String.format("Reloading Tenant Cache after deleting classification attributes group from webapp"));
            ClassificationCacheManager.getInstance(context).rebuildCache(context);
        } catch (Exception e) {
            e.printStackTrace();
        }      
    }

    /**
     * Clones an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - attrGrpName Attribute Group name
     *      1 - cloneName Clone Attribute Group name
     *      2 - cloneDescription Attribute Group description
     * @throws exception if the operation fails
     */
    public void clone(Context context, String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("attrGrpName");
            String cloneName = (String) paramMap.get("cloneName");
            String cloneDescription = (String) paramMap.get("cloneDescription");

            clone(context, name.trim(), cloneName, cloneDescription);
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Clones an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param name Name of the Attribute Group to be deleted.
     * @throws exception if the operation fails
     */
    public void clone(Context context, String name, String cloneName,
            String cloneDescription) throws Exception {
        MQLCommand command = new MQLCommand();
        String queryCmd = "";
        try {
            if (name != null && !name.equals("") && !"null".equals(name)
                    && cloneName != null && !cloneName.equals("")
                    && !"null".equals(cloneName)) {
                queryCmd = "copy interface $1 $2 description $3";
            } else {
                throw new Exception(
                        FrameworkProperties
                                .getProperty("emxClassificationModule.AttributeGroup.NameIsNull"));
            }
            //End of Addition for Bug No 308919
            //Execute the command
            MqlUtil.mqlCommand(context, queryCmd, true, name, cloneName, cloneDescription);
        } catch (Exception ex) {
            throw ex;
        } finally {
            command = null;
        }
    }

    /**
     * Modifies an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - attrGrpName Attribute Group name
     *      1 - newName Clone new Attribute Group name
     *      2 - newDescription Attribute Group description
     * @throws exception if the operation fails
     */
    public void modify(Context context, String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String attrGrpName = (String) paramMap.get("attrGrpName");
            String newName = (String) paramMap.get("newName");
            String newDescription = (String) paramMap.get("newDescription");
            modify(context, attrGrpName, newName, newDescription);
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Modifies an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param attrGrpName Name of the Attribute Group to be modified.
     * @param newName New name for the Attribute Group to be modified.
     * @param newDescription New description for Attribute Group to be modified.
     * @throws exception if the operation fails
     */
    public void modify(Context context, String attrGrpName, String newName,
            String newDescription) throws Exception {

        String queryCmd = "";
        try {

            //generate modify statement.
            if (attrGrpName != null && !attrGrpName.equals("")
                    && !"null".equals(attrGrpName)) {
                queryCmd = "modify interface $1 name $2 description $3";

            } else {
                throw new Exception(
                        FrameworkProperties
                                .getProperty("emxClassificationModule.AttributeGroup.NameIsNull"));
            }
            //End of modify statement generation

            //Execute the command
            MqlUtil.mqlCommand(context, queryCmd.toString(), true, attrGrpName, newName, newDescription);

        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Adds attributes to an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - name Attribute Group name
     *      1 - attributeList AttributeList that are to be added to the Attribute Group
     * @throws exception if the operation fails
     */
    public void addAttributes(Context context, String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("name");
            StringList attributeList = (StringList) paramMap
                    .get("attributeList");
            addAttributes(context, name, attributeList);
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Adds attributes to an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param name Name of the Attribute Group to which attributes to be added.
     * @param attributeList List of attributes that are to be added to the Attribute Group.
     * @throws exception if the operation fails
     */
    public void addAttributes(Context context, String name,
            StringList attributeList) throws Exception {
            StringBuffer queryBuffer = new StringBuffer();
            queryBuffer.append("modify interface $1");
             String classificationAttribbutePropVal = "classificationAttributes";
            StringList methodArgs = new StringList();
            methodArgs.add(name);

            if (attributeList != null && attributeList.size() > 0) {
                for (int i = 0,j=1; i < attributeList.size(); i++)
                {
                   
                   String isCustomCreatedAttr = MqlUtil.mqlCommand(context, "print attribute $1 select $2 dump", attributeList.get(i), "property["+classificationAttribbutePropVal+"].value");
                   //String  isCustomCreatedAttr = EnoviaResourceBundle.getProperty(context, classificationAttribbutePropVal);
         
						       if(isCustomCreatedAttr.equals("true")) 
                   {
                     
                     queryBuffer.append(" add attribute ");
                     queryBuffer.append("$").append(++j).append(" ");
                     methodArgs.add((String)attributeList.get(i));
                   }
                }
            }
            queryBuffer.append(";");
            try {
                MqlUtil.mqlCommand(context, queryBuffer.toString(), true, methodArgs);
            } catch (Exception ex) {
                throw ex;
            }
            //TO invalidate VPLM Cache
            LibraryUtil.invalidateVPLMCatalogueCache(context);

    }

    /**
     * Removes attributes from an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - name Attribute Group name
     *      1 - attributeList AttributeList that are to be removed to the Attribute Group\
     * @throws exception if the operation fails
     */
    public void removeAttributes(Context context, String[] args)
            throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("name");
            StringList attributeList = (StringList) paramMap
                    .get("attributeList");
            removeAttributes(context, name, attributeList);
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Removes attributes from an Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param name Name of the Attribute Group to which attributes to be removed.
     * @param attributeList List of attributes that are to be removed from the Attribute Group.
     * @throws exception if the operation fails
     */
    public void removeAttributes(Context context, String name,
            StringList attributeList) throws Exception {
            StringBuffer queryBuffer = new StringBuffer();
            queryBuffer.append("modify interface $1");

            StringList localAttributes = new StringList();
            StringList methodArgs = new StringList();
            methodArgs.add(name);

            if (attributeList != null && attributeList.size() > 0) {
                for (int i = 0; i < attributeList.size(); i++)
                {
                	String attributeName = (String) attributeList.get(i);
                	if(attributeName.startsWith(name+".")){
                		localAttributes.add(attributeName);
                	}else{
                	    methodArgs.add(attributeName);
                    	queryBuffer.append(" remove attribute $").append(methodArgs.size());
                    }
                }
            }
            try {
                if(methodArgs.size() > 1){
                	//remove global attributes
                	MqlUtil.mqlCommand(context, queryBuffer.toString(), true, methodArgs);
                }
                
                if(localAttributes.size() > 0){
                	//delete local attributes
                    ContextUtil.pushContext(context);
                	Iterator localAttrItr = localAttributes.iterator();
                	while(localAttrItr.hasNext()){
                		String localAttrName = (String)localAttrItr.next();
                		MqlUtil.mqlCommand(context, "delete attribute $1",localAttrName);
                	}
                    ContextUtil.popContext(context);
                }
                
            } catch (Exception ex) {
                throw ex;
            }
            //TO invalidate VPLM Cache
            LibraryUtil.invalidateVPLMCatalogueCache(context);

    }

    /**
     * Gets the number of end items which are using the attribute group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - name Attribute Group name
     * @return String the count of the end items which are using the attribute group.
     * @throws exception if the operation fails
     */
    public String getNumberOfEndItemsWhereUsed(Context context, String[] args)
            throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("name");
            return getNumberOfEndItemsWhereUsed(context, name);
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Gets the number of end items which are using the attribute group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param attrGrpName Name of the Attribute Group
     * @return String the count of the end items which are using the Attribute Group.
     * @throws exception if the operation fails
     */
    public String getNumberOfEndItemsWhereUsed(Context context,
            String attrGrpName) throws Exception {
        String queryInterface   = "";
        String interfaceList;
        String result           = null;
        String mqlResult        = null;
        if (attrGrpName != null) {
            queryInterface  = "list interface $1 select derivative dump $2";
            try {
                interfaceList                   = MqlUtil.mqlCommand(context, queryInterface, attrGrpName,"|");
                interfaceList                   = interfaceList.trim();
                String[] interfacesArray		= interfaceList.split("\\|");
                int batchLimit 					= 512;
                String queryItemsCount          = "";
                String strPersonDefaultVault    = PersonUtil.getDefaultVault(context);
                // mArgs                           = new String[]{"count TRUE","*","*","*",strPersonDefaultVault,"interface matchlist "+interfaceList+" '|'"};
                queryItemsCount                 = "eval expr $1 on temp query bus $2 $3 $4 vault $5  where $6";
				//Check if the number of interfaces is greater than batch limit number. If yes, execute the MQL query batch-wise else execute directly.
                if(interfacesArray != null && interfacesArray.length > batchLimit)
                {
				    //Data is huge
                	int noOfBatches = 0;
                	int temp = batchLimit;
                	int totalNumber = 0;
                	StringBuffer sb = new StringBuffer();
                	for(int index=0 ; index <interfacesArray.length  ; index++)
                	{
                		noOfBatches++;
						//Executing batch-wise with batchlimit specifying the size of each batch
                		for(int j=index ; j<temp ; j++)
                		{
							//Appending the interfaces
                			if(UIUtil.isNotNullAndNotEmpty(interfacesArray[j]))
                			{
                				sb.append(interfacesArray[j]);
                				sb.append("|");
                			}
                		}
                		String listOfInterfaces = sb.toString().substring(0, sb.toString().lastIndexOf("|"));
                		mqlResult                   = MqlUtil.mqlCommand(context, queryItemsCount,
											                				"count TRUE",
											                				"*",
											                				"*",
											                				"*",
											                				strPersonDefaultVault,
											                				"interface matchlist '"+listOfInterfaces+"' '|'");
						//Check whether original size of interfaces has been reached. If not, initialize the indices with proper values to continue traversing the array
                		if(!(interfacesArray.length <= temp))
                		{
                			index = temp-1;
                			temp = temp + batchLimit;
                			if(temp > interfacesArray.length)
                			{
                				temp = interfacesArray.length;
                			}
                		}
                		else
                		{
                			index = interfacesArray.length-1;
                		}
						//Append the number value returned after MQL execution
                		totalNumber = totalNumber + Integer.parseInt(mqlResult);
						//clear the buffer, to store newly read data i.e interfaces in next iteration
                		sb = sb.delete(0, sb.length());
                	}
                    result = new Integer(totalNumber).toString();
                }
                else
                {
				    //Data is not huge.
                	result                          = MqlUtil.mqlCommand(context, queryItemsCount,
												                			"count TRUE",
												                			"*",
												                			"*",
												                			"*",
												                			strPersonDefaultVault,
												                			"interface matchlist '"+interfaceList+"' '|'");
                	result = result.trim();
                }
            } catch (Exception ex) {
                throw ex;
            }
        }
        return result;
    }

    /**
     * Gets classification objects which are using the attribute group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *      0 - AGName Attribute Group name
     * @return MapList of classification which are using the Attribute Group.
     * @throws exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getClassificationsWhereUsed(Context context, String[] args)
            throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String name = (String) paramMap.get("AGName");
            //Fix IR-208402V6R2014, If AG contains space, should decoded properly
            //otherwise whereused would return empty results
           //QBQ : no need of this decoding as name with spaces are taken care with quotes in mql command.
            //this is causing issue for names with + or japanese characters
           // name = FrameworkUtil.decodeURL(name, "UTF8");
            
            StringList objectSelects = (StringList) paramMap.get("objectSelects");
            
            return getClassificationsWhereUsed(context, name,objectSelects);
        } catch (Exception ex) {
            throw ex;
        }
    }
    
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getClassificationsWhereUsed(Context context,
            String attrGrpName) throws Exception {
    	return getClassificationsWhereUsed(context,attrGrpName,null);
    }
    

    /**
     * Gets classification objects which are using the attribute group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param attrGrpName Attribute Group name
     * @return Returns MapList of classification which are using the Attribute Group.
     * @throws exception if the operation fails
     */
    public MapList getClassificationsWhereUsed(Context context,
            String attrGrpName,StringList objectSelectIn) throws Exception {
        //Use DomainObject.findObjects........
        String strQuery     = "";
        String interfaceList;
        StringBuffer whereClause = new StringBuffer();
        StringList objectSelects;
        MapList returnList = new MapList();
        if (attrGrpName != null) {
            //strQuery                = "list interface $1 select derivative dump $2";
        	strQuery                  = "list interface \"$1\" select derivative dump $2";
            try {

                interfaceList = MqlUtil.mqlCommand(context, strQuery, attrGrpName,"|");
                interfaceList = interfaceList.trim();
                if (!"".equals(interfaceList) && null != interfaceList
                        && !"null".equals(interfaceList)) {
                    whereClause.append("attribute[");
                    whereClause.append(ATTRIBUTE_MXSYS_INTERFACE);
                    whereClause.append("] matchlist \"");
                    whereClause.append(interfaceList);
                    whereClause.append("\" \"|\"");
                    objectSelects = new StringList();
                    objectSelects.addElement(DomainConstants.SELECT_ID);
                    if(objectSelectIn != null){
                        objectSelects.addAll(objectSelectIn);
                       }
                    returnList = DomainObject.findObjects(context,
                            "Classification", null, whereClause.toString(), objectSelects);
                }
            } catch (Exception ex) {
                throw ex;
            }
        }
        return returnList;
    }

   /**
     * Gets all the Attribute Groups
     *
     * @param context the eMatrix <code>Context</code> object
     * @param attrGrpName Attribute Group name
     * @return String comma seperated  Attriute Groups
     * @throws exception if the operation fails
     */
    public static StringList getAllAttributeGroupNames(Context context) throws Exception {
    	String queryCmd        = "print interface $1 select $2";
        String data     = MqlUtil.mqlCommand(context, queryCmd, true, DomainConstants.INTERFACE_CLASSIFICATION_ATTRIBUTE_GROUPS, "immediatederivative.hidden").trim();
        StringList lines = FrameworkUtil.split(data, "\n");
        //immediatederivative[AG_01].hidden = FALSE
        //immediatederivative[AG_02].hidden = TRUE
        StringList returnList = new StringList();
        for(String line : lines){
        	line  = line.trim();
        	if(line.startsWith("immediatederivative[")){
        		int second = line.indexOf("].hidden = ");
        		String agName = line.substring("immediatederivative[".length(), second);
        		String hidden = line.substring(second+"].hidden = ".length());
        		if("FALSE".equalsIgnoreCase(hidden))
        			returnList.add(agName);
        	}
        }
        return returnList;
    }
    /**
     * Gets the Attribute Groups with name matching the passed string
     *
     * @param context the eMatrix <code>Context</code> object
     * @param attrGrpName Attribute Group name
     * @return StringList list of Attribute Groups matching with the passed string
     * @throws exception if the operation fails
     */
    public static StringList getMatchingAttributeGroupNames(Context context, String nameMatch)
    throws Exception {
        StringList result = getAllAttributeGroupNames(context);
        if (nameMatch.equals("*")) {
            return result;
        }
        String query                    = "list interface $1 ";
        String data                     = MqlUtil.mqlCommand(context, query, true, nameMatch).trim();
        StringList matchingInterfaces   = FrameworkUtil.split(data, "\n");
        result.retainAll(matchingInterfaces);
        return result;
    }

    /**
     * Gets all the attribute groups defined in the system.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *     0 - charSet the charchter set
     * @return MapList with list of Attribute Group details
     * @throws exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAllAttributeGroups(Context context, String[] args)
            throws Exception {

        HashMap programMap = (HashMap) JPO.unpackArgs(args);
        String strCharSet =(String)programMap.get("charSet");
        try
        {
            ComponentsUtil.checkLicenseReserved(context,LibraryCentralConstants.LIB_LBC_ENG_PRODUCT_TRIGRAM);
        }
        catch(Exception e)
        {
            throw new Exception(e.toString());
        }
        if(strCharSet == null || strCharSet.trim().equals(""))
        {
            strCharSet = "UTF8";
        }
        StringList agNames = getAllAttributeGroupNames(context);
        //Modified the for Bug 354212
        // Iterating the attribute group names and add them in a maplist
        MapList result = new MapList(agNames.size());
        Iterator agNameIter = agNames.iterator();
        while (agNameIter.hasNext()) {
            HashMap tmp = new HashMap();
            String agName = (String) agNameIter.next();
            tmp.put("id", agName);
            result.add(tmp);
        }
        return result;
    }
        /**
     * Gets data for a list of Attribute Group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     * @param args agNames list of attributes
     * @return MapList with the Attribute Group data
     * @throws exception if the operation fails
     */
    public static MapList getAttributeGroupData(Context context, StringList agNames)
    throws Exception {
        return getAttributeGroupData(context, agNames, "*");
    }

    /**
     * Gets data for a list of Attribute Group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param agNames  Names of the attribute group whose data need to be returned
     * @return Returns a MapList, each map containing with name, description and attributes of the Attribute Group.
     * @throws exception if the operation fails
     */
    public static MapList getAttributeGroupData(Context context, StringList agNames, String nameMatches)
    throws Exception {
        MapList returnList = new MapList();

        HashSet include = new HashSet();
        include.addAll(agNames);

        // Start by getting info for all interfaces that match the name
        // then intersect that list with the list of matching AG names
        // to make it a list of matching AG names (not interfaces in general)
        // and unused, if appropriate.
        String getAttrsQuery    = "list interface $1 select name description attribute dump $2";
        String data             = MqlUtil.mqlCommand(context, getAttrsQuery.toString(), true, nameMatches, "|").trim();
        StringList rows         = FrameworkUtil.split(data, "\n");
        Iterator rowIter        = rows.iterator();
        while (rowIter.hasNext()) {
            String row = (String) rowIter.next();
            StringList elems = FrameworkUtil.split(row, "|");
            String name = (String) elems.get(0);
            // Using the HashSet is faster than List.contains()
            if (!include.contains(name)) {
                continue;
            }
            String desc = (String) elems.get(1);
            elems.subList(0, 2).clear();
            String attrs = FrameworkUtil.join(elems, ", ");

            HashMap tempMap = new HashMap();
            tempMap.put("name", name);
            tempMap.put("id", name); // some like it so
            tempMap.put("description", desc);
            tempMap.put("attributes", attrs);
            returnList.add(tempMap);
        }
        return returnList;
    }

    /**
     * Gets all the attributes defined in the system.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *     0 - charSet the charchter set
     * @throws exception if the operation fails
     */
    public MapList getAllAttributes(Context context, String[] args)
            throws Exception {
        MapList list = new MapList();
        AttributeTypeList attList = AttributeType.getAttributeTypes(context,
                false);
        Iterator itr = attList.iterator();
        HashMap map;
        AttributeType attribute;
        while (itr.hasNext()) {
            map = new HashMap();
            attribute = (AttributeType) itr.next();
            map.put("id", attribute.getName());
            map.put("DataType", attribute.getDataType(context));
            map.put("Description", attribute.getDescription(context));
            list.add(map);
        }
        return list;
    }

    /**
     * Gets the attributes which matches the query parameters.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - nameMatches the string used for Attribute Name match
     *  1 - typeFilter the string used for Attribute type match
     *  2 - unused the string for getting unused or all Attributes
     * @return Returns a MapList with the names of the attributes
     * @throws exception if the operation fails
     */
    public MapList getAttributesByQuery(Context context, String[] args)
            throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String nameMatches = (String) paramMap.get("nameMatches");
            String typeFilter = (String) paramMap.get("typeFilter");
            boolean unused = ((Boolean) paramMap.get("unused")).booleanValue();
            return getAttributesByQuery(context, nameMatches, typeFilter,
                    unused);
        } catch (Exception ex) {
            throw ex;
        }
    }


    /**
     * Gets the attributes which matches the query parameters.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param  nameMatches the string used for Attribute Name match
     * @param  typeFilter the string used for Attribute type match
     * @param  unused the string for getting unused or all Attributes
     * @return Returns a MapList with the names of the attributes
     * @throws exception if the operation fails
     */
     public MapList getAttributesByQuery(Context context, String nameMatches,
            String typeFilter, boolean unused) throws Exception {
        long initialTime = System.currentTimeMillis();

        MapList result = new MapList();
        HashSet usedAttrSet = new HashSet();
		boolean filterType = typeFilter != null && !typeFilter.equals("") && !typeFilter.equals("*");

        if (unused) {
            String agAttrCmd    = "print interface $1 select $2 $3 dump $4";
            String agAttrData   = MqlUtil.mqlCommand(context, agAttrCmd, true,
                                                    DomainConstants.INTERFACE_CLASSIFICATION_ATTRIBUTE_GROUPS,
                                                    "immediatederivative.attribute.name",
                                                    "immediatederivative.attribute.owner",
                                                    ","
                                                    ).trim();
            StringList agAttrNamesAndOwners  = FrameworkUtil.split(agAttrData, ",");
            
            List agAttrNames = agAttrNamesAndOwners.subList(0, agAttrNamesAndOwners.size()/2);
            List agAttrOwners = agAttrNamesAndOwners.subList(agAttrNamesAndOwners.size()/2,agAttrNamesAndOwners.size());

            Iterator agAttrNameIterator = agAttrNames.iterator();
            Iterator agAttrOwnerIterator = agAttrOwners.iterator();
            
            
            while(agAttrNameIterator.hasNext() && agAttrOwnerIterator.hasNext()){
            	String attrName = (String)agAttrNameIterator.next();
            	String attrOwner = (String)agAttrOwnerIterator.next();
            	if(UIUtil.isNotNullAndNotEmpty(attrOwner)){
            		attrName = attrOwner+"."+attrName;
            	}
            	usedAttrSet.add(attrName);
            }
            
        }
		//XHC - FUN125875
        StringList newMecaAttrList  = new StringList();
        try{
            String interface_ClassificationAttributes = PropertyUtil.getSchemaProperty(context, "interface_ClassificationAttributes");

            String newMecaAttrCmd    = "print interface $1 select $2 dump $3";
            String newMecaAttrData   = MqlUtil.mqlCommand(context, newMecaAttrCmd, true,
                                                        interface_ClassificationAttributes,
                                                        "attribute",
                                                        ","
                                                        ).trim();
            newMecaAttrList = FrameworkUtil.split(newMecaAttrData, ",");
        } catch(FrameworkException e) {
        }
        
		
		//bae3 - FUN088808
		String classificationAttribbutePropVal = "classificationAttributes";
        try{
        	String attriPropValue = EnoviaResourceBundle.getProperty(context, "emxLibraryCentral.Attribute.ClassificationAttributePropertyName");
    		if(UIUtil.isNotNullAndNotEmpty(attriPropValue))
    			classificationAttribbutePropVal = attriPropValue;
        }catch(FrameworkException frEx){
        }

        String getAllAttrCmd    = "list attribute $1 where $2 select name type hidden owner description application dump $3 recordsep $4";
        String allAttrData      = MqlUtil.mqlCommand(context, getAllAttrCmd, true, nameMatches, "property["+classificationAttribbutePropVal+"].value == true", "@", "|").trim();

        StringList allAttrRows = FrameworkUtil.split(allAttrData, "|");

        HashSet allAttrNames = new HashSet();
        StringList matchingAttrNamesLst = new StringList();
        Iterator matchingAttrRowIter = allAttrRows.iterator();
        while (matchingAttrRowIter.hasNext()) {
            String row = (String) matchingAttrRowIter.next();
            StringList attrTokens = FrameworkUtil.split(row, "@");
            if (attrTokens.size() < 5) { continue;}  // @ or | in attr descr }
            String name = (String)attrTokens.get(0);
            String type = (String)attrTokens.get(1);
            String hidden = (String)attrTokens.get(2);
            String owner = (String)attrTokens.get(3);
            String description = (String)attrTokens.get(4);
            //Skip VPLM attributes
            if(attrTokens.size() == 6){
                String application = (String)attrTokens.get(5);
                if(application!=null && application.equals("VPLM")){
                    continue;
                }
            }
            
            // Skip hidden attrs
            if (hidden.equals("TRUE")) {
                continue;
            }
            
            // Skip Local Attributes
            if (UIUtil.isNotNullAndNotEmpty(owner)) {
                continue;
            }
            

            // if type filtering, and type doesn't match, skip
            if (filterType && !typeFilter.toUpperCase().trim().equals(type.toUpperCase().trim()) )
            {
                continue;
            }

            // if unused filtering, and attr is used, skip
            if (unused && usedAttrSet.contains(name)) {
                continue;
            }
            // Skip Attributes created via widget ClassificationEditor
            if (newMecaAttrList.contains(name)) {
                continue;
            }

            HashMap tmp = new HashMap();
            tmp.put("name", name);
            tmp.put("id", name);
            result.add(tmp);
        }
        long finalTime = System.currentTimeMillis();
        return result;
    }


    /**
     * Gets the list of HTML string for each Attribute Group for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - uiType the UI Type
     *  1 - languageStr the language
     *  2 - charSet the charset
     *  3 - objectList the Attribute Group list
     * @return Vector list of HTML string for each Attribute Group
     * @throws exception if the operation fails
     */

    public Vector getAttributeGroupName(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap          = (HashMap) JPO.unpackArgs(args);
            String strUiType            = ((String) ((HashMap) programMap.get("paramList")).get("uiType"));
            String hyperlink            = ((String) ((HashMap) programMap.get("paramList")).get("hyperlink"));
            String strLanguageStr       = ((String) ((HashMap) programMap.get("paramList")).get("languageStr"));
            HashMap requestValuesMap    =(HashMap)programMap.get("paramList");
            String strCharSet           =  (String )requestValuesMap.get("charSet");
            if(UIUtil.isNullOrEmpty(hyperlink)){
                hyperlink = "true";
            }
            if(strCharSet == null || strCharSet.trim().equals(""))
            {
                strCharSet = "UTF8";
            }
            MapList objList                 = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr                    = objList.iterator();
            String name                     = "";
            String strEncodedName           = "";
            String strEncodedTreeLabelName  = "";
            boolean isPrintMode             = "HTML".equalsIgnoreCase((String)requestValuesMap.get("reportFormat"));
            String strAttrGroupImg          = "<img border='0' align='top' SRC=\"images/iconSmallAttributeGroup.gif\"></img>";
            while(itr.hasNext()) {
                map                         = (HashMap)itr.next();
                name                        = (String)map.get("id");
                //Modified the for Bug 354212
                //Commented for bug 358088
                AttributeType att           = new AttributeType((String) map.get("id"));

                if(!hyperlink.equals("true")){
                    StringBuffer strI18nAttributeName = new StringBuffer();
                    strI18nAttributeName.append("<div align=\"top\"><img src=\"images/iconSmallAttributeGroup.gif\" border = \"0\"/><span class=\"object\">");
                    strI18nAttributeName.append(i18nNow.getAttributeI18NString(
                    att.getName(), strLanguageStr));
                    strI18nAttributeName.append("</span>");
                    strI18nAttributeName.append("</div>");
                    columnValues.addElement(strI18nAttributeName.toString());
                    } else {
                        if(isPrintMode)
                        {
                          columnValues.addElement(strAttrGroupImg + name);

                        }else {
                          //strEncodedName = name.replaceAll("'", "\\'");
                        	strEncodedName = XSSUtil.encodeForJavaScript(context, name);
                        	strEncodedTreeLabelName = XSSUtil.encodeForJavaScript(context, strEncodedName);
                          
                          StringBuffer strHTMLStartAnchorTag = new StringBuffer();
                          strHTMLStartAnchorTag.append("<a href=");
                          StringBuffer strHTMLAnchorHrefAttr = new StringBuffer();
                          strHTMLAnchorHrefAttr.append("\"JavaScript:emxTableColumnLinkClick('emxTree.jsp?treeMenu=type_MCMAttributeGroupTreeMenu&amp;treeLabel=");
                          strHTMLAnchorHrefAttr.append(strEncodedName);
                          strHTMLAnchorHrefAttr.append("&amp;objectName=");
                          strHTMLAnchorHrefAttr.append(strEncodedName);
                          strHTMLAnchorHrefAttr.append("&amp;AppendParameters=true&amp;AGName=");
                          strHTMLAnchorHrefAttr.append(strEncodedTreeLabelName);
                          strHTMLAnchorHrefAttr.append("&amp;suiteKey=LibraryCentral',");
                          strHTMLAnchorHrefAttr.append("'', '', 'false', 'popup')\"");
                          
                          strHTMLStartAnchorTag.append(strHTMLAnchorHrefAttr+" >");

                          StringBuffer strHTMLEndAnchorTag = new StringBuffer();
                          strHTMLEndAnchorTag.append("</a>");

                          StringBuffer hrefBuffer = new StringBuffer();
                          hrefBuffer.append(strHTMLStartAnchorTag.toString());
                          hrefBuffer.append(strAttrGroupImg);
                          hrefBuffer.append(strHTMLEndAnchorTag.toString());
                          hrefBuffer.append("&#160;");
                          hrefBuffer.append(strHTMLStartAnchorTag.toString());
                          hrefBuffer.append("<span class=\"object\">");
                          hrefBuffer.append(XSSUtil.encodeForXML(context, name));
                          hrefBuffer.append("</span>");
                          hrefBuffer.append(strHTMLEndAnchorTag);
                          columnValues.addElement(hrefBuffer.toString());
                       }
                }
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the list of HTML string for each Attribute Group for UI display of Commands
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - uiType the UI Type
     *  1 - exportFormat the export format
     *  2 - reportFormat the report format
     *  3 - charSet the charset
     *  4 - objectList the Attribute Group list
     * @return Vector list of HTML string for each Attribute Group
     * @throws exception if the operation fails
     */
    public Vector getAttributeGroupCommandName(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestValuesMap =(HashMap)programMap.get("paramList");
            String strCharSet =  (String )requestValuesMap.get("charSet");
            boolean isprinterFriendly = false;
            boolean isExport            = false;

            if(requestValuesMap.get("exportFormat") != null )
            {
                isExport        = true;
            }
            else if(requestValuesMap.get("reportFormat") != null)
            {
                isprinterFriendly = true;
            }

            if(strCharSet == null || strCharSet.trim().equals(""))
            {
                strCharSet = "UTF8";
            }
            MapList objList = (MapList) programMap.get("objectList");
            String jsTreeID =  ((String)((HashMap)programMap.get("paramList")).get("jsTreeID"));
            HashMap map;
            Iterator itr = objList.iterator();
            String name = "";
            String href = "";
            StringBuffer hrefBuffer = new StringBuffer();
            String strDisplayName = "";
            while(itr.hasNext()) {
                map = (HashMap)itr.next();
                name = (String)map.get("id");       //Modified the for Bug 354212
                if(isExport)
                {
                    hrefBuffer.append(name);
                }
                else
                {
                    strDisplayName = "<span class=\"object\">" +XSSUtil.encodeForXML(context, (String)name)+"</span>";
                    if(isprinterFriendly)
                    {
                        hrefBuffer.append("<table border=\"0\"><tbody><tr><td><img align=\'top\' border=\'0\' SRC=\"images/iconSmallAttributeGroup.gif\"></td><td>");
                        hrefBuffer.append(strDisplayName);
                        hrefBuffer.append("</td></tr></tbody></table>");

                    }
                    else
                    {
                        //String strEncodedName = FrameworkUtil.encodeNonAlphaNumeric(name,strCharSet);
                        String strEncodedName = XSSUtil.encodeForJavaScript(context, name);//IR-649285
                        // Tree label name is encoded twice, as the treedisplay page decodes it twice !!
                        //String strEncodedTreeLabelName = FrameworkUtil.encodeNonAlphaNumeric(strEncodedName,strCharSet);
                        //below line commented for IR-414510-3DEXPERIENCER2015x
                        //String strEncodedTreeLabelName = XSSUtil.encodeForURL(context, strEncodedName);
                        // Changed the Object Name value with label encoded only once as a part of the bug 344441
                        // Construct new URL for the page
                        hrefBuffer.append("emxTree.jsp?treeMenu=type_MCMAttributeGroupTreeMenu&amp;treeLabel=");
                        hrefBuffer.append(strEncodedName);
                        hrefBuffer.append("&amp;objectName=");
                        hrefBuffer.append(strEncodedName);
                        hrefBuffer.append("&amp;AppendParameters=true&amp;mode=insert&amp;jsTreeID=");
                        hrefBuffer.append(XSSUtil.encodeForURL(context, jsTreeID));
                        hrefBuffer.append("&amp;AGName=");
                        hrefBuffer.append(strEncodedName);
                        hrefBuffer.append("&amp;suiteKey=LibraryCentral");
                        

                        href = FrameworkUtil.encodeURL(hrefBuffer.toString(), strCharSet);

                        StringBuffer strHTMLStartAnchorTag = new StringBuffer();
                        strHTMLStartAnchorTag.append("<a href=\"JavaScript:emxTableColumnLinkClick('");
                        strHTMLStartAnchorTag.append(href);
                        strHTMLStartAnchorTag.append("',730,450,'false','content')\" >");
                        String strHTMLEndAnchorTag = "</a>";

                        hrefBuffer = new StringBuffer();
                        hrefBuffer.append("<table border=\"0\"><tbody><tr><td><img align=\'top\' border=\'0\' SRC=\"images/iconSmallAttributeGroup.gif\"></img></td><td>");
                        hrefBuffer.append(strHTMLStartAnchorTag.toString());
                        hrefBuffer.append(strDisplayName);
                        hrefBuffer.append(strHTMLEndAnchorTag);
                        hrefBuffer.append("</td></tr></tbody></table>");
                    }
                }

                columnValues.addElement(hrefBuffer.toString());
                hrefBuffer = new StringBuffer();
            }
        } catch(Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the list of HTML string for new window each Attribute Group for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - uiType the UI Type
     *  1 - exportFormat the export format
     *  3 - charSet the charset
     *  4 - objectList the Attribute Group list
     * @return Vector list of HTML string for each Attribute Group
     * @throws exception if the operation fails
     */
    public Vector getAttributeGroupNewWindow(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            HashMap requestValuesMap =(HashMap)programMap.get("paramList");
            String strCharSet =  (String )requestValuesMap.get("charSet");
            if(strCharSet == null || strCharSet.trim().equals(""))
            {
                strCharSet = "UTF8";
            }
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr = objList.iterator();
            String name = "";
            String href = "";
      boolean isPrintMode = "HTML".equalsIgnoreCase((String)requestValuesMap.get("reportFormat"));
      String strNewIcon = "<IMG border=\"0\" align=\"top\" SRC=\"images/iconNewWindow.gif\"></IMG>";

      while(itr.hasNext()) {
                map = (HashMap)itr.next();
        if(isPrintMode)
        {
          columnValues.addElement(strNewIcon);
        }else
        {


          name = (String)map.get("id");     //Modified the for Bug 354212

          //String strEncodedName = FrameworkUtil.encodeNonAlphaNumeric(name, strCharSet);
          String strEncodedName = XSSUtil.encodeForJavaScript(context, name);//IR-649285


          // Tree label name is encoded twice, as the treedisplay page decodes it twice !!
          //String strEncodedTreeLabelName = FrameworkUtil.encodeNonAlphaNumeric(strEncodedName, strCharSet);
          String strEncodedTreeLabelName = XSSUtil.encodeForURL(context, strEncodedName);
          
          // Construct new URL for the popup page
          href = "emxTree.jsp?treeMenu=type_MCMAttributeGroupTreeMenu&amp;treeLabel=" + strEncodedName + "&amp;objectName=" + strEncodedName + "&amp;AppendParameters=true&amp;AGName="+ strEncodedName +"&amp;suiteKey=LibraryCentral";
		  		  
          href = FrameworkUtil.encodeURL(href, strCharSet);

          String strHTMLStartAnchorTag = "<a href=\"javascript:emxTableColumnLinkClick('"+href+"',730,450,'false','popup')\" >";

          String strHTMLEndAnchorTag = "</a>";

          href =  strHTMLStartAnchorTag + strNewIcon + strHTMLEndAnchorTag;


          columnValues.addElement(href);
        }
      }
        } catch(Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

   /**
     * Gets the Attribute Group Description for each of the Attribute Groups in the list
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - uiType the UI Type
     *  1 - objectList the list of Attribute Groups
     * @return Vector list of Attribute Group Description for each Attribute Group
     * @throws exception if the operation fails
     */
    public Vector getAttributeGroupDescription(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            String strLanguageStr = ((String) ((HashMap) programMap.get("paramList")).get("languageStr"));
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                HashMap map = (HashMap) itr.next();
                String attrgrpName = (String) map.get("id");
                //Modified the for Bug 354212
                //Check whether that attribute group data is added in the hashmap cache ref variable. if not add it.
                  if(tempMap_Cache.get(attrgrpName) == null)
                  {
                      // retrieving the attribute group data thro mql and put it in the cache map
                      String getAttrsQuery  = "list interface $1 select name description attribute dump $2";
                      String data           = MqlUtil.mqlCommand(context, getAttrsQuery, true, attrgrpName, "|").trim();
                      //Modified for bug 359307
                      if(data !=null && !"".equals(data))
                      {
                          StringList strlTemp = FrameworkUtil.split(data,"|");
                          String strDesc = (String) strlTemp.get(1);
                          strlTemp.subList(0,2).clear();
                          StringList slAttrDisplay = new StringList(strlTemp.size());
                          for(Iterator attrItr=strlTemp.iterator(); attrItr.hasNext();){
                              slAttrDisplay.addElement(i18nNow.getAttributeI18NString((String) attrItr.next(), strLanguageStr));
                          }
                          String strAttrs = FrameworkUtil.join(slAttrDisplay, ", ");
                          // Fix for 364337 attribute group value map made local to the if part (tempMap_Cache.get(attrgrpName) == null)
                          HashMap attributeGroupDataMap = new HashMap();
                          attributeGroupDataMap.put("description", strDesc);
                          attributeGroupDataMap.put("attributes", strAttrs);
                          tempMap_Cache.put(attrgrpName, attributeGroupDataMap);
                      } else
                      {
                          // if data for attribute group is null store blank values in the map
                          HashMap attributeGroupDataMap = new HashMap();
                          attributeGroupDataMap.put("description", "");
                          attributeGroupDataMap.put("attributes", "");
                          tempMap_Cache.put(attrgrpName,attributeGroupDataMap);
                      }
                  }
                  HashMap columnDataMap = (HashMap) tempMap_Cache.get(attrgrpName);

                  columnValues.addElement(columnDataMap.get("description"));
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the Attribute Group Description for each of the Attribute Groups in the list
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectList the list of Attribute Groups
     * @return Vector list of Attributes (comma seperated) for each Attribute Group in the list
     * @throws exception if the operation fails
     */
    public Vector getAttributeGroupAttributes(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            String strLanguageStr = ((String) ((HashMap) programMap.get("paramList")).get("languageStr"));
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                HashMap map = (HashMap) itr.next();
                String attrgrpName = (String) map.get("id");
                //Modified the for Bug 354212
                //Check whether that attribute group data is added in the hashmap cache ref variable. if not add it.
                if(tempMap_Cache.get(attrgrpName) == null)
                {
                    //retrieving the attribute group data thro mql and put it in the cache map
                    String  getAttrsQuery   = "list interface $1 select name description attribute dump $2";
                    String data             = MqlUtil.mqlCommand(context, getAttrsQuery, true, attrgrpName, "|").trim();
                    //Modified for bug 359307
                    if(data != null && !"".equals(data))
                    {
                        StringList strlTemp = FrameworkUtil.split(data,"|");
                        String strDesc = (String) strlTemp.get(1);
                        strlTemp.subList(0,2).clear();
                        StringList slAttrDisplay = new StringList(strlTemp.size());
                        for(Iterator attrItr=strlTemp.iterator(); attrItr.hasNext();){
                            slAttrDisplay.addElement(i18nNow.getAttributeI18NString((String) attrItr.next(), strLanguageStr));
                        }						  
                        String strAttrs = FrameworkUtil.join(slAttrDisplay, ", ");
                        // Fix for 364337 attribute group value map made local to the if part (tempMap_Cache.get(attrgrpName) == null)
                        HashMap attributeGroupDataMap = new HashMap();
                        attributeGroupDataMap.put("description", strDesc);
                        attributeGroupDataMap.put("attributes", strAttrs);
                        tempMap_Cache.put(attrgrpName, attributeGroupDataMap);
                    } else
                    {
                        // if data for attribute group is null store blank values in the map
                        HashMap attributeGroupDataMap = new HashMap();
                        attributeGroupDataMap.put("description", "");
                        attributeGroupDataMap.put("attributes", "");
                        tempMap_Cache.put(attrgrpName,attributeGroupDataMap);
                    }
                }

                HashMap columnDataMap = (HashMap) tempMap_Cache.get(attrgrpName);
                columnValues.addElement(columnDataMap.get("attributes"));
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the Attribute Group Assigned Status for each of the Attribute Groups in the list
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectList the list of Attribute Groups
     * @return Vector list of Attribute Group assigned status for each Attribute Group in the list
     * @throws exception if the operation fails
     */
    public Vector getAttributeGroupAssignedStatus(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            String attrGrpName = "";
            String strQuery = "";
            String result = "";
            StringTokenizer tokens;
            String isAssigned = "";
            String strLanguageStr = ((String) ((HashMap) programMap
                    .get("paramList")).get("languageStr"));
            String strCharSet =  ((String) ((HashMap) programMap
                    .get("paramList")).get("charSet"));
      //added for the bug 318209
       /*if(strCharSet == null || strCharSet.trim().equals(""))
            {
                strCharSet = "UTF8";
            }*/
      //till here
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                attrGrpName = (String) map.get("id");
                //attrGrpName = FrameworkUtil.decodeURL(attrGrpName, strCharSet);
                strQuery            = "list interface $1 select derivative dump $2";
                try {
                        result = MqlUtil.mqlCommand(context, strQuery, attrGrpName.trim() ,"|");
                        if (result != null && !"null".equals(result)
                                && !result.equals("")) {
                            result = result.trim();
                        }

                        tokens = new StringTokenizer(result, "|");
                        if (tokens.countTokens() > 0) {
                            isAssigned = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource",new Locale(strLanguageStr),"emxMultipleClassification.Common.Yes");
                        } else {
                            isAssigned = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource",new Locale(strLanguageStr),"emxMultipleClassification.Common.No");
                        }
                } catch (Exception ex) {
                    ex.printStackTrace();
                    throw ex;
                }
                columnValues.addElement(isAssigned);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the list of HTML string for each Attributes Display Name for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - uiType the UI Type
     *  1 - languageStr the language
     * @return Vector list of HTML string for each Attribute Display name
     * @throws exception if the operation fails
     */
    public Vector getAttributeName(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            String strLanguageStr = ((String) ((HashMap) programMap.get("paramList")).get("languageStr"));
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                    map = (HashMap) itr.next();
                    //AttributeType att = new AttributeType((String) map.get("id"));
                    StringBuffer strI18nAttributeName = new StringBuffer();
					
                    // Changes added by PSA11 start(IR-499922-3DEXPERIENCER2018x)
					// Issue particular to French Language.
                    String name = (String)map.get("name");
                    String attributeProperty = "emxFramework.Attribute." + name.replaceAll(" ", "_");
                    String attributeNameFromPropertiesFile = EnoviaResourceBundle.getProperty(context,
                    		"emxFrameworkStringResource",new Locale(strLanguageStr),attributeProperty);
                	if(attributeNameFromPropertiesFile.contains("emxFramework.Attribute.")){
                		attributeNameFromPropertiesFile = name;
                	}
                    /*if(!strLanguageStr.contains("fr-FR")){
                    	strI18nAttributeName.append("<img align=\"top\" SRC=\"images/iconSmallAttribute.gif\"></img><span class='object'>");
                        strI18nAttributeName.append(XSSUtil.encodeForHTML(context, attributeNameFromPropertiesFile));
                        strI18nAttributeName.append("</span>");                 	
                    } else {
                        strI18nAttributeName.append("<img align=\"top\" SRC=\"images/iconSmallAttribute.gif\"></img><span class='object'>");
                        strI18nAttributeName.append(attributeNameFromPropertiesFile);
                        strI18nAttributeName.append("</span>");                    	
                    }*/
                    // Changes added by PSA11 end.
                    columnValues.addElement(attributeNameFromPropertiesFile);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the list of HTML string for each Attributes Actual Name for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - uiType the UI Type
     *  1 - languageStr the language
     * @return Vector list of HTML string for each Attribute Actual name
     * @throws exception if the operation fails
     */
    public Vector getActualAttributeName(Context context, String[] args)throws Exception {
    	Vector columnValues = new Vector();
    	try{
    		HashMap programMap = (HashMap) JPO.unpackArgs(args);
    		MapList objList = (MapList) programMap.get("objectList");
    		HashMap map;
    		Iterator itr = objList.iterator();
    		String name,strEncodedName;
    		String strAttributeImg = "<img align=\"top\" SRC=\"images/iconSmallAttribute.gif\"></img>";
    		while(itr.hasNext()){
    			map = (HashMap) itr.next();
    			name = (String)map.get("name");
    			boolean withLink = ClassificationAttributesCreationUtil.isClassificationAttribute(context, name);
    			if(withLink){		
    				strEncodedName = XSSUtil.encodeForJavaScript(context, name);				  
    				StringBuffer strHTMLStartAnchorTag = new StringBuffer();
    				strHTMLStartAnchorTag.append("<a href=");
    				StringBuffer strHTMLAnchorHrefAttr = new StringBuffer();
    				strHTMLAnchorHrefAttr.append("\"javascript:getTopWindow().showSlideInDialog('emxForm.jsp?form=LBCAttributeEditForm&amp;objectBased=false&amp;postProcessJPO=emxLibraryCentralCreateNewAttributes%3AupdateAttributeData");
    				strHTMLAnchorHrefAttr.append("&amp;formHeader=emxLibraryCentral.Attributes.Edit&amp;HelpMarker=emxhelpclassificationattributecreate&amp;resetForm=true&amp;mode=edit");
    				strHTMLAnchorHrefAttr.append("&amp;StringResourceFileId=emxLibraryCentralStringResource&amp;objectName=");
    				strHTMLAnchorHrefAttr.append(strEncodedName);
    				strHTMLAnchorHrefAttr.append("&amp;submitAction=refreshCaller&amp;AppendParameters=true&amp;CAName=");
    				strHTMLAnchorHrefAttr.append(strEncodedName);
    				strHTMLAnchorHrefAttr.append("&amp;findMxLink=false&amp;windowMode=slidein&amp;suiteKey=LibraryCentral',");
    				strHTMLAnchorHrefAttr.append("'true')\"");
    				strHTMLStartAnchorTag.append(strHTMLAnchorHrefAttr+" >");

    				StringBuffer strHTMLEndAnchorTag = new StringBuffer();
    				strHTMLEndAnchorTag.append("</a>");

    				StringBuffer hrefBuffer = new StringBuffer();
    				hrefBuffer.append(strHTMLStartAnchorTag.toString());
    				hrefBuffer.append(strAttributeImg);
    				hrefBuffer.append(strHTMLEndAnchorTag.toString());
    				hrefBuffer.append(strHTMLStartAnchorTag.toString());
    				hrefBuffer.append("<span class=\"object\">");
    				hrefBuffer.append(XSSUtil.encodeForXML(context, name));
    				hrefBuffer.append("</span>");
    				hrefBuffer.append(strHTMLEndAnchorTag);
    				columnValues.addElement(hrefBuffer.toString());
    			}else{
    				StringBuffer attributeName = new StringBuffer();
    				attributeName.append("<img align=\"top\" SRC=\"images/iconSmallAttribute.gif\"></img><span class='object'>");
    				attributeName.append(XSSUtil.encodeForXML(context, name));
    				attributeName.append("</span>");
    				columnValues.addElement(attributeName.toString());
    			}
    		}
    	}catch (Exception ex){
    		throw new Exception(ex.getMessage());
    	}
    	return columnValues;
    }

   /**
     * Gets the list of HTML string for each Attributes type for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectList the list of Attributes
     * @return Vector list of HTML string for each Attribute type
     * @throws exception if the operation fails
     */
    public Vector getAttributeType(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            String strLanguageStr = ((String) ((HashMap) programMap
                    .get("paramList")).get("languageStr"));
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
        String strI18nAttributeType = i18nNow.getAttributeTypeI18NString(context,att.getName(),strLanguageStr);
                columnValues.addElement(strI18nAttributeType);
                att.close(context);
            }
        } catch (Exception ex) {
      ex.printStackTrace();
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets the list of HTML string for each Attributes description for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectList the list of Attributes
     * @return Vector list of HTML string for each Attribute description
     * @throws exception if the operation fails
     */
    public Vector getAttributeDescription(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
                columnValues.addElement(att.getDescription());
                att.close(context);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    public Vector getAttributeMinimumValue(Context context, String[] args) throws Exception {//bae3
        Vector columnValues = new Vector();
        try {
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
                StringList choices1 = att.getChoices(context);
                att.close(context);
                String retVal = "";
                //if(choices1	== null){
					if(choices1	== null || choices1.isEmpty() ){
        			retVal = MqlUtil.mqlCommand(context, "print attribute $1 select $2 dump", true, (String) map.get("id"), "range");
        			if(!retVal.isEmpty() && retVal.startsWith("between") && retVal.indexOf("inclusive") != retVal.lastIndexOf("inclusive")){
        				retVal = retVal.substring(8);
        				retVal = retVal.substring(0, retVal.indexOf("inclusive")-1);
        			}else{
						retVal = "";
					}
        		}
                columnValues.addElement(retVal);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    
    public Vector getAttributeMaximumValue(Context context, String[] args)
            throws Exception {//bae3
        Vector columnValues = new Vector();
        try {
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
                StringList choices1 = att.getChoices(context);
                att.close(context);
                String retVal = "";
                //if(choices1	== null){
					if(choices1	== null || choices1.isEmpty()){
        			retVal = MqlUtil.mqlCommand(context, "print attribute $1 select $2 dump", true, (String) map.get("id"), "range");
        			if(!retVal.isEmpty() && retVal.startsWith("between") && retVal.indexOf("inclusive") != retVal.lastIndexOf("inclusive")){
        				retVal = retVal.substring(retVal.indexOf("inclusive")+10);
        				retVal = retVal.substring(0, retVal.indexOf("inclusive")-1);
        			}else{
						retVal = "";
					}
        		}
                columnValues.addElement(retVal);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    public Vector getAttributeAuthorisedValues(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
                StringList choices = att.getChoices(context);
                if(choices	!= null && !choices.isEmpty()){
                	String type = att.getDataType();
                	if("real".equals(type)){
                		List<Double> doubleList = new ArrayList();
                		choices.forEach(s->doubleList.add(Double.valueOf(s)));
                		Collections.sort(doubleList);
                		String strVal = doubleList.toString();
                    	columnValues.addElement(strVal.substring(1, strVal.length()-1));
                	}else if("integer".equals(type)){
                		List<Integer> intList = new ArrayList();
                		choices.forEach(s->intList.add(Integer.valueOf(s)));
                		Collections.sort(intList);
                		String strVal = intList.toString();
                    	columnValues.addElement(strVal.substring(1, strVal.length()-1));
                	}else{
                		choices.sort();
                		String strVal = choices.toString();
                    	columnValues.addElement(strVal.substring(1, strVal.length()-1));
                	}
                }else{
                	columnValues.addElement("");
                }
                att.close(context);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    
    public Vector getAttributeIsMultivalue(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap paramList = (HashMap) programMap.get("paramList");
            Locale locale = (Locale) paramList.get("localeObj");
            String stringResourceFileId = (String) paramList.get("StringResourceFileId");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
                if(att.isMultiVal())
                	columnValues.addElement(EnoviaResourceBundle.getProperty(context, stringResourceFileId, locale, "emxLibraryCentral.Range.LbcAttrIsMultivalue.true"));
                else
                	columnValues.addElement(EnoviaResourceBundle.getProperty(context, stringResourceFileId, locale, "emxLibraryCentral.Range.LbcAttrIsMultivalue.false"));
                att.close(context);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    public Vector getAttributeDimension(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap paramList = (HashMap) programMap.get("paramList");
            Locale locale = (Locale) paramList.get("localeObj");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
                String dimensionName = att.getDimension(context).getName();
                String  dimNLSName = EnoviaResourceBundle.getMXI18NString(context, dimensionName, "", locale.getLanguage(), "Dimension");
    			if (dimNLSName.contains("Dimension."))
    				dimNLSName = dimensionName;
                columnValues.addElement(dimNLSName);
                att.close(context);
            }
        } catch (Exception ex) {
        	throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
	
	public Vector getAttributePreferredUnit(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
        	String prefUnitPropValue = getProperty(context, "emxLibraryCentral.Attribute.PreferredUnitPropertyName");
    		if(UIUtil.isNullOrEmpty(prefUnitPropValue))
    			prefUnitPropValue = "ManipulationUnit";
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap paramList = (HashMap) programMap.get("paramList");
            Locale locale = (Locale) paramList.get("localeObj");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                String value = MqlUtil.mqlCommand(context, "print attribute $1 select $2 dump", true, (String) map.get("id"), "property["+prefUnitPropValue+"].value");
                if(!value.isEmpty()){
                	String tempNls = EnoviaResourceBundle.getProperty(context, "emxFrameworkStringResource", locale, "emxFramework.Range.Dimension."+value);
                	if(!tempNls.startsWith("emxFramework."))
                		value = tempNls;
                }                	
                columnValues.addElement(value);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    
    public Vector getAttributeParametric(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
        	String parametricPropValue = getProperty(context, "emxLibraryCentral.Attribute.ParametricPropertyName");
    		if(UIUtil.isNullOrEmpty(parametricPropValue))
    			parametricPropValue = "parametric";
            HashMap programMap = JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap paramList = (HashMap) programMap.get("paramList");
            Locale locale = (Locale) paramList.get("localeObj");
            String stringResourceFileId = (String) paramList.get("StringResourceFileId");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                String value = MqlUtil.mqlCommand(context, "print attribute $1 select $2 dump", true, (String) map.get("id"), "property["+parametricPropValue+"].value");
                if(!value.isEmpty())
                	value = EnoviaResourceBundle.getProperty(context, stringResourceFileId, locale, "emxLibraryCentral.Range.LbcAttrParametric."+value);
                columnValues.addElement(value);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    
	private static String getProperty(Context context, String propKey)
	{
		try{
			return  EnoviaResourceBundle.getProperty(context, propKey);
		}catch (FrameworkException fe){
			return null;
		}
	}
	
    public Vector getAttributePredicate(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
        	String predPropValue = getProperty(context, "emxLibraryCentral.Attribute.PredicatePropertyName");
    		if(UIUtil.isNullOrEmpty(predPropValue))
    			predPropValue = "predicate";
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
            HashMap paramList = (HashMap) programMap.get("paramList");
			Locale locale = (Locale) paramList.get("localeObj");			
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                String value = MqlUtil.mqlCommand(context, "print attribute $1 select $2 dump", true, (String) map.get("id"), "property["+predPropValue+"].value");
                if(!value.isEmpty()){
                	value = LibraryUtil.fetchPredicateDisplayValue(context, value, locale);
                }
                columnValues.addElement(value);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    /**
     * Gets the list of default value for each Attributes for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectList the list of Attributes
     * @return Vector list of default value for each Attributes for UI display
     * @throws exception if the operation fails
     */
    public Vector getAttributeDefaultValue(Context context, String[] args)
            throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            MapList objList = (MapList) programMap.get("objectList");
    		HashMap paramList = (HashMap) programMap.get("paramList");
    		Locale locale = (Locale) paramList.get("localeObj");
    		String timeZone = (String) paramList.get("timeZone");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                AttributeType att = new AttributeType((String) map.get("id"));
                att.open(context);
    			String defValue = att.getDefaultValue();
    			String type = att.getDataType();
    			try{
    				if(defValue != null && !defValue.trim().isEmpty()){
	    				if("timestamp".equals(type)){
	    					defValue = eMatrixDateFormat.getFormattedDisplayDate(defValue, (new Double(timeZone)).doubleValue(), locale);
	    				}else if ("real".equals(type)){ //FUN110052
	    					Dimension attriDim = att.getDimension(context);
	    					if(attriDim != null) {
		    					IKweDictionary dicoKwe = KweInterfacesServices.getKweDictionary();
		    					IKweMagnitude dimension = dicoKwe.findMagnitude(context, attriDim.getName().substring(6));
		    					IKweUnit mksUnit = dimension.getMKSUnit();
		    					String mksUnitLabel = mksUnit.getNLSName(context);
		    					if (mksUnitLabel.startsWith("emxFramework"))
		    						mksUnitLabel = mksUnit.getSymbol();
		    					if(mksUnitLabel.isEmpty())
		    						mksUnitLabel = mksUnit.getName();
		    					defValue = defValue + " " + mksUnitLabel;
	    					}
	    				}
    				}
    			}catch(Exception e){}
    			columnValues.addElement(defValue);
    			att.close(context);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }
    /**
     * Gets the list of HTML CheckBox for each Attributes for UI display
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectName the ObjectName
     *  1 - objectList the list of Attributes
     * @return Vector list of HTML CheckBox for each Attributes for UI display
     * @throws exception if the operation fails
     */
    public Vector getCheckBox(Context context, String[] args) throws Exception {
        Vector columnValues = new Vector();
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            String objectName = (String) programMap.get("objectName");
            MapList objList = (MapList) programMap.get("objectList");
            HashMap map;
            Iterator itr = objList.iterator();
            while (itr.hasNext()) {
                map = (HashMap) itr.next();
                String strAttributeName = (String) map.get("id");
                StringBuffer strCheckBox = new StringBuffer();
                strCheckBox.append("<input type='checkbox' name='emxTableRowId' value='");
                strCheckBox.append(strAttributeName);
                strCheckBox.append("|");
                strCheckBox.append(objectName);
                strCheckBox.append("'>");
                columnValues.addElement(strCheckBox);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return columnValues;
    }

    /**
     * Gets all the attributes associated with a particular Attribute Group.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - objectName the ObjectName
     * @return MapList with the details of Attributes related to the Attribute Group
     * @throws exception if the operation fails
     */
    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getRelatedAttributes(Context context, String[] args)
            throws Exception {
        try {
            HashMap programMap = (HashMap) JPO.unpackArgs(args);
            String strCharSet =  (String )programMap.get("charSet");
            String objectName = (String) programMap.get("objectName");

            // Fixed for bug# 319190
            if(null == strCharSet ) {
              strCharSet = "UTF-8";
            }
          //Added for Bug No 333702 Dated 6/5/2007 Begin
      //Added for Bug No 333702 Dated 6/5/2007 Ends.
            //objectName = FrameworkUtil.decodeURL(objectName, strCharSet);

            String result = "";
            MapList returnList  = new MapList();
            String strQuery     = "";
            strQuery            = "list interface $1 select $2 $3 dump $4";
            try {
                    result = MqlUtil.mqlCommand(context, strQuery, objectName,"attribute.name","attribute.owner",",");
                    if ((result != null) && !(result.equals(""))) {
                        returnList = new MapList();
                        StringList attrNameAndOwnerList = FrameworkUtil.split(result, ",");
                        
                        List attrNames = attrNameAndOwnerList.subList(0, attrNameAndOwnerList.size()/2);
                        List attrOwners = attrNameAndOwnerList.subList(attrNameAndOwnerList.size()/2,attrNameAndOwnerList.size());
                        
                        Iterator attrNameIterator = attrNames.iterator();
                        Iterator attrOwnerIterator = attrOwners.iterator();
                        
                        String attrName = "";
                        String attrOwner = "";
                        while (attrNameIterator.hasNext() && attrOwnerIterator.hasNext()) {
                            HashMap objectMap = new HashMap();
                            attrName = ((String)attrNameIterator.next()).trim();
                            attrOwner = ((String)attrOwnerIterator.next()).trim();
                            if (UIUtil.isNotNullAndNotEmpty(attrName)) {
                            	objectMap.put("name", attrName);
                            	if(UIUtil.isNotNullAndNotEmpty(attrOwner)){
                            		attrName = attrOwner+"."+attrName;
                            	}
                            	objectMap.put("id", attrName);
                                returnList.add(objectMap);
                            }

                        }
                }
            } catch (Exception ex) {
                throw ex;
            }
            return returnList;
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Gets the Attribute Groups By Name
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following list of arguments:
     *  0 - nameMatches the name match string
     *  1 - unused the unused string
     * @return MapList with the details of Attributes that match the criteria
     * @throws exception if the operation fails
     */
    public static MapList getAttributeGroupsByName(Context context,
            String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String nameMatches = (String) paramMap.get("nameMatches");
            boolean unused = ((Boolean) paramMap.get("unused")).booleanValue();
            StringList names  = getAttributeGroupsByName(context, nameMatches, unused);
            return getAttributeGroupData(context, names, nameMatches);
        } catch (Exception ex) {
            throw ex;
        }
    }
    /**
     * Gets the Attribute Groups By Name
     *
     * @param context the eMatrix <code>Context</code> object
     * @param nameMatches the name match string
     * @param unused the unused string
     * @return StringList with the details of Attributes that match the criteria
     * @throws exception if the operation fails
     */
    public static StringList getAttributeGroupsByName(Context context,
            String nameMatches, boolean unused) throws Exception {

        StringList matchingAgNames = getMatchingAttributeGroupNames(context, nameMatches);

        if (unused) {
            // From the above set, remove those which have any derivatives,
            // which means they are "used".  This requires another query.
            StringList usedNames = new StringList();

            String queryUsed    = "list interface $1 select  name immediatederivative dump $2 recordsep $3";
            String usedData     = MqlUtil.mqlCommand(context, queryUsed, true, nameMatches, ",", "|").trim();
            StringList rows     = FrameworkUtil.split(usedData, "|");
            Iterator usedIter   = rows.iterator();
            while (usedIter.hasNext()) {
                String row = (String) usedIter.next();
                if (row.indexOf(",")>0) {
                    String usedName = row.substring(0, row.indexOf(","));
                    usedNames.add(usedName);
                }
            }
            matchingAgNames.removeAll(usedNames);
        }

        return matchingAgNames;
    }

    /**
     * Gets the Attribute Groups By Attribute
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following arguments:
     *     0 - attributePattern string for Attribute Pattern
     *     1 - unused  to search for unused attribute only
     * @return MapList with the details of Attributes that match the criteria
     * @throws exception if the operation fails
     */
    public static MapList getAttributeGroupsByAttribute(Context context,
            String[] args) throws Exception {
        try {
            HashMap paramMap = (HashMap) JPO.unpackArgs(args);
            String attributePattern = (String) paramMap.get("attributePattern");
            boolean unused = ((Boolean) paramMap.get("unused")).booleanValue();
            StringList names = getAttributeGroupsByAttribute(context, attributePattern, unused);
            return getAttributeGroupData(context, names);
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Gets the Attribute Groups By Attribute
     *
     * @param context the eMatrix <code>Context</code> object
     * @param nameMatches the name match string
     * @param unused the unused string
     * @return StringList with the details of Attributes that match the criteria
     * @throws exception if the operation fails
     */
    public static StringList getAttributeGroupsByAttribute(Context context,
            String attributePattern, boolean unused) throws Exception {

        StringList agNames = getAttributeGroupsByName(context, "*", unused);
        if (!unused && attributePattern.equals("*")) {
            // no further filtering necessary
            return agNames;
        }

        // Find all the attributes that match the pattern.
        // Stuff them in a HashSet for fast lookup.
        String attrQuery        = "list attribute $1 ";
        String attrData         = MqlUtil.mqlCommand(context, attrQuery, true, attributePattern).trim();
        StringList attrNames        = FrameworkUtil.split(attrData, "\n");
        HashSet attrSet         = new HashSet();
        attrSet.addAll(attrNames);

        // The next section loops ovar all interfaces, not just AG's, which then
        // needs to be filtered down to just AG's.  Stuff the AG names in a
        // HashSet as well, for quick lookup
        HashSet agSet = new HashSet();
        agSet.addAll(agNames);

        // Get all attributes of all interfaces; no filtering from core available here :(
        // For each interface, see if it in the pre-filtered set above.
        // If it is, see if any of its attributes are in the filtered set.
        // If yes to all that, then add this interface to the result list.
        String ifQuery      = "list interface $1 select name attribute dump $2 recordsep $3";
        String ifData       = MqlUtil.mqlCommand(context, ifQuery, true, "*", ",", "|").trim();
        StringList ifRows   = FrameworkUtil.split(ifData, "|");

        StringList result = new StringList();
        Iterator ifRowIter = ifRows.iterator();
        while (ifRowIter.hasNext()) {
            String row = (String) ifRowIter.next();
            StringList elems = FrameworkUtil.split(row, ",");
            String ifName = (String)elems.remove(0);
            if (agSet.contains(ifName)) {
                // Ok, this interface is in the  "prequalified" AG set
                // Now see if any of the interface's attributes are in the
                // desired set
                Iterator ifAttrIter = elems.iterator();
                while (ifAttrIter.hasNext()) {
                    String attrName = (String) ifAttrIter.next();
                    if (attrSet.contains(attrName)) {
                        result.add(ifName);
                        break; // all we need is one match...
                    }
                }
            }
        }

        return result;
    }


     /**
     * This method Creates  range values for the Attribute Type in Attribute Search Criteria
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - launguagestr
     * @throws Exception if the operation fails
     */

    public HashMap getAttributeTypes(Context context, String[] args)
    throws Exception
    {
        HashMap rangeMap            = new HashMap();
        try
        {
            HashMap programMap              = (HashMap)JPO.unpackArgs(args);
            HashMap requestMap              = (HashMap)programMap.get("requestMap");
            String languagestr              = (String)requestMap.get("languageStr");
            String frameworkI18NResourceBundle  = "emxFrameworkStringResource";

            String attrTypeFilterBoolean    = EnoviaResourceBundle.getProperty(context, frameworkI18NResourceBundle, new Locale(languagestr),"emxFramework.Attribute.Type.boolean");
            String attrTypeFilterTimestamp  = EnoviaResourceBundle.getProperty(context, frameworkI18NResourceBundle, new Locale(languagestr),"emxFramework.Attribute.Type.timestamp");
            String attrTypeFilterInteger    = EnoviaResourceBundle.getProperty(context, frameworkI18NResourceBundle, new Locale(languagestr),"emxFramework.Attribute.Type.integer");
            String attrTypeFilterReal       = EnoviaResourceBundle.getProperty(context, frameworkI18NResourceBundle, new Locale(languagestr),"emxFramework.Attribute.Type.real");
            String attrTypeFilterString     = EnoviaResourceBundle.getProperty(context, frameworkI18NResourceBundle, new Locale(languagestr),"emxFramework.Attribute.Type.string");
            String all                      = EnoviaResourceBundle.getProperty(context, "emxLibraryCentralStringResource", new Locale(languagestr),"emxMultipleClassification.AttributeType.All");
            StringList fieldChoices         = new StringList();
            StringList fieldDisplayChoices  = new StringList();
            fieldChoices.add("*");
            fieldChoices.add("boolean");
            fieldChoices.add("timestamp");
            fieldChoices.add("integer");
            fieldChoices.add("real");
            fieldChoices.add("string");

            fieldDisplayChoices.add(all);
            fieldDisplayChoices.add(attrTypeFilterBoolean);
            fieldDisplayChoices.add(attrTypeFilterTimestamp);
            fieldDisplayChoices.add(attrTypeFilterInteger);
            fieldDisplayChoices.add(attrTypeFilterReal);
            fieldDisplayChoices.add(attrTypeFilterString);

            rangeMap.put("field_choices", fieldChoices);
            rangeMap.put("field_display_choices", fieldDisplayChoices);
        }
        catch(Exception ex)
        {
            throw new FrameworkException(ex.toString());
        }
        return rangeMap;
    }

     /**
     * This method returns Attributes  based on the Search Criteria
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - Attribute Name Matches
     *        1 - Attribute Type
     *        2 - objectId
     *        3 - Unused Attribute
     * @throws Exception if the operation fails
     */

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAttributeList(Context context, String[] args)
    throws Exception {
        MapList mlAttributes        = new MapList();
        MapList mlRelatedAttributes = new MapList();
        MapList mlResutList         = new MapList();
        HashMap hmAttribute         = null;
        try {

            HashMap inputMap        = (HashMap)JPO.unpackArgs(args);
            String strDoFilter      = (String)inputMap.get("filter");
            if(null!= strDoFilter && "true".equalsIgnoreCase(strDoFilter)) {
                String strNameMatches   = (String)inputMap.get("LBCAttributeNameMatches");
                String strTypeFilter    = (String)inputMap.get("LBCAttributeType");
                HashMap requestMap      = (HashMap)inputMap.get("RequestValuesMap");
                String strUnused        = ((String [])requestMap.get("LBCUnusedAttribute"))[0];
                boolean bUnused = true;
                if(null ==strUnused || "".equalsIgnoreCase(strUnused) ||"null".equalsIgnoreCase(strUnused)|| "false".equalsIgnoreCase(strUnused)) {
                    bUnused = false;
                }
                mlAttributes = getAttributesByQuery(context,strNameMatches,strTypeFilter,bUnused);
                String  strAttributeGroupName = (String)inputMap.get("objectName");
                if(null != strAttributeGroupName && !"null".equalsIgnoreCase(strAttributeGroupName) && !"".equalsIgnoreCase(strAttributeGroupName)){
                    String result = "";
                    MapList returnList      = new MapList();
                    String strQuery         = "";
                    strQuery                = "list interface $1 select attribute dump $2";
                    try {
                            result = MqlUtil.mqlCommand(context, strQuery, strAttributeGroupName, ",");
                            if ((result != null) && !(result.equalsIgnoreCase(""))&& !(result.equalsIgnoreCase("null"))) {
                                StringTokenizer tokens = new StringTokenizer(result.trim(), ",");
                                String strAttributeName = "";
                                while (tokens.hasMoreTokens()) {
                                    HashMap objectMap = new HashMap();
                                    strAttributeName = tokens.nextToken();
                                    if (strAttributeName != null && !strAttributeName.trim().equals("")&&!strAttributeName.trim().equals("null")) {
                                        objectMap.put("id", strAttributeName.trim());
                                        mlRelatedAttributes.add(objectMap);
                                    }
                            }
                        }
                    } catch (Exception ex) {
                        throw ex;
                    }
                    Iterator iRelAttributesIter = mlAttributes.iterator();
                    while(iRelAttributesIter.hasNext()) {
                        hmAttribute = (HashMap)iRelAttributesIter.next();
                        if(!mlRelatedAttributes.contains(hmAttribute)) {
                            mlResutList.add(hmAttribute);
                        }
                    }
                } else {
                    mlResutList=mlAttributes;
                }
            }
        }
        catch(Exception ex) {
            throw new FrameworkException(ex.toString());
        }
        return mlResutList;
    }

     /**
     * This method returns Attribute Groups based on the Search Criteria
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - Attribute Group Name/ Attribute
     *        1 - Attribute Group Name Matches
     *        2 - objectId
     *        3 - Unused Attribute
     * @throws Exception if the operation fails
     */

    @com.matrixone.apps.framework.ui.ProgramCallable
    public MapList getAttributeGroupList(Context context, String[] args) throws Exception {

        String strAttributeGroup            = null;
        StringList slAttributeGroups        = new StringList();
        StringList slRelatedAttributeGrops  = new StringList();
        MapList mlResutList                 = new MapList();
        HashMap hmMap                       = null;
        try {
            HashMap inputMap = (HashMap)JPO.unpackArgs(args);
            String strDoFilter = (String)inputMap.get("filter");
            if(null!= strDoFilter && "true".equalsIgnoreCase(strDoFilter)) {
                String strNameOrAttribute   = (String)inputMap.get("LBCAttributeGroupNameOrAttribute");
                String strnameMatches       = (String)inputMap.get("LBCAttributeGroupNameMatches");
                String  objectId            = (String)inputMap.get("objectId");
                String strUnused            = ((String [])(((HashMap)inputMap.get("RequestValuesMap")).get("LBCUnusedAttributeGroup")))[0];
                com.matrixone.apps.classification.Classification cls = (com.matrixone.apps.classification.Classification)DomainObject.newInstance(context, objectId, "Classification");
                slRelatedAttributeGrops                              = cls.getAttributeGroups(context, true);
                boolean bUnused = true;
                if(null ==strUnused || "".equalsIgnoreCase(strUnused)|| "null".equalsIgnoreCase(strUnused) || "false".equalsIgnoreCase(strUnused)) {
                    bUnused = false;
                }
                if(null != strNameOrAttribute && "Name".equalsIgnoreCase(strNameOrAttribute)){
                    slAttributeGroups= getAttributeGroupsByName(context,strnameMatches,bUnused);
                } else {
                    slAttributeGroups= getAttributeGroupsByAttribute(context,strnameMatches,bUnused);
                }
               Iterator iRelAttributeIter = slAttributeGroups.iterator();
               while(iRelAttributeIter.hasNext()) {
                    strAttributeGroup = (String)iRelAttributeIter.next();
                    hmMap = new HashMap();
                    if(!slRelatedAttributeGrops.contains(strAttributeGroup)) {
                        hmMap.put("id", strAttributeGroup);
                        mlResutList.add(hmMap);
                    }
                }
            }
        }
        catch(Exception ex){
            throw new FrameworkException(ex.toString());
        }
        return mlResutList;
    }


     /**
     * This method Creates  range values for the Attribute Group Search
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - launguagestr
     * @throws Exception if the operation fails
     */

    public HashMap getNameMachesList(Context context, String[] args)  throws Exception {
        HashMap rangeMap            = new HashMap();
        try {
            HashMap programMap                  = (HashMap)JPO.unpackArgs(args);
            HashMap requestMap                  = (HashMap)programMap.get("requestMap");
            String languagestr                  = (String)requestMap.get("languageStr");
            String frameworkI18NResourceBundle  = "emxFrameworkStringResource";
            String strAttrName                  = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource",new Locale(languagestr),"emxMultipleClassification.AttributeGroupChooser.Name");
            String strIncludesAttribute         = EnoviaResourceBundle.getProperty(context,"emxLibraryCentralStringResource",new Locale(languagestr),"emxMultipleClassification.AttributeGroupChooser.IncludesAttribute");
            StringList fieldChoices             = new StringList();
            StringList fieldDisplayChoices      = new StringList();
            fieldChoices.add("Name");
            fieldChoices.add("Includes Attribute");
            fieldDisplayChoices.add(strAttrName);
            fieldDisplayChoices.add(strIncludesAttribute);
            rangeMap.put("field_choices", fieldChoices);
            rangeMap.put("field_display_choices", fieldDisplayChoices);
        }
        catch(Exception ex) {
            throw new FrameworkException(ex.toString());
        }
        return rangeMap;
    }

    /**
     * This method returns Attribute Group Name (for view/edit)
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - objectName (Attribute Group Name)
     * @throws Exception if the operation fails
     */
    public String getAGName(Context context, String[] args)
    throws Exception {
        HashMap programMap          = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap          = (HashMap)programMap.get("requestMap");
        String attributeGroupName   = (String)requestMap.get("objectName");
        return attributeGroupName;
    }

    /**
     * This method returns Attribute Group Description (for view/edit)
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - objectName (Attribute Group Name)
     * @throws Exception if the operation fails
     */
    public String getAGDescription(Context context, String[] args)
    throws Exception {
        HashMap programMap          = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap          = (HashMap)programMap.get("requestMap");
        String attributeGroupName   = (String)requestMap.get("objectName");
        AttributeGroup attrGrp      = AttributeGroup.getInstance(context,attributeGroupName);
        return attrGrp.getDescription();
    }

    /**
     * This method returns Attribute Group Originated Date (for view/edit)
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - objectName (Attribute Group Name)
     * @throws Exception if the operation fails
     */
    public String getAGOriginatedDate(Context context, String[] args)
    throws Exception {
        HashMap programMap          = (HashMap)JPO.unpackArgs(args);
        HashMap requestMap          = (HashMap)programMap.get("requestMap");
        String attributeGroupName   = (String)requestMap.get("objectName");
        AttributeGroup attrGrp      = AttributeGroup.getInstance(context,attributeGroupName);
        return attrGrp.getOriginated();
    }


    /**
     * This method creates Attribute Group
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - New Value (Attribute Group Name)
     *        1 - Description (optional)
     *        2 - Attributes (optional)
     * @throws Exception if the operation fails
     */
    public void createAttributeGroup(Context context, String[] args)
    throws Exception
    {
        try
        {
            HashMap programMap      = (HashMap)JPO.unpackArgs(args);
            HashMap paramMap        = (HashMap)programMap.get("paramMap");
            HashMap requestMap      = (HashMap)programMap.get("requestMap");
            String newName          = (String) paramMap.get("New Value");
            String description      = ((String[])requestMap.get("Description"))[0];
            String attributes       = ((String[])requestMap.get("Attributes"))[0];
            description             = FrameworkUtil.findAndReplace(description,"\n","");
            description             = FrameworkUtil.findAndReplace(description,"\r","");
            Classification classification = new Classification();
            classification.createAttributeGroup(context, newName, description, attributes);
        }
        catch(Exception ex)
        {
            throw new FrameworkException(ex.toString());
        }
    }

    /**
     * This method edits Attribute Group Name
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - New Value (Attribute Group Name)
     *        1 - old Value (Attribute Group Name)
     *        2 - Description (optional)
     * @throws Exception if the operation fails
     */
    public void editAttributeGroupName(Context context, String[] args)
    throws Exception
    {
        try
        {
            HashMap programMap      = (HashMap)JPO.unpackArgs(args);
            HashMap paramMap        = (HashMap)programMap.get("paramMap");
            HashMap requestMap      = (HashMap)programMap.get("requestMap");
            String oldAGName        = (String) paramMap.get("Old value");
            String newAGName        = (String) paramMap.get("New Value");
            String description      = ((String[])requestMap.get("Description"))[0];
            Classification classification = new Classification();
            classification.modifyAttributeGroup(context, oldAGName, newAGName, description);
        }
        catch(Exception ex)
        {
            throw new FrameworkException(ex.toString());
        }
    }

    /**
     * This method edits Attribute Group Description
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - New Value (Attribute Group Name)
     *        1 - old Value (Attribute Group Name)
     *        2 - Description (optional)
     * @throws Exception if the operation fails
     */
    public void editAttributeGroupDescription(Context context, String[] args)
    throws Exception
    {
        try
        {
            HashMap programMap      = (HashMap)JPO.unpackArgs(args);
            HashMap paramMap        = (HashMap)programMap.get("paramMap");
            HashMap requestMap      = (HashMap)programMap.get("requestMap");
            String newDescription   = (String) paramMap.get("New Value");
            String agName           = ((String[])requestMap.get("Name"))[0];
            newDescription          = FrameworkUtil.findAndReplace(newDescription,"\n","");
            newDescription          = FrameworkUtil.findAndReplace(newDescription,"\r","");
            if (agName != null && !agName.equals("") && !"null".equals(agName)) {
				ComponentsUtil.checkLicenseReserved(context,LC_PRODUCT_TRIGRAM);
				MqlUtil.mqlCommand(context, "modify interface $1 description $2", true, agName, newDescription);
			} else {
				throw new Exception("Error.AttributeGroup.NameIsNull");
			}
        }
        catch(Exception ex)
        {
            throw new FrameworkException(ex.toString());
        }
    }

    /**
     * This method edits Attribute Group Name/Description
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments
     *        0 - New Value (Attribute Group Name)
     *        1 - old Value (Attribute Group Name)
     *        2 - Description (optional)
     * @throws Exception if the operation fails
     */
    public void cloneAttributeGroup(Context context, String[] args)
    throws Exception
    {
        try
        {
            HashMap programMap      = (HashMap)JPO.unpackArgs(args);
            HashMap paramMap        = (HashMap)programMap.get("paramMap");
            HashMap requestMap      = (HashMap)programMap.get("requestMap");
            String newName          = (String) paramMap.get("New Value");
            String oldName          = ((String[])requestMap.get("objectName"))[0];
            String description      = ((String[])requestMap.get("Description"))[0];
            Classification classification = new Classification();
            classification.cloneAttributeGroup(context, oldName, newName, description);
        }
        catch(Exception ex)
        {
            throw new FrameworkException(ex.toString());
        }
    }
    /***
     * Export the Attribute Group
     * @param context the ENOVIA <code>Context</code> object
     * @param args, String array containing the names of Attribute group
     * @return java.io.File, contains the Exported Attribute Group information
     * @throws Exception
     */

    public File exportAttributeGroup(Context context, String[] args) throws Exception{
       File attributeGrpExportFile=null;
        try{
            HashMap programMap          = (HashMap)JPO.unpackArgs(args);
            String attributeGroupNames[]    =(String[])programMap.get("AGNames");
            //if one attribute group is chosen then the file name would be the
            //name of the attribute group
            if(attributeGroupNames.length == 1){
                String attributeGroupName=attributeGroupNames[0];
                Map packMap=new HashMap();
                packMap.put("objectName",attributeGroupName);
                String packArgs[]=JPO.packArgs(packMap);
                MapList allAttrList=(MapList)JPO.invoke(context,"emxMultipleClassificationAttributeGroup",null,"getRelatedAttributes",packArgs,MapList.class);
                AttributeGroup attrGrp=AttributeGroup.getInstance(context,attributeGroupName);
                String agDescription=attrGrp.getDescription();
                String agOriginatedDate=attrGrp.getOriginated();
                attributeGrpExportFile=attrGrp.createSingleAGXML(context,attributeGroupName,agDescription,agOriginatedDate,allAttrList);

            }
            //if more than one attribute group is selected during export, the file name
            //would be a standard file name, otherwise it will be the name of the attributeGroup
            else{
                AttributeGroup attrGrp=new AttributeGroup();
                attributeGrpExportFile=attrGrp.createMultipleAGXML(context,attributeGroupNames);
            }
        }catch(Exception err){
            err.printStackTrace();
            throw new FrameworkException(err.toString());
        }
        return attributeGrpExportFile;
    }
	
	public void updateAttributeNLS(Context context, String[] args) throws Exception
    {
        try{
            HashMap programMap      = JPO.unpackArgs(args);
    		HashMap paramMap        = (HashMap)programMap.get("paramMap");
            String displayName          = (String) paramMap.get("New Value");
            String attrName         = (String) paramMap.get("objectId");
            
            if(displayName != null ){
				if(displayName.trim().isEmpty())
					displayName = attrName;
    			ClassificationAttributesCreationUtil.updateAttributeNLS(context, attrName, displayName);
    		}
        }
        catch(Exception ex){
        	ex.printStackTrace();
            throw new FrameworkException(ex.toString());
        }
    }
}
