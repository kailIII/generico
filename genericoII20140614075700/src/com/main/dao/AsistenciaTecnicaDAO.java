package com.main.dao;

import com.generico.exception.AsiWebException;
import com.main.java.AsistenciaTecnica;

public interface AsistenciaTecnicaDAO {

	public void saveAsistenciaTecnica(AsistenciaTecnica asistenciaTecnica)
			throws AsiWebException;

}