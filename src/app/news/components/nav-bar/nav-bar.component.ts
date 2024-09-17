import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {PreferencesService} from "../../services/preferences.service";

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  currentDate: Date = new Date();
  activePreferences: string[] = [];

  constructor(private router: Router, private preferencesService: PreferencesService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.preferencesService.preferences$.subscribe(prefs => {
      this.activePreferences = prefs;
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['/news/list', category]);
  }

  isActive(preference: string): boolean {
    return this.activePreferences.includes(preference);
  }
}
