package Dev4me.javaloginjpa.response;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class UsuarioWithoutPasswordResponse
{
    // Atributos


    private String nome;

    private String email;

    private LocalDate dataNasc;

    private String descUsuario;

    private  String cpf;

    private String telefone;

    private String cep;

    private String endereco;


    // Construtor


    public UsuarioWithoutPasswordResponse(String nome, String email, LocalDate dataNasc, String descUsuario, String cpf, String telefone, String cep, String endereco) {
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.descUsuario = descUsuario;
        this.cpf = cpf;
        this.telefone = telefone;
        this.cep = cep;
        this.endereco = endereco;
    }

    // Getters

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getDataNasc() {
        return dataNasc;
    }

    public String getDescUsuario() {
        return descUsuario;
    }

    public String getCpf() {
        return cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCep() {
        return cep;
    }

    public String getEndereco() {
        return endereco;
    }
}
