package com.prestamos.SoftwarePrestamos.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.lang.model.element.Name;
import java.sql.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name = "prestamo", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    private float monto;

    private int porcentaje;

    private float MontoAPagar;

    private Date fechaDeCreacion;

    private Date fechaLimite;
    private Estado estado;

    private String Prestamista;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
