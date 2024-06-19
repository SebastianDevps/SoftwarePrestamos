package com.prestamos.SoftwarePrestamos;
import com.prestamos.SoftwarePrestamos.Dto.CuotaDto;
import com.prestamos.SoftwarePrestamos.Dto.PrestamoDto;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalTime;
import java.util.List;

@SpringBootApplication
public class SoftwarePrestamosApplication {

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		// Configuración específica para mapear `cliente.numDocumento` a `PrestamoDto.clienteId`
		modelMapper.typeMap(Prestamo.class, PrestamoDto.class).addMappings(mapper -> {
			mapper.map(src -> src.getCliente().getNumDocumento(), PrestamoDto::setClienteId);
		});


		return modelMapper;
	}
	public static void main(String[] args) {
		SpringApplication.run(SoftwarePrestamosApplication.class, args);

	}

}
