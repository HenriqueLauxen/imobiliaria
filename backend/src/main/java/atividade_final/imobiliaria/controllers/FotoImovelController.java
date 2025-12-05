package atividade_final.imobiliaria.controllers;

import java.net.URI;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import atividade_final.imobiliaria.models.FotoImovelModel;
import atividade_final.imobiliaria.services.FotoImovelService;

@RestController
@RequestMapping(value = "/fotos")
public class FotoImovelController {

    @Autowired
    private FotoImovelService service;

    @GetMapping()
    public ResponseEntity<List<FotoImovelModel>> getAll() {
        List<FotoImovelModel> list = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<FotoImovelModel> find(@PathVariable Integer id) {
        FotoImovelModel model = service.find(id);
        if (model != null) {
            return ResponseEntity.status(HttpStatus.OK).body(model);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(value = "/imovel/{imovelId}")
    public ResponseEntity<List<FotoImovelModel>> findByImovelId(@PathVariable Integer imovelId) {
        List<FotoImovelModel> list = service.findByImovelId(imovelId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PostMapping
    public ResponseEntity<FotoImovelModel> insert(@RequestBody FotoImovelModel model) {
        model = service.insert(model);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).body(model);
    }
    
    @PostMapping(value = "/upload")
    public ResponseEntity<?> uploadFoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("imovelId") Integer imovelId,
            @RequestParam(value = "capa", required = false) Boolean capa,
            @RequestParam(value = "ordem", required = false) Integer ordem) {
        try {
            FotoImovelModel foto = service.uploadFoto(file, imovelId, capa, ordem);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(foto.getId()).toUri();
            return ResponseEntity.created(uri).body(foto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao fazer upload: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<FotoImovelModel> update(@RequestBody FotoImovelModel model, @PathVariable Integer id) {
        try {
            model.setId(id);
            model = service.update(model);
            return ResponseEntity.ok(model);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}

