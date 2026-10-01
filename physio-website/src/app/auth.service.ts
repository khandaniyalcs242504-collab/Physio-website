import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  username: string;
}

export interface SetupCheckResponse {
  setupNeeded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'physiocare_admin_token';

  constructor(private http: HttpClient) {}

  checkSetup(): Observable<SetupCheckResponse> {
    return this.http.get<SetupCheckResponse>(`${this.apiUrl}/check-setup`);
  }

  setupAdmin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/setup`, { username, password });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
