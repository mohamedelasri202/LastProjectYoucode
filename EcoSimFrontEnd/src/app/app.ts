import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; 
import { Store } from '@ngrx/store';
import { AuthService } from './core/auth/services/auth-service';
import { AuthActions } from './state/auth/auth.actions';
import { Navbar } from './shared/navbar/navbar/navbar';
import { authFeature } from './state/auth/auth.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('EcoSim');
  
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);


  showNavbar = computed(() => {
    const isAuth = this.authService.isAuthenticated();
    const isAdminPath = this.router.url.includes('/admin');
    return isAuth && !isAdminPath;
  });

ngOnInit() {
  const savedAuth = localStorage.getItem('auth_data');
  
  if (savedAuth) {
    const response = JSON.parse(savedAuth);
    
    
    this.store.dispatch(AuthActions.authSuccess({ response }));

    // if (this.router.url === '/' || this.router.url === '/login') {
    //    if (response.role === 'ADMIN') {
    //      this.router.navigate(['/admin/stats']);
    //    } else {
    //      this.router.navigate(['/app/home']);
    //    }
    // }
  }
}
}