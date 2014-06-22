package com.main.service;

import java.util.List;

import com.main.java.*;
public interface ProductoService {

	public void addProducto(Producto producto);
	public List<Producto> listProducto();
	public void removeProducto(Integer id);
	public Producto getById(int id);
	public void update(Producto producto);
}
