<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Home page</title>
</head>
<body>
<h1>Home page</h1>
<p>This is Home page. It's available for all users.<br/>
<acegi:authorize ifAnyGranted="ROLE_MODERATOR">
<a href="${pageContext.request.contextPath}/sec/moderation.html">Moderation page</a><br/>
</acegi:authorize>
<acegi:authorize ifAnyGranted="ROLE_ADMIN">
<a href="${pageContext.request.contextPath}/admin/first.html">First Admin page</a><br/>
<a href="${pageContext.request.contextPath}/admin/second.html">Second Admin page</a><br/>
</acegi:authorize>
<acegi:authorize ifAnyGranted="ROLE_EMPLEADO">
<a href="${pageContext.request.contextPath}/productoMain.html">Pantalla de Empleado</a><br/>
</acegi:authorize>
</p>
</body>
</html>