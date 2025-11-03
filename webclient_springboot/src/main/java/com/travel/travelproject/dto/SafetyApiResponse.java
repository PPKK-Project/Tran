package com.travel.travelproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;


// 최상위 응답
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SafetyApiResponse {

    @JsonProperty("body")
    private Body body;


    // --- Body 중첩 클래스 ---
    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {

        @JsonProperty("items")
        private Items items;

    }

    // items 객체는 item 리스트를 가집니다.
    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Items {

        @JsonProperty("item")
        private List<CountrySafetyInfo> item; // 'item'이 실제 국가 리스트

    }

    // --- CountrySafetyInfo 중첩 클래스 (국가 개별 정보) ---
    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CountrySafetyInfo {

        @JsonProperty("country_name")
        private String countryName;

        @JsonProperty("continent")
        private String continent;

        @JsonProperty("attention")
        private String attention; // 여행유의

        @JsonProperty("control")
        private String control; // 여행자제

        @JsonProperty("limita")
        private String limita; // 출국권고

        @JsonProperty("ban_yna") // 여행금지 (Y/N)
        private String banYna;

        // [중요!] 리액트에서 사용할 alarmLevel을 동적으로 생성
        // Jackson이 이 메서드를 'alarmLevel'이라는 JSON 필드로 자동 직렬화해줍니다.
        public int getAlarmLevel() {
            // API 명세에 ban_yna가 'Y'로 오는지 '여행금지' 텍스트로 오는지 확인 필요
            // 여기서는 값이 존재하고 비어있지 않으면 해당 레벨로 판단
            if (banYna != null && !banYna.isEmpty()) return 4;
            if (limita != null && !limita.isEmpty()) return 3;
            if (control != null && !control.isEmpty()) return 2;
            if (attention != null && !attention.isEmpty()) return 1;
            return 0; // 경보 없음
        }
    }
}