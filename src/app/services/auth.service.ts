import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LoginRequest, LoginResponse, RefreshTokenRequest } from '../models/general.models';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = 'https://frontendtest-backend.azurewebsites.net/api/Users';
  private ACCESS_TOKEN: string = '';
  private REFRESH_TOKEN: string = '';

  constructor(private http: HttpClient) { }

  //TOKEN
  getToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN)!;
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN)!;
  }

  saveToken(token: any): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: any): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  //LOGIN
  login(loginData: any): Observable<any> {
    this.removeToken();
    this.removeRefreshToken();
    // const body = new HttpParams()
    //   .set('email', loginData.email)
    //   .set('password', loginData.password)
    //   .set('grant_type', 'password');
    const headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.API_URL}/Login`, loginData, { headers })
      .pipe(
        tap((res: any) => {
          this.saveToken(res.access_token);
          this.saveRefreshToken(res.refresh_token);
        }),
        catchError((error: any) => this.handleError(error))
      );
  }

  //REFRESH TOKEN
  refreshToken(refreshData: any): Observable<any> {
    this.removeToken();
    this.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    const headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(`${this.API_URL}/RefreshToken`, body, { headers })
      .pipe(
        tap((res: any) => {
          this.saveToken(res.access_token);
          this.saveRefreshToken(res.refresh_token);
        }),
        catchError((error: any) => this.handleError(error))
      );
  }

  //LOGOUT
  logout(): Observable<any> {
    this.removeToken();
    this.removeRefreshToken();
    return this.http.get(`${this.API_URL}/Logout`);
  }

  secured(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'secret')
      .pipe(catchError((error: any) => this.handleError(error)));
  }

  //GESTIONE ERRORI
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Si è verificato un errore:', error.error.message);
    } else {
      console.error(
        `Backend ritorna codice ${error.status}, ` +
        `il body è: ${error.error}`);
    }
    return throwError(() => new Error('Per favore riprova più tardi.'));
  }

  private static log(message: string): any {
    console.log(message);
  }
  
}
