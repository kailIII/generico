package com.main.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.exception.AsiWebException;
import com.main.java.User;
import com.main.java.UserRoles;
import com.web.security.CustomUser;


	@Repository
	public class UserDAOImpl extends BaseDaoImpl implements UserDAO {

		@Autowired
		private SessionFactory sessionFactory;

		private Session openSession() {
			return sessionFactory.getCurrentSession();
		}

		@SuppressWarnings("unchecked")
		public User getUser(String login) {
			List<User> userList = new ArrayList<User>();
			Query query = openSession().createQuery("from User u where u.login = :login");
			query.setParameter("login", login);
			userList = query.list();
			if (userList.size() > 0)
				return userList.get(0);
			else
				return null;
		}

		@SuppressWarnings("unchecked")
		public User getUserById(Long id) {
			List<User> userList = new ArrayList<User>();
			Query query = openSession().createQuery("from User u where u.id = :id");
			query.setParameter("id", id);
			userList = query.list();
			if (userList.size() > 0)
				return userList.get(0);
			else
				return null;
		}
		
		
		public void update(User user){
			sessionFactory.getCurrentSession().merge(user);
		}
		
		@SuppressWarnings("unchecked")
		public List<Object[]> getAllUsuarios() throws AsiWebException {
			Criteria criterias = openSession().getSessionFactory().getCurrentSession().createCriteria(User.class);
			criterias.createAlias("ctgSucursales", "ctgSucursales");
			criterias.createAlias("ctgSucursales.ctgSubTipoSucursal", "ctgSubTipoSucursal");
			criterias.createAlias("ctgSubTipoSucursal.ctgTipoSucursal", "ctgTipoSucursal");
			criterias.createAlias("ctgTipoDocumento", "ctgTipoDocumento");
			
			criterias.setProjection(Projections.distinct(
					Projections.projectionList().
						add(Projections.property("id")).
						add(Projections.property("login")).
						add(Projections.property("password")).
						add(Projections.property("usuarioCambiarClave")).
						add(Projections.property("usuarioActivo")).
						add(Projections.property("usuarioPrimerNombre")).
						add(Projections.property("usuarioSegundoNombre")).
						add(Projections.property("usuarioprimerApellido")).
						add(Projections.property("usuarioSegundoApellido")).
						add(Projections.property("usuarioCorreoElectronico")).
						add(Projections.property("usuarioDocumento")).
						add(Projections.property("ctgSucursales.ctgSucursalId")).
						add(Projections.property("ctgSucursales.ctgSucursalNombre")).
						add(Projections.property("ctgSubTipoSucursal.ctgSubTipoSucursalId")).
						add(Projections.property("ctgTipoSucursal.ctgTipoSucursalId")).
						add(Projections.property("ctgTipoDocumento.ctgCatalogoId"))
					));
			criterias.add(Restrictions.ne("id", 0));
			criterias.addOrder(Order.asc("login"));

			return (List<Object[]>) findByCriteria(criterias);
		}
		
		@SuppressWarnings("unchecked")
		public int findUserByUsuario(String usuario) throws AsiWebException
		{
			Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(User.class);
			criteria.add(Restrictions.eq("login", usuario));
			List<Object[]> items = (List<Object[]>) findByCriteria(criteria);

			return items.size();
		}

		public void saveUsuario (Object object) throws AsiWebException{
			save(object);
		}
		
		public void updateUsuario (Object object) throws AsiWebException{
			update(object);
		}
		
		public void deleteUsuario (Object object) throws AsiWebException{
			delete(object);
		}
		
		@SuppressWarnings("unchecked")
		public List<Object[]> findAllUsuariosRoles() throws AsiWebException {
			Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(UserRoles.class);
			criteria.setProjection(
				Projections.projectionList()
					.add(Projections.property("users.id"))
					.add(Projections.property("roles.id"))
			);
			criteria.addOrder(Order.asc("users.id"));
			criteria.addOrder(Order.asc("roles.id"));
			List<Object[]> items = (List<Object[]>) findByCriteria(criteria);
			return items;
		}
		
		@SuppressWarnings("unchecked")
		public List<Object[]> getAllActivesUsuarios() throws AsiWebException {
			Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(User.class);
			criteria.createAlias("ctgSucursales", "ctgSucursal");
			criteria.setProjection(Projections.distinct(
					Projections.projectionList().
					add(Projections.property("id")).
					add(Projections.property("usuarioActivo")).
					add(Projections.property("login")).
					add(Projections.property("password")).
					add(Projections.property("usuarioPrimerNombre")).
					add(Projections.property("usuarioSegundoNombre")).
					add(Projections.property("usuarioprimerApellido")).
					add(Projections.property("usuarioSegundoApellido")).
					add(Projections.property("usuarioCorreoElectronico")).
//					add(Projections.property("sgdUsuarioPadre.sgdUsuarioId")).
					add(Projections.property("ctgSucursal.ctgSucursalId")).
					add(Projections.property("ctgSucursal.ctgSucursalNombre")).
					add(Projections.property("usuarioCambiarClave")).
					add(Projections.property("usuarioDocumento")).
					add(Projections.property("ctgTipoDocumento.ctgCatalogoId"))
			));
			criteria.add(Restrictions.eq("usuarioActivo", "1"));
			criteria.addOrder(Order.asc("login"));

			return (List<Object[]>) findByCriteria(criteria);
		}
		
		@SuppressWarnings("unchecked")
		public List<Object[]> findByProp(Class<?> entityClass, String entityProperty, Object entityValue) throws AsiWebException{
			return (List<Object[]>) findByProperty(entityClass, entityProperty, entityValue);
		}
		
		public void deleteAl(List<?> objectList) throws AsiWebException {
			deleteAll(objectList);
		}
		
		@SuppressWarnings({ "unchecked", "deprecation" })
		public CustomUser getCustomUser(CustomUser customUser, String username) throws AsiWebException{
			Criteria criteria = openSession().getSessionFactory().getCurrentSession().createCriteria(User.class);
			criteria.createAlias("ctgSucursales", "sgdSucursal", Criteria.INNER_JOIN);
			criteria.createAlias("ctgSucursales.ctgSubTipoSucursal", "ctgSubTipoSucursal", Criteria.INNER_JOIN);
			criteria.createAlias("ctgSubTipoSucursal.ctgTipoSucursal", "ctgTipoSucursal", Criteria.INNER_JOIN);
			criteria.add(Restrictions.eq("login", username));
			List<User> items = (List<User>) findByCriteria(criteria);
			if(!items.isEmpty()){
				User user = items.get(0);
				customUser.setUserId(Long.parseLong(user.getId().toString()));
//				customUser.setFullName(sgdUsuario.getSgdUsuarioNombreCompleto());
				customUser.setSucursalId(user.getCtgSucursales().getCtgSucursalId());
				customUser.setSucursal(user.getCtgSucursales().getCtgSucursalNombre());
				customUser.setSubTipoSucursalId(user.getCtgSucursales().getCtgSubTipoSucursal().getCtgSubTipoSucursalId());
				customUser.setSubTipoSucursal(user.getCtgSucursales().getCtgSubTipoSucursal().getCtgSubTipoSucursalNombre());
				customUser.setTipoSucursalId(user.getCtgSucursales().getCtgSubTipoSucursal().getCtgTipoSucursal().getCtgTipoSucursalId());
				customUser.setTipoSucursal(user.getCtgSucursales().getCtgSubTipoSucursal().getCtgTipoSucursal().getCtgTipoSucursalNombre());
				customUser.setUser(user.getLogin());
				customUser.setRequiredChangePassword(user.getUsuarioCambiarClave());
				return customUser;
			}
			return null;
		}
}
