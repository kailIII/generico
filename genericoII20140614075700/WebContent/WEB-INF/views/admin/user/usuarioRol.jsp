<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
	<head>
		<script type="text/javascript" src="${contextPath}/resources/js/generico/admin/seguridad/usuarioRol.js"></script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var json = Ext.JSON.decode('<c:out value="${jsonReturn}" default="[]" escapeXml="false"/>');
				EfxViewport.init(UsuarioRol.init(json[0]));
			});
		</script>
	</head>
	<body>
		<input id="jsonString" type="hidden" value='${jsonString}'/>
	</body>
</html>
