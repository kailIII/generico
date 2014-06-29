<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="acegi" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7" >
    <%pageContext.setAttribute("currentYear", new java.text.SimpleDateFormat("yyyy").format(new java.util.Date())); %>
    <title>GENERICO &trade; - ASI2 &copy; <c:out value="${currentYear}" /> </title>
    <script type="text/javascript" src='<spring:url value="/resources/js/extjs-4.0.1/bootstrap.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/locale/ext-lang-es.js" />'></script>
    
    <script type="text/javascript" src='<spring:url value="/resources/js/generico/admin/Viewport.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/generico.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/generico/Menu.js" />'></script>
    
    
    <script type="text/javascript" src='<spring:url value="/resources/js/ux/CheckColumn.js" />'></script>
    <script type="text/javascript" src='<spring:url value="/resources/js/ux/NumericField.js" />'></script>
    <link type="text/css" href='<spring:url value="/resources/js/extjs-4.0.1/resources/css/my-ext-theme.css" />' rel="stylesheet" />
    <link type="text/css" href='<spring:url value="/resources/css/generico.css" />' rel="stylesheet" />
    <style type="text/css">
		.infoEncabezado{font-size: 11px;float:right;text-align: left;padding:0px 10px 0 10px}
		.infoEncabezado div{float:right;}
		#header{width: 100%;font-family: arial;color:#676767}
		.x-btn-group-header-body-default-framed{background: url(${contextPath}/resources/images/bgHeaderGroupButton.png) repeat-x;}
		.x-grid-checkheader {
			height: 14px;
			background-image: url('${contextPath}/resources/images/unchecked.gif');
			background-position: 50% -2px;
			background-repeat: no-repeat;
			background-color: transparent;
		}
		.x-grid-checkheader-checked {background-image: url('${contextPath}/resources/images/checked.gif');}
		.x-grid-checkheader-editor .x-form-cb-wrap {text-align: center;}
		.x-toolbar .x-toolbar-separator-horizontal {border-left: 1px solid #C0C0C0;}
		.x-grid-cell{text-transform: uppercase;}
		.x-editor, .x-small-editor, .x-grid-editor, .x-editor-default{z-index: 1900 !important}
		.x-tree-panel a{text-decoration: none;color:black;}
    </style>
    <script type="text/javascript">
		var arrayTrim = new Array();
    	Ext.onReady(function(){
    		Ext.tip.QuickTipManager.init(true);
    		Efx.constants.CONTEXT_PATH = "${contextPath}";
    		Ext.fly("divNameApp").dom.style.fontSize = "28px";
    		Ext.fly("divNameApp").dom.style.marginTop = "18px";
    		Efx.utils.initRolsInArray();
    		Efx.form.overideMarkInvalid();
    	});
    </script>
    <decorator:head></decorator:head>
</head>
<body>
	<input id="hddRoles" type="hidden" value="<acegi:authentication property="principal.authorities" htmlEscape="true"/>" />
	<form id="postMethodSubmit" method="post"></form>
	<page:applyDecorator name="header"/>

	<decorator:body></decorator:body>
</body>
</html>