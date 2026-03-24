import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FleetMgmtComponent } from '../fleet-mgmt/fleet-mgmt.component/fleet-mgmt.component';
import { UserMgmtComponent } from '../user-mgmt/user-mgmt.component/user-mgmt.component';
import { StatisticsComponent } from '../statistics/statistics.component/statistics.component';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.css']
})
export class DashboardShellComponent {

    private store = inject(Store)
 
  adminName = 'SYSTEM_ADMIN_01';

  logout() {
    this.store.dispatch({ type: '[Auth] Logout' });
  }
}