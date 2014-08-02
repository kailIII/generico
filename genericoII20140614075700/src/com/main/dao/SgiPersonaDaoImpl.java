package com.main.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.dto.ctg.CtgSucursal;
import com.generico.exception.AsiWebException;
import com.main.cliente.dto.SgiPersona;

@Repository
public class SgiPersonaDaoImpl extends BaseDaoImpl implements SgiPersonaDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	private Session openSession() {
		return sessionFactory.getCurrentSession();
	}
	
	public void savePersona (SgiPersona sgiPersona) throws AsiWebException {
		save(sgiPersona);
	}
	
}
