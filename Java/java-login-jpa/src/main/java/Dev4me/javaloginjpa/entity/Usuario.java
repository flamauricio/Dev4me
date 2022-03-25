package Dev4me.javaloginjpa.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_user")
    private Integer id;

    @Column (name = "nome", length = 45)
    private String nome;

    @Column (name = "owner_email", length = 45)
    private String email;

    @Column (name = "senha", length = 16)
    private String senha;

    @Column (name = "data_nasc")
    private java.sql.Timestamp dataNasc;

    @Column (name = "desc_user", length = 200)
    private String descUsuario;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getDescUsuario() {
        return descUsuario;
    }

    public void setDescUsuario(String descUsuario) {
        this.descUsuario = descUsuario;
    }

    public Timestamp getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(Timestamp dataNasc) {
        this.dataNasc = dataNasc;
    }
}
