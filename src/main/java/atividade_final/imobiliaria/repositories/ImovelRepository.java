package atividade_final.imobiliaria.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import atividade_final.imobiliaria.models.ImovelModel;

public interface ImovelRepository extends JpaRepository<ImovelModel, Integer> {

}
