import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Skill {
  _id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly baseUrl = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/skills`);
  }

  addSkill(name: string): Observable<Skill> {
    const trimmed = name.trim();
    return this.http.post<Skill>(`${this.baseUrl}/skills`, {
      name: trimmed,
    });
  }

  deleteSkill(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/skills/${id}`);
  }
}

