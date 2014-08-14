<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<div style="display: none;">
<div id="header">
<div style='float:left;width:300px;height:40px; 5px 3px no-repeat; display: block;'></div>
<div style='float:left;width:300px;height:40px; display: block;'></div>
<div style="height:40px;float:left;margin-top: 2px">
<div id="divNameApp" style="margin-left: 10px;float:left;">
</div>
<div id="divTitle" style="float:left;font-size: 16px;font-style: italic;font-weight:bold;clear: both;"></div>
</div>
<a class="ch clave" title="Cambiar Clave" href="" title="Cambio de Clave"></a>
<a class="ch cerrar" title="Cerrar Sessi\u00F3n" href="<c:url value="/j_spring_security_logout" />" title="Cerrar Sesi&oacute;n"></a>
<a class="ch inicio" title="Ir a Inicio" href="${contextPath}/home" title="Inicio"></a>
<table cellpadding="0" cellspacing="0" style="float:right;margin-right: 20px;width: 450px;">
<tr>
<td class='tdTitleL'></td>
<td class='tdTitle' style="height: 40px;">
<div style="float: right;clear: both;width:100%;font-size: 22px;font-weight: bold;text-align: right;height: 24px;">
<c:if test="${not empty requestScope.headerTitle}">
${requestScope.headerTitle}
</c:if>
</div>
<div id="clock" style="float: right;"></div>
<div style="float: right;">
USUARIO: <b><acegi:authentication property="principal.username" /></b>
</div>
</td>
<td class='tdTitleR'></td>
</tr>
</table>
</div>
</div>