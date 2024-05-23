package br.com.dataprosolutions.medicalcenter.mapper;

import br.com.dataprosolutions.medicalcenter.dto.MedicoDTO;
import br.com.dataprosolutions.medicalcenter.model.Medico;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MedicoMapper {
    MedicoDTO medicoToDto(Medico medico);
    Medico dtoToMedico(MedicoDTO medicoDTO);




}
