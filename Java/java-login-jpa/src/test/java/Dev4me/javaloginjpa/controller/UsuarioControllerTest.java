package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagUsuario;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.repository.EmailRepository;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagUsuarioRepository;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse;
import Dev4me.javaloginjpa.response.TagUsuarioResponse;
import Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse;
import Dev4me.javaloginjpa.service.MailService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = UsuarioController.class)
class UsuarioControllerTest {

    @Autowired
    UsuarioController controller;

    @MockBean
    EmailRepository emailRepository;

    @MockBean
    UsuarioRepository repository;

    @MockBean
    TagUsuarioRepository tagUsuarioRepository;

    @MockBean
    MailService mailService;

    @MockBean
    TagRepository tagRepository;

    @Test
    void patchUsuarioSenhaSemId(){

        Usuario u = new Usuario();

        when(repository.existsById(u.getId())).thenReturn(false);

        ResponseEntity<Usuario> teste = controller.patchUsuarioSenha(u);

        assertEquals(404, teste.getStatusCodeValue());
    }

    @Test
    void patchUsuarioSenhaComId(){
        Usuario u = new Usuario();

        when(repository.existsById(u.getId())).thenReturn(true);

        ResponseEntity<Usuario> teste = controller.patchUsuarioSenha(u);

        assertEquals(200, teste.getStatusCodeValue());

    }


    @Test
    void deleteUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(1);
        Tag tag = new Tag();
        tag.setId_tag(2);

        TagUsuario tagUsuario = new TagUsuario(usuario, tag);
        tagUsuario.setIdTagUsuario(1);

//        when(tagUsuarioRepository.findByFkUsuarioId(1)).thenReturn(List.of(tagUsuario));
        when(tagUsuarioRepository.existsById(tagUsuario.getFkUsuario().getId())).thenReturn(false);

        ResponseEntity<Void> teste = controller.deleteUsuario(400);

        assertEquals(200, teste.getStatusCodeValue());

    }

    @Test
    @DisplayName("Deve retornar 204, pois a lista está vazia.")
    void AutenticarUsuarioSemEstarNaLista(){

        UsuarioAutenticacaoResponse u1 =
                new UsuarioAutenticacaoResponse(1,"pedro@gmail.com", "123");

        when(repository.getUsuariosAutenticacao()).thenReturn(new ArrayList<>());

        ResponseEntity resposta = controller.autenticar(u1);
        assertEquals(204, resposta.getStatusCodeValue());

        assertNull(resposta.getBody());
    }

    @Test
    @DisplayName("Deve retornar 200, pois o usuário e senha não estão na tabela.")
    void AutenticarUsuarioComSenhaELoginCerto(){

        UsuarioAutenticacaoResponse u1 =
                new UsuarioAutenticacaoResponse(1,"pedro@gmail.com", "123");

        when(repository.getUsuariosAutenticacao()).thenReturn(
                List.of(u1)
        );

        ResponseEntity<List<UsuarioAutenticacaoResponse>> resposta = controller.autenticar(u1);

        assertEquals(200, resposta.getStatusCodeValue());

    }

    @Test
    @DisplayName("Deve retornar 404, pois o usuário e senha não estão na tabela.")
    void AutenticarUsuarioComSenhaELoginErrado(){
        UsuarioAutenticacaoResponse u1 =
                new UsuarioAutenticacaoResponse(1,"pedro@gmail.com", "123");

        when(repository.getUsuariosAutenticacao()).thenReturn(List.of(u1));

        UsuarioAutenticacaoResponse u3 = mock(UsuarioAutenticacaoResponse.class);

        ResponseEntity<List<UsuarioAutenticacaoResponse>> resposta = controller.autenticar(u3);

        assertEquals(404, resposta.getStatusCodeValue());
    }

    @Test
    void getVagaById(){

        Usuario u = new Usuario();
        u.setId(2);

        when(repository.findAll()).thenReturn(List.of(u));

        when(repository.findById(1)).thenReturn(Optional.empty());

        ResponseEntity resposta = controller.getVagaById(2);

        assertEquals(404, resposta.getStatusCodeValue());

    }

    @Test
    void GetUsuarioPerfil(){

        Usuario u1 = mock(Usuario.class);

        when(repository.findById(2)).thenReturn(Optional.of(u1));

        ResponseEntity<Optional<Usuario>> response = controller.getUsuarioPerfil(2);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void GetUsuario(){

        Usuario u1 = mock(Usuario.class);
        when(repository.findById(2)).thenReturn(Optional.of(u1));

        ResponseEntity<List<Usuario>> response = controller.getUsuario("2");

        assertEquals(200, response.getStatusCodeValue());
    }

}