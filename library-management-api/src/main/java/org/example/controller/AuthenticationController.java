package org.example.controller;

import org.example.dto.request.UserRequest;
import org.example.dto.response.GenericResponse;
import org.example.dto.response.UserResponse;
import org.example.model.User;
import org.example.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/register")
    public GenericResponse registerUser(@RequestBody UserRequest userRequest){
        return authenticationService.registerUser(userRequest);
    }

    @PostMapping("/verify-otp/{username}")
    public GenericResponse verifyOTP(@PathVariable String username, @RequestParam String otp) {
        return authenticationService.verifyOTP(username, otp);
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(@RequestBody UserRequest userRequest){
        try {
            UserResponse userResponse = authenticationService.loginUser(userRequest);
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }
    @GetMapping("/getuser/{username}")
    public User getUserByUsername(@PathVariable String username){
        return authenticationService.getUserByUsername(username);
    }
}
