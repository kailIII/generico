package com.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.main.java.Contact;
import com.main.dao.*;


@Service
public class ContactServiceImpl implements ContactService {

	
	@Autowired
	private ContactDAO contactDAO;
	
	@Transactional
	public void addContact(Contact contact) {
		contactDAO.addContact(contact);
	}

	@Transactional
	public List<Contact> listContact() {

		return contactDAO.listContact();
	}

	@Transactional
	public void removeContact(Integer id) {
		contactDAO.removeContact(id);
	}
	
	public Contact getById(int id){
		return contactDAO.getById(id);
	}

	public void update(Contact contact) {
		contactDAO.update(contact);
	}
	
	

}
