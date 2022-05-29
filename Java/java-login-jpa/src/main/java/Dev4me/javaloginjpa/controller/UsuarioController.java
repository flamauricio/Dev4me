package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.csv.ListaObj;
import Dev4me.javaloginjpa.entity.*;
import Dev4me.javaloginjpa.enums.StatusEmail;
import Dev4me.javaloginjpa.repository.EmailRepository;
import Dev4me.javaloginjpa.repository.TagUsuarioRepository;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.request.UsuarioSenhaRequest;
import Dev4me.javaloginjpa.response.*;
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
import java.io.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.sql.Date;
import java.time.format.DateTimeFormatter;
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
    private JavaMailSender emailSender;

    @Autowired
    TagUsuarioRepository tagUsuarioRepository;

    @PostMapping("/filtros")
    @CrossOrigin
    public ResponseEntity getUsuariosFiltrados(
            @RequestBody VagaVetorTagResponse tags
    )
    {
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

    public static void gravaRegistro(String registro, String nomeArq) {
        BufferedWriter saida = null;

        try {
            saida = new BufferedWriter(new FileWriter(nomeArq, true));
        } catch (IOException erro) {
            System.out.println("Erro na abertura do arquivo:" + erro);
        }

        try {
            saida.append(registro + "\n");
            saida.close();
        } catch (IOException erro) {
            System.out.println("Erro na gravação do arquivo:" + erro);
        }
    }

    public void gravaArquivoTxt(String nomeArq) {
        List<Usuario> lista = repository.findAll();
        int contaRegistroCorpo = 0;
        String header = "00USUARIO";
        header += LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyyHH:mm:ss"));
        header += "01";
        gravaRegistro(header, nomeArq);
        String corpo;
        for (Usuario u : lista) {
            corpo = "02";
            corpo += String.format("%06d", u.getId());
            corpo += String.format("%-45.45s", u.getNome());
            corpo += String.format("%-14.14s", u.getTelefone());
            corpo += String.format("%-14.14s", u.getCpf());
            corpo += String.format("%-8.8s", u.getCep());
            corpo += String.format("%-45.45s", u.getEndereco());
            corpo += String.format("%-45.45s", u.getEmail());
            corpo += String.format("%-16.16s", u.getSenha());
            corpo += String.format("%-19.19s", u.getDataNasc());
            corpo += String.format("%-200.200s", u.getDescUsuario());
            gravaRegistro(corpo, nomeArq);
            contaRegistroCorpo++;
        }
        String trailer = "01";
        trailer += String.format("%013d", contaRegistroCorpo);
        gravaRegistro(trailer, nomeArq);
    }

    public void leArquivoTxt(String nomeArq) {
        BufferedReader entrada = null;
        String registro, tipoRegistro;
        String nome, email, senha, descUsuario, cpf, telefone, cep, endereco;

        LocalDate dataNasc = LocalDate.now();
        Date date = Date.valueOf(dataNasc);
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        String dataFormatada = format.format(date);


        Integer id;
        int contaRegDadoLido = 0;
        int qtdRegDadoGravado;

        List<Usuario> listaLida = new ArrayList<>();

        try {
            entrada = new BufferedReader(new FileReader(nomeArq));
        } catch (IOException erro) {
            System.out.println("Erro na abertura do arquivo:" + erro);
        }
        try {
            registro = entrada.readLine();

            while (registro != null) {
                tipoRegistro = registro.substring(0, 2);
                if (tipoRegistro.equals("00")) {
                    System.out.println("É um registro de header");
                    System.out.println("Tipo do arquivo:" +
                            registro.substring(2, 11));
                    System.out.println("Data e hora de gravação:" +
                            registro.substring(11, 28));
                    System.out.println("Versão do documento de layout:" +
                            registro.substring(28, 29));
                } else if (tipoRegistro.equals("01")) {
                    System.out.println("É um registro de trailer");
                    qtdRegDadoGravado = Integer.parseInt(registro.substring(2, 15));
                    if (contaRegDadoLido == qtdRegDadoGravado) {
                        System.out.println("Quantidade de registros lidos compatível" +
                                "com a quantidade de registros gravados");
                    } else {
                        System.out.println("Quantidade de registros lidos incompatível" +
                                "com a quantidade de registros gravados");
                    }

                } else if (tipoRegistro.equals("02")) {
                    System.out.println("É um registro de corpo");

                    List<Usuario> lista = repository.findAll();

                        id = Integer.valueOf(registro.substring(2, 8).trim());
                        nome = registro.substring(8, 53).trim();
                        telefone = registro.substring(53, 67).trim();
                        cpf = registro.substring(67, 81).trim();
                        cep = registro.substring(81, 89).trim();
                        endereco = registro.substring(89, 134);
                        email = registro.substring(134, 179).trim();
                        senha = registro.substring(179, 195).trim();
                        dataFormatada = registro.substring(195, 214).trim();
                        descUsuario = registro.substring(214, 414).trim();
                        contaRegDadoLido++;

//                        repository.save(new Usuario(id, nome, telefone, cpf, dataFormatada, cep, endereco, email, senha, descUsuario));

                } else {
                    System.out.println("Tipo de registro inválido");
                }
                registro = entrada.readLine();
            }
            entrada.close();
        } catch (IOException erro) {
            System.out.println("Erro ao ler arquivo:" + erro);
        }

//Aquitbseriapossívelfazerrepository.saveAll(listaLida);
//parasalvaroconteúdodalistanobanco
        System.out.println("\nLista lida do arquivo:");
        for (Usuario u : listaLida) {
            repository.saveAll(listaLida);
        }
    }

    @GetMapping("/relatorio-txt")
    public void getRelatorioTxt() {

        gravaArquivoTxt("Usuario.txt");
    }

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postUsuario(@RequestBody @Valid Usuario novoUsuario) {
        List<UsuarioAutenticacaoResponse> usuarios = repository.getUsuariosAutenticacao();
        boolean validador = false;
        for(UsuarioAutenticacaoResponse u : usuarios){
            if(u.getEmail().equals(novoUsuario.getEmail())){
                validador = true;
            }
        }if(validador){
            return status(203).build();
        }else{
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
    public ResponseEntity getVagaById(@PathVariable Integer id)
    {
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

    // PATCH alterar dados usuário
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

    //DELETE desloga usuario
    @DeleteMapping("/delete-tags-usuario/{id}")
    @CrossOrigin
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id) {

        List<TagUsuario> listTagUsuario = tagUsuarioRepository.findByFkUsuarioId(id);

        for (TagUsuario usuario:
             listTagUsuario) {

            if (id == usuario.getFkUsuario().getId()) {

                tagUsuarioRepository.deleteById(usuario.getIdTagUsuario());
            }

        }

        return status(200).build();
    }
}
