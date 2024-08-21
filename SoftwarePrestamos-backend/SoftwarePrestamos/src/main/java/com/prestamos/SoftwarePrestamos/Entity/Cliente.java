package com.prestamos.SoftwarePrestamos.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cliente")
public class Cliente {

    @Id
    @Column(name = "numero_documento", unique = true, nullable = false)
    private String numDocumento;

    @Column(name = "tipo_documento", nullable = false)
    private String tipoDocumento;

    private String nombre;

    private String apellido;

    private String telefono;

    private String direccion;

    private String correo;

    @Column(name = "fecha_creacion", columnDefinition = "TIMESTAMP")
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_edicion", columnDefinition = "TIMESTAMP")
    private LocalDateTime fechaEdicion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    @ColumnDefault("'INACTIVO'")
    private EstadoCliente estadoCliente;

    @Column(name = "user_id")
    private String userId;

    @JsonBackReference
    @OneToMany(mappedBy = "cliente", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prestamo> prestamos = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaEdicion = LocalDateTime.now();
    }



    public void addPrestamo(Prestamo prestamo) {
        prestamos.add(prestamo);
        prestamo.setCliente(this);
    }

    public void removePrestamo(Prestamo prestamo) {
        prestamos.remove(prestamo);
        prestamo.setCliente(null);
    }
}
