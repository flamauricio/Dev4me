package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.CandidatoVaga;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatoVagaRepository extends JpaRepository<CandidatoVaga, Integer>
{
    List<CandidatoVaga> findByFkUsuarioIdAndFkVagaIdVaga(int u, int v);
}
