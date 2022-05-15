package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.TagVagaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/post-tag-vaga")
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
}
