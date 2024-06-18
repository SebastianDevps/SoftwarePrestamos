package com.prestamos.SoftwarePrestamos.Services;

import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Dto.PrestamoDto;
import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Entity.EstadoCliente;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import com.prestamos.SoftwarePrestamos.Exception.ResourceNotFoundException;
import com.prestamos.SoftwarePrestamos.Repository.ClienteRepository;
import com.prestamos.SoftwarePrestamos.Repository.PrestamoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PrestamoService {


    private final ClienteRepository clienteRepository;

    private final PrestamoRepository prestamoRepository;

    @Autowired
    private CuotaService cuotaService;

    private final ModelMapper modelMapper;

    //implementacion del servico listas todos los prestamos.
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<PrestamoDto> getPrestamos() {
        List<Prestamo> prestamos = prestamoRepository.findAll();
        return prestamos.stream()
                .map(prestamo -> modelMapper.map(prestamo, PrestamoDto.class))
                .collect(Collectors.toList());
    }

    //implementación del servicio de creacion del prestamo.
    @Transactional
    public PrestamoDto crearPrestamo(String cedula, PrestamoDto prestamoDto) {
        Cliente cliente = clienteRepository.findByNumDocumento(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "Numero de documento", cedula));

        Prestamo prestamo = modelMapper.map(prestamoDto, Prestamo.class);
        //asignar cliente al prestamo
        prestamo.setCliente(cliente);
        Prestamo newPrestamo = prestamoRepository.save(prestamo);

        // Calcular y guardar cuotas
        cuotaService.calcularYGuardarCuotas(prestamo);

        // Actualizar el estado del cliente después de crear el préstamo
        cliente.setEstadoCliente(obtenerEstadoCliente(cliente));
        clienteRepository.save(cliente);

        return modelMapper.map(newPrestamo, PrestamoDto.class);
    }

    //implementacin del servicio para la actualizacion de un prestamo.
    @Transactional
    public PrestamoDto editarPrestamos(PrestamoDto prestamoDto, long id) {
        Prestamo prestamo = (prestamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo", "id", String.valueOf(id))));

        // Solo se permite actualizar los campos permitidos
        prestamo.setMonto(prestamoDto.getMonto());
        prestamo.setPorcentaje(prestamoDto.getPorcentaje());
        prestamo.setFechaLimite(prestamoDto.getFechaLimite());
        prestamo.setPrestamista(prestamoDto.getPrestamista());
        prestamo.setFechaEdicion(LocalDateTime.now());

        Prestamo updatedPrestamo = prestamoRepository.save(prestamo);

        // Actualizar el estado del cliente después de editar el préstamo
        Cliente cliente = prestamo.getCliente();
        cliente.setEstadoCliente(obtenerEstadoCliente(cliente));
        clienteRepository.save(cliente);

        return modelMapper.map(updatedPrestamo, PrestamoDto.class);
    }

    @Transactional
    public void eliminarPrestamo(long id) {
        // Obtener el préstamo
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo", "id", String.valueOf(id)));

        // Obtener el cliente asociado al préstamo
        Cliente cliente = prestamo.getCliente();

        // Eliminar el préstamo
        prestamoRepository.delete(prestamo);

        // Verificar si el cliente tiene más préstamos
        boolean tieneMasPrestamos = prestamoRepository.existsByCliente(cliente);

        // Actualizar el estado del cliente basado en si tiene más préstamos
        cliente.setEstadoCliente(tieneMasPrestamos ? EstadoCliente.ACTIVO : EstadoCliente.INACTIVO);
        clienteRepository.save(cliente);
    }

    // Método para determinar el estado del cliente
    private EstadoCliente obtenerEstadoCliente(Cliente cliente) {
        return cliente.getPrestamos().isEmpty() ? EstadoCliente.INACTIVO : EstadoCliente.ACTIVO;
    }
}