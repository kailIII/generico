package com.generico.base;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.ResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import com.generico.dto.ctg.CtgCatalogo;
import com.generico.exception.AsiWebException;
import com.generico.web.annotation.GenericoClassJsonProperty;
import com.generico.web.annotation.GenericoFormatDate;
import com.generico.web.annotation.GenericoTrimToZero;
import com.main.java.User;
import com.web.util.GenericoUtil;



@Transactional
public class BaseDaoImpl /*extends HibernateDaoSupport*/ implements BaseDao{

		private static final String PROJECTION_PROPERTIES_KEY = "projectionProperties";
		private static final String PROJECTION_LIST_KEY = "projectionList";
		private static final String SAVE = "save";
		private static final String UPDATE = "update";
		private static final String DELETE = "delete";
		public static Logger logger = Logger.getLogger(BaseDaoImpl.class);
		private JdbcTemplate jdbcTemplate;
		
		
		@Autowired
		private SessionFactory sessionFactory;

		private Session openSession() {
			return sessionFactory.getCurrentSession();
		}
		
		

		@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false, rollbackFor = {
				Exception.class, AsiWebException.class })
		private void trx(Object object, String operation) throws AsiWebException {
			try {
				 logger.info("Procediendo a ejecutar transaccion (" + operation +
				 ") en: " + object.getClass().getSimpleName() + "...");
				GenericoUtil.preProcessBeforeSaveOrUpdate(object, openSession().getSessionFactory());
				if ("save".equals(operation)) {
					
					if (object instanceof CtgCatalogo) {
						CtgCatalogo ctgCatalogo = (CtgCatalogo) object;
						if (ctgCatalogo.getCtgCatalogoId() == null) {
							ctgCatalogo.setCtgCatalogoHijo("00000");
							openSession().getSessionFactory().getCurrentSession().save(ctgCatalogo);
							ctgCatalogo.setCtgCatalogoHijo(StringUtils.leftPad(
									ctgCatalogo.getCtgCatalogoId().toString(), 5,
									"0"));
						}
						openSession().getSessionFactory().getCurrentSession().saveOrUpdate(ctgCatalogo);
					}
					else
						openSession().getSessionFactory().getCurrentSession().saveOrUpdate(object);
//						getHibernateTemplate().saveOrUpdate(object);
				} else if ("update".equals(operation))
					openSession().getSessionFactory().getCurrentSession().update(object);
//					getHibernateTemplate().update(object);
				else if ("delete".equals(operation))
					openSession().getSessionFactory().getCurrentSession().delete(object);
//					getHibernateTemplate().delete(object);
			} catch (Exception e) {
				String message = "No se pudo ejecutar transaccion";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			 logger.info("Transaccion ejecutada correctamente.");
		}

		public void save(Object object) throws AsiWebException {
			trx(object, SAVE);
		}

		public void update(Object object) throws AsiWebException {
			trx(object, UPDATE);
		}

		public void delete(Object object) throws AsiWebException {
			trx(object, DELETE);
		}

		public void saveOrUpdateAll(List<?> objectList) throws AsiWebException {
			for (Object object : objectList)
				save(object);
		}

		public void deleteAll(List<?> objectList) throws AsiWebException {
			for (Object object : objectList)
				delete(object);
		}

		public List<?> findAll(Class<?> entityClass) throws AsiWebException {
			return findAllOrdered(entityClass, new HashMap<String, String>(), null);
		}

		public List<?> findAllOrdered(Class<?> entityClass,
				String orderEntityProperty, String orderToApply)
				throws AsiWebException {
			HashMap<String, String> propertiesAndOrders = new HashMap<String, String>();
			propertiesAndOrders.put(orderEntityProperty, orderToApply);
			return findAllOrdered(entityClass, propertiesAndOrders, null);
		}

		@SuppressWarnings("unchecked")
		public List<?> findAllOrdered(Class<?> entityClass,
				Map<String, String> propertiesAndOrders,
				ProjectionList projectionListProvided) throws AsiWebException {
			List<?> items = Collections.emptyList();
			ProjectionList projectionList = Projections.projectionList();
			List<String> fieldNames = Collections.emptyList();
			try {
				Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(entityClass);
				if (projectionListProvided == null
						|| projectionListProvided.getLength() == 0) {
					HashMap<String, Object> map = getProjectionList(entityClass);
					fieldNames = (List<String>) map.get(PROJECTION_PROPERTIES_KEY);
					projectionList = (ProjectionList) map.get(PROJECTION_LIST_KEY);
				} else {
					fieldNames = new ArrayList<String>();
					for (int i = 0; i < projectionListProvided.getLength(); i++)
						fieldNames.add(projectionListProvided.getProjection(i)
								.toString());
					projectionList = projectionListProvided;
				}
				criteria.setProjection(projectionList);
				String property = StringUtils.EMPTY;
				String propertyOrder = StringUtils.EMPTY;
				for (Entry<String, String> entry : propertiesAndOrders.entrySet()) {
					property = entry.getKey();
					propertyOrder = entry.getValue();
					criteria.addOrder(GenericoUtil.ORDER_ASC.equals(propertyOrder) ? Order
							.asc(property) : Order.desc(property));
				}
				List<Object[]> results = (List<Object[]>) findByCriteria(criteria);
				items = applyResultTransformer(results, entityClass, fieldNames);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return items;
		}

		public List<?> findAllActives(Class<?> entityClass,
				String activeEntityProperty) throws AsiWebException {
			return findAllActivesOrdered(entityClass, activeEntityProperty,
					new HashMap<String, String>(), null);
		}

		public List<?> findAllActivesOrdered(Class<?> entityClass,
				String activeEntityProperty, String orderEntityProperty,
				String orderToApply) throws AsiWebException {
			HashMap<String, String> propertiesAndOrders = new HashMap<String, String>();
			propertiesAndOrders.put(orderEntityProperty, orderToApply);
			return findAllActivesOrdered(entityClass, activeEntityProperty,
					propertiesAndOrders, null);
		}

		@SuppressWarnings("unchecked")
		public List<?> findAllActivesOrdered(Class<?> entityClass,
				String activeEntityProperty,
				Map<String, String> propertiesAndOrders,
				ProjectionList projectionListProvided) throws AsiWebException {
			List<?> items = Collections.emptyList();
			ProjectionList projectionList = Projections.projectionList();
			List<String> fieldNames = Collections.emptyList();
			try {
				Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(entityClass);
				if (projectionListProvided == null
						|| projectionListProvided.getLength() == 0) {
					HashMap<String, Object> map = getProjectionList(entityClass);
					fieldNames = (List<String>) map.get(PROJECTION_PROPERTIES_KEY);
					projectionList = (ProjectionList) map.get(PROJECTION_LIST_KEY);
				} else {
					fieldNames = new ArrayList<String>();
					for (int i = 0; i < projectionListProvided.getLength(); i++)
						fieldNames.add(projectionListProvided.getProjection(i)
								.toString());
					projectionList = projectionListProvided;
				}
				criteria.setProjection(projectionList);
				criteria.add(Restrictions.eq(activeEntityProperty, "1"));
				String property = StringUtils.EMPTY;
				String propertyOrder = StringUtils.EMPTY;
				for (Entry<String, String> entry : propertiesAndOrders.entrySet()) {
					property = entry.getKey();
					propertyOrder = entry.getValue();
					criteria.addOrder(GenericoUtil.ORDER_ASC.equals(propertyOrder) ? Order
							.asc(property) : Order.desc(property));
				}
				List<Object[]> results = (List<Object[]>) findByCriteria(criteria);
				items = applyResultTransformer(results, entityClass, fieldNames);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return items;
		}

		public Integer countAll(Class<?> entityClass) throws AsiWebException {
			Integer rowCount = new Integer(-1);
			try {
				Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(entityClass);
				criteria.setProjection(Projections.rowCount());
				rowCount = (Integer) findByCriteria(criteria).get(0);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return rowCount;
		}

		public Object findById(Class<?> entityClass, Long entityId)
				throws AsiWebException {
			Object object = null;
			try {
				object = openSession().getSessionFactory().getCurrentSession().get(entityClass, entityId);
//				object = getHibernateTemplate().get(entityClass, entityId);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return object;
		}

		@SuppressWarnings({ "rawtypes", "unchecked" })
		private List applyResultTransformer(List<Object[]> results,
				Class<?> entityClass, List<String> fieldNames) {
			List items = new ArrayList();
			ResultTransformer transformer = new AliasToBeanResultTransformer(
					entityClass);
			for (Object[] object : results)
				items.add(transformer.transformTuple(object,
						fieldNames.toArray(new String[] {})));
			return items;
		}

		@SuppressWarnings("unchecked")
		public List<?> findByProperty(Class<?> entityClass, String entityProperty,
				Object entityValue) throws AsiWebException {
			List<?> items = Collections.emptyList();
			try {
				Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(entityClass);
				HashMap<String, Object> map = getProjectionList(entityClass);
				List<String> fieldNames = (List<String>) map
						.get(PROJECTION_PROPERTIES_KEY);
				ProjectionList projectionList = (ProjectionList) map
						.get(PROJECTION_LIST_KEY);
				criteria.setProjection(projectionList);
				criteria.add(Restrictions.eq(entityProperty, entityValue));
				List<Object[]> results = (List<Object[]>) findByCriteria(criteria);
				items = applyResultTransformer(results, entityClass, fieldNames);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return items;
		}

		public List<?> findByCriteria(Criteria criteria)
				throws AsiWebException {
			List<?> items = Collections.emptyList();
			try {
				items = criteria.list();
//				items = getHibernateTemplate().findByCriteria(criteria);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return items;
		}

		public List<?> findByHQLQuery(String hqlQuery, Object[] values, String nombres)
				throws AsiWebException {
			List<?> items = Collections.emptyList();
			try {
				Query query = openSession().createQuery(hqlQuery);
				query.setParameter(nombres, values);
				items = query.list();
//				items = getHibernateTemplate().find(hqlQuery, values);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return items;
		}

		public List<?> findBySQLQuery(String sqlQuery, Object[] values, String nombres)
				throws AsiWebException {
			List<?> items = Collections.emptyList();
			try {
				Query query = openSession().createSQLQuery(sqlQuery);
				query.setParameter(nombres, values);
				items = query.list();
//				items = getJdbcTemplate().queryForList(sqlQuery, values);
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
			return items;
		}

		public void executeNonHibernateQuery(String hqlQuery,
				Map<String, Object> parameters) throws AsiWebException {
			try {
//				Query query = getHibernateTemplate().getSessionFactory()
//						.getCurrentSession().createQuery(hqlQuery);
				Query query = openSession().getSessionFactory().getCurrentSession().createQuery(hqlQuery);
				for (Entry<String, Object> entry : parameters.entrySet())
					query.setParameter(entry.getKey(), entry.getValue());
				query.executeUpdate();
			} catch (Exception e) {
				String message = "No se pudo ejecutar consulta";
				logger.error(message + ": " + e, e);
				throw new AsiWebException(message);
			}
		}

		public JdbcTemplate getJdbcTemplate() {
			return jdbcTemplate;
		}

		public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
			this.jdbcTemplate = jdbcTemplate;
		}

		private HashMap<String, Object> getProjectionList(Class<?> entityClass) {
			HashMap<String, Object> map = new HashMap<String, Object>();
			ProjectionList projectionList = Projections.projectionList();
			GenericoClassJsonProperty genericoClassJsonProperty = entityClass
					.getAnnotation(GenericoClassJsonProperty.class);
			List<String> projectionProperties = Collections.emptyList();
			boolean includeAllFields = false;
			if (genericoClassJsonProperty != null) {
				String[] jsonProperties = genericoClassJsonProperty.jsonProperties();
				if (jsonProperties.length == 0)
					includeAllFields = true;
				else {
					projectionProperties = new ArrayList<String>();
					for (String jsonProperty : jsonProperties)
						projectionProperties.add(jsonProperty);
				}
			} else
				includeAllFields = true;
			if (includeAllFields) {
				Field[] fields = entityClass.getDeclaredFields();
				projectionProperties = new ArrayList<String>();
				for (Field field : fields)
					projectionProperties.add(field.getName());
			}
			for (String projectionProperty : projectionProperties)
				projectionList.add(Projections.property(projectionProperty));
			map.put(PROJECTION_PROPERTIES_KEY, projectionProperties);
			map.put(PROJECTION_LIST_KEY, projectionList);
			return map;
		}

		@SuppressWarnings("deprecation")
		public DetachedCriteria createAlias(DetachedCriteria criteria,
				HashMap<String, Object[]> map) {
			for (Entry<String, Object[]> entry : map.entrySet()) {
				if (entry.getValue() != null) {
					Object[] prop = entry.getValue();
					criteria.createAlias(entry.getKey(), entry.getKey(),
							Integer.parseInt(prop[1].toString()));
					criteria.setFetchMode(entry.getKey(), FetchMode.JOIN);
				}
			}
			return criteria;
		}

		public ProjectionList getProjections(DetachedCriteria criteria,
				HashMap<String, Object[]> map, ProjectionList list) {
			for (Entry<String, Object[]> entry : map.entrySet()) {
				if (entry.getValue() != null) {
					Object[] prop = entry.getValue();
					for (String campo : (String[]) prop[0])
						list.add(
								Projections.property(entry.getKey() + "." + campo),
								entry.getKey() + "_" + campo);
				} else
					list.add(Projections.property(entry.getKey()), entry.getKey());
			}
			return list;
		}

		public List<Map<String, Object>> getChangeListObjectToMapAlias(
				List<Object[]> list, String[] alias) {
			List<Map<String, Object>> aList = new ArrayList<Map<String, Object>>();
			HashMap<String, Object> map = null;
			for (Object[] o : list) {
				map = new HashMap<String, Object>();
				for (int i = 0; i < o.length; i++) {
					map.put(alias[i], o[i]);
				}
				aList.add(map);
			}
			return aList;
		}

		public Object toBean(Object[] object, String[] alias, Class<?> clazz)
				throws InstantiationException, IllegalAccessException,
				IllegalArgumentException, InvocationTargetException {
			Object objectToReturn = clazz.newInstance();
			for (int i = 0; i < alias.length; i++) {
				Field field = ReflectionUtils.findField(clazz, alias[i]);
				if (field != null) {
					ReflectionUtils.makeAccessible(field);
					if (field.getAnnotation(GenericoFormatDate.class) != null) {
						if ("DD_MM_YYYY".equals(((GenericoFormatDate) field
								.getAnnotation(GenericoFormatDate.class))
								.fromFormatDate()))
							ReflectionUtils
									.setField(
											field,
											objectToReturn,
											GenericoUtil
													.getFechaAsDD_MM_YYYY_From_YYYYMMDD((String) object[i]));
						else if ("DD_MM_YYYY__HH_MM_SS_A"
								.equals(((GenericoFormatDate) field
										.getAnnotation(GenericoFormatDate.class))
										.fromFormatDate()))
							ReflectionUtils
									.setField(
											field,
											objectToReturn,
											GenericoUtil
													.getFechaAsDD_MM_YYYY__HH_MM_SS_A_From_YYYYMMDDHHMMSS((String) object[i]));
					} else if (field.getAnnotation(GenericoTrimToZero.class) != null)
						ReflectionUtils.setField(field, objectToReturn,
								GenericoUtil.trimToZero(String.valueOf(object[i])));
					else
						ReflectionUtils.setField(field, objectToReturn, object[i]);
				}
			}
			Method method = ReflectionUtils.findMethod(clazz, "postFill");
			if (method != null && method.getParameterTypes().length == 0)
				method.invoke(objectToReturn);
			return objectToReturn;
		}

		public Map<String, Object> toMap(Object[] object, String[] alias) {
			Map<String, Object> objectToReturn = new HashMap<String, Object>();
			for (int i = 0; i < alias.length; i++)
				objectToReturn.put(alias[i], object[i]);
			return objectToReturn;
		}

		public void updateAll(List<?> objectList) throws AsiWebException {
			for (Object object : objectList)
				update(object);
		}

	
	
}
