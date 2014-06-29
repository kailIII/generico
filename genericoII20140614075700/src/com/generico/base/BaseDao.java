package com.generico.base;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.ProjectionList;
import org.springframework.jdbc.core.JdbcTemplate;

import com.generico.exception.AsiWebException;

public interface BaseDao {

	public void save(Object object) throws AsiWebException;

	public void update(Object object) throws AsiWebException;

	public void delete(Object object) throws AsiWebException;

	public void saveOrUpdateAll(List<?> objectList) throws AsiWebException;

	public void deleteAll(List<?> objectList) throws AsiWebException;

	public List<?> findAll(Class<?> entityClass) throws AsiWebException;

	public List<?> findAllOrdered(Class<?> entityClass,
			String orderEntityProperty, String orderToApply)
			throws AsiWebException;

	public List<?> findAllOrdered(Class<?> entityClass,
			Map<String, String> propertiesAndOrders,
			ProjectionList projectionListProvided) throws AsiWebException;

	public List<?> findAllActives(Class<?> entityClass,
			String activeEntityProperty) throws AsiWebException;

	public List<?> findAllActivesOrdered(Class<?> entityClass,
			String activeEntityProperty, String orderEntityProperty,
			String orderToApply) throws AsiWebException;

	public List<?> findAllActivesOrdered(Class<?> entityClass,
			String activeEntityProperty,
			Map<String, String> propertiesAndOrders,
			ProjectionList projectionListProvided) throws AsiWebException;

	public Integer countAll(Class<?> entityClass) throws AsiWebException;

	public Object findById(Class<?> entityClass, Long entityId)
			throws AsiWebException;

	public List<?> findByProperty(Class<?> entityClass, String entityProperty,
			Object entityValue) throws AsiWebException;

	public List<?> findByCriteria(DetachedCriteria criteria)
			throws AsiWebException;

	public List<?> findByHQLQuery(String hqlQuery, Object[] values)
			throws AsiWebException;

	public List<?> findBySQLQuery(String sqlQuery, Object[] values)
			throws AsiWebException;

	public void executeNonHibernateQuery(String hqlQuery,
			Map<String, Object> parameters) throws AsiWebException;

	public JdbcTemplate getJdbcTemplate();

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate);

	public DetachedCriteria createAlias(DetachedCriteria criteria,
			HashMap<String, Object[]> map);

	public ProjectionList getProjections(DetachedCriteria criteria,
			HashMap<String, Object[]> map, ProjectionList list);

	public List<Map<String, Object>> getChangeListObjectToMapAlias(
			List<Object[]> list, String[] alias);

	public Object toBean(Object[] object, String[] alias, Class<?> clazz)
			throws InstantiationException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException;

	public Map<String, Object> toMap(Object[] object, String[] alias);

	public void updateAll(List<?> objectList) throws AsiWebException;

}