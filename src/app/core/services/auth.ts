
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

  // Guardamos el usuario actual
  private _currentUser = signal<UserSession | null>(
    this.readSessionFromStorage()
  );

  public currentUser = this._currentUser.asReadonly();

  // Comprobamos si ha iniciado sesión
  public isAuthenticated = computed(() =>
    this._currentUser()?.isAuthenticated ?? false
  );

  // Iniciar sesión
  public login(user: string, pass: string): boolean {

    let role: 'admin' | 'user';

    // Administrador
    if (user === 'admin' && pass === '123') {
      role = 'admin';

    // Operador
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

    // Guardamos la sesión
    this._currentUser.set(sessionData);

    sessionStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(sessionData)
    );

    return true;
  }

  // Comprobar el rol del usuario
  public hasRole(role: 'admin' | 'user'): boolean {
    return this._currentUser()?.role === role;
  }

  // Cerrar sesión
  public logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this._currentUser.set(null);
  }

  // Recuperar la sesión almacenada
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
