/*
 ** ${CLASSNAME}
 **
 ** Copyright (c) 1993-2020 Dassault Systemes. All Rights Reserved.
 ** This program contains proprietary and trade secret information of
 ** Dassault Systemes.
 ** Copyright notice is precautionary only and does not evidence any actual
 ** or intended publication of such program
 */

import java.util.*;
import matrix.db.Context;

/**
 * The <code>emxSortHTMLNumericAlphaBase</code> class contains methods for comparision.
 *
 * @version AEF 10.0.1.0 - Copyright (c) 2005, MatrixOne, Inc.
 */

public class emxSortHTMLNumericAlphaBase_mxJPO extends emxCommonBaseComparator_mxJPO
{

    /** Declare Empty String variable. */
    protected static final String EMPTY_STRING = "";

    /**
     * Constructor.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     */

    public emxSortHTMLNumericAlphaBase_mxJPO (Context context, String[] args)
        throws Exception
    {
		// Constructor
    }

    /**
     * Default Constructor.
     */

    public emxSortHTMLNumericAlphaBase_mxJPO ()
    {
		// Constructor
    }

    /**
     * This method used for comparing objects.
     *
     * @param object1 Map contains column Values
     * @param object2 Map contains column Values
     * @return integer representing the comparision value
     */

    public int compare (Object object1,Object object2)
    {

        int diff = 0;
        int dirMult = 1;
        Long long1  = null,long2 = null;
        boolean isStr1Number = true;
        boolean isStr2Number = true;
        Map map1 = (Map)object1;
        Map map2 = (Map)object2;

          //Get sort info keys
        Map sortKeys = getSortKeys();

        String keyName = (String) sortKeys.get("name");
        String keyDir  = (String) sortKeys.get("dir");

        // values will be retrieved for the lower case column names. This
        // has been done to get actual data displayed in case of html output)
        keyName = keyName.toLowerCase();

          // If the direction is not ascending, then set the
          // multiplier to -1.  Otherwise, set the multiplier to 1.

        if (! "ascending".equals(keyDir))
        {
            dirMult = -1;
        }
        else
        {
            dirMult = 1;
        }

          // Get column values
        String string1 = (String) map1.get(keyName);
        String string2 = (String) map2.get(keyName);

          // If both values are null, then they are the same.
        if ((string1 == null || string1.equals(EMPTY_STRING)) &&
            (string2 == null || string2.equals(EMPTY_STRING)))
        {
            diff = 0;

           // If the first value is null, then it is first.
        }
        else if (string1 == null || string1.equals(EMPTY_STRING))
        {
            diff = -1;
           // If the second value is null, then it is first.
        }
        else if (string2 == null || string2.equals(EMPTY_STRING))
        {
            diff = 1;
           // If both values are non-null, then compare
           // the data differently depending on the data type.
        }

           // Check if string1 is number
        try
        {
            long1 = Long.valueOf(string1);
        }
        catch (Exception ex)
        {
            isStr1Number = false;
        }

           // Check if string2 is number
        try
        {
            long2 = Long.valueOf(string2);
        }
        catch (Exception ex)
        {
            isStr2Number = false;
        }

           // If one of them is number and other string
           // then consider number to be larger then string
        if (isStr1Number != isStr2Number)
        {
            if (isStr1Number)
                diff = -1;
            else
                diff = 1;
        }
        else
        {
            if (isStr1Number)
            {
                   // Compare the long values of the strings.
                diff = long1.compareTo(long2);
            }
            else
            {
                   // Compare the string values.
                diff = string1.compareToIgnoreCase(string2);
            }
        }

        return diff * dirMult ;
    }
}
