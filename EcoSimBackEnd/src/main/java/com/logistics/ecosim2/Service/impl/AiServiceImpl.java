    package com.logistics.ecosim2.Service.impl;

    import com.logistics.ecosim2.Service.AiService;
    import com.logistics.ecosim2.entity.SimulationResult;
    import org.springframework.ai.chat.client.ChatClient;
    import org.springframework.beans.factory.annotation.Value; // Correct Import
    import org.springframework.core.io.Resource; // Correct Import
    import org.springframework.stereotype.Service;

    @Service
    public class AiServiceImpl implements AiService {

        private final ChatClient chatClient;

        @Value("classpath:prompts/mission-report.st")
        private Resource missionPromptResource;


        public AiServiceImpl(ChatClient.Builder builder) {
            this.chatClient = builder.build();
        }

        @Override
        public String getAiRecommendations(SimulationResult result) {
            return chatClient.prompt()
                    .user(u -> u.text(missionPromptResource)
                            .param("brand", result.getVehicle().getBrand())
                            .param("model", result.getVehicle().getModel())
                            .param("year", String.valueOf(result.getVehicle().getYear()))
                            .param("distance", String.format("%.2f", result.getTrip().getTotalDistanceKm()))
                            .param("highway", String.format("%.0f", result.getTrip().getHighwayPercentage()))
                            .param("city", String.format("%.0f", result.getTrip().getCityPercentage()))
                            .param("incline", String.format("%.2f", result.getTrip().getRoadInclineDegree()))
                            .param("efficiency", String.format("%.2f", result.getCalculatedLitersPer100km()))
                            .param("fuel", String.format("%.2f", result.getTotalFuelConsumedLiters()))
                            .param("cost", String.format("%.2f", result.getTotalCost()))
                            .param("co2", String.format("%.2f", result.getCo2EmissionsKg())))
                    .call()
                    .content();
        }
    }