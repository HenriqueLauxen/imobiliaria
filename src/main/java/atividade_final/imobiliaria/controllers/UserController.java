import java.net.URI;
import java.util.stream.Collectors;

import atividade_final.imobiliaria.dtos.UserDTO;
import atividade_final.imobiliaria.models.UserModel;

@GetMapping()
public ResponseEntity<List<UserDTO>> getAllUsers() {
    List<UserModel> listaNormal = service.getAll();
    List<UserDTO> listaDtos = listaNormal.stream()
            .map(usuario -> new UserDTO(usuario))
            .collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(listaDtos);
}

@GetMapping("/{id}")
public ResponseEntity<UserDTO> find(@PathVariable Integer id) {
    UserModel model = service.find(id);
    UserDTO dto = new UserDTO(model);
    return ResponseEntity.status(HttpStatus.OK).body(dto);
}

@PostMapping
public ResponseEntity<Void> insert(@RequestBody UserDTO dto) {
    UserModel model = service.insert(dto);

    URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest().path("/{id}")
            .buildAndExpand(model.getId()).toUri();

    return ResponseEntity.created(uri).build();
}

@PutMapping("/{id}")
public ResponseEntity<Void> update(
        @RequestBody UserDTO dto,
        @PathVariable Integer id) {

    dto.setId(id);
    service.update(dto);

    return ResponseEntity.noContent().build();
}

