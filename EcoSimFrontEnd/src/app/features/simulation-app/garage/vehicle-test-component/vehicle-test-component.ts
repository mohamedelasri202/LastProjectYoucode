import { Component, AfterViewChecked, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { vehicleFeature } from '../../../../state/vehicle/vehicle.reducer';
import { VehicleActions } from '../../../../state/vehicle/vehicle.actions';
import { TestService } from '../../../../core/tests/services/test-service';
import { RouteRequest } from '../../../../core/tests/models/RouteRequest';
import { SimulationActions } from '../../../../state/simulation/simulation.actions';
import { simulationFeature } from '../../../../state/simulation/simulation.reducer';

@Component({
  selector: 'app-vehicle-test',
  standalone: true,
  imports: [CommonModule, DecimalPipe, CurrencyPipe],
  templateUrl: './vehicle-test-component.html',
  styleUrls: ['./vehicle-test-component.css']
})
export class VehicleTestComponent implements OnInit, AfterViewChecked {
  private store = inject(Store);
  private testService = inject(TestService);


  vehicles = this.store.selectSignal(vehicleFeature.selectVehicles);
  criteria = this.store.selectSignal(vehicleFeature.selectCriteria);
  simulationResponse = this.store.selectSignal(simulationFeature.selectResult);
  isSimulating = this.store.selectSignal(simulationFeature.selectIsLoading);


  currentStep = signal(1);
  isReportReady = signal(false);
  isTripAnalyzed = signal(false);
  parsedAI = signal<any>(null);

  private map?: L.Map;
  private mapInitialized = false;
  private markers: L.Marker[] = [];

  testSelection = signal({
    id: null as number | null,
    fuelPrice: 0,
    vehicleId: null,
    selectedVehicle: null as any,
    distanceKm: 0,
    highwayPercentage: 0,
    cityPercentage: 0,
    roadInclineDegree: 0,
    elevationGain: 0,
    avgHighwaySpeedKmh: 0,
    avgCitySpeedKmh: 0,
    estimatedTimeMinutes: 0
  });

  constructor() {
    effect(() => {
      const response = this.simulationResponse();
      if (response?.aiRecommendation) {
        try {
          const jsonBody = JSON.parse(response.aiRecommendation);

          const reportContent = jsonBody['Summary'] ? jsonBody : Object.values(jsonBody)[0];
          this.parsedAI.set(reportContent);
        } catch (e) {
          console.error(" AI Parsing Error:", e);
          this.parsedAI.set(null);
        }
      } else {
        this.parsedAI.set(null);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.store.dispatch(VehicleActions.loadVehicles({ criteria: this.criteria() }));
  }

  ngAfterViewChecked() {
    if (this.currentStep() === 3 && !this.mapInitialized) {
      this.initMap();
    }
  }


  confirmPrice() {
    if (this.testSelection().fuelPrice > 0) this.currentStep.set(2);
  }

  confirmVehicle(vehicle: any) {
    this.testSelection.update(prev => ({ ...prev, vehicleId: vehicle.id, selectedVehicle: vehicle }));
    this.currentStep.set(3);
  }

  onMakeTrip() {
    if (this.testSelection().distanceKm > 0) {
      this.isReportReady.set(true);
      this.isTripAnalyzed.set(true);
    }
  }

  goBack() {
    if (this.currentStep() === 3) {
      this.mapInitialized = false;
      this.map?.remove();
      this.markers = [];
      this.isReportReady.set(false);
      this.isTripAnalyzed.set(false);
      this.parsedAI.set(null);
    }
    this.currentStep.update(s => s - 1);
  }


  private initMap(): void {
    const container = document.getElementById('map');
    if (!container) return;
    this.mapInitialized = true;
    this.map = L.map('map', { zoomControl: false }).setView([33.5731, -7.5898], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(this.map);

    (L.Control as any).geocoder({
      defaultMarkGeocode: false,
      placeholder: "Search location...",
      position: 'topleft'
    })
      .on('markgeocode', (e: any) => {
        this.map?.setView(e.geocode.center, 15);
        this.handlePointSelection(e.geocode.center);
      })
      .addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => this.handlePointSelection(e.latlng));
    setTimeout(() => this.map?.invalidateSize(), 250);
  }

  private handlePointSelection(latlng: L.LatLng) {
    if (this.markers.length >= 2) {
      this.markers.forEach(m => m.remove());
      this.markers = [];
      this.isReportReady.set(false);
      this.isTripAnalyzed.set(false);
      this.testSelection.update(prev => ({ ...prev, distanceKm: 0 }));
    }

    const customIcon = L.divIcon({ className: 'custom-pulse-marker', iconSize: [12, 12] });
    const marker = L.marker(latlng, { icon: customIcon }).addTo(this.map!);
    this.markers.push(marker);

    if (this.markers.length === 2) this.calculateRoute();
  }

  private calculateRoute() {
    const start = this.markers[0].getLatLng();
    const end = this.markers[1].getLatLng();
    const selectedVehicleId = this.testSelection().vehicleId;

    if (!selectedVehicleId) {
      console.error('[EcoSim] Error: No vehicle selected for this trip.');
      return;
    }

    this.testService.calculateDistance({
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      vehicleId: selectedVehicleId
    }).subscribe({
      next: (res: any) => {

        this.testSelection.update(prev => ({
          ...prev,
          ...res,
          id: res.id
        }));
        console.log('[EcoSim] Telemetry synced. Trip ID:', res.id);
      },
      error: (err) => console.error('[EcoSim] Routing Error:', err)
    });
  }


  onRunSimulation() {
    const selection = this.testSelection();

    // DEBUGGING: This will tell us which one is null
    console.log('--- VALIDATION CHECK ---');
    console.log('Vehicle Selected:', !!selection.selectedVehicle);
    console.log('Fuel Price > 0:', selection.fuelPrice > 0);
    console.log('Trip ID from DB:', selection.id);

    if (selection.selectedVehicle && selection.fuelPrice > 0 && selection.id) {
      this.store.dispatch(SimulationActions.runSimulation({
        vehicleId: selection.selectedVehicle.id,
        tripProfileId: selection.id,
        fuelPrice: selection.fuelPrice
      }));
    } else {
      console.warn('[EcoSim] Cannot run simulation. Details missing:', {
        hasVehicle: !!selection.selectedVehicle,
        hasPrice: selection.fuelPrice > 0,
        hasTripId: !!selection.id
      });
    }
  }

  downloadReport() {
    const doc = new jsPDF();
    const res = this.simulationResponse()?.simulationDetails;
    const ai = this.parsedAI();


    doc.setFillColor(0, 161, 155);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('EcoSIM STRATEGIC REPORT', 15, 25);
    doc.setFontSize(10);
    doc.text(`MISSION REF: ${res?.trip?.tripName || 'UNNAMED_TASK'}`, 15, 33);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Vehicle & Route Telemetry', 15, 55);

    autoTable(doc, {
      startY: 60,
      head: [['Attribute', 'Unit Data']],
      body: [
        ['Vehicle Unit', `${res?.vehicle?.brand} ${res?.vehicle?.model}`],
        ['Total Distance', `${res?.trip?.totalDistanceKm} KM`],
        ['Highway/City Split', `${res?.trip?.highwayPercentage}% / ${res?.trip?.cityPercentage}%`],
        ['Real Consumption', `${res?.calculatedLitersPer100km.toFixed(2)} L/100km`],
        ['Total Cost', `${res?.totalCost.toFixed(2)} USD`],
        ['CO2 Impact', `${res?.co2EmissionsKg.toFixed(2)} KG`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }
    });


    if (ai) {
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      doc.setFontSize(14);
      doc.text('AI Intelligence Advisory', 15, finalY);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const splitSummary = doc.splitTextToSize(ai.Summary, 180);
      doc.text(splitSummary, 15, finalY + 10);

      let currentY = finalY + 15 + (splitSummary.length * 5);
      doc.setFont('helvetica', 'bold');
      doc.text('STRATEGIC ACTIONS:', 15, currentY);

      doc.setFont('helvetica', 'normal');
      const recs = ai['Actionable Recommendations'] || ai['Recommendations'] || [];
      recs.forEach((rec: string, i: number) => {
        currentY += 10;
        const cleanRec = rec.replace(/\*\*/g, '');
        const splitRec = doc.splitTextToSize(`${i + 1}. ${cleanRec}`, 170);
        doc.text(splitRec, 20, currentY);
        currentY += (splitRec.length * 4);
      });
    }

    doc.save(`EcoSIM_Report_${res?.vehicle?.model || 'Trip'}.pdf`);
  }
}
