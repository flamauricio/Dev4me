package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.Vaga;

import java.util.List;

public class VagaTagsResponse
{
    private List<Vaga> vaga;

    private List<List<Tag>> tags;

    public VagaTagsResponse(List<Vaga> vaga, List<List<Tag>> tags) {
        this.vaga = vaga;
        this.tags = tags;
    }

    public List<Vaga> getVaga() {
        return vaga;
    }

    public void setVaga(List<Vaga> vaga) {
        this.vaga = vaga;
    }

    public List<List<Tag>> getTags() {
        return tags;
    }

    public void setTags(List<List<Tag>> tags) {
        this.tags = tags;
    }
}
