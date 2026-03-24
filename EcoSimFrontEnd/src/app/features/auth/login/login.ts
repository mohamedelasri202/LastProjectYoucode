import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth/auth.actions';
import { authFeature } from '../../../state/auth/auth.reducer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  private store = inject(Store);


  email = signal('');
  password = signal('');

  
  isLoading = this.store.selectSignal(authFeature.selectIsLoading);
  error = this.store.selectSignal(authFeature.selectError);

  onLogin() {
    if (this.email() && this.password()) {
      this.store.dispatch(AuthActions.login({ 
        credentials: { email: this.email(), password: this.password() } 
      }));
    }
  }
}