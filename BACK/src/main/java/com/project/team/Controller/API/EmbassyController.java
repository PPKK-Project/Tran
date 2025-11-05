package com.project.team.Controller.API;

import com.fasterxml.jackson.databind.JsonNode;
import com.project.team.Dto.API.EmbassyApiRequest;
import com.project.team.Service.API.EmbassyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class EmbassyController {

    private final EmbassyService embassyService;

    @GetMapping("api/embassy")
    public Mono<JsonNode> getEmbassyApi(@RequestBody EmbassyApiRequest embassyApiRequest) {
        return embassyService.fetchEmbassyApiData(embassyApiRequest);
    }

}
