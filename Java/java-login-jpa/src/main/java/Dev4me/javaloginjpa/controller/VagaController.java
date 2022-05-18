package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.VagaFiltroResponse;
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

    private List<Vaga> vagasFiltradas = new ArrayList<Vaga>();

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

    @GetMapping("/tipo-de-contrato/{contrato}")
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagaContrato(@PathVariable String contrato){
        return status(200).body(repository.findByContrato(contrato));
    }

    @PostMapping("/filtros")
    @CrossOrigin
    public ResponseEntity getVagasFiltradas(@RequestBody VagaFiltroResponse filtroObj)
    {
        vagasFiltradas.clear();

        List<String> tags = filtroObj.getTags();
        List<String> contratos = filtroObj.getContratos();
        List<String> filtros = filtroObj.getFiltros();
        String localizacao = filtroObj.getLocalizacao();

        if (filtros.size() == 0) {
            return status(200).body(repository.findAllByOrderByIdVagaDesc());
        }

        for (String filtro : filtros) {
            if (filtro.equals("localizacao")) {
                List<Vaga> listaVagas = repository.findByLocalizacao(localizacao);

                for (Vaga vaga : listaVagas) {
                    if (!vagasFiltradas.contains(vaga)) {
                        vagasFiltradas.add(vaga);
                    }
                }
            }

            else if (filtro.equals("contratos")) {
                for (String contrato : contratos) {
                    List<Vaga> listaProvisoria = repository.findByContrato(contrato);
                    if (!listaProvisoria.isEmpty()) {
                        for (Vaga vaga : listaProvisoria) {
                            if (!vagasFiltradas.contains(vaga)) {
                                vagasFiltradas.add(vaga);
                            }
                        }
                    }

                }
            }

            else if (filtro.equals("tags")) {
                for (String tag : tags) {
                    List<TagVaga> listaProvisoria = tagVagaRepository.findByFkTagNome(tag);
                    if (!listaProvisoria.isEmpty()) {
                        for (TagVaga tagVaga : listaProvisoria) {
                            if (!vagasFiltradas.contains(tagVaga.getFkVaga())) {
                                vagasFiltradas.add(tagVaga.getFkVaga());
                            }
                        }
                    }

                }
            }
        }

        if (vagasFiltradas.isEmpty()) {
            return status(204).build();
        }

        return status(200).body(vagasFiltradas);
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
