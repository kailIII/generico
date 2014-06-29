<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<script type="text/javascript" src="${contextPath}/resources/js/generico/admin/seguridad/usuario.js"></script>
		<script type="text/javascript">
			Ext.onReady(function(){
				Efx.combos.initUsuarios(<c:out value="${sdgUsuariosCombo}" default="[]" escapeXml="false" />);
				Efx.combos.initSucursales(<c:out value="${ctgSucursales}" default="[]" escapeXml="false" />);

				Efx.combos.initTipoSucursalGrid(<c:out value="${ctgTipoSucursal}" default="[]" escapeXml="false" />);
				Efx.combos.initSubTipoSucursalGrid(<c:out value="${ctgSubTipoSucursal}" default="[]" escapeXml="false" />);
				Efx.combos.initSucursalGrid(<c:out value="${ctgSucursal}" default="[]" escapeXml="false" />);

				SgdUsuarios.setCtgTipoDocumentos(<c:out value="${ctgTipoDocumentos}" default="[]" escapeXml="false" />);

				EfxViewport.init(SgdUsuarios.init(<c:out value="${sgdUsuarios}" default="[]" escapeXml="false" />));
				Efx.form.setDisable("sgdUsuariosForm");
			});
		</script>
	</head>
	<body>



	</body>
</html>