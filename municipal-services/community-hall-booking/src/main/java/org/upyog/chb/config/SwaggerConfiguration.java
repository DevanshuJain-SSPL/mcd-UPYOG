package org.upyog.chb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * This class configures Swagger for the Community Hall Booking module.
 * Swagger is used to generate API documentation and provide a user-friendly
 * interface for exploring and testing the APIs.
 * 
 * Annotations used:
 * - @EnableSwagger2: Enables Swagger 2 for the application.
 * - @Configuration: Marks this class as a Spring configuration class.
 */
@EnableSwagger2
@Configuration
public class SwaggerConfiguration {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("org.upyog.chb.web")).paths(PathSelectors.any()).build()
				.apiInfo(apiInfo()); // Completely Optional
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Community Hall Booking API")
				.description("API details of community hall booking service").version("1.0").build();
	}
}
