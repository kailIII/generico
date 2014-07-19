package com.web.controller.ctg;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.generico.dao.ctg.CtgCatalogoDao;
import com.generico.dto.ctg.CtgCatalogo;
import com.generico.exception.AsiWebException;
import com.main.controller.BaseController;
import com.web.util.GenericoUtil;
import com.web.util.JsonUtils;


@Controller
@RequestMapping("/catalogo")
public class CtgCatalogoController extends BaseController {
	
	@Autowired
	private CtgCatalogoDao ctgCatalogoDao;
	

	@RequestMapping(value = "/view")
	public String view(HttpServletRequest request, ModelMap model, @RequestParam String ctgCatalogoCodigo){
		try {
			GenericoUtil genericoUtil = new GenericoUtil();
			genericoUtil.getCustomUserFromAcegi();
			CtgCatalogo catalogo = ctgCatalogoDao.findByCodigo(ctgCatalogoCodigo);
			model.put("idCtg", ctgCatalogoCodigo);
			model.put("ctg", catalogo);
//			model.put("listaPuntajes", JSONArray.fromObject(DBContext.getCtgCatalogoDao().findAllActivesAsArray(EquifaxUtil.CTG_TIPO_PUNTAJES)));
//			 String ctgCodigo =request.getParameter("ctgCodigo");
//			 if("1".equals(ctgCodigo)){
//				 CtgCatalogo catalogoFactoresRiesgo = DBContext.getCtgCatalogoDao().findByCodigo(EquifaxUtil.CTG_FACTORES_RIESGO);
//				 CtgMatrizGlobal matriz = (CtgMatrizGlobal) DBContext.getCtgMatrizDao().findByCtgCatalogo(catalogoFactoresRiesgo.getCtgCatalogoId());
//				 model.put("ctgFR", catalogoFactoresRiesgo);
//				 if(matriz!=null){
//					@SuppressWarnings("unused")
//					double porcentaje = Double.parseDouble(EquifaxUtil.trimToZero(matriz.getCtgMatrizGlobalPuntuacion()));
//					//model.put("porcentajePuntuacion", EquifaxUtil.decimalFormat2Decimals.format(porcentaje));
//				}
//			 }
		} catch (NumberFormatException e) {
			logger.error("Exception: ", e);
		} catch (Exception e) {
			logger.error("Exception: ", e);
		}
		return "admin/ctg/ctgCatalogo";
	}

	@RequestMapping(value = "/read/{idCtg}")
	public void read(HttpServletResponse response, @PathVariable String idCtg){
		try {
			getCatalogoByCtgId(response, ctgCatalogoDao.findAll(idCtg));
		} catch (AsiWebException e) {
			error("Error leyendo registro(s)", "", response, e);
		}
	}

	private void getCatalogoByCtgId(HttpServletResponse response, List<?> list) {
		try {
			if (list != null && list.size() > 0) {
//				System.out.println(list.getClass().getFields());
				serializeString(JSONArray.fromObject(list).toString(), response);
			}
			else serializeString("[]", response);
		}
		catch (Exception e) {
			error("Error creando registro(s)", "", response, e);
		}
	}

	@RequestMapping(value="/create/{idCtg}")
	public void create(HttpServletResponse response, @PathVariable String idCtg, @RequestBody String data) throws Exception {
		try{
			getCatalogoByCtgId(response, ctgCatalogoDao.saveOrUpdatee(data, CtgCatalogo.class));
		} catch (Exception e) {
			error("Error agregando registro(s)", data, response, e);
		}
	}

	@RequestMapping(value="/update/{idCtg}")
	public void update(HttpServletResponse response, @PathVariable String idCtg, @RequestBody String data) throws Exception {
		try{
			getCatalogoByCtgId(response, ctgCatalogoDao.saveOrUpdatee(data, CtgCatalogo.class));
		} catch (Exception e) {
			error("Error actualizando registro(s)", data, response, e);
		}
	}

	@RequestMapping(value="/delete/{idCtg}")
	public void delete(HttpServletResponse response, @PathVariable String idCtg, @RequestBody String data) throws Exception {
		try{
			List<?> list =JsonUtils.getObjectsFromRequest(data, CtgCatalogo.class);
			ctgCatalogoDao.deleteAl(list);
			getCatalogoByCtgId(response, list);
		} catch (Exception e) {
			error("Registro no puede ser eliminado, porque se encuentra asociado a un Formulario", data, response, e);
		}
	}



    public void error(String message, Object data, HttpServletResponse response, Exception e){
		e.printStackTrace();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", Boolean.FALSE);
		result.put(ERROR_MESSAGE, message);
		serializeObject(result, response);
		logger.error(message + ": " + e, e);
    }

}
