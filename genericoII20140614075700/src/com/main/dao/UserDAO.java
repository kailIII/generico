package com.main.dao;

import java.util.List;

import com.generico.exception.AsiWebException;
import com.main.java.User;
import com.web.security.CustomUser;

public interface UserDAO {

	public User getUser(String login);
	public User getUserById(Long id);
	public void update(User user);
	public List<Object[]> getAllUsuarios() throws AsiWebException;
	public int findUserByUsuario(String usuario) throws AsiWebException;
	public void saveUsuario (Object object) throws AsiWebException;
	public void updateUsuario (Object object) throws AsiWebException;
	public void deleteUsuario (Object object) throws AsiWebException;
	public List<Object[]> findAllUsuariosRoles() throws AsiWebException;
	public List<Object[]> getAllActivesUsuarios() throws AsiWebException;
	public List<Object[]> findByProp(Class<?> entityClass, String entityProperty, Object entityValue) throws AsiWebException;
	public void deleteAl(List<?> objectList) throws AsiWebException;
	public CustomUser getCustomUser(CustomUser customUser, String username) throws AsiWebException;
}