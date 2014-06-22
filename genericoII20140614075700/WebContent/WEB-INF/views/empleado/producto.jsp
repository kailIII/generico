<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<html>
<head>
	<title>Spring - Product Manager</title>
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

<h2>Product Manager</h2>

<form:form method="post" action="add.html" commandName="producto">

	<table>
	<tr>
		<td><form:label path="nombre"><spring:message text="First Name"/></form:label></td>			
		<td><form:input path="nombre" /> 
		<form:errors path="nombre" cssClass="error"> </form:errors>	</td>
	</tr>
	<tr>
		<td><form:label path="fechaVto"><spring:message text="Fecha Vencimiento"/></form:label></td>
		<td><form:input path="fechaVto" /></td>
	</tr>
	<tr>
		<td><form:label path="descripcion"><spring:message text="Descripcion"/></form:label></td>
		<td><form:input path="descripcion" />
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="submit" value="<spring:message text="Producto"/>"/>
		</td>
	</tr>
</table>	
</form:form>

	
<h3>Producto</h3>
<c:if  test="${!empty productoList}">
<table class="data">
<tr>
	<th>Name</th>
	<th>Fecha Vencimiento</th>
	<th>Descripcion</th>
	<th>Edit</th>
	<th>Delete</th>
	<th>&nbsp;</th>
</tr>
<c:forEach items="${productoList}" var="producto">
	<tr>
		<td>${producto.nombre}</td>
		<td>
		<td>
				<fmt:formatDate value="${producto.fechaVto}" pattern="dd/MM/yyyy"/>
		</td>
		<td>${producto.descripcion}</td>
		<td><a href="update.html?id=${producto.idProducto}">edit</a></td>
		<td><a href="delete.html?id=${producto.idProducto}">delete</a></td>
	</tr>
</c:forEach>
</table>
</c:if>


</body>
</html>
