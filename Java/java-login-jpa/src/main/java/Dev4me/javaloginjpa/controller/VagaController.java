package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.VagaLocalizacaoResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/vagas")
public class VagaController {

    @Autowired
    private VagaRepository repository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagVagaRepository tagVagaRepository;

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postVaga(@RequestBody @Valid Vaga novaVaga) {
        repository.save(novaVaga);
        Vaga vaga = repository.findByFkEmpresaIdEmpresaAndTitulo(
                novaVaga.getFkEmpresa().getIdEmpresa(),
                novaVaga.getTitulo());
        return status(201).body(vaga);
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagas() {

        return status(200).body(repository.findAllByOrderByIdVagaDesc());
    }

    @GetMapping("/{localizacao}")
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagaLocalizacao(@PathVariable String localizacao){
        return status(200).body(repository.findByLocalizacao(localizacao));
    }

    @GetMapping("/tipo-de-contrato/{contrato}")
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagaContrato(@PathVariable String contrato){
        return status(200).body(repository.findByContrato(contrato));
    }

    @GetMapping("/tags")
    @CrossOrigin
    public ResponseEntity<List<Tag>> getVagaTag(){
        return status(200).body(tagRepository.findAll());
    }

    @GetMapping("/tags/selecao")
    @CrossOrigin
    public ResponseEntity<List<TagVaga>> getTagVaga(){
        return status(200).body(tagVagaRepository.findAll());
    }
}
