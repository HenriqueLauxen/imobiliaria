package com.example projeto.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @RequestMapping(method = requestMethod.GET)
    public String getAllUsers() {
        return "Lista de Usuários";
    }
}