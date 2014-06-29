<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<acegi:authentication property="principal" var="sgdUsuarioAcegi" />
<html>
<head>
    <script type="text/javascript">
    	Ext.onReady(function(){EfxViewport.init("", '${contextPath}');});
    </script>
</head>
<body>
</body>
</html>