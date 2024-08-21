package com.prestamos.SoftwarePrestamos.Controller;

import com.prestamos.SoftwarePrestamos.Auth.service.JWTUtils;
import com.prestamos.SoftwarePrestamos.Dto.PrestamoDto;
import com.prestamos.SoftwarePrestamos.Services.PrestamoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("adminsuper-admin/prestamos")
@CrossOrigin(origins = "http://localhost:5173")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    //implementacion del controlador para listar todos los prestamos
    @GetMapping
    public ResponseEntity<List<PrestamoDto>> getPrestamos() {
        List<PrestamoDto> prestamos = prestamoService.getPrestamos();
        return ResponseEntity.ok(prestamos);
    }

    //implementacion del controlador para crear un prestamo.
    @PostMapping("/{cedula}")
    public ResponseEntity<PrestamoDto> crearPrestamos(@PathVariable(value = "cedula") String cedula,  @RequestHeader("Authorization") String authHeader, @Valid @RequestBody PrestamoDto prestamoDto) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String userId = JWTUtils.extractUsername(token);

                if (userId != null) {
                    PrestamoDto nuevoPrestamo = prestamoService.crearPrestamo(cedula, userId, prestamoDto);
                    return new ResponseEntity<>(nuevoPrestamo, HttpStatus.CREATED);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrestamoDto> editarPrestamo(@Valid @RequestBody PrestamoDto prestamoDto, @PathVariable(name = "id") long id) {
        PrestamoDto updatePrestamoDto = prestamoService.editarPrestamos(prestamoDto, id);
        return new ResponseEntity<>(updatePrestamoDto, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPrestamo(@PathVariable(name = "id") long id){
        prestamoService.eliminarPrestamo(id);
        return new ResponseEntity<>("Prestamo eliminado con exito", HttpStatus.OK);
    }
}