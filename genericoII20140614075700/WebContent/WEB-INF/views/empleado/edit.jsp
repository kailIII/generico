<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
	<title>Spring 3 MVC Series - Producto Manager</title>
	<style type="text/css">
		body {
			font-family: sans-serif;
		}
		.data, .data td {
			border-collapse: collapse;
			width: 100%;
			border: 1px solid #aaa;
			margin: 2px;
			padding: 2px;
		}
		.data th {
			font-weight: bold;
			background-color: #5C82FF;
			color: white;
		}
		.error {
			color: #ff0000;
			font-style: italic;
		}
	</style>
</head>
<body>

<h2>Producto Manager</h2>

<form:form method="post" action="edit.html" commandName="editProducto">
	<form:hidden path="idProducto"/> 
	<table>
	<tr>
		<td><form:label path="idProducto"><spring:message text="Id"/></form:label></td>			
		<td><form:input path="idProducto" readonly="true" /> 
	</tr>
	<tr>
		<td><form:label path="nombre"><spring:message text="First Name"/></form:label></td>			
		<td><form:input path="nombre" /> 
		<form:errors path="nombre" cssClass="error"> </form:errors>	</td>
	</tr>
	<tr>
		<td><form:label path="fechaVto"><spring:message text="Fecha Vencimiento"/></form:label></td>
		<td><form:input path="fechaVto" />
	</tr>
	<tr>
		<td><form:label path="descripcion"><spring:message text="Descripcion"/></form:label></td>
		<td><form:input path="descripcion" />
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="submit" value="<spring:message text="Save"/>"/>
		</td>
	</tr>
</table>	
</form:form>

</body>
</html>