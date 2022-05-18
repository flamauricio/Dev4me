package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.response.UsuarioSimplesResponse;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VagaRepository extends JpaRepository<Vaga, Integer> {

    List<Vaga> findByLocalizacao(String localizacao);

    List<Vaga> findByContrato(String contrato);

    Vaga findByFkEmpresaIdEmpresaAndTitulo(int id, String titulo);
//
//    @Query("select new Dev4me.javaloginjpa.entity.Tag(u.id, u.email, u.senha) from Usuario u")

    List<Vaga> findAllByOrderByIdVagaDesc();
}
