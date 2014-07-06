package com.generico.dao.ctg;

import java.util.List;

import com.generico.exception.AsiWebException;

public interface CtgSucursalDao {

	public List<Object[]> getAllActivesAsArray();

	public List<Object[]> findTipoSucursalAllAsArray();

	public List<Object[]> findAllSubTipoSucursalAllAsArray();

	public List<Object[]> findAllSucursalAllAsArray();

	public List<Object[]> findAllSucursalAllAsArray(List<Long> list);

	public List<Object[]> findSucursalesByPrior();

	public List<Object[]> findSubtipoSucursalesByPrior();

	public List<Object[]> findTipoSucursalByPrior();
	
	public void saveSucursal(Object object) throws AsiWebException;
	
	public void updateSucursal(Object object) throws AsiWebException;

	public void deleteSucursal(Object object) throws AsiWebException;
		
}