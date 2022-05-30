package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagUsuario;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.repository.EmailRepository;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagUsuarioRepository;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.response.TagUsuarioResponse;
import Dev4me.javaloginjpa.service.MailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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
}