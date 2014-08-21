package com.main.java;

// Generated 04-10-2014 04:49:49 PM by Hibernate Tools 3.4.0.CR1


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
import com.main.cliente.dto.SgiPersona;



@Entity
@Table(name = "telefono")
public class Telefono {

	@Id
	@Column(name = "telefono_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "telefono_id_seq")
	private Long telefonoId;
	
	@Column(name = "telefono_no")
	private Long telefonoNumero;
	
	@Column(name = "telefono_extension")	
	private Long telefonoExtencion;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_cat_id")
	private CtgCatalogo ctgCatalogo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "persona_id")
	private SgiPersona sgiPersona;

	public Long getTelefonoId() {
		return telefonoId;
	}

	public void setTelefonoId(Long telefonoId) {
		this.telefonoId = telefonoId;
	}

	public Long getTelefonoNumero() {
		return telefonoNumero;
	}

	public void setTelefonoNumero(Long telefonoNumero) {
		this.telefonoNumero = telefonoNumero;
	}

	public Long getTelefonoExtencion() {
		return telefonoExtencion;
	}

	public void setTelefonoExtencion(Long telefonoExtencion) {
		this.telefonoExtencion = telefonoExtencion;
	}

	public CtgCatalogo getCtgCatalogo() {
		return ctgCatalogo;
	}

	public void setCtgCatalogo(CtgCatalogo ctgCatalogo) {
		this.ctgCatalogo = ctgCatalogo;
	}

	public SgiPersona getSgiPersona() {
		return sgiPersona;
	}

	public void setSgiPersona(SgiPersona sgiPersona) {
		this.sgiPersona = sgiPersona;
	}
}