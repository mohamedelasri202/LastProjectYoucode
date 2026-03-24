export interface SimulationRequest {
  vehicleId: number;
  tripProfileId: number;
  fuelPrice: number;
}


export interface SimulationResponse {
  simulationDetails: SimulationResult;
  aiRecommendation: string; 
}


export interface AISection {
  Section: string;
  Text: string;
}


export interface SimulationResult {
  id: number;
  vehicle: {
    id?: number;
    owner?: any;
    brand: string;
    model: string;
    year?: number;
    engineType?: string;
    officialEfficiency: number;
    tankCapacity?: number;
  };
  trip: {
    id: number;
    tripName: string;
    totalDistanceKm: number;
    highwayPercentage: number;
    cityPercentage: number;
    avgHighwaySpeedKmh?: number;
    avgCitySpeedKmh?: number;
    roadInclineDegree?: number;
  };
  totalFuelConsumedLiters: number;
  totalCost: number;
  co2EmissionsKg: number;
  calculatedLitersPer100km: number;
  simulationDate: string;
}