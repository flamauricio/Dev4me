package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.entity.Vaga;
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

@SpringBootTest(classes = {FiltroController.class})
class FiltroControllerTest {

    @Autowired
    FiltroController controller;

    @MockBean
    TagVagaRepository repository;

    @MockBean
    TagRepository tagRepository;

    @MockBean
    VagaRepository vagaRepository;

    @Test
    @DisplayName("Retorna 200, se localidade existe")
    void buscarPorLocalidade() {

        Vaga vaga = new Vaga();
        vaga.setLocalizacao("RJ");

        when(vagaRepository.findByLocalizacao(vaga.getLocalizacao())).thenReturn(List.of(vaga));

        ResponseEntity response = controller.buscarPorLocalidade("RJ");

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("Retorna 404, pois a localidade não existe")
    void buscarPorLocalidadeInexistente() {

        Vaga vaga = new Vaga();

        when(vagaRepository.findByLocalizacao(vaga.getLocalizacao())).thenReturn(List.of(vaga));

        ResponseEntity response = controller.buscarPorLocalidade("RJ");

        assertEquals(204, response.getStatusCodeValue());
    }
}