<%@page import="com.pomit.util.test"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%
		String str = test.getMessage("test is test");
	
		out.println(str);
		
		String str2 = test.getMessage();
		
		out.println(str2);
	%>
</body>
</html>