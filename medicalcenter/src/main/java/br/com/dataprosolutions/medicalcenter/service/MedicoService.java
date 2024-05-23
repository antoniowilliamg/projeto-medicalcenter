package br.com.dataprosolutions.medicalcenter.service;

import br.com.dataprosolutions.medicalcenter.dto.MedicoDTO;
import br.com.dataprosolutions.medicalcenter.mapper.MedicoMapper;
import br.com.dataprosolutions.medicalcenter.model.Medico;
import br.com.dataprosolutions.medicalcenter.model.Paciente;
import br.com.dataprosolutions.medicalcenter.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicoService {
    @Autowired
    private MedicoRepository medicoRepository;
    @Autowired
    private MedicoMapper medicoMapper;

    public Medico cadastrar(MedicoDTO medicoDTO) {
        Medico medico = medicoMapper.dtoToMedico(medicoDTO);
        return medicoRepository.save(medico);
    }

    public List<MedicoDTO> listar() {
        List<Medico> medicos = medicoRepository.findAll();
        return medicos.stream()
                .map(medico -> medicoMapper.medicoToDto(medico))
                .collect(Collectors.toList());
    }

    public MedicoDTO buscarPorId(Long cdMedico) {
        Medico medico = medicoRepository.buscarPorId(cdMedico);
        MedicoDTO medicoDTO = medicoMapper.medicoToDto(medico);
        return medicoDTO;
    }

    public Medico atualizar(MedicoDTO medicoDTO) {
        if (medicoRepository.existsById(medicoDTO.getCdMedico())) {
            Medico medicoAtualizado = medicoMapper.dtoToMedico(medicoDTO);
            medicoRepository.save(medicoAtualizado);
        }
        return null;
    }

    public Medico excluir(Long cdMedico) {
        medicoRepository.deleteById(cdMedico);
        return null;
    }

}
