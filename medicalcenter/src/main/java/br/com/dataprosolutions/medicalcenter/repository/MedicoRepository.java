package br.com.dataprosolutions.medicalcenter.repository;

import br.com.dataprosolutions.medicalcenter.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    @Query(value = "SELECT * FROM MEDICO WHERE COD_MEDICO = ?1", nativeQuery = true)
    Medico buscarPorCdMedico(Long cdMedico);
    @Query(value = "SELECT * FROM MEDICO WHERE COD_MEDICO = ?1", nativeQuery = true)
    Medico buscarPorId(Long cdMedico);
}
