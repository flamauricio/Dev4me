package Dev4me.javaloginjpa.repository;

import Dev4me.javaloginjpa.entity.Empresa;
import Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse;
import Dev4me.javaloginjpa.response.EmpresaSimplesResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
    // Métodos
    @Query("select new Dev4me.javaloginjpa.response.EmpresaSimplesResponse(e.nome, e.login, e.email) from Empresa e")
    List<EmpresaSimplesResponse> getEmpresasSimples();

    @Query("select new Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse(e.id, e.email, e.senha) from Empresa e")
    List<EmpresaAutenticacaoResponse> getEmpresasAutenticacao();

    @Transactional
    @Modifying
    @Query("update Empresa e set e.senha = ?2 where e.id = ?1")
    void patchEmpresaSenha(Integer id, String novaSenha);
}
