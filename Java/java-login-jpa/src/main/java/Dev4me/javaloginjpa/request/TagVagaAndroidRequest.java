package Dev4me.javaloginjpa.request;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.Vaga;
import Dev4me.javaloginjpa.request.TagVagaAndroidRequest;
import Dev4me.javaloginjpa.entity.TagVaga;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;
import Dev4me.javaloginjpa.response.TagVagaResponse;
import Dev4me.javaloginjpa.response.VagaListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


public class TagVagaAndroidRequest {
    private List<Tag> tags,
    private Vaga vaga

    public List<Tag> getTags() {
        return tags;
    }

    public Vaga getVaga() {
        return vaga;
    }
}