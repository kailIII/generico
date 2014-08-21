package com.main.dao;

import java.util.List;

import com.generico.exception.AsiWebException;
import com.main.cliente.dto.SgiPersona;
import com.main.java.CtgDepartamento;

public interface SgiPersonaDao {

	public void savePersona(SgiPersona sgiPersona) throws AsiWebException;
	public List<CtgDepartamento> busquedaDepto();

}