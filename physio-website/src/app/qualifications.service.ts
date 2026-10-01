import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QualificationCard {
  _id?: string;
  title: string;
  type?: string;
  institution?: string;
  year?: string;
  icon?: string;
  description: string;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {

  private apiUrl = 'http://https://physio-website-7t48.onrender.com/api/qualification-cards';

  constructor(private http: HttpClient) {}

  getQualifications(): Observable<QualificationCard[]> {
    return this.http.get<QualificationCard[]>(this.apiUrl);
  }

  getQualificationById(id: string): Observable<QualificationCard> {
    return this.http.get<QualificationCard>(`${this.apiUrl}/${id}`);
  }

  createQualification(item: QualificationCard): Observable<QualificationCard> {
    return this.http.post<QualificationCard>(this.apiUrl, item);
  }

  updateQualification(id: string, item: QualificationCard): Observable<QualificationCard> {
    return this.http.put<QualificationCard>(`${this.apiUrl}/${id}`, item);
  }

  deleteQualification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}