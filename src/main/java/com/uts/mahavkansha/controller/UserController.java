package com.uts.mahavkansha.controller;


import com.uts.mahavkansha.entity.UserEntity;
import com.uts.mahavkansha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

//    create
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestPart UserEntity user, @RequestPart MultipartFile  imageFile){
//        System.out.println("create call ");
        try{
            UserEntity user1 = userService.create(user, imageFile);
//            System.out.println(user1);
            return new ResponseEntity<>(user1,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    read by id
    @GetMapping("/{id}")
    public  ResponseEntity<UserEntity>  getById(@PathVariable Long id){
        UserEntity user  = userService.getById(id);

        if(user != null){
            return new ResponseEntity<>(user,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    get all
    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> getAll(){
        return new ResponseEntity<>( userService.getAll(),HttpStatus.OK);
    }

//    update
    @PutMapping("/update/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable Long id,@RequestBody  UserEntity user){
        return new ResponseEntity<>(userService.update(id,user),HttpStatus.OK);
    }

//    @delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> userDeleteById(@PathVariable Long id,@RequestParam Long currentUserId,@RequestParam String role){
        return new ResponseEntity<>(userService.deleteUserById(id,currentUserId,role),HttpStatus.OK);
    }

//    deleteall
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAll(){
        return new ResponseEntity<>( userService.deleteAll(),HttpStatus.OK);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<UserEntity>> createMultipleUsers(@RequestBody List<UserEntity> users) {
        return new ResponseEntity<>(userService.saveMultipleUsers(users), HttpStatus.OK);
    }
}
