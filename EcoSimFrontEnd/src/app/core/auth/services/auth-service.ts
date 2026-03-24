import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginReq, RegisterReq } from '../models/auth.model';
import { AuthResponse } from '../models/auth.model';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  private authState = signal<AuthResponse | null>(this.getStoredAuth());

  currentUser = computed<User | null>(() => {
    const state = this.authState();
    return state ? { username: state.username, email: state.email, role: state.role } : null;
  });

  isAuthenticated = computed(() => !!this.authState()?.token);
  userRole = computed(() => this.authState()?.role || 'USER');

  login(credentials: LoginReq): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  register(userData: RegisterReq): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData);
  }

  // 👇 ADD THIS NOW - IT WAS THE MISSING LINK
  checkAuthStatus(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_URL}/me`);
  }

  setSession(auth: AuthResponse): void {
    localStorage.setItem('auth_data', JSON.stringify(auth));
    this.authState.set(auth);
  }

  logout(): void {
    localStorage.removeItem('auth_data');
    this.authState.set(null);
    this.router.navigate(['/login']);
  }

  private getStoredAuth(): AuthResponse | null {
    const data = localStorage.getItem('auth_data');
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch { return null; }
  }
}