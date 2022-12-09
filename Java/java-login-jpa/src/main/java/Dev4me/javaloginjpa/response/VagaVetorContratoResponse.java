package Dev4me.javaloginjpa.response;

import java.util.ArrayList;
import java.util.List;

public class VagaVetorContratoResponse
{
    private String[] contratos;

    public List<String> getContratos()
    {
        List<String> listaContratos = new ArrayList<String>();
        for (String tag : contratos) {
            listaContratos.add(tag);
        }

        return listaContratos;
    }

    public void setContratos(String[] contratos)
    {
        this.contratos = contratos;
    }
}
