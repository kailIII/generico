package com.main.java;

// Generated 04-10-2014 04:49:49 PM by Hibernate Tools 3.4.0.CR1


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.generico.dto.ctg.CtgCatalogo;
import com.main.cliente.dto.SgiPersona;


@Entity
@Table(name = "cliente")
public class Cliente {

	@Id
	@Column(name = "cliente_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "cliente_id_seq")
	private Integer clienteId;
	@Column(name = "cliente_no_cuenta")
	private String clienteNumeroDeCuenta;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tipo_cliente_id")
	private CtgCatalogo ctgCatalogo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "persona_id")
	private SgiPersona sgiPersona;

	public Integer getClienteId() {
		return clienteId;
	}

	public void setClienteId(Integer clienteId) {
		this.clienteId = clienteId;
	}

	public String getClienteNumeroDeCuenta() {
		return clienteNumeroDeCuenta;
	}

	public void setClienteNumeroDeCuenta(String clienteNumeroDeCuenta) {
		this.clienteNumeroDeCuenta = clienteNumeroDeCuenta;
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