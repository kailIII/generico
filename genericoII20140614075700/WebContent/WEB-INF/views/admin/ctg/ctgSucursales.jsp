<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<script type="text/javascript" src="${contextPath}/resources/js/generico/admin/ctg/ctgSucursales.js"></script>
		<style>
			label.label_spacing{padding-top: 0px;}
		</style>
		<script type="text/javascript">
			Efx.combos.initTipoSucursalGrid(<c:out value="${ctgTipoSucursal}" default="[]" escapeXml="false" />);
			Efx.combos.initSubTipoSucursalGrid(<c:out value="${ctgSubTipoSucursal}" default="[]" escapeXml="false" />);
			Efx.combos.initSucursalGrid(<c:out value="${ctgSucursal}" default="[]" escapeXml="false" />);			
			Efx.combos.initTipoSucursal(<c:out value="${ctgTipoSucursal2}" default="[]" escapeXml="false" />);
    		Efx.combos.initSubTipoSucursal(<c:out value="${ctgSubTipoSucursal2}" default="[]" escapeXml="false" />);
  		    			
			Ext.onReady(function(){
				EfxViewport.init(CtgSucursales.init('${ctgSubTipoSucursal}','${ctgSucursal}'));
				Ext.getCmp("ctgTipoSucursalForm").hide();
				Ext.getCmp("ctgSubTipoSucursalForm").hide();
				Ext.getCmp("ctgSucursalForm").hide();
				Efx.form.clear("ctgTipoSucursalForm");	
				Efx.form.clear("ctgSubTipoSucursalForm");
				Efx.form.clear("ctgSucursalForm");
				Efx.form.setDisable("ctgTipoSucursalForm");
				Efx.form.setDisable("ctgSubTipoSucursalForm");
				Efx.form.setDisable("ctgSucursalForm");
			});
		</script>
	</head>
	<body>
		
	</body>
</html>