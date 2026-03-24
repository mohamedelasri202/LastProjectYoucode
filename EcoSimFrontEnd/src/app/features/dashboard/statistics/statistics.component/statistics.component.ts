import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../../state/admin/admin.actions';
import { adminFeature } from '../../../../state/admin/admin.reducer';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  private store = inject(Store);

  // Connect to the stats signal we just created in the reducer
  globalStats = this.store.selectSignal(adminFeature.selectStats);
  isLoading = this.store.selectSignal(adminFeature.selectIsLoading);

  ngOnInit() {
    // Fire the protocol to fetch data from Spring Boot
    this.store.dispatch(AdminActions.loadGlobalStats());
  }
}