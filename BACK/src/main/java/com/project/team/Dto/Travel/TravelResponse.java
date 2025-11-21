package com.project.team.Dto.Travel;

import com.project.team.Entity.Travel;

import java.time.LocalDate;

public record TravelResponse(
        Long id,
        String title,
        LocalDate startDate,
        LocalDate endDate,
        String countryCode,
        String departure,
        Integer headcount
) {

    public TravelResponse(Travel travel) {
        this(
                travel.getId(),
                travel.getTitle(),
                travel.getStartDate(),
                travel.getEndDate(),
                travel.getCountryCode(),
                travel.getDeparture(),
                travel.getHeadcount()
        );
    }
}
