package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}
