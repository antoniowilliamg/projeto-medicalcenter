package br.com.dataprosolutions.medicalcenter.mapper;


import br.com.dataprosolutions.medicalcenter.dto.PacienteDTO;
import br.com.dataprosolutions.medicalcenter.model.Paciente;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PacienteMapper {
    PacienteDTO pacienteToDto(Paciente paciente);
    Paciente dtoToPaciente(PacienteDTO pacienteDTO);



}

