package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.prestamos.SoftwarePrestamos.Entity.Estado;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Data
public class ClienteDto {

    private Long id;

    @NotEmpty
    @Size(min = 7, max = 15, message = "La cedula debe tener entre 7 y 15 digitos.")
    private String cedula;

    @NotEmpty
    private String nombre;

    @NotEmpty
    private String apellido;

    @NotEmpty
    @Size(min = 10, message = "El numero de celular debe tener minimo 10 digitos")
    private String telefono;

    @NotEmpty
    private  String direccion;

    @NotEmpty(message = "El correo electronico no puede estar vacio")
    private String correo;

    private LocalDateTime fechaCreacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    @NotEmpty
    private Estado estado;

    private List<Prestamo> prestamos;

}
