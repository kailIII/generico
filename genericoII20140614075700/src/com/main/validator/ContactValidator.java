package com.main.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.main.java.Contact;

public class ContactValidator implements Validator {
	
	private Pattern pattern;
	  private Matcher matcher;

	  private static final String EMAIL_PATTERN = 
	               "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	  public ContactValidator(){
	      pattern = Pattern.compile(EMAIL_PATTERN);
	  }

	public boolean supports(Class<?> aClass) {
		return Contact.class.isAssignableFrom(aClass);
	}
	
	public void validate(Object obj, Errors errors) {
		Contact contact = (Contact) obj;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstname", "field.required", "Firstname Required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastname", "field.required", "Last Required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email","field.required", "Email Required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "telephone", "field.required","Telephone Required");
		if(!isNumber(contact.getTelephone())){
			errors.rejectValue("telephone","field.telephone.NAN","Not a valid telephone number");
		}
		if(!isValidEmail(contact.getEmail())) {
			errors.rejectValue("email","field.invalid","Not a valid Email");
		}
		
	}
	
	 public boolean isValidEmail(final String email){
		 
		  matcher = pattern.matcher(email);
		  return matcher.matches();
	  }
	 
	  private boolean isNumber(String str){
		  for (int i = 0; i < str.length(); i++) {
		  //If we find a non-digit character we return false.
			  if (!Character.isDigit(str.charAt(i)))
				  return false;
		  	   }
		  	   return true;
		 	}
}
