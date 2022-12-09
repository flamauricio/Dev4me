package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {

    Tag findByNome(String nome);
}
