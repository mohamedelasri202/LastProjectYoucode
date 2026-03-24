import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth/auth.actions';
import { authFeature } from '../../../state/auth/auth.reducer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  private store = inject(Store);


  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');

  isLoading = this.store.selectSignal(authFeature.selectIsLoading);
  error = this.store.selectSignal(authFeature.selectError);

onRegister() {
  const username = `${this.firstName().toLowerCase()}.${this.lastName().toLowerCase()}`;
  
  const userData = {
    username: username,
    firstName: this.firstName(),
    lastName: this.lastName(),
    email: this.email(),
    password: this.password()
  };
  
  this.store.dispatch(AuthActions.register({ userData }));
}
}