package com.project.team.Entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false, unique = true) // Tip은 국가당 1개이므로 unique=true
    private Country country;

    @Column(columnDefinition = "TEXT") // 긴 HTML 내용을 저장하기위한 TEXT
    private String incidentInfo;    // 사건·사고

    @Column(columnDefinition = "TEXT")
    private String cultureInfo;       // 현지문화

    @Column(columnDefinition = "TEXT")
    private String immigrationInfo;   // 출입국정보

    public Tip(Country country) {
        this.country = country;
    }
}