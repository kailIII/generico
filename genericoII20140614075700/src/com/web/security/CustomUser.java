package com.web.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.main.java.Cliente;

public class CustomUser extends User implements UserDetails{
	
	private static final long serialVersionUID = 3668084416659011020L;
	private Long userId;
	private String username;
	private String fullName;
	private String password;
	private String sucursal;
	private String subTipoSucursal;
	private String tipoSucursal;
	private String requiredChangePassword;
	private Long sucursalId;
	private Long subTipoSucursalId;
	private Long tipoSucursalId;
	private String nivelAcceso;
	private Long clienteId;
	private Cliente cliente;
	
	public CustomUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities)
	{
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.username = username;
        this.password = password;
        
	}

	public CustomUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, Long userId, Cliente cliente)
	{
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.username = username;
        this.password = password;
        this.userId = userId;
        this.cliente = cliente;
        
	}
	
	
	
	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public Long getClienteId() {
		return clienteId;
	}


	public void setClienteId(Long clienteId) {
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
