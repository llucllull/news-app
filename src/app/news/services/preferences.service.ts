import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private defaultPreferences: string[] = ['General', 'Health', 'Science', 'Business', 'Technology', 'Sports', 'Entertainment'];

  private preferencesSubject = new BehaviorSubject<string[]>(this.defaultPreferences);
  preferences$ = this.preferencesSubject.asObservable();

  constructor() { }

  togglePreference(preference: string) {
    const currentPreferences = this.preferencesSubject.value;
    let updatedPreferences: string[];

    if (currentPreferences.includes(preference)) {
      updatedPreferences = currentPreferences.filter(p => p !== preference);
    } else {
      updatedPreferences = [...currentPreferences, preference];
    }

    this.preferencesSubject.next(updatedPreferences);
  }

  getPreferences() {
    return this.preferencesSubject.value;
  }

}
