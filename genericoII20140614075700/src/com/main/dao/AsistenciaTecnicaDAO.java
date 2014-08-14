package com.main.dao;

import java.util.List;

import com.generico.exception.AsiWebException;
import com.main.java.AsistenciaTecnica;

public interface AsistenciaTecnicaDAO {
	public List<AsistenciaTecnica> listAsistenciaTecnica();
	public void saveAsistenciaTecnica(AsistenciaTecnica asistenciaTecnica)
			throws AsiWebException;

}