import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  name: string;
  role: string;
  about: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<Profile | null> {
    return this.http.get<Profile | null>(`${this.baseUrl}/profile`);
  }

  saveProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/profile`, profile);
  }
}

