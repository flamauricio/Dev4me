package Dev4me.javaloginjpa.entity;

import javax.persistence.*;

@Entity
public class TagUsuario
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTagUsuario;

    @ManyToOne
    private Usuario fkUsuario;

    @ManyToOne
    private Tag fkTag;

    public TagUsuario(Usuario fkUsuario, Tag fkTag) {
        this.fkUsuario = fkUsuario;
        this.fkTag = fkTag;
    }

    public TagUsuario() {
    }

    public Integer getIdTagUsuario() {
        return idTagUsuario;
    }

    public void setIdTagUsuario(Integer idTagUsuario) {
        this.idTagUsuario = idTagUsuario;
    }

    public Usuario getFkUsuario() {
        return fkUsuario;
    }

    public void setFkUsuario(Usuario fkUsuario) {
        this.fkUsuario = fkUsuario;
    }

    public Tag getFkTag() {
        return fkTag;
    }

    public void setFkTag(Tag fkTag) {
        this.fkTag = fkTag;
    }
}
