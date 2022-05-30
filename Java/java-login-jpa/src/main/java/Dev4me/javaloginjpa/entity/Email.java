package Dev4me.javaloginjpa.entity;

import Dev4me.javaloginjpa.controller.UsuarioController;
import Dev4me.javaloginjpa.enums.StatusEmail;
import Dev4me.javaloginjpa.repository.UsuarioRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "email")
public class Email implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_id")
    private Long emailId;

    @Column(name = "owner_ref")
    private String ownerRef = "Grupo Dev4me";

    @Column(name = "email_from")
    private String emailFrom =  "devfourme@gmail.com";

    @Column(name = "email_to")
    private String emailTo;

    @Column(name = "subject")
    private String subject = "Cadastro realizado com sucesso!";

    @Column(name = "text", columnDefinition = "TEXT") // 255
    private String text = "Parábens seu cadastro foi realizado com sucesso clique no link para conseguir navegar em nosso site!";

    @Column(name = "send_date_email")
    private LocalDateTime sendDateEmail;

    @Column(name = "status_email")
    private StatusEmail statusEmail;

}
