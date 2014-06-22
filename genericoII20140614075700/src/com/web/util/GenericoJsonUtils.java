package com.web.util;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class GenericoJsonUtils {

    public static List<?> getObjectsFromRequest(Object data, Class<?> clazz){
        List<Object> list;
        if (data.toString().indexOf('[') > -1){
            list = getListObjectsFromJSON(data, clazz);
        } else {
            Object o = getObjectFromJSON(data, clazz);
            list = new ArrayList<Object>();
            list.add(o);
        }
        return list;
    }

    public static Object getObjectFromJSON(Object data, Class<?> clazz){
        JSONObject jsonObject = JSONObject.fromObject(data);
        return JSONObject.toBean(jsonObject, clazz);
    }

    @SuppressWarnings("unchecked")
	public static List<Object> getListObjectsFromJSON(Object data, Class<?> clazz){
        JSONArray jsonArray = JSONArray.fromObject(data);
        return (List<Object>) JSONArray.toCollection(jsonArray, clazz);
    }

    @SuppressWarnings("unchecked")
	public static List<Integer> getListIdFromJSON(Object data){
        JSONArray jsonArray = JSONArray.fromObject(data);
        List<Integer> idObjects = (List<Integer>) JSONArray.toCollection(jsonArray,Integer.class);
        return idObjects;
    }

}
