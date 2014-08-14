package com.main.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.exception.AsiWebException;
import com.main.java.Cliente;

@Repository
public class ClienteDAOImpl extends BaseDaoImpl implements ClienteDAO{

	@Autowired
	private SessionFactory sessionFactory;
	
	private Session openSession() {
		return sessionFactory.getCurrentSession();
	}
	
	public Cliente findByClienteId(Long clienteId) throws AsiWebException{
		Cliente cliente = new Cliente();
		cliente = (Cliente) findById(Cliente.class, clienteId);
		return cliente;
	}
}
