<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<div id="site_content">
      <div id="panel"><img src="resources/images/panel.jpg" alt="tree tops" /></div>
      <div class="sidebar">
        <!-- insert your sidebar items here -->
        <h1>Alfinte S.A de C.V</h1>
        <h2>Hector Nahun</h2>
        <h3>2014</h3>
        <p>Este año los productos estan de mejor calidad y con un precio exelente.
        
      </div>
      <div id="content">
		<!--insert the page content here -->
		
        <form:form method="post" action="persona/crearCliente" commandName="sgiPersona">
        
<%--         <form:form method="post" action="nuevaAsistenciaTecnica" commandName="asistenciaTecnica"> --%>
        
        
        
          <div class="form_settings">
					<div class="wrapper pad_bot1">
						<div class="radio marg_right1">
							
						</div>
						<div class="radio">

						</div><br>
					</div>
					
<!-- 					<div class="wrapper"> -->
<!-- 						Usuario -->
<!-- 						<div class="bg"> -->
<!-- 						<input type="text" title="El nombre debe estar formado unicamente por letras" name="usuario" required placeholder="usuario" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|" /></div> -->
<!-- 					</div><br> -->
<!-- 					<div class="wrapper"> -->
<!-- 						Password -->
<!-- 						<div class="bg"><input type="password" title="password" name="password" maxlength="25" required placeholder="password" /></div> -->
<!-- 					</div><br> -->
					
					
					<table border="0">
				  <tr>
				    <td colspan="2" align="center" scope="col"><strong class="boxtitle">REGISTRO</strong></td>
				  </tr>
				  <tr>
				    <td ><strong>Primer normbre</strong></td>
				    <td ><form:input path="PersonaPrimerNombre" id="PersonaPrimerNombre" />&nbsp;</td>

				  </tr>
				  <tr>
				    <td ><strong>segundo normbre</strong></td>
				    <td ><form:input path="PersonaSegundoNombre" id="PersonaSegundoNombre" />&nbsp;</td>

				  </tr>
				  <tr>
				    <td ><strong>Primer apellido</strong></td>
				    <td ><form:input path="PersonaPrimerApellido" id="PersonaPrimerApellido" />&nbsp;</td>
				  </tr>
				  <tr>
				    <td ><strong>segundo apellido</strong></td>
				    <td ><form:input path="PersonaSegundoApellido" id="PersonaSegundoApellido" />&nbsp;</td>
				  </tr>
				  <tr>
				    <td ><strong>Direcci&oacute;n</strong></td>
				    <td ><form:input path="personaDireccion" id="personaDireccion"/>&nbsp;</td>
				  </tr>
				    <tr>
				    <td ><strong>Email</strong></td>
				    <td ><form:input path="personaEmail" id="personaEmail"/>&nbsp;</td>
				  </tr>
				  
				  <tr>
				<td><strong>Departamento</strong></td>
				<td><form:select path="ctgDepartamento" items="${busquedaDepto}"/></td>
				</tr>
				 <tr>
				 
				  <tr>
				<td><strong>Municipio</strong></td>
				<td><form:select path="ctgMunicipio" items="${busquedaMuni}"/></td>
				</tr>
				 <tr>
				 
				    <td ><strong>usuario</strong></td>
				    <td ><form:input path="login" id="login"/>&nbsp;</td>
				  </tr>
				   <tr>
				    <td ><strong>contras&ñacutea</strong></td>
				    <td ><form:input path="password" id="password"/>&nbsp;</td>
				  </tr>
				  
				   <tr>
				    <td colspan="2" align="center"><input type="submit" value="Enviar" /></td>
				  </tr>
				  
	
				</table>
					
				
					
          </div>
       </form:form>
      </div>
    <div id="site_content_bottom"></div>
    </div>
</body>
</html>