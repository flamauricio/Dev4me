package Dev4me.javaloginjpa.response;

import java.time.LocalDate;

public class EmpresaSimplesResponse
{
    // Atributos
    private String nome;
    private String login;
    private String email;

    // Construtor
    public EmpresaSimplesResponse(String nome, String login, String email)
    {
        this.nome = nome;
        this.login = login;
        this.email = email;
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

    public String getLogin() {
        return login;
    }
}
