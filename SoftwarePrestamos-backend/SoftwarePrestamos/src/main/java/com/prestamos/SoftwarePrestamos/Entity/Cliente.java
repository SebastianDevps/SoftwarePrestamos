package com.prestamos.SoftwarePrestamos.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cliente", uniqueConstraints = { @UniqueConstraint(columnNames = { "cedula", "correo" }) })
public class Cliente {

    @Id
    private Long cedula;

    private String nombre;

    private String apellido;

    private String telefono;

    private  String direccion;

    private String correo;

    private Estado estado;
}
