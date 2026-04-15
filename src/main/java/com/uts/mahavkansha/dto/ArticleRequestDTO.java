package com.uts.mahavkansha.dto;


import java.time.LocalDateTime;
import java.util.List;

public class ArticleRequestDTO {
    private String headline;
    private String subHeadline;
    private String shortDescription;
    private String content;

    private String featuredImageUrl;
    private String imageCaption;
    private String videoUrl;
    private List<String> galleryImages;

    private String category;
    private List<String> tags;

    private boolean isHighlighted;
    private LocalDateTime publishDate;

    private String city;
    private String stateCountry;

    private String metaTitle;
    private String metaDescription;
    private String keywords;
    private String slug;

    private boolean enableComments;
    private boolean allowSocialSharing;
    private boolean showReadTime;

    private Integer priorityLevel;
    private LocalDateTime expiryDate;


}
