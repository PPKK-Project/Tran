package com.project.team.Service;

import com.project.team.Dto.Travel.AddPlanRequest;
import com.project.team.Entity.Place;
import com.project.team.Entity.Travel;
import com.project.team.Entity.TravelPlan;
import com.project.team.Exception.AccessDeniedException;
import com.project.team.Exception.ResourceNotFoundException;
import com.project.team.Repository.PlaceRepository;
import com.project.team.Repository.TravelPlanRepository;
import com.project.team.Repository.TravelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class TravelService {
    private final TravelRepository travelRepository;
    private final PlaceRepository placeRepository;
    private final TravelPlanRepository travelPlanRepository;

    @Transactional
    public TravelPlan addPlan(Long travelId, AddPlanRequest request, Principal principal) {
        // 1. 여행(Travel) 조회
        Travel travel = travelRepository.findById(travelId)
                .orElseThrow(() -> new ResourceNotFoundException("Travel not found with id: " + travelId));

        // 2. 권한 확인 (여행 생성자만 추가 가능)
        if (!travel.getUser().getEmail().equals(principal.getName())) {
            throw new AccessDeniedException("You do not have permission to add a plan to this travel.");
        }

        // 3. 장소(Place) 조회
        Place place = placeRepository.findById(request.placeId())
                .orElseThrow(() -> new ResourceNotFoundException("Place not found with id: " + request.placeId()));

        // 4. 새로운 TravelPlan 생성 및 저장
        TravelPlan newPlan = new TravelPlan(travel, request.sequence(), request.memo(), request.dayNumber());
        newPlan.setPlace(place);

        return travelPlanRepository.save(newPlan);
    }
}
