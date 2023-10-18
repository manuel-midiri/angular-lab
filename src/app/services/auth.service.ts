import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse, RefreshTokenRequest, User } from '../models/general.models';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = 'https://frontendtest-backend.azurewebsites.net/api/Users';
  public userDetailBS: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  public userDetail$: Observable<User> = this.userDetailBS.asObservable();

  constructor(private http: HttpClient) { }

  //GESTIONE TOKEN
  public getToken(): string {
    return localStorage.getItem('access_token_labanalysis')!;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token_labanalysis')!;
  }

  public getRole(): string {
    return localStorage.getItem('role')!;
  }

  public saveToken(token: any, expirationDate: any): void {
    localStorage.setItem('access_token_labanalysis', token);
    localStorage.setItem('access_token_labanalysis_expirationDate', expirationDate);
  }

  public saveRefreshToken(refreshToken: any, expirationDate: any): void {
    localStorage.setItem('refresh_token_labanalysis', refreshToken);
    localStorage.setItem('refresh_token_labanalysis_expirationDate', expirationDate);
  }

  public saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  public removeToken(): void {
    localStorage.removeItem('access_token_labanalysis');
    localStorage.removeItem('access_token_labanalysis_expirationDate');
  }

  public removeRefreshToken(): void {
    localStorage.removeItem('refresh_token_labanalysis');
    localStorage.removeItem('refresh_token_labanalysis_expirationDate');
  }

  public addToken(): HttpHeaders {
    const token = 'il_tuo_token';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  //LOGIN
  public login(loginData: LoginRequest): Observable<LoginResponse> {
    this.removeToken();
    this.removeRefreshToken();
    const headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post<LoginResponse>(`${this.API_URL}/Login`, loginData, { headers })
  }

  //REFRESH TOKEN
  public refreshToken(refreshData: RefreshTokenRequest): Observable<LoginResponse> {
    this.removeToken();
    this.removeRefreshToken();
    const headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post<LoginResponse>(`${this.API_URL}/RefreshToken`, refreshData, { headers })
  }

  //LOGOUT
  public logout(): Observable<any> {
    const headers: any = this.addToken();
    this.removeToken();
    this.removeRefreshToken();
    return this.http.get(`${this.API_URL}/Logout`, { headers });
  }

  public secured(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'secret')
      .pipe(catchError((error: any) => this.handleError(error)));
  }

  public userInfo(): Observable<User> {
    const headers: any = this.addToken();
    return this.http.get<User>(`${this.API_URL}/Me`, { headers })
  }

  //GESTIONE ERRORI
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Si è verificato un errore:', error.error.message);
    } else {
      console.error(
        `Backend ritorna codice ${error.status}, ` +
        `il body è: ${error}`);
    }
    return throwError(() => new Error('Per favore riprova più tardi.'));
  }
  
}
