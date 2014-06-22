package com.main.dao;

import java.util.List;
import com.main.java.*;

public interface ProductoDAO {

	public void addProducto(Producto producto);
	public List<Producto> listProducto();
	public void removeProducto(Integer id);
	public Producto getById(int id);
	public void update(Producto producto);
}
