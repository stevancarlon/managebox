import { Component, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { UiService } from 'src/app/service/ui.service';
import { Task } from 'src/app/Project';
import { Subject } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProjectTasksComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  faClock = faClock;
  faPaperclip = faPaperclip;

  projectId!: string;
  projectTitle!: string;
  projectMembers!: string[];
  tasks!: any;
  project!: any;
  // project!: any

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
            this.project = project
          });
        // console.log('[ngOnInit] project-tasks component')
      }

      this.projectService.getTasks(this.projectId).subscribe((result) => {
        console.log(result);
        this.tasks = result;
      });
    });
  }

  toggleNewTask() {
    this.uiService.toggleAddTask();
  }

  updateTasks(task: any) {
    this.tasks = task
  }

}
