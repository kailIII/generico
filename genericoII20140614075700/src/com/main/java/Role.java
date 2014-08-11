package com.main.java;

// Generated 04-10-2014 04:49:49 PM by Hibernate Tools 3.4.0.CR1

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;

@Entity
@Table(name = "ctg_rol")
public class Role {

	@Id
	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IdGenerator")
	@SequenceGenerator(allocationSize = 1, name = "IdGenerator", sequenceName = "ctg_rol_id_seq")
	private int roleId;
	private String role;
	@Column(name = "role_activo", nullable = true, length = 2)
	private String roleActivo;
	@OneToMany(cascade=CascadeType.ALL)
    @JoinTable(name="user_roles",
        joinColumns = {@JoinColumn(name="role_id", referencedColumnName="id")},
        inverseJoinColumns = {@JoinColumn(name="user_id", referencedColumnName="id")}
    )
    private Set<User> userRoles;
 
 
    public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleActivo() {
		return roleActivo;
	}

	public void setRoleActivo(String roleActivo) {
		this.roleActivo = roleActivo;
	}

	public String getRole() {
        return role;
    }
 
    public void setRole(String role) {
        this.role = role;
    }
 
    public Set<User> getUserRoles() {
        return userRoles;
    }
 
    public void setUserRoles(Set<User> userRoles) {
        this.userRoles = userRoles;
    }
     
}