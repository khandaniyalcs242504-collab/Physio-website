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

  private apiUrl = 'https://physio-website-7r48.onrender.com/api/about';
  private baseUrl = 'https://physio-website-7r48.onrender.com';

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