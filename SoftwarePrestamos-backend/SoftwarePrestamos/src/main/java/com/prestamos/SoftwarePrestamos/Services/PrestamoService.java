package com.prestamos.SoftwarePrestamos.Services;

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

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<PrestamoDto> getPrestamos() {
        List<Prestamo> prestamos = prestamoRepository.findAll();
        return prestamos.stream()
                .map(prestamo -> modelMapper.map(prestamo, PrestamoDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public PrestamoDto crearPrestamo(String cedula,String userId, PrestamoDto prestamoDto) {
        Cliente cliente = clienteRepository.findByNumDocumentoAndUserId(cedula, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "Numero de documento", cedula));

        Prestamo prestamo = modelMapper.map(prestamoDto, Prestamo.class);
        prestamo.setCliente(cliente);
        Prestamo newPrestamo = prestamoRepository.save(prestamo);

        cuotaService.calcularYGuardarCuotas(prestamo);

        cliente.setEstadoCliente(obtenerEstadoCliente(cliente));
        clienteRepository.save(cliente);

        return modelMapper.map(newPrestamo, PrestamoDto.class);
    }

    @Transactional
    public PrestamoDto editarPrestamos(PrestamoDto prestamoDto, long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo", "id", String.valueOf(id)));

        prestamo.setMonto(prestamoDto.getMonto());
        prestamo.setPorcentaje(prestamoDto.getPorcentaje());
        prestamo.setFechaLimite(prestamoDto.getFechaLimite());
        prestamo.setPrestamista(prestamoDto.getPrestamista());
        prestamo.setFechaEdicion(LocalDateTime.now());

        Prestamo updatedPrestamo = prestamoRepository.save(prestamo);

        Cliente cliente = prestamo.getCliente();
        cliente.setEstadoCliente(obtenerEstadoCliente(cliente));
        clienteRepository.save(cliente);

        return modelMapper.map(updatedPrestamo, PrestamoDto.class);
    }

    @Transactional
    public void eliminarPrestamo(long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo", "id", String.valueOf(id)));

        Cliente cliente = prestamo.getCliente();
        prestamoRepository.delete(prestamo);

        boolean tieneMasPrestamos = prestamoRepository.existsByCliente(cliente);
        cliente.setEstadoCliente(tieneMasPrestamos ? EstadoCliente.ACTIVO : EstadoCliente.INACTIVO);
        clienteRepository.save(cliente);
    }

    private EstadoCliente obtenerEstadoCliente(Cliente cliente) {
        List<Prestamo> prestamos = prestamoRepository.findByCliente(cliente);
        return prestamos.isEmpty() ? EstadoCliente.INACTIVO : EstadoCliente.ACTIVO;
    }
}
