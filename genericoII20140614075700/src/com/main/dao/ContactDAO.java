package com.main.dao;

import java.util.List;
import com.main.java.*;

public interface ContactDAO {
	
	public void addContact(Contact contact);
	public List<Contact> listContact();
	public void removeContact(Integer id);
	public Contact getById(int id);	
	public void update(Contact contact);
}
