package com.generico.dao.ctg;

import java.util.Collections;
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
import com.generico.dto.ctg.CtgSubTipoSucursal;
import com.generico.dto.ctg.CtgSucursal;
import com.generico.dto.ctg.CtgTipoSucursal;
import com.generico.exception.AsiWebException;


@Repository
public class CtgSucursalDaoImpl extends BaseDaoImpl implements CtgSucursalDao{

	@Autowired
	private SessionFactory sessionFactory;

	private Session openSession() {
		return sessionFactory.getCurrentSession();
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> getAllActivesAsArray() {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSucursal.class);
		criteria.setProjection(Projections.projectionList().
				add(Projections.property("ctgSucursalId")).
				add(Projections.property("ctgSucursalNombre")).
				add(Projections.property("ctgSucursalCodigo"))
				);
		criteria.add(Restrictions.eq("ctgSucursalActivo", "1"));
		criteria.addOrder(Order.asc("ctgSucursalNombre"));
		try {
			return (List<Object[]>) findByCriteria(criteria);
		} catch (AsiWebException e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

//	@SuppressWarnings("unchecked")
//	public List<Object[]> findSucursales(){
//		String hqlQuery = GenericoUtil.getQueryByName("ctgSucursales.findDatosSucursales");
//		try {
//			String parametro="";
//			return (List<Object[]>) findByHQLQuery(hqlQuery, new Object[]{parametro});
//		} catch (AsiWebException e) {
//			logger.error(e, e);
//		}
//		return Collections.emptyList();
//	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findTipoSucursalAllAsArray() {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgTipoSucursal.class);
		criteria.setProjection(Projections.projectionList().
				add(Projections.property("ctgTipoSucursalId")).
				add(Projections.property("ctgTipoSucursalNombre")).
				add(Projections.property("ctgTipoSucursalActivo")));
		criteria.addOrder(Order.asc("ctgTipoSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}


	@SuppressWarnings("unchecked")
	public List<Object[]> findAllSubTipoSucursalAllAsArray() {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSubTipoSucursal.class);
		criteria.createAlias("ctgTipoSucursal", "tipoSucursal");
		criteria.setProjection(
				Projections.projectionList().
					add(Projections.property("ctgSubTipoSucursalId")).
					add(Projections.property("ctgSubTipoSucursalNombre")).
					add(Projections.property("tipoSucursal.ctgTipoSucursalId")).
					add(Projections.property("ctgSubTipoSucursalCodigo")).
					add(Projections.property("ctgSubTipoSucursalActivo")));
		criteria.addOrder(Order.asc("tipoSucursal.ctgTipoSucursalId"));
		criteria.addOrder(Order.asc("ctgSubTipoSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}


	@SuppressWarnings("unchecked")
	public List<Object[]> findAllSucursalAllAsArray() {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSucursal.class);
		criteria.createAlias("ctgSubTipoSucursal", "subTipoSucursal");
		criteria.setProjection(
				Projections.projectionList().
					add(Projections.property("ctgSucursalId")).
					add(Projections.property("ctgSucursalNombre")).
					add(Projections.property("subTipoSucursal.ctgSubTipoSucursalId")).
					add(Projections.property("ctgSucursalActivo")).
					add(Projections.property("ctgSucursalCodigo")));

		criteria.addOrder(Order.asc("subTipoSucursal.ctgSubTipoSucursalId"));
		criteria.addOrder(Order.asc("ctgSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findAllSucursalAllAsArray(List<Long> list) {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSucursal.class);
		criteria.createAlias("ctgSubTipoSucursal", "subTipoSucursal");
		criteria.setProjection(
				Projections.projectionList().
				add(Projections.property("ctgSucursalId")).
				add(Projections.property("ctgSucursalNombre")).
				add(Projections.property("subTipoSucursal.ctgSubTipoSucursalId")).
				add(Projections.property("ctgSucursalActivo")).
				add(Projections.property("ctgSucursalCodigo")));

		criteria.add(Restrictions.in("ctgSucursalId", list));
		criteria.addOrder(Order.asc("subTipoSucursal.ctgSubTipoSucursalId"));
		criteria.addOrder(Order.asc("ctgSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

//	public List<Long> findSucursalesIds(Integer id) throws AsiWebException{
//		String sqlQuery = GenericoUtil.getQueryByName("sgdUsuario.findSucursales");
//		Object[] values = new Object[] {id};
//		return (List<Long>) getJdbcTemplate().queryForList(sqlQuery, values, Long.class);
//	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findSucursalesByPrior(){
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSucursal.class);
		criteria.createAlias("ctgSubTipoSucursal", "subTipoSucursal");
		criteria.setProjection(
			Projections.projectionList().
				add(Projections.property("ctgSucursalId")).
				add(Projections.property("ctgSucursalNombre")).
				add(Projections.property("subTipoSucursal.ctgSubTipoSucursalId")).
				add(Projections.property("ctgSucursalActivo")).
				add(Projections.property("ctgSucursalCodigo")));
		criteria.addOrder(Order.asc("subTipoSucursal.ctgSubTipoSucursalId"));
		criteria.addOrder(Order.asc("ctgSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findSubtipoSucursalesByPrior(){
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSubTipoSucursal.class);
		criteria.createAlias("ctgTipoSucursal", "tipoSucursal");
		criteria.setProjection(
			Projections.projectionList().
				add(Projections.property("ctgSubTipoSucursalId")).
				add(Projections.property("ctgSubTipoSucursalNombre")).
				add(Projections.property("tipoSucursal.ctgTipoSucursalId")).
				add(Projections.property("ctgSubTipoSucursalCodigo")).
				add(Projections.property("ctgSubTipoSucursalUsuarioBureau")).
				add(Projections.property("ctgSubTipoSucursalContrasenaBureau")).
				add(Projections.property("ctgSubTipoSucursalActivo")));
		criteria.addOrder(Order.asc("tipoSucursal.ctgTipoSucursalId"));
		criteria.addOrder(Order.asc("ctgSubTipoSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findTipoSucursalByPrior() {
		Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(CtgSubTipoSucursal.class);
		criteria.setProjection(Projections.projectionList().
				add(Projections.property("ctgTipoSucursalId")).
				add(Projections.property("ctgTipoSucursalNombre")).
				add(Projections.property("ctgTipoSucursalActivo")));
		criteria.addOrder(Order.asc("ctgTipoSucursalNombre"));
		try{
			return (List<Object[]>) findByCriteria(criteria);
		}catch (Exception e) {
			logger.error(e, e);
			return Collections.emptyList();
		}
	}
	
	public void saveSucursal(Object object) throws AsiWebException {
		save(object);
	}
	
	public void updateSucursal(Object object) throws AsiWebException {
		update(object);
	}
	
	public void deleteSucursal(Object object) throws AsiWebException {
		delete(object);
	}
}
