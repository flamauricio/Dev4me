package Dev4me.javaloginjpa.controller;

import Dev4me.javaloginjpa.entity.*;
import Dev4me.javaloginjpa.repository.EmpresaRepository;
import Dev4me.javaloginjpa.repository.TagRepository;
import Dev4me.javaloginjpa.repository.TagVagaRepository;
import Dev4me.javaloginjpa.repository.VagaRepository;

import Dev4me.javaloginjpa.response.VagaFiltroResponse;
import Dev4me.javaloginjpa.response.VagaTagsCompletasResponse;
import Dev4me.javaloginjpa.response.VagaTagsResponse;
import Dev4me.javaloginjpa.service.FileUploadService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/vagas")
public class VagaController {

    @Autowired
    private VagaRepository repository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagVagaRepository tagVagaRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    FileUploadService fileUploadService;

    private List<Vaga> vagasFiltradas = new ArrayList<Vaga>();

    //Método pra cadastro do Usuário;
    @ApiResponses({@ApiResponse(responseCode = "200", content = @Content(mediaType = "application/json"))})
    @PostMapping
    @CrossOrigin
    public ResponseEntity postVaga(@RequestBody @Valid Vaga novaVaga) {
        repository.save(novaVaga);
        Vaga vaga = repository.findByFkEmpresaIdEmpresaAndTitulo(
                novaVaga.getFkEmpresa().getIdEmpresa(),
                novaVaga.getTitulo());
        return status(201).body(vaga);
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagas() {

        return status(200).body(repository.findAllByOrderByIdVagaDesc());
    }

    @GetMapping("/tipo-de-contrato/{contrato}")
    @CrossOrigin
    public ResponseEntity<List<Vaga>> getVagaContrato(@PathVariable String contrato) {
        return status(200).body(repository.findByContrato(contrato));
    }

    @PostMapping("/filtros")
    @CrossOrigin
    public ResponseEntity getVagasFiltradas(@RequestBody VagaFiltroResponse filtroObj) {
        vagasFiltradas.clear();

        List<String> tags = filtroObj.getTags();
        List<String> contratos = filtroObj.getContratos();
        List<String> filtros = filtroObj.getFiltros();
        String localizacao = filtroObj.getLocalizacao();
        VagaTagsResponse vtr = null;

        List<List<Tag>> listaTags = new ArrayList<List<Tag>>();
        List<Integer> idVagas = new ArrayList<Integer>();

        if (filtros.size() == 0) {
            vagasFiltradas = repository.findAllByOrderByIdVagaDesc();

            for (Vaga vaga : vagasFiltradas) {
                idVagas.add(vaga.getIdVaga());
            }

            for (Integer idVaga : idVagas) {
                List<TagVaga> listaTagVaga = tagVagaRepository.findByFkVagaIdVaga(idVaga);
                List<Tag> listaTagsPorIdVaga = new ArrayList<Tag>();
                for (TagVaga tagVaga : listaTagVaga) {
                    listaTagsPorIdVaga.add(tagVaga.getFkTag());
                }

                listaTags.add(listaTagsPorIdVaga);
            }

            vtr = new VagaTagsResponse(vagasFiltradas, listaTags);

            return status(200).body(vtr);
        }

        for (String filtro : filtros) {
            if (filtro.equals("localizacao")) {
                List<Vaga> listaVagas = repository.findByLocalizacao(localizacao);

                for (Vaga vaga : listaVagas) {
                    if (!vagasFiltradas.contains(vaga)) {
                        vagasFiltradas.add(vaga);
                    }
                }
            } else if (filtro.equals("contratos")) {
                for (String contrato : contratos) {
                    List<Vaga> listaProvisoria = repository.findByContrato(contrato);
                    if (!listaProvisoria.isEmpty()) {
                        for (Vaga vaga : listaProvisoria) {
                            if (!vagasFiltradas.contains(vaga)) {
                                vagasFiltradas.add(vaga);
                            }
                        }
                    }

                }
            } else if (filtro.equals("tags")) {
                for (String tag : tags) {
                    List<TagVaga> listaProvisoria = tagVagaRepository.findByFkTagNome(tag);
                    if (!listaProvisoria.isEmpty()) {
                        for (TagVaga tagVaga : listaProvisoria) {
                            if (!vagasFiltradas.contains(tagVaga.getFkVaga())) {
                                vagasFiltradas.add(tagVaga.getFkVaga());
                            }
                        }
                    }

                }
            }
        }

        if (vagasFiltradas.isEmpty()) {
            return status(204).build();
        }

        for (Vaga vaga : vagasFiltradas) {
            idVagas.add(vaga.getIdVaga());
        }

        for (Integer idVaga : idVagas) {
            List<TagVaga> listaTagVaga = tagVagaRepository.findByFkVagaIdVaga(idVaga);
            List<Tag> listaTagsPorIdVaga = new ArrayList<Tag>();
            for (TagVaga tagVaga : listaTagVaga) {
                listaTagsPorIdVaga.add(tagVaga.getFkTag());
            }

            listaTags.add(listaTagsPorIdVaga);
        }

        vtr = new VagaTagsResponse(vagasFiltradas, listaTags);

        return status(200).body(vtr);
    }


//,

//    @GetMapping("/tags")
//    @CrossOrigin
//    public ResponseEntity<List<Tag>> getVagaTag(){
//        return status(200).body(tagRepository.findAll());
//    }

//    @GetMapping("/tags/selecao")
//    @CrossOrigin
//    public ResponseEntity<List<TagVaga>> getTagVaga(){
//        return status(200).body(tagVagaRepository.findAll());
//    }

    @GetMapping("/tags")
    @CrossOrigin
    public ResponseEntity<List<Tag>> getVagaTag() {
        return status(200).body(tagRepository.findAll());
    }

    @GetMapping("/tags/selecao")
    @CrossOrigin
    public ResponseEntity<List<TagVaga>> getTagVaga() {
        return status(200).body(tagVagaRepository.findAll());
    }

    public static void gravaRegistro(String registro, String nomeArq) {
        BufferedWriter saida = null;

        try {
            saida = new BufferedWriter(new FileWriter(nomeArq, true));
        } catch (IOException erro) {
            System.out.println("Erro na abertura do arquivo:" + erro);
        }

        try {
            saida.append(registro + "\n");
            saida.close();
        } catch (IOException erro) {
            System.out.println("Erro na gravação do arquivo:" + erro);
        }
    }

    public void gravaArquivoTxt(String nomeArq) {
        List<Vaga> lista = repository.findAll();
        int contaRegistroCorpo = 0;
        String header = "00VAGA";
        header += LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyyHH:mm:ss"));
        header += "01";
        gravaRegistro(header, nomeArq);
        String corpo;
        for (Vaga u : lista) {
            corpo = "02";
            corpo += String.format("%06d", u.getIdVaga());
            corpo += String.format("%-30.30s", u.getTitulo());
            corpo += String.format("%-14.14s", u.getContrato());
            corpo += String.format("%-14.14s", u.getLocalizacao());
            corpo += String.format("%8.2f", u.getFaixaSalarialMin());
            corpo += String.format("%8.2f", u.getFaixaSalarialMax());
//            corpo += String.format("%-45.45s", u.getDescricao());
//            corpo += String.format("%-16.16s", u.getAtividades());
//            corpo += String.format("%-19.19s", u.getRequisitos());
            corpo += String.format("%5.5b", u.getDisponivel());
            corpo += String.format("%40.40s", u.getFkEmpresa().getNome());
            corpo += String.format("%30.30s", u.getFkEmpresa().getEmail());
            gravaRegistro(corpo, nomeArq);
            contaRegistroCorpo++;
        }
        String trailer = "01";
        trailer += String.format("%013d", contaRegistroCorpo);
        gravaRegistro(trailer, nomeArq);
    }

    public void leArquivoTxt(String nomeArq) {
        BufferedReader entrada = null;
        String registro, tipoRegistro;
        Double faixaSalarialMin, faixaSalarialMax;
        Boolean disponivel;
        String  localizacao, titulo, contrato, fkEmpresa = null, nome, email;

//        LocalDate dataNasc = LocalDate.now();
//        java.sql.Date date = Date.valueOf(dataNasc);
//        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
//        String dataFormatada = format.format(date);


        Integer idVaga;
        int contaRegDadoLido = 0;
        int qtdRegDadoGravado;

        List<Vaga> listaLida = new ArrayList<>();


        try {
            entrada = new BufferedReader(new FileReader(nomeArq));
        } catch (IOException erro) {
            System.out.println("Erro na abertura do arquivo:" + erro);
        }
        try {
            registro = entrada.readLine();

            while (registro != null) {
                tipoRegistro = registro.substring(0, 2);
                if (tipoRegistro.equals("00")) {
                    System.out.println("É um registro de header");
                    System.out.println("Tipo do arquivo:" +
                            registro.substring(2, 11));
                    System.out.println("Data e hora de gravação:" +
                            registro.substring(11, 22));
                    System.out.println("Versão do documento de layout:" +
                            registro.substring(22, 26));
                } else if (tipoRegistro.equals("01")) {
                    System.out.println("É um registro de trailer");
                    qtdRegDadoGravado = Integer.parseInt(registro.substring(2, 15));
                    if (contaRegDadoLido == qtdRegDadoGravado) {
                        System.out.println("Quantidade de registros lidos compatível" +
                                "com a quantidade de registros gravados");
                    } else {
                        System.out.println("Quantidade de registros lidos incompatível" +
                                "com a quantidade de registros gravados");
                    }

                } else if (tipoRegistro.equals("02")) {
                    System.out.println("É um registro de corpo");

                    idVaga = Integer.valueOf(registro.substring(2, 8).trim());
                    titulo = registro.substring(8, 36).trim();
                    contrato = registro.substring(36, 48).trim();
                    localizacao = registro.substring(48, 67).trim();
                    faixaSalarialMin = Double.valueOf(registro.substring(67, 75).replace(',', '.'));
                    faixaSalarialMax = Double.valueOf(registro.substring(75, 83).replace(',', '.'));
                    disponivel = Boolean.valueOf(registro.substring(83, 94).trim());
                    nome = registro.substring(94, 131).trim();
//                    email= registro.substring(112, 114).trim();
                    contaRegDadoLido++;

                    Empresa e = empresaRepository.findByNome(nome);

                    Vaga vagaMomento = new Vaga(idVaga, titulo, contrato, localizacao, faixaSalarialMin, faixaSalarialMax, disponivel, e);

                    repository.save(vagaMomento);

                } else {
                    System.out.println("Tipo de registro inválido");
                }
                registro = entrada.readLine();
            }
            entrada.close();
        } catch (IOException erro) {
            System.out.println("Erro ao ler arquivo:" + erro);
        }

        System.out.println("\nLista lida do arquivo:");
        for (Vaga u : listaLida) {
            repository.saveAll(listaLida);
        }

    }

    @GetMapping("/gravacao/relatorio-txt")
    @CrossOrigin
    public void getRelatorioTxt() {

        gravaArquivoTxt("Vaga.txt");

    }

    @GetMapping("/leitura/relatorio-txt")
    @CrossOrigin
    public void readRelatorioTxt() {

        leArquivoTxt("Vaga.txt");
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity getVagaById(@PathVariable Integer id)
    {
        Optional<Vaga> vaga = repository.findById(id);

        if (vaga.isEmpty()) {
            return status(404).build();
        }

        List<TagVaga> listTagVaga = tagVagaRepository.findByFkVagaIdVaga(id);

        if (listTagVaga.isEmpty()) {
            return status(404).build();
        }

        List<Tag> tags = new ArrayList<Tag>();

        for (TagVaga tag : listTagVaga) {
            tags.add(tag.getFkTag());
        }

        VagaTagsCompletasResponse vagaTags = new VagaTagsCompletasResponse(tags, vaga);

        return status(200).body(vagaTags);
    }

    @PostMapping("/upload")
    @CrossOrigin
    public void upload(@RequestBody MultipartFile file) throws IOException {
        fileUploadService.uploadFile(file);
        leArquivoTxt("Vaga.txt");
    }
}
