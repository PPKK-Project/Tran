package com.project.team.Dto.Travel;

import com.project.team.Entity.Accommodation;
import com.project.team.Entity.Attraction;
import com.project.team.Entity.Country;
import com.project.team.Entity.Restaurant;

public record CreateTravelRequest(Country countryCode, Accommodation accommodation, Attraction attraction, Restaurant restaurant) {
}
