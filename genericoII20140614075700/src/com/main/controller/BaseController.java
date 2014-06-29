 package com.main.controller;


 import java.util.HashMap;
import java.util.List;
import java.util.Map;

 import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

 import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

 import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.web.util.GenericoJsonUtils;


 @Controller
 @RequestMapping("/")
 public class BaseController {
 	public static final Logger logger = Logger.getLogger(BaseController.class);
 	public static final String SUCCESS = "success";
 	public static final String FAILURE = "failure";
 	public static final String GRID_LOAD_FAILURE = "gridLoadFailure";
 	public static final String MESSAGE = "message";
 	public static final String ERROR_MESSAGE = "errorMessage";
 	public static final String SUCCESS_MESSAGE = "message";

 	public String _() {
 		return "security/login";
 	}


 	@RequestMapping(value = "home", method = {RequestMethod.GET, RequestMethod.POST})
 	public String home(ModelMap model, HttpServletRequest request) {
 		String target = StringUtils.trimToEmpty(request.getParameter("targetUrlParameter"));
 		if (StringUtils.isNotBlank(target)) {
 			return "forward:" + target;
 		}
 		return "home";
 	}

 	protected void serializeString(String string, HttpServletResponse response){
 		try {
 			response.setContentType("text/plain");
 			response.getOutputStream().write(string.getBytes("UTF-8"));
 		} catch (Exception e) {
 			logger.error("Exception: ", e);
 		}
 	}

 	protected void serializeObject(Object object, HttpServletResponse response){
 		try {
 			String string = JSONObject.fromObject(object).toString();
 			serializeString(string, response);
 		} catch (Exception e) {
 			logger.error("Exception: ", e);
 		}
 	}

 	protected void serializeCollection(Object object, HttpServletResponse response){
 		try {
 			String string = JSONArray.fromObject(object).toString();
 			serializeString(string, response);
 		} catch (Exception e) {
 			logger.error("Exception: ", e);
 		}
 	}

 	@InitBinder()
 	protected void initBinder(WebDataBinder binder) {
 		binder.setIgnoreInvalidFields(true);
 		binder.setDisallowedFields("ext*");
 		binder.setFieldDefaultPrefix(StringUtils.trimToEmpty(binder.getObjectName() + "."));
 	}

 	public void error(String message, Object data, HttpServletResponse response, Exception e){
 		e.printStackTrace();
 		Map<String, Object> result = new HashMap<String, Object>();
 		result.put("success", Boolean.FALSE);
 		result.put(ERROR_MESSAGE, message);
 		serializeObject(result, response);
 		logger.error(message + ": " + e, e);
     }

 	public List<?> getObjectsFromRequest(String data, Class<?> clazz) {
         List<?> list = GenericoJsonUtils.getObjectsFromRequest(data, clazz);
         return list;
 	}
 }
