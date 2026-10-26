
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  IonButtons,
  IonButton
} from '@ionic/angular';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButtons,
    IonButton
  ]
})
export class AdminPage {

  private authService = inject(AuthService);
  private router = inject(Router);

  // Obtener los datos del usuario conectado
  currentSession = this.authService.currentUser;

  // Cerrar la sesión
  handleLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login', {
      replaceUrl: true
    });
  }
}
