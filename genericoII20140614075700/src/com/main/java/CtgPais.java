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
@Table(name = "ctg_pais")
public class CtgPais {

	@Id
	@Column(name = "ctg_pais_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_pais_id_seq")
	private Long catalogoPaisId;
	@Column(name = "ctg_pais_nombre")
	private String catalogoPaisNombre;
	
	
	public Long getCatalogoPaisId() {
		return catalogoPaisId;
	}
	public void setCatalogoPaisId(Long catalogoPaisId) {
		this.catalogoPaisId = catalogoPaisId;
	}
	public String getCatalogoPaisNombre() {
		return catalogoPaisNombre;
	}
	public void setCatalogoPaisNombre(String catalogoPaisNombre) {
		this.catalogoPaisNombre = catalogoPaisNombre;
	}
}