package com.generico.dso.sgd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.generico.exception.AsiWebException;
import com.main.dao.UserDAO;
import com.main.java.Role;
import com.main.java.User;
import com.main.java.UserRoles;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UserDAO userDAO;
	
	@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false, rollbackFor = {Exception.class, AsiWebException.class})
	public void updateRolesByUser(Integer usrId, String[] rolesCheked) throws AsiWebException {
		userDAO.deleteAl(
				userDAO.findByProp(UserRoles.class, "users.id", usrId)
		);
		UserRoles ur = null;
		User u = null;
		Role r = null;
		for (String rolIdStr : rolesCheked) {
			ur = new UserRoles();
			u = new User();
			r = new Role();
			u.setId(usrId);
			ur.setUsers(u);
			r.setRoleId(Integer.parseInt(rolIdStr));
			ur.setRoles(r);
			userDAO.saveUsuario(ur);
		}
	}
	
}
