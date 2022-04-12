package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.Empresa;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.repository.EmpresaRepository;
import Dev4me.javaloginjpa.request.EmpresaSenhaRequest;
import Dev4me.javaloginjpa.request.UsuarioSenhaRequest;
import Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse;
import Dev4me.javaloginjpa.response.EmpresaSimplesResponse;
import Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse;
import Dev4me.javaloginjpa.response.UsuarioSimplesResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaRepository repository;

    //Método pra cadastro de Empresa;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    public ResponseEntity postEmpresa(@RequestBody @Valid Empresa novaEmpresa) {
        repository.save(novaEmpresa);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity <List<EmpresaSimplesResponse>> getEmpresasSimples() {
        List<EmpresaSimplesResponse> empresas = repository.getEmpresasSimples();
        if (empresas.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(empresas);
    }

    @ApiResponses({@ApiResponse (responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping("/login")
    public ResponseEntity autenticar(@RequestBody EmpresaAutenticacaoResponse empresa) {
        List<EmpresaAutenticacaoResponse> empresas = repository.getEmpresasAutenticacao();
        if (empresas.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        for (EmpresaAutenticacaoResponse u : empresas) {
            if (u.getEmail().equals(u.getEmail()) && u.getSenha().equals(empresa.getSenha())) {
                return ResponseEntity.status(200).build();
            }
        }
        return ResponseEntity.status(404).build();
    }

    //Método pra deletar empresa por ID
    @DeleteMapping("/delete/{id}")
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

    //Endpoint para troca de senha
    @ApiResponses({@ApiResponse (responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PatchMapping("/senha/{id}")
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