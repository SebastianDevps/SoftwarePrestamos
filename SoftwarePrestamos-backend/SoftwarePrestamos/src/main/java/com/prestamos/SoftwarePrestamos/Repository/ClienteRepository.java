package com.prestamos.SoftwarePrestamos.Repository;

import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {
    List<Cliente> findByUserId(String userId);
    Optional<Cliente> findByNumDocumentoAndUserId(String numDocumento, String userId);
}
