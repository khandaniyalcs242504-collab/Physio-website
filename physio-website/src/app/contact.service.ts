import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactInfo {
  _id?: string;
  phones?: string[];
  emails?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://physio-website-7t48.onrender.com/api/contact';

  constructor(private http: HttpClient) {}

  getContact(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(this.apiUrl);
  }

  updateContact(contact: ContactInfo): Observable<ContactInfo> {
    return this.http.put<ContactInfo>(this.apiUrl, contact);
  }
}