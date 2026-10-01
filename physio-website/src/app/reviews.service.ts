import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  _id?: string;
  name: string;
  reviewText: string;
  rating?: number;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiUrl = 'http://https://physio-website-7t48.onrender.com/api/reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  updateReview(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}