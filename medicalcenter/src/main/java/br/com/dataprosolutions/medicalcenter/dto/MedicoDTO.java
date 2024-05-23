package br.com.dataprosolutions.medicalcenter.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MedicoDTO {
    private Long cdMedico;
    private String nome;
    private String especialidade;
    private String telefone;
    private String endereco;
    private String email;
    private String crm;
    private LocalDate dataNascimento;
    private LocalDate dataContratacao;

}
