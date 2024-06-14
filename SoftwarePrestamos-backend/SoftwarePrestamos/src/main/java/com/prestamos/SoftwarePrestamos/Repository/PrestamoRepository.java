package com.prestamos.SoftwarePrestamos.Repository;

import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository  extends JpaRepository<Prestamo,Long> {
    //vericar si tiene mas prestamos
    boolean existsByCliente(Cliente cliente);
}