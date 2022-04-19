package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.csv.ListaObj;
import Dev4me.javaloginjpa.entity.Usuario;
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

    @Autowired
    private UsuarioRepository repository;

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    public ResponseEntity postUsuario(@RequestBody @Valid Usuario novoUsuario) {
        repository.save(novoUsuario);
        return ResponseEntity.status(201).build();
    }

    //GET chamada do .csv
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
    public ResponseEntity<List<UsuarioSimplesResponse>> getUsuariosSimples() {
        return ResponseEntity.status(200).body(repository.getUsuariosSimples());
    }

    //POST de autenticar usuario
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
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
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
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
