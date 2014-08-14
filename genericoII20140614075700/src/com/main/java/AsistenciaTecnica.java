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
@Table(name = "empleado_asistencia_tecnica")
public class AsistenciaTecnica {

	@Id
	@Column(name = "emp_asis_tec_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "emp_asis_tec_id_seq")
	private Integer empleadoAsistenciaTecnicaId;
	@Column(name = "emp_asis_tec_titulo")
	private String empleadoAsistenciaTecnicaTitulo;
	@Column(name = "emp_asis_tec_descripcion")	
	private String empleadoAsistenciaTecnicaDescripcion;
	@Column(name = "emp_asis_tec_telefono")
	private String empleadoAsistenciaTecnicaTelefono;
	@Column(name = "emp_asis_tec_direccion")
	private String empleadoAsistenciaTecnicaDireccion;
	@Column(name = "emp_asis_tec_email")
	private String empleadoAsistenciaTecnicaEmail;
	@Column(name = "emp_asis_tec_estado")
	private String empleadoAsistenciaTecnicaEstado;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;
	
	public Integer getEmpleadoAsistenciaTecnicaId() {
		return empleadoAsistenciaTecnicaId;
	}
	public void setEmpleadoAsistenciaTecnicaId(Integer empleadoAsistenciaTecnicaId) {
		this.empleadoAsistenciaTecnicaId = empleadoAsistenciaTecnicaId;
	}
	public String getEmpleadoAsistenciaTecnicaTitulo() {
		return empleadoAsistenciaTecnicaTitulo;
	}
	public void setEmpleadoAsistenciaTecnicaTitulo(
			String empleadoAsistenciaTecnicaTitulo) {
		this.empleadoAsistenciaTecnicaTitulo = empleadoAsistenciaTecnicaTitulo;
	}
	public String getEmpleadoAsistenciaTecnicaDescripcion() {
		return empleadoAsistenciaTecnicaDescripcion;
	}
	public void setEmpleadoAsistenciaTecnicaDescripcion(
			String empleadoAsistenciaTecnicaDescripcion) {
		this.empleadoAsistenciaTecnicaDescripcion = empleadoAsistenciaTecnicaDescripcion;
	}
	public String getEmpleadoAsistenciaTecnicaTelefono() {
		return empleadoAsistenciaTecnicaTelefono;
	}
	public void setEmpleadoAsistenciaTecnicaTelefono(
			String empleadoAsistenciaTecnicaTelefono) {
		this.empleadoAsistenciaTecnicaTelefono = empleadoAsistenciaTecnicaTelefono;
	}
	public String getEmpleadoAsistenciaTecnicaDireccion() {
		return empleadoAsistenciaTecnicaDireccion;
	}
	public void setEmpleadoAsistenciaTecnicaDireccion(
			String empleadoAsistenciaTecnicaDireccion) {
		this.empleadoAsistenciaTecnicaDireccion = empleadoAsistenciaTecnicaDireccion;
	}
	public String getEmpleadoAsistenciaTecnicaEmail() {
		return empleadoAsistenciaTecnicaEmail;
	}
	public void setEmpleadoAsistenciaTecnicaEmail(
			String empleadoAsistenciaTecnicaEmail) {
		this.empleadoAsistenciaTecnicaEmail = empleadoAsistenciaTecnicaEmail;
	}
	public String getEmpleadoAsistenciaTecnicaEstado() {
		return empleadoAsistenciaTecnicaEstado;
	}
	public void setEmpleadoAsistenciaTecnicaEstado(
			String empleadoAsistenciaTecnicaEstado) {
		this.empleadoAsistenciaTecnicaEstado = empleadoAsistenciaTecnicaEstado;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	
}