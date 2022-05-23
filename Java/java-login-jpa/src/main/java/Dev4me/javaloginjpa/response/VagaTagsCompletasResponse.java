package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.Vaga;

import java.util.List;
import java.util.Optional;

public class VagaTagsCompletasResponse
{
    private List<Tag> tags;

    private Optional<Vaga> vaga;

    public VagaTagsCompletasResponse(List<Tag> tags, Optional<Vaga> vaga) {
        this.tags = tags;
        this.vaga = vaga;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public Optional<Vaga> getVaga() {
        return vaga;
    }
}