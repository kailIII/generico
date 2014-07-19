package com.main.service;

//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.main.dao.UserDAO;
//
//
//@Service
//@Transactional(readOnly=true)
//public class CustomUserDetailsService implements UserDetailsService {
//
//	@Autowired
//	private UserDAO userDAO;
//
//	public UserDetails loadUserByUsername(String login)
//			throws UsernameNotFoundException {
//
//		com.main.java.User domainUser = userDAO.getUser(login);
//
//		boolean enabled = true;
//		boolean accountNonExpired = true;
//		boolean credentialsNonExpired = true;
//		boolean accountNonLocked = true;
//
//		return new User(
//				domainUser.getLogin(),
//				domainUser.getPassword(),
//				enabled,
//				accountNonExpired,
//				credentialsNonExpired,
//				accountNonLocked,
//				getAuthorities(((com.main.java.User) domainUser.getUserRoleses()).getId())
//		);
//	}
//
//	public Collection<? extends GrantedAuthority> getAuthorities(Integer role) {
//		List<GrantedAuthority> authList = getGrantedAuthorities(getRoles(role));
//		return authList;
//	}
//
//	public List<String> getRoles(Integer role) {
//
//		List<String> roles = new ArrayList<String>();
//
//		if (role.intValue() == 1) {
//			roles.add("ROLE_MODERATOR");
//			roles.add("ROLE_ADMIN");
//		} else if (role.intValue() == 2) {
//			roles.add("ROLE_MODERATOR");
//		}
//		return roles;
//	}
//
//	public static List<GrantedAuthority> getGrantedAuthorities(List<String> roles) {
//		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
//
//		for (String role : roles) {
//			authorities.add(new SimpleGrantedAuthority(role));
//		}
//		return authorities;
//	}
//
//}

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.main.dao.UserDAO;

@Service
@Transactional(readOnly = true)
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
//	private UserRepository userRepository;
	private UserDAO userRepository;

	/**
	 * Returns a populated {@link UserDetails} object. 
	 * The username is first retrieved from the database and then mapped to 
	 * a {@link UserDetails} object.
	 */
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			com.main.java.User domainUser = userRepository.getUser(username);
			
			boolean enabled = true;
			boolean accountNonExpired = true;
			boolean credentialsNonExpired = true;
			boolean accountNonLocked = true;
			
			return new User(
					domainUser.getLogin(), 
					domainUser.getPassword().toLowerCase(),
					enabled,
					accountNonExpired,
					credentialsNonExpired,
					accountNonLocked,
//					getAuthorities(domainUser.get.getRole())
					getAuthorities(domainUser.getRole().getRoleId())
					);
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * Retrieves a collection of {@link GrantedAuthority} based on a numerical role
	 * @param role the numerical role
	 * @return a collection of {@link GrantedAuthority
	 */
	public Collection<? extends GrantedAuthority> getAuthorities(Integer role) {
		List<GrantedAuthority> authList = getGrantedAuthorities(getRoles(role));
		return authList;
	}
	
	/**
	 * Converts a numerical role to an equivalent list of roles
	 * @param role the numerical role
	 * @return list of roles as as a list of {@link String}
	 */
	public List<String> getRoles(Integer role) {
		List<String> roles = new ArrayList<String>();
		
		if (role.intValue() == 1) {
			roles.add("ROLE_EMPLEADO");
			roles.add("ROLE_MODERATOR");
			roles.add("ROLE_ADMIN");
			
		} else if (role.intValue() == 2) {
			roles.add("ROLE_MODERATOR");
		} else if (role.intValue() == 3) {
			roles.add("ROLE_EMPLEADO");
		}
		
		return roles;
	}
	
	/**
	 * Wraps {@link String} roles to {@link SimpleGrantedAuthority} objects
	 * @param roles {@link String} of roles
	 * @return list of granted authorities
	 */
	public static List<GrantedAuthority> getGrantedAuthorities(List<String> roles) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}
		return authorities;
	}
}
