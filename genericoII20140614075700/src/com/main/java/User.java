package com.main.java;

// Generated 04-10-2014 04:49:49 PM by Hibernate Tools 3.4.0.CR1


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

@Id
	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
    @SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "users_id_seq")
	private Integer id;
	private String login;
	private String password;
	@Column(name = "usu_cambiar_clave", nullable = true, length = 2)
	private String usuarioCambiarClave = "1";
	@Column(name = "usu_activo", nullable = false, length = 1)
	private String usuarioActivo = "1";
	
	@Column(name = "usu_primer_nombre", nullable = false, length = 20)
	private String usuarioPrimerNombre;
	@Column(name = "usu_segundo_nombre", nullable = true, length = 20)
	private String usuarioSegundoNombre;
	@Column(name = "usu_primer_apellido", nullable = true, length = 20)
	private String usuarioprimerApellido;
	@Column(name = "usu_segundo_apellido", nullable = false, length = 20)
	private String usuarioSegundoApellido;
	@Column(name = "usu_correo_electronico", nullable = true, length = 80)
	private String usuarioCorreoElectronico;
	@Column(name = "usu_documento", nullable = true, length = 20)
	private String usuarioDocumento;
	
	@OneToOne(cascade=CascadeType.ALL)
    @JoinTable(name="user_roles",
        joinColumns = {@JoinColumn(name="user_id", referencedColumnName="id")},
        inverseJoinColumns = {@JoinColumn(name="role_id", referencedColumnName="id")}
    )
	private Role role;

    public Integer getId() {
        return id;
    }
 
    public void setId(Integer id) {
        this.id = id;
    }
 
    public String getLogin() {
        return login;
    }
 
    public void setLogin(String login) {
        this.login = login;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public Role getRole() {
        return role;
    }
 
    public void setRole(Role role) {
        this.role = role;
    }

	public String getUsuarioCambiarClave() {
		return usuarioCambiarClave;
	}

	public void setUsuarioCambiarClave(String usuarioCambiarClave) {
		this.usuarioCambiarClave = usuarioCambiarClave;
	}

	public String getUsuarioActivo() {
		return usuarioActivo;
	}

	public void setUsuarioActivo(String usuarioActivo) {
		this.usuarioActivo = usuarioActivo;
	}

	public String getUsuarioPrimerNombre() {
		return usuarioPrimerNombre;
	}

	public void setUsuarioPrimerNombre(String usuarioPrimerNombre) {
		this.usuarioPrimerNombre = usuarioPrimerNombre;
	}

	public String getUsuarioSegundoNombre() {
		return usuarioSegundoNombre;
	}

	public void setUsuarioSegundoNombre(String usuarioSegundoNombre) {
		this.usuarioSegundoNombre = usuarioSegundoNombre;
	}

	public String getUsuarioprimerApellido() {
		return usuarioprimerApellido;
	}

	public void setUsuarioprimerApellido(String usuarioprimerApellido) {
		this.usuarioprimerApellido = usuarioprimerApellido;
	}

	public String getUsuarioSegundoApellido() {
		return usuarioSegundoApellido;
	}

	public void setUsuarioSegundoApellido(String usuarioSegundoApellido) {
		this.usuarioSegundoApellido = usuarioSegundoApellido;
	}

	public String getUsuarioCorreoElectronico() {
		return usuarioCorreoElectronico;
	}

	public void setUsuarioCorreoElectronico(String usuarioCorreoElectronico) {
		this.usuarioCorreoElectronico = usuarioCorreoElectronico;
	}

	public String getUsuarioDocumento() {
		return usuarioDocumento;
	}

	public void setUsuarioDocumento(String usuarioDocumento) {
		this.usuarioDocumento = usuarioDocumento;
	}  
    
    
	
}
