package atividade_final.imobiliaria.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import atividade_final.imobiliaria.dtos.UserDTO;
import atividade_final.imobiliaria.models.UserModel;
import atividade_final.imobiliaria.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserModel> getAll() {
        List<UserModel> list = repository.findAll();
        return list;
    }

    public UserModel find(Integer id) {
        Optional<UserModel> model = repository.findById(id);
        return model.orElse(null);
    }

    public UserModel insert(UserDTO dto) {
        UserModel model = new UserModel();
        model.setNome(dto.getNome());
        model.setEmail(dto.getEmail());
        model.setTipo(dto.getTipo());
        return repository.save(model);
    }

    public UserModel update(UserDTO dto) {
        UserModel model = find(dto.getId());
        try {
            if (model != null) {
                model.setNome(dto.getNome());
                model.setEmail(dto.getEmail());
                model.setTipo(dto.getTipo());
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
