import com.dassault_systemes.apps.library.resource.util.ClassificationSubscriptionNotificationJPO;
import com.matrixone.apps.domain.util.FrameworkException;

import matrix.db.Context;

public class emxClassificationSubscriptionNotification_mxJPO {
    
    public void transactionNotification(Context context, String[] args) throws Exception {

            (new ClassificationSubscriptionNotificationJPO()).transactionNotification(context, args);
    }
    
    
      public void setCustomDataforDelete(Context context, String[] args) throws Exception { 
              (new ClassificationSubscriptionNotificationJPO()).setCustomDataforDelete(context, args);
    }
      
      public void connectionNotification(Context context, String[] args) throws Exception {

            (new ClassificationSubscriptionNotificationJPO()).connectionNotification(context, args);
    }

     

}

