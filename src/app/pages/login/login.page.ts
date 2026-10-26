
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonText
} from '@ionic/angular';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonText
  ]
})
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  errorMessage = '';

  // Comprobamos las credenciales con el servicio.
  handleLogin(): void {

    this.errorMessage = '';

    const success = this.authService.login(
      this.username,
      this.password
    );

    if (success) {
      // Cada usuario tiene su panel según el rol guardado en la sesión.
      const role = this.authService.currentUser()!.role;
      const home = role === 'admin' ? '/admin' : '/user-dashboard';
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

      // Aceptamos returnUrl solo si es el panel permitido para ese rol.
      const destination = returnUrl === home ? returnUrl : home;
      this.router.navigateByUrl(destination, { replaceUrl: true });
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}

