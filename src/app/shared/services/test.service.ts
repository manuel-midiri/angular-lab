import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestListResult, TestRequest } from 'src/app/models/general.models';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = '/api/Tests';

  constructor(private http: HttpClient) {}

  getTests(): Observable<TestListResult> {
    return this.http.get<TestListResult>(`${this.baseUrl}`);
  }

  getTestById(id: string): Observable<Test> {
    return this.http.get<Test>(`${this.baseUrl}/${id}`);
  }

  createTest(testData: TestRequest): Observable<Test> {
    return this.http.post<Test>(`${this.baseUrl}`, testData);
  }

  updateTest(id: string, testData: TestRequest): Observable<Test> {
    return this.http.put<Test>(`${this.baseUrl}/${id}`, testData);
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}