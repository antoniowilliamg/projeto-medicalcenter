package br.com.dataprosolutions.medicalcenter.repository;

import br.com.dataprosolutions.medicalcenter.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    @Query(value = "SELECT * FROM PACIENTE WHERE COD_PACIENTE = ?1", nativeQuery = true)
    Paciente buscarPorCdPaciente(Long cdPaciente);

    @Query(value = "SELECT * FROM PACIENTE WHERE cpf = ?1", nativeQuery = true)
    Paciente buscarPorCpf(Long cpf);
}
