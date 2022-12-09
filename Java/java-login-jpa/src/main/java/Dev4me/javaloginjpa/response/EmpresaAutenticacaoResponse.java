package Dev4me.javaloginjpa.response;

public class EmpresaAutenticacaoResponse
{
    // Atributos
    private Integer id;
    private String email;
    private String senha;

    // Construtor
    public EmpresaAutenticacaoResponse(Integer id, String email, String senha)
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

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
