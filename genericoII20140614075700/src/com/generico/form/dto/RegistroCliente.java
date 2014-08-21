package com.generico.form.dto;

import com.main.java.CtgDepartamento;
import com.main.java.CtgMunicipio;

public class RegistroCliente {
	
	private Long sgiPersonaId;
	private String PersonaPrimerNombre;
	private String PersonaSegundoNombre;
	private String PersonaPrimerApellido;
	private String PersonaSegundoApellido;
	private String personaDireccion;
	private String personaEmail;
	private String login;
	private String password;
	private String ctgMunicipio;
	private String ctgDepartamento;
	public Long getSgiPersonaId() {
		return sgiPersonaId;
	}
	public void setSgiPersonaId(Long sgiPersonaId) {
		this.sgiPersonaId = sgiPersonaId;
	}
	public String getPersonaPrimerNombre() {
		return PersonaPrimerNombre;
	}
	public void setPersonaPrimerNombre(String personaPrimerNombre) {
		PersonaPrimerNombre = personaPrimerNombre;
	}
	public String getPersonaSegundoNombre() {
		return PersonaSegundoNombre;
	}
	public void setPersonaSegundoNombre(String personaSegundoNombre) {
		PersonaSegundoNombre = personaSegundoNombre;
	}
	public String getPersonaPrimerApellido() {
		return PersonaPrimerApellido;
	}
	public void setPersonaPrimerApellido(String personaPrimerApellido) {
		PersonaPrimerApellido = personaPrimerApellido;
	}
	public String getPersonaSegundoApellido() {
		return PersonaSegundoApellido;
	}
	public void setPersonaSegundoApellido(String personaSegundoApellido) {
		PersonaSegundoApellido = personaSegundoApellido;
	}
	public String getPersonaDireccion() {
		return personaDireccion;
	}
	public void setPersonaDireccion(String personaDireccion) {
		this.personaDireccion = personaDireccion;
	}
	public String getPersonaEmail() {
		return personaEmail;
	}
	public void setPersonaEmail(String personaEmail) {
		this.personaEmail = personaEmail;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getCtgDepartamento() {
		return ctgDepartamento;
	}
	public void setCtgDepartamento(String ctgDepartamento) {
		this.ctgDepartamento = ctgDepartamento;
	}
	public String getCtgMunicipio() {
		return ctgMunicipio;
	}
	public void setCtgMunicipio(String ctgMunicipio) {
		this.ctgMunicipio = ctgMunicipio;
	}
}
