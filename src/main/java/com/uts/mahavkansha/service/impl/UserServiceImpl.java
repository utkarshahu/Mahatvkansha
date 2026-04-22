package com.uts.mahavkansha.service.impl;

import com.uts.mahavkansha.entity.UserEntity;
import com.uts.mahavkansha.repository.UserRepository;
import com.uts.mahavkansha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

//    create
@Override
public UserEntity create(UserEntity user, MultipartFile imageFile)  {
    try {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setImageType(imageFile.getContentType());
        user.setImageData(imageFile.getBytes());

        return userRepo.save(user);

    } catch (Exception e) {
        throw new RuntimeException("Error while saving user: " + e.getMessage());
    }
    }

//    read all
@Override
public List<UserEntity> getAll(){
        return userRepo.findAll();
    }
//    read by id
@Override
public UserEntity getById(Long id){
        return userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found with id "+ id));
    }

//   update
@Override
public UserEntity update(Long id, UserEntity newUser){
        UserEntity existingUser = getById(id);
    if(!existingUser.getEmail().equals(newUser.getEmail()) &&
            userRepo.existsByEmail(newUser.getEmail())){
        throw new RuntimeException("Email already in use");
    }
    if(newUser.getPassword()==null || newUser.getPassword().isEmpty()){
        throw new RuntimeException("Password is required");
    }
    if(newUser.getUsername()==null || newUser.getUsername().isEmpty()){
        throw new RuntimeException("Username is required");
    }
    if(newUser.getRole()==null || newUser.getRole().isEmpty()){
        throw new RuntimeException("Role is required");
    }
    if(newUser.getBio()==null || newUser.getBio().isEmpty()){
        throw new RuntimeException("Bio is required");
    }

        existingUser.setUsername(newUser.getUsername());
        existingUser.setBio(newUser.getBio());
        existingUser.setRole(newUser.getRole());
        existingUser.setPassword(newUser.getPassword());
        existingUser.setEmail(newUser.getEmail());

        return userRepo.save(existingUser);

    }



    //    Delete by id
    @Override
    public String deleteUserById(Long targetUserId, Long currentUserId,String role){
    UserEntity user = getById(targetUserId);
//    Admin
        if (role.equalsIgnoreCase("ADMIN")) {
            userRepo.deleteById(targetUserId);
            return "Admin deleted user with id :  " + targetUserId;
        }
//        User
        if (role.equalsIgnoreCase("USER") && targetUserId.equals(currentUserId)) {
            userRepo.deleteById(targetUserId);
            return "User deleted own account";
        }
        throw new RuntimeException("Access Denied: You cannot delete this user");
    }


    //Delete all
    @Override
    public String deleteAll(){
        userRepo.deleteAll();
        return "All Users Delete";
    }


//    all bulk
    @Override
    public List<UserEntity> saveMultipleUsers(List<UserEntity> users) {
        return userRepo.saveAll(users);
    }
}
