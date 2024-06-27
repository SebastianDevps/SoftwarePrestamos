package com.prestamos.SoftwarePrestamos.Auth.repository;

import com.prestamos.SoftwarePrestamos.Auth.entity.Administradores;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Administradores,Integer> {

    Optional<Administradores> findByEmail(String email);
}
