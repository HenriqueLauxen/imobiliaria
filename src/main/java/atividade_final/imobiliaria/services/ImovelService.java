package atividade_final.imobiliaria.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import atividade_final.imobiliaria.models.ImovelModel;
import atividade_final.imobiliaria.repositories.ImovelRepository;

@Service
public class ImovelService {

    @Autowired
    private ImovelRepository repository;

    public List<ImovelModel> getAll() {
        List<ImovelModel> list = repository.findAll();
        return list;
    }

    public ImovelModel find(Integer id) {
        Optional<ImovelModel> model = repository.findById(id);
        return model.orElse(null);
    }

    public ImovelModel insert(ImovelModel model) {
        return repository.save(model);
    }

    public ImovelModel update(ImovelModel model) {
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
