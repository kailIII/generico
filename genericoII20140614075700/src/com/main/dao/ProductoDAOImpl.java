package com.main.dao;

import java.util.List;




import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.main.java.Producto;


@Transactional
@Repository
public class ProductoDAOImpl implements ProductoDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public Producto getById(int id)
	{
		return (Producto) sessionFactory.getCurrentSession().get(Producto.class, id);
	}

	public void addProducto(Producto contact) {
		sessionFactory.getCurrentSession().save(contact);
	}

	@SuppressWarnings("unchecked")
	public List<Producto> listProducto() {

		return sessionFactory.getCurrentSession().createQuery("from Producto").list();
	}
	public void removeProducto(Integer id) {
		Producto contact = (Producto) sessionFactory.getCurrentSession().load(
				Producto.class, id);
		if (null != contact) {
			sessionFactory.getCurrentSession().delete(contact);
		}
	}

	public void update(Producto contact){

		sessionFactory.getCurrentSession().merge(contact);
	}
}
