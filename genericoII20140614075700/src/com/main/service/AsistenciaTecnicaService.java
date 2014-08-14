package com.main.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.main.java.AsistenciaTecnica;

public interface AsistenciaTecnicaService {

	@Transactional
	public List<AsistenciaTecnica> listAsistenciaTecnica();

}