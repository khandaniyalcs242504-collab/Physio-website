import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GalleryItem {
  _id?: string;
  title: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = 'https://physio-website-7t48.onrender.com/api/gallery';
  private baseUrl = 'https://physio-website-7t48.onrender.com';

  constructor(private http: HttpClient) {}

  getGalleryItems(): Observable<GalleryItem[]> {
    return this.http.get<GalleryItem[]>(this.apiUrl);
  }

  getGalleryItemById(id: string): Observable<GalleryItem> {
    return this.http.get<GalleryItem>(`${this.apiUrl}/${id}`);
  }

  createGalleryItem(formData: FormData): Observable<GalleryItem> {
    return this.http.post<GalleryItem>(this.apiUrl, formData);
  }

  updateGalleryItem(id: string, formData: FormData): Observable<GalleryItem> {
    return this.http.put<GalleryItem>(`${this.apiUrl}/${id}`, formData);
  }

  deleteGalleryItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFullImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) return '';
    return `${this.baseUrl}${imageUrl}`;
  }
}