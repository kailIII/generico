package com.generico.dao.ctg;

import java.util.Collections;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.dto.ctg.CtgCatalogo;
import com.generico.exception.AsiWebException;
import com.main.java.CtgDepartamento;
import com.main.java.CtgMunicipio;
import com.web.util.JsonUtils;

@Repository
public class CtgMunicipioDaoImpl extends BaseDaoImpl implements CtgMunicipioDao{

	@Autowired
	private SessionFactory sessionFactory;

	private Session openSession() {
		return sessionFactory.getCurrentSession();
	}
	
	@SuppressWarnings("unchecked")
	public List<CtgMunicipio> busquedaMuni(){
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgMunicipio.class);
		criteria.setProjection(
				Projections.projectionList().
				add(Projections.property("catalogoMunicipioId")).
				add(Projections.property("catalogoMunicipioNombre")));

		criteria.addOrder(Order.asc("catalogoMunicipioId"));
		criteria.addOrder(Order.asc("catalogoMunicipioNombre"));
		try{
			return (List<CtgMunicipio>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}
}
