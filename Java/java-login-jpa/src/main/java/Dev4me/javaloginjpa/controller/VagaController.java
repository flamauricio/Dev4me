package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.VagaRepository;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/vagas")
public class VagaController {

    @Autowired
    private VagaRepository repository;

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postVaga(@RequestBody @Valid Vaga novaVaga) {
        repository.save(novaVaga);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagas() {

        return ResponseEntity.status(200).body(repository.findAll());
    }
}
