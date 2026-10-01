import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AboutInfo {
  _id?: string;
  experience?: string;
  patientsTreated?: string;
  photoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private apiUrl = 'http://localhost:5000/api/about';
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>(this.apiUrl);
  }

  updateAbout(formData: FormData): Observable<AboutInfo> {
    return this.http.put<AboutInfo>(this.apiUrl, formData);
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) return '';
    return `${this.baseUrl}${imageUrl}`;
  }
}