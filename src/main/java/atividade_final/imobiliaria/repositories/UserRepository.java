package atividade_final.imobiliaria.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import atividade_final.imobiliaria.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer> {

}
