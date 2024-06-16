package com.prestamos.SoftwarePrestamos.Services;

import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Entity.EstadoCliente;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import com.prestamos.SoftwarePrestamos.Exception.ResourceNotFoundException;
import com.prestamos.SoftwarePrestamos.Repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<ClienteDto> getClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(cliente -> modelMapper.map(cliente, ClienteDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public ClienteDto crearCliente(ClienteDto clienteDto) {
        Cliente cliente = modelMapper.map(clienteDto, Cliente.class);
        cliente.setEstadoCliente(obtenerEstadoCliente(cliente)); // Establecer el estado del cliente
        Cliente newCliente = clienteRepository.save(cliente);
        return modelMapper.map(newCliente, ClienteDto.class);
    }

    @Transactional
    public ClienteDto editarCliente(ClienteDto clienteDto, String cedula) {
        Cliente clienteExistente = clienteRepository.findByNumDocumento(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "con numero de documento", cedula));

        // Actualizar los campos del cliente existente con los datos del clienteDto
        clienteExistente.setNombre(clienteDto.getNombre());
        clienteExistente.setApellido(clienteDto.getApellido());
        clienteExistente.setTelefono(clienteDto.getTelefono());
        clienteExistente.setDireccion(clienteDto.getDireccion());
        clienteExistente.setCorreo(clienteDto.getCorreo());
        clienteExistente.setTipoDocumento(clienteDto.getTipoDocumento());
        clienteExistente.setFechaEdicion(LocalDateTime.now());

        // Actualizar la lista de préstamos (borrando y añadiendo de nuevo)
        clienteExistente.getPrestamos().clear(); // Limpiar la lista actual

        clienteDto.getPrestamos().forEach(prestamoDto -> {
            Prestamo prestamo = modelMapper.map(prestamoDto, Prestamo.class);
            clienteExistente.addPrestamo(prestamo); // Añadir nuevo préstamo
        });

        // Guardar el cliente actualizado
        Cliente clienteActualizado = clienteRepository.save(clienteExistente);
        return modelMapper.map(clienteActualizado, ClienteDto.class);
    }

    @Transactional
    public void eliminarCliente(String cedula) {
        Cliente cliente = clienteRepository.findByNumDocumento(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "con numero de documento", cedula));

        if (!cliente.getPrestamos().isEmpty()) {
            throw new IllegalStateException("No se puede eliminar un cliente con prestamos asociados");
        }

        clienteRepository.delete(cliente);
    }

    private EstadoCliente obtenerEstadoCliente(Cliente cliente) {
        return cliente.getPrestamos().isEmpty() ? EstadoCliente.INACTIVO : EstadoCliente.ACTIVO;
    }
}
