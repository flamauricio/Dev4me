package Dev4me.javaloginjpa.response;

import java.util.ArrayList;
import java.util.List;

public class VagaFiltroResponse
{
    private String[] filtros;

    private String[] tags;

    private String localizacao;

    private String[] contratos;

    public List<String> getFiltros()
    {
        List<String> listaFiltros = new ArrayList<String>();

        for (String filtro : filtros) {
            listaFiltros.add(filtro);
        }

        return listaFiltros;
    }

    public String getLocalizacao()
    {
        return localizacao;
    }

    public List<String> getTags()
    {
        List<String> listaTags = new ArrayList<String>();

        for (String filtro : tags) {
            listaTags.add(filtro);
        }

        return listaTags;
    }

    public List<String> getContratos()
    {
        List<String> listaContratos = new ArrayList<String>();

        for (String filtro : contratos) {
            listaContratos.add(filtro);
        }

        return listaContratos;
    }
}
