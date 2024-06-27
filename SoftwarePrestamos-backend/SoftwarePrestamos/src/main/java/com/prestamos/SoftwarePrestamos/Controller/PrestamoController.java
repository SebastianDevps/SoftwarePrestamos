package com.prestamos.SoftwarePrestamos.Controller;

import com.prestamos.SoftwarePrestamos.Dto.PrestamoDto;
import com.prestamos.SoftwarePrestamos.Services.PrestamoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamos")
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
    public ResponseEntity<PrestamoDto> crearPrestamos(@PathVariable(value = "cedula") String cedula,@Valid @RequestBody PrestamoDto prestamoDto) {
        return new ResponseEntity<>(prestamoService.crearPrestamo(cedula, prestamoDto), HttpStatus.CREATED);
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