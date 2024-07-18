package com.prestamos.SoftwarePrestamos.Controller;

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
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDto>> getClientes() {
        List<ClienteDto> clientes = clienteService.getClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<ClienteDto> getClienteById(@PathVariable String cedula) {
        ClienteDto cliente = clienteService.getClienteByCedula(cedula);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    public ResponseEntity<ClienteDto> crearCliente(@Validated @RequestBody ClienteDto clienteDto) {
        return new ResponseEntity<>(clienteService.crearCliente(clienteDto), HttpStatus.CREATED);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<ClienteDto> editarCliente(@Validated @RequestBody ClienteDto clienteDto, @PathVariable String cedula) {
        ClienteDto clienteActualizado = clienteService.editarCliente(clienteDto, cedula);
        return ResponseEntity.ok(clienteActualizado);
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<String> eliminarCliente(@PathVariable String cedula) {
        clienteService.eliminarCliente(cedula);
        return ResponseEntity.ok("Cliente eliminado correctamente");
    }
}
