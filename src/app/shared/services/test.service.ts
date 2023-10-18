import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestListResult, TestRequest } from 'src/app/models/general.models';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'https://frontendtest-backend.azurewebsites.net/api/Tests';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTests(): Observable<TestListResult> {
    const headers = this.authService.addToken();
    return this.http.get<TestListResult>(`${this.baseUrl}`, { headers });
  }

  getTestById(id: string): Observable<Test> {
    const headers = this.authService.addToken();
    return this.http.get<Test>(`${this.baseUrl}/${id}`, { headers });
  }

  createTest(testData: TestRequest): Observable<Test> {
    const headers = this.authService.addToken();
    return this.http.post<Test>(`${this.baseUrl}`, testData, { headers });
  }

  updateTest(id: string, testData: TestRequest): Observable<Test> {
    const headers = this.authService.addToken();
    return this.http.put<Test>(`${this.baseUrl}/${id}`, testData, { headers });
  }

  deleteTest(id: string): Observable<any> {
    const headers = this.authService.addToken();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

}