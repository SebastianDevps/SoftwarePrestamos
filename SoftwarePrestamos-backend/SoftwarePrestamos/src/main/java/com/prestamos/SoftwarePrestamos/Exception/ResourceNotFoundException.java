package com.prestamos.SoftwarePrestamos.Exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
@Data
public class ResourceNotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    private String nombreRecurso;
    private String nombreCampo;
    private  Long valorDelCampo;

    public ResourceNotFoundException(String nombreRecurso, String nombreCampo, Long valorDelCampo) {
        super(String.format("%s no encontrado con: %s : '%s'", nombreRecurso, nombreCampo,valorDelCampo));
        this.nombreRecurso = nombreRecurso;
        this.nombreCampo = nombreCampo;
        this.valorDelCampo = valorDelCampo;
    }

}
