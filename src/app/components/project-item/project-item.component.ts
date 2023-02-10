import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from 'src/app/service/user.service';
import { UserProject } from 'src/app/User';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { HostListener } from "@angular/core";
import { UiService } from 'src/app/service/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class ProjectItemComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  @Input() project!: any;
  @Input() category!: any;
  @Input() i!: any;
  @Input() projects!: Project[];
  showMoreDropbox: boolean = false;
  selectedIndex = -1;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateProjectStatus: EventEmitter<any> = new EventEmitter();
  @Output() onEditProject: EventEmitter<any> = new EventEmitter();
  faUser = faUser
  screenHeight!: number;
  screenWidth!: number;
  subscription!: Subscription

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private uiService: UiService
  ) {

    this.getScreenSize();

  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?: any) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
    }

  ngOnInit(): void {

  }

  ngOnChanges() {
    // console.log('change...')
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const dropdown = document.querySelector('.dropdown-container');
    const button = document.querySelector('.dropdown-option');
    
    if (!dropdown?.contains(event.target)) {

      this.selectedIndex = -1

    }
  }

  openProjectItem() {
    if (this.screenWidth <= 770) {
      this.uiService.closeShowProjectList()
      this.uiService.toggleShowMenu()
    }
    
  }

  openProject(id: any) {
    this.router.navigateByUrl(`/project/${id}`);
  }

  getTextColor(category: string) {
    switch (category) {
      case 'Software':
        return '#0BBF35';
      case 'Marketing':
        return '#20C0F7';
      case 'Administration':
        return '#ebbc00';
      default:
        return '#d5d0bd';
    }
  }

  getColor(category: string) {
    switch (category) {
      case 'Software':
        return '#193E2D;';
      case 'Marketing':
        return '#237692';
      case 'Administration':
        return '#91770c';
        case 'Design':
          return '#bf350b';
      default:
        return '#0BBF35';
    }
  }

  getBorder(category: string): string {
    switch (category) {
      case 'Software':
        return '1px solid #0BBF35';
      case 'Marketing':
        return '1px solid #20C0F7';
      case 'Administration':
        return '1px solid #F4C222';
      case 'Design':
        return '1px solid #bf350b';
      default:
        return '1px solid #0BBF35';
    }
  }

  getLeftBorder(category: string): string {
    switch (category) {
      case 'Software':
        return '4px solid #0BBF35';
      case 'Marketing':
        return '4px solid #20C0F7';
      case 'Administration':
        return '4px solid #F4C222';
      case 'Design':
        return '4px solid #bf350b';
      default:
        return '4px solid #0BBF35';
    }
  }

  editProject(project: any) {
    this.onEditProject.emit(project);
  }

  moreFunction(index: any) {
    this.showMoreDropbox = !this.showMoreDropbox;

    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  deleteProject(id: any) {
    this.projectService.deleteProject(id).subscribe();
    this.projectService.getProjects().subscribe((result) => {
      this.onDelete.emit();
      this.projectService.listenerProjects(result)
    });
    this.router.navigate(['/project/']);

    this.userService.getUsers().subscribe((users) => {

      users.map((user) => {
        if (user.projects) {
          let new_projects: UserProject[] = [];
          user.projects.map(
            (project: { status: boolean; id: any; title: any }) => {
              if (project.id !== id) {
                new_projects.push({
                  id: project.id,
                  title: project.title,
                  status: project.status,
                });
              }
              user.projects = new_projects;
              this.userService.updateSingleUser(user.id, user).subscribe(result => console.log('Project deleted from users'))
            }
          );
        }
      });
    });
  }

  updateProjectStatus(id: any) {

    this.onUpdateProjectStatus.emit(id);

  }
}
