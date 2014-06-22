package com.web.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;


public class GenUserDetails extends User implements UserDetails{
	
	private static final long serialVersionUID = -855270847495958377L;
	private String fullName;
	private String username;
	private String requiredChangePassword;
	private String sessionPassword;
	private com.main.java.User usuario;
	private String sucursal;
	private String codigoEmpresa;
	private String dui;
	private String ip;
	private String nivelAcceso;

	public GenUserDetails(String username, String password, boolean enabled,
			boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities,
			String requiredChangePassword ,String fullName, String nivelAcceso)
	{
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.requiredChangePassword = requiredChangePassword;
		this.fullName = username;
		this.sessionPassword = password;
		this.username = username;
		this.sucursal = "";
		this.codigoEmpresa = "";
		this.ip = "";
		this.dui = "";
		this.nivelAcceso = "";
	}


	public GenUserDetails(String username, String password, boolean enabled,
			boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities,
			String requiredChangePassword,String fullName, com.main.java.User genUsuario, String codigoEmpresa,
			String ip, String cedula, String usuarioWS , String claveWS, String nivelAcceso)
	{
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.requiredChangePassword = requiredChangePassword;
		this.fullName = username;
		this.sessionPassword = password;
		this.username = username;
		this.usuario = genUsuario;
		this.sucursal = "";
		this.codigoEmpresa = codigoEmpresa;
		this.ip = ip;
		this.dui = dui;
		this.nivelAcceso = nivelAcceso;
	}


	public String getFullName() {
		return fullName;
	}


	public void setFullName(String fullName) {
		this.fullName = fullName;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getRequiredChangePassword() {
		return requiredChangePassword;
	}


	public void setRequiredChangePassword(String requiredChangePassword) {
		this.requiredChangePassword = requiredChangePassword;
	}


	public String getSessionPassword() {
		return sessionPassword;
	}


	public void setSessionPassword(String sessionPassword) {
		this.sessionPassword = sessionPassword;
	}


	public com.main.java.User getSgdUsuario() {
		return usuario;
	}


	public void setSgdUsuario(com.main.java.User usuario) {
		this.usuario = usuario;
	}


	public String getSucursal() {
		return sucursal;
	}


	public void setSucursal(String sucursal) {
		this.sucursal = sucursal;
	}


	public String getCodigoEmpresa() {
		return codigoEmpresa;
	}


	public void setCodigoEmpresa(String codigoEmpresa) {
		this.codigoEmpresa = codigoEmpresa;
	}


	public String getDui() {
		return dui;
	}


	public void setDui(String dui) {
		this.dui = dui;
	}


	public String getIp() {
		return ip;
	}


	public void setIp(String ip) {
		this.ip = ip;
	}


	public String getNivelAcceso() {
		return nivelAcceso;
	}


	public void setNivelAcceso(String nivelAcceso) {
		this.nivelAcceso = nivelAcceso;
	}
	
	
	

}
