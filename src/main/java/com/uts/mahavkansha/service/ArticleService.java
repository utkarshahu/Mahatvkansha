package com.uts.mahavkansha.service;

import com.uts.mahavkansha.entity.ArticleEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ArticleService {

    ArticleEntity create(ArticleEntity article, MultipartFile image);

    ArticleEntity getById(Long id);

    List<ArticleEntity> getAll();

    ArticleEntity update(Long id, ArticleEntity article);

    String deleteAll();

    String deleteById(Long id);
}
