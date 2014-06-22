
package com.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.main.java.Producto;
import com.main.dao.*;


@Service
public class ProductoServiceImpl implements ProductoService {


	@Autowired
	private ProductoDAO productoDAO;

	@Transactional
	public void addProducto(Producto producto) {
		productoDAO.addProducto(producto);
	}

	@Transactional
	public List<Producto> listProducto() {

		return productoDAO.listProducto();
	}

	@Transactional
	public void removeProducto(Integer id) {
		productoDAO.removeProducto(id);
	}

	public Producto getById(int id){
		return productoDAO.getById(id);
	}

	public void update(Producto producto) {
		productoDAO.update(producto);
	}



}
