package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.prestamos.SoftwarePrestamos.Entity.Estado;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PrestamoDto {

    private long id;

    private float monto;

    private int porcentaje;

    private float montoAPagar;

    private String fechaLimite;

    private String prestamista;

    private Estado estado;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaCreacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaEdicion;

    private ClienteDto cliente;
}
