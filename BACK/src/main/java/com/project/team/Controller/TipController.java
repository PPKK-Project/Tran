package com.project.team.Controller;


import com.project.team.Dto.TipResponse;
import com.project.team.Repository.CountryRepository;
import com.project.team.Repository.TipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TipController {

    private final TipRepository tipRepository;
    private final CountryRepository countryRepository;
    /**
     * DB에 저장된 국가별 안전 정보를 조회한다.
     * @param countryCode React에서 요청하는 국가 코드 (예: "US", "JP")
     * @return TipResponse (JSON)
     */
    @GetMapping("/safety-info/{countryCode}")
    public ResponseEntity<TipResponse> getSafetyInfo(@PathVariable String countryCode) {

        // String으로 Country를 먼저 찾는다.
        return countryRepository.findByCountryCode(countryCode)
                // 찾은 Country 객체로 Tip을 찾는다.
                // flatMap은 Optional을 반환하는 메서드를 호출할 때 사용한다.
                .flatMap(country -> tipRepository.findByCountry(country))
                // Tip을 DTO로 변환한다.
                .map(TipResponse::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}