package com.main.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.web.util.GenericoUtil;

@Controller
public class SecurityNavigation {

	@RequestMapping(value="/user-login", method=RequestMethod.GET)
	public ModelAndView loginForm() {
		return new ModelAndView("secureLoggin/login-form");
	}

	@RequestMapping(value="/error-login", method=RequestMethod.GET)
	public ModelAndView invalidLogin() {
		ModelAndView modelAndView = new ModelAndView("secureLoggin/login-form");
		modelAndView.addObject("error", true);
		return modelAndView;
	}

	@SuppressWarnings("static-access")
	@RequestMapping(value="/success-login", method={RequestMethod.GET, RequestMethod.POST})
	public String successLogin(HttpServletResponse response) {

		GenericoUtil genericoUtil = new GenericoUtil();
		if (genericoUtil.hasRole("ROLE_CLIENTE")) {
		return "redirect:/clienteHome";
		} else if (genericoUtil.hasRole("ROLE_ADMIN")){
		return "redirect:/administradorHome";
		} else {
			return "redirect:/secureLoggin/success-login";
		}
	}
	
	@RequestMapping(value="/clienteHome", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView clienteHome() {
		return new ModelAndView("cliente/clienteInicio");
	}
	
	@RequestMapping(value="/administradorHome", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView administradorHome() {
		return new ModelAndView("admin/home");
	}

}
