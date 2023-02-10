import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { FaLayersTextComponent } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<any> = new EventEmitter();
  showAddTask!: boolean;
  subscription!: Subscription;
  projectId!: string;
  title!: string;
  date!: string;
  details!: string;
  members: string[] = [];
  showAddProject!: boolean;
  project: any = []
  tasks!: any;
  isLoading = false

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.subscription = this.uiService
      .onToggleAddTask()
      .subscribe((value) => (this.showAddTask = value));

    
  }

  ngOnInit() {
    // get URL id
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
      // get project and its tasks
      this.projectService
        .getSingleProject(this.projectId)
        .subscribe((project) => {
          this.project = project;
          this.tasks = project.tasks;
        });
    });
  }

  toggleForm() {
    this.uiService.toggleAddTask();
  }

  onSubmit() {

    // console.log(this.project.tasks.slice(-1))
    this.isLoading = true
    this.projectService.getSingleProject(this.projectId).subscribe(project => {
      this.project = project

      if(!this.title || !this.date || !this.details || !this.members) {
        this.isLoading = false
        this.toastr.error('You must fill all the fields.', 'Error!')
      } else {

        const task = {
          id: !this.project.tasks || this.project.tasks?.length === 0 ? 0 : this.project.tasks.slice(-1)[0].id + 1,
          title: this.title,
          date: this.date,
          details: this.details,
          members: this.members,
          status: true
        }
    
        if (!this.project.tasks) {
          this.project.tasks = [task]
        } else {
          this.project.tasks.push(task)
        }
    
        console.log(this.project);
        // Save it to the database
        this.projectService.updateSingleProject(this.projectId, this.project).subscribe((result) => {
          this.tasks = result.tasks
          this.onAddTask.emit(result.tasks)
          this.projectService.getProjects().subscribe((result) => {
            this.projectService.listenerProjects(result)
          });
        })
        this.toggleForm();
        this.isLoading = false
    
        this.title = ''
        this.date = ''
        this.details = ''

        

      }

      

    })
  }
}
