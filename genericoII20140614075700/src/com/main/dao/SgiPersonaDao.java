package com.main.dao;

import com.generico.exception.AsiWebException;
import com.main.cliente.dto.SgiPersona;

public interface SgiPersonaDao {

	public void savePersona(SgiPersona sgiPersona) throws AsiWebException;

}