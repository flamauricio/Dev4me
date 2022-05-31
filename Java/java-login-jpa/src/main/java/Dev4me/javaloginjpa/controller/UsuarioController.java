package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.*;
import Dev4me.javaloginjpa.enums.StatusEmail;
import Dev4me.javaloginjpa.repository.*;
import Dev4me.javaloginjpa.request.UsuarioSenhaRequest;
import Dev4me.javaloginjpa.response.*;
import Dev4me.javaloginjpa.service.MailService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    EmailRepository emailRepository;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    TagUsuarioRepository tagUsuarioRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    TagRepository tagRepository;

    @PostMapping("/filtros")
    @CrossOrigin
    public ResponseEntity getUsuariosFiltrados(
            @RequestBody VagaVetorTagResponse tags
    ) {
        List<String> listaTagsFiltragem = tags.getTags();
        List<Usuario> listaUsuarios = new ArrayList<Usuario>();
        List<List<Tag>> listaListaTags = new ArrayList<List<Tag>>();

        if (repository.findAllByOrderByIdDesc().equals(null)) {
            return status(204).build();
        }

        if (listaTagsFiltragem.isEmpty()) {
            listaUsuarios = repository.findAllByOrderByIdDesc();
            for (Usuario usuario : listaUsuarios) {
                List<Tag> listaTag = new ArrayList<Tag>();
                List<TagUsuario> listaProvisoria = tagUsuarioRepository.findByFkUsuarioEmail(usuario.getEmail());
                for (TagUsuario tagUsuario : listaProvisoria) {
                    listaTag.add(tagUsuario.getFkTag());
                }

                listaListaTags.add(listaTag);
            }

            TagListListUsuarioListResponse tllur = new TagListListUsuarioListResponse(listaUsuarios, listaListaTags);

            return status(200).body(tllur);
        }
        for (String nomeTag : listaTagsFiltragem) {
            List<TagUsuario> listaProvisoria = tagUsuarioRepository.findByFkTagNome(nomeTag);

            if (!listaProvisoria.isEmpty()) {
                for (TagUsuario tagUsuario : listaProvisoria) {
                    listaUsuarios.add(tagUsuario.getFkUsuario());
                }
            }

        }
        if (listaUsuarios.isEmpty()) {
            return status(204).build();
        }
        for (Usuario usuario : listaUsuarios) {
            List<TagUsuario> listaTagsUsuarios = tagUsuarioRepository.findByFkUsuarioEmail(usuario.getEmail());
            List<Tag> listaTag = new ArrayList<Tag>();
            for (TagUsuario tagUsuario : listaTagsUsuarios) {
                listaTag.add(tagUsuario.getFkTag());
            }
            listaListaTags.add(listaTag);
        }
        TagListListUsuarioListResponse tllulr = new TagListListUsuarioListResponse(listaUsuarios, listaListaTags);
        return status(200).body(tllulr);
    }

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postUsuario(@RequestBody @Valid Usuario novoUsuario) {
        List<UsuarioAutenticacaoResponse> usuarios = repository.getUsuariosAutenticacao();
        boolean validador = false;
        for (UsuarioAutenticacaoResponse u : usuarios) {
            if (u.getEmail().equals(novoUsuario.getEmail())) {
                validador = true;
            }
        }
        if (validador) {
            return status(203).build();
        } else {
            repository.save(novoUsuario);
            String email = novoUsuario.getEmail();
            String uri = "http://localhost:8080/usuarios/sending-email/" + email;
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForObject(uri, novoUsuario, String.class);
        }
        return status(201).build();
    }

    // Enviar email
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/sending-email/{email}")
    @CrossOrigin
    public ResponseEntity<Email> sendingEmail(@RequestBody @Valid Email emailDto, @PathVariable String email) {
        Email emailModel = new Email();
        emailModel.setSendDateEmail(LocalDateTime.now());
        emailModel.setEmailTo(email);
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(emailModel.getEmailFrom());
            simpleMailMessage.setTo(emailModel.getEmailTo());
            simpleMailMessage.setSubject(emailModel.getSubject());
            simpleMailMessage.setText(emailModel.getText());
            mailService.sendMessage(simpleMailMessage);
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
    @CrossOrigin
    public ResponseEntity getRelatorio() {
        List<Usuario> lista = repository.findAll();

        String relatorio = "ID" + ";" + "NOME" + ";" + "EMAIL" + ";" + "CPF" + ";" + "SENHA" + ";" + "DATANASC" + ";" + "TEL" + ";" + "CEP" + ";" + "ENDEC" + ";" + "DESC" + "\n";
        for (Usuario usuario : lista) {
            relatorio += usuario.getId() + ";" + usuario.getNome() + ";"
                    + usuario.getEmail() + ";" + usuario.getCpf() + ";"
                    + usuario.getSenha() + ";" + usuario.getDataNasc() + ";"
                    + usuario.getTelefone() + ";" + usuario.getCep() + ";"
                    + usuario.getEndereco() + ";" + usuario.getDescUsuario() + "\n";
        }
        return status(200)
                .header("content-type", "text/csv")
                .header("content-disposition", "filename=\"relatorioUsuario.csv\"")
                .body(relatorio);
    }

    // GET de usuarios sem senha
    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<UsuarioSimplesResponse>> getUsuariosSimples() {
        return status(200).body(repository.getUsuariosSimples());
    }

    // GET de usuarios com senha
    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<List<Usuario>> getUsuario(@PathVariable String id) {
        return status(200).build();
    }

    // GET de um usuário específico
    @GetMapping("/perfil/{id}")
    @CrossOrigin
    public ResponseEntity<Optional<Usuario>> getUsuarioPerfil(@PathVariable Integer id) {
        return ResponseEntity.status(200).body(repository.findById(id));
    }

    @GetMapping("/tags-usuario/{id}")
    @CrossOrigin
    public ResponseEntity getVagaById(@PathVariable Integer id) {
        Optional<Usuario> usuario = repository.findById(id);

        if (usuario.isEmpty()) {
            return status(404).build();
        }

        List<TagUsuario> listTagUsuario = tagUsuarioRepository.findByFkUsuarioId(id);

        if (listTagUsuario.isEmpty()) {
            return status(404).build();
        }

        List<Tag> tags = new ArrayList<Tag>();

        for (TagUsuario tag : listTagUsuario) {
            tags.add(tag.getFkTag());
        }

        UsuarioTagsCompletasResponse usuarioTags = new UsuarioTagsCompletasResponse(tags, usuario);

        return status(200).body(usuarioTags);
    }

    //POST de autenticar usuario
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity autenticar(@RequestBody UsuarioAutenticacaoResponse usuario) {
        List<UsuarioAutenticacaoResponse> usuarios = repository.getUsuariosAutenticacao();
        if (usuarios.isEmpty()) {
            return status(204).build();
        }
        for (UsuarioAutenticacaoResponse u : usuarios) {
            if (u.getEmail().equals(usuario.getEmail()) && u.getSenha().equals(usuario.getSenha())) {
                return status(200).body(u.getId());
            }
        }
        return status(404).build();
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
                    return status(200).build();
                }
            }
        }

        return status(404).build();
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
                    return status(200).build();
                }
            }
        }

        return status(404).build();
    }

    // PATCH alterar dados do usuário
    @PatchMapping("/alterar-dados")
    @CrossOrigin
    public ResponseEntity<Usuario> patchUsuarioSenha(@RequestBody Usuario usuario) {

        Integer id = usuario.getId();
        String nome = usuario.getNome();
        String email = usuario.getEmail();
        LocalDate dataNasc = usuario.getDataNasc();
        String descUsuario = usuario.getDescUsuario();
        String cpf = usuario.getCpf();
        String telefone = usuario.getTelefone();
        String cep = usuario.getCep();
        String endereco = usuario.getEndereco();

        if (repository.existsById(id)) {

            repository.patchUsuario(id, nome, email, dataNasc, descUsuario, cpf, telefone, cep, endereco);

            return status(200).build();
        }

        return status(404).build();
    }

    //DELETE tira registros da tabela relacional tag_usuario
    @DeleteMapping("/delete-tags-usuario/{id}")
    @CrossOrigin
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id) {

        List<TagUsuario> listTagUsuario = tagUsuarioRepository.findByFkUsuarioId(id);

        for (TagUsuario usuario :
                listTagUsuario) {

            if (id == usuario.getFkUsuario().getId()) {

                tagUsuarioRepository.deleteById(usuario.getIdTagUsuario());
            }

        }

        return status(200).build();
    }

    //POST adiciona registros da tabela relacional tag_usuario
    @PostMapping("/post-tag-usuario")
    @CrossOrigin
    public ResponseEntity postTagUsuario(@RequestBody TagUsuarioResponse tagsEIdUsuario)
    {
        List<String> tags = tagsEIdUsuario.getTags();

        Integer idUsuario = tagsEIdUsuario.getUsuario().getId();

        deleteUsuario(idUsuario);

        for (String tag : tags) {

            System.out.println(tag);

            Tag tagDaVez = tagRepository.findByNome(tag);

            tagUsuarioRepository.save(new TagUsuario(tagsEIdUsuario.getUsuario(), tagDaVez));
        }

        return status(201).build();
    }
}
