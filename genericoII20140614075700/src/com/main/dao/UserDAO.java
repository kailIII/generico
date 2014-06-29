package com.main.dao;

import java.util.List;

import com.generico.exception.AsiWebException;
import com.main.java.User;

public interface UserDAO {

	public User getUser(String login);
	public User getUserById(Long id);
	public void update(User user);
//	public List<Object[]> getAllUsuarios() throws AsiWebException;
}