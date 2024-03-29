package com.main.java;

// Generated 03-27-2014 03:31:32 PM by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Proveedorproducto generated by hbm2java
 */
@Entity
@Table(name = "proveedorproducto")
public class Proveedorproducto implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idProductoproveedor;
	private int idProveedor;
	private int idProducto;
	private String preciounitario;

	public Proveedorproducto() {
	}

	public Proveedorproducto(int idProductoproveedor, int idProveedor,
			int idProducto) {
		this.idProductoproveedor = idProductoproveedor;
		this.idProveedor = idProveedor;
		this.idProducto = idProducto;
	}

	public Proveedorproducto(int idProductoproveedor, int idProveedor,
			int idProducto, String preciounitario) {
		this.idProductoproveedor = idProductoproveedor;
		this.idProveedor = idProveedor;
		this.idProducto = idProducto;
		this.preciounitario = preciounitario;
	}

	@Id
	@Column(name = "id_productoproveedor", unique = true, nullable = false)
	public int getIdProductoproveedor() {
		return this.idProductoproveedor;
	}

	public void setIdProductoproveedor(int idProductoproveedor) {
		this.idProductoproveedor = idProductoproveedor;
	}

	@Column(name = "id_proveedor", nullable = false)
	public int getIdProveedor() {
		return this.idProveedor;
	}

	public void setIdProveedor(int idProveedor) {
		this.idProveedor = idProveedor;
	}

	@Column(name = "id_producto", nullable = false)
	public int getIdProducto() {
		return this.idProducto;
	}

	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}

	@Column(name = "preciounitario", length = 50)
	public String getPreciounitario() {
		return this.preciounitario;
	}

	public void setPreciounitario(String preciounitario) {
		this.preciounitario = preciounitario;
	}

}
