package com.project.team.Dto;


import com.project.team.Entity.Tip;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipResponse {

    private String incidentInfo;    // 사건·사고
    private String cultureInfo;       // 현지문화
    private String immigrationInfo;   // 출입국정보

    /**
     * Entity를 DTO로 변환하는 정적 팩토리 메서드
     */
    public static TipResponse fromEntity(Tip entity) {
        return new TipResponse(
                entity.getIncidentInfo(),
                entity.getCultureInfo(),
                entity.getImmigrationInfo()
        );
    }
}