import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  currentDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
  }
}
