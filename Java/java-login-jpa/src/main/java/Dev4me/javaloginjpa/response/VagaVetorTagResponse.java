package Dev4me.javaloginjpa.response;

import java.util.ArrayList;
import java.util.List;

public class VagaVetorTagResponse
{
    private String[] tags;

    public List<String> getTags()
    {
        List<String> listaTags = new ArrayList<String>();
        for (String tag : tags) {
            listaTags.add(tag);
        }

        return listaTags;
    }

    public void setTags(String[] tags)
    {
        this.tags = tags;
    }
}
