package com.prestamos.SoftwarePrestamos.Repository;

import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Optional<Cliente> findByNumDocumento(String cedula);
}
