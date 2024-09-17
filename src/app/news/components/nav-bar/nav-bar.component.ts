import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  currentDate: Date = new Date();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  goToCategory(category: string) {
    this.router.navigate(['/news/list', category]);
  }
}
