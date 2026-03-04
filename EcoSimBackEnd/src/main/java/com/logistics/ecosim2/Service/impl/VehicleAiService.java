package com.logistics.ecosim2.Service.impl;

import com.logistics.ecosim2.dtos.VehicleDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class VehicleAiService {
    private final ChatClient chatClient;

    public VehicleAiService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public VehicleDTO fetchFromAi(String brand, String model, int year) {
        return chatClient.prompt()
                .user(u -> u.text("Using the technical prompt, find specs for {year} {brand} {model}")
                        .param("year", year)
                        .param("brand", brand)
                        .param("model", model))
                .call()
                .entity(VehicleDTO.class);
    }
}