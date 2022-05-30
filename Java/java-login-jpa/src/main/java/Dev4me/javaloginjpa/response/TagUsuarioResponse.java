package Dev4me.javaloginjpa.response;

import Dev4me.javaloginjpa.entity.Usuario;

import java.util.ArrayList;
import java.util.List;

public class TagUsuarioResponse
{
    private String[] tags = new String[8];

    private Usuario usuario;

    public List<String> getTags() {
        List<String> lista = new ArrayList<String>();

        for (int index = 0; index < tags.length; index++) {
            lista.add(tags[index]);
        }

        return lista;
    }


    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
