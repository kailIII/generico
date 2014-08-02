<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!-- necesito estas librerias para las seciones -->

<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<acegi:authentication property="principal" var="sgdUsuarioAcegi" />
<fmt:setLocale value="es_SV" scope="session"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
<head>
	<%pageContext.setAttribute("currentYear", new java.text.SimpleDateFormat("yyyy").format(new java.util.Date())); %>
    <title>GENERICO &trade; - ASI2 &copy; <c:out value="${currentYear}" /> </title>
<%--     <script type="text/javascript" src='<spring:url value="/resources/js/extjs-4.0.1/bootstrap.js" />'></script> --%>
<%--     <script type="text/javascript" src='<spring:url value="/resources/js/locale/ext-lang-es.js" />'></script> --%>
	<link type="text/css" href='<spring:url value="/resources/js/extjs-4.0.1/resources/css/my-ext-theme.css" />' rel="stylesheet" />
	<link type="text/css" href='<spring:url value="/resources/css/stylecliente.css" />' rel="stylesheet" />

<%-- 	<script type="text/javascript" src='<spring:url value="/resources/js/generico.js" />'></script> --%>
<%--     <script type="text/javascript" src='<spring:url value="/resources/js/generico/Menu.js" />'></script> --%>
<%--     <script type="text/javascript" src='<spring:url value="/resources/js/generico/gen/EfxKYC.js" />'></script> --%>
<%--     <script type="text/javascript" src='<spring:url value="/resources/js/ux/CheckColumn.js" />'></script> --%>
<%--     <script type="text/javascript" src='<spring:url value="/resources/js/ux/NumericField.js" />'></script> --%>
<%--     <decorator:head /> --%>
</head>
<body>
	<div id="main">
    <div id="links"></div>
	<div id="header">
      <div id="logo">
        <div id="logo_text">
          <h1>Alfinte<span class="alternate_colour">S.A de C.V</span></h1>
          
          <h1><b><acegi:authentication property="principal.username" /></b></h1>
        </div>
      </div>
       <div id="menubar">
        <ul id="menu">
          <!-- put class="tab_selected" in the li tag for the selected page - to highlight which page you're on -->
          <li class="tab_selected"><a href="${pageContext.request.contextPath}/clienteInicio">Productos</a></li>
          <li><a href="${pageContext.request.contextPath}/clienteInicio">Pedidos</a></li>
          <li><a href="${pageContext.request.contextPath}/clienteInicio">perfil</a></li>
          
<!--           cerrar cecion -->

          <li><a href="<c:url value="/j_spring_security_logout" />" >Cerrar Sesion</a></li>
          
        
        </ul>
      </div>
    </div>
    </div>
	<decorator:body />
	
<div id="footer" style="color:#FFFFFF">Copyright &copy; Alfinte S.A de C.V Todos los Derechos Reservados.</div>


</body>
</html>