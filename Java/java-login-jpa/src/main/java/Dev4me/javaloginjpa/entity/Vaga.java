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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContrato() {
        return contrato;
    }

    public void setContrato(String contrato) {
        this.contrato = contrato;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Double getFaixaSalarialMin() {
        return faixaSalarialMin;
    }

    public void setFaixaSalarialMin(Double faixaSalarialMin) {
        this.faixaSalarialMin = faixaSalarialMin;
    }

    public Double getFaixaSalarialMax() {
        return faixaSalarialMax;
    }

    public void setFaixaSalarialMax(Double faixaSalarialMax) {
        this.faixaSalarialMax = faixaSalarialMax;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAtivadades() {
        return ativadades;
    }

    public void setAtivadades(String ativadades) {
        this.ativadades = ativadades;
    }

    public String getRequisitos() {
        return requisitos;
    }

    public void setRequisitos(String requisitos) {
        this.requisitos = requisitos;
    }

    public Boolean getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(Boolean disponivel) {
        this.disponivel = disponivel;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    @Override
    public String toString() {
        return "Vaga{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", contrato='" + contrato + '\'' +
                ", localizacao='" + localizacao + '\'' +
                ", faixaSalarialMin=" + faixaSalarialMin +
                ", faixaSalarialMax=" + faixaSalarialMax +
                ", descricao='" + descricao + '\'' +
                ", ativadades='" + ativadades + '\'' +
                ", requisitos='" + requisitos + '\'' +
                ", disponivel=" + disponivel +
                ", fkEmpresa=" + fkEmpresa +
                '}';
    }
}