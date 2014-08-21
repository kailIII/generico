<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
       
       
       
        <head>
        
        
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery-1.4.4.min.js"></script>
 		<script type="text/javascript">
    	var jq = jQuery.noConflict();
 		</script>
        
        </head>
        <body>
            <div id="site_content">
      <div id="panel"><img src="${pageContext.request.contextPath}/resources/images/panel.jpg" alt="tree tops" /></div>
      <div class="sidebar">
        <!-- insert your sidebar items here -->
        <h1>Alfinte S.A de C.V</h1>
        <h2>Hector Nahun</h2>
        <h3>2014</h3>
        <p>Este a�o los productos estan de mejor calidad y con un precio exelente.
        
      </div>
        <div id="content">
        <!-- insert the page content here -->
        
        <form:form method="post" action="nuevaAsistenciaTecnica" commandName="asistenciaTecnica">
          <div class="form_settings">
					<div class="wrapper pad_bot1">
						<div class="radio marg_right1">
							
						</div>
						<div class="radio">

						</div><br>
					</div>
					
					
					
				<table border="0">
				  <tr>
				    <td colspan="2" align="center" scope="col"><strong class="boxtitle">ASISTENCIA TECNICA</strong></td>
				  </tr>
				  <tr>
				    <td ><strong>Titulo</strong></td>
				    <td ><form:input path="empleadoAsistenciaTecnicaTitulo" id="empleadoAsistenciaTecnicaTitulo" />&nbsp;</td>

				  </tr>
				  <tr>
				    <td ><strong>Descripci&oacute;n</strong></td>
				    <td ><form:input path="empleadoAsistenciaTecnicaDescripcion" id="empleadoAsistenciaTecnicaDescripcion" />&nbsp;</td>
				  </tr>
				  <tr>
				    <td ><strong>telefono</strong></td>
				    <td ><form:input path="empleadoAsistenciaTecnicaTelefono" id="empleadoAsistenciaTecnicaTelefono"/>&nbsp;</td>
				  </tr>
				  <tr>
				    <td ><strong>Direcci&oacute;n</strong></td>
				    <td ><form:input path="empleadoAsistenciaTecnicaDireccion" id="empleadoAsistenciaTecnicaDireccion"/>&nbsp;</td>
				  </tr>
				    <tr>
				    <td ><strong>Email</strong></td>
				    <td ><form:input path="empleadoAsistenciaTecnicaEmail" id="empleadoAsistenciaTecnicaEmail"/>&nbsp;</td>
				  </tr>
				  
				   <tr>
				    <td colspan="2" align="center"><input type="submit" value="Enviar" onclick="ventanaNueva()"/></td>
				  </tr>
				  
				  
				 
				
				
	
	
				</table>
					
	
          </div>
        </form:form>		   
      </div>
       <div id="site_content_bottom"></div>
    </div>
    
    
     <script type="text/javascript">
					<!--
					
				function ventanaNueva(){ 
				window.open("${contextPath}/pop/ver",'nuevaVentana','width=300, height=400', 'scrollbars = no')
				}

					
				//-->
				</script>
</body>
</html>


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    