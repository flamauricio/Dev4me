package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.TagUsuario;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagVagaRepository extends JpaRepository<TagVaga, Integer> {

    List<TagVaga> findByFkVagaIdVaga(Integer idVaga);

//    List<TagVaga> findByFkTagIdTag(Integer idTag);

    List<TagVaga> findByFkTagNome(String nome);
}
