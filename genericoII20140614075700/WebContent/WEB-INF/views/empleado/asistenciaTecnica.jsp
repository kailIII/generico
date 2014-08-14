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
   		
<h3>Producto</h3>
<c:if  test="${!empty asistenciaTecnicaList}">
<table>
<tr>
	<th>Id</th>
	<th>Titulo</th>
	<th>Descripcion</th>
	<th>Telefono</th>
	<th>Direccion</th>
	<th>Email</th>
	<th>Estado</th>
</tr>
<c:forEach items="${asistenciaTecnicaList}" var="asistenciaTecnica">
	<tr>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaId}</td>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaTitulo}</td>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaDescripcion}</td>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaTelefono}</td>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaDireccion}</td>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaEmail}</td>
		<td>${asistenciaTecnica.empleadoAsistenciaTecnicaEstado}</td>
	</tr>
</c:forEach>
</table>
</c:if>
   
   
   
        </body>
    </html>