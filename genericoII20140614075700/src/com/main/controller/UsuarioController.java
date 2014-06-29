package com.main.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.main.java.Producto;

@Controller
@RequestMapping("/seguridad/usuario")
public class UsuarioController extends BaseController{

	
	@RequestMapping(value = "/view")
	public String view(HttpServletRequest request, ModelMap model,HttpServletResponse response){
//		try {
//			if(EquifaxUtil.hasRole(EquifaxUtil.ROLE_ADMINISTRADOR)){
//				model.put("ctgTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findTipoSucursalAllAsArray()));
//				model.put("ctgSubTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findAllSubTipoSucursalAllAsArray()));
//				model.put("ctgSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findAllSucursalAllAsArray()));
//			}
//			else if(EquifaxUtil.hasRole(EquifaxUtil.ROLE_ADMINISTRADOR_EMPLEADOS)){
//				model.put("ctgTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findTipoSucursalByPrior()));
//				model.put("ctgSubTipoSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findSubtipoSucursalesByPrior()));
//				model.put("ctgSucursal", JSONArray.fromObject(DBContext.getCtgSucursalDao().findSucursalesByPrior()));
//			}
//			model.put("ctgTipoDocumentos", JSONArray.fromObject(DBContext.getCtgCatalogoDao().findAllActivesAsArray(EquifaxUtil.CTG_TIPO_DOCUMENTO)));
//			putUsuariosComboToMap(model);
//		} catch (NumberFormatException e) {
//			logger.error("Exception: ", e);
//		} catch (Exception e) {
//			logger.error("Exception: ", e);
//		}
		return "admin/user/usuario";
	}
	
}
