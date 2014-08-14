package com.main.dao;

import java.util.List;




import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.generico.base.BaseDaoImpl;
import com.generico.exception.AsiWebException;
import com.main.java.AsistenciaTecnica;
import com.main.java.Producto;


@Transactional
@Repository
public class AsistenciaTecnicaDAOImpl  extends BaseDaoImpl implements AsistenciaTecnicaDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public void saveAsistenciaTecnica(AsistenciaTecnica asistenciaTecnica) throws AsiWebException{
	save(asistenciaTecnica);
	
	}

}
