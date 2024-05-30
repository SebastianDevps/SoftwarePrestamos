package com.prestamos.SoftwarePrestamos.Services;

import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Dto.PrestamoDto;
import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import com.prestamos.SoftwarePrestamos.Exception.ResourceNotFoundException;
import com.prestamos.SoftwarePrestamos.Repository.ClienteRepository;
import com.prestamos.SoftwarePrestamos.Repository.PrestamoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrestamoService {


    private final ClienteRepository clienteRepository;

    private final  PrestamoRepository prestamoRepository;

    private final ModelMapper modelMapper;

    //implementacion del servico listas todos los prestamos.
    public List<PrestamoDto> getPrestamos() {
        List<Prestamo> prestamos = prestamoRepository.findAll();
        return prestamos.stream()
                .map(prestamo -> modelMapper.map(prestamo, PrestamoDto.class))
                .collect(Collectors.toList());
    }

    //implementación del servicio de creacion del prestamo.
    public PrestamoDto crearPrestamo(String cedula, PrestamoDto prestamoDto) {
        Prestamo prestamo = modelMapper.map(prestamoDto, Prestamo.class);
        Cliente cliente = clienteRepository.findByCedula(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "cedula", cedula));

        //mandar el id del cliente al entity de prestamo
        prestamo.setCliente(cliente);
        Prestamo newPrestamo = prestamoRepository.save(prestamo);
        return modelMapper.map(newPrestamo, PrestamoDto.class);
    }

    //implementacin del servicio para la actualizacion de un prestamo.
    public PrestamoDto editarPrestamos(PrestamoDto prestamoDto, long id) {
        Prestamo prestamo = (prestamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo", "id", String.valueOf(id))));

        modelMapper.map(prestamoDto, prestamo);
        prestamo.setFechaEdicion(LocalDateTime.now());

        Prestamo updatePrestamo = prestamoRepository.save(prestamo);
        return modelMapper.map(updatePrestamo, PrestamoDto.class);
    }

    //implementacion del servicio para eliminar un prestamo.
    public void eliminarPrestamo(long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo", "id", String.valueOf(id)));
        prestamoRepository.delete(prestamo);
    }
}