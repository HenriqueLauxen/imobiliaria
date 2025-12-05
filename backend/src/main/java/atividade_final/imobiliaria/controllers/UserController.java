package atividade_final.imobiliaria.controllers;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import atividade_final.imobiliaria.dtos.UserDTO;
import atividade_final.imobiliaria.models.UserModel;
import atividade_final.imobiliaria.services.UserService;

@RestController
@RequestMapping(value = "/usuarios")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserModel> listaNormal = service.getAll();
        List<UserDTO> listaDtos = listaNormal.stream()
                .map(usuario -> new UserDTO(usuario))
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(listaDtos);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> find(@PathVariable Integer id) {
        UserModel model = service.find(id);
        if (model != null) {
            UserDTO dto = new UserDTO(model);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody UserDTO dto) {
        UserModel model = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@RequestBody UserDTO dto, @PathVariable Integer id) {
        dto.setId(id);
        UserModel model = service.update(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/{id}")
    	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
