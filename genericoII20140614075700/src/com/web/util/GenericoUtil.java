package com.web.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Months;
import org.joda.time.Period;
import org.joda.time.PeriodType;
import org.joda.time.Weeks;
import org.joda.time.Years;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.main.dao.UserDAO;
import com.main.java.User;
import com.web.security.CustomUser;
import com.web.security.GenUserDetails;


public class GenericoUtil extends GenericoUtilConstant {
	
	@Autowired
	private static UserDAO userRepository;
	
	public static List<XmlMarshalledObjectQuery> genQueries = null;
	public static List<XmlMarshalledObjectQuery> genDocumentos = null;
	private static Properties properties = null;

	public static String getGenWebProperty(String propertieName){
		if(properties == null) properties = getPropertiesFile(GenericoUtil.GEN_WEB_PROPERTIES);
		return StringUtils.trimToEmpty((String) properties.get(propertieName));
	}

	public static String trimToZero(String value){
		value = StringUtils.trimToEmpty(value);
		return Pattern.matches("[-]*[\\d|\\.]*", value) && StringUtils.isNotBlank(value) ? value : "0";
		//return StringUtils.isBlank(value) ? "0" : value;
	}

	public static String objectToString(Object value){
		if(value == null) return "";
		else return String.valueOf(value);
	}



	public static GenUserDetails getCustomUserFromAcegi() {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (obj instanceof GenUserDetails) return (GenUserDetails) obj;
		else return null;
	}

	public static Long getSgdUsuarioIdFromAcegi() {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (obj instanceof CustomUser) return ((CustomUser) obj).getUserId();
		else return null;
	}
	public static User getSgdUsuarioFromAcegi() {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (obj instanceof CustomUser){
			try {
				com.main.java.User domainUser = userRepository.getUserById(((CustomUser) obj).getUserId());
				return domainUser;
			} catch (Exception e) {
				logger.error(e, e);
			}
		}
		return null;
	}
	public static String getSgdUsuarioUsuarioFromAcegi() {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (obj instanceof CustomUser) return ((CustomUser) obj).getUsername();
		else return "";
	}

	public static Long getCtgSucursalIdFromAcegi() {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (obj instanceof CustomUser) return ((CustomUser) obj).getSucursalId();
		else return null;
	}
	@SuppressWarnings("unchecked")
	public static boolean hasRole(String role) {
		Collection<GrantedAuthority> grantedAuthorities = (Collection<GrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
		for (GrantedAuthority grantedAuthority : grantedAuthorities) {
			if(role.equalsIgnoreCase(grantedAuthority.getAuthority())){
				return true;
			}
		}
		return false;
	}

	public static Object getBean(String beanId) {
		return GenericoApplicationContextProvider.getApplicationContext().getBean(beanId);
	}


	public static String getBase64Encode(String theString) {
		return new String(Base64.encodeBase64(Base64.encodeBase64(theString.getBytes())));
	}

	public static String getBase64Decode(String theString) {
		return new String(Base64.decodeBase64(Base64.decodeBase64(theString.getBytes())));
	}

	public static String getHashedString(String theString) {
		String hashedString = StringUtils.EMPTY;
		try {
			ShaPasswordEncoder shaPasswordEncoder = (ShaPasswordEncoder) getBean(PASSWORD_ENCODER_ID);
			hashedString = shaPasswordEncoder.encodePassword(theString, null);
		}
		catch (Exception e) {
			logger.error("Error encriptando cadena", e);
		}
		return hashedString;
	}

	public static String getHashedString(String theString, String usuario) {
		String hashedString = StringUtils.EMPTY;
		try {
			usuario = StringUtils.upperCase(usuario);
			ShaPasswordEncoder shaPasswordEncoder = (ShaPasswordEncoder) getBean(PASSWORD_ENCODER_ID);
			hashedString = shaPasswordEncoder.encodePassword(theString, usuario);
		}
		catch (Exception e) {
			logger.error("Error encriptando cadena", e);
		}
		return hashedString;
	}

	public static LinkedHashMap<String, Integer> getDateDifferences(Date startDate, Date endDate) {
		LinkedHashMap<String, Integer> hashmap = new LinkedHashMap<String, Integer>();
		DateTime startDateTime = new DateTime(startDate);
		DateTime endDateTime = new DateTime(endDate);
		hashmap.put("years", Years.yearsBetween(startDateTime, endDateTime).getYears());
		hashmap.put("months", Months.monthsBetween(startDateTime, endDateTime).getMonths());
		hashmap.put("weeks", Weeks.weeksBetween(startDateTime, endDateTime).getWeeks());
		hashmap.put("days", Days.daysBetween(startDateTime, endDateTime).getDays());
		return hashmap;
	}

	public static String getDateDifferenceInDaysHoursMinutesAndSecondsAsFormattedString(Date startDate, Date endDate) {
		String difference = StringUtils.EMPTY;
		Period period = new Period(startDate.getTime(), endDate.getTime(), PeriodType.dayTime());
		PeriodFormatter periodFormatter = new PeriodFormatterBuilder()
			.printZeroIfSupported()
			.appendDays()
			.appendSuffix(" DIA", " DIAS")
			.appendSeparator(", ")
			.appendHours()
			.appendSuffix(" HORA", " HORAS")
			.appendSeparator(", ")
			.appendMinutes()
			.appendSuffix(" MINUTO", " MINUTOS")
			.appendSeparator(" Y ")
			.appendSeconds()
			.appendSuffix(" SEGUNDO", " SEGUNDOS")
			.toFormatter();
		difference = periodFormatter.print(period);
		return difference;
	}

	public static String getQueryByName(String queryName) {
		String query = StringUtils.EMPTY;
		if (genQueries == null) genQueries = loadQueries(DAO_QUERIES_LOCATION);
		XmlMarshalledObjectQuery objectToFind = new XmlMarshalledObjectQuery();
		objectToFind.setName(queryName);
		int index = Collections.binarySearch(genQueries, objectToFind);
		if (index >= 0) query = genQueries.get(index).getValue();
		return query;
	}

	public static String getDocumentByName(String documentName) {
		String document = StringUtils.EMPTY;
		if (genDocumentos == null) genDocumentos = loadQueries(DOCUMENTS_LOCATION);
		XmlMarshalledObjectQuery objectToFind = new XmlMarshalledObjectQuery();
		objectToFind.setName(documentName);
		int index = Collections.binarySearch(genDocumentos, objectToFind);
		if (index >= 0) document = genDocumentos.get(index).getValue();
		return document;
	}

	private static List<XmlMarshalledObjectQuery> loadQueries(String location) {
		XmlMarshalledObject object = null;
		List<String> xmlQueryFiles = getXmlFiles(location);
		String xmlString = StringUtils.EMPTY;
		List<XmlMarshalledObjectQuery> genQueries = new ArrayList<XmlMarshalledObjectQuery>();
		for (String queryFile : xmlQueryFiles) {
			xmlString = getXmlContent(location + "/" + queryFile);
			object = unmarshallXml(xmlString);
			genQueries.addAll(object.getQuery());
		}
		Collections.sort(genQueries);
		return genQueries;
	}

	private static XmlMarshalledObject unmarshallXml(String xmlString) {
		XmlMarshalledObject output = new XmlMarshalledObject();
		JAXBContext context = null;
		try {
			context = JAXBContext.newInstance(XmlMarshalledObject.class);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			output = (XmlMarshalledObject) unmarshaller.unmarshal(new StringReader(xmlString));
		}
		catch (JAXBException e) {
			logger.error("Error convirtiendo objeto a XML: " + e, e);
		}
		return output;
	}

	public static Properties getPropertiesFile(String fileName) {
		Properties properties = new Properties();
		try {
			properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName));
		}
		catch (Exception e) {
			logger.error("Error obteniendo archivo de propiedades: " + e, e);
		}
		return properties;
	}

	private static String getXmlContent(String xmlFileName) {
		String xmlString = StringUtils.EMPTY;
		InputStream inputStream = null;
		try {
			inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(xmlFileName);
			xmlString = IOUtils.toString(inputStream, DEFAULT_WEB_ENCODING);
		}
		catch (Exception e) {
			logger.error("Error leyendo archivo XML: " + e, e);
		}
		return xmlString;
	}

	private static List<String> getXmlFiles(String xmlPathLocation) {
		List<String> files = new ArrayList<String>();
		URL url = null;
		try {
			url = Thread.currentThread().getContextClassLoader().getResource(xmlPathLocation);
			File folder = new File(URLDecoder.decode(url.getPath(), "UTF-8"));
			File[] listOfFiles = folder.listFiles();
			for (File file : listOfFiles) if (file.isFile()) files.add(file.getName());
		}
		catch (Exception e) {
			logger.error("Error leyendo directorio: " + e, e);
		}
		return files;
	}

	public static boolean isEmptyList(List<?> theList) {
		return theList == null || theList.size() == 0;
	}

	/**
	 * From yyyy-mm-dd
	 * @param stringDateAsYYYYMMDD
	 * @return
	 */
	public static String getFechaAsDD_MM_YYYY_From_YYYYMMDD_WhitDash(String stringDateAsYYYYMMDD) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDD)) formattedDate = getFechaAsDD_MM_YYYY(GenericoUtil.dateFormatAsYYYYMMDDWhitDash.parse(stringDateAsYYYYMMDD));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	/**
	 * From yyyy-mm-dd
	 * @param stringDateAsYYYYMMDD
	 * @return
	 */
	public static String getFechaAsYYYYMMDD_From_YYYYMMDD_WhitDash(String stringDateAsYYYYMMDD) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDD)) formattedDate = dateFormatAsYYYYMMDD.format(GenericoUtil.dateFormatAsYYYYMMDDWhitDash.parse(stringDateAsYYYYMMDD));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsDD_MM_YYYY_From_YYYYMMDD(String stringDateAsYYYYMMDD) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDD)) formattedDate = getFechaAsDD_MM_YYYY(GenericoUtil.dateFormatAsYYYYMMDD.parse(stringDateAsYYYYMMDD));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsDDMMYYYY_From_YYYYMMDD(String stringDateAsYYYYMMDD) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDD)) formattedDate = getFechaAsDD_MM_YYYY(GenericoUtil.dateFormatAsYYYYMMDD.parse(stringDateAsYYYYMMDD));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsDD_MM_YYYY_From_YYYYMMDDHHMMSS(String stringDateAsYYYYMMDDHHMMSS) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDDHHMMSS)) formattedDate = getFechaAsDD_MM_YYYY(GenericoUtil.dateFormatAsYYYYMMDDHHMMSS.parse(stringDateAsYYYYMMDDHHMMSS));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsDD_MM_YYYY__HH_MM_SS_A_From_YYYYMMDDHHMMSS(String stringDateAsYYYYMMDDHHMMSS) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDDHHMMSS)) formattedDate = dateFormatAsDD_MM_YYYY___HH_MM_SS_A.format(GenericoUtil.dateFormatAsYYYYMMDDHHMMSS.parse(stringDateAsYYYYMMDDHHMMSS));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsYYYYMMDD_From_DD_MM_YYYY(String stringDateAsDD_MM_YYYY) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsDD_MM_YYYY)) formattedDate = dateFormatAsYYYYMMDD.format(dateFormatAsDD_MM_YYYY.parse(stringDateAsDD_MM_YYYY));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsDD_MM_YYYY__HH_MM_SS_From_DD_MM_YYYY(String stringDateAsDD_MM_YYYY) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsDD_MM_YYYY)) formattedDate = dateFormatAsDD_MM_YYYY___HH_MM.format(dateFormatAsDD_MM_YYYY.parse(stringDateAsDD_MM_YYYY));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}

	public static String getFechaAsDD_MM_YYYY__HH_MM_From_YYYYMMDDHHMMSS(String stringDateAsYYYYMMDDHHMMSS) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDDHHMMSS)) formattedDate = dateFormatAsDD_MM_YYYY___HH_MM.format(dateFormatAsYYYYMMDDHHMMSS.parse(stringDateAsYYYYMMDDHHMMSS));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e, e);
		}
		return formattedDate;
	}


	public static String getFechaAsDD_MM_YYYY(Date date) {
		String formattedDate = StringUtils.EMPTY;
		formattedDate = GenericoUtil.dateFormatAsDD_MM_YYYY.format(date);
		return formattedDate;
	}


	public static String getFechaAsDD_MM_YYYY_HH_MM_SS(Date date) {
		String formattedDate = StringUtils.EMPTY;
		formattedDate = GenericoUtil.dateFormatAsDD_MM_YYYY___HH_MM_SS.format(date);
		return formattedDate;
	}

	public static String getFechaAsDD_MM_YYYY_HH_MM_SSFrom_YYYYMMDD(String stringDateAsYYYYMMDD) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDD)) formattedDate = getFechaAsDD_MM_YYYY_HH_MM_SS(GenericoUtil.dateFormatAsYYYYMMDD.parse(stringDateAsYYYYMMDD));
		}
		catch (ParseException e) {
			logger.error("Error convirtiendo fecha a formato dd/MM/yyyy HH:mm:ss : " + e, e);
		}
		return formattedDate;
	}


	public static String getExceptionMessage(Exception e){
		return StringUtils.isNotBlank(e.getMessage()) ? e.getMessage() : ERROR_MESSAGE;
	}

	@SuppressWarnings("unchecked")
	public static JSONObject customObjectString(Object object, JsonConfig jsonConfig, String prefix){
		JSONObject jsonObject = JSONObject.fromObject(object, jsonConfig);
		JSONObject jsonToReturn = new JSONObject();
		Set<String> keys = jsonObject.keySet();
		for (String key : keys) {
			jsonToReturn.put(prefix + "." + key, jsonObject.get(key));
		}
		return jsonToReturn;
	}

	public static List<?> sublist(List<?> list, int fromIndex, int numberOfRegisters){
		if(isEmptyList(list)) return list;
		int toIndex = fromIndex + numberOfRegisters;
		if(toIndex > list.size()) toIndex = list.size();
		return list.subList(fromIndex, toIndex);
	}

	public static boolean isExcel(String extension){
		extension = StringUtils.trimToEmpty(extension);
		return Pattern.matches("(?i)xls|xlsx|csv|ods", extension);
	}
	public static boolean isWord(String extension){
		extension = StringUtils.trimToEmpty(extension);
		return Pattern.matches("(?i)doc|docx|rtf|txt|odt", extension);
	}
	public static boolean isImage(String extension){
		extension = StringUtils.trimToEmpty(extension);
		return Pattern.matches("(?i)png|gif|jpg|jpeg|svg|bmp", extension);
	}
	public static boolean isPdf(String extension){
		extension = StringUtils.trimToEmpty(extension);
		return Pattern.matches("(?i)pdf", extension);
	}

	public static String[] getElementByTagName(String tagName, Document document){
		NodeList result = document.getElementsByTagName(tagName);
		if(result == null || ((NodeList) result).getLength() <= 0){
			String[] vacio = {""};
			return vacio;
		}
		ArrayList<String> nodos = new ArrayList<String>();
		for (int i = 0; i < result.getLength(); i++) {
            Node node = result.item(i);
            nodos.add(nodeToString(node));
		}
		return nodos.toArray(new String[nodos.size()]);
	}
	public static String nodeToString(Node node){
        Source source = new DOMSource(node);
        StringWriter stringWriter = new StringWriter();
        Result result = new StreamResult(stringWriter);
        try{
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            transformer.transform(source, result);
            return stringWriter.getBuffer().toString();
        }
        catch (TransformerException e){
        	e.printStackTrace();
        	logger.error("Error convirtiendo de Node a String: " + e, e);
        	return StringUtils.EMPTY;
        }
    }

	public static String doPost(String url, Map<String, Object> map) throws Exception {
		String serializedResponse = StringUtils.EMPTY;
		PostMethod postMethod = new PostMethod(url);
		HttpClient httpClient = new HttpClient();
		for (Entry<String, Object> entry : map.entrySet()) postMethod.setParameter(entry.getKey(), (String) entry.getValue());
		String decodedUserName = SecurityContextHolder.getContext().getAuthentication().getName();
		String decodedPassword = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
		postMethod.addRequestHeader("Authorization", "Basic " + new String(Base64.encodeBase64((decodedUserName + ":" + decodedPassword).getBytes("UTF-8"))));
		int statusCode = -1;
		InputStream inputStream = null;
		try {
			statusCode = httpClient.executeMethod(postMethod);
			inputStream = postMethod.getResponseBodyAsStream();
			char[] a = IOUtils.toCharArray(inputStream, "UTF-8");
			serializedResponse = new String(a);
		} catch (Exception e) {
			e.printStackTrace();
		}
		postMethod.releaseConnection();
		if (statusCode != 200) throw new Exception("HTTP Error: " + statusCode);
		return serializedResponse;
	}

	public static String getElementById(String id, Document document){
		Object result = null;
		try {
			result = XPathFactory.newInstance().newXPath().evaluate("//*[@id='" + id + "']",document, XPathConstants.NODESET);
		} catch (XPathExpressionException e) {
			e.printStackTrace();
			logger.error("Error obteniendo Id de un Document: " + e, e);
			return StringUtils.EMPTY;
		}
		if(result == null || ((NodeList) result).getLength() <= 0) return StringUtils.EMPTY;
		Node node = ((NodeList) result).item(0);
		return nodeToString(node);
	}

	public static void InputStreamAFile(InputStream entrada,String name ){
		 try{
		   File f=new File("C:\\reportes\\"+name);//Aqui le dan el nombre y/o con la ruta del archivo salida
		   OutputStream salida=new FileOutputStream(f);
		   byte[] buf =new byte[1024];//Actualizado me olvide del 1024
		int len;
		   while((len=entrada.read(buf))>0){
		      salida.write(buf,0,len);
		   }
		   salida.close();
		   entrada.close();
		   System.out.println("Se realizo la conversion con exito");
		  }catch(IOException e){
		    System.out.println("Se produjo el error : "+e.toString());
		  }
		}

	public static String decimalMilesConvert(String valor){
		DecimalFormat df = new DecimalFormat("###,###.00");
		String result = "0.00";
		try {
			if(valor !=  null && !valor.isEmpty())
			result = df.format(df.parse(valor));
		} catch (Exception e) {
			logger.error("Error al convertir : "+valor, e);
		}

		return result;

	}

	public static String obtenerMayorRangoTrx(String valor) {
		String result = "0";
		try {
			if(valor != null && !valor.isEmpty()) {
				if(valor.lastIndexOf("-")!= -1)
				result = valor.substring(valor.lastIndexOf("-") + 1, valor.length());
				else if(valor.lastIndexOf("DE") != -1)
					result = valor.substring(valor.lastIndexOf("DE") + 2, valor.length());
				else if(valor.lastIndexOf("de") != -1 )
					result = valor.substring(valor.lastIndexOf("de") + 2, valor.length());
			}
		} catch (Exception e) {
			logger.error("Error al convertir : "+valor, e);
		}


		return result.trim();
	}
	public static String obtenerMayorDeLista (List<String> valores) {
		String result = "0";
		int indice ;
		List<Integer> valoresNumericos = new ArrayList<Integer>();
		try {
			if(valores != null && !valores.isEmpty()){
				for (String v : valores) {
					valoresNumericos.add(Integer.parseInt(v));
				}
				Collections.sort(valoresNumericos);
				indice = valoresNumericos.size()-1;
				result = String.valueOf(valoresNumericos.get(indice));
			}
		} catch (Exception e) {
			logger.error("Error al Obtener mayor de una lista : ", e);
		}
		return result;
	}

	public static String substraerCadena(String cadena, int largo) {

		if(cadena != null && !"".equals(cadena) && cadena.length() > largo){
			cadena = cadena.substring(0, largo);
		}
		return cadena;

	}


	public static String obtenerAnioDeFechaAsString(String fecha) {
		String result = "";
		if(fecha != null && !fecha.isEmpty()) {
			result = fecha.substring(fecha.length()-4,fecha.length());
		}
		return result;
	}
	

	public static String getSgdUsuarioNivelAccesoFromAcegi() {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (obj instanceof CustomUser) return ((CustomUser) obj).getNivelAcceso();
		else return "";
	}

}
