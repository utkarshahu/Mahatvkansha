package com.uts.mahavkansha.service;

import com.uts.mahavkansha.dto.LoginRequest;
import com.uts.mahavkansha.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    //  logout
    String logout(String token);
}
