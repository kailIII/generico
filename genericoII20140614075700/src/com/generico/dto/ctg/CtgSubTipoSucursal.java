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
@Table(name = "ctg_subtipo_sucursal")
public class CtgSubTipoSucursal {
	@Id
	@Column(name = "ctg_stsuc_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_subtipo_sucursal_seq")
	private Long ctgSubTipoSucursalId;
	@Column(name = "ctg_stsuc_codigo", nullable = false, length = 20)
	private String ctgSubTipoSucursalCodigo;
	@Column(name = "ctg_stsuc_nombre", nullable = false, length = 100)
	private String ctgSubTipoSucursalNombre;
	@Column(name = "ctg_stsuc_activo", nullable = false, length = 1)
	private String ctgSubTipoSucursalActivo = "1";
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_tsuc_id", nullable = false)
	private CtgTipoSucursal ctgTipoSucursal;

	public Long getCtgSubTipoSucursalId() {
		return ctgSubTipoSucursalId;
	}

	public void setCtgSubTipoSucursalId(Long ctgSubTipoSucursalId) {
		this.ctgSubTipoSucursalId = ctgSubTipoSucursalId;
	}

	public String getCtgSubTipoSucursalCodigo() {
		return ctgSubTipoSucursalCodigo;
	}

	public void setCtgSubTipoSucursalCodigo(String ctgSubTipoSucursalCodigo) {
		this.ctgSubTipoSucursalCodigo = ctgSubTipoSucursalCodigo;
	}

	public String getCtgSubTipoSucursalNombre() {
		return ctgSubTipoSucursalNombre;
	}

	public void setCtgSubTipoSucursalNombre(String ctgSubTipoSucursalNombre) {
		this.ctgSubTipoSucursalNombre = ctgSubTipoSucursalNombre;
	}

	public String getCtgSubTipoSucursalActivo() {
		return ctgSubTipoSucursalActivo;
	}

	public void setCtgSubTipoSucursalActivo(String ctgSubTipoSucursalActivo) {
		this.ctgSubTipoSucursalActivo = ctgSubTipoSucursalActivo;
	}

	public CtgTipoSucursal getCtgTipoSucursal() {
		return ctgTipoSucursal;
	}

	public void setCtgTipoSucursal(CtgTipoSucursal ctgTipoSucursal) {
		this.ctgTipoSucursal = ctgTipoSucursal;
	}
}
