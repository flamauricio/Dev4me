package Dev4me.javaloginjpa.request;

public class UsuarioSenhaRequest
{
    // Atributos
    private Integer id;
    private String senha;
    private String novaSenha;

    // Getters
    public Integer getId()
    {
        return id;
    }

    public String getSenha()
    {
        return senha;
    }

    public String getNovaSenha()
    {
        return novaSenha;
    }

    // Setters
    public void setId(Integer id)
    {
        this.id = id;
    }

    public void setSenha(String senha)
    {
        this.senha = senha;
    }

    public void setNovaSenha(String novaSenha)
    {
        this.novaSenha = novaSenha;
    }
}
