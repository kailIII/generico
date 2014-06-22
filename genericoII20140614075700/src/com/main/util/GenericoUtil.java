package com.main.util;

import java.text.ParseException;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

public class GenericoUtil {

	public static String getFechaAsDD_MM_YYYY_From_YYYYMMDD_WhitDash(
			String stringDateAsYYYYMMDD) {
		String formattedDate = StringUtils.EMPTY;
		try {
			if (StringUtils.isNotBlank(stringDateAsYYYYMMDD))
				formattedDate = getFechaAsDD_MM_YYYY(GenericoUtilConstant.dateFormatAsYYYYMMDDWhitDash
						.parse(stringDateAsYYYYMMDD));
		} catch (ParseException e) {
			GenericoUtilConstant.logger.error("Error convirtiendo fecha a formato dd/MM/yyyy: " + e,
					e);
		}
		return formattedDate;
	}


	public static String getFechaAsDD_MM_YYYY(Date date) {
		String formattedDate = StringUtils.EMPTY;
		formattedDate = GenericoUtilConstant.dateFormatAsDD_MM_YYYY.format(date);
		return formattedDate;
	}
}
