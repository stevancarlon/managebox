import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UiService } from 'src/app/service/ui.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter();
  title!: string;
  date!: string;
  description!: string;
  members!: string[];
  category!: string;
  showAddProject!: boolean;
  subscription!: Subscription;
  projects: Project[] = [];
  users!: any;
  @Input() newProjectLoading: boolean = false;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private uiService: UiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddProject = value));

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      // console.log(this.users)
    });
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  toggleForm() {
    this.uiService.toggleAddProject();
  }

  onSubmit() {
    if (!this.date || !this.description || !this.members || !this.category) {
      this.toastr.error('You must fill all the fields..', 'Error!');
    } else {

      const newProject = {
        title: this.title,
        description: this.description,
        date: this.date,
        members: this.members,
        status: true,
        category: this.category,
      };
  
      this.onAddProject.emit(newProject);
  
      this.router.navigate(['/project/']);
  
      this.title = '';
      this.description = '';
      this.date = '';
      this.members = [];

      this.toggleForm()
      this.toastr.success('Your project was created.', 'Success!')
    }

    }

    
}
