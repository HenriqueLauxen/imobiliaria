package atividade_final.imobiliaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import atividade_final.imobiliaria.dtos.UserDTO;
import atividade_final.imobiliaria.models.UserModel;

@SpringBootApplication
public class ImobiliariaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImobiliariaApplication.class, args);
	}
}
