package com.main.dao;

import java.util.List;

import com.generico.exception.AsiWebException;
import com.main.java.Role;

public interface RoleDAO {

	public Role getRole(int id);
	public Role findByCodigo(Integer rolId) throws AsiWebException;
	public List<Object[]> findAllroles() throws AsiWebException;

}