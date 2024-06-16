package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.prestamos.SoftwarePrestamos.Entity.EstadoCliente;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ClienteDto {


    private String tipoDocumento;

    private String numDocumento;

    private String nombre;

    private String apellido;

    private String telefono;

    private String direccion;

    private String correo;

    //formatear fechas
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaCreacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaEdicion;

    private EstadoCliente estadoCliente;

    private List<Prestamo> prestamos;
}
