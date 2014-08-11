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
@Table(name = "usuario")
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

}