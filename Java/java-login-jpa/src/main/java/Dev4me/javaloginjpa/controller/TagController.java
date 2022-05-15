package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/tags")
public class TagController
{
    @Autowired
    TagRepository repository;

    @GetMapping
    @CrossOrigin
    public ResponseEntity getTags()
    {
        List<Tag> lista = repository.findAll();
        if (lista.equals(null)) {
            return status(204).body("Sem tags cadastradas no banco.");
        }

        return status(200).body(lista);
    }
}