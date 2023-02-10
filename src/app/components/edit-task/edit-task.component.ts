import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { UiService } from 'src/app/service/ui.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Output() onEditTask: EventEmitter<any> = new EventEmitter();
  @Input() toggleEditTask: boolean = false;
  @Output() onToggleEditTask: EventEmitter<any> = new EventEmitter();
  subscription!: Subscription;
  subscription_2!: Subscription;
  projectId!: string;
  title!: string;
  date!: string;
  details!: string;
  members!: string;
  showAddProject!: boolean;
  project!: any;
  tasks!: any;
  @Input() taskToEdit!: any;
  showEditTask: boolean = false;
  isLoading: boolean = false;

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.subscription = this.uiService
      .onToggleEditTask()
      .subscribe((value) => (this.toggleEditTask = value));

    this.subscription_2 = this.uiService
      .onToggleTaskToEdit()
      .subscribe((value) => (this.taskToEdit = value));
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      this.projectService
        .getSingleProject(this.projectId)
        .subscribe((project) => {
          this.project = project;
          this.tasks = project.tasks;
        });
    });
  }

  toggleForm() {
    this.uiService.toggleEditTask();
    this.taskToEdit = null;
  }

  onSubmit() {
    this.isLoading = true;

    const newTask = {
      id: this.taskToEdit.id,
      title: this.title ? this.title : this.taskToEdit.title,
      date: this.date ? this.date : this.taskToEdit.date,
      details: this.details ? this.details : this.taskToEdit.details,
      members: this.members,
    };

    if (
      !newTask.title ||
      !newTask.date ||
      !newTask.details ||
      !newTask.members
    ) {
      this.toastr.error('You must fill all the fields', 'Error');
      this.isLoading = false;
    } else {
      let newTasks: any[] = [];
      let newProject;

      this.projectService
        .getSingleProject(this.projectId)
        .subscribe((project) => {
          newProject = project;
          this.project.tasks.map((task: any) => {
            if (task.id === newTask.id) {
              newTasks.push(newTask);
            } else {
              newTasks.push(task);
            }
          });
          // console.log(newTasks)
          newProject.tasks = newTasks;
          console.log(newProject);
          this.projectService
            .updateSingleProject(this.projectId, newProject)
            .subscribe((result) => {
              this.toggleForm();
              this.onEditTask.emit(result);
              this.isLoading = false;
            });
        });
    }
  }
}
