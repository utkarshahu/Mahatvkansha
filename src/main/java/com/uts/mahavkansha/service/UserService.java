package com.uts.mahavkansha.service;

import com.uts.mahavkansha.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserEntity create(UserEntity user, MultipartFile imageFile);

    //    read all
    List<UserEntity> getAll();

    //    read by id
    UserEntity getById(Long id);

    //   update
    UserEntity update(Long id, UserEntity newUser);

    String deleteUserById(Long targetUserId, Long currentUserId, String role);

    //Delete all
    String deleteAll();

    List<UserEntity> saveMultipleUsers(List<UserEntity> users);
}
