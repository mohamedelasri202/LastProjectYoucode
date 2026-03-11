import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import { adminGuard } from './core/auth/guards/admin-guard';

export const routes: Routes = [
  
  {
    path: '',
    loadComponent: () => import('./shared/layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      
      { 
        path: 'about', 
        loadComponent: () => import('./features/public/about/about').then(m => m.About) 
      },
      { 
        path: 'contact', 
        loadComponent: () => import('./features/public/contact-us/contact-us').then(m => m.ContactUs) 
      },

      {
        path: 'home',
        loadComponent: () => import('./features/simulation-app/home/home').then(m => m.Home),
        canActivate: [authGuard] 
      },
      {
        path: 'myGarage',
        loadComponent: () => import('./features/simulation-app/garage/garage-component/garage-component').then(m => m.GarageComponent),
        canActivate: [authGuard]
      },
      
      {
        path: 'profile',
        loadComponent: () => import('./features/user/profile/profile').then(m => m.Profile),
        canActivate: [authGuard],
        title: 'EcoSIM | Pilot Dossier'
      },
    ]
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent),
    title: 'GearShift | Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
  },

  // 🛡️ 3. ADMIN SHELL
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard], 
    loadComponent: () => import('./features/dashboard/dashboard-shell.component/dashboard-shell.component').then(m => m.DashboardShellComponent),
    children: [
      {
        path: 'stats',
        loadComponent: () => import('./features/dashboard/statistics/statistics.component/statistics.component').then(m => m.StatisticsComponent)
      },
      {
        path: 'fleet',
        loadComponent: () => import('./features/dashboard/fleet-mgmt/fleet-mgmt.component/fleet-mgmt.component').then(m => m.FleetMgmtComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/dashboard/user-mgmt/user-mgmt.component/user-mgmt.component').then(m => m.UserMgmtComponent)
      },
      { path: '', redirectTo: 'stats', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];