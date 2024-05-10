package com.prestamos.SoftwarePrestamos.Controller;

import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Services.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDto>> getClient() {
        List<ClienteDto> clientes = clienteService.getClientes();
        return ResponseEntity.ok(clientes);
    }

    @PostMapping
    public ResponseEntity<ClienteDto> crearCliente(@Valid @RequestBody ClienteDto clienteDto) {
        ClienteDto newclienteDto = clienteService.crearCliente(clienteDto);
        return ResponseEntity.ok(newclienteDto);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<ClienteDto> editarCliente(@Valid @RequestBody ClienteDto clienteDto, @PathVariable Long cedula) {
        ClienteDto updatedclienteDto = clienteService.editarCliente(clienteDto, cedula);
        return new ResponseEntity<>(updatedclienteDto, HttpStatus.OK);

    }
}
