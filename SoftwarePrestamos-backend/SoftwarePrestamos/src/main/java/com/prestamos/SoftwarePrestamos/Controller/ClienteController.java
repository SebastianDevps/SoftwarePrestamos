package com.prestamos.SoftwarePrestamos.Controller;

import com.prestamos.SoftwarePrestamos.Auth.service.JWTUtils;
import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Services.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("adminsuper-admin/clientes")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDto>> getClientes(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String userId = JWTUtils.extractUsername(token);

                if (userId != null) {
                    List<ClienteDto> clientes = clienteService.getClientes(userId);
                    return ResponseEntity.ok(clientes);
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

    @GetMapping("/{cedula}")
    public ResponseEntity<ClienteDto> getClienteById(@PathVariable String cedula, @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String userId = JWTUtils.extractUsername(token);

                if (userId != null) {
                    ClienteDto cliente = clienteService.getClienteByCedula(cedula, userId);
                    return ResponseEntity.ok(cliente);
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


    @PostMapping
    public ResponseEntity<ClienteDto> crearCliente(@Validated @RequestBody ClienteDto clienteDto, @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String userId = JWTUtils.extractUsername(token);

                if (userId != null) {
                    ClienteDto nuevoCliente = clienteService.crearCliente(clienteDto, userId);
                    return new ResponseEntity<>(nuevoCliente, HttpStatus.CREATED);
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


    @PutMapping("/{cedula}")
    public ResponseEntity<ClienteDto> editarCliente(@Validated @RequestBody ClienteDto clienteDto, @PathVariable String cedula, @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String userId = JWTUtils.extractUsername(token);

                if (userId != null) {
                    ClienteDto clienteActualizado = clienteService.editarCliente(clienteDto, cedula, userId);
                    return ResponseEntity.ok(clienteActualizado);
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


    @DeleteMapping("/{cedula}")
    public ResponseEntity<String> eliminarCliente(@PathVariable String cedula, @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String userId = JWTUtils.extractUsername(token);

                if (userId != null) {
                    clienteService.eliminarCliente(cedula, userId);
                    return ResponseEntity.ok("Cliente eliminado correctamente");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token requerido");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

}
