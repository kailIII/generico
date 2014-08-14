package com.main.dao;

import com.generico.exception.AsiWebException;
import com.main.java.Cliente;

public interface ClienteDAO {

	public Cliente findByClienteId(Long clienteId) throws AsiWebException;

}