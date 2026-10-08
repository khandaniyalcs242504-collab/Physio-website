import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  private cacheKey = 'physiocare_about';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>(this.apiUrl).pipe(
      tap((data) => {
        localStorage.setItem(this.cacheKey, JSON.stringify(data));
      })
    );
  }

  getCachedAbout(): AboutInfo | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);

      if (!cached) {
        return null;
      }

      return JSON.parse(cached);
    } catch (error) {
      console.error('Error reading cached about info:', error);
      return null;
    }
  }

  updateAbout(formData: FormData): Observable<AboutInfo> {
    return this.http.put<AboutInfo>(this.apiUrl, formData).pipe(
      tap((data) => {
        localStorage.setItem(this.cacheKey, JSON.stringify(data));
      })
    );
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) {
      return '';
    }

    return `${this.baseUrl}${imageUrl}`;
  }
}