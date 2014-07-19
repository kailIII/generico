package com.generico.dso.sgd;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.generico.exception.AsiWebException;

public interface UsuarioService {

	@Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false, rollbackFor = {
			Exception.class, AsiWebException.class })
	public void updateRolesByUser(Integer usrId, String[] rolesCheked) throws AsiWebException;

}