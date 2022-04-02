package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.request.UsuarioSenhaRequest;
import Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse;
import Dev4me.javaloginjpa.response.UsuarioSimplesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    //Método pra cadastro do Usuário;
    @PostMapping
    public ResponseEntity postUsuario (@RequestBody @Valid Usuario novoUsuario) {
        repository.save(novoUsuario);
        return ResponseEntity.status(201).build();
    }

//    @GetMapping("/completos")
//    public ResponseEntity getUsuarios()
//    {
//        List<Usuario> usuarios = repository.findAll();
//        return ResponseEntity.status(200).body(usuarios);
//    }

    @GetMapping
    public ResponseEntity getUsuariosSimples() {
        List<UsuarioSimplesResponse> usuarios = repository.getUsuariosSimples();
        if (usuarios.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(usuarios);
    }


    @PostMapping("/login")
    public ResponseEntity autenticar(@RequestBody UsuarioAutenticacaoResponse usuario)
    {
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUsuario(@PathVariable Integer id,
                                        @RequestBody UsuarioAutenticacaoResponse usuario)
    {
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

    @PatchMapping("/senha/{id}")
    public ResponseEntity patchUsuarioSenha(@PathVariable Integer id,
                                            @RequestBody UsuarioSenhaRequest usuario)
    {
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
