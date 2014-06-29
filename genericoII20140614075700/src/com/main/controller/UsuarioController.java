package com.main.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.generico.exception.AsiWebException;
import com.main.dao.UserDAO;
import com.main.service.UserService;
import com.web.util.GenericoUtil;

@Controller
@RequestMapping("/seguridad/usuario")
public class UsuarioController extends BaseController{

	
		@Autowired
		private UserDAO userRepository;
		
		@Autowired
		private UserService userService;
		
		@RequestMapping(value = "/view")
		public String view(HttpServletRequest request, ModelMap model,HttpServletResponse response){
			try {
//				if(GenericoUtil.hasRole(GenericoUtil.ROLE_ADMINISTRADOR)){
//					model.put("ctgTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findTipoSucursalAllAsArray()));
//					model.put("ctgSubTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findAllSubTipoSucursalAllAsArray()));
//					model.put("ctgSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findAllSucursalAllAsArray()));
//				}
//				else if(GenericoUtil.hasRole(GenericoUtil.ROLE_ADMINISTRADOR_EMPLEADOS)){
//					model.put("ctgTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findTipoSucursalByPrior()));
//					model.put("ctgSubTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findSubtipoSucursalesByPrior()));
//					model.put("ctgSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findSucursalesByPrior()));
//				}
//				model.put("ctgTipoDocumentos", JSONArray.fromObject(DBContext.getCtgCatalogoDao().findAllActivesAsArray(GenericoUtil.CTG_TIPO_DOCUMENTO)));
//				putUsuariosComboToMap(model);
			} catch (NumberFormatException e) {
				logger.error("Exception: ", e);
			} catch (Exception e) {
				logger.error("Exception: ", e);
			}
			return "admin/user/usuario";
		}
	
		@RequestMapping(value = "cambiarClave", method = {RequestMethod.GET, RequestMethod.POST})
		public void cambiarClave(
				HttpServletResponse response,
				@RequestParam(value="claveActual") String claveActual,
				@RequestParam(value="claveNueva") String claveNueva
		){
			Map<String, Object> result = new HashMap<String, Object>();
			try {
				if(StringUtils.trimToEmpty(claveActual).equals(claveNueva)){
					throw new AsiWebException("Contrase\u00F1a ingresada igual a la actual");
				}
				com.main.java.User u = GenericoUtil.getSgdUsuarioFromAcegi();
				String claveActualEnc = claveActual;
				if(claveActualEnc.equals(u.getPassword())){
					u.setPassword(claveActual);
					u.setUsuarioCambiarClave("0");
					userService.update(u);
					result.put(MESSAGE, "La Clave ha sido actualizada con exito.");
					result.put(SUCCESS, true);
				}else{
					result.put(MESSAGE, "La Clave Actual ingresada es incorrecta.");
					result.put(FAILURE, true);
				}
			} catch (AsiWebException e) {
				e.printStackTrace();
				result.put(FAILURE, true);
				result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
				logger.error(e, e);
			}
			serializeObject(result, response);
		}


		@RequestMapping(value = "/read")
		@SuppressWarnings("unchecked")
		public void read(HttpServletResponse response){
//			try {
//				List<Object[]> list = Collections.EMPTY_LIST;
//				list = userRepository.getAllUsuarios();
//				serialize(response, list);
//			} catch (AsiWebException e) {
//				error("Error leyendo registro(s)", "", response, e);
//			}
		}

//		@SuppressWarnings("unchecked")
//		@RequestMapping(value="/update")
//		public void update(HttpServletResponse response, @RequestBody String data) throws Exception {
//			try{
//				List<SgdUsuario> list = (List<SgdUsuario>) JsonUtils.getObjectsFromRequest(data, SgdUsuario.class);
//				for (SgdUsuario sgdUsuario : list) {
//					DBContext.getSgdUsuarioDao().updateEstado(sgdUsuario.getSgdUsuarioId(), sgdUsuario.getSgdUsuarioActivo());
//				}
//				serializeString("[]", response);
//			} catch (Exception e) {
//				error("Error actualizando registro(s)", data, response, e);
//			}
//		}
//
//		@RequestMapping(value="/updateUsuariosCombo", method = {RequestMethod.GET, RequestMethod.POST})
//		public void updateUsuariosCombo(HttpServletResponse response) {
//			Map<String, Object> result = new HashMap<String, Object>();
//			try {
//				putUsuariosComboToMap(result);
//				result.put(SUCCESS, true);
//			} catch (AsiWebException e) {
//				logger.error(e, e);
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
//			}
//			serializeObject(result, response);
//		}
//
		private void serialize(HttpServletResponse response, List<?> list) {
			if (list != null && list.size() > 0) serializeString(JSONArray.fromObject(list).toString(), response);
			else serializeString("[]", response);
		}
//
//		@RequestMapping(value = "/save")
//		public void create(HttpServletRequest request, HttpServletResponse response, ModelMap model,
//				@ModelAttribute("sgdUsuario") SgdUsuario sgdUsuario){
//			Map<String, Object> result = new HashMap<String, Object>();
//			String mensaje="";
//			try {
//			    if(sgdUsuario.getSgdUsuarioId() != null && sgdUsuario.getSgdUsuarioId() > 0){//update
//					if(!sgdUsuario.getSgdUsuarioClave().isEmpty()){
//						sgdUsuario.setSgdUsuarioCambiarClave("1");
//						sgdUsuario.setSgdUsuarioClave(GenericoUtil.getHashedString(sgdUsuario.getSgdUsuarioClave(),sgdUsuario.getSgdUsuarioUsuario().toUpperCase()));
//					}else{
//						if(!"1".equals(sgdUsuario.getSgdUsuarioCambiarClave())) sgdUsuario.setSgdUsuarioCambiarClave("0");
//						if(request.getParameter("claveActual").toString()!=null)
//							sgdUsuario.setSgdUsuarioClave(request.getParameter("claveActual").toString());
//					}
//					//Buscando Hijos para no poder asignarlo.
//					List<SgdUsuario> usersChildren = DBContext.getSgdUsuarioDao().getChildrenUsers(sgdUsuario.getSgdUsuarioId());
//					List<Long> listaUserId2 = new ArrayList<Long>();
//					for( SgdUsuario u : usersChildren ) {
//					    listaUserId2.add(u.getSgdUsuarioId());
//					    buscarRecursivaId(u.getSgdUsuarioId(),listaUserId2);
//				    }
//					int padreExiste=0;
//					for (Long o: listaUserId2 ){
//						if(sgdUsuario.getSgdUsuarioPadre()!=null)
//							if(o.equals(sgdUsuario.getSgdUsuarioPadre().getSgdUsuarioId()))
//								padreExiste=1;
//					}
//					if(padreExiste == 0){
//						getBaseDao().update(sgdUsuario);
//						mensaje="Usuario Actualizado";
//					}
//					else
//						mensaje="El Usuario Padre No Puede ser Asigando.";
//				}
//				else if(DBContext.getSgdUsuarioDao().findUserByUsuario(sgdUsuario.getSgdUsuarioUsuario().toUpperCase()) == 0){//verificando si ya existe
//						sgdUsuario.setSgdUsuarioCambiarClave("1");
//						sgdUsuario.setSgdUsuarioClave(GenericoUtil.getHashedString(sgdUsuario.getSgdUsuarioClave(),sgdUsuario.getSgdUsuarioUsuario().toUpperCase()));
//						getBaseDao().save(sgdUsuario);
//						SgdUsuarioRol sgdUsuarioRol = new SgdUsuarioRol();
//						sgdUsuarioRol.setSgdUsuario(sgdUsuario);
//						sgdUsuarioRol.setSgdRol((CtgCatalogo) DBContext.getCtgCatalogoDao().findByCodigo(GenericoUtil.ROLE_USUARIO_CODIGO));
//						getBaseDao().save(sgdUsuarioRol);
//
//						mensaje="Usuario Ingresado";
//				}
//				else mensaje="El Usuario Ingresado Ya existe.";
//
//			    putUsuariosComboToMap(result);
//				result.put(MESSAGE, mensaje);
//				result.put(SUCCESS, true);
//			}
//			catch (AsiWebException e) {
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
//				logger.error(e, e);
//			}catch (Exception e) {
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.ERROR_MESSAGE);
//				logger.error(e, e);
//				e.printStackTrace();
//			}
//			serializeObject(result, response);
//		}
//
//		@RequestMapping(value = "/delete")
//		public void update(HttpServletRequest request, HttpServletResponse response,ModelMap model,
//				@ModelAttribute("sgdUsuario") SgdUsuario sgdUsuario){
//			Map<String, Object> result = new HashMap<String, Object>();
//			try {
//				List<SgdUsuario> usersChildren = DBContext.getSgdUsuarioDao().getChildrenUsers(sgdUsuario.getSgdUsuarioId());
//				if(usersChildren.size() == 0){
//					getBaseDao().deleteAll(DBContext.getSgdUsuarioDao().getRolesOfUser(sgdUsuario));
//					getBaseDao().delete(sgdUsuario);
//					result.put(MESSAGE, "Usuario Eliminado");
//				}
//				else result.put(MESSAGE, "Usuario Posee Usuarios Hijos No Puede ser Eliminado");
//				putUsuariosComboToMap(result);
//				result.put(SUCCESS, true);
//			}
//			catch (AsiWebException e) {
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
//				logger.error(e, e);
//			}catch (Exception e) {
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.ERROR_MESSAGE);
//				logger.error(e, e);
//			}
//			serializeObject(result, response);
//		}
//
//		public void buscarRecursivaId(Long id,List<Long> listaUserId2) throws AsiWebException{
//			List<SgdUsuario> usersChildren = DBContext.getSgdUsuarioDao().getChildrenUsers(id);
//			for( SgdUsuario u : usersChildren ) {
//			    //System.out.println("Padre2"+u.getSgdUsuarioUsuario());
//			    listaUserId2.add(u.getSgdUsuarioId());
//			    buscarRecursivaId(u.getSgdUsuarioId(),listaUserId2);
//		    }
//		}
//
//		///////////////////////////////////////////////////////////////////////////////////////////////////////
//		public ArrayList<List<String>> buscarChildrensNombresCompletos(Long id) throws AsiWebException
//		{
//			List<SgdUsuario> usersChildren = DBContext.getSgdUsuarioDao().getChildrenUsers(id);
//
//			ArrayList<List<String>> listaResultado = new ArrayList<List<String>>();
//			for( SgdUsuario u : usersChildren ) {
//				List<String> lista = new ArrayList<String>();
//				lista.add(u.getSgdUsuarioId().toString());
//				lista.add(u.getSgdUsuarioNombreCompleto());
//				listaResultado.add(lista);
//				buscarRecursivaNombres(u.getSgdUsuarioId(),listaResultado);
//		    }
////			System.out.println("");
//			return listaResultado;
//		}
//
//		public void buscarRecursivaNombres(Long id,ArrayList<List<String>> listaResultado) throws AsiWebException{
//			List<SgdUsuario> usersChildren = DBContext.getSgdUsuarioDao().getChildrenUsers(id);
//			for( SgdUsuario u : usersChildren ) {
//
//			    List<String> lista = new ArrayList<String>();
//				lista.add(u.getSgdUsuarioId().toString());
//				lista.add(u.getSgdUsuarioNombreCompleto());
//				listaResultado.add(lista);
////			    System.out.println(u.getSgdUsuarioNombreCompleto());
//			    buscarRecursivaNombres(u.getSgdUsuarioId(),listaResultado);
//		    }
//		}
//
//		@RequestMapping(value = "/usuarioHijo")
//		public void usuarioHijo(HttpServletRequest request, HttpServletResponse response,ModelMap model){
//			Map<String, Object> result = new HashMap<String, Object>();
//			try {
//
//				@SuppressWarnings("unused")
//				SgdUsuario u = (SgdUsuario)getBaseDao().findById(SgdUsuario.class, GenericoUtil.getSgdUsuarioIdFromAcegi());
//				putUsuariosComboToMap(result);
//				result.put(SUCCESS, true);
//			}
//			catch (AsiWebException e) {
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
//				logger.error(e, e);
//			}catch (Exception e) {
//				result.put(FAILURE, true);
//				result.put(MESSAGE, GenericoUtil.ERROR_MESSAGE);
//				logger.error(e, e);
//			}
//			serializeObject(result, response);
//		}
//
//		public void putUsuariosComboToMap(Map<String, Object> map) throws AsiWebException{
//			if(GenericoUtil.hasRole(GenericoUtil.ROLE_ADMINISTRADOR)) map.put("sdgUsuariosCombo", JSONArray.fromObject(DBContext.getSgdUsuarioDao().findUsuarios()));
//			else if(GenericoUtil.hasRole(GenericoUtil.ROLE_ADMINISTRADOR_EMPLEADOS)){
//				List<Long> listIds = DBContext.getSgdUsuarioDao().findUsuariosIds(GenericoUtil.getSgdUsuarioIdFromAcegi());
//				map.put("sdgUsuariosCombo", JSONArray.fromObject(DBContext.getSgdUsuarioDao().getAllUsuarios(listIds, true)));
//			}
//		}
//	
//	
//	
//	
//	
	
}
