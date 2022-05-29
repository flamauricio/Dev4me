package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {TagController.class})
class TagControllerTest {

    @Autowired
    TagController controller;

    @MockBean
    TagRepository repository;

    @Test
    void getSemResultado() {

        when(repository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity<List<Tag>> resposta = controller.getTags();
        assertEquals(204, resposta.getStatusCodeValue());

        assertNull(resposta.getBody());

    }

    @Test
    void getComResultado() {

        Tag t1 = new Tag();
        Tag t2 = new Tag();

        when(repository.findAll()).thenReturn(
                List.of(t1, t2)
        );

        ResponseEntity<List<Tag>> resposta = controller.getTags();

        assertEquals(200, resposta.getStatusCodeValue());
        assertEquals(2, resposta.getBody().size());
        assertEquals(t1, resposta.getBody().get(0));
    }


}