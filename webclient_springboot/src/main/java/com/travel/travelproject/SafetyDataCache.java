package com.travel.travelproject;

import com.travel.travelproject.dto.SafetyApiResponse;
import com.travel.travelproject.service.SafetyDataService;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
public class SafetyDataCache {

    private final SafetyDataService safetyDataService;

    // 국가 리스트를 메모리에 캐시
    private List<SafetyApiResponse.CountrySafetyInfo> cachedSafetyList;

    public SafetyDataCache(SafetyDataService safetyDataService) {
        this.safetyDataService = safetyDataService;
    }

    /**
     * 서버 시작 시 즉시 데이터를 로드
     */
    @PostConstruct
    public void initCache() {
        updateSafetyDataCache();
    }

    /**
     * 매일 새벽 5시에 데이터를 갱신
     */
    @Scheduled(cron = "0 0 5 * * *")
    public void updateSafetyDataCache() {
        try {
            SafetyApiResponse response = safetyDataService.getCountrySafetyData().block(); // API 호출

            // DTO 구조에 맞게 실제 국가 리스트('item')에 접근
            if (response != null &&
                    response.getBody() != null &&
                    response.getBody().getItems() != null &&
                    response.getBody().getItems().getItem() != null) {

                this.cachedSafetyList = response.getBody().getItems().getItem();

                System.out.println("여행 경보 데이터 캐시 갱신 완료: 총 " + cachedSafetyList.size() + "개 국가");
            }
        } catch (Exception e) {
            System.err.println("여행 경보 데이터 캐시 갱신 실패: " + e.getMessage());
        }
    }

}