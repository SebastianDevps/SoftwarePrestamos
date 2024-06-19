package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.prestamos.SoftwarePrestamos.Entity.EstadoCliente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    private List<PrestamoDto> prestamos;
}
