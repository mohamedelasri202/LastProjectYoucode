import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { VehicleActions } from '../../../../state/vehicle/vehicle.actions';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-vehicle-component.html'
})
export class AddVehicleComponent {
  private store = inject(Store);


  newVehicle = signal({
    brand: '',
    model: '',
    year: 2025
  });

  updateForm(field: string, value: any) {
    this.newVehicle.update(v => ({ 
      ...v, 
      [field]: field === 'year' ? Number(value) : value 
    }));
  }

  submit() {
    const data = this.newVehicle();
    if (data.brand && data.model) {
      this.store.dispatch(VehicleActions.addVehicleAI({ vehicle: data }));
    }
  }
}