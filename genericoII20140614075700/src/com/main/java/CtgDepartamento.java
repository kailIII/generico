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


@Entity
@Table(name = "ctg_departamento")
public class CtgDepartamento {

	@Id
	@Column(name = "ctg_depto_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_depto_id_seq")
	private Integer catalogoDepartamentoId;
	@Column(name = "ctg_depto_nombre")
	private String catalogoDepartamentoNombre;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_pais_id")
	private CtgPais ctgPais;
	
	

	public Integer getCatalogoDepartamentoId() {
		return catalogoDepartamentoId;
	}

	public void setCatalogoDepartamentoId(Integer catalogoDepartamentoId) {
		this.catalogoDepartamentoId = catalogoDepartamentoId;
	}

	public String getCatalogoDepartamentoNombre() {
		return catalogoDepartamentoNombre;
	}

	public void setCatalogoDepartamentoNombre(String catalogoDepartamentoNombre) {
		this.catalogoDepartamentoNombre = catalogoDepartamentoNombre;
	}

	public CtgPais getCtgPais() {
		return ctgPais;
	}

	public void setCtgPais(CtgPais ctgPais) {
		this.ctgPais = ctgPais;
	}

	
}