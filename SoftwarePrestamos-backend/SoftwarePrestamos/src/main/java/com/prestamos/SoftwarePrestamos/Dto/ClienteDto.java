package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.prestamos.SoftwarePrestamos.Entity.Estado;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ClienteDto {

    private Long id;

    private String tipoDocumento;

    private String cedula;

    private String nombre;

    private String apellido;

    private String telefono;

    private String direccion;

    private String correo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaCreacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaEdicion;

    private Estado estado;

    private List<PrestamoDto> prestamos;
}
