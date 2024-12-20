/*
 * emxEngineeringLeadTimeAttributeMigration.java
 * program migrates Existing PUEECO and its appicability attribute to NE object and set the expression
 *
 * Copyright (c) 1992-2020 Dassault Systemes.
 *
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of
 * MatrixOne, Inc.  Copyright notice is precautionary only and does
 * not evidence any actual or intended publication of such program.
 *
 */

import matrix.db.Context;

/**
 * @version AEF 10.5 - Copyright (c) 2002, MatrixOne, Inc.
 */
public class emxEngineeringisVPMVisibleAttributeMigration_mxJPO extends emxEngineeringisVPMVisibleAttributeMigrationBase_mxJPO
{

    /**
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds no arguments
     * @throws Exception if the operation fails
     * @since AEF Rossini
     * @grade 0
     */
    public emxEngineeringisVPMVisibleAttributeMigration_mxJPO (Context context, String[] args)
        throws Exception
    {
      super(context, args);
    }
}
