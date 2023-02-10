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

  private showEditTask: boolean = false
  private subjectEditTask = new Subject<any>()

  private taskToEdit: any
  private subjectTaskToEdit = new Subject<any>()

  private showMenu: boolean = false
  private subjectShowMenu = new Subject<any>()

  private showProjectList: boolean = false
  private subjectShowProjectList = new Subject<any>()

  

  constructor() { }

  toggleShowMenu() {
    this.showMenu = !this.showMenu
    this.subjectShowMenu.next(this.showMenu)
    // console.log('toggle show menu' + this.showMenu)
    
  }

  openShowMenu() {
    this.showMenu = true
    this.subjectShowMenu.next(this.showMenu)
    // console.log('open show menu' + this.showMenu)
  }

  onToggleShowMenu(): Observable<any> {
    return this.subjectShowMenu.asObservable()
  }

  toggleShowProjectList() {
    this.showProjectList = !this.showProjectList
    this.subjectShowProjectList.next(this.showProjectList)
  }

  openShowProjectList() {
    this.showProjectList = true
    this.subjectShowProjectList.next(this.showProjectList)
  }

  closeShowProjectList() {
    this.showProjectList = false
    this.subjectShowProjectList.next(this.showProjectList)
  }

  onToggleShowProjectList(): Observable<any> {
    return this.subjectShowProjectList.asObservable()
  }

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

  toggleEditTask() :void {
    this.showEditTask = !this.showEditTask
    this.subjectEditTask.next(this.showEditTask)
  }
  onToggleEditTask(): Observable<any> {
    return this.subjectEditTask.asObservable()
  }

  toggleTaskToEdit(taskToEdit: any) :void {
    // console.log('toggleTaskToEdit triggering...')
    this.taskToEdit = taskToEdit
    this.subjectTaskToEdit.next(this.taskToEdit)
  }

  onToggleTaskToEdit(): Observable<any> {
    // console.log('onToggleTaskToEdit triggering...')
    return this.subjectTaskToEdit.asObservable()
  }
 
}
