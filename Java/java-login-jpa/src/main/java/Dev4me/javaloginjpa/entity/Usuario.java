package Dev4me.javaloginjpa.entity;

import Dev4me.javaloginjpa.repository.UsuarioRepository;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.http.ResponseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_user")
    private Integer id;

    @NotBlank
    @Column (name = "nome", length = 45)
    private String nome;

    @NotBlank
    @Column (name = "owner_email", length = 45)
    private String email;

    @NotBlank
    @Column (name = "senha", length = 16)
    private String senha;

    @NotBlank
    @CreationTimestamp
    @Column (name = "data_nasc")
    private LocalDate dataNasc;

    @NotBlank
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

    public LocalDate getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
    }
}
