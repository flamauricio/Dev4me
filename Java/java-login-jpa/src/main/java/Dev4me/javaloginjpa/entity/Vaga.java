package Dev4me.javaloginjpa.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "vagas")
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vagas")
    private Integer id;

    @NotBlank
    @Size(max = 45)
    @Column (name = "titulo", length = 45)
    private String titulo;

    @NotBlank
    @Size(max = 10)
    @Column (name = "contrato", length = 10)
    private String contrato;

    @Size(max = 50)
    @Column (name = "localizacao", length = 50)
    private String localizacao;

    @DecimalMax("99999.00")
    @Column (name = "faixa_salarial_min")
    private Double faixaSalarialMin;

    @DecimalMax("99999.00")
    @Column (name = "faixa_salarial_max")
    private Double faixaSalarialMax;

    @NotBlank
    @Size(max = 100)
    @Column (name = "descricao", length = 100)
    private String descricao;

    @NotBlank
    @Size(max = 200)
    @Column (name = "ativadades", length = 200)
    private String ativadades;

    @NotBlank
    @Size(max = 200)
    @Column (name = "requisitos", length = 200)
    private String requisitos;

    @NotNull
    @Column (name = "is_disponivel")
    private Boolean disponivel;

    @NotNull
    @Column (name = "fk_empresa")
    private Integer fkEmpresa;
}