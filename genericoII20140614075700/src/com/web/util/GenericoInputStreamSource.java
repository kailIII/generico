package com.web.util;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.InputStreamSource;

public class GenericoInputStreamSource implements InputStreamSource{
	InputStream inputStream;

	public GenericoInputStreamSource(InputStream inputStream){
		this.inputStream = inputStream;
	}

	@Override
	public InputStream getInputStream() throws IOException {
		return inputStream;
	}
}
