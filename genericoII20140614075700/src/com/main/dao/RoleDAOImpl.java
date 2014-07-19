package com.main.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.exception.AsiWebException;
import com.main.java.Role;

@Repository
public class RoleDAOImpl extends BaseDaoImpl implements RoleDAO {

	@Autowired
	private SessionFactory sessionFactory;

	private Session openSession() {
		return sessionFactory.getCurrentSession();
	}

	public Role getRole(int id) {
		Role role = (Role) openSession().load(Role.class, id);
		return role;
	}

	@SuppressWarnings("unchecked")
	public Role findByCodigo(Integer rolId) throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(Role.class);
		criteria.add(Restrictions.eq("id", rolId));
		criteria.addOrder(Order.asc("role"));
		List<Role> items = (List<Role>) findByCriteria(criteria);
		if(items != null && !items.isEmpty()) return items.get(0);
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public List<Object[]> findAllroles() throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(Role.class);
		criteria.setProjection(
				Projections.projectionList().
		add(Projections.property("id")).
		add(Projections.property("role")).
		add(Projections.property("roleActivo"))
				);
		return (List<Object[]>) findByCriteria(criteria);
	}
}
