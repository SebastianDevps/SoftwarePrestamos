package com.prestamos.SoftwarePrestamos.Dto;

import com.prestamos.SoftwarePrestamos.Entity.Estado;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ClienteDto {

    @NotEmpty
    @Size(min = 7, message = "La cedula debe tener minimo 7 digitos.")
    @Size(max = 15, message = "La cedula debe tener maximo 15 digitos.")
    private Long cedula;

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

    private Estado estado;
}
