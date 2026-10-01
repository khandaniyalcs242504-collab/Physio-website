import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Certificate {
  _id?: string;
  title?: string;
  imageUrl?: string;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  private apiUrl = 'http://localhost:5000/api/certificates';
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiUrl);
  }

  createCertificate(formData: FormData): Observable<Certificate> {
    return this.http.post<Certificate>(this.apiUrl, formData);
  }

  deleteCertificate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) return '';
    return `${this.baseUrl}${imageUrl}`;
  }
}