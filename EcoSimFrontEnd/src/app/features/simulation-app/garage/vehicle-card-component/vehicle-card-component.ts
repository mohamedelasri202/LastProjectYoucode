import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card-component.html'
})
export class VehicleCardComponent {
  @Input({ required: true }) vehicle!: any;
}