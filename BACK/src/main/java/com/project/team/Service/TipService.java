package com.project.team.Service;

import com.project.team.Dto.TipResponse;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class TipService {

    private static final String BASE_URL = "https://www.0404.go.kr/ntnSafetyInfo";
    private static final String DETAIL_PATH = "/detail";

    /**
     * 외교부 사이트의 국가 ID(siteCountryId)를 받아 해당 국가의 안전 정보를 크롤링한다.
     * @param siteCountryId 외교부 사이트 URL의 id 값 (예: 미국 "69")
     * @return 크롤링한 데이터를 담은 DTO
     */
    public TipResponse crawlCountryData(String siteCountryId) {

        String fullUrl = BASE_URL + "/" + siteCountryId + DETAIL_PATH;

        log.info("Crawling URL: {}", fullUrl);

        try {
            Document doc = Jsoup.connect(fullUrl)
                    .userAgent("Mozilla/5.0")
                    .timeout(30000)
                    .get();

            // ID로 3개의 <textarea> 요소를 정확히 선택
            String incidentHtml = getHtmlFromTextarea(doc, "textarea#incdntInfo");
            String cultureHtml = getHtmlFromTextarea(doc, "textarea#loclCltrInfo");
            String immigrationHtml = getHtmlFromTextarea(doc, "textarea#dptentcnyInfo");

            return new TipResponse(incidentHtml, cultureHtml, immigrationHtml);

        } catch (IOException e) {
            log.error("Failed to crawl country data for siteId {}: ", e);
            return new TipResponse("정보를 불러오는 데 실패했습니다.", "정보를 불러오는 데 실패했습니다.", "정보를 불러오는 데 실패했습니다.");
        }
    }

    /**
     * Document에서 CSS 선택자로 <textarea>를 찾아 그 안의 HTML 내용을 반환하는 헬퍼 메서드
     */
    private String getHtmlFromTextarea(Document doc, String selector) {
        Element element = doc.selectFirst(selector);
        if (element != null) {
            return element.html(); // .html()을 사용하여 내부 HTML 태그를 그대로 가져옴
        }
        log.warn("Selector {} not found in document.", selector);
        return "정보 없음";
    }
}