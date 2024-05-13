package com.prestamos.SoftwarePrestamos.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

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

    @JsonBackReference
    @OneToMany(mappedBy = "cliente",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Prestamo> prestamos = new HashSet<>();
}
