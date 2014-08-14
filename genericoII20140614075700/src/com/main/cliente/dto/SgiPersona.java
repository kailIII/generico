package com.main.cliente.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.generico.dto.ctg.CtgCatalogo;
import com.generico.dto.ctg.CtgSucursal;
import com.main.java.User;
@Entity
@Table(name= "persona")
public class SgiPersona {
	
	@Id
	@Column(name = "persona_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize  = 1, name = "IdGenerator", sequenceName = "sgi_per_id_seq")
	private Long sgiPersonaId;
	@Column(name = "persona_primer_nombre")
	private String PersonaPrimerNombre;
	@Column(name = "persona_segundo_nombre")
	private String PersonaSegundoNombre;
	@Column(name = "persona_primer_apellido")
	private String PersonaPrimerApellido;
	@Column(name = "persona_segundo_apellido")
	private String PersonaSegundoApellido;
	@Column(name = "persona_direccion")
	private String personaDireccion;
	@Column(name = "persona_email")
	private String personaNit;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id")
	private User user;

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

	public String getPersonaNit() {
		return personaNit;
	}

	public void setPersonaNit(String personaNit) {
		this.personaNit = personaNit;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}
