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
import com.web.util.JsonUtils;

@Repository
public class CtgCatalogoDaoImpl extends BaseDaoImpl implements CtgCatalogoDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session openSession() {
		return sessionFactory.getCurrentSession();
	}
	
	@SuppressWarnings("unchecked")
	public List<CtgCatalogo> findAllActives(String ctgCatalogoPadre) throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.
			add(Restrictions.eq("ctgCatalogoPadre", ctgCatalogoPadre)).
			add(Restrictions.eq("ctgCatalogoActivo", "1"));
		return (List<CtgCatalogo>) findByCriteria(criteria);
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findAllActivesAndDetails(String ctgCatalogoPadre) throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.setProjection(Projections.projectionList().
			add(Projections.property("ctgCatalogoId"))
		);
		criteria.add(Restrictions.eq("ctgCatalogoPadre", ctgCatalogoPadre));
		criteria.add(Restrictions.eq("ctgCatalogoActivo", "1"));
		criteria.add(Restrictions.eq("ctgCatalogoDetallar", "1"));
		criteria.addOrder(Order.asc("ctgCatalogoNombre"));
		try {
			return (List<Object[]>) findByCriteria(criteria);
		} catch (AsiWebException e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

	public String findAllActivesAsJson(String ctgCatalogoPadre) throws AsiWebException {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setJsonPropertyFilter(new CtgCatalogoExclude());
		return JSONArray.fromObject(findAllActives(ctgCatalogoPadre), jsonConfig).toString();
	}

	private class CtgCatalogoExclude implements PropertyFilter{
		@Override
		public boolean apply(Object source, String name, Object value) {
			return !name.equals("ctgCatalogoNombre") && !name.equals("ctgCatalogoId") && !name.equals("ctgCatalogoHijo");
		}
	}

	@SuppressWarnings("unchecked")
	public List<CtgCatalogo> findAll(String ctgCatalogoPadre) throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.add(Restrictions.eq("ctgCatalogoPadre", ctgCatalogoPadre));
		criteria.addOrder(Order.asc("ctgCatalogoNombre"));
		return (List<CtgCatalogo>) findByCriteria(criteria);
	}

	@SuppressWarnings("unchecked")
	public CtgCatalogo findByCodigo(String ctgCatalogoHijo) throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.add(Restrictions.eq("ctgCatalogoHijo", ctgCatalogoHijo));
		criteria.addOrder(Order.asc("ctgCatalogoNombre"));
		List<CtgCatalogo> items = (List<CtgCatalogo>) findByCriteria(criteria);
		if(items != null && !items.isEmpty()) return items.get(0);
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findAllActivesAsArray(String ctgCatalogoPadre) {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.setProjection(Projections.projectionList().
			add(Projections.property("ctgCatalogoId")).
			add(Projections.property("ctgCatalogoNombre")).
			add(Projections.property("ctgCatalogoPadre")).
			add(Projections.property("ctgCatalogoHijo"))
		);
		criteria.add(Restrictions.eq("ctgCatalogoPadre", ctgCatalogoPadre));
		criteria.add(Restrictions.eq("ctgCatalogoActivo", "1"));
		criteria.addOrder(Order.asc("ctgCatalogoId"));
		try {
			return (List<Object[]>) findByCriteria(criteria);
		} catch (AsiWebException e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

	public String findAllAsJson(String ctgCatalogoPadre) throws AsiWebException {
		return JSONArray.fromObject(findAll(ctgCatalogoPadre)).toString();
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findAllActivesAsArray() {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.setProjection(Projections.projectionList().
			add(Projections.property("ctgCatalogoId")).
			add(Projections.property("ctgCatalogoNombre")).
			add(Projections.property("ctgCatalogoPadre")).
			add(Projections.property("ctgCatalogoHijo"))

		);
		criteria.add(Restrictions.eq("ctgCatalogoActivo", "1"));
		criteria.addOrder(Order.asc("ctgCatalogoNombre"));
		try {
			return (List<Object[]>) findByCriteria(criteria);
		} catch (AsiWebException e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findAllAsArrayByPadre(String ctgCatalogoPadre)
			throws AsiWebException {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgCatalogo.class);
		criteria.setProjection(Projections.projectionList().
				add(Projections.property("ctgCatalogoId")).
				add(Projections.property("ctgCatalogoHijo")).
				add(Projections.property("ctgCatalogoNombre")).
				add(Projections.property("ctgCatalogoPadre"))
			);
			criteria.add(Restrictions.eq("ctgCatalogoPadre", ctgCatalogoPadre));
			criteria.add(Restrictions.eq("ctgCatalogoActivo", "1"));
		return (List<Object[]>) findByCriteria(criteria);
	}
	
	public void deleteAl(List<?> objectList) throws AsiWebException{
		deleteAll(objectList);
	}

	public List<?> saveOrUpdatee(String data, Class<?> clazz) throws AsiWebException {
        List<?> list = JsonUtils.getObjectsFromRequest(data, clazz);
        saveOrUpdateAll(list);
        return list;
	}
}
