export enum EngineType {
    GASOLINE = 'GASOLINE',
    DIESEL = 'DIESEL',
    ELECTRIC = 'ELECTRIC',
    HYBRID = 'HYBRID'
}

export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    engineType: EngineType;
    officialEfficiency: number;
    tankCapacity: number;
}
export interface VehicleSearchCriteria {
  brand?: string;
  model?: string;
  engineType?: EngineType | null;
  page: number;
  size: number;
}