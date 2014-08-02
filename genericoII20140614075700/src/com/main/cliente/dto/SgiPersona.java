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
@Entity
@Table(name= "sgi_persona")
public class SgiPersona {
	
	@Id
	@Column(name = "sgi_per_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize  = 1, name = "IdGenerator", sequenceName = "sgi_per_id_seq")
	private Long sgiPersonaId;
	@Column(name = "sgi_per_primer_nombre")
	private String sgiPersonaPrimerNombre;
	@Column(name = "sgi_per_segundo_nombre")
	private String sgiPersonaSegundoNombre;
	@Column(name = "sgi_per_primer_apellido")
	private String sgiPersonaPrimerApellido;
	@Column(name = "sgi_per_segundo_apellido")
	private String sgiPersonaSegundoApellido;
	@Column(name = "sgi_per_dui")
	private String sgiPersonaDui;
	@Column(name = "sgi_per_nit")
	private String sgiPersonaNit;
	@Column(name = "sgi_per_correo_electronico")
	private String sgiPersonaCorreoElectronico;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_suc_id")
	private CtgSucursal ctgSucursal;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_genero_id")
	private CtgCatalogo ctgCatalogo;
	
	public Long getSgiPersonaId() {
		return sgiPersonaId;
	}
	public void setSgiPersonaId(Long sgiPersonaId) {
		this.sgiPersonaId = sgiPersonaId;
	}
	public String getSgiPersonaPrimerNombre() {
		return sgiPersonaPrimerNombre;
	}
	public void setSgiPersonaPrimerNombre(String sgiPersonaPrimerNombre) {
		this.sgiPersonaPrimerNombre = sgiPersonaPrimerNombre;
	}
	public String getSgiPersonaSegundoNombre() {
		return sgiPersonaSegundoNombre;
	}
	public void setSgiPersonaSegundoNombre(String sgiPersonaSegundoNombre) {
		this.sgiPersonaSegundoNombre = sgiPersonaSegundoNombre;
	}
	public String getSgiPersonaPrimerApellido() {
		return sgiPersonaPrimerApellido;
	}
	public void setSgiPersonaPrimerApellido(String sgiPersonaPrimerApellido) {
		this.sgiPersonaPrimerApellido = sgiPersonaPrimerApellido;
	}
	public String getSgiPersonaSegundoApellido() {
		return sgiPersonaSegundoApellido;
	}
	public void setSgiPersonaSegundoApellido(String sgiPersonaSegundoApellido) {
		this.sgiPersonaSegundoApellido = sgiPersonaSegundoApellido;
	}
	public String getSgiPersonaDui() {
		return sgiPersonaDui;
	}
	public void setSgiPersonaDui(String sgiPersonaDui) {
		this.sgiPersonaDui = sgiPersonaDui;
	}
	public String getSgiPersonaNit() {
		return sgiPersonaNit;
	}
	public void setSgiPersonaNit(String sgiPersonaNit) {
		this.sgiPersonaNit = sgiPersonaNit;
	}
	public String getSgiPersonaCorreoElectronico() {
		return sgiPersonaCorreoElectronico;
	}
	public void setSgiPersonaCorreoElectronico(String sgiPersonaCorreoElectronico) {
		this.sgiPersonaCorreoElectronico = sgiPersonaCorreoElectronico;
	}
	public CtgSucursal getCtgSucursal() {
		return ctgSucursal;
	}
	public void setCtgSucursal(CtgSucursal ctgSucursal) {
		this.ctgSucursal = ctgSucursal;
	}
	public CtgCatalogo getCtgCatalogo() {
		return ctgCatalogo;
	}
	public void setCtgCatalogo(CtgCatalogo ctgCatalogo) {
		this.ctgCatalogo = ctgCatalogo;
	}
	
}
