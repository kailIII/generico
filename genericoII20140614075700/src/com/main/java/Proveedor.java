package com.main.java;

// Generated 03-27-2014 03:31:32 PM by Hibernate Tools 3.4.0.CR1

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Proveedor generated by hbm2java
 */
@Entity
@Table(name = "proveedor")
public class Proveedor implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idProveedor;
	private String nombre;
	private String telefono;
	private String celuar;
	private String email;
	private Date fechaIngreso;
	private Boolean estado;

	public Proveedor() {
	}

	public Proveedor(int idProveedor) {
		this.idProveedor = idProveedor;
	}

	public Proveedor(int idProveedor, String nombre, String telefono,
			String celuar, String email, Date fechaIngreso, Boolean estado) {
		this.idProveedor = idProveedor;
		this.nombre = nombre;
		this.telefono = telefono;
		this.celuar = celuar;
		this.email = email;
		this.fechaIngreso = fechaIngreso;
		this.estado = estado;
	}

	@Id
	@Column(name = "id_proveedor", unique = true, nullable = false)
	public int getIdProveedor() {
		return this.idProveedor;
	}

	public void setIdProveedor(int idProveedor) {
		this.idProveedor = idProveedor;
	}

	@Column(name = "nombre", length = 50)
	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Column(name = "telefono", length = 15)
	public String getTelefono() {
		return this.telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	@Column(name = "celuar", length = 15)
	public String getCeluar() {
		return this.celuar;
	}

	public void setCeluar(String celuar) {
		this.celuar = celuar;
	}

	@Column(name = "email", length = 50)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "fecha_ingreso", length = 13)
	public Date getFechaIngreso() {
		return this.fechaIngreso;
	}

	public void setFechaIngreso(Date fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	@Column(name = "estado")
	public Boolean getEstado() {
		return this.estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}

}
