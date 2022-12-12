package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.request.TagVagaAndroidRequest;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.TagVagaResponse;
import Dev4me.javaloginjpa.response.VagaListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/tags-vagas")
public class TagVagaController
{
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    TagVagaRepository tagVagaRepository;

    @Autowired
    VagaRepository vagaRepository;

    @PostMapping
    @CrossOrigin
    public ResponseEntity postTagVaga(@RequestBody TagVagaResponse tagsEIdVaga)
    {
        List<String> tags = tagsEIdVaga.getTags();

        for (String tag : tags) {
            Tag tagDaVez = tagRepository.findByNome(tag);
            tagVagaRepository.save(new TagVaga(tagsEIdVaga.getVaga(), tagDaVez));
        }

        return status(201).build();
    }

    @GetMapping("/filtros/mobile")
    @CrossOrigin
    public ResponseEntity getVagasFiltradas(@RequestBody List<Tag> lista) {
        List<Vaga> vagas = new ArrayList<Vaga>();

        for (Tag tag: lista) {
            List<TagVaga> tagVagaList = tagVagaRepository.findByFkTagNome(tag.getNome());
            for (TagVaga tagVaga: tagVagaList) {
                vagas.add(tagVaga.getFkVaga());
            }
        }

        return status(200).body(vagas);
    }

    @PostMapping("/{idVaga}")
    @CrossOrigin
    public ResponseEntity postTagVagaAndroid(@RequestBody TagVagaAndroidRequest tags, @PathVariable Integer idVaga)
    {
        List<Tag> tagsList = tags.getTags();

        Vaga vaga = new Vaga(
                idVaga
        );

        for (Tag tag : tagsList) {
            tagVagaRepository.save(new TagVaga(vaga, tag));
        }

        return status(201).build();
    }


//    @GetMapping("/{idVaga}")
//    @CrossOrigin
//    public ResponseEntity<List<TagVaga>> getTagsVaga(@PathVariable Integer idVaga){
//        return status(200).body(tagVagaRepository.findByFkVagaIdVaga(idVaga));
//    }

//    @GetMapping
//    @CrossOrigin
//    public ResponseEntity getTagsVaga(@RequestBody VagaListResponse id){
//
//        List<Integer> lista = id.getId();
//        List<TagVagaResponse> listaRetornada = new ArrayList<TagVagaResponse>();
//
//        for (int i = 0; i < lista.size(); i++) {
//
//            List<TagVaga> listaTagVaga = tagVagaRepository.findByFkVagaIdVaga(lista.get(i));
//            TagVaga tagVaga = new TagVaga(listaTagVaga.get(i).getFkVaga(),
//                    listaTagVaga.get(i).getFkTag());
//
//        }
//        return status(200).build();
//    }
}
