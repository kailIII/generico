<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:setLocale value="es_SV" scope="session"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
<head>
	<%pageContext.setAttribute("currentYear", new java.text.SimpleDateFormat("yyyy").format(new java.util.Date())); %>
    <title>GENERICO &trade; - ASI2 &copy; <c:out value="${currentYear}" /> </title>
    <script type="text/javascript" src='<spring:url value="/resources/js/extjs-4.0.1/bootstrap.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/locale/ext-lang-es.js" />'></script>
<link type="text/css" href='<spring:url value="/resources/js/extjs-4.0.1/resources/css/my-ext-theme.css" />' rel="stylesheet" />

	<script type="text/javascript" src='<spring:url value="/resources/js/generico.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/generico/Menu.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/generico/gen/EfxKYC.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/ux/CheckColumn.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/ux/NumericField.js" />'></script>
    <decorator:head />
</head>
<body>
    <h1>Header</h1>
    <h4 align="right"><a href="<c:url value="/j_spring_security_logout" />" >Cerrar Sesion</a></h4>
    <p><b>Navigation -> 
    
    <a href="${pageContext.request.contextPath}/index.html">HOME</a> /
    <a href="${pageContext.request.contextPath}/sobreNosotros.html">ACERCA DE NOSOTROS</a> /
    <a href="${pageContext.request.contextPath}/empPro.html">ACERCA DE NOSOTROS</a> /
    <a href="${pageContext.request.contextPath}/user-login.html">Inicar Sesion</a>
<%--     <a href="${pageContext.request.contextPath}/sec/moderation.html">Moderation page</a> /  --%>
<%--     <acegi:authorize ifAnyGranted="ROLE_ADMIN"> --%>
<%-- 	<a href="${pageContext.request.contextPath}/admin/first.html">First Admin page</a> /  --%>
<%-- 	<a href="${pageContext.request.contextPath}/admin/second.html">Second Admin page</a> / --%>
<%-- 	</acegi:authorize>  --%>
<%-- 	<acegi:authorize ifAnyGranted="ROLE_EMPLEADO"> --%>
<%-- 	<a href="${pageContext.request.contextPath}/productoMain.html">Pantalla de Empleado</a> --%>
<%-- 	</acegi:authorize> --%>
    
    </b></p>
<%--     <page:applyDecorator name="header"/> --%>
    <hr />
    <decorator:body />
    <hr />
    <h1><b>Footer</b></h1>
</body>
</html>