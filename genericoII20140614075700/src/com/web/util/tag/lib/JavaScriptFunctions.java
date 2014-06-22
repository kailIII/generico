package com.web.util.tag.lib;

import org.apache.commons.lang.StringUtils;
import org.apache.taglibs.standard.functions.Functions;

public class JavaScriptFunctions extends Functions {
	public static String remove(String input) {
		input = StringUtils.trimToEmpty(input);
		if(StringUtils.isBlank(input)) return input;
		input = StringUtils.replace(input, "\\", "\\\\");
		input = StringUtils.replace(input, "\"", "\\\"");
		input = StringUtils.replace(input, "'", "\\'");
		input = StringUtils.replace(input, "\n\r", "<br />");
		input = StringUtils.replace(input, "\r\n", "<br />");
		input = StringUtils.replace(input, "\n", "<br />");
		input = StringUtils.replace(input, "\r", "<br />");
        return input;
    }
}
