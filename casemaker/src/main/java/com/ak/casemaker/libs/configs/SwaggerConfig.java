package com.ak.casemaker.libs.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CaseMaker API")
                        .version("1.0.0")
                        .description("API Documentation for CaseMaker API"))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Server")
                        // new Server().url("").description("Production Server")
                ));
    }
}
