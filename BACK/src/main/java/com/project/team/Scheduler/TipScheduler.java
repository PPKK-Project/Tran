package com.project.team.Scheduler;

import com.project.team.Config.DataInitializer;
import com.project.team.Dto.TipResponse;
import com.project.team.Entity.Country;
import com.project.team.Entity.Tip;
import com.project.team.Repository.CountryRepository;
import com.project.team.Repository.TipRepository;
import com.project.team.Service.TipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;



@Component
@Slf4j
@RequiredArgsConstructor
public class TipScheduler {

    private final TipService tipService;
    private final TipRepository tipRepository;
    private final CountryRepository countryRepository;

//  @Scheduled(cron = "0 0 4 * * *") // 매일 새벽 4시에 실행 (cron = "초 분 시 일 월 요일")
    @Scheduled(initialDelay = 5000, fixedRate = 3600000) // 테스트용, 애플리케이션 시작 직후 1번만 실행 (initialDelay : 앱 시작 후 5초 뒤에 1번 실행, fixedRate: 그 후 1시간마다 실행)
    public void updateAllSafetyInfo() {
        log.info("===== [Scheduler] 국가별 안전 정보 크롤링 시작 =====");

        // DataInitializer에 있는 static 맵을 참조합니다.
        DataInitializer.COUNTRIES_TO_CRAWL.forEach((countryCode, siteId) -> {
            try {
                log.info("[Scheduler] {} (ID:{}) 크롤링 중...", countryCode, siteId);

                // 1. countryCode로 DB에서 Country 객체를 찾습니다.
                //    (DataInitializer가 먼저 실행되므로, 여기서 못 찾으면 심각한 오류)
                Country country = countryRepository.findByCountryCode(countryCode)
                        .orElseThrow(() -> new RuntimeException("Country not found in DB: " + countryCode));

                // 2. 서비스로 크롤링 실행 (DTO 받아오기) - siteId를 넘깁니다.
                TipResponse dto = tipService.crawlCountryData(siteId);

                // 3. Country 객체로 기존 Tip 정보를 조회합니다.
                Tip tip = tipRepository.findByCountry(country)
                        .orElse(new Tip(country)); // 없으면 Country 객체로 새 Tip 생성

                // 4. Tip 엔티티 데이터 업데이트
                tip.setIncidentInfo(dto.getIncidentInfo());
                tip.setCultureInfo(dto.getCultureInfo());
                tip.setImmigrationInfo(dto.getImmigrationInfo());

                // 5. DB에 저장 (Insert or Update)
                tipRepository.save(tip);

                log.info("[Scheduler] {} (ID:{}) 크롤링 및 DB 저장 성공", countryCode, siteId);

                Thread.sleep(3000); // 3초 대기 (서버 부하 방지)

            } catch (Exception e) {
                // @Transactional이 적용되어 있으므로, 오류 발생 시 해당 국가 작업은 롤백됩니다.
                log.error("[Scheduler] {} (ID:{}) 처리 중 오류 발생: {}", countryCode, siteId, e.getMessage());
            }
        });

        log.info("===== [Scheduler] 모든 국가 크롤링 작업 완료 =====");
    }
}