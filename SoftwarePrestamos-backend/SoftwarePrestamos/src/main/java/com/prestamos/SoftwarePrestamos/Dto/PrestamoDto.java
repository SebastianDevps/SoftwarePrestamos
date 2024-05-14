package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.prestamos.SoftwarePrestamos.Entity.Estado;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;


@Data
public class PrestamoDto {

    @NotEmpty
    private Long id;

    @NotEmpty
    @Size(min=1, message = "el monto ingresado no puede ser negativo")
    private float monto;

    @NotEmpty
    @Size(min = 0, message = "el pocentaje debe star en un rango de 0 a 100")
    @Size(max=100, message = "el pocentaje debe star en un rango de 0 a 100")
    private int porcentaje;

    @NotEmpty
    private float montoAPagar;

    private LocalDateTime fechaCreacion;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }


    @NotEmpty
    private String fechaLimite;

    private String Prestamista;

    private Estado estado;

}