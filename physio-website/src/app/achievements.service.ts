import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Achievement {
  _id?: string;
  title: string;
  description: string;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  private apiUrl = 'https://physio-website-7t48.onrender.com/api/achievements';

  constructor(private http: HttpClient) {}

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.apiUrl);
  }

  getAchievementById(id: string): Observable<Achievement> {
    return this.http.get<Achievement>(`${this.apiUrl}/${id}`);
  }

  createAchievement(item: Achievement): Observable<Achievement> {
    return this.http.post<Achievement>(this.apiUrl, item);
  }

  updateAchievement(id: string, item: Achievement): Observable<Achievement> {
    return this.http.put<Achievement>(`${this.apiUrl}/${id}`, item);
  }

  deleteAchievement(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}