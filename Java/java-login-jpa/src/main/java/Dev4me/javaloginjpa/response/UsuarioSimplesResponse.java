package Dev4me.javaloginjpa.response;

import java.time.LocalDate;

public class UsuarioSimplesResponse
{
    // Atributos
    private String nome;
    private String email;
    private LocalDate dataNasc;
    private String descUsuario;

    private String cep;

    // Construtor
    public UsuarioSimplesResponse(String nome, String email, LocalDate dataNasc, String descUsuario, String cep)
    {
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.descUsuario = descUsuario;
        this.cep = cep;
    }

    // Getters
    public String getNome()
    {

        return nome;
    }

    public String getEmail()
    {

        return email;
    }

    public LocalDate getDataNasc()
    {

        return dataNasc;
    }

    public String getDescUsuario()
    {

        return descUsuario;
    }

    public String getCep() {
        return cep;
    }
}
