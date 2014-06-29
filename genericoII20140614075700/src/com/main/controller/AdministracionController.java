package com.main.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdministracionController extends BaseController {

	@RequestMapping(value = "")
	public String admin(HttpServletRequest request, ModelMap model){
		return "admin/homeAdministracion";
	}
	
}
