package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.csv.ListaObj;
import Dev4me.javaloginjpa.entity.Email;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.enums.StatusEmail;
import Dev4me.javaloginjpa.repository.EmailRepository;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.request.UsuarioSenhaRequest;
import Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse;
import Dev4me.javaloginjpa.response.UsuarioSimplesResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    EmailRepository emailRepository;


    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private JavaMailSender emailSender;

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postUsuario(@RequestBody @Valid Usuario novoUsuario) {
        repository.save(novoUsuario);
        String email = novoUsuario.getEmail();
        String uri = "http://localhost:8080/usuarios/sending-email/"+email;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject(uri, novoUsuario, String.class);
        return  ResponseEntity.status(201).build();
    }

    // Enviar email
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/sending-email/{email}")
    public ResponseEntity<Email> sendingEmail(@RequestBody @Valid Email emailDto, @PathVariable String email) {
        Email emailModel = new Email();
        emailModel.setSendDateEmail(LocalDateTime.now());
        emailModel.setEmailTo(email);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(emailModel.getEmailFrom());
            message.setTo(emailModel.getEmailTo());
            message.setSubject(emailModel.getSubject());
            message.setText(emailModel.getText());
            emailSender.send(message);
            emailModel.setStatusEmail(StatusEmail.SENT);
        } catch (MailException e) {
            emailModel.setStatusEmail(StatusEmail.ERROR);
        } finally {
            emailRepository.save(emailModel);
        }
        BeanUtils.copyProperties(emailDto, emailModel);
        return new ResponseEntity<>(emailModel, HttpStatus.CREATED);
    }

    //GET chamada do .csv
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "text/csv"))})
    @GetMapping("/relatorio")
    public ResponseEntity getRelatorio() {
        List<Usuario> lista = repository.findAll();

        ListaObj<Usuario> listaobj = new ListaObj<>(lista.size());

        for (Usuario u : lista) {
            listaobj.adiciona(u);
        }

        String relatorio = "ID"+";"+"NOME"+";"+"EMAIL"+";"+"CPF"+";"+"SENHA"+";"+"DATANASC"+";"+"TEL"+";"+"CEP"+";"+"ENDEC"+";"+"DESC"+"\n";
        for (int i = 0; listaobj.getTamanho() > i; i++) {
            relatorio += listaobj.getElemento(i).getId() + ";" + listaobj.getElemento(i).getNome() + ";"
                    + listaobj.getElemento(i).getEmail() + ";" + listaobj.getElemento(i).getCpf() + ";"
                    + listaobj.getElemento(i).getSenha() + ";" + listaobj.getElemento(i).getDataNasc() + ";"
                    + listaobj.getElemento(i).getTelefone() + ";" + listaobj.getElemento(i).getCep() + ";"
                    + listaobj.getElemento(i).getEndereco() + ";" + listaobj.getElemento(i).getDescUsuario() +"\n";
        }
        return ResponseEntity.status(200)
                .header("content-type", "text/csv")
                .header("content-disposition", "filename=\"relatorioUsuario.csv\"")
                .body(relatorio);
    }

    // GET de usuarios sem senha
    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<UsuarioSimplesResponse>> getUsuariosSimples() {
        return ResponseEntity.status(200).body(repository.getUsuariosSimples());
    }

    // GET de usuarios com senha
    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<List<Usuario>> getUsuario(@PathVariable String id) {
        return ResponseEntity.status(200).build();
    }

    //POST de autenticar usuario
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity autenticar(@RequestBody UsuarioAutenticacaoResponse usuario) {
        List<UsuarioAutenticacaoResponse> usuarios = repository.getUsuariosAutenticacao();
        if (usuarios.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        for (UsuarioAutenticacaoResponse u : usuarios) {
            if (u.getEmail().equals(usuario.getEmail()) && u.getSenha().equals(usuario.getSenha())) {
                return ResponseEntity.status(200).build();
            }
        }
        return ResponseEntity.status(404).build();
    }

    //DELETE desloga usuario
    @DeleteMapping("/delete/{id}")
    @CrossOrigin
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id,
                                              @RequestBody UsuarioAutenticacaoResponse usuario) {
        if (repository.existsById(id)) {
            List<UsuarioAutenticacaoResponse> usuarios = repository.getUsuariosAutenticacao();

            for (UsuarioAutenticacaoResponse u : usuarios) {
                if (u.getId().equals(id) && u.getSenha().equals(usuario.getSenha())) {
                    repository.deleteById(id);
                    return ResponseEntity.status(200).build();
                }
            }
        }

        return ResponseEntity.status(404).build();
    }

    // PATCH trocar senha
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PatchMapping("/senha/{id}")
    @CrossOrigin
    public ResponseEntity<List<UsuarioAutenticacaoResponse>> patchUsuarioSenha(@PathVariable Integer id,
                                                                               @RequestBody UsuarioSenhaRequest usuario) {
        if (repository.existsById(id)) {
            List<UsuarioAutenticacaoResponse> usuarios = repository.getUsuariosAutenticacao();

            for (UsuarioAutenticacaoResponse u : usuarios) {
                if (u.getId().equals(id) && u.getSenha().equals(usuario.getSenha())) {
                    repository.patchUsuarioSenha(id, usuario.getNovaSenha());
                    return ResponseEntity.status(200).build();
                }
            }
        }

        return ResponseEntity.status(404).build();
    }
}
