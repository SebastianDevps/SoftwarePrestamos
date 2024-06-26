package com.prestamos.SoftwarePrestamos.Auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.prestamos.SoftwarePrestamos.Auth.entity.Administradores;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;

    private String error;

    private String message;

    private String token;

    private String refreshToken;

    private String expirationTime;

    private String name;

    private String city;

    private String role;

    private String email;

    private String password;

    private Administradores administradores;

    private List<Administradores> administradoresList;
}
