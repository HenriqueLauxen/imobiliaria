package atividade_final.imobiliaria.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import atividade_final.imobiliaria.models.FotoImovelModel;
import atividade_final.imobiliaria.models.ImovelModel;
import atividade_final.imobiliaria.repositories.FotoImovelRepository;
import atividade_final.imobiliaria.repositories.ImovelRepository;

@Service
public class FotoImovelService {

    @Autowired
    private FotoImovelRepository repository;

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private SupabaseStorageService storageService;

    public List<FotoImovelModel> getAll() {
        List<FotoImovelModel> list = repository.findAll();
        return list;
    }

    public FotoImovelModel find(Integer id) {
        Optional<FotoImovelModel> model = repository.findById(id);
        return model.orElse(null);
    }

    public List<FotoImovelModel> findByImovelId(Integer imovelId) {
        return repository.findByImovelId(imovelId);
    }

    public FotoImovelModel insert(FotoImovelModel model) {
        return repository.save(model);
    }

    public FotoImovelModel uploadFoto(MultipartFile file, Integer imovelId, Boolean capa, Integer ordem) throws IOException {
        Optional<ImovelModel> imovelOpt = imovelRepository.findById(imovelId);
        if (imovelOpt.isEmpty()) {
            throw new RuntimeException("Imóvel não encontrado");
        }

        String folder = "imovel_" + imovelId;
        String url = storageService.uploadFile(file, folder);

        FotoImovelModel foto = new FotoImovelModel();
        foto.setNomeArquivo(file.getOriginalFilename());
        foto.setCaminho(url);
        foto.setCapa(capa != null ? capa : false);
        foto.setOrdem(ordem != null ? ordem : 0);
        foto.setImovel(imovelOpt.get());

        return repository.save(foto);
    }

    public FotoImovelModel update(FotoImovelModel model) {
        try {
            if (find(model.getId()) != null) {
                return repository.save(model);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public void delete(Integer id) {
        FotoImovelModel foto = find(id);
        if (foto != null) {
            storageService.deleteFile(foto.getCaminho());
            repository.deleteById(id);
        }
    }

}

