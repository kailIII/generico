package com.main.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.generico.base.BaseDaoImpl;
import com.generico.exception.AsiWebException;
import com.main.java.Producto;
import com.main.java.User;


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
			criterias.setProjection(
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
						add(Projections.property("usuarioDocumento"))
					);
			criterias.add(Restrictions.ne("id", 0));
			criterias.addOrder(Order.asc("login"));

			return (List<Object[]>) findByCriteria(criterias);
		}

}
