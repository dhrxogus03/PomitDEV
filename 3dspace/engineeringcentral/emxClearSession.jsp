<%--  emxClearSession.jsp   -  page to clear the session attributeMap .
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of Dassault Systemes
   Copyright notice is precautionary only and does not evidence any actual or
   intended publication of such program
--%>

<%
if(session.getAttribute("attributeMap") != null) {
    session.removeAttribute("attributeMap");
    }
%>
<script>
parent.closeWindow();
</script>
