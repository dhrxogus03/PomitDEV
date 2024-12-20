
/*
 * ${CLASSNAME}.java
 * Program to migrate Unit of Measure Type and values for existing data.
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import matrix.db.*;
import java.lang.*;

public class emxENGUOMMigrationFindObjects_mxJPO extends emxENGUOMMigrationFindObjectsBase_mxJPO
{

    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public emxENGUOMMigrationFindObjects_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }
}

