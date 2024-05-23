package br.com.dataprosolutions.medicalcenter.controller;

import br.com.dataprosolutions.medicalcenter.dto.ConsultaDTO;
import br.com.dataprosolutions.medicalcenter.mapper.ConsultaMapper;
import br.com.dataprosolutions.medicalcenter.model.Consulta;
import br.com.dataprosolutions.medicalcenter.service.ConsultaService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Data
@RestController
@CrossOrigin("*")
@RequestMapping("/consultas")
public class ConsultaController {
    @Autowired
    private ConsultaService consultaService;
    @Autowired
    private ConsultaMapper consultaMapper;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Consulta cadastrar(@RequestBody ConsultaDTO consultaDTO) {
        consultaService.cadastrar(consultaDTO);
        return null;
    }
    @GetMapping
    public List<ConsultaDTO> listar() {
        return consultaService.listar();
    }
    @GetMapping("/{cdConsulta}")
    public ConsultaDTO buscarPorId(@PathVariable Long cdConsulta) {
        return consultaService.buscarPorId(cdConsulta);
    }
    @PutMapping
    public Consulta atualizar(@RequestBody ConsultaDTO consultaDTO) {
        return consultaService.atualizar(consultaDTO);
    }
    @DeleteMapping("/{cdConsulta}")
    public Consulta excluir(@PathVariable Long cdConsulta) {
        return consultaService.excluir(cdConsulta);
    }
}