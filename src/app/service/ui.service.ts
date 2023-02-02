import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddProject: boolean = false
  private subjectAddProject = new Subject<any>()
  private showAddTask: boolean = false
  private subjectAddTask = new Subject<any>()

  constructor() { }

  toggleAddProject() :void {
    this.showAddProject = !this.showAddProject
    this.subjectAddProject.next(this.showAddProject)
  }

  onToggle(): Observable<any> {
    return this.subjectAddProject.asObservable()
  }

  toggleAddTask() :void {
    this.showAddTask = !this.showAddTask
    this.subjectAddTask.next(this.showAddTask)
  }
  onToggleAddTask(): Observable<any> {
    return this.subjectAddTask.asObservable()
  }

 
}
