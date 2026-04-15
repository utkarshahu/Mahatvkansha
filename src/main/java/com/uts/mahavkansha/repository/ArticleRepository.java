package com.uts.mahavkansha.repository;

import com.uts.mahavkansha.entity.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ArticleRepository extends JpaRepository<ArticleEntity,Long> {
    
}
