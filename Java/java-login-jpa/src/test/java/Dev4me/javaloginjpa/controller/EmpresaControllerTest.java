package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Empresa;
import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.repository.EmailRepository;
import Dev4me.javaloginjpa.repository.EmpresaRepository;
import Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse;
import Dev4me.javaloginjpa.response.EmpresaSimplesResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {EmpresaController.class})
class EmpresaControllerTest {

    @Autowired
    EmpresaController controller;

    @MockBean
    EmpresaRepository repository;

    @MockBean
    EmailRepository emailRepository;

    @MockBean
    JavaMailSender emailSender;

    @Test
    @DisplayName("Deve retorna 204 sem corpo.")
    void getEmpresaSemResultado(){

        when(repository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity<List<EmpresaSimplesResponse>> resposta = controller.getEmpresasSimples();
        assertEquals(204, resposta.getStatusCodeValue());

        assertNull(resposta.getBody());

    }

    @Test
    @DisplayName("Deve retorna 200 com corpo.")
    void getEmpresaComResultado(){
        EmpresaSimplesResponse e1 = new EmpresaSimplesResponse("João", "joao@joao");
        EmpresaSimplesResponse e2 = new EmpresaSimplesResponse("Pedro", "pedro@pedro.com");


        when(repository.getEmpresasSimples()).thenReturn(
                List.of(e1, e2)
        );

        ResponseEntity<List<EmpresaSimplesResponse>> resposta = controller.getEmpresasSimples();

        assertEquals(200, resposta.getStatusCodeValue());
        assertEquals(2, resposta.getBody().size());
        assertEquals(e1, resposta.getBody().get(0));
    }


    @Test
    @DisplayName("Deve retornar 204, pois a lista está vazia.")
    void autenticarSemEstarNaLista() {

        EmpresaAutenticacaoResponse e1 =
                new EmpresaAutenticacaoResponse(1, "accenture@accenture", "123");

        when(repository.getEmpresasAutenticacao()).thenReturn(new ArrayList<>());

        ResponseEntity<List<EmpresaAutenticacaoResponse>> resposta = controller.autenticar(e1);
        assertEquals(204, resposta.getStatusCodeValue());

        assertNull(resposta.getBody());
    }

    @Test
    @DisplayName("Deve retornar 200, pois o usuário e senha estão na tabela.")
    void autenticarComSenhaELoginCerto() {

        EmpresaAutenticacaoResponse e1 =
                new EmpresaAutenticacaoResponse(1, "accenture@accenture", "123");

        when(repository.getEmpresasAutenticacao()).thenReturn(
                List.of(e1)
        );

        ResponseEntity<List<EmpresaAutenticacaoResponse>> resposta = controller.autenticar(e1);

        assertEquals(200, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("Deve retornar 404, pois o usuário e senha não estão na tabela.")
    void autenticarComSenhaOuLoginErrado(){

        EmpresaAutenticacaoResponse e1 =
                new EmpresaAutenticacaoResponse(1, "accenture@accenture", "123");

        when(repository.getEmpresasAutenticacao()).thenReturn(List.of(e1));

        EmpresaAutenticacaoResponse e3 = mock(EmpresaAutenticacaoResponse.class);

        ResponseEntity<List<EmpresaAutenticacaoResponse>> resposta = controller.autenticar(e3);

        assertEquals(404, resposta.getStatusCodeValue());
    }


    @Test
    @DisplayName("Deve retornar 200, pois o id do usuario existe.")
    void patchEmpresaSenhaComIdExistente() {

        EmpresaAutenticacaoResponse e1 =
                new EmpresaAutenticacaoResponse(1, "accenture@accenture", "123");
        EmpresaAutenticacaoResponse e2 =
                new EmpresaAutenticacaoResponse(2, "accenture@accenture", "1234");

        Empresa empresa = new Empresa();
        empresa.getIdEmpresa();

        when(repository.getEmpresasAutenticacao()).thenReturn(List.of(e1));
        when(repository.existsById(1)).thenReturn(true);

        ResponseEntity<Void> resposta = controller.deleteEmpresa(e1.getId(), e1);

        assertEquals(200, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("Deve retornar 404, pois o id do usuario não existe.")
    void patchEmpresaSenhaComIdInexistente() {
        EmpresaAutenticacaoResponse e1 =
                new EmpresaAutenticacaoResponse(1, "accenture@accenture", "123");
        EmpresaAutenticacaoResponse e2 =
                new EmpresaAutenticacaoResponse(2, "accenture@accenture", "1234");

        ResponseEntity<Void> resposta = controller.deleteEmpresa(e1.getId(), e2);

                assertEquals(404, resposta.getStatusCodeValue());
    }

}