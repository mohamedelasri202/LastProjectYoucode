// main-layout.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../navbar/navbar/navbar';
import {Footer} from '../../footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar> 

      <main class="flex-grow">
        <router-outlet></router-outlet> 
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class MainLayout {}