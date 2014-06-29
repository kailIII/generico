package com.generico.web.annotation;

import static java.lang.annotation.RetentionPolicy.RUNTIME;
import static java.lang.annotation.ElementType.TYPE;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Target({TYPE}) @Retention(RUNTIME)
public @interface GenericoClassJsonProperty {
	String[] jsonProperties() default {};
}
