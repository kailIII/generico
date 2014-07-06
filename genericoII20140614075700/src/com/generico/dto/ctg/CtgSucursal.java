package com.generico.dto.ctg;

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
@Table(name = "ctg_sucursal")
public class CtgSucursal {
	@Id
	@Column(name = "ctg_suc_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_sucursal_seq")
	private Long ctgSucursalId;
	@Column(name = "ctg_suc_nombre", nullable = false, length = 100)
	private String ctgSucursalNombre;
	@Column(name = "ctg_suc_activo", nullable = false, length = 1)
	private String ctgSucursalActivo = "1";
	@Column(name = "ctg_suc_codigo", length = 10)
	private String ctgSucursalCodigo;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_stsuc_id", nullable = false)
	private CtgSubTipoSucursal ctgSubTipoSucursal;



	public String getCtgSucursalCodigo() {
		return ctgSucursalCodigo;
	}

	public void setCtgSucursalCodigo(String ctgSucursalCodigo) {
		this.ctgSucursalCodigo = ctgSucursalCodigo;
	}

	public Long getCtgSucursalId() {
		return ctgSucursalId;
	}

	public void setCtgSucursalId(Long ctgSucursalId) {
		this.ctgSucursalId = ctgSucursalId;
	}

	public String getCtgSucursalNombre() {
		return ctgSucursalNombre;
	}

	public void setCtgSucursalNombre(String ctgSucursalNombre) {
		this.ctgSucursalNombre = ctgSucursalNombre;
	}

	public String getCtgSucursalActivo() {
		return ctgSucursalActivo;
	}

	public void setCtgSucursalActivo(String ctgSucursalActivo) {
		this.ctgSucursalActivo = ctgSucursalActivo;
	}

	public CtgSubTipoSucursal getCtgSubTipoSucursal() {
		return ctgSubTipoSucursal;
	}

	public void setCtgSubTipoSucursal(CtgSubTipoSucursal ctgSubTipoSucursal) {
		this.ctgSubTipoSucursal = ctgSubTipoSucursal;
	}

}
