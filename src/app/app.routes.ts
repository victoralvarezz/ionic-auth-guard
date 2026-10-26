
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page')
        .then(m => m.LoginPage)
  },

  {
    path: 'admin',
    // Primero comprobamos la sesión y después el rol.
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
      import('./pages/admin/admin.page')
        .then(m => m.AdminPage)
  },

  {
    path: 'user-dashboard',
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' },
    loadComponent: () => import('./pages/user-dashboard/user-dashboard.page').then( m => m.UserDashboardPage)
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
