import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../state/auth/auth.reducer';
import { AuthActions } from '../../../state/auth/auth.actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
private store = inject(Store);
  
  user = this.store.selectSignal(authFeature.selectUser);

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
