package Dev4me.javaloginjpa.response;

import javax.validation.constraints.NotBlank;

public class UsuarioAutenticacaoResponse
{
    // Atributos
    private Integer id;
    private String email;
    private String senha;

    // Construtor
    public UsuarioAutenticacaoResponse(Integer id, String email, String senha)
    {

        this.id = id;
        this.email = email;
        this.senha = senha;
    }

    // Getters
    public Integer getId()
    {
        return id;
    }

    public String getEmail()
    {
        return email;
    }

    public String getSenha()
    {
        return senha;
    }
}
