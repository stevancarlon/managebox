import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  @Input() showEditProject: boolean = false;
  @Output() onToggle: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateCategories: EventEmitter<any> = new EventEmitter();
  title!: string;
  date!: string;
  category!: string;
  members!: string[];
  description!: string;
  @Input() projectToEdit!: any;
  // showEditTask: boolean = false
  users!: any;
  // subscription!: Subscription
  isLoading: boolean = false;

  ngOnInit() {
    // console.log(this.projectToEdit)
  }

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit() {
    this.isLoading = true;

    this.projectToEdit.title = this.title
      ? this.title
      : this.projectToEdit.title;
    this.projectToEdit.date = this.date ? this.date : this.projectToEdit.date;
    this.projectToEdit.description = this.description
      ? this.description
      : this.projectToEdit.details;
    this.projectToEdit.category = this.category
      ? this.category
      : this.projectToEdit.category;
    this.projectToEdit.members = this.members
      ? this.members
      : this.projectToEdit.members;

    if (
      !this.projectToEdit.title ||
      !this.projectToEdit.date ||
      !this.projectToEdit.description ||
      !this.projectToEdit.category ||
      !this.projectToEdit.members
    ) {
      this.toastr.error('You must fill all the fields.', 'Error!');
      this.isLoading = false;
    } else {
      this.projectService
        .updateSingleProject(this.projectToEdit.id, this.projectToEdit)
        .subscribe((result) => {
          this.router.navigate(['/project/']);

          const timing = (id: any) => {
            this.router.navigate(['/project/', id]);
          };

          setTimeout(() => timing(result.id), 100);
        });
      this.isLoading = false;
      this.toggleForm();
      this.onUpdateCategories.emit();
    }
  }

  toggleForm() {
    // this.showEditProject = !this.showEditProject
    this.onToggle.emit();
  }
}
