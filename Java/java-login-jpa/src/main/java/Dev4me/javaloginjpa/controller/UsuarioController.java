package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public ResponseEntity postUsuario (@RequestBody Usuario novoUsuario) {
        repository.save(novoUsuario);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity getUsuarios() {
        List<Usuario> usuarios = repository.findAll();
        if (usuarios.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(usuarios);
    }

    

}
