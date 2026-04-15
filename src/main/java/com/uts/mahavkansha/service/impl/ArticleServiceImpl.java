package com.uts.mahavkansha.service.impl;

import com.uts.mahavkansha.entity.ArticleEntity;
import com.uts.mahavkansha.repository.ArticleRepository;
import com.uts.mahavkansha.service.ArticleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository repository;

    private final String UPLOAD_DIR = "uploads/";

    // ================= CREATE =================
    @Override
    public ArticleEntity create(ArticleEntity article, MultipartFile image) {

        validateArticle(article);

        // clean tags
        if (article.getTags() != null) {
            List<String> cleanTags = article.getTags().stream()
                    .map(String::trim)
                    .filter(tag -> !tag.isEmpty())
                    .distinct()
                    .collect(Collectors.toList());

            article.setTags(cleanTags);
        }

        // ⭐ FIX: pass image to upload method
        handleImageUpload(article, image);

        return repository.save(article);
    }


    // ================= READ =================
    @Override
    public ArticleEntity getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
    }

    @Override
    public List<ArticleEntity> getAll() {
        return repository.findAll();
    }

    // ================= UPDATE =================
    @Override
    public ArticleEntity update(Long id, ArticleEntity newArticle) {

        ArticleEntity existing = getById(id);

        validateArticle(newArticle);

        existing.setHeadline(newArticle.getHeadline());
        existing.setSubHeadline(newArticle.getSubHeadline());
        existing.setShortDescription(newArticle.getShortDescription());
        existing.setContent(newArticle.getContent());
        existing.setImageCaption(newArticle.getImageCaption());
        existing.setVideoUrl(newArticle.getVideoUrl());
        existing.setCategory(newArticle.getCategory());
        existing.setHighlighted(newArticle.isHighlighted());
        existing.setCity(newArticle.getCity());
        existing.setStateCountry(newArticle.getStateCountry());
        existing.setMetaTitle(newArticle.getMetaTitle());
        existing.setMetaDescription(newArticle.getMetaDescription());
        existing.setSlug(newArticle.getSlug());
        existing.setEnableComments(newArticle.isEnableComments());
        existing.setAllowSocialSharing(newArticle.isAllowSocialSharing());
        existing.setShowReadTime(newArticle.isShowReadTime());
        existing.setPriorityLevel(newArticle.getPriorityLevel());

        if (newArticle.getTags() != null) {
            List<String> cleanTags = newArticle.getTags().stream()
                    .map(String::trim)
                    .filter(tag -> !tag.isEmpty())
                    .distinct()
                    .toList();

            existing.setTags(cleanTags);
        }

        return repository.save(existing);
    }


    // ================= DELETE =================
    @Override
    public String deleteById(Long id) {
        repository.deleteById(id);
        return "Deleted Successfully";
    }

    public String deleteAll() {
        repository.deleteAll();
        return "Deleted All Successfully";
    }

    // ================= HELPER METHODS =================

    // 📸 Image Upload Logic
    private void handleImageUpload(ArticleEntity article, MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {

                File uploadFolder = new File(UPLOAD_DIR);
                if (!uploadFolder.exists()) {
                    uploadFolder.mkdirs();
                }

                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

                Path filePath = Paths.get(UPLOAD_DIR, fileName);

                Files.copy(image.getInputStream(), filePath);

                article.setImageFilePath(filePath.toString());
            }
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    //  Validation Logic
    private void validateArticle(ArticleEntity article) {

        if (article.getHeadline() == null || article.getHeadline().trim().isEmpty()) {
            throw new RuntimeException("Headline is required");
        }

        if (article.getContent() == null || article.getContent().trim().isEmpty()) {
            throw new RuntimeException("Content is required");
        }

        if (article.getCategory() == null) {
            throw new RuntimeException("Category is required");
        }

        if (article.getSlug() == null || article.getSlug().trim().isEmpty()) {
            throw new RuntimeException("Slug is required");
        }
    }
}
