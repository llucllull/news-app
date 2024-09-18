import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoginComponent} from "../../auth/login/login.component";
import {RegisterComponent} from "../../auth/register/register.component";
import {AuthModeService} from "../../services/auth-mode.service";
import {Observable, Subscription} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  isLoginMode$: Observable<boolean>;

  constructor(protected authModeService: AuthModeService) {
    this.isLoginMode$ = this.authModeService.isLoginMode$;
  }

  // toggleAuthMode() {
  //   this.isLoginMode = !this.isLoginMode;
  // }
}
