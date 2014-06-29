package com.generico.exception;

public class AsiWebException extends Exception{

	private static final long serialVersionUID = -65528813345439303L;
	private String exceptionCode;
	
	public AsiWebException() {
		super();
	}

	public AsiWebException(String message, Throwable cause) {
		super(message, cause);
	}

	public AsiWebException(String message) {
		super(message);
	}

	public AsiWebException(Throwable cause) {
		super(cause);
	}

	public String getExceptionCode() {
		return exceptionCode;
	}

	public void setExceptionCode(String exceptionCode) {
		this.exceptionCode = exceptionCode;
	}
	
}
