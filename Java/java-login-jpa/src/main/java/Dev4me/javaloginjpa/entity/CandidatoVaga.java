package Dev4me.javaloginjpa.entity;

import javax.persistence.*;

@Entity
public class CandidatoVaga
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Usuario fkUsuario;

    @ManyToOne Vaga fkVaga;

    public Integer getId() {
        return id;
    }

    public CandidatoVaga() {

    }

    public CandidatoVaga(Usuario fkUsuario, Vaga fkVaga) {
        this.fkUsuario = fkUsuario;
        this.fkVaga = fkVaga;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getFkUsuario() {
        return fkUsuario;
    }

    public void setFkUsuario(Usuario fkUsuario) {
        this.fkUsuario = fkUsuario;
    }

    public Vaga getFkVaga() {
        return fkVaga;
    }

    public void setFkVaga(Vaga fkVaga) {
        this.fkVaga = fkVaga;
    }
}
