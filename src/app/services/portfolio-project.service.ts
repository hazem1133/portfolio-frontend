import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PortfolioProject {
  _id?: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioProjectService {
  private readonly baseUrl = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<PortfolioProject[]> {
    return this.http.get<PortfolioProject[]>(`${this.baseUrl}/projects`);
  }

  addProject(project: PortfolioProject): Observable<PortfolioProject> {
    return this.http.post<PortfolioProject>(`${this.baseUrl}/projects`, project);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`);
  }
}

