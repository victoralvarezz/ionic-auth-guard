
import { Injectable, signal, computed } from '@angular/core';

export interface UserSession {
  username: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'DAM2_AUTH_SESSION';

  // La Signal empieza con la sesión guardada, si existe.
  private _currentUser = signal<UserSession | null>(
    this.readSessionFromStorage()
  );

  // Las páginas pueden leerla, pero solo este servicio puede cambiarla.
  public currentUser = this._currentUser.asReadonly();

  // Este valor se actualiza solo cuando cambia el usuario actual.
  public isAuthenticated = computed(() =>
    this._currentUser()?.isAuthenticated ?? false
  );

  // Credenciales de prueba para esta práctica.
  public login(user: string, pass: string): boolean {

    let role: 'admin' | 'user';

    if (user === 'admin' && pass === '123') {
      role = 'admin';

    } else if (user === 'operador' && pass === '123') {
      role = 'user';

    } else {
      return false;
    }

    const sessionData: UserSession = {
      username: user,
      role: role,
      isAuthenticated: true
    };

    // Actualizamos la Signal y guardamos la sesión para mantenerla al recargar.
    this._currentUser.set(sessionData);

    sessionStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(sessionData)
    );

    return true;
  }

  // El guard usa este método para comprobar el rol permitido.
  public hasRole(role: 'admin' | 'user'): boolean {
    return this._currentUser()?.role === role;
  }

  // Borramos la sesión de memoria y del navegador.
  public logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this._currentUser.set(null);
  }

  // sessionStorage conserva la sesión solo en esta pestaña.
  private readSessionFromStorage(): UserSession | null {

    if (typeof sessionStorage === 'undefined') {
      return null;
    }

    const rawData = sessionStorage.getItem(this.STORAGE_KEY);

    if (!rawData) {
      return null;
    }

    try {
      return JSON.parse(rawData) as UserSession;
    } catch {
      sessionStorage.removeItem(this.STORAGE_KEY);
      return null;
    }
  }
}
