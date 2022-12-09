package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.Usuario;

import java.util.List;

public class TagListListUsuarioListResponse
{
    private List<Usuario> usuarios;

    private List<List<Tag>> tags;

    public TagListListUsuarioListResponse(List<Usuario> usuarios, List<List<Tag>> tags) {
        this.usuarios = usuarios;
        this.tags = tags;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public List<List<Tag>> getTags() {
        return tags;
    }

    public void setTags(List<List<Tag>> tags) {
        this.tags = tags;
    }
}
