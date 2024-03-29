package com.main.dao;

import java.util.Collections;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.dto.ctg.CtgSucursal;
import com.generico.exception.AsiWebException;
import com.main.cliente.dto.SgiPersona;
import com.main.java.CtgDepartamento;

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
	
	
	@SuppressWarnings("unchecked")
	public List<CtgDepartamento> busquedaDepto(){
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgDepartamento.class);
		criteria.setProjection(
				Projections.projectionList().
				add(Projections.property("catalogoDepartamentoId")).
				add(Projections.property("catalogoDepartamentoNombre")));

		criteria.addOrder(Order.asc("catalogoDepartamentoId"));
		criteria.addOrder(Order.asc("catalogoDepartamentoNombre"));
		try{
			return (List<CtgDepartamento>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}
	
}
