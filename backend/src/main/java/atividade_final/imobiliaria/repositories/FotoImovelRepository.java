package atividade_final.imobiliaria.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import atividade_final.imobiliaria.models.FotoImovelModel;

public interface FotoImovelRepository extends JpaRepository<FotoImovelModel, Integer> {

    List<FotoImovelModel> findByImovelId(Integer imovelId);

}

