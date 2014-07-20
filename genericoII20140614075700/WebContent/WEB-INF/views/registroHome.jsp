<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
        <form action="" method="post">
          <div class="form_settings">
            <form id="form_1" action="" method="post">
					<div class="wrapper pad_bot1">
						<div class="radio marg_right1">
							
						</div>
						<div class="radio">

						</div><br>
					</div>
					<div class="wrapper">
						Usuario
						<div class="bg"><input type="text" title="El nombre debe estar formado unicamente por letras" name="usuario" required placeholder="usuario" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|"/></div>
					</div><br>
					<div class="wrapper">
						Password
						<div class="bg"><input type="password" title="password" name="password" maxlength="25" required placeholder="password" /></div>
					</div><br>
					<div class="wrapper">
						Primer Nombre
						<div class="bg"><input type="text" title="El primer nombre debe estar formado unicamente por letras" name="primer_nombre" required placeholder="Primer Nombre" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|"/></div>
					</div><br>
					<div class="wrapper">
						Segundo Nombre
						<div class="bg"><input type="text" title="El segundo nombre debe estar formado unicamente por letras" name="segundo_nombre" required placeholder="Segundo Nombre" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|"/></div>
					</div><br>
					<div class="wrapper">
						Primer Apellido
						<div class="bg"><input type="text" title="El primer apellido debe estar formado unicamente por letras" name="primer_apellido" required placeholder="Primer Apellido" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|"/></div>
					</div><br>
					<div class="wrapper">
						Segundo Apellido
						<div class="bg"><input type="text" title="El segundo apellido debe estar formado unicamente por letras" name="segundo_apellido" required placeholder="Segundo Apellido" pattern="|^[a-zA-Z ñÑáéíóúüç]*$|"/></div>
					</div><br>
					<div class="wrapper">
						Dui
						<div class="bg"><input type="text"  title="el dui debe tener el siguiente formato: ########-#" name="dui" maxlength="10" required placeholder="dui"  pattern="[0-9]{8}[- -.][0-9]{1}"/></div>
					</div><br>
					<!--<div class="wrapper">
						Direccion
						<div class="bg"><input type="text" title="La direccion debe conetener unicamente digitos y letras" name="direccion" required placeholder="direccion" pattern="|^([a-zA-ZñÑáéíóúüç0-9]+\s*)+$"/></div>
					</div>-->
					<div class="wrapper">
						Correo Electronico
						<div class="bg"><input title="Se necesita una direccion de correo valida" type="email" name="email" required placeholder="email"/></div>
					</div><br>
					<div class="wrapper">
						Telefono
						<div class="bg"><input type="text" title="El telefono debe contener ocho digitos" name="telefono" maxlength="8" required placeholder="Telefono" pattern="|^\d{8}$|"/></div>
					</div><br>
					<div class="wrapper">
						Celular
						<div class="bg"><input type="text" title="El telefono debe contener ocho digitos" name="telefono" maxlength="8" required placeholder="Telefono" pattern="|^\d{8}$|"/></div>
					</div>
					
					<!--<input type="submit" value="Enviar" name="Enviar"/>-->
            <!--<p style="padding-top: 15px"><span>&nbsp;</span>--><br><input class="submit" type="submit" name="contact_submitted" value="Enviar" /></p>
          </div>
        </form>		   
      </div>
    <div id="site_content_bottom"></div>
    </div>
</body>
</html>