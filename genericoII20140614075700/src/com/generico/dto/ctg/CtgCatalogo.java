package com.generico.dto.ctg;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "ctg_catalogo")
public class CtgCatalogo {
	@Id
	@Column(name = "ctg_cat_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_catalogo_id_seq")
	private Long ctgCatalogoId;
	@Column(name = "ctg_cat_activo", nullable = false, length = 1)
	private String ctgCatalogoActivo = "1";
	@Column(name = "ctg_cat_hijo", nullable = false, length = 5)
	private String ctgCatalogoHijo = "00000";
	@Column(name = "ctg_cat_nombre", nullable = false, length = 100)
	private String ctgCatalogoNombre;
	@Column(name = "ctg_cat_padre", nullable = false, length = 5)
	private String ctgCatalogoPadre;
	@Column(name= "ctg_cat_detallar", length = 1)
	private String ctgCatalogoDetallar;


	public String getCtgCatalogoDetallar() {
		return ctgCatalogoDetallar;
	}

	public void setCtgCatalogoDetallar(String ctgCatalogoDetallar) {
		this.ctgCatalogoDetallar = ctgCatalogoDetallar;
	}

	public CtgCatalogo() {
	}

	public CtgCatalogo(Long ctgCatalogoId) {
		this.ctgCatalogoId = ctgCatalogoId;
	}

	public Long getCtgCatalogoId() {
		return ctgCatalogoId;
	}

	public void setCtgCatalogoId(Long ctgCatalogoId) {
		this.ctgCatalogoId = ctgCatalogoId;
	}

	public String getCtgCatalogoPadre() {
		return ctgCatalogoPadre;
	}

	public void setCtgCatalogoPadre(String ctgCatalogoPadre) {
		this.ctgCatalogoPadre = ctgCatalogoPadre;
	}

	public String getCtgCatalogoHijo() {
		return ctgCatalogoHijo;
	}

	public void setCtgCatalogoHijo(String ctgCatalogoHijo) {
		this.ctgCatalogoHijo = ctgCatalogoHijo;
	}

	public String getCtgCatalogoNombre() {
		return ctgCatalogoNombre;
	}

	public void setCtgCatalogoNombre(String ctgCatalogoNombre) {
		this.ctgCatalogoNombre = ctgCatalogoNombre;
	}

	public String getCtgCatalogoActivo() {
		return ctgCatalogoActivo;
	}

	public void setCtgCatalogoActivo(String ctgCatalogoActivo) {
		this.ctgCatalogoActivo = ctgCatalogoActivo;
	}

}
