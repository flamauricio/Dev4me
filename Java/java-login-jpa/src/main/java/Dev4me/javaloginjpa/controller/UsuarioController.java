package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.csv.ListaObj;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.entity.UsuarioCsv;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.request.UsuarioSenhaRequest;
import Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse;
import Dev4me.javaloginjpa.response.UsuarioSimplesResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    // Começo do codigo CSV
    public static void gravaArquivoCsv(ListaObj<UsuarioCsv> lista, String nomeArq) {
        FileWriter arq = null;
        Formatter saida = null;
        nomeArq += ".csv";
        Boolean deuRuim = false;

        // Bloco gravar no arquivo
        try {
            arq = new FileWriter(nomeArq);
            saida = new Formatter(arq);
        } catch (IOException erro) {
            System.out.println("Erro ao abrir o arquivo");
            System.exit(1);
        }


        try {
            for (int i = 0; i < lista.getTamanho(); i++) {
                UsuarioCsv user = lista.getElemento(i);

                saida.format("%d;%s;%s;%s;%s;%s;%s;%s;%s;%s\n",
                        user.getId(), user.getNome(), user.getTelefone(), user.getCpf(), user.getCep(), user.getEndereco(),
                        user.getEmail(), user.getSenha(), user.getDataNasc(), user.getDescUsuario());
            }
        } catch (FormatterClosedException erro) {
            System.out.println("Erro ao gravar o arquivo!");
            deuRuim = true;
        } finally {
            saida.close();
            try {
                arq.close();
            } catch (IOException erro) {
                System.out.println("Erro ao fechar o arquivo!");
                deuRuim = true;
            }
            if (deuRuim) {
                System.exit(1);
            }
        }
    }

    public static void leExibeArquivoCsv(String nomeArq) {
        FileReader arq = null;
        Scanner entrada = null;
        nomeArq += ".csv";
        Boolean deuRuim = false;

        //Bloco try catch para abrir o arquivo
        try {
            arq = new FileReader(nomeArq);
            entrada = new Scanner(arq).useDelimiter(";|\\n");
        } catch (FileNotFoundException erro) {
            System.out.println("Arquivo não encontrado");
            System.exit(1);
        }

        try {
            System.out.printf("%6s %14s %14s %14s %8s %20s %20s %16s %10s %30s\n",
                    "ID", "NOME", "EMAIL", "SENHA", "DATANASC", "DESCRICAO", "CPF", "TELEFONE", "CEP", "ENDERECO");
            while (entrada.hasNext()) {
                Integer id = entrada.nextInt();
                String nome = entrada.next();
                String email = entrada.next();
                String senha = entrada.next();
                String dataNasc = entrada.next();
                String descUsuario = entrada.next();
                String cpf = entrada.next();
                String telefone = entrada.next();
                String cep = entrada.next();
                String endereco = entrada.next();
                System.out.printf("%6s %14s %14s %14s %8s %20s %20s %16s %10s %30s\n",
                        id, nome, email, senha, dataNasc, descUsuario, cpf, telefone, cep, endereco);
            }
        } catch (NoSuchElementException erro) {
            System.out.println("Arquivo com problemas");
            deuRuim = true;
        } catch (IllegalStateException erro) {
            System.out.println("Erro na leitura do arquivo");
            deuRuim = true;
        } finally {
            entrada.close();
            try {
                arq.close();
            } catch (IOException erro) {
                System.out.println("Erro ao fechar o arquivo!");
                deuRuim = true;
            }
            if (deuRuim) {
                System.exit(1);
            }
        }
    }
    // Fim do codigo do CSV

    @Autowired
    private UsuarioRepository repository;

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    public ResponseEntity postUsuario(@RequestBody @Valid Usuario novoUsuario) {
        repository.save(novoUsuario);
        return ResponseEntity.status(201).build();
    }

    //GET da chamada do csv
    @GetMapping("/csv")
    public ResponseEntity getUsuarios() {
        ListaObj<UsuarioCsv> lista = new ListaObj<>(5);
        lista.adiciona(new UsuarioCsv(1, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(2, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(3, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(4, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(5, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(6, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(7, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(8, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(9, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));
        lista.adiciona(new UsuarioCsv(10, "flavio", "fla@gmail.com", "123", "2022-01-01", "desc", "51074289838", "11944429010", "03214020", "Rua"));

        gravaArquivoCsv(lista, "usuarios");
        leExibeArquivoCsv("usuarios");
        return ResponseEntity.status(200).body(lista);
    }

    // GET de usuarios sem senha
    @GetMapping
    public ResponseEntity<List<UsuarioSimplesResponse>> getUsuariosSimples() {
        return ResponseEntity.status(200).body(repository.getUsuariosSimples());
    }

    //POST de autenticar usuario
    @ApiResponses({@ApiResponse (responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/login")
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
    @ApiResponses({@ApiResponse (responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PatchMapping("/senha/{id}")
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
