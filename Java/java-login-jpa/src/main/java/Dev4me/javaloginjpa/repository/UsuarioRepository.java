package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.csv.ListaObj;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse;
import Dev4me.javaloginjpa.response.UsuarioSimplesResponse;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Métodos
    @Query("select new Dev4me.javaloginjpa.response.UsuarioSimplesResponse(u.nome, u.email, u.dataNasc, u.descUsuario) from Usuario u")
    List<UsuarioSimplesResponse> getUsuariosSimples();

    @Query("select new Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse(u.id, u.email, u.senha) from Usuario u")
    List<UsuarioAutenticacaoResponse> getUsuariosAutenticacao();

    @Transactional
    @Modifying
    @Query("update Usuario u set u.senha = ?2 where u.id = ?1")
    void patchUsuarioSenha(Integer id, String novaSenha);

}
