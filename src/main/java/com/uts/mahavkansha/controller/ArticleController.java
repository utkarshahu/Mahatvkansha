package com.uts.mahavkansha.controller;

import com.uts.mahavkansha.entity.ArticleEntity;
import com.uts.mahavkansha.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/article")
@CrossOrigin(origins = "*")
public class ArticleController {

    @Autowired
    private ArticleService service;

    // CREATE (FIXED)
    @PostMapping("/create")
    public ArticleEntity create(
            @RequestPart("article") ArticleEntity article,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return service.create(article, image);
    }

    @GetMapping("/{id}")
    public ArticleEntity getById(@PathVariable Long id){
        return service.getById(id);
    }

    @GetMapping("/all")
    public List<ArticleEntity> getAll(){
        return service.getAll();
    }

    @PutMapping("/update/{id}")
    public ArticleEntity update(@PathVariable Long id,
                                @ModelAttribute ArticleEntity article){
        return service.update(id, article);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteById(@PathVariable Long id){
        return service.deleteById(id);
    }

    @DeleteMapping("/deleteAll")
    public String deleteAll(){
        return service.deleteAll();
    }
}
