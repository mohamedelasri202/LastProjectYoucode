import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { vehicleFeature } from '../../../../state/vehicle/vehicle.reducer';
import { VehicleActions } from '../../../../state/vehicle/vehicle.actions';
import { VehicleCardComponent } from '../vehicle-card-component/vehicle-card-component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent],
  templateUrl: './vehicle-list-component.html'
})
export class VehicleListComponent implements OnInit {
  private store = inject(Store);
  private searchSubject = new Subject<string>();

  vehicles = this.store.selectSignal(vehicleFeature.selectVehicles);
  criteria = this.store.selectSignal(vehicleFeature.selectCriteria);
  isLoading = this.store.selectSignal(vehicleFeature.selectIsLoading);
  totalPages = this.store.selectSignal(vehicleFeature.selectTotalPages);

  ngOnInit() {
    this.store.dispatch(VehicleActions.loadVehicles({ criteria: this.criteria() }));
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(val => this.updateCriteria({ brand: val, model: val, page: 0 }));
  }

  onSearchChange(event: any) { this.searchSubject.next(event.target.value); }
  onEngineChange(event: any) { this.updateCriteria({ engineType: event.target.value || null, page: 0 }); }
  nextPage() { if (this.criteria().page < this.totalPages() - 1) this.updateCriteria({ page: this.criteria().page + 1 }); }
  prevPage() { if (this.criteria().page > 0) this.updateCriteria({ page: this.criteria().page - 1 }); }

  private updateCriteria(newVal: any) {
    const criteria = { ...this.criteria(), ...newVal };
    this.store.dispatch(VehicleActions.loadVehicles({ criteria }));
  }
}