package com.prestamos.SoftwarePrestamos.Auth.service;

import com.prestamos.SoftwarePrestamos.Auth.dto.ReqRes;
import com.prestamos.SoftwarePrestamos.Auth.entity.Administradores;
import com.prestamos.SoftwarePrestamos.Auth.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServices {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public ReqRes register(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();

        try {
            Administradores admin = new Administradores();
            admin.setEmail(registrationRequest.getEmail());
            admin.setCity(registrationRequest.getCity());
            admin.setRole(registrationRequest.getRole());
            admin.setTypePlan(registrationRequest.getTypePlan());
            admin.setName(registrationRequest.getName());
            admin.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            Administradores adminResult = adminRepository.save(admin);
            if (adminResult.getId()>0) {
                resp.setAdministradores((adminResult));
                resp.setMessage("Administrador registrado exitosamente");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = adminRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setTypePlan(user.getTypePlan());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Sesion Iniciada Exitosamente");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Usuario y/o Contraseña Incorrect@");
        }
        return response;
    }





    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            Administradores admin = adminRepository.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), admin)) {
                var jwt = jwtUtils.generateToken(admin);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Token renovado exitosamente");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }


    public ReqRes getAllAdmin() {
        ReqRes reqRes = new ReqRes();

        try {
            List<Administradores> result = adminRepository.findAll();
            if (!result.isEmpty()) {
                reqRes.setAdministradoresList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Exitosa");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No se encuentran administradores");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error ocurrido: " + e.getMessage());
            return reqRes;
        }
    }


    public ReqRes getsAdminById(Integer id) {
        ReqRes reqRes = new ReqRes();
        try {
            Administradores adminById = adminRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
            reqRes.setAdministradores(adminById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Administrador con id: '" + id + "' encontrado exitosamente");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurrido: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateAdmin(Integer userId, Administradores updatedAdmin) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Administradores> adminOptional = adminRepository.findById(userId);
            if (adminOptional.isPresent()) {
                Administradores existingAdmin = adminOptional.get();
                existingAdmin.setEmail(updatedAdmin.getEmail());
                existingAdmin.setName(updatedAdmin.getName());
                existingAdmin.setCity(updatedAdmin.getCity());
                existingAdmin.setRole(updatedAdmin.getRole());
                existingAdmin.setTypePlan(updatedAdmin.getTypePlan());

                // Check if password is present in the request
                if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingAdmin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
                }

                Administradores savedAdmin = adminRepository.save(existingAdmin);
                reqRes.setAdministradores(savedAdmin);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Administrador actualizado exitosamente");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Administrador no encontrado para actualizar");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurrido: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes deleteAdmin(Integer userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Administradores> adminOptional = adminRepository.findById(userId);
            if (adminOptional.isPresent()) {
                adminRepository.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Administrador borrado exitosamente");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Administrador no encontrado, para borrar");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurrido: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Administradores> adminOptional = adminRepository.findByEmail(email);
            if (adminOptional.isPresent()) {
                reqRes.setAdministradores(adminOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("Exitoso");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Administrador no encontrado");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurrido: " + e.getMessage());
        }
        return reqRes;

    }
}