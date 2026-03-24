Act as a professional automotive technical database.
Provide the official technical specifications for the following vehicle:
Brand: {brand}
Model: {model}
Year: {year}

Your response must be a single, valid JSON object that matches the following criteria:
1. "engineType": Must be exactly one of these values: [PETROL, DIESEL, ELECTRIC, HYBRID].
2. "officialEfficiency": A numeric value representing the combined fuel consumption (L/100km) or energy consumption (kWh/100km).
3. "tankCapacity": A numeric value representing the fuel tank size in Liters or the battery capacity in kWh.

Return ONLY the JSON object. Do not include any introductory text, markdown formatting (like ```json), or explanations.