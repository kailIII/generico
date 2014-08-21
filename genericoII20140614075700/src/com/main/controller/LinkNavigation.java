package com.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.generico.dao.ctg.CtgMunicipioDao;
import com.generico.form.dto.RegistroCliente;
import com.main.cliente.dto.SgiPersona;
import com.main.dao.SgiPersonaDao;
import com.main.java.CtgDepartamento;
import com.main.java.CtgMunicipio;
import com.web.util.GenericoUtil;

@Controller
public class LinkNavigation extends GenericoUtil{
 
	@Autowired
	private SgiPersonaDao sgiPersonaDao;
	
	@Autowired
	private CtgMunicipioDao ctgMunicipioDao;
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public ModelAndView homePage() {
//		return new ModelAndView("index");
		return new ModelAndView("secureLoggin/login-form");
	}
	
	@RequestMapping(value="/sobreNosotros", method=RequestMethod.GET)
	public ModelAndView aboutUs() {
		boolean algo = hasRole("ROLE_ADMIN");
		return new ModelAndView("sobreNosotros");
	}

	@RequestMapping(value="/index", method=RequestMethod.GET)
	public ModelAndView indexPage() {
		return new ModelAndView("home");
	}

	@RequestMapping(value="/sec/moderation", method=RequestMethod.GET)
	public ModelAndView moderatorPage() {
		return new ModelAndView("moderation");
	}

	@RequestMapping(value="/admin/first", method=RequestMethod.GET)
	public ModelAndView firstAdminPage() {
		return new ModelAndView("admin/admin-first");
	}

	@RequestMapping(value="/admin/second", method=RequestMethod.GET)
	public ModelAndView secondAdminPage() {
		return new ModelAndView("admin/admin-second");
	}
	
	@RequestMapping(value="/productosHome", method=RequestMethod.GET)
	public ModelAndView productosHomePage() {
		return new ModelAndView("productosHome");
	}

//	@RequestMapping(value="/registroHome", method=RequestMethod.GET)
//	public ModelAndView registroHomePage() {
//		return new ModelAndView("registroHome");
//	}
	
	@RequestMapping("/registroHome")
	public String registroHomePage(Map<String, Object> map, Model model){
	
			List<CtgDepartamento> departamento = sgiPersonaDao.busquedaDepto();
			model.addAttribute("busquedaDepto",departamento);
			
			List<CtgMunicipio> municipio = ctgMunicipioDao.busquedaMuni();
			model.addAttribute("busquedaMuni",municipio);
			
		map.put("sgiPersona", new RegistroCliente());
		return "registroHome";
	}


}
