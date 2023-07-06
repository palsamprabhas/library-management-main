package org.example.service;


import org.example.dto.request.UserRequest;
import org.example.dto.response.GenericResponse;
import org.example.dto.response.UserResponse;
import org.example.model.User;
import org.example.repository.AuthenticationRepository;
import org.example.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

import java.util.Optional;

@Service
public class AuthenticationService {
    @Autowired AuthenticationRepository authenticationRepository;

    @Autowired
    private JavaMailSender mailSender;


    public GenericResponse registerUser(UserRequest userRequest){
        Optional<User> existingUser= authenticationRepository.findById(userRequest.getUsername());
        if(existingUser.isPresent())
        {
            return new GenericResponse(Constants.ERROR,"User already exists");
        }
        String otp = generateOTP();

        User user=User.builder()
                .username(userRequest.getUsername())
                .password(userRequest.getPassword())
                .email(userRequest.getEmail())
                .role(userRequest.getRole())
                .status(Constants.PENDING_STATUS)
                .build();
        user.setOtp(otp);
        authenticationRepository.save(user);
        sendOTP(user.getUsername(), user.getEmail(), otp);

        return new GenericResponse(Constants.SUCCESS, "Please check your email for OTP verification");
    }
    public GenericResponse verifyOTP(String username, String otp) {
        Optional<User> existingUser = authenticationRepository.findById(username);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getOtp().equals(otp)) {
                user.setOtp(null);
                user.setStatus(Constants.APPROVED_STATUS);
                authenticationRepository.save(user);
                return new GenericResponse(Constants.SUCCESS, "User verified and added successfully");
            } else {
                return new GenericResponse(Constants.ERROR, "Invalid OTP");
            }
        } else {
            return new GenericResponse(Constants.ERROR, "User not found");
        }
    }
    public UserResponse loginUser(UserRequest userRequest) throws Exception{
        Optional<User> exsitingUser=authenticationRepository.findById(userRequest.getUsername());
        if(exsitingUser.isPresent()){
            if(exsitingUser.get().getPassword().equals(userRequest.getPassword())){
                return UserResponse.builder()
                        .username(userRequest.getUsername())
                        .role(exsitingUser.get().getRole())
                        .build();
            }
            else
            {
                throw new  Exception("Invalid password");
            }
        }
        else {
            throw new Exception("user not found");
        }
    }

    public User getUserByUsername(String username){
        return authenticationRepository.findById(username).map(user ->
                        User.builder()
                                .username(user.getUsername())
                                .role(user.getRole())
                                .email(user.getEmail())
                                .build())
                .get();

    }
    private String generateOTP() {
        Random random = new Random();
        int otpLength = 6;
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }

    private void sendOTP(String username, String email, String otp) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("LIBRARY OTP Verification");
        mailMessage.setText("Hello " + username + ",\n\nYour OTP: " + otp);

        mailSender.send(mailMessage);
    }

}
