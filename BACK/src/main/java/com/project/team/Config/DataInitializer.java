package com.project.team.Config;


import com.project.team.Entity.Country;
import com.project.team.Repository.CountryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataInitializer {

    private final CountryRepository countryRepository;

    // 국가 코드를 미리 저장(예: US). "69"같은 숫자는 해외안전사이트에서 독자적으로 할당한 국가별 숫자이니 바꾸지말 것.
    public static final Map<String, String> COUNTRIES_TO_CRAWL;

    static {
        Map<String, String> map = new HashMap<>();
        map.put("GH", "390"); // 가나
        map.put("GA", "2");   // 가봉
        map.put("GY", "315"); // 가이아나공화국
        map.put("GM", "5");   // 감비아
        map.put("GT", "7");   // 과테말라
        map.put("GD", "316"); // 그레나다
        map.put("GR", "11");  // 그리스
        map.put("GN", "13");  // 기니
        map.put("GW", "14");  // 기니비사우
        map.put("NA", "15");  // 나미비아
        map.put("NR", "306"); // 나우루
        map.put("NG", "18");  // 나이지리아
        map.put("SS", "373"); // 남수단
        map.put("ZA", "20");  // 남아프리카공화국
        map.put("NL", "21");  // 네덜란드
        map.put("NP", "22");  // 네팔
        map.put("NO", "23");  // 노르웨이
        map.put("NZ", "25");  // 뉴질랜드
        map.put("NU", "380"); // 니우에
        map.put("NE", "27");  // 니제르
        map.put("NI", "28");  // 니카라과
        map.put("TW", "372"); // 대만
        map.put("DK", "31");  // 덴마크
        map.put("DO", "33");  // 도미니카공화국
        map.put("DM", "369"); // 도미니카연방
        map.put("DE", "34");  // 독일
        map.put("TL", "304"); // 동티모르
        map.put("LA", "36");  // 라오스
        map.put("LR", "37");  // 라이베리아
        map.put("LV", "344"); // 라트비아
        map.put("RU", "39");  // 러시아
        map.put("LB", "40");  // 레바논
        map.put("LS", "370"); // 레소토
        map.put("RO", "43");  // 루마니아
        map.put("LU", "337"); // 룩셈부르크
        map.put("RW", "45");  // 르완다
        map.put("LY", "375"); // 리비아
        map.put("LT", "345"); // 리투아니아
        map.put("LI", "48");  // 리히텐슈타인
        map.put("MG", "49");  // 마다가스카르
        map.put("MH", "307"); // 마셜제도
        map.put("FM", "308"); // 마이크로네시아
        map.put("MO", "378"); // 마카오
        map.put("MW", "55");  // 말라위
        map.put("MY", "56");  // 말레이시아
        map.put("ML", "57");  // 말리
        map.put("MX", "58");  // 멕시코
        map.put("MC", "341"); // 모나코
        map.put("MA", "60");  // 모로코
        map.put("MU", "61");  // 모리셔스
        map.put("MR", "62");  // 모리타니아
        map.put("MZ", "63");  // 모잠비크
        map.put("ME", "290"); // 몬테네그로
        map.put("MD", "65");  // 몰도바
        map.put("MV", "309"); // 몰디브
        map.put("MT", "297"); // 몰타
        map.put("MN", "68");  // 몽골
        map.put("US", "69");  // 미국
        map.put("MM", "75");  // 미얀마
        map.put("VU", "310"); // 바누아투
        map.put("BH", "288"); // 바레인
        map.put("BB", "318"); // 바베이도스
        map.put("BS", "339"); // 바하마
        map.put("BD", "82");  // 방글라데시
        map.put("BJ", "289"); // 베냉
        map.put("VE", "85");  // 베네수엘라
        map.put("VN", "86");  // 베트남
        map.put("BE", "87");  // 벨기에
        map.put("BY", "333"); // 벨라루스
        map.put("BZ", "319"); // 벨리즈
        map.put("BA", "298"); // 보스니아헤르체고비나
        map.put("BW", "91");  // 보츠와나
        map.put("BO", "92");  // 볼리비아
        map.put("BI", "93");  // 부룬디
        map.put("BF", "94");  // 부르키나파소
        map.put("BT", "329"); // 부탄
        map.put("MK", "368"); // 북마케도니아
        map.put("BG", "98");  // 불가리아
        map.put("BR", "104"); // 브라질
        map.put("BN", "105"); // 브루나이
        map.put("WS", "112"); // 사모아
        map.put("SA", "107"); // 사우디아라비아
        map.put("CY", "258"); // 사이프러스
        map.put("SM", "299"); // 산마리노
        map.put("ST", "371"); // 상투메프린시페
        map.put("SN", "114"); // 세네갈
        map.put("RS", "287"); // 세르비아
        map.put("SC", "291"); // 세이셸
        map.put("LC", "321"); // 세인트루시아
        map.put("VC", "322"); // 세인트빈센트그레나딘
        map.put("KN", "320"); // 세인트키츠네비스
        map.put("SO", "120"); // 소말리아
        map.put("SB", "311"); // 솔로몬제도
        map.put("SD", "122"); // 수단
        map.put("SR", "323"); // 수리남
        map.put("LK", "124"); // 스리랑카
        map.put("SE", "126"); // 스웨덴
        map.put("CH", "127"); // 스위스
        map.put("ES", "128"); // 스페인
        map.put("SK", "129"); // 슬로바키아
        map.put("SI", "130"); // 슬로베니아
        map.put("SY", "131"); // 시리아
        map.put("SL", "292"); // 시에라리온
        map.put("SG", "134"); // 싱가포르
        map.put("AE", "135"); // 아랍에미리트
        map.put("AM", "334"); // 아르메니아
        map.put("AR", "138"); // 아르헨티나
        map.put("IS", "139"); // 아이슬란드
        map.put("HT", "324"); // 아이티
        map.put("IE", "141"); // 아일랜드
        map.put("AZ", "335"); // 아제르바이잔
        map.put("AF", "284"); // 아프가니스탄
        map.put("AD", "340"); // 안도라
        map.put("AL", "300"); // 알바니아
        map.put("DZ", "150"); // 알제리
        map.put("AO", "151"); // 앙골라
        map.put("AG", "325"); // 앤티가바부다
        map.put("ER", "338"); // 에리트레아
        map.put("SZ", "125"); // 에스와티니
        map.put("EE", "154"); // 에스토니아
        map.put("EC", "155"); // 에콰도르
        map.put("ET", "156"); // 에티오피아
        map.put("SV", "157"); // 엘살바도르
        map.put("GB", "159"); // 영국
        map.put("YE", "294"); // 예멘
        map.put("OM", "162"); // 오만
        map.put("AT", "163"); // 오스트리아
        map.put("HN", "164"); // 온두라스
        map.put("JO", "165"); // 요르단
        map.put("UG", "166"); // 우간다
        map.put("UY", "167"); // 우루과이
        map.put("UZ", "168"); // 우즈베키스탄
        map.put("UA", "169"); // 우크라이나
        map.put("IQ", "174"); // 이라크
        map.put("IR", "176"); // 이란
        map.put("IL", "177"); // 이스라엘
        map.put("EG", "178"); // 이집트
        map.put("IT", "179"); // 이탈리아
        map.put("IN", "285"); // 인도
        map.put("ID", "181"); // 인도네시아
        map.put("JP", "183"); // 일본
        map.put("JM", "326"); // 자메이카
        map.put("ZM", "186"); // 잠비아
        map.put("GQ", "187"); // 적도기니
        map.put("GE", "332"); // 조지아
        map.put("CN", "189"); // 중국
        map.put("CF", "190"); // 중앙아프리카공화국
        map.put("DJ", "191"); // 지부티
        map.put("ZW", "193"); // 짐바브웨
        map.put("TD", "295"); // 차드
        map.put("CZ", "195"); // 체코
        map.put("CL", "197"); // 칠레
        map.put("CM", "199"); // 카메룬
        map.put("CV", "200"); // 카보베르데
        map.put("KZ", "201"); // 카자흐스탄
        map.put("QA", "202"); // 카타르
        map.put("KH", "259"); // 캄보디아
        map.put("CA", "204"); // 캐나다
        map.put("KE", "206"); // 케냐
        map.put("KM", "331"); // 코모로
        map.put("XK", "367"); // 코소보
        map.put("CR", "209"); // 코스타리카
        map.put("CI", "212"); // 코트디부아르
        map.put("CO", "213"); // 콜롬비아
        map.put("CG", "214"); // 콩고
        map.put("CD", "215"); // 콩고민주공화국
        map.put("CU", "327"); // 쿠바
        map.put("KW", "216"); // 쿠웨이트
        map.put("CK", "330"); // 쿡제도
        map.put("HR", "218"); // 크로아티아
        map.put("KG", "301"); // 키르기즈공화국
        map.put("KI", "312"); // 키리바시
        map.put("TJ", "302"); // 타지키스탄
        map.put("TZ", "225"); // 탄자니아
        map.put("TH", "260"); // 태국
        map.put("TG", "296"); // 토고
        map.put("TO", "230"); // 통가
        map.put("TM", "366"); // 투르크메니스탄
        map.put("TV", "313"); // 투발루
        map.put("TN", "233"); // 튀니지
        map.put("TR", "228"); // 튀르키예
        map.put("TT", "328"); // 트리니다드토바고
        map.put("PA", "235"); // 파나마
        map.put("PY", "237"); // 파라과이
        map.put("PK", "239"); // 파키스탄
        map.put("PG", "240"); // 파푸아뉴기니
        map.put("PW", "314"); // 팔라우
        map.put("PS", "398"); // 팔레스타인-자치지역
        map.put("PE", "243"); // 페루
        map.put("PT", "244"); // 포르투갈
        map.put("PL", "246"); // 폴란드
        map.put("FR", "248"); // 프랑스
        map.put("FJ", "249"); // 피지
        map.put("FI", "251"); // 핀란드
        map.put("PH", "252"); // 필리핀
        map.put("HU", "254"); // 헝가리
        map.put("AU", "255"); // 호주
        map.put("HK", "377"); // 홍콩

        COUNTRIES_TO_CRAWL = Map.copyOf(map);
    }

    /**
     * @PostConstruct: Spring이 DataInitializer Bean을 생성한 직후 1회 실행된다.
     * DB의 Country 테이블에 국가 코드를 미리 저장한다.
     */
    @PostConstruct
    public void initializeCountries() {
        log.info("===== Country 데이터 초기화 시작 =====");

        // 맵의 모든 Key (국가 코드, 예: "US")를 순회한다.
        for (String countryCode : COUNTRIES_TO_CRAWL.keySet()) {
            // DB에 해당 국가 코드가 이미 존재하는지 확인한다.
            if (!countryRepository.existsByCountryCode(countryCode)) {
                // 존재하지 않으면, 새 Country 객체를 만들어 저장한다.
                Country country = new Country(countryCode);
                countryRepository.save(country);
                log.info("Saved new country: {}", countryCode);
            }
        }
        log.info("===== Country 데이터 초기화 완료 =====");
    }
}