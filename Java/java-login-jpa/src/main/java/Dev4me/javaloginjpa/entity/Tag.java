package Dev4me.javaloginjpa.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tag")
    private Integer id_tag;

    @NotBlank
    @Size(max = 45)
    @Column(name = "nome", length = 45)
    private String nome;

    @NotBlank
    @Size(max = 45)
    @Column(name = "tipo", length = 45)
    private String tipo;

    @NotBlank
    @Size(max = 200)
    @Column(name = "url", length = 200)
    private String url;

    public Integer getId_tag() {
        return id_tag;
    }

    public void setId_tag(Integer id_tag) {
        this.id_tag = id_tag;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
