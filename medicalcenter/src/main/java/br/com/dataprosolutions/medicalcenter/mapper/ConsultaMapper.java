package br.com.dataprosolutions.medicalcenter.mapper;

import br.com.dataprosolutions.medicalcenter.dto.ConsultaDTO;
import br.com.dataprosolutions.medicalcenter.model.Consulta;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConsultaMapper {
    ConsultaDTO consultaToDto(Consulta consulta);
    Consulta dtoToConsulta(ConsultaDTO consultaDTO);
}
