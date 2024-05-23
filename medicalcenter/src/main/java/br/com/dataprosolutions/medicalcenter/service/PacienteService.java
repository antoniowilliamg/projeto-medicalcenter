package br.com.dataprosolutions.medicalcenter.service;

import br.com.dataprosolutions.medicalcenter.dto.PacienteDTO;
import br.com.dataprosolutions.medicalcenter.mapper.PacienteMapper;
import br.com.dataprosolutions.medicalcenter.model.Paciente;
import br.com.dataprosolutions.medicalcenter.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;
    @Autowired
    private PacienteMapper pacienteMapper;
    public Paciente cadastrar(PacienteDTO pacienteDTO) {
        Paciente paciente = pacienteMapper.dtoToPaciente(pacienteDTO);
        return pacienteRepository.save(paciente);
    }
    public List<PacienteDTO> listar() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        return pacientes.stream()
                .map(paciente -> pacienteMapper.pacienteToDto(paciente))
                .collect(Collectors.toList());
    }
    public PacienteDTO buscarPorCdPaciente(Long cdPaciente) {
        Paciente paciente = pacienteRepository.buscarPorCdPaciente(cdPaciente);
        PacienteDTO pacienteDTO = pacienteMapper.pacienteToDto(paciente);
        return pacienteDTO;
    }

    public PacienteDTO buscarPacientePorId(Long cdPaciente){
        Paciente paciente = pacienteRepository.getById(cdPaciente);
        PacienteDTO pacienteDTO = pacienteMapper.pacienteToDto(paciente);
        return pacienteDTO;
    }
    public Paciente editar(PacienteDTO pacienteDTO) {
        if (pacienteRepository.existsById(pacienteDTO.getCdPaciente())) {
            Paciente pacienteAtualizado = pacienteMapper.dtoToPaciente(pacienteDTO);
            pacienteRepository.save(pacienteAtualizado);
        }
        return null;
    }
    public Paciente excluir(Long cdPaciente) {
        pacienteRepository.deleteById(cdPaciente);
        return null;
    }

    public PacienteDTO buscarPorCpf(Long cpf) {
        Paciente paciente = pacienteRepository.buscarPorCpf(cpf);
        PacienteDTO pacienteDTO = pacienteMapper.pacienteToDto(paciente);
        return pacienteDTO;
    }
}