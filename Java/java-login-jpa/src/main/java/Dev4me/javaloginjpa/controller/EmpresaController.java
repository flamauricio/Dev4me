package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Email;
import Dev4me.javaloginjpa.entity.Empresa;
import Dev4me.javaloginjpa.enums.StatusEmail;
import Dev4me.javaloginjpa.repository.EmailRepository;
import Dev4me.javaloginjpa.repository.EmpresaRepository;
import Dev4me.javaloginjpa.request.EmpresaSenhaRequest;
import Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse;
import Dev4me.javaloginjpa.response.EmpresaSimplesResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    EmpresaRepository repository;

    //Método pra cadastro de Empresa;
   @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postEmpresa(@RequestBody @Valid Empresa novaEmpresa) {
        repository.save(novaEmpresa);
        return ResponseEntity.status(201).build();
    }

    // GET da empresa sem senha
    @GetMapping
    @CrossOrigin
    public ResponseEntity <List<EmpresaSimplesResponse>> getEmpresasSimples() {
        List<EmpresaSimplesResponse> empresas = repository.getEmpresasSimples();
        if (empresas.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(empresas);
    }

    @GetMapping("/perfil/{id}")
    @CrossOrigin
    public ResponseEntity<Optional<Empresa>> getEmpresaPerfil(@PathVariable Integer id) {
        return ResponseEntity.status(200).body(repository.findById(id));
    }

    // POST de autenticar usuario da empresa
    @ApiResponses({@ApiResponse (responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity autenticar(@RequestBody EmpresaAutenticacaoResponse empresa) {
        List<EmpresaAutenticacaoResponse> empresas = repository.getEmpresasAutenticacao();
        if (empresas.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        for (EmpresaAutenticacaoResponse u : empresas) {
            if (u.getEmail().equals(u.getEmail()) && u.getSenha().equals(empresa.getSenha())) {
                return ResponseEntity.status(200).body(u.getId());
            }
        }
        return ResponseEntity.status(404).build();
    }

    //DELETE para deletar empresa por ID
    @DeleteMapping("/delete/{id}")
    @CrossOrigin
    public ResponseEntity<Void> deleteEmpresa(@PathVariable Integer id,
                                        @RequestBody EmpresaAutenticacaoResponse empresa) {
        if (repository.existsById(id)) {
            List<EmpresaAutenticacaoResponse> empresas = repository.getEmpresasAutenticacao();

            for (EmpresaAutenticacaoResponse u : empresas) {
                if (u.getId().equals(id) && u.getSenha().equals(empresa.getSenha())) {
                    repository.deleteById(id);
                    return ResponseEntity.status(200).build();
                }
            }
        }

        return ResponseEntity.status(404).build();
    }

    //PATCH para troca de senha
    @ApiResponses({@ApiResponse (responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PatchMapping("/senha/{id}")
    @CrossOrigin
    public ResponseEntity patchEmpresaSenha(@PathVariable Integer id,
                                            @RequestBody EmpresaSenhaRequest empresa) {
        if (repository.existsById(id)) {
            List<EmpresaAutenticacaoResponse> empresas = repository.getEmpresasAutenticacao();

            for (EmpresaAutenticacaoResponse u : empresas) {
                if (u.getId().equals(id) && u.getSenha().equals(empresa.getSenha())) {
                    repository.patchEmpresaSenha(id, empresa.getNovaSenha());
                    return ResponseEntity.status(200).build();
                }
            }
        }
        return ResponseEntity.status(404).build();
    }
}