package Dev4me.javaloginjpa.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tags_vagas")
public class TagVaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tag_vaga")
    private Integer id_tag_vaga;

    @ManyToOne
    private Vaga fk_vaga;

    @ManyToOne
    private Tag fk_tag;

}
