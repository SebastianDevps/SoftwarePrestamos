package com.prestamos.SoftwarePrestamos.Repository;

import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    List<Prestamo> findByCliente(Cliente cliente);
    boolean existsByCliente(Cliente cliente);
}
