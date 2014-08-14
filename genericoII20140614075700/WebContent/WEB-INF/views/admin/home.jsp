<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<acegi:authentication property="principal" var="sgdUsuarioAcegi" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <%pageContext.setAttribute("currentYear", new java.text.SimpleDateFormat("yyyy").format(new java.util.Date())); %>
    <title>KYC - EQUIFAX CENTROAM&Eacute;RICA &copy; <c:out value="${currentYear}" /> </title>
    <link type="text/css" href='${contextPath}/resources/css/generico.css' rel="stylesheet" />
    <link type="text/css" href='${contextPath}/resources/js/extjs-4.0.1/resources/css/my-ext-theme.css' rel="stylesheet" />
	<script type="text/javascript" src="${contextPath}/resources/js/extjs-4.0.1/bootstrap.js"></script>
    <script type="text/javascript" src='${contextPath}/resources/js/locale/ext-lang-es.js'></script>
	<script type="text/javascript" src="${contextPath}/resources/js/generico.js"></script>
	<script type="text/javascript" src="${contextPath}/resources/js/generico/admin/seguridad/sgdCambioClave.js"></script>
	<style type="text/css">
		body{
			background:url(${contextPath}/resources/images/repeatFondo.jpg ) repeat 0 0;
			text-align: center;margin:0px;font-family:arial !important;color: white;font-size: 18px !important;
		}
		.linkOpcion{
		    border: 1px solid white;
		    border-radius: 10px 10px 10px 10px;
		    color: white;
		    display: block;
		    float: left;
		    padding-bottom: 5px;
		    margin-right: 15px;
		    margin-top: 15px;
		    padding-top: 35px;
		    text-align: center;
		    text-decoration: none;
		    width: 300px;
		}
		.linkOpcion:hover{
		    color: white;
			border: 1px solid #aaa;
		}
		.first{margin-top:0px}
	</style>
</head>
<body>
<div style='width:1024px; height:660px; position:absolute; left:50%; top:50%; margin:-384px 0 0 -512px;'>
	<div style='height:100%;width:100%;background:url(${contextPath}/resources/images/fondoLogin.jpg) 0px 0px no-repeat;position: relative'>

		<div style="font-size: 24px;position: absolute; bottom: 15px; left: 50px; font-style: italic; font-family:'century gothic'">ASI2-GRUPO III MODALIDAD VIRTUAL</div>

		<div style='position:absolute;width:174px;height:34px;background:url(${contextPath}/resources/images/alfinte.png) no-repeat;bottom: 38px;left: 53px'></div>


		<div style="width: 100%;clear: both;display: inline-block;">
			<div style="float:right;width: 80px;margin-top: 88px;margin-right: 75px">
				<a class="ch cerrar" href="<c:url value="/j_spring_security_logout" />" title="Cerrar Sesi&oacute;n"></a>
     <%--    <c:if test="${sgdUsuarioAcegi.requiredChangePassword ne '1'}">
                    <a class="ch clave" href="javascript:cambioClave('${contextPath}');" tiNtle="Cambio de Clave"></a>
                    </c:if> --%>
			</div>

			<div style="font-size: 14px;float:left;margin-left:275px;margin-top:88px;text-align: left;font-style: italic;">
				USUARIO: <b><acegi:authentication property="principal.username" /></b>
					<br/>
                NIVEL DE ACCESO: <b><acegi:authentication property="principal.username" /></b>

			</div>
		</div>
		<br />
		
		
		
		
		
		<!-- MI MENU  -->
		<acegi:authorize ifAnyGranted="ROLE_PERSONA_FISICA,ROLE_PERSONA_JURIDICA,ROLE_CONSULTAS">
			<div style="margin: auto;display:table;width: 635px;">
				<acegi:authorize ifAnyGranted="ROLE_PERSONA_FISICA">
				<a class="linkOpcion" href="${contextPath}/kycPersonaFisica/kycBusquedaPersonaFisica">
					PERSONA F&Iacute;SICA
				</a>
				</acegi:authorize>
				<acegi:authorize ifAnyGranted="ROLE_CONSULTAS">
					<a class="linkOpcion" href="${contextPath}/consulta/">CONSULTAS</a>
				</acegi:authorize>
			</div>
		</acegi:authorize>
		
		<!-- 		ADMINISTRACION-->
		<acegi:authorize ifAnyGranted="ROLE_ADMIN">
			<div style="margin: 20px auto 0;display:table;width: 635px;">
				<acegi:authorize ifAnyGranted="ROLE_ADMIN">
					<a class="linkOpcion first" href="${contextPath}/admin">ADMINISTRACI&Oacute;N</a>
				</acegi:authorize>
				<acegi:authorize ifAnyGranted="ROLE_CONFIGURACION ">
					<a class="linkOpcion first" href="${contextPath}/configuracion/">CONFIGURACI&Oacute;N</a>
				</acegi:authorize>
			</div>
		</acegi:authorize>
		<!-- FIN DE MENU  -->
	</div>
</div>
<c:if test="${not empty requestScope.message}">
<div id="message" style="display: none;">${requestScope.message}</div>
</c:if>
</body>
</html>