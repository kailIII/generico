package Prueba.combobox;

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

import com.main.java.CtgDepartamento;



@Entity
@Table(name = "municipio")
public class Municipio {

	@Id
	@Column(name = "ctg_municipio_id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_municipio_id_seq")
	private Integer catalogoMunicipioId;
	@Column(name = "ctg_mun_nombre")
	private String catalogoMunicipioNombre;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ctg_depto_id")
	private CtgDepartamento departamento;

	
	// aqui tenemos el constructor
	
	public Municipio(Integer catalogoMunicipioId,
			String catalogoMunicipioNombre, CtgDepartamento departamento) {
		super();
		this.catalogoMunicipioId = catalogoMunicipioId;
		this.catalogoMunicipioNombre = catalogoMunicipioNombre;
		this.departamento = departamento;
	}

	
	
	// aqui tenemos los (setters and getters)

	public Integer getCatalogoMunicipioId() {
		return catalogoMunicipioId;
	}


	public void setCatalogoMunicipioId(Integer catalogoMunicipioId) {
		this.catalogoMunicipioId = catalogoMunicipioId;
	}


	public String getCatalogoMunicipioNombre() {
		return catalogoMunicipioNombre;
	}


	public void setCatalogoMunicipioNombre(String catalogoMunicipioNombre) {
		this.catalogoMunicipioNombre = catalogoMunicipioNombre;
	}


	public CtgDepartamento getDepartamento() {
		return departamento;
	}


	public void setDepartamento(CtgDepartamento departamento) {
		this.departamento = departamento;
	}
	
	// metodo tostring
	
	@Override
	public String toString() {
		return catalogoMunicipioId + "-" ;
	}
	
	
}