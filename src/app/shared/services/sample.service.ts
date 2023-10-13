import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sample, SampleListResult, SampleRequest } from 'src/app/models/general.models';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  private baseUrl = '/api/Samples';

  constructor(private http: HttpClient) { }

  getSamples(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getSampleById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSample(sampleData: { name: string, description: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, sampleData);
  }

  updateSample(id: string, sampleData: { name: string, description: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, sampleData);
  }

  deleteSample(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
