package com.main.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.generico.dto.ctg.CtgCatalogo;
import com.generico.exception.AsiWebException;
import com.main.cliente.dto.SgiPersona;
import com.main.dao.AsistenciaTecnicaDAO;
import com.main.dao.ClienteDAO;
import com.main.dao.SgiPersonaDao;
import com.main.java.AsistenciaTecnica;
import com.main.java.Cliente;
import com.main.java.Empleado;
import com.web.security.CustomUser;
import com.web.util.GenericoUtil;

@Controller
@RequestMapping("/cliente")
public class ClienteAsistenciaTecnicaController {
	
	@Autowired
	private AsistenciaTecnicaDAO asistenciaTecnicaDAO;
	
	@Autowired
	private ClienteDAO clienteDAO;
	
	@RequestMapping(value = "/asistenciaTecnica")
	public String crearCliente(Map<String, Object> map) {
		map.put("asistenciaTecnica", new AsistenciaTecnica());
//		try {
//			GenericoUtil genericoUtil = new GenericoUtil();
//					genericoUtil.getCtgSucursalIdFromAcegi();
//			sgiPersonaDao.savePersona(sgiPersona);
//		} catch (AsiWebException e) {
//			e.printStackTrace();
//		}
		return "cliente/clienteAsistenciaTecnica";
	}
	
	
	
	@RequestMapping(value = "/nuevaAsistenciaTecnica", method=RequestMethod.POST)
	public String crearAsistencia(@ModelAttribute("asistenciaTecnica") AsistenciaTecnica asistenciaTecnica, BindingResult result) {
		try {
			CustomUser customUser = GenericoUtil.getCustomUserFromAcegi();
			asistenciaTecnica.setCliente(customUser.getCliente());
			asistenciaTecnica.setEmpleadoAsistenciaTecnicaEstado("1");
			asistenciaTecnicaDAO.saveAsistenciaTecnica(asistenciaTecnica);

			
		} catch (AsiWebException e) {
			e.printStackTrace();
		}
		return "cliente/clienteInicio";
		
	}
	
	
	
	
	
}
	
	
	
	
	

