package Dev4me.javaloginjpa.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tag_vaga")
public class TagVaga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTagVaga;

    @ManyToOne
    private Vaga fkVaga;

    @ManyToOne
    private Tag fkTag;

    public TagVaga(Vaga fk_vaga, Tag fk_tag) {
        this.fkVaga = fk_vaga;
        this.fkTag = fk_tag;
    }
}
