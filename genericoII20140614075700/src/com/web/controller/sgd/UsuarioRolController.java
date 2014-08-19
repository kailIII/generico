package com.web.controller.sgd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.generico.dso.sgd.UsuarioService;
import com.generico.exception.AsiWebException;
import com.main.controller.BaseController;
import com.main.dao.RoleDAO;
import com.main.dao.UserDAO;


@Controller
@RequestMapping("/seguridad/rol")
public class UsuarioRolController extends BaseController {
	
	@Autowired
	private UserDAO userDao;
	
	@Autowired
	private RoleDAO roleDAO;
	
	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping(value = "")
	public String view(ModelMap model){
		try {
			HashMap<String, Object> mapModel = new HashMap<String, Object>();

			mapModel.put("jsonString", JSONArray.fromObject(getAllRolesByUser()));
			/*cambiar el grid*/
			mapModel.put("usuarios", JSONArray.fromObject(userDao.getAllActivesUsuarios()));
			mapModel.put("roles", JSONArray.fromObject(roleDAO.findAllroles()));
			model.put("jsonReturn", JSONArray.fromObject(mapModel).toString());
		} catch (AsiWebException e) {
			String message = "Error: " + e;
			logger.error(message, e);
			model.put(ERROR_MESSAGE, message);
		}
		return "admin/user/usuarioRol";
	}

	@RequestMapping(value = "save", method = {RequestMethod.GET, RequestMethod.POST})
	public void save(HttpServletResponse response, @RequestParam Long usrId, @RequestParam String[] rolesCheked){
		HashMap<String, Object> map = new HashMap<String, Object>();
		try {
			usuarioService.updateRolesByUser(usrId, rolesCheked);
			map.put("jsonString", JSONArray.fromObject(getAllRolesByUser()));
			map.put("success", true);
			serializeObject(map, response);
		} catch (NumberFormatException e) {
			error("Error al Guardar Cambios", "", response, e);
			e.printStackTrace();
		} catch (AsiWebException e) {
			error("Error al Guardar Cambios", "", response, e);
			e.printStackTrace();
		}
	}

	public ArrayList<HashMap<String, Long>> getAllRolesByUser() throws AsiWebException{
		List<Object[]> items = userDao.findAllUsuariosRoles();
		HashMap<String, Long> map = null;
		ArrayList<HashMap<String, Long>> lj = new ArrayList<HashMap<String, Long>>();
		for (Object[] objects : items){
			map = new HashMap<String, Long>();
			map.put("usrId", (Long)objects[0]);
			map.put("rolId", (Long)objects[1]);
			lj.add(map);
		}
		return lj;
	}
}
