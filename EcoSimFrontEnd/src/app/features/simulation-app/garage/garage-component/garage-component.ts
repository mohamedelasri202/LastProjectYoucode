import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from '../vehicle-list-component/vehicle-list-component';
import { AddVehicleComponent } from '../add-vehicle-component/add-vehicle-component';
import { VehicleTestComponent } from '../vehicle-test-component/vehicle-test-component';
@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, VehicleListComponent, AddVehicleComponent,VehicleTestComponent],
  templateUrl: './garage-component.html'
})
export class GarageComponent {
  currentSector = signal<'vehicles' | 'add' | 'test'>('vehicles');

  setSector(sector: 'vehicles' | 'add' | 'test') {
    this.currentSector.set(sector);
  }
}