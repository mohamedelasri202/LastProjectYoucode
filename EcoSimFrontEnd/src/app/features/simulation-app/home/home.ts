import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQ } from '../../public/faq/faq';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink, FAQ],
  templateUrl: './home.html'
})
export class Home {
 scrollToArchive() {
    const element = document.getElementById('technical-archive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
}