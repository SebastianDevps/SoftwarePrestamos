package com.prestamos.SoftwarePrestamos.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prestamos.SoftwarePrestamos.Entity.Estado;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

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

    private Date fechaCreacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    @NotEmpty
    private Estado estado;
}
