package com.prestamos.SoftwarePrestamos.Services;
import com.prestamos.SoftwarePrestamos.Dto.ClienteDto;
import com.prestamos.SoftwarePrestamos.Entity.Cliente;
import com.prestamos.SoftwarePrestamos.Exception.ResourceNotFoundException;
import com.prestamos.SoftwarePrestamos.Repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private  ClienteRepository clienteRepository;
    @Autowired
    private  ModelMapper modelMapper;

    public List<ClienteDto> getClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(cliente -> modelMapper.map(cliente, ClienteDto.class))
                .collect(Collectors.toList());
    }

    public ClienteDto crearCliente(ClienteDto clienteDto) {
        Cliente cliente = modelMapper.map(clienteDto, Cliente.class);
        Cliente newCliente = clienteRepository.save(cliente);
        return modelMapper.map(newCliente, ClienteDto.class);
    }

    public ClienteDto editarCliente(ClienteDto clienteDto, long cedula) {
        Cliente cliente = (clienteRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "cedula", cedula)));
        modelMapper.map(clienteDto, cliente);
        Cliente updateCliente = clienteRepository.save(cliente);
        return modelMapper.map(updateCliente, ClienteDto.class);
    }

    public void eliminarCliente(long cedula) {
        Cliente cliente = clienteRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "cedula", cedula));
        clienteRepository.delete(cliente);
    }
}
