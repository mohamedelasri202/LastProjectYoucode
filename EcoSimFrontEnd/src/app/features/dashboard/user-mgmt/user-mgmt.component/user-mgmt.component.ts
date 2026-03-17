import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../../state/admin/admin.actions';
import { adminFeature } from '../../../../state/admin/admin.reducer';

@Component({
  selector: 'app-user-mgmt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-mgmt.component.html',
  styleUrl: './user-mgmt.component.css',
})
export class UserMgmtComponent implements OnInit {
  private store = inject(Store);


  operators = this.store.selectSignal(adminFeature.selectUsers);
  isLoading = this.store.selectSignal(adminFeature.selectIsLoading);

  ngOnInit() {
   
    this.store.dispatch(AdminActions.loadUsers());
  }

  onToggleStatus(userId: number) {
   
    
    this.store.dispatch(AdminActions.toggleUserBlock({ userId }));
  }
}