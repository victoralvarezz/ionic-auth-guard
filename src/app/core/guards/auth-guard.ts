
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  // Obtenemos el servicio de autenticacion
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario ha iniciado sesion, puede entrar
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no ha iniciado sesion, vuelve al login
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });

};
