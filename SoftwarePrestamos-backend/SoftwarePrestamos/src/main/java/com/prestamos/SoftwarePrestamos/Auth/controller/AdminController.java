package com.prestamos.SoftwarePrestamos.Auth.controller;

import com.prestamos.SoftwarePrestamos.Auth.dto.ReqRes;
import com.prestamos.SoftwarePrestamos.Auth.entity.Administradores;
import com.prestamos.SoftwarePrestamos.Auth.service.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    @Autowired
    private AdminServices adminServices;

    @PostMapping("/super-admin/register")
    public ResponseEntity<ReqRes> register (@RequestBody ReqRes data) {
        return ResponseEntity.ok(adminServices.register(data));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login (@RequestBody ReqRes data) {
        return ResponseEntity.ok(adminServices.login(data));
    }

    @PostMapping("/adminsuper-admin/refresh")
    public ResponseEntity<ReqRes> refreshToken (@RequestBody ReqRes data) {
        return ResponseEntity.ok(adminServices.refreshToken(data));
    }

    @PostMapping("public/check-token")
    public ResponseEntity<ReqRes> checkToken(@RequestBody ReqRes data) {
        String token = data.getToken();
        return ResponseEntity.ok(adminServices.checkToken(token));
    }

    @GetMapping("/super-admin/get-all-admins")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(adminServices.getAllAdmin());
    }

    @GetMapping("/super-admin/get-admin/{userId}")
    public ResponseEntity<ReqRes> getUsersById(@PathVariable Integer userId){
        return ResponseEntity.ok(adminServices.getsAdminById(userId));
    }

    @GetMapping("/adminsuper-admin/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(adminServices.getMyInfo(email));
    }

    @PutMapping("/super-admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody Administradores data){
        return ResponseEntity.ok(adminServices.updateAdmin(userId,data));
    }


    @DeleteMapping("/super-admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Integer userId){
        return ResponseEntity.ok(adminServices.deleteAdmin(userId));
    }
}
