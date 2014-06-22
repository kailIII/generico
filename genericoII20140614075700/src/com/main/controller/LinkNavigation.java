package com.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LinkNavigation {

	@RequestMapping(value="/", method=RequestMethod.GET)
	public ModelAndView homePage() {
//		return new ModelAndView("index");
		return new ModelAndView("secureLoggin/login-form");
	}
	
	@RequestMapping(value="/sobreNosotros", method=RequestMethod.GET)
	public ModelAndView aboutUs() {
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


}