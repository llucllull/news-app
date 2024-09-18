import { Component } from '@angular/core';
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.email && this.password) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          this.router.navigate(['/news']);
        })
        .catch(error => {
          this.errorMessage = 'Error en el registro: ' + error.message;
        });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }

}
