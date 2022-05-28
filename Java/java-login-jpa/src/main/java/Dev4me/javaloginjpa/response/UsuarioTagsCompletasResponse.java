package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Tag;
import Dev4me.javaloginjpa.entity.Usuario;
import Dev4me.javaloginjpa.entity.Vaga;

import java.util.List;
import java.util.Optional;

public class UsuarioTagsCompletasResponse
{
    private List<Tag> tags;

    private Optional<Usuario> usuario;

    public UsuarioTagsCompletasResponse(List<Tag> tags, Optional<Usuario> usuario) {
        this.tags = tags;
        this.usuario = usuario;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public Optional<Usuario> getUsuario() {
        return usuario;
    }
}