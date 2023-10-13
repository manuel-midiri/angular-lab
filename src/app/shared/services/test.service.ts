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

  getTests(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTestById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTest(testData: { sampleId: string, name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, testData);
  }

  updateTest(id: string, testData: { sampleId: string, name: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, testData);
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}