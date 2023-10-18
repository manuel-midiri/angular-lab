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

  getSamples(): Observable<SampleListResult> {
    return this.http.get<SampleListResult>(`${this.baseUrl}`);
  }

  getSampleById(id: string): Observable<Sample> {
    return this.http.get<Sample>(`${this.baseUrl}/${id}`);
  }

  createSample(sampleData: SampleRequest): Observable<Sample> {
    return this.http.post<Sample>(`${this.baseUrl}`, sampleData);
  }

  updateSample(id: string, sampleData: SampleRequest): Observable<Sample> {
    return this.http.put<Sample>(`${this.baseUrl}/${id}`, sampleData);
  }

  deleteSample(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
