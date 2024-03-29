package com.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.generico.exception.AsiWebException;
import com.generico.form.dto.RegistroCliente;
import com.main.cliente.dto.SgiPersona;
import com.main.dao.SgiPersonaDao;
import com.main.java.CtgDepartamento;
import com.main.java.CtgMunicipio;
import com.web.util.GenericoUtil;

@Controller
@RequestMapping("/persona")
public class SgiPersonaController {
	
	@Autowired
	private SgiPersonaDao sgiPersonaDao;
	
//	@RequestMapping(value = "/crearCliente", method=RequestMethod.POST)
//	public String crearCliente(@ModelAttribute("sgiPersona") SgiPersona sgiPersona, BindingResult result) {
//		try {
//			GenericoUtil genericoUtil = new GenericoUtil();
//					genericoUtil.getCtgSucursalIdFromAcegi();
//			sgiPersonaDao.savePersona(sgiPersona);
//		} catch (AsiWebException e) {
//			e.printStackTrace();
//		}
//		return "redirect:clienteHome";
//	}
	
	
	@RequestMapping(value = "/crearCliente", method=RequestMethod.POST)
	public String crearCliente(@ModelAttribute("sgiPersona") RegistroCliente registroCliente, BindingResult result){
	
//		try {
			GenericoUtil genericoUtil = new GenericoUtil();
					genericoUtil.getCtgSucursalIdFromAcegi();
//			sgiPersonaDao.savePersona(sgiPersona);
//		} catch (AsiWebException e) {
//			e.printStackTrace();
//		}
		return "redirect:/user-login";
	}
	
}
	
	
	
	
	
	

