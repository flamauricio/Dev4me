package Dev4me.javaloginjpa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private MailSender mailSender;

    public void sendMessage(SimpleMailMessage simpleMailMessage){
        this.mailSender.send(simpleMailMessage);
    }
}
