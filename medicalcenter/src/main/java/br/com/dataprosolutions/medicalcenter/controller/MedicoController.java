package br.com.dataprosolutions.medicalcenter.controller;

import br.com.dataprosolutions.medicalcenter.dto.MedicoDTO;
import br.com.dataprosolutions.medicalcenter.mapper.MedicoMapper;
import br.com.dataprosolutions.medicalcenter.model.Medico;
import br.com.dataprosolutions.medicalcenter.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/medicos")
public class MedicoController {
    @Autowired
    private MedicoService medicoService;
    @Autowired
    private MedicoMapper medicoMapper;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Medico cadastrar(@RequestBody MedicoDTO medicoDTO) {
        return medicoService.cadastrar(medicoDTO);
    }
    @GetMapping
    public List<MedicoDTO> listar() {
        return medicoService.listar();
    }
    @GetMapping("/{cdMedico}")
    public MedicoDTO buscarPorId(@PathVariable Long cdMedico) {
        return medicoService.buscarPorId(cdMedico);
    }
    @PutMapping
    public  Medico atualizar(@RequestBody MedicoDTO medicoDTO) {
        return medicoService.atualizar(medicoDTO);
    }
    @DeleteMapping("/{cdMedico}")
    public Medico excluir(@PathVariable Long cdMedico) {
        return medicoService.excluir(cdMedico);
    }
}
