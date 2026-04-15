package com.uts.mahavkansha.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uts.mahavkansha.enums.KeywordTag;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

import com.uts.mahavkansha.enums.CategoryTag;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "articles")
@Data
public class ArticleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🧾 Basic Info
    private String headline;
    private String subHeadline;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    // 🎥 Media

    private String imageCaption;
    private String videoUrl;

    // 🏷️ Category
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryTag category;

    // 🔖 Tags
    @ElementCollection
    @CollectionTable(name = "article_tags", joinColumns = @JoinColumn(name = "article_id"))
    @Column(name="tag")
    private List<String> tags;

    // ⭐ Highlight
    private boolean isHighlighted;

    // 📅 Publish


    // 📍 Location
    private String city;
    private String stateCountry;

    // 🔍 SEO
    private String metaTitle;
    private String metaDescription;

    @ElementCollection(targetClass = KeywordTag.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "keyword_tag",joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "keywordTag")
    private Set<KeywordTag> keyword;
    private String slug;

    // 💬 Engagement
    private boolean enableComments;
    private boolean allowSocialSharing;
    private boolean showReadTime;

    // ⚙️ Advanced
    private Integer priorityLevel;



    @Transient
    @JsonIgnore
    private MultipartFile imageFile; // used for receiving uploaded file only

    private String imageFilePath; // saved filename or relative path


}


