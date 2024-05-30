package com.prestamos.SoftwarePrestamos.Controller;

import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Services.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("http://localhost:5173") //permitir peticiones desde el front
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDto>> getClient() {
        List<ClienteDto> clientes = clienteService.getClientes();
        return ResponseEntity.ok(clientes);
    }

    @PostMapping
    public ResponseEntity<ClienteDto> crearCliente(@Validated @RequestBody ClienteDto clienteDto) {
        return new ResponseEntity<>(clienteService.crearCliente(clienteDto), HttpStatus.CREATED);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<ClienteDto> editarCliente(@Validated @RequestBody ClienteDto clienteDto, @PathVariable(name = "cedula") String cedula) {
        ClienteDto updatedclienteDto = clienteService.editarCliente(clienteDto, cedula);
        return new ResponseEntity<>(updatedclienteDto, HttpStatus.OK);

    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<String> eliminarCliente(@PathVariable(name = "cedula") String cedula){
        clienteService.eliminarCliente(cedula);
        return new ResponseEntity<>("Cliente eliminado con exito", HttpStatus.OK);
    }
}

