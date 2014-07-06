package com.generico.dao.ctg;

import java.util.List;

import com.generico.dto.ctg.CtgCatalogo;
import com.generico.exception.AsiWebException;

public interface CtgCatalogoDao {

	public List<CtgCatalogo> findAllActives(String ctgCatalogoPadre)
			throws AsiWebException;

	public List<Object[]> findAllActivesAndDetails(String ctgCatalogoPadre)
			throws AsiWebException;

	public String findAllActivesAsJson(String ctgCatalogoPadre)
			throws AsiWebException;

	public List<CtgCatalogo> findAll(String ctgCatalogoPadre)
			throws AsiWebException;

	public CtgCatalogo findByCodigo(String ctgCatalogoHijo)
			throws AsiWebException;

	public List<Object[]> findAllActivesAsArray(String ctgCatalogoPadre);

	public String findAllAsJson(String ctgCatalogoPadre) throws AsiWebException;

	public List<Object[]> findAllActivesAsArray();

	public List<Object[]> findAllAsArrayByPadre(String ctgCatalogoPadre)
			throws AsiWebException;

}