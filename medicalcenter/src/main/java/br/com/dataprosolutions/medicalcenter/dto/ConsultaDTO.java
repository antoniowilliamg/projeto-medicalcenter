package br.com.dataprosolutions.medicalcenter.dto;

import br.com.dataprosolutions.medicalcenter.model.Medico;
import br.com.dataprosolutions.medicalcenter.model.Paciente;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
public class ConsultaDTO {

    private Long cdConsulta;
    private Date data;
    private String hora;
    private String motivoConsulta;
    private Medico medico;
    private Paciente paciente;
}

