import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { VehicleActions } from '../../../../state/vehicle/vehicle.actions';
import { vehicleFeature } from '../../../../state/vehicle/vehicle.reducer';
import { EngineType } from '../../../../core/vehicle/models/vehicle.model';

@Component({
  selector: 'app-fleet-mgmt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fleet-mgmt.component.html',
  styleUrl: './fleet-mgmt.component.css',
})
export class FleetMgmtComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  // Selectors
  vehicles = this.store.selectSignal(vehicleFeature.selectVehicles);
  isLoading = this.store.selectSignal(vehicleFeature.selectIsLoading);

  // Form Initialization
  vehicleForm = this.fb.group({
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    officialEfficiency: [0, [Validators.required, Validators.min(0.1)]],
    year: [new Date().getFullYear(), [Validators.required]],
    engineType: [EngineType.GASOLINE, [Validators.required]],
    tankCapacity: [50, [Validators.required]] // Added to match your DTO
  });

  ngOnInit() {
    this.store.dispatch(VehicleActions.loadVehicles({ 
      criteria: { page: 0, size: 10, engineType: null } 
    }));
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      const vehicleData = this.vehicleForm.value as any;
      this.store.dispatch(VehicleActions.addVehicleManual({ vehicle: vehicleData }));
      this.vehicleForm.reset({ year: 2024, engineType: EngineType.GASOLINE });
    }
  }

  onDelete(id: number) {
    if (confirm('CAUTION: Purge this unit from fleet database?')) {
      this.store.dispatch(VehicleActions.deleteVehicle({ id }));
    }
  }
}