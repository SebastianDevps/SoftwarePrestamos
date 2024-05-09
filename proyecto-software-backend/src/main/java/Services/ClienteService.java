package Services;

import Dto.ClienteDto;
import Entity.Cliente;
import Repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private ClienteRepository clienteRepository;
    private Cliente cliente;
    private ModelMapper modelMapper;

    public List<ClienteDto> getClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(clients -> modelMapper.map(clients, ClienteDto.class))
                .collect(Collectors.toList());
    }

}
