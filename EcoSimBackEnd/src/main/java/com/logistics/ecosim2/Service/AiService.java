package com.logistics.ecosim2.Service;

import com.logistics.ecosim2.entity.SimulationResult;
import org.springframework.ai.chat.client.ChatClient;

public interface  AiService {
 String getAiRecommendations(SimulationResult result);
}
