package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.CandidatoVaga;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.repository.CandidatoVagaRepository;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/candidatos")
public class CandidatoVagaController
{
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private CandidatoVagaRepository candidatoVagaRepository;

    @PostMapping("/{idVaga}/{idUsuario}")
    @CrossOrigin
    public ResponseEntity postCandidato(
            @PathVariable Integer idVaga,
            @PathVariable Integer idUsuario
    ) {
        List<CandidatoVaga> list = new ArrayList<CandidatoVaga>();

        try {
            list = candidatoVagaRepository.findByFkUsuarioIdAndFkVagaIdVaga(
                    idUsuario, idVaga
            );
        }
        catch (Exception e) {
            System.out.println("Errozada: " + e.getMessage());
        }

        if (!list.isEmpty()) {
            return status(200).build();
        }

        Usuario usuario = usuarioRepository.getById(idUsuario);
        Vaga vaga = vagaRepository.getById(idVaga);

        if (usuario == null || vaga == null) {
            return status(404).build();
        }

        CandidatoVaga cv = new CandidatoVaga(usuario, vaga);
        candidatoVagaRepository.save(cv);

        return status(201).build();
    }
}
