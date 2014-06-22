package com.main.service;

import java.util.List;

import com.main.java.*;
public interface ContactService {

	public void addContact(Contact contact);
	public List<Contact> listContact();
	public void removeContact(Integer id);
	public Contact getById(int id);
	public void update(Contact contact);
}
