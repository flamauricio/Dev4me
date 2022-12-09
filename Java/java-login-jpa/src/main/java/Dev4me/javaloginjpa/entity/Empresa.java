package Dev4me.javaloginjpa.entity;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEmpresa;

    @NotBlank
    @Size(max = 45)
    @Column (name = "nome", length = 45)
    private String nome;

    @NotBlank
    @Email
    @Column (name = "email", length = 45)
    private String email;

    @NotBlank
    @Size(max = 16)
    @Column (name = "senha", length = 45)
    private String senha;

    @Size(max = 16)
    @Column (name = "cnpj", length = 16)
    private String cnpj;

    public String getSenha() {
        return senha;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Integer getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(Integer idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    //public String getSenha() {return senha;}

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
