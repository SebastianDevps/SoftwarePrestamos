package com.prestamos.SoftwarePrestamos.Repository;


import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {

}
