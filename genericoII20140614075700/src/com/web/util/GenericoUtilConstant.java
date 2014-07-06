
package com.web.util;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.log4j.Logger;

public class GenericoUtilConstant {
	public static final Logger logger = Logger.getLogger(GenericoUtil.class);
	public static final String DEFAULT_WEB_ENCODING = "ISO-8859-1";
	public static final DecimalFormat decimalFormat2Decimals = new DecimalFormat("#####0.00");
	public static final SimpleDateFormat dateFormatAs_mm_ss_SSS = new SimpleDateFormat("mm:ss.SSS");
	public static final SimpleDateFormat dateFormatAsYYYYMMDDHHMMSS = new SimpleDateFormat("yyyyMMddHHmmss");
	public static final SimpleDateFormat dateFormatAsYYYYMMDD = new SimpleDateFormat("yyyyMMdd");
	public static final SimpleDateFormat dateFormatAsYYYYMMDDWhitDash = new SimpleDateFormat("yyyy-MM-dd");
	public static final SimpleDateFormat dateFormatAsYYYYMM = new SimpleDateFormat("yyyyMM");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM_SS_A = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM_A = new SimpleDateFormat("dd/MM/yyyy hh:mm a");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY = new SimpleDateFormat("dd/MM/yyyy");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM_SS = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	public static final SimpleDateFormat dateFormatAsDDMMYYYY = new SimpleDateFormat("ddMMyyyy");
	public static final SimpleDateFormat timeFormatAsHH_MM_SS = new SimpleDateFormat("hh:mm a");
	public static final DecimalFormat decimalFormatCurrency = new DecimalFormat("###,##0.00");
	public static final DecimalFormat decimalFormatTwoDecimals = new DecimalFormat("##0.00");
	public static final Long HQL_ID_NULL_OR_NOT_EXISTS = new Long("-1");
	public static final String ERROR_MESSAGE = "Procesamiento Incorrecto";
	public static final String DAO_QUERIES_LOCATION = "dao-queries";
	public static final String DOCUMENTS_LOCATION = "documents";
	public static final String ORDER_ASC = "ASC";
	public static final String ORDER_DESC = "DESC";
	public static final JsonConfig JSON_CONFIG = new JsonConfig();
	public static final String ERROR_DELETE_REFERENCIA = "Esta Referencia No puede ser Eliminada.";
	public static final String ERROR_FOP = "DOCUMENTO NO DISPONIBLE";
	public static final String SPACE = " ";
	public static final String CTG_TIPO_DOCUMENTO = "00005";
	static {
		JSON_CONFIG.setJsonPropertyFilter(new PropertyFilter() {
			@Override
			public boolean apply(Object source, String name, Object value) {
				return "defaultAssertionStatus".equals(name) || "hibernateLazyInitializer".equals(name);
			}
		});
	}

	public static final String GEN_WEB_PROPERTIES = "jdbc.properties";
	public static final String PASSWORD_ENCODER_ID = "passwordEncoder";
}
