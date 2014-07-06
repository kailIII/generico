package com.web.controller.ctg;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.generico.dao.ctg.CtgSucursalDao;
import com.generico.dto.ctg.CtgSubTipoSucursal;
import com.generico.dto.ctg.CtgSucursal;
import com.generico.dto.ctg.CtgTipoSucursal;
import com.generico.exception.AsiWebException;
import com.main.controller.BaseController;
import com.web.util.GenericoUtil;


@Controller
@RequestMapping("/sucursal")
public class CtgSucursalesController extends BaseController {

	@Autowired
	private CtgSucursalDao ctgSucursalDao;
	
	@RequestMapping(value = "/view")
	public String view(HttpServletRequest request, ModelMap model){
		try {

			model.put("ctgTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findTipoSucursalAllAsArray()));
			model.put("ctgSubTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSubTipoSucursalAllAsArray()));
			model.put("ctgSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSucursalAllAsArray()));

			model.put("ctgTipoSucursal2", JSONArray.fromObject(ctgSucursalDao.findTipoSucursalAllAsArray()));
			model.put("ctgSubTipoSucursal2", JSONArray.fromObject(ctgSucursalDao.findAllSubTipoSucursalAllAsArray()));

		} catch (NumberFormatException e) {
			logger.error("Exception: ", e);
		} catch (Exception e) {
			logger.error("Exception: ", e);
		}
		return "admin/ctg/ctgSucursales";
	}



//	@RequestMapping(value = "/readDepto")
//	public void read(HttpServletRequest request,HttpServletResponse response,
//			@PathVariable String filtro1,
//			@PathVariable String filtro2){
//		try
//		{
//			String jsonString = DBContext.getCtgProvinciaDao().findAllActivesAsArray().toString();
//			serializeString(jsonString, response);
//		}catch(Exception e)
//		{
//
//		}
//	}



	@RequestMapping(value = "/create")
	public void create(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			@ModelAttribute("ctgSucursal") CtgSucursal ctgSucursal,
			@ModelAttribute("ctgSubTipoSucursal") CtgSubTipoSucursal ctgSubTipoSucursal,
			@ModelAttribute("ctgTipoSucursal") CtgTipoSucursal ctgTipoSucursal
			){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			if(request.getParameter("tipo").toString().equalsIgnoreCase("3"))
				ctgSucursalDao.saveSucursal(ctgSucursal);
			if(request.getParameter("tipo").toString().equalsIgnoreCase("2")){
				ctgSucursalDao.saveSucursal(ctgSubTipoSucursal);
			}
			if(request.getParameter("tipo").toString().equalsIgnoreCase("1"))
				ctgSucursalDao.saveSucursal(ctgTipoSucursal);
			result.put(MESSAGE, "Informaci&oacute;n Ingresada");
			result.put(SUCCESS, true);

		result.put("ctgTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findTipoSucursalAllAsArray()));
		result.put("ctgSubTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSubTipoSucursalAllAsArray()));
		result.put("ctgSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSucursalAllAsArray()));
		}
		catch (AsiWebException e) {
			result.put(FAILURE, true);
			result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
			logger.error(e, e);
		}catch (Exception e) {
			result.put(FAILURE, true);
			result.put(MESSAGE, GenericoUtil.ERROR_MESSAGE);
			logger.error(e, e);
		}
		serializeObject(result, response);
	}

	@RequestMapping(value = "/update")
	public void update(HttpServletRequest request, HttpServletResponse response,ModelMap model,
			@ModelAttribute("ctgSucursal") CtgSucursal ctgSucursal,
			@ModelAttribute("ctgSubTipoSucursal") CtgSubTipoSucursal ctgSubTipoSucursal,
			@ModelAttribute("ctgTipoSucursal") CtgTipoSucursal ctgTipoSucursal
			){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			if(request.getParameter("tipo").toString().equalsIgnoreCase("3"))
				ctgSucursalDao.updateSucursal(ctgSucursal);
			if(request.getParameter("tipo").toString().equalsIgnoreCase("2"))
				ctgSucursalDao.updateSucursal(ctgSubTipoSucursal);
			if(request.getParameter("tipo").toString().equalsIgnoreCase("1"))
				ctgSucursalDao.updateSucursal(ctgTipoSucursal);
			result.put(MESSAGE, "Informaci&oacute;n Actualizada");
			result.put(SUCCESS, true);

		result.put("ctgTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findTipoSucursalAllAsArray()));
		result.put("ctgSubTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSubTipoSucursalAllAsArray()));
		result.put("ctgSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSucursalAllAsArray()));

		}
		catch (AsiWebException e) {
			result.put(FAILURE, true);
			result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
			logger.error(e, e);
		}catch (Exception e) {
			result.put(FAILURE, true);
			result.put(MESSAGE, GenericoUtil.ERROR_MESSAGE);
			logger.error(e, e);
		}
		serializeObject(result, response);
	}


	@RequestMapping(value = "/delete")
	public void delete(HttpServletRequest request,HttpServletResponse response, ModelMap model,
			@ModelAttribute("ctgSucursal") CtgSucursal ctgSucursal,
			@ModelAttribute("ctgSubTipoSucursal") CtgSubTipoSucursal ctgSubTipoSucursal,
			@ModelAttribute("ctgTipoSucursal") CtgTipoSucursal ctgTipoSucursal
			){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			if(request.getParameter("tipo").toString().equalsIgnoreCase("3"))
				ctgSucursalDao.deleteSucursal(ctgSucursal);
			if(request.getParameter("tipo").toString().equalsIgnoreCase("2"))
				ctgSucursalDao.deleteSucursal(ctgSubTipoSucursal);
			if(request.getParameter("tipo").toString().equalsIgnoreCase("1"))
				ctgSucursalDao.deleteSucursal(ctgTipoSucursal);
			result.put(MESSAGE, "Informaci&oacute;n Eliminada");
			result.put(SUCCESS, true);
			result.put("ctgTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findTipoSucursalAllAsArray()));
			result.put("ctgSubTipoSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSubTipoSucursalAllAsArray()));
			result.put("ctgSucursal", JSONArray.fromObject(ctgSucursalDao.findAllSucursalAllAsArray()));


		}
		catch (AsiWebException e) {
			result.put(FAILURE, true);
			result.put(MESSAGE, GenericoUtil.getExceptionMessage(e));
			logger.error(e, e);
		}catch (Exception e) {
			result.put(FAILURE, true);
			result.put(MESSAGE, "Registro no puede ser eliminado porque se encuentra asociado a una sucursal o usuario");
			logger.error(e, e);
		}
		serializeObject(result, response);
	}

}
