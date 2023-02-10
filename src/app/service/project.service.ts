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

  private apiUrl = 'https://managebox-fake-server.onrender.com/projects'

  private currentProjects!: any
  private subjectCurrentProjects = new Subject<any>()

  constructor(private http:HttpClient) { }

  listenerProjects(projects: any) {
    this.currentProjects = projects
    this.subjectCurrentProjects.next(this.currentProjects)
    // console.log('open show menu' + this.showMenu)
  }

  onListenerProjects(): Observable<any> {
    return this.subjectCurrentProjects.asObservable()
  }

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
