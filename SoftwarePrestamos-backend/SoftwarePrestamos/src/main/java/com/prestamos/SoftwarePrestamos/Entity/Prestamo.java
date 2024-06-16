package com.prestamos.SoftwarePrestamos.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prestamo")
public class Prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private float monto;

    private int porcentaje;

    private float montoAPagar;

    private String fechaLimite;

    private String prestamista;

    private EstadoCliente estado;

    @Column(name = "fecha_creacion", columnDefinition = "TIMESTAMP")
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_edicion", columnDefinition = "TIMESTAMP")
    private LocalDateTime fechaEdicion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        calcularMontoAPagar();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaEdicion = LocalDateTime.now();
        calcularMontoAPagar();
    }

    private void calcularMontoAPagar() {
        montoAPagar = monto + (monto * porcentaje / 100);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}