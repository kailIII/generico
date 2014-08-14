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
        <!-- insert the page content here -->
        <form:form method="post" action="persona/crearCliente" commandName="sgiPersona">
          <div class="form_settings">
					<div class="wrapper pad_bot1">
						<div class="radio marg_right1">
							
						</div>
						<div class="radio">

						</div><br>
					</div>
					<div class="wrapper">
						Usuario
						<div class="bg">
						<input type="text" title="El nombre debe estar formado unicamente por letras" name="usuario" required placeholder="usuario" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|" /></div>
					</div><br>
					<div class="wrapper">
						Password
						<div class="bg"><input type="password" title="password" name="password" maxlength="25" required placeholder="password" /></div>
					</div><br>
					
					
					
					<div class="wrapper">
						Primer Nombre
						<div class="bg">
						<form:input path="sgiPersonaPrimerNombre" /> 
						</div>
					</div><br>
					<div class="wrapper">
						Segundo Nombre
						<div class="bg">
						<form:input path="sgiPersonaSegundoNombre"/></div>
					</div><br>
					<div class="wrapper">
						Primer Apellido
						<div class="bg">
						<form:input path="sgiPersonaPrimerApellido"/></div>
					</div><br>
					<div class="wrapper">
						Segundo Apellido
						<div class="bg">
						<form:input path="sgiPersonaSegundoApellido" /></div>
					</div><br>
					<div class="wrapper">
						Dui
						<div class="bg">
						<form:input path="sgiPersonaDui"/></div>
					</div><br>
					<!--<div class="wrapper">
						Direccion
						<div class="bg"><input type="text" title="La direccion debe conetener unicamente digitos y letras" name="direccion" required placeholder="direccion" pattern="|^([a-zA-ZñÑáéíóúüç0-9]+\s*)+$"/></div>
					</div>-->
					<div class="wrapper">
						Correo Electronico
						<div class="bg">
						<form:input path="sgiPersonaCorreoElectronico"/></div>
					</div><br>
            <input type="submit" value="Registro Cliente"/>
          </div>
        </form:form>		   
      </div>
    <div id="site_content_bottom"></div>
    </div>
</body>
</html>