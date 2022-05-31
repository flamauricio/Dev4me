package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.VagaVetorContratoResponse;
import Dev4me.javaloginjpa.response.VagaVetorTagResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/filtro")
public class FiltroController
{

    @Autowired
    TagVagaRepository tagVagaRepository;

    @Autowired
    VagaRepository vagaRepository;

    @GetMapping("/localidade/{localidade}")
    @CrossOrigin
    public ResponseEntity buscarPorLocalidade(
            @PathVariable String localidade
    )
    {
        List<Vaga> listaVagas = vagaRepository.findByLocalizacao(localidade);

        if (listaVagas.isEmpty()) {
            return status(204).body("Não encontramos vagas com essa localidade!");
        }

        return status(200).body(listaVagas);
    }

    @PostMapping("/tags")
    @CrossOrigin
    public ResponseEntity buscarPorTags(
            @RequestBody VagaVetorTagResponse listaTags)
    {
        List<Vaga> listaVagas = new ArrayList<Vaga>();
        List<String> tags = listaTags.getTags();

        for (String tag : tags) {
            List<TagVaga> listaProvisoria = tagVagaRepository.findByFkTagNome(tag);
            if (!listaProvisoria.isEmpty()) {
                for (TagVaga tagVaga : listaProvisoria) {
                    if (!listaVagas.contains(tagVaga.getFkVaga())) {
                        listaVagas.add(tagVaga.getFkVaga());
                    }
                }
            }

        }
        if (listaVagas.isEmpty()) {
            return status(204).body("Não encontramos nenhuma vaga cadastrada com esses filtros!");
        }

        return status(200).body(listaVagas);
    }

    @PostMapping("/tipo-contrato")
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagaContrato(
            @RequestBody VagaVetorContratoResponse contratosRequisicao){

        List<Vaga> listaVagas = new ArrayList<Vaga>();
        List<String> contratos = contratosRequisicao.getContratos();

        for (String contrato : contratos) {
            List<Vaga> listaProvisoria = vagaRepository.findByContrato(contrato);
            if (!listaProvisoria.isEmpty()) {
                for (Vaga vaga : listaProvisoria) {
                    if (!listaVagas.contains(vaga)) {
                        listaVagas.add(vaga);
                    }
                }
            }

        }
        if (listaVagas.isEmpty()) {
            return status(204).build();
        }

        return status(200).body(listaVagas);
    }
}
