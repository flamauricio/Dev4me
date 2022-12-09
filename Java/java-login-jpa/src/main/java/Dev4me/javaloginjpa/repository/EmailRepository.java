package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Long> {
}
