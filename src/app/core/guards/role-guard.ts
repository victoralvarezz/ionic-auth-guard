import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService, UserSession } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Cada ruta indica en data qué rol puede entrar.
  const requiredRole = route.data['role'] as UserSession['role'];

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // Si coincide con el rol del usuario, dejamos entrar.
  if (authService.hasRole(requiredRole)) {
    return true;
  }

  // Si tiene otro rol, lo enviamos a su propio panel.
  const home = authService.hasRole('admin') ? '/admin' : '/user-dashboard';
  return router.createUrlTree([home]);
};
