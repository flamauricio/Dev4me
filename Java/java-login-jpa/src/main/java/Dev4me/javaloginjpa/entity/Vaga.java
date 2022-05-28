package Dev4me.javaloginjpa.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idVaga;


    @Size(max = 45)
    @Column (name = "titulo", length = 45)
    private String titulo;


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


    @Size(max = 700)
    @Column (name = "descricao", length = 700)
    private String descricao;

    @Size(max = 700)
    @Column (name = "atividades", length = 700)
    private String atividades;

    @Size(max = 700)
    @Column (name = "requisitos", length = 700)
    private String requisitos;


    @Column (name = "is_disponivel")
    private Boolean disponivel;

    @ManyToOne
    private Empresa fkEmpresa;

    public Vaga(Integer idVaga, String titulo, String contrato, String localizacao, Double faixaSalarialMin, Double faixaSalarialMax, Boolean disponivel, Empresa fkEmpresa) {
        this.idVaga = idVaga;
        this.titulo = titulo;
        this.contrato = contrato;
        this.localizacao = localizacao;
        this.faixaSalarialMin = faixaSalarialMin;
        this.faixaSalarialMax = faixaSalarialMax;
        this.disponivel = disponivel;
        this.fkEmpresa = fkEmpresa;
    }

    public Vaga() {
    }

    public Integer getIdVaga() {
        return idVaga;
    }

    public void setIdVaga(Integer idVaga) {
        this.idVaga = idVaga;
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

    public String getAtividades() {
        return atividades;
    }

    public void setAtividades(String atividades) {
        this.atividades = atividades;
    }

    public Empresa getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Empresa fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

}