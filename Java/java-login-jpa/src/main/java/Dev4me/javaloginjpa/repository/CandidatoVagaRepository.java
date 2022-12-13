package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.CandidatoVaga;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidatoVagaRepository extends JpaRepository<CandidatoVaga, Integer>
{
    List<CandidatoVaga> findByFkUsuarioIdAndFkVagaIdVaga(int u, int v);

    @Query("select new Dev4me.javaloginjpa.entity.CandidatoVaga(u.fkUsuario, u.fkVaga) from CandidatoVaga u inner join Vaga v on v.idVaga = u.fkVaga where v.fkEmpresa=?1")
    List<CandidatoVaga> getVagasCandidatosById(Integer idEmpresa);
}
