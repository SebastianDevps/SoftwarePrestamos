package com.prestamos.SoftwarePrestamos.Services;
import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Entity.Estado;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import com.prestamos.SoftwarePrestamos.Exception.ResourceNotFoundException;
import com.prestamos.SoftwarePrestamos.Repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ModelMapper modelMapper;

    public List<ClienteDto> getClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(cliente -> modelMapper.map(cliente, ClienteDto.class))
                .collect(Collectors.toList());
    }

    public ClienteDto crearCliente(ClienteDto clienteDto) {
        Cliente cliente = modelMapper.map(clienteDto, Cliente.class);
        cliente.setEstado(obtenerEstadoCliente(cliente)); // Establecer el estado del cliente
        Cliente newCliente = clienteRepository.save(cliente);
        return modelMapper.map(newCliente, ClienteDto.class);
    }

    public ClienteDto editarCliente(ClienteDto clienteDto, String cedula) {
        Cliente clienteExistente = clienteRepository.findByCedula(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "cedula", cedula));

        // Actualizar los campos del cliente existente con los datos del clienteDto
        clienteExistente.setNombre(clienteDto.getNombre());
        clienteExistente.setApellido(clienteDto.getApellido());
        clienteExistente.setTelefono(clienteDto.getTelefono());
        clienteExistente.setDireccion(clienteDto.getDireccion());
        clienteExistente.setCorreo(clienteDto.getCorreo());
        clienteExistente.setTipoDocumento(clienteDto.getTipoDocumento());
        clienteExistente.setFechaEdicion(LocalDateTime.now());
        clienteExistente.setEstado(obtenerEstadoCliente(clienteExistente)); // Actualizar el estado del cliente

        // Manejo de la colección de Préstamos
        if (clienteDto.getPrestamos() != null) {
            // Crear una lista para almacenar los nuevos préstamos
            List<Prestamo> nuevosPrestamos = new ArrayList<>();
            clienteDto.getPrestamos().forEach(prestamoDto -> {
                Prestamo prestamo = modelMapper.map(prestamoDto, Prestamo.class);
                prestamo.setCliente(clienteExistente); // Establecer la relación bidireccional
                nuevosPrestamos.add(prestamo);
            });
            // Obtener los préstamos existentes del cliente
            List<Prestamo> prestamosExistente = clienteExistente.getPrestamos();
            // Agregar los nuevos préstamos a la lista de préstamos existentes
            prestamosExistente.addAll(nuevosPrestamos);
            // Establecer la lista actualizada de préstamos en el cliente existente
            clienteExistente.setPrestamos(prestamosExistente);
        }


        Cliente clienteActualizado = clienteRepository.save(clienteExistente);
        return modelMapper.map(clienteActualizado, ClienteDto.class);
    }

    public void eliminarCliente(String cedula) {
        Cliente cliente = clienteRepository.findByCedula(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "cedula", cedula));

        // Verificar si el cliente tiene préstamos asociados
        if (!cliente.getPrestamos().isEmpty()) {
            throw new IllegalStateException("No se puede eliminar un cliente con préstamos asociados");
        }

        clienteRepository.delete(cliente);
    }


    // Método para determinar el estado del cliente
    private Estado obtenerEstadoCliente(Cliente cliente) {
        return cliente.getPrestamos().isEmpty() ? Estado.INACTIVO : Estado.ACTIVO;
    }
}
