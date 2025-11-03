package com.travel.travelproject.config;

// WebClientConfig.java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient gnewsWebClient() {
        return WebClient.builder()
                .baseUrl("https://gnews.io/api/v4")
                .build();
    }

    @Bean
    public WebClient geminiWebClient() {
        // 'v1beta'는 사용하는 API 버전에 따라 다를 수 있습니다.
        return WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/models")
                .build();
    }
}