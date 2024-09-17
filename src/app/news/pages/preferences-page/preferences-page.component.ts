import { Component } from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";

@Component({
  selector: 'app-preferences-page',
  standalone: true,
  imports: [],
  templateUrl: './preferences-page.component.html',
  styleUrl: './preferences-page.component.scss'
})
export class PreferencesPageComponent {

  preferences = ['General', 'Health', 'Science', 'Business', 'Technology', 'Sports', 'Entertainment'];
  activePreferences: string[] = [];

  constructor(private preferencesService: PreferencesService) {
    this.preferencesService.preferences$.subscribe(prefs => {
      this.activePreferences = prefs;
    });
  }

  togglePreference(preference: string) {
    this.preferencesService.togglePreference(preference);
  }

  isActive(preference: string): boolean {
    return this.activePreferences.includes(preference);
  }

}
