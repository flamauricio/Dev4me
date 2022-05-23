package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.TagUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagUsuarioRepository extends JpaRepository<TagUsuario, Integer>
{
    List<TagUsuario> findByFkUsuarioEmail(String email);

    List<TagUsuario> findByFkTagNome(String nome);
}
