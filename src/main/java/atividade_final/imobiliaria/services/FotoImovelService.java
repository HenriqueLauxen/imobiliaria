package atividade_final.imobiliaria.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import atividade_final.imobiliaria.models.FotoImovelModel;
import atividade_final.imobiliaria.repositories.FotoImovelRepository;

@Service
public class FotoImovelService {

    @Autowired
    private FotoImovelRepository repository;

    public List<FotoImovelModel> getAll() {
        List<FotoImovelModel> list = repository.findAll();
        return list;
    }

    public FotoImovelModel find(Integer id) {
        Optional<FotoImovelModel> model = repository.findById(id);
        return model.orElse(null);
    }

    public FotoImovelModel insert(FotoImovelModel model) {
        return repository.save(model);
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
        repository.deleteById(id);
    }

}

