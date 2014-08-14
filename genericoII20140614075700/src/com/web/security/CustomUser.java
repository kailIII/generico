package com.web.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUser extends User implements UserDetails{
	
	private static final long serialVersionUID = 3668084416659011020L;
	private Long userId;
	private String user;
	private String fullName;
	private String sucursal;
	private String subTipoSucursal;
	private String tipoSucursal;
	private String requiredChangePassword;
	private Long sucursalId;
	private Long subTipoSucursalId;
	private Long tipoSucursalId;
	private String nivelAcceso;
	private Integer clienteId;
	
	public CustomUser(String username, String password, boolean enabled,
			boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired,
				accountNonLocked, authorities);
	}

	
	public Integer getClienteId() {
		return clienteId;
	}


	public void setClienteId(Integer clienteId) {
		this.clienteId = clienteId;
	}


	public String getNivelAcceso() {
		return nivelAcceso;
	}

	public void setNivelAcceso(String nivelAcceso) {
		this.nivelAcceso = nivelAcceso;
	}

	
	public Long getUserId() {
		return userId;
	}
	
	public String getUserIdAsString() {
		if(userId != null) return userId.toString();
		return "";
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getSucursal() {
		return sucursal;
	}

	public void setSucursal(String sucursal) {
		this.sucursal = sucursal;
	}

	public String getSubTipoSucursal() {
		return subTipoSucursal;
	}

	public String getSubTipoSucursalIdAsString() {
		if(subTipoSucursalId != null) return subTipoSucursalId.toString();
		return "";
	}

	public void setSubTipoSucursal(String subTipoSucursal) {
		this.subTipoSucursal = subTipoSucursal;
	}

	public String getTipoSucursal() {
		return tipoSucursal;
	}

	public void setTipoSucursal(String tipoSucursal) {
		this.tipoSucursal = tipoSucursal;
	}

	public Long getSucursalId() {
		return sucursalId;
	}

	public String getSucursalIdAsString() {
		if(sucursalId != null) return sucursalId.toString();
		return "";
	}

	public void setSucursalId(Long sucursalId) {
		this.sucursalId = sucursalId;
	}

	public Long getSubTipoSucursalId() {
		return subTipoSucursalId;
	}

	public void setSubTipoSucursalId(Long subTipoSucursalId) {
		this.subTipoSucursalId = subTipoSucursalId;
	}

	public String getTipoSucursalIdAsString() {
		if(tipoSucursalId != null) return tipoSucursalId.toString();
		return "";
	}
	
	public Long getTipoSucursalId() {
		return tipoSucursalId;
	}

	public void setTipoSucursalId(Long tipoSucursalId) {
		this.tipoSucursalId = tipoSucursalId;
	}

	public String getRequiredChangePassword() {
		return requiredChangePassword;
	}

	public void setRequiredChangePassword(String requiredChangePassword) {
		this.requiredChangePassword = requiredChangePassword;
	}
}
