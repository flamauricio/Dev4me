package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Vaga;

import java.util.ArrayList;
import java.util.List;

public class TagVagaResponse
{
    private String[] tags = new String[8];

    private Vaga vaga;

    public List<String> getTags() {
        List<String> lista = new ArrayList<String>();

        for (int index = 0; index < tags.length; index++) {
            lista.add(tags[index]);
        }

        return lista;
    }


    public Vaga getVaga() {
        return vaga;
    }

    public void setVaga(Vaga vaga) {
        this.vaga = vaga;
    }
}
