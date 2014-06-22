package com.main.dao;

import java.util.List;


import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.main.java.Contact;

@Transactional
@Repository
public class ContactDAOImpl implements ContactDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public Contact getById(int id)
	{
		return (Contact) sessionFactory.getCurrentSession().get(Contact.class, id);
	}

	public void addContact(Contact contact) {
		sessionFactory.getCurrentSession().save(contact);
	}

	@SuppressWarnings("unchecked")
	public List<Contact> listContact() {

		return sessionFactory.getCurrentSession().createQuery("from Contact").list();
	}
	public void removeContact(Integer id) {
		Contact contact = (Contact) sessionFactory.getCurrentSession().load(
				Contact.class, id);
		if (null != contact) {
			sessionFactory.getCurrentSession().delete(contact);
		}
	}

	public void update(Contact contact){

		sessionFactory.getCurrentSession().merge(contact);
	}
}
