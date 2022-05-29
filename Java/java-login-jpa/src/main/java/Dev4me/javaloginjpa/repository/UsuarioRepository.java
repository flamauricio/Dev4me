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
import java.time.LocalDate;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Métodos
    @Query("select new Dev4me.javaloginjpa.response.UsuarioSimplesResponse(u.nome, u.email, u.dataNasc, u.descUsuario, u.cep) from Usuario u order by u.id desc")
    List<UsuarioSimplesResponse> getUsuariosSimples();

    List<Usuario> findAllByOrderByIdDesc();

    @Query("select new Dev4me.javaloginjpa.response.UsuarioAutenticacaoResponse(u.id, u.email, u.senha) from Usuario u")
    List<UsuarioAutenticacaoResponse> getUsuariosAutenticacao();

    List<Usuario> findByNome(String nome);

    @Transactional
    @Modifying
    @Query("update Usuario u set u.senha = ?2 where u.id = ?1")
    void patchUsuarioSenha(Integer id, String novaSenha);

    @Transactional
    @Modifying
    @Query("update Usuario u set u.nome = ?2, u.email = ?3, u.dataNasc = ?4, u.descUsuario = ?5, u.cpf = ?6, u.telefone = ?7, u.cep = ?8, u.endereco = ?9 where u.id = ?1")
    void patchUsuario(Integer id, String nome, String email, LocalDate dataNasc,
                      String descUsuario, String cpf, String telefone, String cep, String endereco);

}
