package com.prestamos.SoftwarePrestamos.Dto;

import com.prestamos.SoftwarePrestamos.Entity.Estado;
import lombok.Data;

@Data
public class ClienteDto {

    private int id;

    private int cedula;

    private String nombre;

    private String apellido;

    private String telefono;

    private  String direccion;

    private String correo;

    private Estado estado;
}
