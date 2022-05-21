package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
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
