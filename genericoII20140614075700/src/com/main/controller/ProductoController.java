package com.main.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import com.main.java.Producto;
import com.main.service.ProductoService;
import com.main.validator.ContactValidator;

@Controller
public class ProductoController
{

	@Autowired
	private ProductoService productoService;

	@RequestMapping("/productoMain")
	public String listProductos(Map<String, Object> map) {

		map.put("producto", new Producto());
		map.put("productoList", productoService.listProducto());
		return "empleado/producto";
		}

	@RequestMapping(value = "/add", method=RequestMethod.POST)
	public String addProducto(@ModelAttribute("producto")
	Producto producto, BindingResult result) {
//		contactValidator.validate(producto, result);
//
//		if (result.hasErrors())
//		{
//			return "producto";
//		}
		productoService.addProducto(producto);

		return "redirect:productoMain.html";
	}

	@RequestMapping(value="/update", method=RequestMethod.GET)
	public ModelAndView edit(@RequestParam("id")Integer id)
	{
		ModelAndView mav = new ModelAndView("empleado/edit");
		Producto producto = productoService.getById(id);
		mav.addObject("editProducto",producto);
		return mav;
	}

	@RequestMapping(value="/edit", method=RequestMethod.POST)
	public String update(@ModelAttribute("editProducto") Producto producto, BindingResult result,SessionStatus status)
	{
		System.out.println(producto.getNombre());
		System.out.println(producto.getIdProducto());
		productoService.update(producto);
		status.setComplete();
		return "redirect:productoMain.html";
	}

	@RequestMapping("delete")
	public ModelAndView delete(@RequestParam("id")Integer id)
	{
		ModelAndView mav = new ModelAndView("redirect:productoMain.html");
		productoService.removeProducto(id);
		return mav;
	}
	}