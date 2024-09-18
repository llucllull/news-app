import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {PreferencesService} from "../../services/preferences.service";
import {Observable} from "rxjs";
import {Auth, authState, signOut} from "@angular/fire/auth";
import {AuthPageComponent} from "../../pages/auth-page/auth-page.component";
import {AuthModeService} from "../../services/auth-mode.service";

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, AuthPageComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  currentDate: Date = new Date();
  activePreferences: string[] = [];
  user$?: Observable<any>;

  constructor(private router: Router, private preferencesService: PreferencesService, private auth: Auth, private authModeService: AuthModeService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.preferencesService.preferences$.subscribe(prefs => {
      this.activePreferences = prefs;
    });
    this.user$ = authState(this.auth);

    this.user$.subscribe(user => {
      if (user) {
        this.preferencesService.loadPreferencesFromFirebase(user.uid);
      } else {
        this.preferencesService.loadPreferences();
      }
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['/news/list', category]);
  }

  isActive(preference: string): boolean {
    return this.activePreferences.includes(preference);
  }

  onLogout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  setLoginMode() {
    this.authModeService.setLoginMode(true);
  }

  setRegisterMode() {
    this.authModeService.setLoginMode(false);
  }
}
