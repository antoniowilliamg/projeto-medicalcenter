package br.com.dataprosolutions.medicalcenter.repository;

import br.com.dataprosolutions.medicalcenter.dto.ConsultaDTO;
import br.com.dataprosolutions.medicalcenter.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    @Query(value = "SELECT * FROM CONSULTA WHERE COD_CONSULTA = ?1", nativeQuery = true)
    Consulta buscarPorId(Long cdConsulta);
}

