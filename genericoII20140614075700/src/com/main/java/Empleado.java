package com.main.java;

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

import com.main.cliente.dto.SgiPersona;

@Entity
@Table(name = "empleado")
public class Empleado {
	
	@Id
	@Column(name = "empleado_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "empleado_id_seq")
	private Integer empleadoId;
	@Column(name = "emp_estado")
	private boolean empleadoEstado = true;
	@Column(name = "emp_descripcion")
	private String empleadoDescripcion;
	@Column(name = "emp_fecha_ingreso")
	private String empleadoFechaIngreso;
	@Column(name = "emp_padre")
	private String empleadoPadre;
	@Column(name = "emp_hijo")
	private String empleadoHijo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "persona_id")
	private SgiPersona sgiPersona;
	public Integer getEmpleadoId() {
		return empleadoId;
	}
	public void setEmpleadoId(Integer empleadoId) {
		this.empleadoId = empleadoId;
	}
	public boolean isEmpleadoEstado() {
		return empleadoEstado;
	}
	public void setEmpleadoEstado(boolean empleadoEstado) {
		this.empleadoEstado = empleadoEstado;
	}
	public String getEmpleadoDescripcion() {
		return empleadoDescripcion;
	}
	public void setEmpleadoDescripcion(String empleadoDescripcion) {
		this.empleadoDescripcion = empleadoDescripcion;
	}
	public String getEmpleadoFechaIngreso() {
		return empleadoFechaIngreso;
	}
	public void setEmpleadoFechaIngreso(String empleadoFechaIngreso) {
		this.empleadoFechaIngreso = empleadoFechaIngreso;
	}
	public String getEmpleadoPadre() {
		return empleadoPadre;
	}
	public void setEmpleadoPadre(String empleadoPadre) {
		this.empleadoPadre = empleadoPadre;
	}
	public String getEmpleadoHijo() {
		return empleadoHijo;
	}
	public void setEmpleadoHijo(String empleadoHijo) {
		this.empleadoHijo = empleadoHijo;
	}
	public SgiPersona getSgiPersona() {
		return sgiPersona;
	}
	public void setSgiPersona(SgiPersona sgiPersona) {
		this.sgiPersona = sgiPersona;
	}
	
}
