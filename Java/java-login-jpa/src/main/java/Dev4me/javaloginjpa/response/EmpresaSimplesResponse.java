package Dev4me.javaloginjpa.response;

import java.time.LocalDate;

public class EmpresaSimplesResponse
{
    // Atributos
    private String nome;
    private String email;

    // Construtor
    public EmpresaSimplesResponse(String nome, String email)
    {
        this.nome = nome;
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

}
