import { Component, Input, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { UiService } from 'src/app/service/ui.service';
import { Task } from 'src/app/Project';
import { Subject } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProjectTasksComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  faClock = faClock;
  faPaperclip = faPaperclip;
  faThumbTack = faListCheck

  projectId!: string;
  projectTitle!: string;
  projectMembers!: string[];
  tasks!: Task[] | undefined;
  project!: any;
  taskToEdit!: any
  // project!: any
  @Input() toggleEditTask: boolean = false

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
      if (this.projectId) {
        this.projectService
          .getSingleProject(this.projectId)
          .subscribe((project) => {
            this.projectTitle = project.title;
            this.projectMembers = project.members;
            this.tasks = project.tasks;
            this.project = project;

            // Add a new subscription for project.status changes
            this.projectService
              .getProjectStatusChanges(this.projectId)
              .subscribe((status) => {
                this.project.status = status;
              });
          });
        // console.log('[ngOnInit] project-tasks component')
      }

      this.projectService.getTasks(this.projectId).subscribe((result) => {
        this.tasks = result;
      });
    });
  }

  updateProject(event: any) {
    console.log('event')
    console.log(event)
    this.project = event
    this.tasks = this.project.tasks
  }

  toggleNewTask() {
    this.uiService.toggleAddTask();
  }

  updateTasks(task: any) {
    this.tasks = task;
  }


  showEditTask(task: any) {
    this.toggleEditTask = !this.toggleEditTask
    this.taskToEdit = task
    console.log(this.taskToEdit)
  }

  updateProjectStatus(id: any) {
    console.log(id)
    console.log(this.tasks)
    
    let new_task: Task[] | undefined = []

    this.tasks?.map(item => {
      console.log(item)
      if (item.id === id) {
        item.status = !item.status
        new_task?.push(item)
      } else {
        new_task?.push(item)
      }
    })
    this.tasks = new_task

    this.project.tasks = this.tasks

    this.projectService.updateSingleProject(this.projectId, this.project).subscribe()
        
  }
}
