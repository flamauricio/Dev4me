package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.TagVagaResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {TagVagaController.class})
class TagVagaControllerTest {

    @Autowired
    TagVagaController controller;

    @MockBean
    TagVagaRepository repository;

    @MockBean
    TagRepository tagRepository;

    @MockBean
    VagaRepository vagaRepository;

    @Test
    @DisplayName("Post na tabela tag_vaga, deve retornar 201 sem corpo")
    void postTagVaga()
    {
        TagVagaResponse t1 = mock(TagVagaResponse.class);

        ResponseEntity resposta
                = controller.postTagVaga(t1);

        assertEquals(201, resposta.getStatusCodeValue());
    }



}