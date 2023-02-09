import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable, Subject} from 'rxjs'
import { Project, Task } from '../Project';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/projects'

  constructor(private http:HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl)
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project, httpOptions)
  }

  deleteProject(id: any): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/${id}`);
  }

  getSingleProject(id: any): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  getTasks(id: any):Observable<any> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      map(result => result.tasks)
    )
  }

  updateSingleProject(id: any, project: any): Observable<Project>{
    // console.log('Attempting updateSingleProject at project.service')
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project, httpOptions)
  }

  getProjectStatusChanges(id: any): Observable<any> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`)
    .pipe(
      map(project => project.status)
    );
  }

}
