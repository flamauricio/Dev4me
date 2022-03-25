package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Empresa;
import Dev4me.javaloginjpa.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaRepository repository;

    @PostMapping
    public ResponseEntity postEmpresa (@RequestBody Empresa novaEmpresa) {
        repository.save(novaEmpresa);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity getEmpresas() {
        List<Empresa> empresas = repository.findAll();
        if (empresas.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(empresas);
    }



}
