package br.com.dataprosolutions.medicalcenter.controller;

import br.com.dataprosolutions.medicalcenter.dto.PacienteDTO;
import br.com.dataprosolutions.medicalcenter.mapper.PacienteMapper;
import br.com.dataprosolutions.medicalcenter.model.Paciente;
import br.com.dataprosolutions.medicalcenter.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/pacientes")
public class PacienteController {
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private PacienteMapper pacienteMapper;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Paciente cadastrar(@RequestBody PacienteDTO pacienteDTO) {
       return pacienteService.cadastrar(pacienteDTO);
    }
    @GetMapping
    public List<PacienteDTO> listar() {
        return pacienteService.listar();
    }
    @GetMapping("/{cdPaciente}")
    public PacienteDTO buscarPorCdPaciente(@PathVariable Long cdPaciente) {
        return pacienteService.buscarPorCdPaciente(cdPaciente);
    }
    @GetMapping("/cpf/{cpf}")
    public PacienteDTO buscarPorCpf(@PathVariable Long cpf) {
        return pacienteService.buscarPorCpf(cpf);
    }
    @PutMapping
    public  Paciente editar(@RequestBody PacienteDTO pacienteDTO) {
        return pacienteService.editar(pacienteDTO);
    }
    @DeleteMapping("/{cdPaciente}")
    public Paciente excluir(@PathVariable Long cdPaciente) {
        return pacienteService.excluir(cdPaciente);
    }
}
