//package com.main.controller;
//
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.support.SessionStatus;
//import org.springframework.web.servlet.ModelAndView;
//
//import com.main.java.Contact;
//import com.main.dao.ContactDAO;
//import com.main.service.ContactService;
//import com.main.validator.ContactValidator;
//
//@Controller
//public class ContactController
//{
//
//	@Autowired
//	private ContactService contactService;
//
//	@Autowired
//	private ContactValidator contactValidator;
//
//
//	@RequestMapping("/index")
//	public String listContacts(Map<String, Object> map) {
//
//		map.put("contact", new Contact());
//		map.put("contactList", contactService.listContact());
//		return "contact";
//		}
//
//	@RequestMapping(value = "/add", method=RequestMethod.POST)
//	public String addContact(@ModelAttribute("contact")
//	Contact contact, BindingResult result) {
//		contactValidator.validate(contact, result);
//
//		if (result.hasErrors())
//		{
//			return "contact";
//		}
//		contactService.addContact(contact);
//
//		return "redirect:index.html";
//	}
//
//	/*@RequestMapping(value="/delete/{contactId}", method=RequestMethod.POST)
//	public String deleteContact(@PathVariable("contactId")
//	Integer contactId) {
//
//		contactService.removeContact(contactId);
//
//		return "redirect:index.html";
//	}
//	*/
//	@RequestMapping(value="/update", method=RequestMethod.GET)
//	public ModelAndView edit(@RequestParam("id")Integer id)
//	{
//		ModelAndView mav = new ModelAndView("edit");
//		Contact contact= contactService.getById(id);
//		mav.addObject("editContact",contact);
//		return mav;
//	}
//
//	@RequestMapping(value="/edit", method=RequestMethod.POST)
//	public String update(@ModelAttribute("editContact") Contact contact, BindingResult result,SessionStatus status)
//	{
//		contactValidator.validate(contact, result);
//
//		if (result.hasErrors())
//		{
//			return "edit";
//		}
//		System.out.println(contact.getFirstname());
//		System.out.println(contact.getId());
//		contactService.update(contact);
//		status.setComplete();
//		return "redirect:index.html";
//	}
//
//	@RequestMapping("delete")
//	public ModelAndView delete(@RequestParam("id")Integer id)
//	{
//		ModelAndView mav = new ModelAndView("redirect:index.html");
//		contactService.removeContact(id);
//		return mav;
//	}
//	}