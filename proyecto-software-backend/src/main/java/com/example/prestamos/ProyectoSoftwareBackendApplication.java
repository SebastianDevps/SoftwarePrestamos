package com.example.prestamos;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProyectoSoftwareBackendApplication {

	//modela de Dto a Entity Y Viceversa
	//********************************
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(ProyectoSoftwareBackendApplication.class, args);
	}

}
