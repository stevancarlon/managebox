import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/service/ui.service';
import { Subscription } from 'rxjs';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { HostListener } from "@angular/core";


@Component({
  selector: 'app-project-tasks-item',
  templateUrl: './project-tasks-item.component.html',
  styleUrls: ['./project-tasks-item.component.css']
})
export class ProjectTasksItemComponent implements OnInit {
  faEllipsisV = faEllipsisV
  faClock = faClock
  faPaperclip = faPaperclip
  selectedIndex = -1;
  @Input() i!: any
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateProjectStatus: EventEmitter<any> = new EventEmitter();
  @Output() onShowEditTask: EventEmitter<any> = new EventEmitter();
  toggleAddMember: boolean = false

  @Input() task!: any
  project: any = []
  project_id!: any
  new_tasks: any = []
  subscription!: Subscription;
  @Input() toggleEditTask: boolean = false;
  faUser = faUser

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggleEditTask()
      .subscribe((value) => (this.toggleEditTask = value));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.project_id = params['id']
      this.projectService.getSingleProject(this.project_id).subscribe(project => this.project = project)
    })
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const dropdown = document.getElementById(this.selectedIndex.toString())


    if (dropdown?.id === this.selectedIndex.toString()) {
      if(!dropdown?.contains(event.target)) {
        this.selectedIndex = -1
      }
    }
    
  }

  deleteTask(task_id: any) {
    // let new_tasks = []
    this.route.params.subscribe(params => {
      this.project_id = params['id']
      this.projectService.getSingleProject(this.project_id).subscribe(project => {
        this.project = project
        console.log(project.tasks)
        // console.log(project.tasks)
        if (project.tasks) {
          // console.log('if project.tasks')
          project.tasks.map(task => {
            // console.log('tasks map')
            console.log(task.id)
            if (task.id != task_id) {
              this.new_tasks.push(task)
              console.log('pushing tasks')
            }
          })
        }
        this.project.tasks = this.new_tasks
        console.log(this.project)
        this.projectService.updateSingleProject(this.project_id, this.project).subscribe(result => {
          this.projectService.getProjects().subscribe((result) => {
            this.projectService.listenerProjects(result)
          });
        })
        
        this.onDelete.emit(this.project)
      })
    })
  }

  updateTaskStatus(id: any) {
    // this.onUpdateProjectStatus.emit(id);
    console.log('updte task status')
    this.onUpdateProjectStatus.emit(id)
  }

  moreFunction(index: any) {
    // this.showMoreDropbox = !this.showMoreDropbox;
    // console.log(index)
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  editTask(task: any) {

    // console.log(task)
    this.onShowEditTask.emit(task)
  }

  toggleForm() {
    this.uiService.toggleEditTask();
    this.uiService.toggleTaskToEdit(this.task);
  }

  triggerAddMember() {
    this.projectService.getTasks(this.project_id).subscribe(tasks => {
      tasks.map((task: { id: any; }) => {
        if(task.id === this.task.id) {
          this.task = task
        }
      })
    })

    this.toggleAddMember = !this.toggleAddMember
    
  }

  addMember() {

    // console.log(this.task.id)
    let newProject: any;
    let newTasks: any = []
    console.log(this.project_id)
    this.projectService.getSingleProject(this.project_id).subscribe(project => {
      newProject = project
      project.tasks?.map(task => {
        if(task.id === this.task.id) {
          newTasks.push(this.task)
        } else {
          newTasks.push(task)
        }
      newProject.tasks = newTasks
      this.projectService.updateSingleProject(project.id, newProject).subscribe()
      })
    })
    
    // this.projectService.updateSingleProject(this.project_id)

    this.triggerAddMember()
  }

}
