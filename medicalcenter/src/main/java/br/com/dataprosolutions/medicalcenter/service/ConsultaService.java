package br.com.dataprosolutions.medicalcenter.service;

import br.com.dataprosolutions.medicalcenter.dto.ConsultaDTO;
import br.com.dataprosolutions.medicalcenter.mapper.ConsultaMapper;
import br.com.dataprosolutions.medicalcenter.model.Consulta;
import br.com.dataprosolutions.medicalcenter.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {
    @Autowired
    private ConsultaRepository consultaRepository;
    @Autowired
    private ConsultaMapper consultaMapper;

    public Consulta cadastrar(ConsultaDTO consultaDTO) {
        Consulta consulta = consultaMapper.dtoToConsulta(consultaDTO);
         consultaRepository.save(consulta);
         return null;
    }

    public List<ConsultaDTO> listar() {
        List<Consulta> consultas = consultaRepository.findAll();
        return consultas.stream()
                .map(consulta -> consultaMapper.consultaToDto(consulta))
                .collect(Collectors.toList());
    }


    public Consulta atualizar(ConsultaDTO consultaDTO) {
        if (consultaRepository.existsById(consultaDTO.getCdConsulta())) {
            Consulta consultaAtualizada = consultaMapper.dtoToConsulta(consultaDTO);
            consultaRepository.save(consultaAtualizada);
        }
        return null;
    }

    public Consulta excluir(Long idConsulta) {
        consultaRepository.deleteById(idConsulta);
        return null;
    }

    public ConsultaDTO buscarPorId(Long cdConsulta) {
        Consulta consulta = consultaRepository.buscarPorId(cdConsulta);
        ConsultaDTO consultaDTO = consultaMapper.consultaToDto(consulta);
        return consultaDTO;
    }

}
