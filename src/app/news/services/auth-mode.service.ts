import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthModeService {
  private isLoginModeSource = new BehaviorSubject<boolean>(true);
  isLoginMode$ = this.isLoginModeSource.asObservable();

  constructor() { }

  setLoginMode(isLoginMode: boolean) {
    this.isLoginModeSource.next(isLoginMode);
  }
}
