package br.com.dataprosolutions.medicalcenter.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Table
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Consulta {

    @Id
    @Column(name = "cod_consulta")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cdConsulta;
    @Column(nullable = false)
    private Date data;
    @Column(nullable = false)
    private String hora;
    @Column(nullable = false, length = 500)
    private String motivoConsulta;
    @ManyToOne
    @JoinColumn(name = "cod_medico")
    private Medico medico;

    @ManyToOne
    @JoinColumn(name = "cod_paciente")
    private Paciente paciente;
}
