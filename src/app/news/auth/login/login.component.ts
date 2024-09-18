import { Component } from '@angular/core';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          this.router.navigate(['/news']);
        })
        .catch(error => {
          this.errorMessage = 'Error al iniciar sesión: ' + error.message;
        });
    } else {
      this.errorMessage = 'Por favor, ingrese email y contraseña.';
    }
  }
}
