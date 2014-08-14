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
import com.main.java.Producto;
import com.main.service.AsistenciaTecnicaService;
import com.web.security.CustomUser;
import com.web.util.GenericoUtil;

@Controller
@RequestMapping("/empleado")
public class EmpleadoAsistenciaTecnicaController {
	
//	@Autowired
//	private AsistenciaTecnicaDAO asistenciaTecnicaDAO;
	
	@Autowired
	private AsistenciaTecnicaService asistenciaTecnicaService;
	
	@RequestMapping(value = "/inicio")
	public String empleadoInicio() {
		return "empleado/empleadoInicio";
	}
	
	@RequestMapping(value = "/asistenciaTecnica")
	public String asistenciaTecnica(Map<String, Object> map) {
		
		map.put("asistenciaTecnica", new AsistenciaTecnica());
		map.put("asistenciaTecnicaList", asistenciaTecnicaService.listAsistenciaTecnica());
		
		return "empleado/asistenciaTecnica";
	}
	
}
	
	
	
	
	

