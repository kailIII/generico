<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Login page</title>
<style>
.error {
	color: red;
}
</style>
</head>
<body>
<div id="contentCenter">
	<h1>Login page</h1>

	<p>
		<c:if test="${error == true}">
			<b class="error">Usuario o Contraseña Invalidos.</b>
		</c:if>
	</p>

	<div class="form_settings">
	<form method="post" action="<c:url value='j_spring_security_check'/>">
		<table align="center">
			<tbody>
				<tr>
					<td>Login:</td>
				<td>
<!-- 					<div class="bg"> -->
					<input type="text" 
					title="El nombre debe estar formado unicamente por letras" name="j_username" 
					id="j_username" required placeholder="usuario" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|"
					size="30" maxlength="40"/>
<!-- 					</div> -->
						
				</td>
				</tr>
				<tr>
					<td>Password:</td>
					<td>
<!-- 					<div class="bg"> -->
					<input type="password" title="password" name="j_password" maxlength="25" required placeholder="password" id="j_password" size="30" maxlength="32"/>
<!-- 					</div> -->
					
						
					</td>
				</tr>
				<tr>
					<td></td>
					<td><input type="submit" value="Login" /></td>
				</tr>
			</tbody>
		</table>
	</form>
	</div>
</div>
</body>
</html>