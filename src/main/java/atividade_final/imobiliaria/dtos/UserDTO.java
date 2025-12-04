package atividade_final.imobiliaria.dtos;

import atividade_final.imobiliaria.models.UserModel;

public class UserDTO {
    private Integer id;
    private String nome;
    private String email;
    private String tipo;

    public UserDTO() {}

    public UserDTO(UserModel user) {
        this.id = user.getId();
        this.nome = user.getNome();
        this.email = user.getEmail();
        this.tipo = user.getTipo();
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
