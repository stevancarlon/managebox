import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UiService } from 'src/app/service/ui.service';
import { ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { HostListener } from "@angular/core";

interface Touch {
  clientX: number;
}

interface TouchEvent {
  touches: Touch[];
  changedTouches: Touch[];
}


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('slide', [
      state(
        'all',
        style({
          transform: 'translateX(0%)',
        })
      ),
      state(
        'in-progress',
        style({
          transform: 'translateX(200%)',
        })
      ),
      state(
        'delivered',
        style({
          transform: 'translateX(460%)',
        })
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
    trigger('slide2', [
      state('left', style({ transform: 'translateX(-150%)' })),
      state('right', style({ transform: 'translateX(0)' })),
      transition('left => right', animate('300ms ease-in')),
      transition('right => left', animate('300ms ease-out'))
    ])
  ],
})
export class ProjectsComponent implements OnInit {
  faSearch = faSearch;
  @Input() projects: Project[] = [];
  categories_list: any[] = [];
  selected: string = 'all';
  cur_project!: Project;
  @Output() onChangeStatus: EventEmitter<Project> = new EventEmitter();
  showEditProject!: boolean;
  projectToEdit!: any;
  isLoading = false;
  newProjectLoading = false
  color = '#fff'
  search: string = ''
  subscription!: Subscription;
  subscription2!: Subscription;
  showProjectList!: boolean
  screenHeight!: number;
  screenWidth!: number;
  startX!: number

  constructor(
    private projectService: ProjectService,
    private uiService: UiService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private userService: UserService
  ) {

    this.subscription = this.uiService.onToggleShowProjectList().subscribe(value => this.showProjectList = value)
    this.getScreenSize();

    if (this.screenWidth > 770) {
      this.showProjectList = true
    }

    this.subscription2 = this.projectService.onListenerProjects().subscribe(projects => {
      this.projects = projects
    })

  }

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?: any) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          if(this.screenWidth >= 770) {
            this.uiService.openShowProjectList()
            this.uiService.openShowMenu()
          }
    }

    @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    if (this.startX > endX + 50) {
      this.uiService.toggleShowProjectList()
    }
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.projects.map((project) => {
        if (!this.categories_list.includes(project.category)) {
          this.categories_list.push(project.category);
        }
      });
    });
    this.projects.map((project) => {
      if (!this.categories_list.includes(project.category)) {
        this.categories_list.push(project.category);
      }
    });
  }

  searchSubmit() {
    let search_projects: Project[] = []
    let new_categories: any[] = []
    // console.log(this.search)

    this.projectService.getProjects().subscribe(projects => {

      projects.map(project => {
        if(project.title.toUpperCase().indexOf(this.search.toUpperCase()) > -1) {
          if(!new_categories.includes(project.category)) {
            new_categories.push(project.category)
          }
          this.categories_list = new_categories
          search_projects.push(project)
        }
      })
      this.projects = search_projects

    })
  }

  editProject(project: any) {
    this.showEditProject = !this.showEditProject;
    this.projectToEdit = project;
  }

  updateCategories() {
    let new_categories: any = []
    this.projects.map(project => {
      if(!new_categories.includes(project.category)) {
        new_categories.push(project.category)
      }
    })

    this.categories_list = new_categories

  }

  toggleForm() {
    this.uiService.toggleAddProject();
  }

  addProject(project: Project) {
    this.newProjectLoading = true
    this.projectService.addProject(project).subscribe((task) => {

      if (!this.categories_list.includes(project.category)) {
        this.categories_list.push(project.category);
      }

      this.projectService.getProjects().subscribe((projects) => {
        this.projects = projects;
      });
      this.cd.detectChanges();

      this.userService.getUsers().subscribe((users) => {
        users.map((user) => {
          if (project.members.includes(user.username)) {
            const project_user = {
              id: task.id,
              title: project.title,
              status: project.status,
            };

            if (user.projects) {
              user.projects.push(project_user);
            } else {
              user.projects = [project_user];
            }

            this.userService
              .updateSingleUser(user.id, user)
              .subscribe((result) => console.log('Adding project to user...'));
          }
        });
      });

      this.newProjectLoading = false

    });

  }

  updateProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.categories_list = [];
      this.projects.map((project) => {
        if (!this.categories_list.includes(project.category)) {
          this.categories_list.push(project.category);
        }
      });
      this.isLoading = false
    });
  }

  updateProjectStatus(id: any) {
    this.isLoading = true;
    this.projects = this.projects.map((project) => {
      if (project.id === id) {
        project.status = !project.status;
        this.cur_project = project;
        return project;
      } else {
        return project;
      }
    });

    this.projectService
      .updateSingleProject(id, this.cur_project)
      .subscribe((res) => {
        this.router.navigate(['/project/']);

        const timing = (id: any) => {
          this.router.navigate(['/project/', id]);
        };

        setTimeout(() => timing(id), 20);
        // this.router.navigate(['/project/', id]);

        this.projects = [];
        this.categories_list = [];

        this.projectService.getProjects().subscribe((result) => {
          result.map((project) => {
            if (this.selected === 'in-progress' && project.status) {
              this.projects.push(project);
            }
            if (this.selected === 'delivered' && !project.status) {
              this.projects.push(project);
            }
            if (this.selected === 'all') {
              this.projects.push(project);
            }
          });
          this.projects.map((project) => {
            if (!this.categories_list.includes(project.category)) {
              this.categories_list.push(project.category);
            }
          });
          this.isLoading = false;
        });
      });
  }

  changeLabel(label: any) {
    let new_categories;

    this.selected = label;
    if (label === 'all') {
      // console.log(label);

      this.projectService.getProjects().subscribe((projects) => {
        this.projects = [];
        this.projects = projects;
        this.categories_list = [];
        this.projects.map((project) => {
          if (!this.categories_list.includes(project.category)) {
            this.categories_list.push(project.category);
          }
        });
      });
    }

    if (label === 'in-progress') {
      // console.log(label);

      this.projects = [];
      this.projectService.getProjects().subscribe((projects) => {
        this.projects = projects.filter((project) => {
          return project.status === true;
        });
        this.categories_list = [];
        this.projects.map((project) => {
          if (!this.categories_list.includes(project.category)) {
            this.categories_list.push(project.category);
          }
        });
      });
    }

    if (label === 'delivered') {
      // console.log(label);
      this.projects = [];
      this.projectService.getProjects().subscribe((projects) => {
        this.projects = projects.filter((project) => {
          return project.status === false;
        });
        this.categories_list = [];
        this.projects.map((project) => {
          if (!this.categories_list.includes(project.category)) {
            this.categories_list.push(project.category);
          }
        });
      });
    }
  }
}
