package com.main.util;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import org.apache.log4j.Logger;

import com.web.util.GenericoUtil;

public class GenericoUtilConstant {

	public static final Logger logger = Logger.getLogger(GenericoUtil.class);

	public static final DecimalFormat decimalFormat2Decimals = new DecimalFormat(
			"#####0.00");
	public static final SimpleDateFormat dateFormatAs_mm_ss_SSS = new SimpleDateFormat(
			"mm:ss.SSS");
	public static final SimpleDateFormat dateFormatAsYYYYMMDDHHMMSS = new SimpleDateFormat(
			"yyyyMMddHHmmss");
	public static final SimpleDateFormat dateFormatAsYYYYMMDD = new SimpleDateFormat(
			"yyyyMMdd");
	public static final SimpleDateFormat dateFormatAsYYYYMMDDWhitDash = new SimpleDateFormat(
			"yyyy-MM-dd");
	public static final SimpleDateFormat dateFormatAsYYYYMM = new SimpleDateFormat(
			"yyyyMM");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM_SS_A = new SimpleDateFormat(
			"dd/MM/yyyy hh:mm:ss a");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM_A = new SimpleDateFormat(
			"dd/MM/yyyy hh:mm a");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY___HH_MM = new SimpleDateFormat(
			"dd/MM/yyyy HH:mm");
	public static final SimpleDateFormat dateFormatAsDD_MM_YYYY = new SimpleDateFormat(
			"dd/MM/yyyy");
	public static final SimpleDateFormat dateFormatAsDDMMYYYY = new SimpleDateFormat(
			"ddMMyyyy");
	public static final DecimalFormat decimalFormatCurrency = new DecimalFormat(
			"###,##0.00");
	public static final DecimalFormat decimalFormatTwoDecimals = new DecimalFormat(
			"##0.00");

}
