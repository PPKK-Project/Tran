package com.travel.travelproject.service;

import com.travel.travelproject.dto.SafetyApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SafetyDataService {

    private final WebClient webClient;

    @Value("${api.mofa.serviceKey}")
    private String serviceKey;

    // 외교부_국가·지역별 여행경보 목록 조회(0404 대륙정보) API
    private final String API_BASE_URL = "http://apis.data.go.kr/1262000/TravelAlarmService0404";
    private final String API_PATH = "/getTravelAlarm0404List";

    // WebClient.Builder를 주입받아 WebClient 생성
    public SafetyDataService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(API_BASE_URL).build();
    }

    /**
     * 외교부 여행경보 API를 호출하여 DTO로 변환
     */
    public Mono<SafetyApiResponse> getCountrySafetyData() {
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(API_PATH)
                        .queryParam("serviceKey", serviceKey)
                        .queryParam("returnType", "JSON") // JSON 형식 요청
                        .queryParam("numOfRows", "200")   // 모든 국가를 받기 위해 충분한 수
                        .queryParam("pageNo", "1")
                        .build())
                .retrieve() // 응답 수신
                .bodyToMono(SafetyApiResponse.class); // 응답 바디를 DTO로 변환
    }
}