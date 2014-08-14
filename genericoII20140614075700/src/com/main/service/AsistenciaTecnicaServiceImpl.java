
package com.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.main.java.AsistenciaTecnica;
import com.main.java.Producto;
import com.main.dao.*;


@Service
public class AsistenciaTecnicaServiceImpl implements AsistenciaTecnicaService  {


	@Autowired
	private AsistenciaTecnicaDAO asistenciaTecnicaDAO ;


	@Transactional
	public List<AsistenciaTecnica> listAsistenciaTecnica() {

		return asistenciaTecnicaDAO.listAsistenciaTecnica();
	}





}
