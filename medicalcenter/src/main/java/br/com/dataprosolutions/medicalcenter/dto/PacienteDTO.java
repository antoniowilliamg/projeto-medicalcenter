package br.com.dataprosolutions.medicalcenter.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PacienteDTO {
    private Long cdPaciente;
    private String nome;
    private Long cpf;
    private LocalDate dataNascimento;
    private String endereco;
    private String cep;
    private String email;
    private String telefone;

}
