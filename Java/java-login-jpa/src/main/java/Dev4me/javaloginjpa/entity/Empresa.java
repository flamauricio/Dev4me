package Dev4me.javaloginjpa.entity;


import javax.persistence.*;

@Entity
@Table(name = "empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_empresa")
    private Integer id;

    @Column (name = "nome", length = 45)
    private String nome;

    @Column (name = "email", length = 45)
    private String email;

    @Column (name = "login", length = 45)
    private String login;

    @Column (name = "senha", length = 45)
    private String senha;

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

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    //public String getSenha() {return senha;}

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
