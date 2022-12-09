package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Usuario;

import java.time.LocalDate;

public class UsuarioTextoResponse {

    private Integer id;
    private String nome;
    private String email;
    private String senha;
    private String descUsuario;
    private String cpf;
    private String telefone;
    private String cep;
    private String endereco;

   // (id, nome, telefone, cpf, cep, endereco, email, senha, dataFormatada, descUsuario
    public UsuarioTextoResponse(Integer id, String nome, String telefone, String cpf, String cep, String endereco, String email, String senha, String descUsuario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.descUsuario = descUsuario;
        this.cpf = cpf;
        this.telefone = telefone;
        this.cep = cep;
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

    @Override
    public String toString() {
        return "UsuarioTextoResponse{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", descUsuario='" + descUsuario + '\'' +
                ", cpf='" + cpf + '\'' +
                ", telefone='" + telefone + '\'' +
                ", cep='" + cep + '\'' +
                ", endereco='" + endereco + '\'' +
                '}';
    }
}
