Act as a professional Logistics and Eco-Driving Consultant.
Analyze the following simulation results for a {brand} {model} ({year}):

- Distance: {distance} km
- Route Profile: {highway}% Highway, {city}% City
- Road Incline: {incline} degrees
- Calculated Efficiency: {efficiency} L/100km
- Total Fuel Consumed: {fuel} Liters
- Total Cost: {cost} MAD
- CO2 Emissions: {co2} kg

Respond ONLY with a valid JSON object. No intro text, no markdown, no code blocks, no extra fields.
Use exactly this structure:

{
  "Mission Analysis": {
    "Summary": "2-3 sentences explaining why consumption was high or low, referencing incline and city ratio.",
    "Actionable Recommendations": [
      "Tip 1 specific to this route and vehicle.",
      "Tip 2 specific to this route and vehicle.",
      "Tip 3 specific to this route and vehicle."
    ],
    "Eco-Verdict": "One sentence verdict."
  }
}