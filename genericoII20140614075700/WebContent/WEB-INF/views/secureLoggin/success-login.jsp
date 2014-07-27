<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<acegi:authentication property="principal" var="sgdUsuarioAcegi" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Welcome page</title>
</head>
<body>
<h1>Welcome page</h1>
<p>You have successfully logged in.<br/>
<a href="${pageContext.request.contextPath}/index.html">Home page</a><br/></p>
<h4 align="right"><a href="<c:url value="/j_spring_security_logout" />" >Cerrar Sesion</a></h4>


<h1><b><acegi:authentication property="principal.username" /></b></h1>
</body>

</html>