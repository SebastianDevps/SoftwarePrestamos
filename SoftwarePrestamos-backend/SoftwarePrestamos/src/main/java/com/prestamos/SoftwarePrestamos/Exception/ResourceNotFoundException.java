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
    private String valorDelCampo;

    public ResourceNotFoundException(String nombreRecurso, String nombreCampo, String valorDelCampo) {
        super(String.format("%s no encontrado con: %s : '%s'", nombreRecurso, nombreCampo,valorDelCampo));
        this.nombreRecurso = nombreRecurso;
        this.nombreCampo = nombreCampo;
        this.valorDelCampo = valorDelCampo;
    }

    public String getNombreRecurso() {
        return nombreRecurso;
    }

    public void setNombreRecurso(String nombreDelRecurso) {
        this.nombreRecurso = nombreDelRecurso;
    }

    public String getNombreCampo() {
        return nombreCampo;
    }

    public void setNombreCampo(String nombreDelCampo) {
        this.nombreCampo = nombreDelCampo;
    }

    public String getValorDelCampo() {
        return valorDelCampo;
    }

    public void setValorDelCampo(String valorDelCampo) {
        this.valorDelCampo = valorDelCampo;
    }

}
