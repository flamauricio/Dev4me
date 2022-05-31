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
    @Query("select new Dev4me.javaloginjpa.response.EmpresaSimplesResponse(e.nome, e.email) from Empresa e")
    List<EmpresaSimplesResponse> getEmpresasSimples();

    @Query("select new Dev4me.javaloginjpa.response.EmpresaAutenticacaoResponse(e.idEmpresa, e.email, e.senha) from Empresa e")
    List<EmpresaAutenticacaoResponse> getEmpresasAutenticacao();

    @Transactional
    @Modifying
    @Query("update Empresa e set e.senha = ?2 where e.idEmpresa = ?1")
    void patchEmpresaSenha(Integer id, String novaSenha);

    Empresa findByNome(String nome);

    @Transactional
    @Modifying
    @Query("update Empresa e set e.nome = ?2, e.email = ?3, e.cnpj = ?4 where e.idEmpresa = ?1")
    void patchEmpresa(Integer id, String nome, String email, String cnpj);


//    @Query("select new Dev4me.javaloginjpa.entity.Empresa(e.idEmpresa) from Empresa e where e.nome = ?1")
//    List<Empresa> getNomeIdEmpresa(String nome);
}
