package Dev4me.javaloginjpa.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
@Entity
@Table(name = "usuario")
public class Usuario {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_user")
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 45)
    @Column (name = "nome", length = 45)
    private String nome;

    @NotBlank
    @Email
    @Column (name = "owner_email", length = 45)
    private String email;

    @NotBlank
    @Size(max = 16)
    @Column (name = "senha", length = 16)
    private String senha;

    @CreationTimestamp
    @Column (name = "data_nasc")
    private LocalDate dataNasc;

    @Size(max = 700)
    @Column (name = "desc_user", length = 700)
    private String descUsuario;

    @CPF
    @Size(max = 14)
    @Column (name = "cpf", length = 14)
    private String cpf;

   // @Pattern(regexp = "(\\(?\\d{2}\\)?\\s)?(\\d{4,5}\\-\\d{4})" , message = "Informe um telefone válido com ou sem DDD")
    @Column (name = "telefone", length = 14)
    private String telefone;

    @Size(max = 8)
    @Column (name = "cep", length = 8)
    private String cep;

    @Size(max = 100)
    @Column (name = "endereco", length = 100)
    private String endereco;




    public Usuario(Integer id, String nome, String email, String senha, LocalDate dataNasc, String descUsuario, String cpf, String telefone, String cep, String endereco) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataNasc = dataNasc;
        this.descUsuario = descUsuario;
        this.cpf = cpf;
        this.telefone = telefone;
        this.cep = cep;
        this.endereco = endereco;
    }

    public Usuario() {
    }

//    public Usuario(Integer id, String nome, String telefone, String cpf, String dataFormatada, String cep, String endereco, String email, String senha, String descUsuario) {
//    }



    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

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

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", dataNasc=" + dataNasc +
                ", descUsuario='" + descUsuario + '\'' +
                ", cpf='" + cpf + '\'' +
                ", telefone='" + telefone + '\'' +
                ", cep='" + cep + '\'' +
                ", endereco='" + endereco + '\'' +
                '}';
    }
}
