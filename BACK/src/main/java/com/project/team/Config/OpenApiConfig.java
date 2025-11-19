package com.project.team.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Tlan Project API",
                description = "팀 프로젝트 Tlan의 API 명세서입니다.",
                version = "v1.0.0"
        ),
        security = @SecurityRequirement(name = "bearerAuth") // 모든 API에 기본적으로 인증 요구 설정
)
@SecurityScheme(
        name = "bearerAuth", // SecurityRequirement의 name과 일치해야 함
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {
}