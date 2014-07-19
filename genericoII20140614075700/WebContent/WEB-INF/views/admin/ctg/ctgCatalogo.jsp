<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
	<head>
		<script type="text/javascript" src="${contextPath}/resources/js/generico/admin/ctg/ctgCatalogo.js"></script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var cfg = {
				esActividadEconomica : '${ctg.ctgCatalogoPadre}' == Efx.constants.codes.ACTIVIDAD_ECONOMICA
										|| '${ctg.ctgCatalogoPadre}' == Efx.constants.codes.ACTIVIDAD_ECONOMICA_JUR
										|| '${ctg.ctgCatalogoHijo}' == "00477"
										|| '${ctg.ctgCatalogoHijo}' == "01262"
										|| '${ctg.ctgCatalogoHijo}' == "01267"
										|| '${ctg.ctgCatalogoHijo}' == "01271",
    			listaPuntajes: <c:out value="${listaPuntajes}" default="[]" escapeXml="false" />
				};
				EfxViewport.init(CtgCatalogo.init('${idCtg}','${ctg.ctgCatalogoNombre}',cfg,'${porcentajePuntuacion}','${ctgFR.ctgCatalogoNombre}'));
			});
		</script>
	</head>
	<body>
		<div id="editor-grid"></div>
	</body>
</html>
