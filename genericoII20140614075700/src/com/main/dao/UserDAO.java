package com.main.dao;

import com.main.java.User;

public interface UserDAO {

	public User getUser(String login);
	public User getUserById(Long id);

}