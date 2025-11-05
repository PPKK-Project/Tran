package com.project.team.Dto.API;

public record PlaceApiRequest(String keyword, String lat, String lon, String radius, String type) {
}
