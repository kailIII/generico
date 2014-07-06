package com.generico.dto.ctg;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "ctg_tipo_sucursal")
public class CtgTipoSucursal {
	@Id
	@Column(name = "ctg_tsuc_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_tipo_sucursal_seq")
	private Long ctgTipoSucursalId;
	@Column(name = "ctg_tsuc_nombre", nullable = false, length = 100)
	private String ctgTipoSucursalNombre;
	@Column(name = "ctg_tsuc_activo", nullable = false, length = 1)
	private String ctgTipoSucursalActivo = "1";

	public Long getCtgTipoSucursalId() {
		return ctgTipoSucursalId;
	}

	public void setCtgTipoSucursalId(Long ctgTipoSucursalId) {
		this.ctgTipoSucursalId = ctgTipoSucursalId;
	}

	public String getCtgTipoSucursalNombre() {
		return ctgTipoSucursalNombre;
	}

	public void setCtgTipoSucursalNombre(String ctgTipoSucursalNombre) {
		this.ctgTipoSucursalNombre = ctgTipoSucursalNombre;
	}

	public String getCtgTipoSucursalActivo() {
		return ctgTipoSucursalActivo;
	}

	public void setCtgTipoSucursalActivo(String ctgTipoSucursalActivo) {
		this.ctgTipoSucursalActivo = ctgTipoSucursalActivo;
	}

}
