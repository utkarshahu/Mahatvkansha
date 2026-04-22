package com.uts.mahavkansha.service.impl;

import com.uts.mahavkansha.dto.LoginRequest;
import com.uts.mahavkansha.dto.LoginResponse;
import com.uts.mahavkansha.entity.UserEntity;
import com.uts.mahavkansha.repository.UserRepository;
import com.uts.mahavkansha.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepo;

    //  token store (yahi missing tha)
    private Map<String, Long> tokenStore = new HashMap<>();

    @Override
    public LoginResponse login(LoginRequest request){

        UserEntity user = userRepo.findByEmail(request.getEmail());

        if(user == null){
            throw new RuntimeException("User not found");
        }

        if(!request.getPassword().equals(user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        // token generate
        String token = UUID.randomUUID().toString();

        // store token
        tokenStore.put(token, user.getId());

        return new LoginResponse("Login successful", user.getRole(), token);
    }

    // logout
    @Override
    public String logout(String token){
        if(tokenStore.containsKey(token)){
            tokenStore.remove(token);
            return "Logged out successfully";
        }
        throw new RuntimeException("Invalid token");
    }
}