package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Empresa;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.EmpresaRepository;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.EmpresaSimplesResponse;
import Dev4me.javaloginjpa.response.TagVagaResponse;
import Dev4me.javaloginjpa.service.FileUploadService;
import org.junit.jupiter.api.DisplayName;
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

@SpringBootTest(classes = VagaController.class)
class VagaControllerTest {

    @Autowired
    VagaController controller;

    @MockBean
    VagaRepository repository;

    @MockBean
    TagRepository tagRepository;

    @MockBean
    TagVagaRepository tagVagaRepository;

    @MockBean
    EmpresaRepository empresaRepository;

    @MockBean
    FileUploadService fileUploadService;


    @Test
    @DisplayName("getVagaTag() deve trazer todos os elementos da lista e retornar 200")
    void getVagaTag() {

        Vaga vaga = new Vaga();

        when(repository.findAllByOrderByIdVagaDesc()).thenReturn(List.of(vaga));

        ResponseEntity<List<Vaga>> resposta = controller.getVagas();
        assertEquals(200, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("postVaga() deve postar e retornar 201")
    void postVaga() {
        Empresa e1 = new Empresa();
        e1.setIdEmpresa(1);

        Vaga v1 = new Vaga();
        v1.setFkEmpresa(e1);

        ResponseEntity resposta
                = controller.postVaga(v1);

        assertEquals(201, resposta.getStatusCodeValue());
    }
}